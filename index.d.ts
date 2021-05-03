/**
Make your terminal beep.

@param count - How many times you want it to beep. Default: `1`.
@param melody - Construct your own melody by supplying a string of `*` for beep `-` for pause.
@returns A `Promise` that is resolved after the melody has ended.

@example
```
import beeper from 'beeper';

await beeper();
// beep one time

await beeper(3);
// beep three times

await beeper('****-*-*');
// beep, beep, beep, beep, pause, beep, pause, beep
```
*/
export default function beeper(count?: number): Promise<void>;
export default function beeper(melody: string): Promise<void>; // eslint-disable-line no-redeclare
