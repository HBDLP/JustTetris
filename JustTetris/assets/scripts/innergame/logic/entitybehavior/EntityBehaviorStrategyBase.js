import {EntityType, TetrisEntity} from '../entity/TetrisEntity.js';
import {ConstIngame} from '../../common/ConstIngame.js';

export default class EntityBehaviorStrategyBase{
    constructor(gamelogic)
    {
        this.gamelogic = gamelogic;
        this.entityPuppet = null;
        this.entityLandingTime = 0;
        this.entityLandingTimeCurr = 0;
        this.currEntityAngle = 0;
    }

    release()
    {

    }

    initEntityBehavior(entity)
    {
        this.entityPuppet = entity;

        do
        {
            let insCnt = this.entityPuppet.getNodeIns().length;
            if(insCnt !== 4)
            {
                break;
            }

            this._initEntityShape();
        }while(false);
    }

    setLandingTime(time)
    {
        this.entityLandingTime = time;
    }
    
    tryLandEntity(dt)
    {
        let isLand = false;
        do{


            this.entityLandingTimeCurr += dt;
            if(this.entityLandingTimeCurr >= this.entityLandingTime)
            {
                if(this._testEntityLanded())
                {
                    isLand = true;
                    this.entityPuppet.landDone();
                    this._refreshLandedEntitySet();
                    this.gamelogic.onEntityLanded(this.entityPuppet);
                }
                else{
                    this.entityPuppet.landStep();
                }
                
                this.entityLandingTimeCurr = 0;
            }

            
        }while(false);

        return isLand;
    }

    _refreshLandedEntitySet()
    {

    }

    _isNextToLandedEntity(rowIndex, columIndex)
    {
        let bRet = false;
        
        do{
            if(rowIndex === 0)
            {
                bRet = true;
                break;
            }

            let dataSet = this.gamelogic.landedElementDataSet;
            if(!dataSet)
            {
                break;
            }

            if(dataSet.length < rowIndex * 10)
            {
                break;
            }

            let offset = (rowIndex - 1) * 10 + columIndex;
            if(dataSet[offset] > ConstIngame.EntityElementType.Type_Blank)
            {
                bRet = true;
                break;
            }
        }while(false);

        return bRet;
    }

    changeType()
    {
        
    }
    
}