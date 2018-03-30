import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
import { PhysicMaterial } from '../core/PhysicMaterial.js';
import { Tools } from '../core/Tools.js';

function dynamicCapsule ( ) {

};

dynamicCapsule.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicCapsule,

});

export { dynamicCapsule };