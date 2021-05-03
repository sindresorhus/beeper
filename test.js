import test from 'ava';
import hooker from 'hooker';
import beeper from './index.js';

process.stdout.isTTY = true;

const BEEP_CHARACTER = '\u0007';

test('beep', async t => {
	let index = 0;

	hooker.hook(process.stdout, 'write', string => {
		if (string === BEEP_CHARACTER) {
			index++;
		}
	});

	await beeper(1);

	hooker.unhook(process.stdout, 'write');
	t.is(index, 1);
});

function testBeepCount(count) {
	test('count ' + count, async t => {
		let index = 0;

		hooker.hook(process.stdout, 'write', string => {
			if (string === BEEP_CHARACTER) {
				index++;
			}
		});

		await beeper(count);

		hooker.unhook(process.stdout, 'write');
		t.is(index, count);
	});
}

testBeepCount(0);
testBeepCount(1);
testBeepCount(3);

test('non-integer count should throw exception', async t => {
	try {
		await beeper(1.5);
		t.fail();
	} catch {
		t.pass();
	}
});

test('negative count should throw exception', async t => {
	try {
		await beeper(-1);
		t.fail();
	} catch {
		t.pass();
	}
});

test('melody', async t => {
	let index = 0;

	hooker.hook(process.stdout, 'write', string => {
		if (string === BEEP_CHARACTER) {
			index++;
		}
	});

	await beeper('*-*');

	hooker.unhook(process.stdout, 'write');
	t.is(index, 2);
});
