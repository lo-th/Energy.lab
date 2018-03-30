import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
import { PhysicMaterial } from '../core/PhysicMaterial.js';
import { Tools } from '../core/Tools.js';

function dynamicConvex ( ) {

};

dynamicConvex.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicConvex,

});

export { dynamicConvex };