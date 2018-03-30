var demos = [ 
    'basic', 'tower', 'terrain', 'trimesh', 'building', 'car', 'ragdoll', 'asteroid', 'kinematic', 'water', 'mesh_test', 'kineBody'
];

demos.sort();

var demoName = 'basic';

var isWithCode = false;
var isWasm = false;
var isDirect = true;

function init () {

    view = new View();

	user.init();
	view.init( initEnergy );
    intro.init('Energy: Samuel Girardin | Lab: 3th');
	
}

function initEnergy () {

    nrj.init( next, isWasm, isDirect );
    
}

function next () {

    intro.clear();

    editor.init( launch, isWithCode, '#32f337' );
    nrj.start();

    ready();
    
}

function ready () {

    var hash = location.hash.substr( 1 );
    if(hash !=='') demoName = hash;
    editor.load('demos/' + demoName + '.js');

};

function launch ( name ) {

    var full = true;
    var hash = location.hash.substr( 1 );
    if( hash === name ) full = false;

    location.hash = name;

    nrj.reset( full );
    
    demo = new window['demo'];

};

// editor fonction

function cam ( o ) { return view.moveCam( o ); };
function follow ( name, o ) { return view.setFollow( name, o ); };

function add ( o ) { return view.add( o ); };
function joint ( o ) { return view.joint( o ); };
function vehicle ( o ) { return view.vehicle( o ); };

function set ( o ) { return nrj.send( 'set', o ); };

function motion ( o ) { return view.motion( o ); };
function hideGrid () { return view.hideGrid(); };
function control ( o ) { return nrj.send('control', o ); };
function load ( name, callback ) { return view.load( name, callback  ); };

function matrix ( o ) { nrj.send('matrix', o ); };
function matrixArray ( o ) { nrj.send('matrixArray', o ); };

function force ( o ) { return nrj.send( 'force', o ); };
function forceArray ( o ) { return nrj.send( 'forceArray', o ); };