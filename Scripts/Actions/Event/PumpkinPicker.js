//#include helpers/Target.js
function PickPumpkins() {
    while (true) {
        Orion.Wait(100)
        while (!Player.WarMode()) {
            Orion.Wait(100)
            var pumpkin = Orion.FindTypeEx(any, any, ground, '', 24).filter(function (item) {
                return item.Name() == "Pumpkin"
            })
            Orion.Print(pumpkin.length)
            if (pumpkin.length > 0) {
                var pump = pumpkin[Orion.Random(pumpkin.length)]
                WalkTo(pump)
                Orion.DragItem(pump.Serial())
                var bin = Orion.FindTypeEx(any, any, ground, '', 24).filter(function (item) {
                    return item.Name() == "Trash Pumpkins Here!"
                }).shift()
                WalkTo(bin)
                Orion.DropDraggedItem(bin.Serial())
            }
        }
    }
}