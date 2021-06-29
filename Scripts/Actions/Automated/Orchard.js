//#include Scripts/helpers/Target.js

function OrchardRun() {
    var startTime = Orion.Now()
    var apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
    var trees = Orion.FindTypeEx('0x0D01', 'any', ground, '', 40)
        .sort(function (t1, t2) {
            return parseInt(t1.Serial()) - parseInt(t2.Serial())
        })

    if (trees.length > 16) {
        trees.slice(0, trees.length - 16).forEach(function (oldTree) {
            Orion.Forget(oldTree.Serial());

        })
        trees = Orion.FindTypeEx('0x0D01', 'any', ground, '', 40)
            .sort(function (t1, t2) {
                return parseInt(t1.Serial()) - parseInt(t2.Serial())
            })
    }

    Orion.Print(trees.length)

    while (trees.length > 0) {
        var startTree = trees.shift()
        Orion.Wait(100)
        var nextTree = trees.shift()

        Orion.Print('Get Apple : ' + startTree.Serial())
        WalkTo(startTree, 1, 30000, 1)
        while (apples.length == 0) {
            Orion.UseObject(startTree.Serial())
            Orion.Wait(200)
            apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
        }
        Orion.Print('apples:' + apples.length)

        Orion.Print('Goto throw apple: ' + nextTree.Serial())
        WalkTo(nextTree, 10, 30000, 1)
        Orion.UseObject(apples[0].Serial())
        Orion.Wait(200)
        while (apples.length != 0 && apples[0].Exists()) {
            Orion.Print('apples:' + apples.length)
            if (!Orion.HaveTarget()) {
                Orion.UseObject(apples[0].Serial())
            }
            Orion.Wait(200)
            Orion.TargetObject(nextTree.Serial())
        }
        Orion.CancelTarget()
        apples = []
    }
    Orion.Print('Finished in ' + ((startTime - Orion.Now()) / 1000) + ' seconds')
}