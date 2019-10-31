function demo() {

    cam ({theta:0, phi:30, distance:100, target:[0,1,0]});
    view.load ( 'cars.sea', afterLoad, true );

}

function afterLoad () {

    set({

        isQuickStep: true,
        autoDisable: 1,
        samplesCount:10,
        iteration:8,
        maxContact:3,
        disableLinear:0.15,
        disableAngular:0.15,

    });

    add({type:'plane'});
    var l = 40;
    add({type:'box', pos:[l*0.5,5,0], size:[1,10, l+1]});
    add({type:'box', pos:[-l*0.5,5,0], size:[1,10, l+1]});
    add({type:'box', pos:[0,5,l*0.5], size:[l-1,10, 1]});
    add({type:'box', pos:[0,5,-l*0.5], size:[l-1,10, 1]});

    /*add ({ 
        type:'terrain', 
        pos : [0,0,0], // terrain position
        size : [100,10,100], // terrain size in meter
        div : [32,32], // number of subdivision
    });*/

    var i = 150;

    while(i--){

        var t = Math.randInt(0,13);
        var n = (t+1).toString();
        if(n.length == 1) n = '0'+n;
        if(n.length == 2) n = '0'+n;

        var shape = view.getGeometry( 'cars', 'shape'+ n );
        var chassis = view.getGeometry( 'cars', 'mcar'+ n );
        var down = view.getGeometry( 'cars', 'down'+ n );

        var g = view.mergeMesh([chassis, down])

        add( {
            type:'mesh',
            material:'move',
            geometry: g,
            //geometry: view.getGeo()['down'+n],
            pos:[ Math.rand(-10,10), 10+(i+5), Math.rand(-10,10)],
            //rot:[90,0,0],
            density:1,
            friction:0.5,
        })


        
    }

};