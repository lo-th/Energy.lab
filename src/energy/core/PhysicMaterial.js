import { Energy } from './Energy.js';

var PhysicMaterial = {

    Instances: [],
    DefaultMaterial: null,

    add: function ( name ) {

        var m = new Material( name )
        this.Instances.push( m );
        return m;

    },

    GetDefault: function () {
        PhysicMaterial.DefaultMaterial = this.add('defaultPhysicMaterial');
        return PhysicMaterial.DefaultMaterial;
    }

}

export { PhysicMaterial };

function Material( name ) {

    this.name = name;
    this.dxMaterial = Energy.dMaterialCreate(0);
    PhysicMaterial.Instances.push(this);

}

Material.prototype = {
    setMaterialParameter: function ( param, value ) {

        //console.log(param, value)
        Energy.dMaterialSetParameter( this.dxMaterial, param, value );

    },

    getMaterialParameter: function (param) {

        return Energy.dMaterialGetParameter( this.dxMaterial, param );

    }
}

export { Material };