import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointFixed( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateFixed( this.dxWorld, this.dxJointGroup );

}

dJointFixed.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointFixed,

    dJointSetParam: function ( name, value ) {

    },

});

export { dJointFixed }