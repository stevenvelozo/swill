/**
* Unit tests for the Swill Toolchain
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require("chai");
var Expect = Chai.expect;
var Assert = Chai.assert;

suite
(
	'Orator',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Object Sanity',
			function()
			{
				test
				(
					'initialize should build a happy little object',
					function()
					{
						var tmpSwill = require('../source/Swill.js')
						Expect(tmpSwill)
							.to.be.an('object', 'Swill should initialize as an object directly from the require statement.');
						Expect(tmpSwill.gulp)
							.to.be.an('object', 'Swill should have a fully operational gulp library');
					}
				);
				test
				(
					'add some mappings',
					function()
					{
						var tmpSwill = require('../source/Swill.js')
						Expect(tmpSwill)
							.to.be.an('object', 'Swill should initialize as an object directly from the require statement.');
						Expect(tmpSwill.gulp)
							.to.be.an('object', 'Swill should have a fully operational gulp library');
					}
				);
			}
		);
		suite
		(
			'Basic Server Start',
			function()
			{
			}
		);
	}
);