
var Tools = {

    Malloc_Float64Array: function ( f64, q ) {

        var nDataBytes = f64.length * f64.BYTES_PER_ELEMENT;
        if( q === undefined ) q = _malloc( nDataBytes );
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
        dataHeap.set(new Uint8Array(f64.buffer));
        return q;

    },

    Malloc_Float32Array: function ( f32, q ) {

        var nDataBytes = f32.length * f32.BYTES_PER_ELEMENT;
        if( q === undefined ) q = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
        dataHeap.set(new Uint8Array(f32.buffer));
        return q;
    },

    Malloc_Int32: function ( uint32, q ) {

        var nDataBytes = uint32.length * uint32.BYTES_PER_ELEMENT;
        if( q === undefined ) q = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
        dataHeap.set(new Uint8Array(uint32.buffer));
        return q;

    },

    Malloc_Quaternion: function ( w, x, y, z, q ) {

        var size = new Float64Array([w, x, y, z]);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        if( q === undefined ) q = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return q;

    },

    Malloc_Vector3: function ( x, y, z, v ) {

        var size = new Float64Array([x, y, z]);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        if( v === undefined ) v = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, v, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return v;

    },

    /*Malloc_new_quaternion: function () {

        var size = new Float64Array(4);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        var q = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, q, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return q;

    },

    Malloc_new_Vector3: function () {

        var size = new Float64Array(3);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        var v3 = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, v3, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return v3;

    },*/

    Malloc_dMass_Struct: function () {

        var size = new Float64Array(17);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        var m = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, m, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return m;

    },

    Malloc_dMatrix3x3: function () {

        var size = new Float64Array(12);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        this.DMatrix3_ptr = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, this.DMatrix3_ptr, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return this.DMatrix3_ptr;

    },
    
    Malloc_feedback_struct: function () {

        var size = new Float64Array(16);
        var nDataBytes = size.length * size.BYTES_PER_ELEMENT;
        this.feedBack = _malloc(nDataBytes);
        var dataHeap = new Uint8Array(Module.HEAPU8.buffer, this.feedBack, nDataBytes);
        dataHeap.set(new Uint8Array(size.buffer));
        return this.feedBack;

    },

    Free_DMatrix3_Ptr: function ( ptr ) {

        _free(ptr);

    },

    Free_dMass_Struc: function () {

        _free( this.Mass_ptr );

    },

    Free: function ( ar ) {

        _free( ar );

    },

    Pointer_To_Vector3: function ( ptr, swapTOxzy ) {

        var x = Module.getValue(ptr + 0, 'double');
        var y = Module.getValue(ptr + 8, 'double');
        var z = Module.getValue(ptr + 16, 'double');
        if (!swapTOxzy) {
            return new Array(x, y, z);
        }
        else {
            return new Array(x, z, y);
        }

    },

    UpdateQuaternion: function ( ptr, w, x, y, z ) {

        Module.setValue(ptr + 0, w, 'double');
        Module.setValue(ptr + 8, x, 'double');
        Module.setValue(ptr + 16, y, 'double');
        Module.setValue(ptr + 24, z, 'double');

    },

    Pointer_To_Vector4: function ( ptr, isQuaternion ) {
        if (isQuaternion) {
            var w = Module.getValue(ptr + 0, 'double');
            var x = -Module.getValue(ptr + 8, 'double');
            var y = -Module.getValue(ptr + 16, 'double');
            var z = -Module.getValue(ptr + 24, 'double');
        }
        else {
            var w = Module.getValue(ptr + 0, 'double');
            var x = Module.getValue(ptr + 8, 'double');
            var y = Module.getValue(ptr + 16, 'double');
            var z = Module.getValue(ptr + 24, 'double');
        }
        return new Array(w, x, y, z);
    }
}

export { Tools };