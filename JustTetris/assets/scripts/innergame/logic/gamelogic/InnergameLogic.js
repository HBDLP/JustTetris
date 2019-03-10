import EntityGenerator from './EntityGenerator.js';
import {EntityType, TetrisEntity} from '../entity/TetrisEntity.js';

import EntityBehaviorStrategyLL from '../entitybehavior/EntityBehaviorStrategyLL.js';
import EntityBehaviorStrategyLR from '../entitybehavior/EntityBehaviorStrategyLR.js';
import EntityBehaviorStrategyZL from '../entitybehavior/EntityBehaviorStrategyZL.js';
import EntityBehaviorStrategyZR from '../entitybehavior/EntityBehaviorStrategyZR.js';
import EntityBehaviorStrategySquare from '../entitybehavior/EntityBehaviorStrategySquare.js';
import EntityBehaviorStrategyLong from '../entitybehavior/EntityBehaviorStrategyLong.js';
import EntityBehaviorStrategyT from '../entitybehavior/EntityBehaviorStrategyT.js';


export default class InnergameLogic
{
    constructor(game)
    {
        let bpm = 100;
        let entityWidth = 35;

        this.perBeatTime = 60 / bpm;
        this.currActiveEntity = null;
        this.entityGenerator = new EntityGenerator(game.getEntityRoot());
        this.strategyLL = new EntityBehaviorStrategyLL(this);
        this.strategyLR = new EntityBehaviorStrategyLR();
        this.strategyZL = new EntityBehaviorStrategyZL();
        this.strategyZR = new EntityBehaviorStrategyZR();
        this.strategySquare = new EntityBehaviorStrategySquare();
        this.strategyLong = new EntityBehaviorStrategyLong();
        this.strategyT = new EntityBehaviorStrategyT();
        this.currStrategy = null;
        this.landedElementDataSet = [];
    }

    changeType()
    {

    }

    init()
    {
        this.entityGenerator.loadRes();
    }

    isInitDone()
    {
        return this.entityGenerator.loadTaskNum === 0;
    }

    startGame()
    {
        this._tryGenerateEntity(null);
    }

    finishGame()
    {
        this._releaseEntityBehaviorStrategy();
        this._releaseEntityGenerator();
    }

    manualUpdate(dt)
    {
        this._tryLandActiveEntity(dt);
    }

    onEntityLanded(entity)
    {

        this._tryGenerateEntity(entity);
    }


    _releaseEntityBehaviorStrategy()
    {
        this.strategyLL.release();
        this.strategyLL = null;
        this.strategyLR.release();
        this.strategyLR = null;
        this.strategyZL.release();
        this.strategyZL = null;
        this.strategyZR.release();
        this.strategyZR = null;
        this.strategySquare.release();
        this.strategySquare = null;
        this.strategyLong.release();
        this.strategyLong = null;
        this.strategyT.release();
        this.strategyLL = null;
        
        this.currStrategy = null;
    }

    _releaseEntityGenerator()
    {
        this.entityGenerator.release();
        this.entityGenerator = null;
    }

    _tryLandActiveEntity(dt)
    {
        do{

            if(this.currActiveEntity === null)
            {
                break;
            }

            if(this.currStrategy === null)
            {
                break;
            }

            let isLand = this.currStrategy.tryLandEntity(dt);

        }while(false);
    }

    _tryGenerateEntity(object)
    {
        if(this.entityGenerator !== null)
        {
            this.currActiveEntity = this.entityGenerator.generateEntity(object);
            this._setStrategy(this.currActiveEntity.getType());
            this.currStrategy.initEntityBehavior(this.currActiveEntity);
            this.currStrategy.setLandingTime(this.perBeatTime);
        }
        else{
            console.error("logic error! generator is null!!");
        }
    }

    _setStrategy(entityType)
    {
        switch(entityType)
        {
            case EntityType.Type_Z_L:
                this.currStrategy = this.strategyZL;
                break;

            case EntityType.Type_Z_R:
                this.currStrategy = this.strategyZR;
                break;

            case EntityType.Type_L_L:
                this.currStrategy = this.strategyLL;
                break;

            case EntityType.Type_L_R:
                this.currStrategy = this.strategyLR;
                break;

            case EntityType.Type_T:
                this.currStrategy = this.strategyT;
                break;

            case EntityType.Type_Long:
                this.currStrategy = this.strategyLong;
                break;          

            case EntityType.Type_Square:
                this.currStrategy = this.strategySquare;
                break;          
        }
    }
}
