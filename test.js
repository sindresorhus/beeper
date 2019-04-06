import {promisify} from 'util';
import {serial as test} from 'ava';
import hooker from 'hooker';
import beeper from '.';

const BEEP_CHAR = '\u0007';

test('beep', async t => {
	let i = 0;

	hooker.hook(process.stdout, 'write', str => {
		if (str === BEEP_CHAR) {
			i++;
		}
	});

	await promisify(beeper)(1);

	hooker.unhook(process.stdout, 'write');
	t.true(i === 1);
});

function testBeepCount(count) {
	test('count ' + count, async t => {
		let i = 0;

		hooker.hook(process.stdout, 'write', str => {
			if (str === BEEP_CHAR) {
				i++;
			}
		});

		await promisify(beeper)(count);

		hooker.unhook(process.stdout, 'write');
		t.true(i === count);
	});
}

testBeepCount(0);
testBeepCount(1);
testBeepCount(3);

test('non-integer count should throw exception', async t => {
	try {
		await promisify(beeper)(1.5);
		t.fail();
	} catch (error) {
		t.pass();
	}
});

test('negative count should throw exception', async t => {
	try {
		await promisify(beeper)(-1);
		t.fail();
	} catch (error) {
		t.pass();
	}
});

test('melody', async t => {
	let i = 0;

	hooker.hook(process.stdout, 'write', str => {
		if (str === BEEP_CHAR) {
			i++;
		}
	});

	await promisify(beeper)('*-*');

	hooker.unhook(process.stdout, 'write');
	t.true(i === 2);
});
