'use strict';

var BEEP_DELAY = 500;

if (!process.stdout.isTTY ||
	process.argv.indexOf('--no-beep') !== -1 ||
	process.argv.indexOf('--beep=false') !== -1) {
	module.exports = function () {};
	return;
}

function beep() {
	process.stdout.write('\u0007');
}

function melodicalBeep(val, cb) {
	if (val.length === 0) {
		cb();
		return;
	}

	setTimeout(function () {
		if (val.shift() === '*') {
			beep();
		}

		melodicalBeep(val, cb);
	}, BEEP_DELAY);
}

module.exports = function (val, cb) {
	cb = cb || function () {};

	if (!val) {
		beep();
		cb();
	} else if (typeof val === 'number') {
		beep();

		if (val === 1) {
			cb();
			return;
		}

		var lastBeepIndex = val - 1;

		while (--val) {
			setTimeout(function (i) {
				beep();

				if (i === lastBeepIndex) {
					cb();
				}
			}, BEEP_DELAY * val, val);
		}
	} else if (typeof val === 'string') {
		melodicalBeep(val.split(''), cb);
	} else {
		throw new TypeError('Not an accepted type');
	}
};
