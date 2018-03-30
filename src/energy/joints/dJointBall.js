import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

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

export { dJointBall };