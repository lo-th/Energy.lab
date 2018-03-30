import { Energy } from '../core/Energy.js';

function Vehicle( world, o ) {

	this.name = o.name || 'car';
    this.wheels = [];
    this.carJoints = [];

    var set = {
        //name: o.name || 'car',
        w_radius: o.w_radius || 0.3,
        w_pos: o.w_pos || [1, -0.45, 1.1 ],
        w_density: o.w_density || 10,
        w_friction: o.w_friction || 500,
        soft_cfm: o.soft_cfm || 0.001,
        soft_erp: o.soft_erp || 0.50,
        size: o.size || [ 2.4, .5, 1.4 ],
        pos: o.pos || [0, 2.95, 10],
        density: o.density || 100,
        friction: o.friction || 500,
        param: o.param || { LoStop:0, HiStop:0, FMax:50, Vel2:0, SuspensionERP:0.18, SuspensionCFM:0.004 }
    }

    //console.log(set)

    var wheels_pos = [
        [set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
    	[set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]],
    	[set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
    	[set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]]
    ]

    //console.log(wheels_pos)

    this.chassis = world.add( { type:'box', name:this.name+'_body', size:set.size, pos:set.pos, density:set.density, friction:set.friction } );

    var p;
    for (var i=0; i<4; i++ ){

        this.wheels[i] = world.add( {type:'sphere', name:this.name+'_w'+i, size:[set.w_radius], pos:wheels_pos[i], density:set.w_density, friction:set.w_friction, soft_cfm:set.soft_cfm, soft_erp:set.soft_erp });
        this.carJoints[i] = world.addJoint( {type:'hinge2', b1:this.name+'_body', b2:this.name+'_w'+i, pos1:wheels_pos[i], axe1:[0,1,0], axe2:[0, 0, i % 2 == 0 ? -1 : 1], param:set.param });

    }

}

Vehicle.prototype = {

    constructor: Vehicle,

    swaybarControl: function () {

    	var amt;
        for (var i = 0; i < 2; i++) {
            var h2anchor = this.carJoints[i].getdjointHinge2Anchor();
            this.anchor1 = {x:h2anchor[0], x:h2anchor[1], z:h2anchor[2]};
            var h2anchor2 = this.carJoints[i].getdjointHinge2Anchor2();
            this.anchor2 ={x:h2anchor2[0], y:h2anchor2[1], z:h2anchor2[2]};
            var ax1 = this.carJoints[i].getdjointHinge2Axis1();
            this.axis1 = {x:ax1[0], y:ax1[1], z:ax1[2]};
            var dif = {x:this.anchor1.x-this.anchor2.x, y:this.anchor1.y-this.anchor2.y, z:this.anchor1.z-this.anchor2.z,};
            var displacement = (dif.x * this.axis1.x) + (dif.y * this.axis1.y) + (dif.z * this.axis1.z);

            if ( displacement > 0 ) {

                amt = displacement * 500;
                var force = { x:-ax1[0]*amt, y:-ax1[1]*amt, z:-ax1[2]*amt };
                world.addForce( { name: this.name+'_w'+i, f:force, useLocal:false } );

            }
        }

    },

    steeringControl: function ( Steering ) {

    	var steeringRate = Math.PI * 4 / 7;
        var steeringLimit = Math.PI / 6;
        for (var i = 0; i < 4; i++) {
            if (i >= 2) {
                var steering = Steering || 0;//Control.Steering;
                var desiredPosition = steering * ((i > 1) ? -1 : 1);
                var steeringVelocity = (desiredPosition - this.carJoints[i].dJointGetHinge2Angle1()) * 10;
                this.carJoints[i].setParam( 'HiStop', steeringLimit );
                this.carJoints[i].setParam( 'LoStop', -steeringLimit );
                this.carJoints[i].setParam( 'Vel', steeringVelocity );
            }
            else {
                var desiredPosition = 0;
                var steeringVelocity = (desiredPosition - this.carJoints[i].dJointGetHinge2Angle1()) * 10;
                this.carJoints[i].setParam( 'HiStop', 0.1 );
                this.carJoints[i].setParam( 'LoStop', -0.1 );
                this.carJoints[i].setParam( 'Vel', steeringVelocity );
            }
        }

    },

    engineControl: function ( v ) {

    	var velocity = v || 0;//Control.Velocity;
        var wheelVelocity = 15 * Math.PI * velocity;// * (-1);
        if (velocity != 0) {
            for (var i = 0; i < 4; ++i) {
            	this.carJoints[i].setParam( 'Vel2', ((i % 2) == 0) ? -wheelVelocity : wheelVelocity );
                this.carJoints[i].setParam( 'FMax2', 50 );
            }
        }
        else {
            for (var i = 0; i < 4; ++i) {
            	this.carJoints[i].setParam( 'Vel2', ((i % 2) == 0) ? 0 : 0 );
                this.carJoints[i].setParam( 'FMax2', 20 );
            }
        }

    },

};

export { Vehicle }