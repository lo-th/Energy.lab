(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.NRJ = {})));
}(this, (function (exports) { 'use strict';

	// Polyfills

	if ( Number.EPSILON === undefined ) {

		Number.EPSILON = Math.pow( 2, - 52 );

	}

	//

	if ( Math.sign === undefined ) {

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign

		Math.sign = function ( x ) {

			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;

		};

	}

	if ( Function.prototype.name === undefined ) {

		// Missing in IE9-11.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name

		Object.defineProperty( Function.prototype, 'name', {

			get: function () {

				return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];

			}

		} );

	}

	if ( Object.assign === undefined ) {

		// Missing in IE.
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

		( function () {

			Object.assign = function ( target ) {

				if ( target === undefined || target === null ) {

					throw new TypeError( 'Cannot convert undefined or null to object' );

				}

				var output = Object( target );

				for ( var index = 1; index < arguments.length; index ++ ) {

					var source = arguments[ index ];

					if ( source !== undefined && source !== null ) {

						for ( var nextKey in source ) {

							if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {

								output[ nextKey ] = source[ nextKey ];

							}

						}

					}

				}

				return output;

			};

		} )();

	}

	var Energy = {

	    dBodyAddForce: Module.cwrap('dBodyAddForce', '', ['number', 'number', 'number', 'number']),
	    dBodyAddRelForce: Module.cwrap('dBodyAddRelForce', '', ['number', 'number', 'number', 'number']),
	    dBodyAddRelTorque: Module.cwrap('dBodyAddRelTorque', '', ['number', 'number', 'number', 'number']),
	    dBodyAddTorque: Module.cwrap('dBodyAddTorque', '', ['number', 'number', 'number', 'number']),
	    dBodyCreate: Module.cwrap('dBodyCreate', 'number', ['number']),
	    dBodyDestroy: Module.cwrap('dBodyDestroy', '', ['number']),
	    dBodyDisable: Module.cwrap('dBodyDisable', '', ['number']),
	    dBodyEnable: Module.cwrap('dBodyEnable', '', ['number']),
	    dBodyGetAngularVel: Module.cwrap('dBodyGetAngularVel', 'number', ['number']),
	    dBodyGetForce: Module.cwrap('dBodyGetForce', 'number', ['number']),
	    dBodyGetLinearVel: Module.cwrap('dBodyGetLinearVel', 'number', ['number']),
	    dBodyGetPosition: Module.cwrap('dBodyGetPosition', 'number', ['number']),
	    dBodyGetQuaternion: Module.cwrap('dBodyGetQuaternion', 'number', ['number']),
	    dBodyGetTorque: Module.cwrap('dBodyGetTorque', 'number', ['number']),
	    dBodyIsEnabled: Module.cwrap('dBodyIsEnabled', 'number', ['number']),
	    dBodySetAngularVel: Module.cwrap('dBodySetAngularVel', '', ['number', 'number', 'number', 'number']),
	    dBodySetAutoDisableAngularThreshold: Module.cwrap('dBodySetAutoDisableAngularThreshold', '', ['number', 'number']),
	    dBodySetAutoDisableAverageSamplesCount: Module.cwrap('dBodySetAutoDisableTime', '', ['number', 'number']),
	    dBodySetAutoDisableFlag: Module.cwrap('dBodySetAutoDisableFlag', '', ['number', 'number']),
	    dBodySetAutoDisableLinearThreshold: Module.cwrap('dBodySetAutoDisableLinearThreshold', '', ['number', 'number']),
	    dBodySetAutoDisableTime: Module.cwrap('dBodySetAutoDisableTime', '', ['number', 'number']),
	    dBodySetFiniteRotationMode: Module.cwrap('dBodySetFiniteRotationMode', '', ['number', 'number']),
	    dBodySetGyroscopicMode: Module.cwrap('dBodySetGyroscopicMode', '', ['number', 'number']),
	    dBodySetForce: Module.cwrap('dBodySetForce', '', ['number', 'number', 'number', 'number']),
	    dBodySetLinearVel: Module.cwrap('dBodySetLinearVel', '', ['number', 'number', 'number', 'number']),
	    dBodySetMass: Module.cwrap('dBodySetMass', '', ['number', 'number']),
	    dBodyGetMass: Module.cwrap('dBodyGetMass', '', ['number', 'number']),
	    dBodySetPosition: Module.cwrap('dBodySetPosition', '', ['number', 'number', 'number', 'number']),
	    dBodySetQuaternion: Module.cwrap('dBodySetQuaternion', '', ['number', 'number']),
	    dBodySetRotation: Module.cwrap('dBodySetRotation', '', ['number', 'number']),
	    dBodySetTorque: Module.cwrap('dBodySetTorque', '', ['number', 'number', 'number', 'number']),
	    dBodyGetDxFlags: Module.cwrap('dBodyGetDxFlags', 'number', ['number']),
	    dBodyGetFlags: Module.cwrap('dBodyGetFlags', 'number', ['number']),
	    dBodySetFlags: Module.cwrap('dBodySetFlags', '', ['number', 'number']),
	    dBodySetNotification_interval: Module.cwrap('dBodySetNotification_interval', '', ['number', 'number']),
	    
	    dCreateBox: Module.cwrap('dCreateBox', 'number', ['number', 'number', 'number', 'number']),
	    dCreateCylinder: Module.cwrap('dCreateCylinder', 'number', ['number', 'number']),
	    dCreateHeightfield: Module.cwrap('dCreateHeightfield', 'number', ['number', 'number', 'number']),
	    dCreatePlane: Module.cwrap('dCreatePlane', 'number', ['number', 'number', 'number', 'number', 'number']),
	    dCreateSphere: Module.cwrap('dCreateSphere', 'number', ['number', 'number']),
	    dCreateTriMesh: Module.cwrap('dCreateTriMesh', 'number', ['number', 'number', 'number', 'number', 'number']),
	    dCreateRay: Module.cwrap("dCreateRay", "number", ['number', 'number']),
	    dGeomRaySet: Module.cwrap("dGeomRaySet", "", ['number', 'number', 'number', 'number', 'number', 'number', 'number']),
	    dGeomDestroy: Module.cwrap('dGeomDestroy', '', ['number']),
	    dGeomGetMaterial: Module.cwrap('dGeomGetMaterial', 'number', ['number']),
	    dGeomGetPosition: Module.cwrap('dGeomGetPosition', 'number', ['number']),
	    dGeomGetQuaternion: Module.cwrap('dGeomGetQuaternion', '', ['number', 'number']),
	    dGeomHeightfieldDataBuildDouble: Module.cwrap('dGeomHeightfieldDataBuildDouble', '', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']),
	    dGeomHeightfieldDataCreate: Module.cwrap('dGeomHeightfieldDataCreate', 'number', []),
	    dGeomHeightfieldDataSetBounds: Module.cwrap('dGeomHeightfieldDataSetBounds', '', ['number', 'number', 'number']),
	    dGeomSetBody: Module.cwrap('dGeomSetBody', '', ['number', 'number']),
	    dGeomSetMaterial: Module.cwrap('dGeomSetMaterial', '', ['number', 'number']),
	    dGeomSetMotionVector: Module.cwrap('dGeomSetMotionVector', '', ['number', 'number']),
	    dGeomSetOffsetPosition: Module.cwrap('dGeomSetOffsetPosition', '', ['number', 'number', 'number']),
	    dGeomSetPosition: Module.cwrap('dGeomSetPosition', '', ['number', 'number', 'number', 'number']),
	    dGeomSetQuaternion: Module.cwrap('dGeomSetQuaternion', '', ['number', 'number']),
	    dGeomTriMeshDataBuildSingle: Module.cwrap('dGeomTriMeshDataBuildSingle', '', []),
	    dGeomTriMeshDataCreate: Module.cwrap('dGeomTriMeshDataCreate', 'number', []),

	    getGeomsCollisionData: Module.cwrap('getGeomsCollisionData', 'number', []),
	    getGeomsCollisionBody: Module.cwrap('getGeomsCollisionBody', 'number', []),
	    getGeomsCollisionDataLength: Module.cwrap('getGeomsCollisionDataLength', 'number', []),

	    dInitODE2: Module.cwrap('dInitODE2', '', ['number']),
	    dInitODE: Module.cwrap('dInitODE', '', []),

	    dJointAttach: Module.cwrap('dJointAttach', '', ['number', 'number', 'number']),
	    dJointCreateBall: Module.cwrap('dJointCreateBall', 'number', ['number', 'number']),
	    dJointCreateHinge2: Module.cwrap('dJointCreateHinge2', 'number', ['number', 'number']),
	    dJointCreateHinge: Module.cwrap('dJointCreateHinge', 'number', ['number', 'number']),
	    dJointCreateSlider: Module.cwrap('dJointCreateSlider', 'number', ['number', 'number']),
	    dJointCreateTransmission: Module.cwrap('dJointCreateTransmission', '', ['number', 'number']),
	    dJointCreateAMotor: Module.cwrap('dJointCreateAMotor', '', ['number', 'number']),
	    dJointCreateLMotor: Module.cwrap('dJointCreateLMotor', '', ['number', 'number']),
	    dJointCreateUniversal: Module.cwrap('dJointCreateUniversal', '', ['number', 'number']),
	    dJointCreatePiston: Module.cwrap('dJointCreatePiston', '', ['number', 'number']),
	    dJointCreateFixed: Module.cwrap('dJointCreateFixed', '', ['number', 'number']),
	    dJointDestroy: Module.cwrap('dJointDestroy', '', ['number']),
	    dJointGetHinge2Anchor2: Module.cwrap('dJointGetHinge2Anchor2', '', ['number', 'number']),
	    dJointGetHinge2Anchor: Module.cwrap('dJointGetHinge2Anchor', '', ['number', 'number']),
	    dJointGetHinge2Angle1: Module.cwrap('dJointGetHinge2Angle1', '', ['number']),
	    dJointGetHinge2Axis1: Module.cwrap('dJointGetHinge2Axis1', '', ['number', 'number']),
	    dJointGetHinge2Axis2: Module.cwrap('dJointGetHinge2Axis2', '', ['number', 'number']),
	    dJointGetHingeAnchor2: Module.cwrap('dJointGetHingeAnchor2', '', ['number', 'number']),
	    dJointGetHingeAnchor: Module.cwrap('dJointGetHingeAnchor', '', ['number', 'number']),
	    dJointGetHingeAxis: Module.cwrap('dJointGetHingeAxis', '', ['number', 'number']),
	    dJointGetHingeAngle: Module.cwrap('dJointGetHingeAngle', 'number', ['number']),
	    dJointGetHingeAngleRate: Module.cwrap('dJointGetHingeAngleRate', 'number', ['number']),
	    dJointGroupCreate: Module.cwrap('dJointGroupCreate', 'number', ['number']),
	    dJointGroupDestroy: Module.cwrap('dJointGroupDestroy', '', ['number']),
	    dJointGroupEmpty: Module.cwrap('dJointGroupEmpty', '', ['number']),
	    dJointSetBallAnchor: Module.cwrap('dJointSetBallAnchor', '', ['number', 'number', 'number', 'number']),
	    dJointSetBallAnchor2: Module.cwrap('dJointSetBallAnchor2', '', ['number', 'number', 'number', 'number']),
	    dJointSetBallParam: Module.cwrap('dJointSetBallParam', '', ['number', 'number', 'number']),
	    dJointGetBallAnchor: Module.cwrap('dJointGetBallAnchor', '', ['number', 'number']),
	    dJointGetBallAnchor2: Module.cwrap('dJointGetBallAnchor2', '', ['number', 'number']),
	    dJointSetFeedback: Module.cwrap('dJointSetFeedback', '', ['number', 'number']),
	    dJointSetHinge2Anchor: Module.cwrap('dJointSetHinge2Anchor', '', ['number', 'number', 'number', 'number']),
	    dJointSetHinge2Axis1: Module.cwrap('dJointSetHinge2Axis1', '', ['number', 'number', 'number', 'number']),
	    dJointSetHinge2Axis2: Module.cwrap('dJointSetHinge2Axis2', '', ['number', 'number', 'number', 'number']),
	    dJointSetHinge2Param: Module.cwrap('dJointSetHinge2Param', '', ['number', 'number', 'number']),
	    dJointSetHingeAnchor: Module.cwrap('dJointSetHingeAnchor', '', ['number', 'number', 'number', 'number']),
	    dJointSetHingeAxis: Module.cwrap('dJointSetHingeAxis', '', ['number', 'number', 'number', 'number']),
	    dJointSetHingeParam: Module.cwrap('dJointSetHingeParam', '', ['number', 'number', 'number']),
	    dJointSetSliderAxis: Module.cwrap('dJointSetSliderAxis', '', ['number', 'number', 'number', 'number']),
	    dJointSetSliderParam: Module.cwrap('dJointSetSliderParam', '', ['number', 'number', 'number']),
	    dJointSetTransmissionAnchor1: Module.cwrap('dJointSetTransmissionAnchor1', '', ['number', 'number', 'number', 'number']),
	    dJointSetTransmissionAnchor2: Module.cwrap('dJointSetTransmissionAnchor2', '', ['number', 'number', 'number', 'number']),
	    dJointSetTransmissionAxis1: Module.cwrap('dJointSetTransmissionAxis1', '', ['number', 'number', 'number', 'number']),
	    dJointSetTransmissionAxis2: Module.cwrap('dJointSetTransmissionAxis2', '', ['number', 'number', 'number', 'number']),
	    dJointSetTransmissionAxis: Module.cwrap('dJointSetTransmissionAxis', '', ['number', 'number', 'number', 'number']),
	    dJointSetTransmissionBacklash: Module.cwrap('dJointSetTransmissionBacklash', '', ['number', 'number']),
	    dJointSetTransmissionMode: Module.cwrap('dJointSetTransmissionMode', '', ['number', 'number']),
	    dJointSetTransmissionRatio: Module.cwrap('dJointSetTransmissionRatio', '', ['number', 'number']),

	    dMassAdjust: Module.cwrap('dMassAdjust', '', ['number', 'number']),
	    dMassSetBox: Module.cwrap('dMassSetBox', '', ['number', 'number', 'number', 'number']),
	    dMassSetCylinder: Module.cwrap('dMassSetCylinder', '', ['number', 'number', 'number', 'number', 'number']),
	    dMassSetSphere: Module.cwrap('dMassSetSphere', '', ['number', 'number', 'number']),
	    dMassSetTrimesh: Module.cwrap('dMassSetTrimesh', '', ['number', 'number', 'number']),
	    dMassTranslate: Module.cwrap('dMassTranslate', '', ['number', 'number', 'number']),
	    dMaterialCreate: Module.cwrap('dMaterialCreate', 'number', ['number']),
	    dMaterialGetParameter: Module.cwrap('dMaterialGetParameter', 'number', ['number', 'number']),
	    dMaterialSetParameter: Module.cwrap('dMaterialSetParameter', '', ['number', 'number', 'number']),
	    dRFromAxisAndAngle: Module.cwrap('dRFromAxisAndAngle', '', ['number', 'number', 'number', 'number', 'number']),
	    dRFromZAxis: Module.cwrap('dRFromZAxis', '', ['number', 'number', 'number', 'number']),
	    dRSetIdentity: Module.cwrap('dRSetIdentity', '', ['number']),
	    dAreConnected: Module.cwrap('dAreConnected', 'number', ['number', 'number']),
	    dAreConnectedExcluding: Module.cwrap('dAreConnectedExcluding', 'number', ['number', 'number', 'number']),
	    dSimpleSpaceCreate: Module.cwrap('dSimpleSpaceCreate', 'number', ['number']),
	    dHashSpaceCreate: Module.cwrap('dHashSpaceCreate', 'number', ['number']),
	    dHashSpaceSetLevels: Module.cwrap('dHashSpaceSetLevels', '', ['number', 'number', 'number']),

	    dSpaceDestroy: Module.cwrap('dSpaceDestroy', '', ['number']),
	    dSpaceCollide: Module.cwrap('dSpaceCollide', '', ['number', 'number', 'number']),

	    dWorldCreate: Module.cwrap('dWorldCreate', '', ['number']),
	    dWorldGetGravity2: Module.cwrap('dWorldGetGravity2', 'number', ['number']),
	    dWorldDestroy: Module.cwrap('dWorldDestroy', '', ['number']),
	    dWorldGetQuickStepNumIterations: Module.cwrap('dWorldGetQuickStepNumIterations', 'number', ['number']),
	    dWorldQuickStep: Module.cwrap('dWorldQuickStep', 'number', ['number', 'number']),
	    dWorldSetGravity: Module.cwrap('dWorldSetGravity', '', ['number', 'number', 'number', 'number']),
	    dWorldSetQuickStepNumIterations: Module.cwrap('dWorldSetQuickStepNumIterations', '', ['number', 'number']),
	    dWorldStep: Module.cwrap('dWorldStep', 'number', ['number', 'number']),
	    dWorldSetAutoDisableAverageSamplesCount: Module.cwrap('dWorldSetAutoDisableAverageSamplesCount', '', ['number', 'number']),
	    dWorldSetAutoDisableFlag: Module.cwrap('dWorldSetAutoDisableFlag', '', ['number', 'number']),
	    dWorldSetAutoDisableLinearThreshold: Module.cwrap('dWorldSetAutoDisableLinearThreshold', '', ['number', 'number']),
	    dWorldSetAutoDisableAngularThreshold: Module.cwrap('dWorldSetAutoDisableAngularThreshold', '', ['number', 'number']),
	    dWorldSetAutoDisableSteps: Module.cwrap('dWorldSetAutoDisableSteps', '', ['number', 'number']),
	    dWorldSetAutoDisableTime: Module.cwrap('dWorldSetAutoDisableTime', '', ['number', 'number']),
	    dWorldSetNotificationInterval: Module.cwrap('dWorldSetNotificationInterval', '', ['number', 'number']),
	    dWorldSetFlags: Module.cwrap('dWorldSetFlags', '', ['number', 'number']),
	    dWorldGetFlags: Module.cwrap('dWorldGetFlags', 'number', ['number']),
	    dWorldGetDxFlags: Module.cwrap('dWorldGetDxFlags', 'number', ['number']),
	    dWorldSetERP: Module.cwrap('dWorldSetERP', '', ['number', 'number']),
	    dWorldSetCFM: Module.cwrap('dWorldSetCFM', '', ['number', 'number']),
	    dWorldGetERP: Module.cwrap('dWorldGetERP', 'number', ['number']),
	    dWorldGetCFM: Module.cwrap('dWorldGetCFM', 'number', ['number']),

	    init: Module.cwrap('init', 'boolean', ['number', 'number', 'number', 'number']),
	    setFlagmode: Module.cwrap('setFlagmode', '', ['number']),
	    setFlagmode2: Module.cwrap('setFlagmode2', '', ['number']),
	    setMaxContact: Module.cwrap('setMaxContact', '', ['number']),
	    setTimestep: Module.cwrap('setTimestep', '', ['number', 'number']),
	    run: Module.cwrap('run', '', []),
	    closeEnergy: Module.cwrap('dCloseODE', '', []),

	};

	var Tools = {

	    Malloc_Float64Array: function ( f64, q ) {

	        var nDataBytes = f64.length * f64.BYTES_PER_ELEMENT;
	        if( q === undefined ) q = _malloc( nDataBytes );
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
	        dataHeap.set(new Uint8Array(f64.buffer));
	        return q;

	    },

	    Malloc_Float32Array: function ( f32, q ) {

	        var nDataBytes = f32.length * f32.BYTES_PER_ELEMENT;
	        if( q === undefined ) q = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
	        dataHeap.set(new Uint8Array(f32.buffer));
	        return q;
	    },

	    Malloc_Int32: function ( uint32, q ) {

	        var nDataBytes = uint32.length * uint32.BYTES_PER_ELEMENT;
	        if( q === undefined ) q = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
	        dataHeap.set(new Uint8Array(uint32.buffer));
	        return q;

	    },

	    Malloc_Quaternion: function ( w, x, y, z, q ) {

	        var size = new Float64Array([w, x, y, z]);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        if( q === undefined ) q = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return q;

	    },

	    Malloc_Vector3: function ( x, y, z, v ) {

	        var size = new Float64Array([x, y, z]);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        if( v === undefined ) v = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, v, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return v;

	    },

	    /*Malloc_new_quaternion: function () {

	        var size = new Float64Array(4);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        var q = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return q;

	    },

	    Malloc_new_Vector3: function () {

	        var size = new Float64Array(3);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        var v3 = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, v3, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return v3;

	    },*/

	    Malloc_dMass_Struct: function () {

	        var size = new Float64Array(17);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        var m = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, m, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return m;

	    },

	    Malloc_dMatrix3x3: function () {

	        var size = new Float64Array(12);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        this.DMatrix3_ptr = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, this.DMatrix3_ptr, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return this.DMatrix3_ptr;

	    },
	    
	    Malloc_feedback_struct: function () {

	        var size = new Float64Array(16);
	        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
	        this.feedBack = _malloc(nDataBytes);
	        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, this.feedBack, nDataBytes);
	        dataHeap.set(new Uint8Array(size.buffer));
	        return this.feedBack;

	    },

	    Free_DMatrix3_Ptr: function ( ptr ) {

	        _free(ptr);

	    },

	    Free_dMass_Struc: function () {

	        _free( this.Mass_ptr );

	    },

	    Free: function ( ar ) {

	        _free( ar );

	    },

	    Pointer_To_Vector3: function ( ptr, swapTOxzy ) {

	        var x = Module.getValue(ptr + 0, 'double');
	        var y = Module.getValue(ptr + 8, 'double');
	        var z = Module.getValue(ptr + 16, 'double');
	        if (!swapTOxzy) {
	            return new Array(x, y, z);
	        }
	        else {
	            return new Array(x, z, y);
	        }

	    },

	    UpdateQuaternion: function ( ptr, w, x, y, z ) {

	        Module.setValue(ptr + 0, w, 'double');
	        Module.setValue(ptr + 8, x, 'double');
	        Module.setValue(ptr + 16, y, 'double');
	        Module.setValue(ptr + 24, z, 'double');

	    },

	    Pointer_To_Vector4: function ( ptr, isQuaternion ) {
	        if (isQuaternion) {
	            var w = Module.getValue(ptr + 0, 'double');
	            var x = -Module.getValue(ptr + 8, 'double');
	            var y = -Module.getValue(ptr + 16, 'double');
	            var z = -Module.getValue(ptr + 24, 'double');
	        }
	        else {
	            var w = Module.getValue(ptr + 0, 'double');
	            var x = Module.getValue(ptr + 8, 'double');
	            var y = Module.getValue(ptr + 16, 'double');
	            var z = Module.getValue(ptr + 24, 'double');
	        }
	        return new Array(w, x, y, z);
	    }
	};

	var PhysicMaterial = {

	    Instances: [],
	    DefaultMaterial: null,

	    add: function ( name ) {

	        var m = new Material( name );
	        this.Instances.push( m );
	        return m;

	    },

	    GetDefault: function () {
	        PhysicMaterial.DefaultMaterial = this.add('defaultPhysicMaterial');
	        return PhysicMaterial.DefaultMaterial;
	    }

	};

	function Material( name ) {

	    this.name = name;
	    this.dxMaterial = Energy.dMaterialCreate(0);
	    PhysicMaterial.Instances.push(this);

	}

	Material.prototype = {
	    setMaterialParameter: function ( param, value ) {

	        //console.log(param, value)
	        Energy.dMaterialSetParameter( this.dxMaterial, param, value );

	    },

	    getMaterialParameter: function (param) {

	        return Energy.dMaterialGetParameter( this.dxMaterial, param );

	    }
	};

	/*
	 * A list of constants built-in for
	 * the energy physics engine.
	 */

	// joint parametres
	var dParamLoStop = 0;
	var dParamHiStop = 1;
	var dParamVel = 2;
	var dParamLoVel = 3;
	var dParamHiVel = 4;
	var dParamFMax = 5;
	var dParamFudgeFactor = 6;
	var dParamBounce = 7;
	var dParamCFM = 8;
	var dParamStopERP = 9;
	var dParamStopCFM = 10;
	var dParamSuspensionERP = 11;
	var dParamSuspensionCFM = 12;
	var dParamERP = 13;
	var dParamFMax2 = 261;
	var dParamVel2 = 258;
	var dTransmissionParallelAxes = 0;
	var dTransmissionIntersectingAxes = 1;
	var dTransmissionChainDrive = 2;

	// DynamicObject parametres
	var mu = 0x001;
	var mu2 = 0x002;
	var bounce = 0x004;
	var bounce_vel = 0x008;
	var soft_erp = 0x010;
	var soft_cfm = 0x020;
	var rho = 0x040;
	var rho2 = 0x080;
	var rhoN = 0x100;
	var motion1 = 0x200;
	var motion2 = 0x400;
	var motionN = 0x800;
	var slip1 = 0x1000;
	var slip2 = 0x2000;

	function DynamicObject() {

	    this.isDisable = false;
	    this.dxBody = null;
	    this.dxGeom = null;
	    this.dxMaterial = null;
	    this.density = 0;
	    this.dxMass = null;

	    this.pointer_pos = Tools.Malloc_Vector3();
	    this.pointer_rot = Tools.Malloc_Quaternion(1,0,0,0);//Malloc_new_quaternion();

	    this.parametres = {

	        mu: mu,
	        mu2: mu2,
	        bounce: bounce,
	        bounce_vel: bounce_vel,
	        soft_erp: soft_erp,
	        soft_cfm: soft_cfm,
	        rho: rho,
	        rho2: rho2,
	        rhoN: rhoN,
	        motion1: motion1,
	        motion2: motion2,
	        motionN: motionN,
	        slip1: slip1,
	        slip2: slip2

	    }; 

	}

	DynamicObject.prototype = {

	    constructor: DynamicObject,

	    setParam: function ( name, value ) { 

	        if ( typeof name == 'string' || name instanceof String ) this.physicMaterial.setMaterialParameter( this.parametres[ name ], value );
	        else for( var p in name) this.physicMaterial.setMaterialParameter( this.parametres[ p ], name[p] );

	    },

	    getDxBodyPointersAndFlag: function () {

	        Energy.dMassAdjust(this.dxMass, this.density);
	        Energy.dBodySetMass(this.dxBody, this.dxMass);
	        Energy.dGeomSetBody(this.dxGeom, this.dxBody);
	        this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	        this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        this.dxFlags = Energy.dBodyGetDxFlags(this.dxBody);
	        Tools.Free_dMass_Struc();

	    },

	    dGeomSetMaterial: function ( pmat ) {

	        if ( this.dxGeom != null ) {
	            this.physicMaterial = new Material();//pmat;
	            this.dxMaterial = this.physicMaterial.dxMaterial;
	            Energy.dGeomSetMaterial( this.dxGeom, this.physicMaterial.dxMaterial );
	        }
	        else {
	            console.log("assign material failed, dxGeom is null");
	        }

	    },


	    /*dBodySetRotation: function ( R ) {

	        Energy.dBodySetRotation( this.dxBody, R );

	    },*/

	    dBodySetPosition: function ( x, y, z ) {

	        Energy.dBodySetPosition( this.dxBody, x, y, z );
	        //Module._dBodySetPosition(this.dxBody, x, y, z);

	    },

	    dBodySetQuaternion: function ( w, x, y, z ) {

	        var q = Tools.Malloc_Quaternion( w, x, y, z, this.pointer_rot );
	        Energy.dBodySetQuaternion( this.dxBody, q );
	        //Module._dBodySetQuaternion(this.dxBody, q);

	    },

	    dGeomSetPosition: function ( x, y, z ) {

	        Energy.dGeomSetPosition( this.dxGeom, x, y, z );

	    },

	    dGeomSetQuaternion: function ( w, x, y, z ) {

	        var q = Tools.Malloc_Quaternion( w, x, y, z, this.pointer_rot );
	        Energy.dGeomSetQuaternion( this.dxGeom, q );

	    },

	    makePointer: function () {

	        if ( this.dxBody !== null ) {
	            this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	            this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        } else {
	            this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
	            Energy.dGeomGetQuaternion(this.dxGeom, this.pointer_rot);
	        }

	    },


	    setTransform: function ( p, r ) {

	    	//Module._dGeomSetPosition( this.dxGeom, p[0], p[2], p[1] );
	    	//var q = Tools.Malloc_Quaternion(r[3], -r[0], -r[2], -r[1]);
	        if ( this.dxBody !== null ) {
	            this.dBodySetPosition( p[0], p[2], p[1] );
	            this.dBodySetQuaternion( r[3], -r[0], -r[2], -r[1] );
	            //Energy.dBodySetQuaternion(this.dxBody, q);
	        } else {
	            this.dGeomSetPosition( p[0], p[2], p[1] );
	            this.dGeomSetQuaternion( r[3], -r[0], -r[2], -r[1] );
	            //Energy.dGeomSetQuaternion(this.dxGeom, q);
	            //this.pointer_rot = q;
	        }
	        
	    },

	    getTransform: function () {
	        return [
	            //Module.HEAP32[((Energy.dBodyGetDxFlags(this.dxBody)) >> 2)] & 4,
	            0,
	            
	            Module.HEAPF64[((this.pointer_pos) >> 3)],
	            Module.HEAPF64[((this.pointer_pos + 16) >> 3)],
	            Module.HEAPF64[((this.pointer_pos + 8) >> 3)],

	            -Module.HEAPF64[((this.pointer_rot + 8) >> 3)],
	            -Module.HEAPF64[((this.pointer_rot + 24) >> 3)],
	            -Module.HEAPF64[((this.pointer_rot + 16) >> 3)],
	            Module.HEAPF64[((this.pointer_rot) >> 3)]
	        ]
	    },

	    setSoftERP: function ( value ) {

	        this.physicMaterial.setMaterialParameter( soft_erp, value );

	    },

	    setSoftCFM: function ( value ) {

	        this.physicMaterial.setMaterialParameter( soft_cfm, value );

	    },

	    setBounce: function ( value ) {

	        this.physicMaterial.setMaterialParameter( bounce, value );

	    },

	    setBounce_vel: function ( value ) {

	        this.physicMaterial.setMaterialParameter( bounce_vel, value );

	    },

	    setFriction: function ( value ) {

	        this.physicMaterial.setMaterialParameter( mu, value );

	    },


	    dGeomGetPosition: function () {

	        return [Module.HEAPF64[((this.pointer_pos) >> 3)], Module.HEAPF64[((this.pointer_pos + 16) >> 3)], Module.HEAPF64[((this.pointer_pos + 8) >> 3)]];

	    },

	    /*dGeomGetQuaternion: function () {

	        var q = Tools.Malloc_new_quaternion();
	        Energy.dGeomGetQuaternion( this.dxGeom, q );
	        return Tools.Pointer_To_Vector4( q, true );

	    },*/

	    setQuaternion: function (w, x, y, z) {

	        Tools.Malloc_Quaternion(w, x, y, z, this.pointer_rot);

	        //var q = 
	        //this.pointer_rot = q;

	        if (this.dxBody != null) Energy.dBodySetQuaternion( this.dxBody, this.pointer_rot );
	        else Energy.dGeomSetQuaternion( this.dxGeom, this.pointer_rot );

	    },

	    dBodySetLinearVel: function ( x, y, z ) {

	        Energy.dBodySetLinearVel(this.dxBody, x, y, z);

	    },

	    dBodySetAngularVel: function (x, y, z) {

	        Energy.dBodySetAngularVel(this.dxBody, x, y, z);

	    },

	    dBodyAddForce: function ( fx, fy, fz, useLocal ) {

	        if (useLocal) Energy.dBodyAddRelForce(this.dxBody, fx, fy, fz);
	        else Energy.dBodyAddForce(this.dxBody, fx, fy, fz);

	    },

	    dBodyGetForce: function () {

	        return Tools.Pointer_To_Vector3(Energy.dBodyGetForce(this.dxBody), true);

	    },

	    dBodySetForce: function ( fx, fy, fz ) {

	        Energy.dBodySetForce(this.dxBody, fx, fy, fz);

	    },

	    dBodyAddTorque: function ( fx, fy, fz, useLocal ) {

	        if (useLocal) Energy.dBodyAddRelTorque( this.dxBody, fx, fy, fz );
	        else Energy.dBodyAddTorque( this.dxBody, fx, fy, fz );

	    },

	    dBodySetTorque: function ( fx, fy, fz ) {

	        Energy.dBodySetTorque(this.dxBody, fx, fy, fz);

	    },

	    dBodyGetTorque: function () {

	        return Tools.Pointer_To_Vector3(Energy.dBodyGetTorque(this.dxBody), true);

	    },

	    dBodyGetLinearVel: function () {

	        return Tools.Pointer_To_Vector3(Energy.dBodyGetLinearVel(this.dxBody), true);

	    },

	    dBodyGetAngularVel: function () {

	        return Tools.Pointer_To_Vector3(Energy.dBodyGetAngularVel(this.dxBody), true);

	    },


	    enabled: function () {

	        Energy.dBodyEnable(this.dxBody);

	    },

	    disable: function () {

	        Energy.dBodyDisable(this.dxBody);

	    },

	    dBodyIsEnabled: function () {

	        var n = 4;
	        if(this.dxBody!==null) n = Module.HEAP32[(( Energy.dBodyGetDxFlags(this.dxBody) ) >> 2)] & 4;

	        return n;
	        //return Module.HEAP32[((this.dxFlags) >> 2)] & 4//4;//dxBodyDisabled;

	    },

	    dBodySetNotification_interval: function ( interval ) {

	        Energy.dBodySetNotification_interval(this.dxBody, interval);

	    },

	    destroyDynamicObject: function () {

	        if (this.dxGeom) {
	            this.dGeomDestroy();
	            this.dxGeom = null;
	        }
	        
	        if (this.dxBody) {
	            this.dBodyDestroy();
	            this.dxBody = null;
	        }

	    },

	    dBodyGetFlags: function () {

	        return Energy.dBodyGetFlags(this.dxBody);

	    },

	    dBodySetFlags: function ( flags ) {

	        if(this.dxBody) Energy.dBodySetFlags( this.dxBody, flags );

	    },

	    dGeomDestroy: function () {

	        Energy.dGeomDestroy( this.dxGeom );

	    },

	    dBodyDestroy: function () {

	        Energy.dBodyDestroy( this.dxBody );

	    },

	    

	    dispose: function (){

	        this.destroyDynamicObject();

	    },

	    dBodyDisable: function (){

	        Energy.dBodyDisable( this.dxBody );

	    },

	    dBodyEnable: function (){

	        Energy.dBodyEnable( this.dxBody );

	    },


	    setZeroForce: function (){

	        this.dBodyDisable();
	        this.dBodySetForce( 0, 0, 0 );
	        this.dBodySetTorque( 0, 0, 0 );
	        this.dBodySetLinearVel( 0, 0, 0 );
	        this.dBodySetAngularVel( 0, 0, 0 );
	        this.dBodyEnable();

	    },


	    /*NotifyState = function (pointer) {
	        for (var i = 0; i < DynamicObject.Instances.length; i++) {
	            if (pointer == DynamicObject.Instances[i].dxBody) {
	                DynamicObject.Instances[i].isDisable = true;
	                DynamicObject.Instances[i].mesh.isVisible = false;
	                DynamicObject.Instances[i].mesh.getChildMeshes()[0].isVisible = true;
	                break;
	            }
	        }
	    };
	    NotifyState2 = function (pointer) {
	        for (var i = 0; i < DynamicObject.Instances.length; i++) {
	            if (pointer == DynamicObject.Instances[i].dxBody) {
	                DynamicObject.Instances[i].isDisable = false;
	                DynamicObject.Instances[i].mesh.isVisible = true;
	                DynamicObject.Instances[i].mesh.getChildMeshes()[0].isVisible = false;
	                break;
	            }
	        }
	    };*/

	    makeBody:function (){

	        if( this.dxBody === null ) this.dxBody = Energy.dBodyCreate( this.dxWorld );
	        
	    },

	    geomSetBody: function ( g ){

	        Energy.dGeomSetBody( g, this.dxBody );

	    },

	    dBodyGetMass: function () {

	        return Module.HEAPF64[((this.dxMass) >> 3)];

	    },

	    dBodySetMass: function ( density ) {

	        if( density ) this.density = density;
	        Energy.dMassAdjust( this.dxMass, this.density );
	        Energy.dBodySetMass( this.dxBody, this.dxMass );

	    },

	    setMassfromGeometry: function ( o ) {

	        if( this.dxMass === null ) this.dxMass = Tools.Malloc_dMass_Struct();

	        switch( o.type ){

	            case 'box': Energy.dMassSetBox( this.dxMass, this.density, o.lx, o.ly, o.lz ); break;
	            case 'sphere': Energy.dMassSetSphere( this.dxMass, this.density, o.radius ); break;
	            case 'cylinder': Energy.dMassSetCylinder( this.dxMass, this.density, o.direction, o.radius, o.length ); break;
	            case 'Trimesh': 
	                Energy.dMassSetTrimesh( this.dxMass, this.density, this.dxGeom ); 
	                //var mc = Tools.Pointer_To_Vector3(this.dxMass + 8, false);
	                //Energy.dMassTranslate(this.dxMass, -mc[0], -mc[1], -mc[2] );
	            break;

	        }

	        this.dBodySetMass();

	    },

	    setMassCenter: function(x,y,z){

	        if(this.dxMass) Energy.dMassTranslate(this.dxMass, x, y, z );

	    }
	};

	//import { PhysicMaterial } from '../core/PhysicMaterial.js';
	//import { Tools } from '../core/Tools.js';

	function dynamicBox ( dxSpace, dxWorld, density, lx, ly, lz ) {

	    DynamicObject.call( this );

	    this.dxWorld = dxWorld;
	    this.density = density;
	    this.dxSpace = dxSpace;
	    this.lx = lx;
	    this.ly = ly;
	    this.lz = lz;
	    this.dxGeom = Energy.dCreateBox( this.dxSpace, this.lx, this.ly, this.lz);

	    if (this.density !== 0) {

	        this.makeBody();
	        this.setMassfromGeometry({type:'box', lx:this.lx, ly:this.ly, lz:this.lz });
	        this.geomSetBody( this.dxGeom );

	        //this.dxMass = Tools.Malloc_dMass_Struct();
	        //Energy.dMassSetBox( this.dxMass, this.density, this.lx, this.ly, this.lz );
	        //this.dBodySetMass( this.density );
	        //Energy.dMassAdjust( this.dxMass, this.density);
	        //Energy.dBodySetMass( this.dxBody, this.dxMass);
	        //Energy.dGeomSetBody( this.dxGeom, this.dxBody );
	        //this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	        //this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        //Tools.Free_dMass_Struc();

	        
	    }
	    /*else {
	        this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
	        this.pointer_rot = Tools.Malloc_new_quaternion();
	        Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
	    }*/

	    this.makePointer();
	    this.dGeomSetMaterial();// PhysicMaterial.GetDefault() );

	}
	dynamicBox.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: dynamicBox,

	});

	//import { PhysicMaterial } from '../core/PhysicMaterial.js';
	//import { Tools } from '../core/Tools.js';

	function dynamicSphere ( dxSpace, dxWorld, density, radius ) {

	    DynamicObject.call( this );

	    this.radius = radius || 1;
	    this.dxWorld = dxWorld;
	    this.density = density;
	    this.dxSpace = dxSpace;
	    this.dxGeom = Energy.dCreateSphere( this.dxSpace, this.radius );
	    
	    if (this.density != 0) {

	        this.makeBody();
	        this.setMassfromGeometry({type:'sphere', radius:this.radius });
	        this.geomSetBody( this.dxGeom );
	        //this.dxMass = Tools.Malloc_dMass_Struct();
	        //Energy.dMassSetSphere( this.dxMass, this.density, this.radius );
	        //this.dBodySetMass( this.density );
	        //Energy.dMassAdjust( this.dxMass, this.density);
	        //Energy.dBodySetMass( this.dxBody, this.dxMass);
	        //Energy.dGeomSetBody( this.dxGeom, this.dxBody );
	        //this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	        //this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        //Tools.Free_dMass_Struc();
	    }
	    /*else {
	        this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
	        this.pointer_rot = Tools.Malloc_new_quaternion();
	        Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
	    }*/

	    this.makePointer();
	    this.dGeomSetMaterial();
	}
	dynamicSphere.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: dynamicSphere,

	});

	//import { PhysicMaterial } from '../core/PhysicMaterial.js';
	//import { Tools } from '../core/Tools.js';

	function dynamicCylinder ( dxSpace, dxWorld, density, radius, length, direction ) {

	    DynamicObject.call( this );

	    this.dxWorld = dxWorld;
	    this.density = density;
	    this.dxSpace = dxSpace;
	    this.radius = radius;
	    this.length = length;
	    this.direction = direction || 1;//  (1=x, 2=y, 3=z)
	    this.dxGeom = Energy.dCreateCylinder( this.dxSpace, this.radius, this.length );

	    if (this.density != 0) {

	        this.makeBody();
	        this.setMassfromGeometry({type:'cylinder', direction:this.direction, radius:this.radius, length:this.length });
	        this.geomSetBody( this.dxGeom );
	       // this.dxBody = Energy.dBodyCreate( this.dxWorld );


	     //   this.dxMass = Tools.Malloc_dMass_Struct();
	       // Energy.dMassSetCylinder( this.dxMass, this.density, this.direction, this.radius, this.length );
	       // this.dBodySetMass( this.density );
	        //Energy.dMassAdjust( this.dxMass, this.density);
	        //Energy.dBodySetMass( this.dxBody, this.dxMass);
	        //Energy.dGeomSetBody( this.dxGeom, this.dxBody );
	       // this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	       // this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        //Tools.Free_dMass_Struc();
	    }
	    /*else {
	        this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
	        this.pointer_rot = Tools.Malloc_new_quaternion();
	        Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
	    }
	    this.dGeomSetMaterial( PhysicMaterial.GetDefault() );*/

	    this.makePointer();
	    this.dGeomSetMaterial();


	}
	dynamicCylinder.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: dynamicCylinder,

	});

	function dynamicHeightmap ( dxSpace, dxWorld, heightData, width, depth, widthSamples, depthSamples, scale, offset, thickness, bWrap ) {

	    DynamicObject.call( this );

	    this.dxWorld = dxWorld;
	    this.density = 0;
	    this.dxSpace = dxSpace;

	    this.scale = scale;// is the vertical sample height multiplier, a uniform scale applied to all raw height data;
	    this.offset = offset;// is the vertical sample offset, added to the scaled height data;
	    this.thickness = thickness;// is the thickness of AABB which is added below the lowest point, to prevent objects from falling through very thin heightfields;
	    this.bWrap = bWrap;// is 0 if the heightfield should be finite, 1 if should tile infinitely.
	    
	    this.pHeightData = Tools.Malloc_Float64Array( heightData );

	    this.dxHeightfieldData = Energy.dGeomHeightfieldDataCreate();
	    Energy.dGeomHeightfieldDataBuildDouble( this.dxHeightfieldData, this.pHeightData, 0, width, depth, widthSamples, depthSamples, this.scale, this.offset, this.thickness, this.bWrap );
	    //Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, -30, 30 );
	    Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, -1, scale+1 );
	    this.dxGeom = Energy.dCreateHeightfield( this.dxSpace, this.dxHeightfieldData, 1 );
	    //this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
	    //this.pointer_rot = Tools.Malloc_new_quaternion();
	    //Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
	    //this.dGeomSetMaterial( PhysicMaterial.GetDefault() );

	    this.makePointer();
	    this.dGeomSetMaterial();

	}
	dynamicHeightmap.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: dynamicHeightmap,

	    setBounds: function ( p, scale ) {

	        Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, p-1, p+scale+1 );

	    },

	    setHeightData: function ( heightData ) {

	        Tools.Malloc_Float64Array( heightData, this.pHeightData );

	    },

	});

	function dynamicTriMesh ( dxSpace, dxWorld, vertices, indices, density ) {

	    DynamicObject.call( this );

	    this.dxWorld = dxWorld;
	    this.dxSpace = dxSpace;
	    this.density = density;
	    
	    this.verticesPointer = Tools.Malloc_Float32Array(vertices);
	    this.indicesPointer = Tools.Malloc_Int32(indices);
	    this.dxTriMeshData = Energy.dGeomTriMeshDataCreate();
	    Energy.dGeomTriMeshDataBuildSingle(this.dxTriMeshData, this.verticesPointer, vertices.BYTES_PER_ELEMENT * 3, vertices.length / 3, this.indicesPointer, indices.length, indices.BYTES_PER_ELEMENT);
	    this.dxGeom = Energy.dCreateTriMesh(this.dxSpace, this.dxTriMeshData, 0, 0, 0);

	    if (this.density !== 0) {

	        this.makeBody();
	        this.setMassfromGeometry({type:'Trimesh' });
	        this.geomSetBody( this.dxGeom );
	        //this.dxBody = Energy.dBodyCreate(this.dxWorld);

	       /* this.dxMass = Tools.Malloc_dMass_Struct();
	        //this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
	        //this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
	        Energy.dMassSetTrimesh(this.dxMass, this.density, this.dxGeom);
	        Energy.dGeomSetBody(this.dxGeom, this.dxBody);
	        var mc = Tools.Pointer_To_Vector3(this.dxMass + 8, false);
	        Energy.dMassTranslate(this.dxMass, -mc[0], -mc[1], -mc[2] );
	        Energy.dBodySetMass( this.dxBody, this.dxMass );*/
	    }
	    /*else {
	        this.pointer_pos = Energy.dGeomGetPosition(this.dxGeom);
	        this.pointer_rot = Tools.Malloc_new_quaternion();
	        Energy.dGeomGetQuaternion(this.dxGeom, this.pointer_rot);
	    }*/
	    //this.dGeomSetMaterial(PhysicMaterial.GetDefault());

	    this.makePointer();
	    this.dGeomSetMaterial();

	}
	dynamicTriMesh.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: dynamicTriMesh,

	    setData: function ( vertices, indices ) {

	        Tools.Malloc_Float32Array( vertices, this.verticesPointer );
	        Tools.Malloc_Int32( indices, this.indicesPointer );

	    },

	});

	function staticPlane( dxSpace, a, b, c, d ) {

		DynamicObject.call( this );

	    this.dxGeom = Energy.dCreatePlane( dxSpace, a, b, c, d );
	    //Energy.dGeomSetMaterial( this.dxGeom, PhysicMaterial.GetDefault() );
	    this.dGeomSetMaterial( PhysicMaterial.GetDefault() );

	}

	staticPlane.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

		constructor: staticPlane,

		/*getDxGeom: function () {

	        return this.dxGeom;

	    }*/

	});

	function Joint( world, group ) {

	    this.dxWorld = world;
	    this.dxJointGroup = group;

	    this.dxJoint = null;

	    this.parametres = {

	        LoStop: dParamLoStop,//Low stop angle or position
	        HiStop: dParamHiStop,//High stop angle or position
	        Vel: dParamVel,//Desired motor velocity (this will be an angular or linear velocity).
	        LoVel: dParamLoVel,//The maximum force or torque that the motor will use to achieve the desired velocity default 0
	        HiVel: dParamHiVel,
	        FMax: dParamFMax,
	        FudgeFactor: dParamFudgeFactor,
	        Bounce: dParamBounce,// The bouncyness of the stops. This is a restitution parameter in the range 0..1. 0 means the stops are not bouncy at all, 1 means maximum bouncyness.
	        CFM: dParamCFM,//The constraint force mixing (CFM) value used when not at a stop.
	        StopERP: dParamStopERP,// The error reduction parameter (ERP) used by the stops
	        StopCFM: dParamStopCFM,
	        SuspensionERP: dParamSuspensionERP,// Suspension error reduction parameter (ERP). Currently this is only implemented on the hinge-2 joint.
	        SuspensionCFM: dParamSuspensionCFM,// Suspension constraint force mixing (CFM) value. Currently this is only implemented on the hinge-2 joint.
	        ERP: dParamERP,
	        FMax2: dParamFMax2,
	        Vel2: dParamVel2,
	        
	        // transmission mode
	        ParallelAxes: dTransmissionParallelAxes,// Parallel-axes: simulates parallel-axes gears
	        IntersectingAxes: dTransmissionIntersectingAxes,//Intersecting-axes: simulates intersecting-axes beveled gears
	        ChainDrive: dTransmissionChainDrive,// Chain-drive: simulate chain and sprockets

	    }; 
	    
	}

	Joint.prototype = {

	    constructor: Joint,

	    dJointAttach: function ( b1, b2 ) {

	        Energy.dJointAttach( this.dxJoint, b1, b2 );

	    },

	    setParam: function ( name, value ) { },

	    setPos1: function ( v ) { },

	    setPos2: function ( v ) { },

	    setAxis: function ( v ) { },

	    setAxis1: function ( v ) { },

	    setAxis2: function ( v ) { },

	    /////

	    feedback: function ( dJointFeedback ) {

	        Energy.dJointSetFeedback( this.dxJoint, dJointFeedback );

	    },

	    dJointSetFeedback: function ( dxJoint, dJointFeedback ) {

	        Energy.dJointSetFeedback( dxJoint, dJointFeedback );

	    },

	    /*dJointSetParam: function ( parameter, value ) {

	        if (this instanceof (DJointHinge)) {
	            Energy.dJointSetHingeParam(this.dxJoint, parameter, value);
	        }
	        if (this instanceof (DJointHinge2)) {
	            Energy.dJointSetHinge2Param(this.dxJoint, parameter, value);
	        }
	        if (this instanceof (DJointSlider)) {
	            Energy.dJointSetSliderParam(this.dxJoint, parameter, value);
	        }
	        if (this instanceof (DJointBall)) {
	            Energy.dJointSetBallParam(this.dxJoint, parameter, value);
	        }

	    },*/

	    dJointDestroy: function () {

	        Energy.dJointDestroy( this.dxJoint );

	    }

	};

	function dJointBall( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateBall( this.dxWorld, this.dxJointGroup );

	}

	dJointBall.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointBall,

	    setParam: function ( name, value ) {

	        Energy.dJointSetBallParam( this.dxJoint, this.parametres[ name ], value );

	    },

	    setPos1: function ( v ) {
	        Energy.dJointSetBallAnchor( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setPos2: function ( v ) {
	        Energy.dJointSetBallAnchor2( this.dxJoint, v[0], v[2], v[1] );
	    },

	    /////

	    dJointSetBallAnchor: function (x, y, z) {
	        Energy.dJointSetBallAnchor(this.dxJoint, x, y, z);
	    },
	    dJointSetBallAnchor2: function (x, y, z) {
	        Energy.dJointSetBallAnchor2(this.dxJoint, x, y, z);
	    },

	    dJointGetBallAnchor: function () {

	        if (this.anchor == undefined) {
	            this.anchor = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetBallAnchor(this.dxJoint, this.anchor);
	        return Tools.Pointer_To_Vector3(this.anchor, true);

	    },

	    dJointGetBallAnchor2: function () {

	        if (this.anchor2 == undefined) {
	            this.anchor2 = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetBallAnchor2(this.dxJoint, this.anchor2);
	        return Tools.Pointer_To_Vector3(this.anchor, true);

	    },

	    dJointSetParam: function ( parameter, value ) {

	        Energy.dJointSetBallParam(this.dxJoint, parameter, value);

	    },

	});

	function dJointFixed( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateFixed( this.dxWorld, this.dxJointGroup );

	}

	dJointFixed.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointFixed,

	    dJointSetParam: function ( name, value ) {

	    },

	});

	function dJointHinge( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateHinge( this.dxWorld, this.dxJointGroup );

	}

	dJointHinge.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointHinge,

	    setParam: function ( name, value ) {

	        Energy.dJointSetHingeParam( this.dxJoint, this.parametres[ name ], value );

	    },

	    setPos1: function ( v ) {
	        Energy.dJointSetHingeAnchor( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis: function ( v ) {
	        Energy.dJointSetHingeAxis( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis1: function ( v ) {
	        Energy.dJointSetHingeAxis( this.dxJoint, v[0], v[2], v[1] );
	    },

	    /////

	    dJointSetHingeAnchor: function (x, y, z) {
	        Energy.dJointSetHingeAnchor(this.dxJoint, x, y, z);
	    },
	    dJointSetHingeAxis: function (x, y, z) {
	        Energy.dJointSetHingeAxis(this.dxJoint, x, y, z);
	    },
	    dJointGetHingeAnchor: function () {
	        if (this.anchor == undefined) {
	            this.anchor = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHingeAnchor(this.dxJoint, this.anchor);
	        return Tools.Pointer_To_Vector3(this.anchor, true);
	    },
	    dJointGetHingeAnchor2: function () {
	        if (this.anchor2 == undefined) {
	            this.anchor2 = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHingeAnchor2(this.dxJoint, this.anchor2);
	        return Tools.Pointer_To_Vector3(this.anchor2, true);
	    },
	    dJointGetHingeAxis: function () {
	        if (this.axis == undefined) {
	            this.axis = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHingeAxis(this.dxJoint, this.axis);
	        return Tools.Pointer_To_Vector3(this.axis, true);
	    },
	    dJointGetHingeAngle: function () {
	        console.log("test");
	        return Energy.dJointGetHingeAngle(this.dxJoint);
	    },
	    dJointGetHingeAngleRate: function () {
	        return Energy.dJointGetHingeAngleRate(this.dxJoint);
	    },

	    dJointSetParam: function ( parameter, value ) {

	        Energy.dJointSetHingeParam( this.dxJoint, parameter, value );

	    },

	});

	function dJointHinge2( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateHinge2( this.dxWorld, this.dxJointGroup );

	}
	dJointHinge2.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointHinge2,

	    setParam: function ( name, value ) {
	        //console.log(name, this.parametres[ name ], value );
	        Energy.dJointSetHinge2Param( this.dxJoint, this.parametres[ name ], value );

	    },

	    setPos1: function ( v ) {
	        Energy.dJointSetHinge2Anchor( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis1: function ( v ) {
	        Energy.dJointSetHinge2Axis1( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis2: function ( v ) {
	        Energy.dJointSetHinge2Axis2( this.dxJoint, v[0], v[2], v[1] );
	    },

	    /////

	    dJointSetHinge2Anchor: function ( x, y, z ) {

	        Energy.dJointSetHinge2Anchor(this.dxJoint, x, y, z);

	    },

	    dJointSetHinge2Axis1: function ( x, y, z ) {

	        Energy.dJointSetHinge2Axis1(this.dxJoint, x, y, z);

	    },

	    dJointSetHinge2Axis2: function ( x, y, z ) {

	        Energy.dJointSetHinge2Axis2(this.dxJoint, x, y, z);

	    },

	    dJointGetHinge2Angle1: function () {

	        return Energy.dJointGetHinge2Angle1( this.dxJoint );

	    },

	    dJointGetHinge2Anchor: function () {

	        if ( this.anchor == undefined ) {
	            this.anchor = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHinge2Anchor(this.dxJoint, this.anchor);
	        return Tools.Pointer_To_Vector3( this.anchor, true );

	    },

	    dJointGetHinge2Anchor2: function () {

	        if ( this.anchor2 == undefined ) {
	            this.anchor2 = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHinge2Anchor2(this.dxJoint, this.anchor2);
	        return Tools.Pointer_To_Vector3( this.anchor2, true );

	    },

	    dJointGetHinge2Axis1: function () {

	        if ( this.axis1 == undefined ) {
	            this.axis1 = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHinge2Axis1(this.dxJoint, this.axis1);
	        return Tools.Pointer_To_Vector3( this.axis1, true );

	    },

	    dJointGetHinge2Axis2: function () {

	        if ( this.axis2 == undefined ) {
	            this.axis2 = Tools.Malloc_new_Vector3();
	        }
	        Energy.dJointGetHinge2Axis2(this.dxJoint, this.axis2);
	        return Tools.Pointer_To_Vector3( this.axis2, true );

	    },

	    dJointSetParam: function ( parameter, value ) {

	        Energy.dJointSetHinge2Param( this.dxJoint, parameter, value );

	    },

	});

	function dJointSlider( dxWorld, world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateSlider( this.dxWorld, this.dxJointGroup );

	}
	dJointSlider.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointSlider,

	    setParam: function ( name, value ) {

	        Energy.dJointSetSliderParam( this.dxJoint, this.parametres[ name ], value );

	    },

	    setAxis: function ( v ) {
	        Energy.dJointSetSliderAxis( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis1: function ( v ) {
	        Energy.dJointSetSliderAxis( this.dxJoint, v[0], v[2], v[1] );
	    },

	    /////

	    dJointSetSliderAxis: function ( x, y, z ) {

	        Energy.dJointSetSliderAxis(this.dxJoint, x, y, z);

	    },

	    dJointSetParam: function ( parameter, value ) {

	        Energy.dJointSetSliderParam( this.dxJoint, parameter, value );

	    },

	});

	function dJointTransmission( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateTransmission( this.dxWorld, this.dxJointGroup );

	}
	dJointTransmission.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointTransmission,

	    setParam: function ( name, value ) {

	        if( name === 'backlash') Energy.dJointSetTransmissionBacklash( this.dxJoint, value );
	        else if( name === 'mode') Energy.dJointSetTransmissionMode( this.dxJoint, value );
	        else if( name === 'ratio') Energy.dJointSetTransmissionRatio( this.dxJoint, value );
	   

	    },

	    setPos1: function ( v ) {
	        Energy.dJointSetTransmissionAnchor1( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setPos2: function ( v ) {
	        Energy.dJointSetTransmissionAnchor2( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis: function ( v ) {
	        Energy.dJointSetTransmissionAxis( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis1: function ( v ) {
	        Energy.dJointSetTransmissionAxis1( this.dxJoint, v[0], v[2], v[1] );
	    },

	    setAxis2: function ( v ) {
	        Energy.dJointSetTransmissionAxis2( this.dxJoint, v[0], v[2], v[1] );
	    },

	    /////

	    dJointSetTransmissionMode: function ( mode ) {

	        Energy.dJointSetTransmissionMode(this.dxJoint, mode);

	    },
	    dJointSetTransmissionRatio: function (ratio) {

	        Energy.dJointSetTransmissionRatio(this.dxJoint, ratio);

	    },
	    dJointSetTransmissionAnchor1: function (x, y, z) {

	        Energy.dJointSetTransmissionAnchor1(this.dxJoint, x, y, z);

	    },
	    dJointSetTransmissionAnchor2: function (x, y, z) {

	        Energy.dJointSetTransmissionAnchor2(this.dxJoint, x, y, z);

	    },
	    dJointSetTransmissionAxis: function (x, y, z) {

	        Energy.dJointSetTransmissionAxis(this.dxJoint, x, y, z);

	    },
	    dJointSetTransmissionBacklash: function (backlash) {

	        Energy.dJointSetTransmissionBacklash(this.dxJoint, backlash);

	    },

	    dJointSetParam: function ( parameter, value ) {

	        //Energy.dJointSetSliderParam( this.dxJoint, parameter, value );

	    },

	});

	function dJointUniversal( world, group ) {

	    Joint.call( this, world, group );

	    this.dxJoint = Energy.dJointCreateUniversal( this.dxWorld, this.dxJointGroup );

	}

	dJointUniversal.prototype = Object.assign( Object.create( Joint.prototype ), {

	    constructor: dJointUniversal,

	    // TODO 

	});

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
	    };

	    //console.log(set)

	    var wheels_pos = [
	        [set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
	    	[set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]],
	    	[set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
	    	[set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]]
	    ];

	    //console.log(wheels_pos)

	    this.chassis = world.add( { type:'box', name:this.name+'_body', size:set.size, pos:set.pos, density:set.density, friction:set.friction } );
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
	    };

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
	        if( o.CFM !== undefined ) Energy.dWorldSetCFM( this.dxWorld, o.CFM );

	        console.log('World Set');
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

	};

	exports.Energy = Energy;
	exports.World = World;
	exports.DynamicObject = DynamicObject;
	exports.Joint = Joint;
	exports.dynamicBox = dynamicBox;
	exports.dynamicSphere = dynamicSphere;
	exports.dynamicCylinder = dynamicCylinder;
	exports.dynamicHeightmap = dynamicHeightmap;
	exports.dynamicTriMesh = dynamicTriMesh;
	exports.staticPlane = staticPlane;
	exports.dJointBall = dJointBall;
	exports.dJointFixed = dJointFixed;
	exports.dJointHinge = dJointHinge;
	exports.dJointHinge2 = dJointHinge2;
	exports.dJointSlider = dJointSlider;
	exports.dJointTransmission = dJointTransmission;
	exports.Vehicle = Vehicle;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
