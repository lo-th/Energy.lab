import { Energy } from './Energy.js';
import { Tools } from './Tools.js';
import { 
    dParamLoStop, dParamHiStop, dParamVel, dParamLoVel, dParamHiVel,
    dParamFMax, dParamFudgeFactor, dParamBounce, dParamCFM, dParamStopERP,
    dParamStopCFM, dParamSuspensionERP, dParamSuspensionCFM, dParamERP,
    dParamFMax2, dParamVel2, dTransmissionParallelAxes, dTransmissionIntersectingAxes,
    dTransmissionChainDrive
} from '../constants.js';

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

    } 
    
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

}

export { Joint };