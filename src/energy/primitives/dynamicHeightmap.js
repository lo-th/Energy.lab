import { Energy } from '../core/Energy.js';
import { DynamicObject } from '../core/DynamicObject';
//import { PhysicMaterial } from '../core/PhysicMaterial.js';
import { Tools } from '../core/Tools.js';

function dynamicHeightmap ( dxSpace, dxWorld, heightData, width, depth, widthSamples, depthSamples, scale, offset, thickness, bWrap ) {

    DynamicObject.call( this );

    this.dxWorld = dxWorld;
    this.density = 0;
    this.dxSpace = dxSpace;

    this.scale = scale;// is the vertical sample height multiplier, a uniform scale applied to all raw height data;
    this.offset = offset;// is the vertical sample offset, added to the scaled height data;
    this.thickness = thickness;// is the thickness of AABB which is added below the lowest point, to prevent objects from falling through very thin heightfields;
    this.bWrap = bWrap;// is 0 if the heightfield should be finite, 1 if should tile infinitely.
    
    this.pHeightData = Tools.Malloc_Float64Array( heightData );

    this.dxHeightfieldData = Energy.dGeomHeightfieldDataCreate();
    Energy.dGeomHeightfieldDataBuildDouble( this.dxHeightfieldData, this.pHeightData, 0, width, depth, widthSamples, depthSamples, this.scale, this.offset, this.thickness, this.bWrap );
    //Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, -30, 30 );
    Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, -1, scale+1 );
    this.dxGeom = Energy.dCreateHeightfield( this.dxSpace, this.dxHeightfieldData, 1 );
    //this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
    //this.pointer_rot = Tools.Malloc_new_quaternion();
    //Energy.dGeomGetQuaternion( this.dxGeom, this.pointer_rot );
    //this.dGeomSetMaterial( PhysicMaterial.GetDefault() );

    this.makePointer();
    this.dGeomSetMaterial();

};

dynamicHeightmap.prototype = Object.assign( Object.create( DynamicObject.prototype ), {

	constructor: dynamicHeightmap,

    setBounds: function ( p, scale ) {

        Energy.dGeomHeightfieldDataSetBounds( this.dxHeightfieldData, p-1, p+scale+1 );

    },

    setHeightData: function ( heightData ) {

        Tools.Malloc_Float64Array( heightData, this.pHeightData );

    },

});

export { dynamicHeightmap };