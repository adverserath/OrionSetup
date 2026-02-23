//#include helpers/Target.js

function ScavengerWalker() {
    var allLocations = [
        coordinate(2036, 1332, 0)
    ]

    locations = allLocations.slice();


    var id = 0;
    while (!Player.Dead()) {
        if (WalkTo(locations[0], 1, 2000)) {
            locations.shift()
            Orion.Print(locations.length)
            Orion.Print(allLocations.length)
            if (locations.length === 0) {
                Orion.Print('empty')
                locations = allLocations.slice();
                Orion.IgnoreReset();
                Orion.ClearFakeMapObjects();
            }
        }



        TextWindow.Clear()
        var eggs = Orion.FindListEx('Umbra', ground, '', 100)
            .filter(function (egg) {
                return !Orion.Contains(egg.Properties(), "Lifespan: 10 Seconds")
            })
            .sort(function (eggA, eggB) {
                return eggA.Distance() - eggB.Distance()
            });

        TextWindow.Print('Total: ' + eggs.length)
        eggs.forEach(function (egg) {
            TextWindow.Print('Egg: Distance:' + egg.Distance() + 'X:' + egg.X() + ' Y:' + egg.Y() + ' Z:' + egg.Z() + 'flags:' + egg.Flags())
            TextWindow.Print(Orion.ObjectExists(egg.Serial()))

        })
        Orion.Wait(50)


        eggs.forEach(function (egg) {
            Orion.AddFakeMapObject(id, '0x9F14', '0x047E', egg.X(), egg.Y(), egg.Z() + 10);
            id++;
            TextWindow.Print(egg.Properties())
            TextWindow.Print('distance: ' + egg.Distance())
            TextWindow.Print('Z: ' + egg.Z())
            WalkTo(egg);
            Orion.MoveItem(egg.Serial());
            Orion.Wait(500)
            Orion.Ignore(egg.Serial())

        })
        Orion.Wait(50)
    }
}
