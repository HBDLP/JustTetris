
import {EntityType, TetrisEntity} from '../entity/TetrisEntity.js';

export default class EntityGenerator
{
    constructor()
    {
        this.loadTaskNum = 0;
        this.entityElementPool = new cc.NodePool();
        this.entityElementAsset = null;
    }

    
    generateEntity(object)
    {
        let entity = null;
        let generateType = Math.random(0, EntityType.Type_Total);

        if(object === null)
        {
            entity = new TetrisEntity(generateType);
            entity.setIns(this._borrowEntityElement());
        }
        else{
            object.reload(generateType);
            entity = object;
        }

        return entity;
    }

    loadRes()
    {
        let self = this;
        this.loadTaskNum++;
        let entityPath = "prefabs/innergame/entityelement";
        cc.loader.loadRes(entityPath, function(err, object){
            self.loadTaskNum--;

            if(err && err.length != 0)
            {
                console.log(err);
                return;
            }

            self._onLoadEntityElementFin(object);
        });
    }

    _onLoadEntityElementFin(object)
    {
        this.entityElementAsset = object;

        for(let i = 0; i < 200; i++)
        {
            let ins = cc.instantiate(object);
            this.entityElementPool.put(ins);
        }
    }

    _borrowEntityElement(count)
    {
        let insTbl = [];

        for(let i = 0; i < count; i++)
        {
            let ins = null;
            if(this.entityElementPool.size() > 0)
            {
                ins = this.entityElementPool.get();
            }
            else{
                ins = cc.instantiate(currPool.prefab);
                console.warn("instantiate entity element node!!");
            }

            insTbl.push(ins);
        }

        return ins;
    }

    _restoreEntityElement(entityIns)
    {
        this.entityElementPool.put(entityIns);
    }

}