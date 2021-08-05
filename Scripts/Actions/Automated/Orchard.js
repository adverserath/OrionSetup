//#include Scripts/helpers/Target.js

function OrchardRun() {
    var startTime = Orion.Now()
    var apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
    var trees = Orion.FindTypeEx('0x0D01', 'any', ground, '', 40)
        .sort(function (t1, t2) {
            return parseInt(t1.Serial()) - parseInt(t2.Serial())
        })

    Orion.Print(trees.length)

    while (trees.length > 0) {
        var startTree = trees.shift()
        var startTreeLoc = coordinate(startTree.X(), startTree.Y(),0)
        Orion.Wait(1000)
        var nextTree = trees.shift()
        var nextTreeLoc = coordinate(nextTree.X(), nextTree.Y(),0)

        Orion.Print('Get Apple : ' + startTree.Serial())
        
        while(Orion.GetDistance(startTreeLoc.X(), startTreeLoc.Y())>1)
        {
        WalkTo(startTreeLoc, 1, 30000, 1)
        Orion.Wait(100)
        }
        
        while (apples.length == 0) {
            Orion.UseObject(startTree.Serial())
            Orion.Wait(400)
            apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
        }
        Orion.Print('apples:' + apples.length)

        Orion.Print('Goto throw apple: ' + nextTree.Serial())
        
        while(Orion.GetDistance(nextTreeLoc.X(), nextTreeLoc.Y())>8)
        {
        WalkTo(nextTreeLoc, 8, 30000, 1)
        Orion.Wait(100)
        }
        
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
        Orion.Wait(800)
    }
    Orion.Print('Finished in ' + ((startTime - Orion.Now()) / 1000) + ' seconds')
}