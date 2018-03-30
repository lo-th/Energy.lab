import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointUniversal( world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateUniversal( this.dxWorld, this.dxJointGroup );

}

dJointUniversal.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointUniversal,

    // TODO 

});

export { dJointUniversal };