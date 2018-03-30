var z = 0, m = 1;

function demo() {

    cam ({azim:0, polar:60, distance:40});

    // world setting
    set ({
        gravity:[0,-10,0],
        iterations:20,
        stepSize:1/60,
        
    })

    add({type:'plane'});
    var h = 10;
    add({type:'box', pos:[10,h*0.5,0], size:[1,h, 21]});
    add({type:'box', pos:[-10,h*0.5,0], size:[1,h, 21]});
    add({type:'box', pos:[0,h*0.5,10], size:[19,h, 1]});
    add({type:'box', pos:[0,h*0.5,-10], size:[19,h, 1]});

    add({type:'box', pos:[0,3,0], size:[19,6, 3], name:'box', kinematic: true });

    var i = 1000, pos = [], s, d;

    while( i-- ) {

        d = Math.rand(0.3,0.6);

        pos[0] = Math.rand(-5,5); 
        pos[1] = Math.rand(2,10);
        pos[2] = Math.rand(-5,5);

        add({ type:'sphere', size:[d], pos:pos, density:0.2, friction:0}); 
        
    }

    view.update = update;

};

function update () {

    z += 0.03 * m;
    if( z > 12 ) m = -1;
    if( z < 0 ) m = 1;

    //motion( { name:'box', v:[ 0, 3, z - 6 ]} )

    matrix( [ 'box', [ 0, 3, z - 6 ] ] );

}