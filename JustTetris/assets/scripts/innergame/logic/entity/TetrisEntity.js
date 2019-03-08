var EntityType = cc.Enum({
    Type_None : -1,
    Type_Z_L : -1,
    Type_Z_R : -1,
    Type_L_L : -1,
    Type_L_R : -1,
    Type_T : -1,
    Type_Long : -1,
    Type_Square : -1,
    Type_Total : -1
});



class TetrisEntity
{
    constructor(type)
    {
        this.currPos = cc.v2(0, 0);
        this.currType = type;
        this.insTbl = [];
    }

    init()
    {

    }

    setIns(object)
    {
        this.insTbl = object;
    }

    getNodeIns()
    {
        return this.insTbl;
    }

    getType()
    {
        return this.currType;
    }

    reload(type)
    {
        this.currPos = cc.v2(0, 0);
        this.currType = type;
    }

    changeType()
    {

    }

    manualUpdate()
    {

    }

}

export {EntityType, TetrisEntity};