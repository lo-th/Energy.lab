function Simulation(){

    this.content = view.getContent() 
    this.bodys = view.getBody();
    this.solids = view.getSolid();
    this.geo = view.getGeo();

    var wire = false;
    var shadowSide = false;

    this.mat = {

                hide: new THREE.MeshBasicMaterial({ name: 'debug', color:0x000000, depthTest:false, depthWrite:false, visible:false }),

                move: new THREE.MeshLambertMaterial( { color: 0xCCCCCC, name: 'move', wireframe: wire, shadowSide:shadowSide } ),
                speed: new THREE.MeshLambertMaterial( { color: 0xFFCC33, name: 'speed', wireframe: wire, shadowSide:shadowSide } ),
                sleep: new THREE.MeshLambertMaterial( { color: 0x33CCFF, name: 'sleep', wireframe: wire, shadowSide:shadowSide } ),
                static: new THREE.MeshLambertMaterial( { color: 0x333333, name: 'static', wireframe: wire, shadowSide:shadowSide, transparent:true, opacity:0.3, depthTest:true, depthWrite:false } ),
                kinematic: new THREE.MeshLambertMaterial( { color: 0x88FF33, name: 'kinematic', wireframe: wire, shadowSide:shadowSide } ),
                soft: new THREE.MeshLambertMaterial({ name: 'soft', vertexColors:THREE.VertexColors, shadowSide:shadowSide }),

                debug: new THREE.MeshBasicMaterial({ name: 'debug', color:0x00FF00, depthTest:false, depthWrite:false, wireframe:true, shadowSide:shadowSide }),


                jointLine: new THREE.LineBasicMaterial( { name: 'jointLine', vertexColors: THREE.VertexColors, depthTest: false, depthWrite: false, transparent: true }),
                jointP1: new THREE.MeshBasicMaterial({ name: 'jointP1', color:0x00FF00, depthTest:false, depthWrite:true, wireframe:true }),
                jointP2: new THREE.MeshBasicMaterial({ name: 'jointP2', color:0xFFFF00, depthTest:false, depthWrite:true, wireframe:true }),

            };

    /*this.mat['agent'] = new THREE.MeshBasicMaterial({ color:0x7caccc, wireframe:true });
    this.mat['agentHide'] = new THREE.MeshBasicMaterial({ color:0x7caccc, wireframe:true, transparent:true, opacity:0.1 });
    this.mat['heros'] = view.material({ name:'heros', skinning:true, map: view.texture( 'heros_c.jpg' ), roughness:0.75, metalness:0.25 })//new THREE.MeshLambertMaterial({ color:0xffffff, skinning:true, shadowSide:false, reflectivity:0.4 });
    this.mat['way'] = new THREE.MeshBasicMaterial({ color:0xFF8800, wireframe:true });
    this.mat['wall'] = view.material({ name:'wall', color:0x0088FF, transparent:true, opacity:0.3 })//new THREE.MeshLambertMaterial({  })*/

}

