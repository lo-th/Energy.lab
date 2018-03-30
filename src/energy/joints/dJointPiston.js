import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointPiston( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreatePiston( this.dxWorld, this.dxJointGroup );

}

dJointPiston.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointPiston,

    // TODO 

});

export { dJointPiston };