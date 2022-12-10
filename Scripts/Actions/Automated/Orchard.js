//#include helpers/Target.js
function OrchardRunNewFaster() {
    Orion.Resend()
    TextWindow.Clear()

    var startX = Player.X()
    var startY = Player.Y()
    var startTime = Orion.Now()

    var apples = Orion.FindTypeEx('0x09D0', 'any', backpack)

    var trees = Orion.FindTypeEx('0x0D01', 'any', ground, '', 40)
        .sort(function (t1, t2) {
            return parseInt(t1.Serial()) - parseInt(t2.Serial())
        }).map(function (t) { return Tree(t) })

    Orion.Print('total trees ' + trees.length)


    var index = 0
    while (trees.length > 0) {
        var source
        var target
        var closest = 60
        var closestTreeIndex
        trees.forEach(function (tree) {
            
            TextWindow.Print(trees.indexOf(tree)+ ' '+tree.Serial())
            if (tree.DistanceTo(Player.X(), Player.Y()) < closest) {
                closest = tree.DistanceTo(Player.X(), Player.Y())
                closestTreeIndex = trees.indexOf(tree)
                Orion.Print('Closest index ' + closestTreeIndex)
            }
        })
        if (closestTreeIndex % 2 == 0) {
            source = trees[closestTreeIndex];
            target = trees[closestTreeIndex + 1]

            TextWindow.Print('Picking index ' + closestTreeIndex + ' ' + source.Serial())
            TextWindow.Print('Throw index ' + (closestTreeIndex + 1) + ' ' + target.Serial())
            trees.splice(closestTreeIndex, 2);

        }
        else {
            source = trees[closestTreeIndex];
            target = trees[closestTreeIndex - 1]
            TextWindow.Print('Picking index ' + closestTreeIndex + ' ' + source.Serial())
            TextWindow.Print('Throw index ' + (closestTreeIndex - 1) + ' ' + target.Serial())

            trees.splice(closestTreeIndex - 1, 2);
        }

        WalkTo(source)
        Orion.UseObject(source.Serial())
        var nextAction = Orion.Now() + 750
        WalkTo(target, 8)
        if (Orion.Now() < nextAction)
            Orion.Wait(750)
        apples = Orion.FindTypeEx('0x09D0', 'any', backpack)

        while (apples.length != 0 && apples[0].Exists()) {
            Orion.Print('throwing apple')
            if (!Orion.HaveTarget()) {
                Orion.UseObject(apples[0].Serial())
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(target.Serial())
                }
            }
        }
    }

    Orion.Print('Finished in ' + ((Orion.Now() - startTime) / 1000) + ' seconds')
}

