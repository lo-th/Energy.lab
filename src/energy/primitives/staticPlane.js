import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
import { PhysicMaterial } from '../core/PhysicMaterial.js';

function staticPlane( dxSpace, a, b, c, d ) {

	DynamicObject.call( this );

    this.dxGeom = Energy.dCreatePlane( dxSpace, a, b, c, d );
    //Energy.dGeomSetMaterial( this.dxGeom, PhysicMaterial.GetDefault() );
    this.dGeomSetMaterial( PhysicMaterial.GetDefault() );

}

staticPlane.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: staticPlane,

	/*getDxGeom: function () {

        return this.dxGeom;

    }*/

})

export { staticPlane };