//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/ItemManager.js

//Cut trees within a defined range of Player.
//Once all trees are cut in the grid, the script will terminate!
//THIS IS NOT INTENDED FOR AFK USAGE
//On Start - select storage and runes to recall
//Press Escape to use values from the last run
//Go into war mode to pause the script if you need to fight anything
//All axes are detected automatically.
function StartLumberJacking() {
    //Use Mark and Recall spells to move to storage and back to last location
    //Otherwise it will use Orions WalkTo functionality
    var useMagicToMove = true;

    //How far to look for trees from the player
    var range = 20;
    AutoLumberJack(useMagicToMove, range);
}

var usingBeetle = true;
var debug = true;
var axes = '0xF47|0xF4B|0xF45|0xF43|0x13FB|0x1443|0x13B0|0xF49'
var storageBox;
var storageRune;
var lastLocationRune;
var useMagic;
var range;
var usedTrees = [];
var beetleMobile;

function AutoLumberJack(magicOption, _range) {
range=_range;
    if (usingBeetle) {
        Orion.UseObject(Player.Serial());
        Orion.Wait(200);
        var beetles = Orion.FindTypeEx('0x0317', any, ground, 'mobile', 4).filter(function (beetle) {
            Orion.RequestContextMenu(beetle.Serial());
            return Orion.WaitForContextMenu(500);
        });
        if (beetles.length > 0) {
            beetleMobile = beetles.shift();
            Orion.Print(beetleMobile.Serial())
            Orion.Print(((beetleMobile.Properties().match(/Weight:\s(\d*)/i) || [])[1] || 0));
        }
        else {
            usingBeetle = false;
        }
    }

    useMagic = magicOption;
    Orion.Say('Chop Chop');
    Orion.Print("Go into war mode to stop the script at any point");
    var file = Orion.NewFile();

    file.Open('lumberjack.conf');
    storageFile = file.Read();
    storageRuneFile = file.Read();
    lastLocationRuneFile = file.Read();
    file.Close();
    storageBox = SelectTarget(' Storage Box. Press Escape to use the previous saved value');
    if (storageBox != null) {
        Orion.Wait(200);
        var newFile = Orion.NewFile();
        newFile.Open('lumberjack.conf');

        newFile.Write(storageBox.Serial() + ' ');
        storageRune = SelectTarget(' Storage location Rune.');
        newFile.Write(storageRune.Serial() + ' ');
        lastLocationRune = SelectTarget(' Rune to continue the job. ');
        newFile.Write(lastLocationRune.Serial() + ' ');
        newFile.Close();
    }
    else {
        storageBox = Orion.FindObject(storageFile);
        storageRune = Orion.FindObject(storageRuneFile);
        lastLocationRune = Orion.FindObject(lastLocationRuneFile);
    }
    var trees = [];

    while (!Player.Dead()) {
    Orion.Print("Starting Loop")
        Orion.Wait(1000);
        EquipAxe();
        trees = GetTrees();
    Orion.Print("Trees" + trees.length)

        usedTrees = usedTrees.concat(trees.map(function (stTree) {
            return stTree.X().toString() + stTree.Y().toString()
        }));

        while (trees.length > 0) {
            var treeTile = trees.shift();
            TextWindow.Print(treeTile.X(), treeTile.Y(), treeTile.Z(), 0, Player.Z(), 1, 1);
            TextWindow.Print('Orion.WalkTo(' + treeTile.X() + ', ' + treeTile.Y() + ', ' + treeTile.Z() + ', 1, ' + 255 + ', 1, 1);');
            var outcome = (Orion.GetDistance(treeTile.X(), treeTile.Y()) < range - 4) &&
                Orion.WalkTo(treeTile.X(), treeTile.Y(), treeTile.Z(), 1, 255, 1, 1);
    Orion.Print("Walked" + outcome)

            if (outcome) {
                Chop(treeTile)
                Orion.RemoveFakeMapObject(treeTile.X().toString() + treeTile.Y().toString());
            }
            Orion.ClearJournal();

            trees.sort(function (treeA, treeB) {
                return Orion.GetDistance(treeA.X(), treeA.Y()) - Orion.GetDistance(treeB.X(), treeB.Y());
            });
            Orion.Print("Changing mining location")
        }
    }
}

