import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointAMotor( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateAMotor( this.dxWorld, this.dxJointGroup );

}

dJointAMotor.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointAMotor,

    // TODO 

});

export { dJointAMotor };