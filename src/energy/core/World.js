import { Energy } from './Energy.js';
//import { dContactBounce, dxBodyStateNotifyEnergy } from '../constants.js';
import { Tools } from './Tools.js';

import { dynamicBox } from '../primitives/dynamicBox.js';
import { dynamicSphere } from '../primitives/dynamicSphere.js';
import { dynamicCylinder } from '../primitives/dynamicCylinder.js';
import { dynamicHeightmap } from '../primitives/dynamicHeightmap.js';
import { dynamicTriMesh } from '../primitives/dynamicTriMesh.js';
import { staticPlane } from '../primitives/staticPlane.js';


import { dJointBall } from '../joints/dJointBall.js';
import { dJointFixed } from '../joints/dJointFixed.js';
import { dJointHinge } from '../joints/dJointHinge.js';
import { dJointHinge2 } from '../joints/dJointHinge2.js';
import { dJointSlider } from '../joints/dJointSlider.js';
import { dJointTransmission } from '../joints/dJointTransmission.js';
import { dJointUniversal } from '../joints/dJointUniversal.js';

import { Vehicle } from '../extras/Vehicle.js';

// Metric, MKS (Metre-Kilogram-Second), thus your lengths will be expressed in meters, masses in kilograms, and timestep in seconds.

function World( o ) {

	this.dxWorld = null;

    this.currentControl = '';

    this.bodys = [];
    this.solids = [];
    this.joints = [];
    this.cars = [];

    this.tmpMatrix = [];
    this.tmpForce = [];

    this.byName = {};

    this.isQuickStep = true;

    this.jointID = 0;
    this.default_stepSize = 0.033;
    this.timeStep = 0.033;
    this.gravity = [ 0, -9.81, 0 ];
    this.contactFlag = null;//contactFlagMode || dContactBounce;//null;//dxBodyStateNotifyEnergy// null;//dContactBounce;
    this.contactFlag2 = null;
    this.iteration = 20;
    this.numStep = 1;
    this.maxContact = 7;

    this.dxJointGroup = 0;

    this.flags = {
    	Mu2 : 0x001, // f not set, use mu for both friction directions. If set, use mu for friction direction 1, use mu2 for friction direction 2.
        AxisDep : 0x001,
        FDir1 : 0x002,// If set, take fdir1 as friction direction 1, otherwise automatically compute friction direction 1 to be perpendicular to the contact normal
        Bounce : 0x004, // If set, the contact surface is bouncy, in other words the bodies will bounce off each other. The exact amount of bouncyness is controlled by the bounce parameter.
        SoftERP : 0x008, // If set, the error reduction parameter of the contact normal can be set with the soft_erp parameter. This is useful to make surfaces soft.
        SoftCFM : 0x010, // If set, the constraint force mixing parameter of the contact normal can be set with the soft_cfm parameter. This is useful to make surfaces soft.
        Motion1 : 0x020, // If set, the contact surface is assumed to be moving independently of the motion of the bodies. This is kind of like a conveyor belt running over the surface. When this flag is set, motion1 defines the surface velocity in friction direction 1.
        Motion2 : 0x040, // The same thing as above, but for friction direction 2.
        MotionN : 0x080, // The same thing as above, but along the contact normal.
        Slip1 : 0x100, // Force-dependent-slip (FDS) in friction direction 1.
        Slip2 : 0x200, // Force-dependent-slip (FDS) in friction direction 2
        Rolling : 0x400, // Enables rolling/spinning friction.
        Approx0 : 0x0000,
        Approx1_1 : 0x1000, // Use the friction pyramid approximation for friction direction 1. If this is not specified then the constant-force-limit approximation is used (and mu is a force limit).
        Approx1_2 : 0x2000, // Use the friction pyramid approximation for friction direction 2. If this is not specified then the constant-force-limit approximation is used (and mu is a force limit).
        Approx1_N : 0x4000, // 	Use the friction pyramid approximation for spinning (rolling around normal).
        Approx1 : 0x7000, // Equivalent to dContactApprox1_1, dContactApprox1_2 and dContactApprox1_N.
    }

    this.init( o );

}