function OrchardRunFaster() {
    TextWindow.Clear()

    var startX = Player.X()
    var startY = Player.X()
    var startTime = Orion.Now()
    var apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
    var trees = Orion.FindTypeEx('0x0D01', 'any', ground, '', 40)
        .sort(function (t1, t2) {
            return parseInt(t1.Serial()) - parseInt(t2.Serial())
        })
    Orion.Print('total trees ' + trees.length)

    while (trees.length > 0) {
        var treesSerials = trees.map(function (t) { return t.Serial() })
        TextWindow.Open()
        i = 0
        trees.forEach(function (t) {
            TextWindow.Print(i++ + ' ' + t.Serial())
        })
        Orion.WalkTo(startX, startY)

        var nearest = trees.slice().sort(function (placeA, placeB) {
            return placeA.Distance() - placeB.Distance()
        }).shift().Serial()

        var index = treesSerials.indexOf(nearest)

        var tree1
        var tree2
        var startTree
        var nextTree
        Orion.Print('total ')
        TextWindow.Print('index ' + index)

        if (index % 2 == 0) {
            var next = index + 1
            tree1 = trees[index]
            tree2 = trees[next]
            TextWindow.Print(index + ' to ' + next)

            TextWindow.Print(tree1.Serial() + ' to ' + tree2.Serial())
            trees.splice(index, 2)
        }
        else {
            var next = index - 1

            tree1 = trees[index]
            tree2 = trees[next]
            TextWindow.Print(index + ' to ' + next)

            TextWindow.Print(tree1.Serial() + ' to ' + tree2.Serial())
            trees.splice(next, 2)
        }
        TextWindow.Open()

        i = 0
        trees.forEach(function (t) {
            TextWindow.Print(i++ + ' ' + t.Serial())
        })

        if (tree1.Distance() < tree2.Distance()) {
            startTree = tree1
            nextTree = tree2
        }
        else {
            startTree = tree2
            nextTree = tree1
        }

        var startTreeLoc = coordinate(startTree.X(), startTree.Y(), 0)
        var nextTreeLoc = coordinate(nextTree.X(), nextTree.Y(), 0)

        Orion.Print('Get Apple : ' + startTree.Serial())

        while (Orion.GetDistance(startTreeLoc.X(), startTreeLoc.Y()) > 1) {
            Orion.Print('Walk to apple tree')
            WalkTo(startTreeLoc, 1, 30000, 1)
            Orion.Wait(100)
        }

        while (apples.length == 0) {
            Orion.Print('Pick apple')
            Orion.UseObject(startTree.Serial())
            var picktime = Orion.Now()
            while (Orion.FindTypeEx('0x09D0', 'any', backpack).length == 0) {
                Orion.Wait(100)
            }
            apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
        }
        Orion.Print('Goto throw apple: ' + nextTree.Serial())

        while (Orion.GetDistance(nextTreeLoc.X(), nextTreeLoc.Y()) > 8) {
            Orion.Print('Walk to Target X:' + nextTreeLoc.X() + ' Y:' + nextTreeLoc.Y())
            WalkTo(nextTreeLoc, 8, 30000, 1)
            Orion.Wait(200)
        }
        var appleToThrow = apples[0]
        if (picktime + 750 > Orion.Now()) {
            Orion.Wait(Orion.Now() - picktime)
        }

        while (apples.length != 0 && apples[0].Exists()) {
            Orion.Print('throwing apple')
            if (!Orion.HaveTarget()) {
                Orion.UseObject(apples[0].Serial())
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(nextTree.Serial())
                }
            }
        }
        Orion.CancelTarget()
        apples = []
        Orion.Wait(500)
    }
    Orion.Print('Finished in ' + ((Orion.Now() - startTime) / 1000) + ' seconds')
}

function Tree(treeobj) {
    return {
        x: treeobj.X(),
        y: treeobj.Y(),
        serial: treeobj.Serial(),
        X: function () {

            return this.x;
        },
        Y: function () {

            return this.y;
        },
        Serial: function () {

            return this.serial;
        },
        DistanceTo: function (tx, ty) {

            var dx = Math.abs(tx - this.X());
            var dy = Math.abs(ty - this.Y());
            var min = Math.min(dx, dy);
            var max = Math.max(dx, dy);

            var diagonalSteps = min;
            var straightSteps = max - min;
            var ret = Math.sqrt(2) * diagonalSteps + straightSteps
            return ret;
        }
    }
}

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
        var startTreeLoc = coordinate(startTree.X(), startTree.Y(), 0)
        Orion.Print(startTree.X() + ' : ' + startTree.Y())
        // Orion.Wait(1000)
        var nextTree = trees.shift()
        var nextTreeLoc = coordinate(nextTree.X(), nextTree.Y(), 0)

        Orion.Print('Get Apple : ' + startTree.Serial())

        while (Orion.GetDistance(startTreeLoc.X(), startTreeLoc.Y()) > 1) {
            WalkTo(startTreeLoc, 1, 30000, 1)
            Orion.Wait(100)
        }

        while (apples.length == 0) {
            Orion.UseObject(startTree.Serial())
            while (Orion.FindTypeEx('0x09D0', 'any', backpack).length == 0) {
                Orion.Wait(100)
            }
            apples = Orion.FindTypeEx('0x09D0', 'any', backpack)
        }
        Orion.Print('apples:' + apples.length)

        Orion.Print('Goto throw apple: ' + nextTree.Serial())

        while (Orion.GetDistance(nextTreeLoc.X(), nextTreeLoc.Y()) > 8) {
            WalkTo(nextTreeLoc, 8, 30000, 1)
        }
        var appleToThrow = apples[0]
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
        Orion.Wait(200)
    }
    Orion.Print('Finished in ' + ((startTime - Orion.Now()) / 1000) + ' seconds')
}