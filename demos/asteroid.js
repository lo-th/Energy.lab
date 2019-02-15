function demo () {
    
    cam ({azim:0, polar:60, distance:40});

    hideGrid();


    // world setting
    set ({
        gravity:[0,0,0],
        iterations:20,
        stepSize:1/60,
        
    })

    add({ 
        type:'planet',
        name:'planet',
        radius:10,
        height:6,
        resolution:20,
        frequency : [0.1,0.5], // frequency of noise
        level : [1,0.25], // influence of octave
        expo: 2,

        density:0, 
        //friction:0.5, 
        //bounce:0.6 
    });
    
    var sx, sy, sz, x, y, z;
    for(var i = 0; i<200; i++){
        
        x = Math.rand(20, 100)*(Math.randInt(0, 1)? -1: 1);
        y = Math.rand(20, 100)*(Math.randInt(0, 1)? -1: 1);
        z = Math.rand(20, 100)*(Math.randInt(0, 1)? -1: 1);

        sx = Math.rand(0.6, 2);
        sy = Math.rand(0.6, 2);
        sz = Math.rand(0.6, 2);
        add({ type:'box', size:[sx,sy,sz], pos:[x,y,z], density:(sx+sy+sz)/3, name:'box'+i, angular:1  });//friction:0.5, bounce:0.6, 

    }

    view.update = update;

};

function update() {

    var bodys = view.getBody();
    var p, m;
    //var useLocal = false;

    var ar = [];

    bodys.forEach( function( b, id ) {

        p = b.position.clone().negate().normalize().multiplyScalar(3);
        ar.push( [ b.name, 'force', p.toArray() ] );

    });

    forceArray( ar );

};