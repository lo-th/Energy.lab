function demo() {

    view.moveCam({ theta:0, phi:10, distance:30, target:[0,3,0] });

    set ({
        autoDisable:1,
        iteration:8,
        //disableLinear:0.05,
        //disableAngular:1,
        //notificationInterval:10,

    });

    add ({ type:'plane', friction:0.6 });

    var i, j, k, pos;

    var d = 1;// meter
    var s = 2;
    var x = 6, y = 10, z = 6;

    var decaleX = - ((x*0.5) * d) + (d*0.5);
    var decaleZ = - ((z*0.5) * d) + (d*0.5);

    for(k = 0; k<y; k++){
    for(j = 0; j<z; j++){
    for(i = 0; i<x; i++){
        pos = [ i*d + decaleX, (k*d + d)-0.5, j*d + decaleZ ];
        add ({ type:'dice', size:[d,d,d], pos:pos, density:1, friction:0.5, bounce:0.1, disable:true });
    }}}

    add({ type:'sphere', size:[s,s,s], pos:[0,100,0], density:10, friction:0.5, bounce:0.3 });
    
}