World.prototype = {

    init: function ( o ) {

        Energy.dInitODE2(0);
        //Energy.dInitODE(0)
        
        this.dxWorld = Energy.dWorldCreate();
        this.dxSpace = Energy.dSimpleSpaceCreate(0);
        this.contact = Energy.dJointGroupCreate(0);

        Energy.init( this.dxWorld, this.dxSpace, this.contact, this.contactFlag );
        //Energy.setMaxContact( this.maxContact );

        this.set(o);

    },

    set: function( o ){

    	o = o || {};

    	this.isQuickStep = o.quickStep !== undefined ? o.quickStep : true;


    	this.iteration = o.iteration !== undefined ? o.iteration : 20;
        if( this.isQuickStep ) Energy.dWorldSetQuickStepNumIterations( this.dxWorld, this.iteration );

        this.timeStep = o.timeStep !== undefined ? o.timeStep : 0.016;
        //if( o.fps!==undefined ) this.timeStep = 1/o.fps;
        this.numStep = o.numStep !== undefined ? o.numStep : 1;

        //console.log(this.timeStep, this.numStep)

        this.setTimeStepAndNumStep( this.timeStep, this.numStep );
        
        this.maxContact = o.maxContact !== undefined ? o.maxContact : 6;
        Energy.setMaxContact( this.maxContact );

        this.gravity = o.gravity !== undefined ? o.gravity : [ 0, -9.81, 0 ];
        this.setGravity( this.gravity[0], this.gravity[1], this.gravity[2] );

        // TODO MISSING

        // Energy.dWorldSetContactMaxCorrectingVel( this.dxWorld, vel); 
        // Energy.dWorldSetContactSurfaceLayer( this.dxWorld, depth);

        // FLAG MODE

        if( o.flag !== undefined ){

        	this.contactFlag = this.flags[ o.flag[0] ];
        	for( var i = 1; i < o.flag.length; i++ ){
        		this.contactFlag |= this.flags[ o.flag[i] ];
        	}

        } else {
        	this.contactFlag = this.flags.Bounce;
        }

        ///console.log(this.contactFlag)

        if( this.contactFlag !== null ) Energy.dWorldSetFlags( this.dxWorld, this.contactFlag );

        // FLAG MODE 2

        if( o.flag2 !== undefined ){

        	this.contactFlag2 = this.flags[ o.flag2[0] ];
        	for( var i = 1; i < o.flag2.length; i++ ){
        		this.contactFlag2 |= this.flags[ o.flag2[i] ];
        	}

        } else {
        	this.contactFlag2 = null;
        }

        if( this.contactFlag2 !== null ) Energy.setFlagmode2( this.contactFlag2 );

        /////
       
        Energy.dWorldSetAutoDisableFlag( this.dxWorld, o.autoDisable !== undefined ? o.autoDisable : 0 ); // 0, 1
        if( o.disableTime !== undefined ) Energy.dWorldSetAutoDisableTime( this.dxWorld, o.disableTime !== undefined ? o.disableTime : 0);
        if( o.disableSteps !== undefined ) Energy.dWorldSetAutoDisableSteps( this.dxWorld, o.disableSteps !== undefined ? o.disableSteps : 10 );
        Energy.dWorldSetAutoDisableLinearThreshold( this.dxWorld, o.disableLinear !== undefined ? o.disableLinear : 0.01 );
        Energy.dWorldSetAutoDisableAngularThreshold( this.dxWorld, o.disableAngular !== undefined ? o.disableAngular : 0.01 );

        if( o.samplesCount !== undefined ) Energy.dWorldSetAutoDisableAverageSamplesCount(this.dxWorld, o.samplesCount ); // 10
        if( o.notificationInterval !== undefined ) Energy.dWorldSetNotificationInterval(this.dxWorld, o.notificationInterval );//10
        

        // how much error correction is performed in each time step. Typical values are in the range 0.1-0.8. The default is 0.2.
        if( o.ERP !== undefined ) Energy.dWorldSetERP( this.dxWorld, o.ERP );
        // global CFM (constraint force mixing) value. Typical values are in the range 10-9 -- 1. The default is 10-5 if single precision is being used, or 10-10 if double precision is being used.
        // Math.pow( 10, -5 )
        if( o.CFM !== undefined ) Energy.dWorldSetCFM( this.dxWorld, o.CFM )

        console.log('World Set')
    },

    step: function () {
        Module._run();
        if (this.isQuickStep) {
            for (var i = 0; i < this.numStep; i++) {
                Module._dWorldQuickStep(this.dxWorld, this.timeStep);
            }
        }
        else {
            Module._dWorldStep(this.dxWorld, this.timeStep);
        }
        Module._dJointGroupEmpty(this.contact);
    },

    /*step: function () {

        Energy.run();
        if ( this.isQuickStep ) {
            for ( var i = 0; i < this.numStep; i++ ) {
                Energy.dWorldQuickStep( this.dxWorld, this.timeStep );
            }
        } else {
            Energy.dWorldStep( this.dxWorld, this.timeStep );
        }
        Energy.dJointGroupEmpty( this.contact );

    },*/

    dispose: function () {

        Energy.dWorldDestroy( this.dxWorld );

        this.reset();

    },

    reset: function () {

        Energy.dJointGroupDestroy( this.dxJointGroup );

        while( this.bodys.length > 0 ) this.bodys.pop().dispose();
        while( this.solids.length > 0 ) this.solids.pop().dispose();

        this.bodys = [];
        this.solids = [];
        this.cars = [];
        this.joints = [];
        this.byName = {};
        this.tmpMatrix = [];
        this.tmpForce = [];

    },

    takeControl: function ( o ){

        this.currentControl = o.name || '';
        //console.log(this.currentControl)

    },

    stepVehicle: function () {

        var cc = this.currentControl;

        this.cars.forEach( function ( b, id ) {

            if(b.name === cc){
                b.steeringControl( key[0] );
                b.engineControl( key[1] );
                b.chassis.dBodyEnable();
            }
            

        });

    },

    addVehicle: function ( o ) {

        this.cars.push( new Vehicle( this, o ) );

    },

    updateTerrain: function ( o ) {

        this.byName[ o.name ].setHeightData( o.heightData );

    },

    add: function ( o ) {

        var isKinematic = false;

        o.density = o.density == undefined ? 0 : o.density;

        if(o.kinematic){
            isKinematic = true;
        }

        
        o.size = o.size == undefined ? [1,1,1] : o.size;
        o.pos = o.pos == undefined ? [0,0,0] : o.pos;
        o.quat = o.quat == undefined ? [0,0,0,1] : o.quat;

        var body = null;

        switch( o.type ){

            case 'box': body = new dynamicBox( this.dxSpace, this.dxWorld, o.density, o.size[0], o.size[2], o.size[1] ); break;
            case 'sphere': body = new dynamicSphere( this.dxSpace, this.dxWorld, o.density, o.size[0] ); break;
            case 'cylinder': body = new dynamicCylinder( this.dxSpace, this.dxWorld, o.density, o.size[0], o.size[1], 1 ); break;
            case 'plane': body = new staticPlane( this.dxSpace, 0,0,1,0 ); break;
            case 'mesh': body = new dynamicTriMesh( this.dxSpace, this.dxWorld, o.vertices, o.indices, o.density ); break;
            //case 'heightmap': case 'terrain': body = new dynamicHeightmap(  this.dxSpace, this.dxWorld, o.heightData, o.size[0], o.size[2], o.sample[0], o.sample[1], o.size[1], o.offset || 0, o.thickness || 10, o.bWrap || 1 ); break;
            case 'heightmap': case 'terrain': 
       
                body = new dynamicHeightmap( this.dxSpace, this.dxWorld, o.heightData, o.size[0], o.size[2], o.sample[0], o.sample[1], o.size[1], o.offset || 0, o.thickness || 10, o.bWrap || 0 );

            break;

            case 'composit' :
            
            break;

        }

        if( o.type !== 'plane' ) body.setTransform( o.pos, o.quat );

        //if( o.kinematic ) body.dBodySetKinematic( o.kinematic );

        if( o.friction ) body.setFriction( o.friction );
        if( o.bounce ) body.setBounce( o.bounce );
        if( o.soft_cfm ) body.setSoftCFM( o.soft_cfm );
        if( o.soft_erp ) body.setSoftERP( o.soft_erp );
        if( o.bounce_vel ) body.setBounce_vel( o.bounce_vel );

        if( o.linearV ) body.dBodySetLinearVel( o.linearV[0], o.linearV[2], o.linearV[1] );
        if( o.angularV ) body.dBodySetAngularVel( o.angularV[0], o.angularV[2], o.angularV[1] );

        if( o.flag ) body.dBodySetFlags( o.flag );
        if( o.interval ) body.dBodySetNotification_interval( o.interval );

        if( o.disable ) body.disable();
        //body.dBodySetNotification_interval(10)
        //body.dBodySetFlags(dxBodyStateNotifyEnergy);

        if( o.name ) this.byName[ o.name ] = body;

        if( o.density===0 && !isKinematic ){ 
            this.solids.push( body );
        	
        	//body.enabled()
        } else {

            this.bodys.push( body );
            // test 
            if( o.density!==0 ) Tools.Free( body.dxMass );
        }

        return body;

    },

    addJoint: function ( o ) {

        var joint = null;

        o.type = o.type == undefined ? 'hinge' : o.type;
        o.pos1 = o.pos1 == undefined ? [0,0,0] : o.pos1;
        o.pos2 = o.pos2 == undefined ? [0,0,0] : o.pos2;

        //o.axe = o.axe == undefined ? [1,0,0] : o.axe;
        o.axe1 = o.axe1 == undefined ? [1,0,0] : o.axe1;
        o.axe2 = o.axe2 == undefined ? [0,1,0] : o.axe2;

        switch( o.type ){

            case 'ball': joint = new dJointBall( this.dxWorld, this.dxJointGroup ); break;
            case 'hinge': joint = new dJointHinge( this.dxWorld, this.dxJointGroup ); break;
            case 'hinge2': joint = new dJointHinge2( this.dxWorld, this.dxJointGroup ); break;
            case 'fixed': joint = new dJointFixed( this.dxWorld, this.dxJointGroup ); break;
            case 'slider': joint = new dJointSlider( this.dxWorld, this.dxJointGroup ); break;
            case 'transmission': joint = new dJointTransmission( this.dxWorld, this.dxJointGroup ); break;
            case 'universal': joint = new dJointUniversal( this.dxWorld, this.dxJointGroup ); break;

        }

        if( this.byName[ o.b1 ] && this.byName[ o.b2 ] && joint !== null ){

            joint.dJointAttach( this.byName[ o.b1 ].dxBody, this.byName[ o.b2 ].dxBody );

            if( o.pos1 ) joint.setPos1( o.pos1 );// !! in world coordinates
            if( o.pos2 ) joint.setPos2( o.pos2 );

            if( o.axe ) joint.setAxis( o.axe ); // Slider Set the slider axis parameter. // transmission / Set the angular speed ratio between the gears.
            if( o.axe1 ) joint.setAxis1( o.axe1 );
            if( o.axe2 ) joint.setAxis2( o.axe2 );

            if( o.param ) {
                for( var p in o.param ){
                    joint.setParam( p, o.param[p] );
                }
            }

            if( o.name ) this.byName[ o.name ] = joint;

            this.joints.push( joint );

            return joint;
        
        } else {

            throw new Error("body1 or/and body2 is null, joint need 2 valid mesh");

        }



    },


    //////

    collide: function ( o ) {

        Energy.dSpaceCollide( this.dxSpace, o.data, o.callback );
    
    },

    //////

    

    setMotionVector: function ( o ) {

        var geom = this.byName[ o.name ].dxGeom;
        var p = this.byName[ o.name ].dGeomGetPosition();

        var m = [ p[0] - o.v[0], p[1] - o.v[1], p[2] - o.v[2] ];

        //console.log(p, m)

        var v = Tools.Malloc_Vector3( m[0], m[2], m[1] );
        this.byName[ o.name ].dGeomSetPosition( o.v[0], o.v[2], o.v[1] );
        Energy.dGeomSetMotionVector( geom, v );

    },

    //////

    stepRigidBody: function ( AR, N ) {

        this.bodys.forEach( function ( b, id ) {

            var n = N + (id * 8);

            AR[n] = b.dBodyIsEnabled();



            //if ( AR[n] === 0 ) {

                var t = b.getTransform();

                //AR[n] = t[0];

                AR[n+1] = t[1];
                AR[n+2] = t[2];
                AR[n+3] = t[3];

                AR[n+4] = t[4];
                AR[n+5] = t[5];
                AR[n+6] = t[6];
                AR[n+7] = t[7];
           // }


        });

    },


    //// SET

    setTimeStepAndNumStep: function (stepSize, numStep) {

        this.timeStep = stepSize || 0.016;
        this.numStep = numStep || 1;
        Energy.setTimestep( this.timeStep, this.numStep );

    },

    setGravity: function ( x, y, z ) {

        Energy.dWorldSetGravity( this.dxWorld, x, z, y );

    },

    setMaxContact: function (maxContact) {

        this.maxContact = maxContact;
        Energy.setMaxContact( this.maxContact );

    },

    // Set and get the global ERP value, that controls how much error correction is performed in each time step. Typical values are in the range 0.1-0.8. The default is 0.2.
    setERP: function ( value ) { Energy.dWorldSetERP( this.dxWorld, value ); },
    // Set and get the global CFM (constraint force mixing) value. Typical values are in the range 10-9 -- 1. The default is 10-5 if single precision is being used, or 10-10 if double precision is being used.
    setCFM: function ( value ) { Energy.dWorldGetCFM( this.dxWorld, value ); },

    //Set and get the default auto-disable parameters for newly created bodies. See the Rigid Body documentation on auto-disabling for a description of this feature. The default parameters are:

    //AutoDisableFlag = disabled
    //AutoDisableLinearThreshold = 0.01
    //AutoDisableAngularThreshold = 0.01
    //AutoDisableSteps = 10
    //AutoDisableTime = 0

    setAutoDisableFlag: function ( value ) { Energy.dWorldSetAutoDisableFlag( this.dxWorld, value ); },
    setAutoDisableAverageSamplesCount: function ( value ) { Energy.dWorldSetAutoDisableAverageSamplesCount( this.dxWorld, value ); },
    setAutoDisableLinearThreshold: function ( value ) { Energy.dWorldSetAutoDisableLinearThreshold( this.dxWorld, value ); },
    setAutoDisableAngularThreshold: function ( value ) { Energy.dWorldSetAutoDisableAngularThreshold( this.dxWorld, value ); },
    setAutoDisableSteps: function (steps) { Energy.dWorldSetAutoDisableSteps( this.dxWorld, steps); },
    setAutoDisableTime: function (time) { Energy.dWorldSetAutoDisableSteps( this.dxWorld, time); },
    setNotificationInterval: function ( value ) { Energy.dWorldSetNotificationInterval( this.dxWorld, interval); },


    //// GET

    getMaxContact: function () {

        return this.maxContact;

    },

    getERP: function ( value ) { return Energy.dWorldGetERP( this.dxWorld ); },
    getCFM: function ( value ) { return Energy.dWorldGetCFM( this.dxWorld ); },



    //---------------------
    // FORCES
    //---------------------

    updateForce: function() {

        while( this.tmpForce.length > 0 ) this.applyForce( this.tmpForce.pop() );

    },

    applyForce: function( r ) {

        var b = this.byName[ r[0] ];

        if( b === undefined ) return;

        var type = r[1] || 'force';

        switch( type ){
            case 'force' : case 0 : b.dBodyAddForce(r[2][0], r[2][2], r[2][1], false ); break;
            case 'forceLocal' : case 0 : b.dBodyAddForce(r[2][0], r[2][2], r[2][1], true ); break;
            case 'torque' : case 0 : b.dBodyAddTorque(r[2][0], r[2][2], r[2][1], false ); break;
            case 'torqueLocal' : case 0 : b.dBodyAddTorque(r[2][0], r[2][2], r[2][1], true ); break;
        }

    },

    //---------------------
    // MATRIX
    //---------------------

    updateMatrix: function() {

        while( this.tmpMatrix.length > 0 ) this.applyMatrix( this.tmpMatrix.pop() );

    },

    applyMatrix: function( r ) {

        var b = this.byName[ r[0] ];//getByName( r[0] );

        if( b === undefined ) return;

        if( r[2] === undefined ) r[2] = [0,0,0,1];//{ this.tmpQuat.fromArray( r[2] ); this.tmpTrans.setRotation( tmpQuat ); }

        b.setTransform( r[1], r[2] );

    },

}

export { World };