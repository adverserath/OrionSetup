//#include Scripts/helpers/Target.js

function ScavengerWalker() {
    var allLocations = [
        coordinate(3504, 2834, 0),
        coordinate(3576, 2868, 0),
        coordinate(3678, 2884, 0),
        coordinate(3725, 2766, 0),
        coordinate(3753, 2565, 0),
        coordinate(3686, 2414, 0),
        coordinate(3488, 2406, 0),
        coordinate(3358, 2678, 0),
        coordinate(3460, 2810, 0),
        coordinate(3494, 2746, 0),
        coordinate(3450, 2602, 0),
        coordinate(3596, 2576, 0),
        coordinate(3645, 2518, 0),
        coordinate(3687, 2725, 0),
        coordinate(3540, 2757, 0)
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
        var eggs = Orion.FindListEx('Eggs', ground, '', 100)
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
            Orion.Wait(500)
            Orion.Ignore(egg.Serial())

        })
        Orion.Wait(50)
    }
}
