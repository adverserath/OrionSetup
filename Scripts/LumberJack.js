//#include helpers/Helper.js

var debug = true;
function TestLumber() {
 
    var range = 20;
    var pickaxe = '0xE86';
 var axes = '0xF47|0xF4B|0xF45|0xF43|0x13FB|0x1443|0x13B0|0xF49'
    Orion.GetTilesInRect('tree', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range).
        forEach(function (treeTile) {
            Orion.WalkTo(treeTile.X(), treeTile.Y(), treeTile.Z(), 1, Player.Z(), 1, 1);
            DebugText('Walking to ' + treeTile.Graphic() + 'X:' + treeTile.X() + 'Y:' + treeTile.Y() + 'Z:' + treeTile.Z());
            Chop(treeTile.Graphic(), treeTile.X(), treeTile.Y().treeTile, Player.Z());
        });
}

function Chop(id, x, y, z) {
    while ('There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage().Text()) != 0) {
        TextWindow.Print('There\'s not enough wood here to harvest.')

        TextWindow.Print(Orion.LastJournalMessage().Text())

        TextWindow.Print('There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage()))
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
                Orion.UseObject('0x462D1383');
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