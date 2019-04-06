/**
Make your terminal beep.

@param count - How many times you want it to beep. Default: `1`.
@param melody - Construct your own melody by supplying a string of `*` for beep `-` for pause.

@example
```
import beeper = require('beeper');

beeper();
// beep one time

beeper(3);
// beep three times

beeper('****-*-*');
// beep, beep, beep, beep, pause, beep, pause, beep
```
*/
declare function beeper(count?: number, cb?: () => void): void;
declare function beeper(melody: string, cb?: () => void): void;

export = beeper;
