import { Energy } from './Energy.js';
import { Tools } from './Tools.js';
import { Material } from './PhysicMaterial.js';
import { 
    mu, mu2, bounce, bounce_vel, soft_erp, soft_cfm,
    rho, rho2, rhoN, motion1, motion2, motionN, slip1, slip2
} from '../constants.js';

function DynamicObject() {

    this.isDisable = false;
    this.dxBody = null;
    this.dxGeom = null;
    this.dxMaterial = null;
    this.density = 0;
    this.dxMass = null;

    this.pointer_pos = Tools.Malloc_Vector3();
    this.pointer_rot = Tools.Malloc_Quaternion(1,0,0,0);//Malloc_new_quaternion();

    this.parametres = {

        mu: mu,
        mu2: mu2,
        bounce: bounce,
        bounce_vel: bounce_vel,
        soft_erp: soft_erp,
        soft_cfm: soft_cfm,
        rho: rho,
        rho2: rho2,
        rhoN: rhoN,
        motion1: motion1,
        motion2: motion2,
        motionN: motionN,
        slip1: slip1,
        slip2: slip2

    } 

}

DynamicObject.prototype = {

    constructor: DynamicObject,

    setParam: function ( name, value ) { 

        if ( typeof name == 'string' || name instanceof String ) this.physicMaterial.setMaterialParameter( this.parametres[ name ], value );
        else for( var p in name) this.physicMaterial.setMaterialParameter( this.parametres[ p ], name[p] );

    },

    getDxBodyPointersAndFlag: function () {

        Energy.dMassAdjust(this.dxMass, this.density);
        Energy.dBodySetMass(this.dxBody, this.dxMass);
        Energy.dGeomSetBody(this.dxGeom, this.dxBody);
        this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
        this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        this.dxFlags = Energy.dBodyGetDxFlags(this.dxBody);
        Tools.Free_dMass_Struc();

    },

    dGeomSetMaterial: function ( pmat ) {

        if ( this.dxGeom != null ) {
            this.physicMaterial = new Material();//pmat;
            this.dxMaterial = this.physicMaterial.dxMaterial;
            Energy.dGeomSetMaterial( this.dxGeom, this.physicMaterial.dxMaterial );
        }
        else {
            console.log("assign material failed, dxGeom is null");
        }

    },


    /*dBodySetRotation: function ( R ) {

        Energy.dBodySetRotation( this.dxBody, R );

    },*/

    dBodySetPosition: function ( x, y, z ) {

        Energy.dBodySetPosition( this.dxBody, x, y, z );
        //Module._dBodySetPosition(this.dxBody, x, y, z);

    },

    dBodySetQuaternion: function ( w, x, y, z ) {

        var q = Tools.Malloc_Quaternion( w, x, y, z, this.pointer_rot );
        Energy.dBodySetQuaternion( this.dxBody, q );
        //Module._dBodySetQuaternion(this.dxBody, q);

    },

    dGeomSetPosition: function ( x, y, z ) {

        Energy.dGeomSetPosition( this.dxGeom, x, y, z );

    },

    dGeomSetQuaternion: function ( w, x, y, z ) {

        var q = Tools.Malloc_Quaternion( w, x, y, z, this.pointer_rot );
        Energy.dGeomSetQuaternion( this.dxGeom, q );

    },

    makePointer: function () {

        if ( this.dxBody !== null ) {
            this.pointer_pos = Energy.dBodyGetPosition(this.dxBody);
            this.pointer_rot = Energy.dBodyGetQuaternion(this.dxBody);
        } else {
            this.pointer_pos = Energy.dGeomGetPosition( this.dxGeom );
            Energy.dGeomGetQuaternion(this.dxGeom, this.pointer_rot);
        }

    },


    setTransform: function ( p, r ) {

    	//Module._dGeomSetPosition( this.dxGeom, p[0], p[2], p[1] );
    	//var q = Tools.Malloc_Quaternion(r[3], -r[0], -r[2], -r[1]);
        if ( this.dxBody !== null ) {
            this.dBodySetPosition( p[0], p[2], p[1] );
            this.dBodySetQuaternion( r[3], -r[0], -r[2], -r[1] );
            //Energy.dBodySetQuaternion(this.dxBody, q);
        } else {
            this.dGeomSetPosition( p[0], p[2], p[1] );
            this.dGeomSetQuaternion( r[3], -r[0], -r[2], -r[1] );
            //Energy.dGeomSetQuaternion(this.dxGeom, q);
            //this.pointer_rot = q;
        }
        
    },

    getTransform: function () {
        return [
            //Module.HEAP32[((Energy.dBodyGetDxFlags(this.dxBody)) >> 2)] & 4,
            0,
            
            Module.HEAPF64[((this.pointer_pos) >> 3)],
            Module.HEAPF64[((this.pointer_pos + 16) >> 3)],
            Module.HEAPF64[((this.pointer_pos + 8) >> 3)],

            -Module.HEAPF64[((this.pointer_rot + 8) >> 3)],
            -Module.HEAPF64[((this.pointer_rot + 24) >> 3)],
            -Module.HEAPF64[((this.pointer_rot + 16) >> 3)],
            Module.HEAPF64[((this.pointer_rot) >> 3)]
        ]
    },

    setSoftERP: function ( value ) {

        this.physicMaterial.setMaterialParameter( soft_erp, value )

    },

    setSoftCFM: function ( value ) {

        this.physicMaterial.setMaterialParameter( soft_cfm, value )

    },

    setBounce: function ( value ) {

        this.physicMaterial.setMaterialParameter( bounce, value )

    },

    setBounce_vel: function ( value ) {

        this.physicMaterial.setMaterialParameter( bounce_vel, value )

    },

    setFriction: function ( value ) {

        this.physicMaterial.setMaterialParameter( mu, value )

    },


    dGeomGetPosition: function () {

        return [Module.HEAPF64[((this.pointer_pos) >> 3)], Module.HEAPF64[((this.pointer_pos + 16) >> 3)], Module.HEAPF64[((this.pointer_pos + 8) >> 3)]];

    },

    /*dGeomGetQuaternion: function () {

        var q = Tools.Malloc_new_quaternion();
        Energy.dGeomGetQuaternion( this.dxGeom, q );
        return Tools.Pointer_To_Vector4( q, true );

    },*/

    setQuaternion: function (w, x, y, z) {

        Tools.Malloc_Quaternion(w, x, y, z, this.pointer_rot);

        //var q = 
        //this.pointer_rot = q;

        if (this.dxBody != null) Energy.dBodySetQuaternion( this.dxBody, this.pointer_rot );
        else Energy.dGeomSetQuaternion( this.dxGeom, this.pointer_rot );

    },

    dBodySetLinearVel: function ( x, y, z ) {

        Energy.dBodySetLinearVel(this.dxBody, x, y, z);

    },

    dBodySetAngularVel: function (x, y, z) {

        Energy.dBodySetAngularVel(this.dxBody, x, y, z);

    },

    dBodyAddForce: function ( fx, fy, fz, useLocal ) {

        if (useLocal) Energy.dBodyAddRelForce(this.dxBody, fx, fy, fz);
        else Energy.dBodyAddForce(this.dxBody, fx, fy, fz);

    },

    dBodyGetForce: function () {

        return Tools.Pointer_To_Vector3(Energy.dBodyGetForce(this.dxBody), true);

    },

    dBodySetForce: function ( fx, fy, fz ) {

        Energy.dBodySetForce(this.dxBody, fx, fy, fz);

    },

    dBodyAddTorque: function ( fx, fy, fz, useLocal ) {

        if (useLocal) Energy.dBodyAddRelTorque( this.dxBody, fx, fy, fz );
        else Energy.dBodyAddTorque( this.dxBody, fx, fy, fz );

    },

    dBodySetTorque: function ( fx, fy, fz ) {

        Energy.dBodySetTorque(this.dxBody, fx, fy, fz);

    },

    dBodyGetTorque: function () {

        return Tools.Pointer_To_Vector3(Energy.dBodyGetTorque(this.dxBody), true);

    },

    dBodyGetLinearVel: function () {

        return Tools.Pointer_To_Vector3(Energy.dBodyGetLinearVel(this.dxBody), true);

    },

    dBodyGetAngularVel: function () {

        return Tools.Pointer_To_Vector3(Energy.dBodyGetAngularVel(this.dxBody), true);

    },


    enabled: function () {

        Energy.dBodyEnable(this.dxBody);

    },

    disable: function () {

        Energy.dBodyDisable(this.dxBody);

    },

    dBodyIsEnabled: function () {

        var n = 4;
        if(this.dxBody!==null) n = Module.HEAP32[(( Energy.dBodyGetDxFlags(this.dxBody) ) >> 2)] & 4;

        return n;
        //return Module.HEAP32[((this.dxFlags) >> 2)] & 4//4;//dxBodyDisabled;

    },

    dBodySetNotification_interval: function ( interval ) {

        Energy.dBodySetNotification_interval(this.dxBody, interval);

    },

    destroyDynamicObject: function () {

        if (this.dxGeom) {
            this.dGeomDestroy();
            this.dxGeom = null;
        }
        
        if (this.dxBody) {
            this.dBodyDestroy();
            this.dxBody = null;
        }

    },

    dBodyGetFlags: function () {

        return Energy.dBodyGetFlags(this.dxBody);

    },

    dBodySetFlags: function ( flags ) {

        if(this.dxBody) Energy.dBodySetFlags( this.dxBody, flags );

    },

    dGeomDestroy: function () {

        Energy.dGeomDestroy( this.dxGeom );

    },

    dBodyDestroy: function () {

        Energy.dBodyDestroy( this.dxBody );

    },

    

    dispose: function (){

        this.destroyDynamicObject();

    },

    dBodyDisable: function (){

        Energy.dBodyDisable( this.dxBody );

    },

    dBodyEnable: function (){

        Energy.dBodyEnable( this.dxBody );

    },


    setZeroForce: function (){

        this.dBodyDisable();
        this.dBodySetForce( 0, 0, 0 );
        this.dBodySetTorque( 0, 0, 0 );
        this.dBodySetLinearVel( 0, 0, 0 );
        this.dBodySetAngularVel( 0, 0, 0 );
        this.dBodyEnable();

    },


    /*NotifyState = function (pointer) {
        for (var i = 0; i < DynamicObject.Instances.length; i++) {
            if (pointer == DynamicObject.Instances[i].dxBody) {
                DynamicObject.Instances[i].isDisable = true;
                DynamicObject.Instances[i].mesh.isVisible = false;
                DynamicObject.Instances[i].mesh.getChildMeshes()[0].isVisible = true;
                break;
            }
        }
    };
    NotifyState2 = function (pointer) {
        for (var i = 0; i < DynamicObject.Instances.length; i++) {
            if (pointer == DynamicObject.Instances[i].dxBody) {
                DynamicObject.Instances[i].isDisable = false;
                DynamicObject.Instances[i].mesh.isVisible = true;
                DynamicObject.Instances[i].mesh.getChildMeshes()[0].isVisible = false;
                break;
            }
        }
    };*/

    makeBody:function (){

        if( this.dxBody === null ) this.dxBody = Energy.dBodyCreate( this.dxWorld );
        
    },

    geomSetBody: function ( g ){

        Energy.dGeomSetBody( g, this.dxBody );

    },

    dBodyGetMass: function () {

        return Module.HEAPF64[((this.dxMass) >> 3)];

    },

    dBodySetMass: function ( density ) {

        if( density ) this.density = density;
        Energy.dMassAdjust( this.dxMass, this.density );
        Energy.dBodySetMass( this.dxBody, this.dxMass );

    },

    setMassfromGeometry: function ( o ) {

        if( this.dxMass === null ) this.dxMass = Tools.Malloc_dMass_Struct();

        switch( o.type ){

            case 'box': Energy.dMassSetBox( this.dxMass, this.density, o.lx, o.ly, o.lz ); break;
            case 'sphere': Energy.dMassSetSphere( this.dxMass, this.density, o.radius ); break;
            case 'cylinder': Energy.dMassSetCylinder( this.dxMass, this.density, o.direction, o.radius, o.length ); break;
            case 'Trimesh': 
                Energy.dMassSetTrimesh( this.dxMass, this.density, this.dxGeom ); 
                //var mc = Tools.Pointer_To_Vector3(this.dxMass + 8, false);
                //Energy.dMassTranslate(this.dxMass, -mc[0], -mc[1], -mc[2] );
            break;

        }

        this.dBodySetMass();

    },

    setMassCenter: function(x,y,z){

        if(this.dxMass) Energy.dMassTranslate(this.dxMass, x, y, z );

    }
}

export { DynamicObject };