//#include helpers/Helper.js

var debug = true;
var axes = '0xF47|0xF4B|0xF45|0xF43|0x13FB|0x1443|0x13B0|0xF49'
var storageBox;
function TestLumber() {
            Orion.Say('Chop Chop');
storageBox = SelectTarget();
Orion.Wait(10000);
    var range = 20;
    var pickaxe = '0xE86';
    Orion.GetTilesInRect('tree', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range)
    .sort(function (t1, t2) {
                return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
            }).
        forEach(function (treeTile) {
            Orion.WalkTo(treeTile.X(), treeTile.Y(), treeTile.Z(), 1, Player.Z(), 1, 1);
            DebugText('Walking to ' + treeTile.Graphic() + 'X:' + treeTile.X() + 'Y:' + treeTile.Y() + 'Z:' + treeTile.Z());
            Chop(treeTile.Graphic(), treeTile.X(), treeTile.Y(), Player.Z());
Orion.ClearJournal();
        });
}

function Chop(id, x, y, z) {

    while (Orion.LastJournalMessage() == null || 
    'There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage().Text()) != 0) {

        Orion.GetTilesInRect(
            'tree', Player.X() + 1, Player.Y() + 1, Player.X() - 1, Player.Y() - 1)
            .forEach(function (tile) {
                TextWindow.Print(tile.Graphic());
                //CHECK IF RIGHT HAND IS EMPTY
                //N//IS AXE IN BACKPACK
                //Y//EQUIP NEW AXE
                //N//GO GET ONE THEN EQUIP

                //CHECK WEIGHT
                //IF WEIGHT>MAX-30
                //Y//GO STORE IT

                //SELECT AXE
                var righthand = Orion.ObjAtLayer('LeftHand');
                if (righthand == null) {
                    axes.split('|').forEach(function (graphic) {
                        Orion.EquipT(graphic);
                    });
                }
                if (Player.Weight() > (Player.MaxWeight() - 50)) {
                    Orion.FindTypeEx('0x1BDD', any, backpack).forEach(function (wood) {
                        Orion.UseObject(righthand.Serial());
                        Orion.Wait(300);

                        if (Orion.WaitForTarget(1000)) {
                            Orion.TargetObject(wood.Serial());
                            Orion.Wait(1000);
                        }
					TextWindow.Print('ChoppingLogs');
                    });
                     if (Player.Weight() > (Player.MaxWeight() - 50)) {
                     TextWindow.Print('Going Home');
                Orion.WalkTo(storageBox.X(), storageBox.Y(), storageBox.Z(), 2, 1, 1, 1);
                Orion.FindTypeEx('0x1BD7', any, backpack).forEach(function (planks) {
                Orion.MoveItem(planks.Serial(), 0, storageBox.Serial());
                 Orion.Wait(800);
                    });
                    Orion.Wait(1000);
                Orion.WalkTo(x,y,z, 1, Player.Z(), 1, 1);
                     }
                }
                Orion.UseObject(righthand.Serial());
                Orion.Wait(300);

                if (Orion.WaitForTarget(1000)) {
                    TextWindow.Print(tile.Flags());
                    Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
                    Orion.Wait(2000);
                }
                //IF LOGS EXIST
                //Y//CUT THEM TO BOARDS

            });
    }
    //0x0CCD 3492 2718 6
}