function demo() {

    cam ({azim:0, polar:30, distance:50});

    // reset energy world to default setting
     
    set();

    // basic geometry body

    add({type:'plane'}); // infinie plane

    var i = 200, pos = [], s, d, rot = [0,0,90];
    
    while( i-- ) {

        h = Math.rand(0.1,4);
        d = Math.rand(0.1,1);

        pos[0] = Math.rand(-5,5); 
        pos[1] = Math.rand(2,20) + ( i*h );
        pos[2] = Math.rand(-5,5);

        rot[2] = Math.rand(-90,90);

        switch( Math.randInt(0,2) ){

            case 0 : add({ type:'sphere', size:[d], pos:pos, density:0.2}); break;
            case 1 : add({ type:'box', size:[d,h,d], pos:pos, density:0.2}); break;
            case 2 : add({ type:'cylinder', size:[d,h,d], rot:rot, pos:pos, density:0.2}); break;
            //case 3 : add({ type:'capsule',  size:[d,h,d], rot:rot, pos:pos, density:0.2}); break;

        }
    }

};