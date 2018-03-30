function demo () {

    cam ({ azim:0, polar:10, distance:10 });

    set ({
        autoDisable:1,
        gravity:[0,-1,0]
        //disableLinear:0.05,
        //disableAngular:0.05,
        //notificationInterval:10,

    });

    // infinie plane
   // add({type:'plane', friction:0.5 });

    add ({ 
        type:'terrain', 
        pos : [0,0,0], // terrain position
        size : [10,1,10], // terrain size in meter
        div : [64,64], // number of subdivision
        complexity : 30, // complexity of noise
        //flipEdge : false, // inverse the triangle
        friction: 0.5, 
        bounce: 0.0,
        //toTri: true,
    });

    for(var i = 0; i<10; i++){

        ragdoll(i, 0, 2+(1.5*i), 0 );

    }
};

function ragdoll (id, x, y, z) {

    var density = 0.2;//0.2;
    var friction = 0.5;
    var collision = true;
    var p = {x:x, y:y, z:z};
    //var spring = [2, 0.3, 0.1]; // softness, bias, relaxation
    var type = 'box';
    var jointType = 'hinge';
    var jointType2 = 'hinge2';
    var param1 = { LoStop:-2 * Math.torad, HiStop:20* Math.torad , FMax:0  };//, FMax:0, Vel2:0, SuspensionERP:0.18, SuspensionCFM:0.004  };
    var param2 = { LoStop:60 * Math.torad, HiStop:180 * Math.torad, Bounce:0, Vel:0, Vel2:0 };//, LoStop:2, HiStop:20; FMax:0, Vel2:0  };
    var paramR3 = { LoStop:-90 * Math.torad, HiStop:0 * Math.torad, Bounce:0, Vel:0, Vel2:0 };//LoStop:2, HiStop:60, FMax:0, Vel2:0  };
    var paramL3 = { LoStop:0 * Math.torad, HiStop:90 * Math.torad, Bounce:0, Vel:0, Vel2:0 }
    var paramL = { LoStop:-180 * Math.torad, HiStop:180 * Math.torad, Bounce:0, Vel:0, Vel2:0 };//, LoStop:2, HiStop:20; FMax:0, Vel2:0  };
    var paramR = { LoStop:-180 * Math.torad, HiStop:180 * Math.torad, Bounce:0, Vel:0, Vel2:0 };//, LoStop:2, HiStop:20; FMax:0, Vel2:0  }
    var param4 = { LoStop:-90 * Math.torad, HiStop:90 * Math.torad, Bounce:0, Vel:0, Vel2:0 };
    var param5 = { LoStop:0 * Math.torad, HiStop:90 * Math.torad, Bounce:0, Vel:0, Vel2:0 };
    // body

    add({type:type, size:[0.2,0.1,0.15], pos:[p.x,(p.y-0.2),p.z], density:density, friction:friction, name:'pelvis'+id });
    add({type:type, size:[0.2,0.1,0.15], pos:[p.x,(p.y-0.1),p.z], density:density, friction:friction,  name:'spine1_'+id });
    add({type:type, size:[0.2,0.1,0.15], pos:[p.x,p.y,p.z], density:density, friction:friction, name:'spine2_'+id, noSleep:true });
    add({type:type, size:[0.2,0.1,0.15], pos:[p.x,(p.y+0.1),p.z], density:density, friction:friction,  name:'spine3_'+id });
    add({type:"sphere", size:[0.1,0.1,0.1], pos:[p.x,(p.y+0.3),p.z], density:density, friction:friction,  name:'head'+id });

    joint({type:jointType, b1:'pelvis'+id, b2:'spine1_'+id, pos1:[p.x,(p.y-0.2)+0.05,p.z],  axe1:[1,0,0],  param:param1 });
    joint({type:jointType, b1:'spine1_'+id, b2:'spine2_'+id, pos1:[p.x,(p.y-0.1)+0.05,p.z], axe1:[1,0,0], param:param1 });
    joint({type:jointType, b1:'spine2_'+id, b2:'spine3_'+id, pos1:[p.x,p.y+0.05,p.z],  axe1:[1,0,0],  param:param1 });
    joint({type:jointType, b1:'spine3_'+id, b2:'head'+id,   pos1:[p.x,(p.y+0.1)+0.05,p.z],  axe1:[1,0,0],   param:param1 });

    /*joint({type:jointType, b1:'pelvis'+id, b2:'spine1_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], axe1:[0,1,0], axe2:[0,-1,0], param:param1 });
    joint({type:jointType, b1:'spine1_'+id, b2:'spine2_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], axe1:[0,1,0], axe2:[0,-1,0], param:param1 });
    joint({type:jointType, b1:'spine2_'+id, b2:'spine3_'+id, pos1:[0,0.05,0], pos2:[0,-0.05,0], axe1:[0,1,0], axe2:[0,-1,0], param:param1 });
    joint({type:jointType, b1:'spine3_'+id, b2:'head'+id,   pos1:[0,0.05,0], pos2:[0,-0.1,0], axe1:[0,1,0], axe2:[0,-1,0],  param:param1 });*/

    //arm

    add({type:type, size:[0.2,0.1,0.1], pos:[p.x-0.2,p.y+0.08,p.z], rot:[0,0,0], density:density,  name:'L_arm'+id });
    add({type:type, size:[0.2,0.08,0.08], pos:[p.x-0.4,p.y+0.08,p.z], rot:[0,0,0], density:density,  name:'LF_arm'+id });

    add({type:type, size:[0.2,0.1,0.1], pos:[p.x+0.2,p.y+0.08,p.z], rot:[0,0,0], density:density,  name:'R_arm'+id });
    add({type:type, size:[0.2,0.08,0.08], pos:[p.x+0.4,p.y+0.08,p.z], rot:[0,0,0], density:density,  name:'RF_arm'+id });

    joint({type:jointType2, b1:'spine3_'+id, b2:'L_arm'+id, pos1:[p.x-0.1,(p.y+0.08),p.z], axe1:[0,0,1], axe2:[0,1,0], param:paramL });
    joint({type:jointType2, b1:'spine3_'+id, b2:'R_arm'+id, pos1:[p.x+0.1,(p.y+0.08),p.z], axe1:[0,0,1], axe2:[0,1,0], param:paramR });

    joint({type:jointType, b1:'L_arm'+id, b2:'LF_arm'+id, pos1:[p.x-0.3,p.y+0.08,p.z], axe1:[0,1,0],  param:paramL3 });
    joint({type:jointType, b1:'R_arm'+id, b2:'RF_arm'+id, pos1:[p.x+0.3,p.y+0.08,p.z], axe1:[0,1,0], param:paramR3 });
    /*joint({type:jointType, b1:'spine3_'+id, b2:'L_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision, param:param2 });
    joint({type:jointType, b1:'spine3_'+id, b2:'R_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,1], axe2:[0,1,1], collision:collision, param:param2 });

    joint({type:jointType, b1:'L_arm'+id, b2:'LF_arm'+id, pos1:[-0.1,0,0], pos2:[0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision, param:param2 });
    joint({type:jointType, b1:'R_arm'+id, b2:'RF_arm'+id, pos1:[0.1,0,0], pos2:[-0.1,0,0], axe1:[0,1,0], axe2:[0,1,0], collision:collision, param:param2 });*/

    // leg

    add({type:type, size:[0.1,0.25,0.1], pos:[p.x-0.06,p.y-0.4,p.z], rot:[0,0,0], density:density, name:'L_leg'+id });
    add({type:type, size:[0.08,0.25,0.08], pos:[p.x-0.06,p.y-0.7,p.z], rot:[0,0,0], density:density, name:'LF_leg'+id });

    add({type:type, size:[0.1,0.25,0.1], pos:[p.x+0.06,p.y-0.4,p.z], rot:[0,0,0], density:density, name:'R_leg'+id });
    add({type:type, size:[0.08,0.25,0.08], pos:[p.x+0.06,p.y-0.7,p.z], rot:[0,0,0], density:density, name:'RF_leg'+id });

    joint({type:jointType, b1:'pelvis'+id, b2:'L_leg'+id, pos1:[p.x-0.06,p.y-0.25,p.z], axe1:[1,0,0], param:param4 }); 
    joint({type:jointType, b1:'pelvis'+id, b2:'R_leg'+id, pos1:[p.x+0.06,p.y-0.25,p.z], axe1:[1,0,0], param:param4 });

    joint({type:jointType, b1:'L_leg'+id, b2:'LF_leg'+id, pos1:[p.x-0.06,p.y-0.525,p.z], pos2:[0,0.1,0], axe1:[1,0,0], param:param5 });
    joint({type:jointType, b1:'R_leg'+id, b2:'RF_leg'+id, pos1:[p.x+0.06,p.y-0.525,p.z], pos2:[0,0.1,0], axe1:[1,0,0], param:param5 });

};