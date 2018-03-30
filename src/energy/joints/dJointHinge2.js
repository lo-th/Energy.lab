import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointHinge2( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateHinge2( this.dxWorld, this.dxJointGroup );

};

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

export { dJointHinge2 };