
export default class TetrisAssetLoader{
    
    constructor()
    {
        this.loadTaskNum = 0;
        this.entityElementPool = new cc.NodePool();
        this.entityElementAsset = null;
    }

    loadEntityElement()
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

    borrowEntityElement()
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

        return ins;
    }

    restoreEntityElement(entityIns)
    {
        this.entityElementPool.put(entityIns);
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



}