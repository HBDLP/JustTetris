import EntityBehaviorStrategyBase from './EntityBehaviorStrategyBase.js';
import {EntityType, TetrisEntity} from '../entity/TetrisEntity.js';
import {ConstIngame} from '../../common/ConstIngame.js';

export default class EntityBehaviorStrategyLL extends EntityBehaviorStrategyBase{
    constructor(gamelogic)
    {
        super(gamelogic);        
    }

    _initEntityShape()
    {
        let entityWidth = ConstIngame.EntityWidth;

        this.entityPuppet.majorIns = this.entityPuppet.getNodeIns()[0];
        this.entityPuppet.rowIndex = 20;
        this.entityPuppet.columnIndex = 4;
        this.entityPuppet.majorIns.x = this.entityPuppet.columnIndex * entityWidth;
        this.entityPuppet.majorIns.y = this.entityPuppet.rowIndex * entityWidth;
        this.entityPuppet.getNodeIns()[1].x = this.entityPuppet.majorIns.x + entityWidth;
        this.entityPuppet.getNodeIns()[1].y = this.entityPuppet.majorIns.y;
        this.entityPuppet.getNodeIns()[2].x = this.entityPuppet.majorIns.x - entityWidth;
        this.entityPuppet.getNodeIns()[2].y = this.entityPuppet.majorIns.y;
        this.entityPuppet.getNodeIns()[3].x = this.entityPuppet.majorIns.x - entityWidth;
        this.entityPuppet.getNodeIns()[3].y = this.entityPuppet.majorIns.y + entityWidth;
        
    }

    _refreshLandedEntitySet()
    {
        switch(this.entityPuppet.currAngle)
        {
            case 0:
                this._refreshDataAngle0();

                break;

            case 90:
                break;

            case 180:
                break;
            
            case 270:
                break;
        }
    }

    _refreshDataAngle0()
    {
        let dataSet = this.gamelogic.landedElementDataSet;
       
        if(dataSet.length < (this.entityPuppet.rowIndex + 1) * 10)
        {
            for(let i = 0; i < 10; i++)
            {
                if(i === this.entityPuppet.columnIndex
                    || i === this.entityPuppet.columnIndex - 1
                    || i === this.entityPuppet.columnIndex + 1
                    )
                {
                    dataSet.push(ConstIngame.EntityElementType.Type_L_L);
                }
                else{
                    dataSet.push(ConstIngame.EntityElementType.Type_Blank);
                }
            }
        }
        else{
            let offset = this.entityPuppet.rowIndex * 10 + this.entityPuppet.columnIndex;
            dataSet[offset] = ConstIngame.EntityElementType.Type_L_L;
            dataSet[offset - 1] = ConstIngame.EntityElementType.Type_L_L;
            dataSet[offset + 1] = ConstIngame.EntityElementType.Type_L_L;
        }

        if(dataSet.length < (this.entityPuppet.rowIndex + 2) * 10)
        {
            for(let i = 0; i < 10; i++)
            {
                if(i === this.entityPuppet.columnIndex - 1)
                {
                    dataSet.push(ConstIngame.EntityElementType.Type_L_L);
                }
                else{
                    dataSet.push(ConstIngame.EntityElementType.Type_Blank);
                }
            }
        }
        else{
            let offset = this.entityPuppet.rowIndex * 10 + this.entityPuppet.columnIndex;
            dataSet[offset - 1] = ConstIngame.EntityElementType.Type_L_L;
        }

    }

    changeType()
    {

    }


    _testEntityLanded()
    {
        let bRet = false;
        switch(this.entityPuppet.currAngle)
        {
            case 0:
                if(this._isNextToLandedEntity(this.entityPuppet.rowIndex, this.entityPuppet.columnIndex))
                {
                    bRet = true;
                    break;
                }
                else if(this._isNextToLandedEntity(this.entityPuppet.rowIndex, this.entityPuppet.columnIndex - 1))
                {
                    bRet = true;
                    break;
                }
                else if(this._isNextToLandedEntity(this.entityPuppet.rowIndex, this.entityPuppet.columnIndex + 1))
                {
                    bRet = true;
                    break;
                } 
                break;
        }

        return bRet;
    }


}