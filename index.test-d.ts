import beeper = require('.');

beeper();
beeper(3);
beeper(3, () => {});
beeper('****-*-*');
beeper('****-*-*', () => {});
