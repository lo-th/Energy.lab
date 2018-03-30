function demo() {

    cam ({ azim:0, polar:30, distance:60 });

    hideGrid();

    set ({
    	isQuickStep: true,
        autoDisable:1,
        samplesCount:10,
        maxContact: 6,
        disableLinear:0.15,
        disableAngular:0.15,
        //fps:30,
        //stepSize:0.033

    });

    //add ({ type:'plane', friction: 20, bounce: 0.1, bounce_vel:0.1 });

    add ({ 
        type:'terrain', 
        pos : [0,0,0], // terrain position
        size : [800,30,800], // terrain size in meter
        sample : [128,128], // number of subdivision
        complexity : 25, // complexity of noise
        friction: 20, 
        bounce: 0.1,
        thickness:10,
        pos:[0,-30,0]
        //toTri: true,
    });

    for( var i=0; i < 1; i++ ){

	    vehicle ( {

	    	name:'car'+i,
	    	w_radius: 0.3,
	    	w_pos:[1, -0.45, 1.1 ],
	    	w_density:10,
	    	w_friction: 500,
	    	soft_cfm:0.001,
	    	soft_erp: 0.5,
	    	size: [ 2.4, 0.5, 1.4 ],
	    	pos: [0,2, 0],//[ Math.rand(-20,20), 10 + (1*5), Math.rand(-20,20) ],
	    	density: 100,
	    	friction: 500,
	    	param: { LoStop:0, HiStop:0, FMax:50, Vel2:0, SuspensionERP:0.18, SuspensionCFM:0.004 }

	    } )

    }

    control({name:'car0' })
    follow('car0_body', { rotation:-90 })

    
    
}