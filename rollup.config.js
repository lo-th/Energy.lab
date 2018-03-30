export default {
	input: 'src/energy/Nrj.js',
	
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'NRJ',
			file: 'build/nrj.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/nrj.module.js',
			indent: '\t'
		}
	]
};
