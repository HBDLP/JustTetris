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
    constructor()
    {
        let bpm = 100;
        let entityWidth = 35;

        this.perBeatTime = 60 / bpm;
        this.currActiveEntity = null;
        this.entityGenerator = null;
        this.strategyLL = new EntityBehaviorStrategyLL();
        this.strategyLR = new EntityBehaviorStrategyLR();
        this.strategyZL = new EntityBehaviorStrategyZL();
        this.strategyZR = new EntityBehaviorStrategyZR();
        this.strategySquare = new EntityBehaviorStrategySquare();
        this.strategyLong = new EntityBehaviorStrategyLong();
        this.strategyT = new EntityBehaviorStrategyT();
        this.currStrategy = null;
    }

    changeType()
    {

    }

    startGame()
    {
        this._tryGenerateEntity(null);
    }

    manualUpdate(dt)
    {
        if(this.currActiveEntity !== null)
        {
            this.currActiveEntity.manualUpdate();
        }
    }

    updateEntity()
    {
        let bRet = true;

        do{
            if(this.currActiveEntity === null)
            {
                bRet = false;
                break;
            }

            if(this.currStrategy === null)
            {
                bRet = false;
                break;
            }

            this.currStrategy.updateEntity(dt, this.currActiveEntity);

        }while(false);

        return bRet;
    }

    onEntityLanded(object)
    {
        this._tryGenerateEntity(object);
    }

    _tryGenerateEntity(object)
    {
        if(this.entityGenerator !== null)
        {
            this.currActiveEntity = this.entityGenerator.generateEntity(object);
            this._setStrategy(this.currActiveEntity.getType());
            this.currStrategy.initEntity(this.currActiveEntity);
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
