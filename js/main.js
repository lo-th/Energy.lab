var demos = [ 
    'basic', 'tower', 'terrain', 'trimesh', 'supermaket', 'car', 'ragdoll', 'asteroid', 'kinematic', 'water', 'mesh_test', 'kineBody'
];

demos.sort();

var demoName = 'basic';

var isWithCode = false;
var isWasm = false;
var isDirect = true;
var simulation;

var physic = null;

function init () {

    //view = new View();

	user.init();
	view.init( initEnergy );
    intro.init('Energy: Samuel Girardin | Lab: 3th');
	
}

function initEnergy () {

    nrj.init( next, isWasm, isDirect );
    simulation = new Simulation();

    physic = nrj;

    physic.update = function(){ simulation.update() };
    
}

function next () {

    intro.clear();

    physic.setView( view );

    editor.init( launch, isWithCode, '#32f337', 'Energy.lab' );
    view.setEditor( editor );
    view.setUser( user );
    view.unPause = unPause;

    physic.start();

    ready();
    
}

function unPause () {

    physic.start();

}

function ready () {

    var hash = location.hash.substr( 1 );
    if(hash !=='') demoName = hash;
    editor.load('demos/' + demoName + '.js');

};

function launch ( name, full ) {

    /*var full = true;
    var hash = location.hash.substr( 1 );
    if( hash === name ) full = false;

    location.hash = name;*/

    physic.reset( full );
    demo = new window['demo'];

};

// editor fonction

function cam ( o ) { return view.moveCam( o ); };
function follow ( name, o ) { return view.setFollow( name, o ); };

function add ( o ) { return simulation.add( o ); };
function joint ( o ) { return simulation.joint( o ); };
function vehicle ( o ) { return simulation.vehicle( o ); };

function set ( o ) { return physic.send( 'set', o ); };

function motion ( o ) { return view.motion( o ); };
function hideGrid () { return view.hideGrid(); };
function control ( o ) { return physic.send('control', o ); };
function load ( name, callback ) { return view.load( name, callback ); };

function matrix ( o ) { physic.send('matrix', o ); };
function matrixArray ( o ) { physic.send('matrixArray', o ); };

function force ( o ) { return physic.send( 'force', o ); };
function forceArray ( o ) { return physic.send( 'forceArray', o ); };