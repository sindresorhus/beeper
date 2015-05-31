'use strict';
var test = require('tape');
var hooker = require('hooker');
var beeper = require('./');
var BEEP_CHAR = '\u0007';

test('beep', function (t) {
	var i = 0;

	hooker.hook(process.stdout, 'write', function (str) {
		if (str === BEEP_CHAR) {
			i++;
		}
	});

	beeper(1, function () {
		hooker.unhook(process.stdout, 'write');
		t.assert(i === 1, i);
		t.end();
	});
});

test('beep - count', function (t) {
	var i = 0;

	hooker.hook(process.stdout, 'write', function (str) {
		if (str === BEEP_CHAR) {
			i++;
		}
	});

	beeper(3, function () {
		hooker.unhook(process.stdout, 'write');
		t.assert(i === 3, i);
		t.end();
	});
});

test('beep - melody', function (t) {
	var i = 0;

	hooker.hook(process.stdout, 'write', function (str) {
		if (str === BEEP_CHAR) {
			i++;
		}
	});

	beeper('*-*', function () {
		hooker.unhook(process.stdout, 'write');
		t.assert(i === 2, i);
		t.end();
	});
});
