'use strict';
var test = require('ava');
var beeper = require('./');
var BEEP_CHAR = '\u0007';

test('beep', function (t) {
	var _ = process.stdout.write;

	process.stdout.write = function (str) {
		if (str === BEEP_CHAR) {
			t.assert(true);
		}
	};

	beeper();
	process.stdout.write = _;
	t.end();
});

test('beep - count', function (t) {
	var _ = process.stdout.write;
	var i = 0;

	process.stdout.write = function (str) {
		if (str === BEEP_CHAR) {
			i++;
		}

		if (i === 3) {
			process.stdout.write = _;
			t.assert(true);
			t.end();
		}
	};

	beeper(3);
});

test('beep - melody', function (t) {
	var _ = process.stdout.write;
	var i = 0;

	process.stdout.write = function (str) {
		if (str === BEEP_CHAR) {
			i++;
		}

		if (i === 2) {
			process.stdout.write = _;
			t.assert(true);
			t.end();
		}
	};

	beeper('*-*');
});
