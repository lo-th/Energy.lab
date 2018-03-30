//var Module = { TOTAL_MEMORY: 256*1024*1024 };

var Ar, ArLng, ArPos, ArMax;
var key;
//var timeStep = 1/60;
var isBuffer = false;
var energy = null;
var test; 


self.onmessage = function ( e ) {

	var data = e.data;
    var m = data.m;
    var o = data.o;

    // ------- buffer data
    if( data.Ar ) Ar = data.Ar;
    if( data.key ) key = data.key;

    switch( m ){

    	case 'init': init( data ); break;
        case 'step': step(); break;
        case 'start': start(); break;
        case 'reset': reset(); break;

        case 'add': energy.add( o ); break;
        case 'joint': energy.addJoint( o ); break;
        case 'vehicle': energy.addVehicle( o ); break;
        case 'motion': energy.setMotionVector( o ); break;
        
        //case 'torque': energy.addTorque( o ); break;
        case 'set': energy.set( o ); break;

        case 'terrain': energy.updateTerrain( o ); break;
        case 'control': energy.takeControl( o ); break;

        case 'force': energy.tmpForce.push( o ); break;
        case 'forceArray': energy.tmpForce = o; break;

        case 'matrix': energy.tmpMatrix.push( o ); break;
        case 'matrixArray': energy.tmpMatrix = o; break;

    }

}

function step(){

    if( !energy ) return;

    energy.updateMatrix();
    energy.updateForce();
    energy.step();
    energy.stepVehicle();
    energy.stepRigidBody( Ar, ArPos[0] );


	if( isBuffer ) self.postMessage({ m:'step', Ar:Ar },[ Ar.buffer ]);
    else self.postMessage( { m:'step', Ar:Ar } );

}

function init ( o ) {

    isBuffer = o.isBuffer || false;

    //timeStep = o.timeStep !== undefined ? o.timeStep : timeStep;

    ArLng = o.settings[0];
    ArPos = o.settings[1];
    ArMax = o.settings[2];

    importScripts( o.blob );
    importScripts( o.blob2 );

    test = setInterval( function(){ 
        if( Module.calledRun ){
             clearInterval(test);

             start();
        } 
    }, 1000 );


}

function start(){

    energy = new NRJ.World();

    self.postMessage( { m:'initEngine' } );

}

function reset ( o ) {

    // create self tranfere array if no buffer
    if( !isBuffer ) Ar = new Float32Array( ArMax );

    energy.reset();

    self.postMessage({ m:'start' });

}