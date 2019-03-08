import EntityBehaviorStrategyBase from './EntityBehaviorStrategyBase.js';

export default class EntityBehaviorStrategyLL extends EntityBehaviorStrategyBase{
    constructor()
    {
        super();
    }

    initEntity(entity)
    {
        super.initEntity(entity);

        for(let i = 0; i < this.entityPuppet.getNodeIns().length; i++)
        {
            
        }
    }

    changeType()
    {

    }
    
}