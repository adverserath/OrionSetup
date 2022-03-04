function getMyBeetle() {
    Orion.UseObject(Player.Serial())
    Orion.Wait(400)
    var bettles = Orion.FindTypeEx('0x0317', any, ground, 'nothumanmobile', 15)
    Orion.Print("beetles" + bettles.length)
    var bettlesPacks = bettles.filter(function (mob) {
        Orion.RequestContextMenu(mob.Serial());
        var owned = Orion.WaitForContextMenu(1000);
        Orion.Print(mob.Name() + owned + "\n\n")
        Orion.Wait(500)
        return owned;
    })

    if (bettlesPacks.length < 0)
        return;
    return bettlesPacks[0];
}

function EmptyBeetle() {
    var beetle = getMyBeetle()
    if (beetle == null)
        return
    var beetlebackpack = Orion.ObjAtLayer(21, beetle.Serial());
    var dest = SelectTarget()
    Orion.OpenContainer(beetlebackpack.Serial())
    EmptyContainerToAnother(beetlebackpack, dest)
}