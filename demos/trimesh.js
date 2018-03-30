function demo() {

    cam ({azim:0, polar:30, distance:100});

    set({
        flag: ['Bounce'],
        autoDisable: 1,

    });

    add ({ 
        type:'terrain', 
        pos : [0,0,0], // terrain position
        size : [100,10,100], // terrain size in meter
        div : [64,64], // number of subdivision
        complexity : 30, // complexity of noise
        friction: 0.5, 
        bounce: 0.5,
        toTri: true,
    });

    var i = 30;

    while(i--){
        add ({ type:'box', size:[2], pos:[Math.rand(-40,40),40,Math.rand(-40,40)], density:1, friction: 0.5, bounce: 0.5 });
        add ({ type:'sphere', size:[1], pos:[Math.rand(-40,40),40,Math.rand(-40,40)], density:1, friction: 0.5, bounce: 0.5 });
        
    }

};