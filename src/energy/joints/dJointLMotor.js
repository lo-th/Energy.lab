import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointLMotor( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateLMotor( this.dxWorld, this.dxJointGroup );

}

dJointLMotor.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointLMotor,

    // TODO 

});

export { dJointLMotor };