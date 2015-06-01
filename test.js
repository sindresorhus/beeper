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

function testBeepCount(count) {
	test('count ' + count, function (t) {
		var i = 0;

		hooker.hook(process.stdout, 'write', function (str) {
			if (str === BEEP_CHAR) {
				i++;
			}
		});

		beeper(count, function () {
			hooker.unhook(process.stdout, 'write');
			t.assert(i === count, i);
			t.end();
		});
	});
}

testBeepCount(0);
testBeepCount(1);
testBeepCount(3);

test('non-integer count should throw exception', function (t) {
	try {
		beeper(1.5, function () {
			t.assert(false);
			t.end();
		});
	} catch (e) {
		t.assert(true);
		t.end();
	}
});

test('negative count should throw exception', function (t) {
	try {
		beeper(-1, function () {
			t.assert(false);
			t.end();
		});
	} catch (e) {
		t.assert(true);
		t.end();
	}
});

test('melody', function (t) {
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
