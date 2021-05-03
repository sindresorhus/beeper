import {expectType} from 'tsd';
import beeper from './index.js';

expectType<Promise<void>>(beeper());
expectType<Promise<void>>(beeper(3));
expectType<Promise<void>>(beeper('****-*-*'));
