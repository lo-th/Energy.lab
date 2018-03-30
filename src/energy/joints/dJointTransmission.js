import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointTransmission( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateTransmission( this.dxWorld, this.dxJointGroup );

};

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

export { dJointTransmission };