import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
//import { PhysicMaterial } from '../core/PhysicMaterial.js';
//import { Tools } from '../core/Tools.js';

function dynamicSphere ( dxSpace, dxWorld, density, radius ) {

    DynamicObject.call( this );

    this.radius = radius || 1;
    this.dxWorld = dxWorld;
    this.density = density;
    this.dxSpace = dxSpace;
    this.dxGeom = Energy.dCreateSphere( this.dxSpace, this.radius );
    
    if (this.density != 0) {

        this.makeBody();
        this.setMassfromGeometry({type:'sphere', radius:this.radius });
        this.geomSetBody( this.dxGeom );
        //this.dxMass = Tools.Malloc_dMass_Struct();
        //Energy.dMassSetSphere( this.dxMass, this.density, this.radius );
        //this.dBodySetMass( this.density );
        //Energy.dMassAdjust( this.dxMass, this.density);
        //Energy.dBodySetMass( this.dxBody, this.dxMass);
        //Energy.dGeomSetBody( this.dxGeom, this.dxBody );
        //this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
        //this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        //Tools.Free_dMass_Struc();
    }
    /*else {
        this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
        this.pointer_rot = Tools.Malloc_new_quaternion();
        Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
    }*/

    this.makePointer();
    this.dGeomSetMaterial();
};

dynamicSphere.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicSphere,

});

export { dynamicSphere };