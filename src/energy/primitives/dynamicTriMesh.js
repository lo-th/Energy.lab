import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
//import { PhysicMaterial } from '../core/PhysicMaterial.js';
import { Tools } from '../core/Tools.js';

function dynamicTriMesh ( dxSpace, dxWorld, vertices, indices, density ) {

    DynamicObject.call( this );

    this.dxWorld = dxWorld;
    this.dxSpace = dxSpace;
    this.density = density;
    
    this.verticesPointer = Tools.Malloc_Float32Array(vertices);
    this.indicesPointer = Tools.Malloc_Int32(indices);
    this.dxTriMeshData = Energy.dGeomTriMeshDataCreate();
    Energy.dGeomTriMeshDataBuildSingle(this.dxTriMeshData, this.verticesPointer, vertices.BYTES_PER_ELEMENT * 3, vertices.length / 3, this.indicesPointer, indices.length, indices.BYTES_PER_ELEMENT);
    this.dxGeom = Energy.dCreateTriMesh(this.dxSpace, this.dxTriMeshData, 0, 0, 0);

    if (this.density !== 0) {

        this.makeBody();
        this.setMassfromGeometry({type:'Trimesh' });
        this.geomSetBody( this.dxGeom );
        //this.dxBody = Energy.dBodyCreate(this.dxWorld);

       /* this.dxMass = Tools.Malloc_dMass_Struct();
        //this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
        //this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        Energy.dMassSetTrimesh(this.dxMass, this.density, this.dxGeom);
        Energy.dGeomSetBody(this.dxGeom, this.dxBody);
        var mc = Tools.Pointer_To_Vector3(this.dxMass + 8, false);
        Energy.dMassTranslate(this.dxMass, -mc[0], -mc[1], -mc[2] );
        Energy.dBodySetMass( this.dxBody, this.dxMass );*/
    }
    /*else {
        this.pointer_pos = Energy.dGeomGetPosition(this.dxGeom);
        this.pointer_rot = Tools.Malloc_new_quaternion();
        Energy.dGeomGetQuaternion(this.dxGeom, this.pointer_rot);
    }*/
    //this.dGeomSetMaterial(PhysicMaterial.GetDefault());

    this.makePointer();
    this.dGeomSetMaterial();

};

dynamicTriMesh.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicTriMesh,

    setData: function ( vertices, indices ) {

        Tools.Malloc_Float32Array( vertices, this.verticesPointer );
        Tools.Malloc_Int32( indices, this.indicesPointer );

    },

});

export { dynamicTriMesh };