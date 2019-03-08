import {EntityType, TetrisEntity} from '../entity/TetrisEntity.js';

export default class EntityBehaviorStrategyBase{
    constructor()
    {
        this.entityPuppet = null;
    }

    initEntity(entity)
    {
        this.entityPuppet = entity;
    }

    changeType()
    {
        
    }
    
}