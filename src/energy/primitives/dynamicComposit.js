import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
import { PhysicMaterial } from '../core/PhysicMaterial.js';
import { Tools } from '../core/Tools.js';

function dynamicComposit ( dxSpace, dxWorld, geoms, size, pos, rot, density ) {

    DynamicObject.call( this );

    this.dxWorld = dxWorld;
    this.dxSpace = dxSpace;
    this.density = density;

    this.dxGeoms = [];

    for(var i=0; i<geoms.length, i++){

    }

    
    /*var verticesPointer = Tools.Malloc_Float32Array(vertices);
    var indicesPointer = Tools.Malloc_Int32(indices);
    this.dxTriMeshData = Energy.dGeomTriMeshDataCreate();
    Energy.dGeomTriMeshDataBuildSingle(this.dxTriMeshData, verticesPointer, vertices.BYTES_PER_ELEMENT * 3, vertices.length / 3, indicesPointer, indices.length, indices.BYTES_PER_ELEMENT);
    this.dxGeom = Energy.dCreateTriMesh(this.dxSpace, this.dxTriMeshData, 0, 0, 0);*/

    if (this.density != 0) {
        this.dxBody = Energy.dBodyCreate(this.dxWorld);
        this.dxMass = Tools.Malloc_dMass_Struct();
        this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
        this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        //Energy.dMassSetTrimesh(this.dxMass, this.density, this.dxGeom);
        //Energy.dGeomSetBody(this.dxGeom, this.dxBody);
        var mc = Tools.Pointer_To_Vector3(this.dxMass + 8, false);
        Energy.dMassTranslate(this.dxMass, -mc[0], -mc[1], -mc[2]);
        Energy.dBodySetMass(this.dxBody, this.dxMass);
    }
    else {
        this.pointer_pos = Energy.dGeomGetPosition(this.dxGeom);
        this.pointer_rot = Tools.Malloc_new_quaternion();
        Energy.dGeomGetQuaternion(this.dxGeom, this.pointer_rot);
    }
    this.dGeomSetMaterial(PhysicMaterial.GetDefault());

};

dynamicComposit.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicComposit,

});

export { dynamicComposit };