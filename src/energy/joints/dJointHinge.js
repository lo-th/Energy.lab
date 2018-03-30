import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

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

export { dJointHinge };