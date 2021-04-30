//#include helpers/Target.js

function OrchardRun() {
    var trees = Orion.FindTypeEx('0x0D01', 'any', ground,'' ,40)
        trees.forEach(function (tree){
        TextWindow.Print(tree.Serial())
        Orion.Forget(tree.Serial())
        Orion.GetStatus(tree.Serial());
        })
        Orion.Resend();
        
Orion.ResetIgnoreList();


            var trees = Orion.FindTypeEx('0x0D01', 'any', ground,'' ,40)
 //       .filter(function (tree) {
  //          return tree.Properties().indexOf('Crypress Tree')!=-1
 //       })
        .sort(function (t1, t2) {
            return parseInt(t1.Serial()) < parseInt(t2.Serial())
        })

                Orion.Print(trees.length)

        Orion.Wait(2000)
    while (trees.length > 0) {
        var startTree = trees.shift()
        Orion.Wait(100)
        var nextTree = trees.shift()
        
        Orion.Print('Get Apple : ' + startTree.Serial())
        WalkTo(startTree,1,30000,0)
        Orion.UseObject(startTree.Serial())
Orion.Wait(750)
        var apple = Orion.FindTypeEx('0x09D0', 'any', backpack).shift()
Orion.Print('Goto throw apple: '+nextTree.Serial())
        WalkTo(nextTree, 4,30000,0)
        Orion.UseObject(apple.Serial())
        Orion.WaitForTarget(2000)
        Orion.TargetObject(nextTree.Serial)
        Orion.Wait(750)
    }

}