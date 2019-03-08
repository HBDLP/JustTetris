import InnergameLogic from './InnergameLogic.js';

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.gameLogic = new InnergameLogic();
    },

    update (dt) {
        if(this.gameLogic !== null)
        {
            this.gameLogic.manualUpdate(dt);
        }
    },
});
