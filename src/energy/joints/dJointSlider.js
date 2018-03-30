import { Energy } from '../core/Energy.js';
import { Joint } from '../core/Joint.js';
import { Tools } from '../core/Tools.js';

function dJointSlider( dxWorld, world, group ) {

    Joint.call( this, world, group );

    this.dxJoint = Energy.dJointCreateSlider( this.dxWorld, this.dxJointGroup );

};

dJointSlider.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: dJointSlider,

    setParam: function ( name, value ) {

        Energy.dJointSetSliderParam( this.dxJoint, this.parametres[ name ], value );

    },

    setAxis: function ( v ) {
        Energy.dJointSetSliderAxis( this.dxJoint, v[0], v[2], v[1] );
    },

    setAxis1: function ( v ) {
        Energy.dJointSetSliderAxis( this.dxJoint, v[0], v[2], v[1] );
    },

    /////

    dJointSetSliderAxis: function ( x, y, z ) {

        Energy.dJointSetSliderAxis(this.dxJoint, x, y, z);

    },

    dJointSetParam: function ( parameter, value ) {

        Energy.dJointSetSliderParam( this.dxJoint, parameter, value );

    },

});

export { dJointSlider };