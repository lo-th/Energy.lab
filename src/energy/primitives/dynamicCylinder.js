import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
//import { PhysicMaterial } from '../core/PhysicMaterial.js';
//import { Tools } from '../core/Tools.js';

function dynamicCylinder ( dxSpace, dxWorld, density, radius, length, direction ) {

    DynamicObject.call( this );

    this.dxWorld = dxWorld;
    this.density = density;
    this.dxSpace = dxSpace;
    this.radius = radius;
    this.length = length;
    this.direction = direction || 1;//  (1=x, 2=y, 3=z)
    this.dxGeom = Energy.dCreateCylinder( this.dxSpace, this.radius, this.length );

    if (this.density != 0) {

        this.makeBody();
        this.setMassfromGeometry({type:'cylinder', direction:this.direction, radius:this.radius, length:this.length });
        this.geomSetBody( this.dxGeom );
       // this.dxBody = Energy.dBodyCreate( this.dxWorld );


     //   this.dxMass = Tools.Malloc_dMass_Struct();
       // Energy.dMassSetCylinder( this.dxMass, this.density, this.direction, this.radius, this.length );
       // this.dBodySetMass( this.density );
        //Energy.dMassAdjust( this.dxMass, this.density);
        //Energy.dBodySetMass( this.dxBody, this.dxMass);
        //Energy.dGeomSetBody( this.dxGeom, this.dxBody );
       // this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
       // this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        //Tools.Free_dMass_Struc();
    }
    /*else {
        this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
        this.pointer_rot = Tools.Malloc_new_quaternion();
        Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
    }
    this.dGeomSetMaterial( PhysicMaterial.GetDefault() );*/

    this.makePointer();
    this.dGeomSetMaterial();


};

dynamicCylinder.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicCylinder,

});

export { dynamicCylinder };