var walkBack;
function Chop(tile) {
    DebugText('StartChopMethod');
    walkBack = false;

    while (Orion.LastJournalMessage() == null ||
        'There\'s not enough wood here to harvest.'.localeCompare(Orion.LastJournalMessage().Text()) != 0) {
        if (Player.WarMode()) {
            Orion.Print('In War Mode');
        }
        while (Player.WarMode()) {
            Orion.Wait(2000);
        }
        if (walkBack) {
            Orion.WalkTo(tile.X(), tile.Y(), tile.Z(), 1, 255, 1, 1);
            walkBack = false;
        }

        if (Player.Weight() > (Player.MaxWeight() - 50
        || (((beetleMobile.Properties().match(/Weight:\s(\d*)/i) || [])[1] || 0) > 1400)
        )) {
                TextWindow.Print('Going Home');
                if (useMagic) {
                    Orion.Wait(500);
                    MarkRune(lastLocationRune);
                    Orion.Wait(3000);
                    RecallRune(storageRune);
                    Orion.Wait(1500);
                    Orion.FindTypeEx('0x1BD7|0x318F|0x2F5F|0x3191').forEach(function (woodStuff) {
                        Orion.Print(woodStuff.Name())
                        MoveItemsFromPlayer(storageBox, woodStuff.Graphic());
                    })
                    Orion.Wait(1500);
                    RecallRune(lastLocationRune);
                }
                else {
                    MoveItems(storageBox, '0x1BD7');
                    Orion.Wait(1000);
                    Orion.WalkTo(tile.X(), tile.Y(), Player.Z(), 1, Player.Z(), 1, 1);
                }

            }
        
        else if (Player.Weight() > (Player.MaxWeight() - 50))
        {
            Orion.FindTypeEx('0x1BDD', any, backpack)
            .forEach(function (wood) {
                Orion.UseObject(righthand.Serial());

                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(wood.Serial());
                    Orion.Wait(700);
                }
                TextWindow.Print('ChoppingLogs');
            });
            if(usingBeetle){
                Orion.Wait(500);
                Orion.FindTypeEx('0x1BD7').forEach(function (board) {
                    Orion.MoveItem(board.Serial(), 0, beetleMobile.Serial());
                    Orion.Wait(600);
                });
            }
        }
        EquipAxe();
Orion.Wait(3000)
        Orion.UseObject(righthand.Serial());

        if (Orion.WaitForTarget(1000)) {
            TextWindow.Print(tile.Flags());
            Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
            Orion.Wait(600);
        }
    }
}

function EquipAxe() {
    Orion.Unequip('LeftHand');
    Orion.Unequip('RightHand');
    Orion.Wait(1000);
    var axe = Orion.FindTypeEx(axes, any, backpack).shift();
    if (axe == null) {
        Orion.Print("Cannot find an axe")
    }
    else {
        while(Orion.ObjAtLayer('LeftHand')==null)
        {
            Orion.Print(axe.Name())
            Orion.Equip(axe.Serial());
            Orion.Wait(1000);
        }
    }
}

function GetTrees(_private) {
Orion.Print('Range '+range);
    var trees = Orion.GetTilesInRect('tree', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range)
        .filter(function (tree) {
            return (Player.Z() + 15) > tree.Z() || IsReachable(tree)
        })
        .filter(function (tree) {
            return usedTrees.indexOf(tree.X().toString() + tree.Y().toString()) == -1;
        })
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });
    Orion.ClearFakeMapObjects();
    trees.forEach(function (tree) {
        Orion.AddFakeMapObject(tree.X().toString() + tree.Y().toString(), '0x1BDD', '', tree.X(), tree.Y(), tree.Z());
    });
    return trees;
}