import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
//import { PhysicMaterial } from '../core/PhysicMaterial.js';
//import { Tools } from '../core/Tools.js';

function dynamicBox ( dxSpace, dxWorld, density, lx, ly, lz ) {

    DynamicObject.call( this );

    this.dxWorld = dxWorld;
    this.density = density;
    this.dxSpace = dxSpace;
    this.lx = lx;
    this.ly = ly;
    this.lz = lz;
    this.dxGeom = Energy.dCreateBox( this.dxSpace, this.lx, this.ly, this.lz);

    if (this.density !== 0) {

        this.makeBody();
        this.setMassfromGeometry({type:'box', lx:this.lx, ly:this.ly, lz:this.lz })
        this.geomSetBody( this.dxGeom );

        //this.dxMass = Tools.Malloc_dMass_Struct();
        //Energy.dMassSetBox( this.dxMass, this.density, this.lx, this.ly, this.lz );
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
    this.dGeomSetMaterial();// PhysicMaterial.GetDefault() );

};

dynamicBox.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicBox,

});

export { dynamicBox };