Simulation.prototype = {

    update: function(){

    	this.bodyStep( Ar, ArPos[0] );

    },

    vehicle: function ( o ) {

        var set = {
            name: o.name || 'car',
            w_radius: o.w_radius || 0.3,
            w_pos: o.w_pos || [1, -0.45, 1.1 ],
            w_density: o.w_density || 10,
            w_friction: o.w_friction || 500,
            soft_cfm: o.soft_cfm || 0.001,
            soft_erp: o.soft_erp || 0.5,
            size: o.size || [ 2.4, .5, 1.4 ],
            pos: o.pos || [0, 2.95, 10],
            density: o.density || 500,
            friction: o.friction || 500,
        }

        var wheels_pos = [
            [set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
            [set.pos[0]+set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]],
            [set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]+set.w_pos[2]],
            [set.pos[0]-set.w_pos[0], set.pos[1]+set.w_pos[1], set.pos[2]-set.w_pos[2]]
        ];

        this.add({ type:'box', name:set.name+'_body', size:set.size, pos:set.pos, density:set.density, noPhy:true });

        for (var i=0; i<4; i++ ){
            //this.add( {type: 'sphere', name:set.name+'_w'+i, size:[set.w_radius, set.w_radius, set.w_radius ], pos:wheels_pos[i], density:set.w_density, noPhy:true });
            this.add( {type: i % 2 == 0 ?'wheelL':'wheelR', name:set.name+'_w'+i, size:[set.w_radius, set.w_radius, set.w_radius ], pos:wheels_pos[i], density:set.w_density, noPhy:true });
        }

        // send to worker
        nrj.send( 'vehicle', o );

    },

    add: function ( o ) {

    	o = o || {};

        var isKinematic = false;

        o.density = o.density == undefined ? 0 : o.density;
        o.type = o.type == undefined ? 'box' : o.type;

        if(o.kinematic){
            isKinematic = true;
        }

        // position
        o.pos = o.pos == undefined ? [0,0,0] : o.pos;

        // size
        o.size = o.size == undefined ? [1,1,1] : o.size;
        if(o.size.length == 1){ o.size[1] = o.size[0]; }
        if(o.size.length == 2){ o.size[2] = o.size[0]; }

        // rotation is in degree
        o.rot = o.rot == undefined ? [0,0,0] : Math.vectorad(o.rot);
        o.quat = new THREE.Quaternion().setFromEuler( new THREE.Euler().fromArray( o.rot ) ).toArray();

        if( o.type === 'terrain' ){
            this.terrain( o ); 
            return;
        }

        if( o.type === 'planet' ){
            this.planet( o ); 
            return;
        }

        if( o.type === 'mesh' ){
            this.trimesh( o ); 
            return;
        }

        var mesh;

        if( o.type === 'plane' ) o.material = 'hide';

        if( o.density === 0 && o.type==='box' ) o.type = 'hardbox';

        var material;
        if(o.material !== undefined) material = this.mat[o.material];
        else material = o.density ? this.mat.move : this.mat.static;

        mesh = new THREE.Mesh( this.geo[o.type], material );
        if( o.type === 'plane' )  o.size = [10,10,10];
        mesh.scale.fromArray( o.size );
        mesh.position.fromArray( o.pos );
        mesh.quaternion.fromArray( o.quat );

        mesh.receiveShadow = true;
        mesh.castShadow = o.density === 0 ? false : true;

        if( o.name ) mesh.name = o.name;

        //if( o.parent !== undefined ) o.parent.add( mesh );
        //else 
        this.content.add( mesh );


        if( o.density === 0 && !isKinematic ) this.solids.push( mesh );
        else this.bodys.push( mesh );

        if( o.name ) view.byName[ o.name ] = mesh;

        if( o.type === 'dice' ) o.type = 'box';
        if( o.type === 'hardbox' ) o.type = 'box';
        

        // send to worker
        if( o.noPhy === undefined ) nrj.send( 'add', o );

    },

    bodyStep: function( AR, N ){

    	if( !this.bodys.length ) return;

        var _this = this;

        this.bodys.forEach( function( b, id ) {

            var n = N + ( id * 8 );

            var s = AR[n];

            b.position.fromArray( AR, n + 1 );
            b.quaternion.fromArray( AR, n + 4 );

            if ( s === 0 ) { // actif

                if ( b.material.name == 'sleep' ) b.material = _this.mat.move;
                if ( b.material.name == 'sleepCar' ) b.material = _this.mat.moveCar;
                
                //b.position.fromArray( AR, n + 1 );
                //b.quaternion.fromArray( AR, n + 4 );

            } else {
                if ( b.material.name == 'move' ) b.material = _this.mat.sleep;
                if ( b.material.name == 'moveCar' ) b.material = _this.mat.sleepCar;
            }
        });

    },

    joint: function ( o ) {

        o = o || {};

        if( o.b1 == undefined ) console.log( '!! body1 name not define' );
        if( o.b2 == undefined ) console.log( '!! body1 name not define' );

        o.type = o.type == undefined ? 'hinge' : o.type;
        o.pos1 = o.pos1 == undefined ? [0,0,0] : o.pos1;
        o.pos2 = o.pos2 == undefined ? [0,0,0] : o.pos2;

        o.axe = o.axe == undefined ? [1,0,0] : o.axe;
        o.axe1 = o.axe1 == undefined ? [1,0,0] : o.axe1;
        o.axe2 = o.axe2 == undefined ? [1,0,0] : o.axe2;

        o.param = o.param == undefined ? [] : o.param;

        nrj.send( 'joint', o );

    },

    trimesh: function ( o ) {

        if( !o.geometry ) return

        view.getGeomtryInfo( o );

        if(o.notAdd===undefined){

            var material;
            if(o.material !== undefined) material = this.mat[o.material];
            else material = o.density ? this.mat.move : this.mat.static;

            mesh = new THREE.Mesh( o.geometry, material );
            
            mesh.scale.fromArray( o.size );
            mesh.position.fromArray( o.pos );
            mesh.quaternion.fromArray( o.quat );

            mesh.receiveShadow = true;
            mesh.castShadow = true;

            this.content.add( mesh );

            if( o.density !== 0  ) this.bodys.push( mesh );
            else this.solids.push( mesh );

        }

        if( o.geometry ) delete( o.geometry );
        if( o.model ) delete( o.model );

        nrj.send( 'add', o );

    },


    planet: function ( o ) {

        var mesh = new Planet( o );

        this.content.add( mesh );
        this.solids.push( mesh );

        o.geometry = mesh.geometry;
        o.type = 'mesh'
        this.trimesh( o );

    },


    updateTerrain: function (name){

        var t = view.byName[ name ];

        if(t.isWater){ t.local.y +=0.2; t.update() }
        else t.easing();

        /*var o = {
            name:name,
            heightData: t.heightData
        }

        nrj.send( 'terrain', o );*/

    },



    terrain: function ( o ) {

        o.sample = o.sample == undefined ? [64,64] : o.sample;
        o.pos = o.pos == undefined ? [0,0,0] : o.pos;
        o.complexity = o.complexity == undefined ? 30 : o.complexity;

        o.is64 = true;
        o.isReverse = true;
        o.isAbsolute = true;

        var mesh = new THREE.Terrain( o );

        mesh.physicsUpdate = function () { nrj.send( 'terrain', { name:this.name, heightData:this.heightData } ) }

        mesh.position.fromArray( o.pos );

        //mesh.castShadow = false;
        //mesh.receiveShadow = true;

        this.content.add( mesh );
        this.solids.push( mesh );

        /// trimesh test
        if(o.toTri){
            o.geometry = mesh.geometry;
            o.type = 'mesh';
            o.notAdd = true;
            this.trimesh( o );
            return;
        }

        o.heightData = mesh.heightData;

        o.offset = 0;

        o.rot = [-90,0,0];
        o.rot = Math.vectorad(o.rot);
        o.quat = new THREE.Quaternion().setFromEuler( new THREE.Euler().fromArray( o.rot ) ).toArray();

        if( o.name ) view.byName[ o.name ] = mesh;

        // send to worker
        nrj.send( 'add', o );

    }

}