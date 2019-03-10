import InnergameLogic from './InnergameLogic.js';

cc.Class({
    extends: cc.Component,

    properties: {
        entityRoot:{
            default:null,
            type:cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.gameLogic = null;
        this.gameStart = false;
        this.tryStartGame = false;
    },

    initGame()
    {
        this.gameLogic = new InnergameLogic(this);
        this.gameLogic.init();
        this.tryStartGame = true;
    },

    startGame()
    {
        if(this.gameLogic !== null)
        {
            this.gameLogic.startGame();
        }
        var node = cc.find('Canvas/GameManager/temp/start');
        node.active = false;

        this.tryStartGame = false;
        this.gameStart = true;
    },

    update (dt) {

        if(this.tryStartGame)
        {
            if(this.gameLogic.isInitDone())
            {
                this.startGame();
            }
        }

        if(this.gameStart)
        {
            if(this.gameLogic !== null)
            {
                this.gameLogic.manualUpdate(dt);
            }
        }

    },

    getEntityRoot()
    {
        return this.entityRoot;
    },
});
