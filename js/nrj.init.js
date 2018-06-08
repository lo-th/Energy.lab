
var maxBody = 2000;

var Ar;

var ArLng = [ 
    maxBody * 8, // rigid
    //100 * 4, // joint
];

var ArPos = [ 
    0, 
    //ArLng[0],
];

var ArMax = ArLng[0];// + ArLng[1];

var nrj = ( function () {

    'use strict';

    var worker, callback, blob, blob2;
    var isDirect = false;
    var isBuffer = false;

    var timestep = 1/60;
    var timerate = timestep * 1000;

    var isWasm = true;
    var time = 0;
    var then = 0;
    var delta = 0;
    var temp = 0;
    var count = 0;
    var fps = 0;

    var stepNext = false;
    var timer = undefined;

    nrj = {

        init: function ( Callback, wasm, direct ) {

            isDirect = direct !== undefined ? direct : false;
            isWasm = wasm !== undefined ? wasm : true;

            callback = Callback;

            worker = new Worker('./build/nrj.worker.js');
            worker.onmessage = this.message;
            worker.postMessage = worker.webkitPostMessage || worker.postMessage;

            if( isDirect ) {
                blob = document.location.href.replace(/\/[^/]*$/,"/") + ( isWasm ? "./build/wasm/energy.js" : "./build/asm/energy.js" );
                //blob = isWasm ? document.location.href.replace(/\/[^/]*$/,"/") + "./build/wasm/energy.js" : document.location.href.replace(/\/[^/]*$/,"/") + "./build/asm/energy.js";
                //blob = isWasm ? document.location.href.replace(/\/[^/]*$/,"/") + "./build/worker/js/energy.js" : document.location.href.replace(/\/[^/]*$/,"/") + "./build/asm/energy.js";
                blob2 = document.location.href.replace(/\/[^/]*$/,"/") + "./build/nrj.js";
            } else {
                blob = extract.get('energy');
                blob2 = extract.get('nrj');
            }

            // test transferrables
            var ab = new ArrayBuffer(1);
            worker.postMessage( ab, [ab] );
            isBuffer = ab.byteLength ? false : true;

            worker.postMessage( { m:'init', blob:blob, blob2:blob2, isBuffer:isBuffer, settings:[ ArLng, ArPos, ArMax ] });
            
        },

        message: function( e ) {

            var data = e.data;
            if( data.Ar ) Ar = data.Ar;

            switch( data.m ){
                case 'initEngine': nrj.initEngine(); break;
                case 'start': nrj.start( data ); break;
                case 'step': nrj.step(); break;
                //case 'timerate': timerate = data.stepSize * 1000; break;
            }

        },

        initEngine: function () {

            window.URL.revokeObjectURL( blob );
            window.URL.revokeObjectURL( blob2 );
            if( !isDirect ) {
                extract.clearBlob('energy');
                extract.clearBlob('nrj');
            }
            blob = null;

            console.log( "ENERGY worker init with Buffer: " + isBuffer + " | Wasm version: " + isWasm );

            if( callback ) callback();

        },

        start: function ( o ) {

            stepNext = true;

            // create tranfere array if buffer
            if( isBuffer ) Ar = new Float32Array( ArMax );

            if ( !timer ) timer = requestAnimationFrame( nrj.sendData );
           
        },

        step: function () {

            if ( (time - 1000) > temp ){ temp = time; fps = count; count = 0; }; count++;

            view.needUpdate( true );

            stepNext = true;
            
        },

        sendData: function ( stamp ){

            if( view.pause ){ timer = null; return; }

            timer = requestAnimationFrame( nrj.sendData );
            time = stamp === undefined ? now() : stamp;
            delta = time - then;

            if ( delta > timerate ) {

                then = time - ( delta % timerate );

                if( stepNext ){
                    if( isBuffer ) worker.postMessage( { m:'step', key:user.key, Ar:Ar }, [ Ar.buffer ] );
                    else worker.postMessage( { m:'step', key:user.key } );
                    stepNext = false;
                }

                if( editor ) editor.tell( 'three '+ view.getFps() +' | energy ' + fps );
               // if( editor ) editor.tell( user.key );

            }

        },

        send: function ( m, o ) {

            if( m === 'set' ){ 
                o = o || {};
                if( o.fps !== undefined ) o.timeStep = 1/o.fps;
                timerate = o.timeStep == undefined ? 0.016 * 1000 : o.timeStep * 1000;
            }
            worker.postMessage( { m:m, o:o } );

        },

        reset: function( full ) {

             if ( timer ) {
               window.cancelAnimationFrame( timer );
               timer = undefined;
            }
            
            view.reset();
            
            worker.postMessage( { m:'reset', full:full });

        }
    }

    return nrj;

})();