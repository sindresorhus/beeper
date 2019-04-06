'use strict';

const BEEP_DELAY = 500;

function beep() {
	process.stdout.write('\u0007');
}

function melodicalBeep(melody, callback) {
	if (melody.length === 0) {
		callback();
		return;
	}

	setTimeout(() => {
		if (melody.shift() === '*') {
			beep();
		}

		melodicalBeep(melody, callback);
	}, BEEP_DELAY);
}

module.exports = (countOrMelody, callback) => {
	if (
		!process.stdout.isTTY ||
		process.argv.indexOf('--no-beep') !== -1 ||
		process.argv.indexOf('--beep=false') !== -1
	) {
		return;
	}

	callback = callback || (() => {});

	if (countOrMelody === Number.parseInt(countOrMelody, 10)) {
		if (countOrMelody < 0) {
			throw new TypeError('Negative numbers are not accepted');
		}

		if (countOrMelody === 0) {
			callback();
			return;
		}

		for (let i = 0; i < countOrMelody; i++) {
			setTimeout(
				i => {
					beep();

					if (i === countOrMelody - 1) {
						callback();
					}
				},
				BEEP_DELAY * i,
				i
			);
		}
	} else if (!countOrMelody) {
		beep();
		callback();
	} else if (typeof countOrMelody === 'string') {
		melodicalBeep(countOrMelody.split(''), callback);
	} else {
		throw new TypeError('Not an accepted type');
	}
};
