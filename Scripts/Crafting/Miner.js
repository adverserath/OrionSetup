//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

function StartMining() {
    //Use Mark and Recall spells to move to storage and back to last location
    //Otherwise it will use Orions WalkTo functionality
    var useMagicToMove = true;

    //How far to look for trees from the player
    var vRange = 16;
    AutoMiner(useMagicToMove, vRange);
}
var debug = true;
var pickAxe = '0xE86|0x0F39'
var storageBox;
var storageRune;
var lastLocationRune;
var useMagic;
var range;
var usedRocks = [];
function AutoMiner(magicOption, _range) {
    range = _range;
    useMagic = magicOption;
    DebugStart();
    Orion.Say('Dig Dig');
    Orion.Print("Go into war mode to stop the script at any point");
    var file = Orion.NewFile();

    file.Open('miner.conf');
    storageFile = file.Read();
    storageRuneFile = file.Read();
    lastLocationRuneFile = file.Read();
    file.Close();
    storageBox = SelectTarget(' Storage Box. Press Escape to use the previous saved value');
    if (storageBox != null) {
        if(storageBox.Serial()===Player.Serial())
    {
    storageBox = Orion.FindObject(Player.BankSerial());
    }
        Orion.Wait(200);
        var newFile = Orion.NewFile();
        newFile.Open('miner.conf');

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
    var rocks = [];
    while (!Player.Dead()) {
        Orion.Wait(1000);
        rocks = GetRocks(usedRocks);
        usedRocks = usedRocks.concat(rocks.map(function (stRock) {
            return stRock.X().toString() + stRock.Y().toString()
        }));
        while (rocks.length > 0) {
            var rockTile = rocks.shift();
            TextWindow.Print(rockTile.X(), rockTile.Y(), rockTile.Z(), 0, Player.Z(), 1, 1);
            TextWindow.Print('Orion.WalkTo(' + rockTile.X() + ', ' + rockTile.Y() + ', ' + rockTile.Z() + ', 1, ' + 255 + ', 1, 1);');
            var outcome = (Orion.GetDistance(rockTile.X(),rockTile.Y())<range-4)&&
            Orion.WalkTo(rockTile.X(), rockTile.Y(), rockTile.Z(), 1, 255, 1, 1);

            if (outcome) {
                Mine(rockTile)
                Orion.RemoveFakeMapObject(rockTile.X().toString() + rockTile .Y().toString());
            }
            Orion.ClearJournal();

            rocks = rocks.sort(function (rockA, rockB) {
                return Orion.GetDistance(rockA.X(), rockA.Y()) - Orion.GetDistance(rockB.X(), rockB.Y());
            });
        }


    }
}

var walkBack;
function Mine(tile) {
    DebugText('StartChopMethod');
    walkBack = false;
    //	else if ((itemProp.match(/Luck\s((9|10)(\d))/gi) || []).length >= 1) {
    while (Orion.LastJournalMessage() == null ||
        (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(metal\sbefore)|(far\saway)/gi) || []).length == 0) {
        if (Orion.LastJournalMessage() != null) {
            TextWindow.Print(Orion.LastJournalMessage().Text());

        }
        if(Player.Followers()<2)
        {
       // Orion.Cast('Earth Elemental');
        }
        if (Player.WarMode()) {
            Orion.Print('In War Mode');
            walkBack = true;
        }
        while (Player.WarMode()) {
            Orion.Wait(2000);

        }
        if (walkBack) {
            Orion.WalkTo(tile.X(), tile.Y(), tile.Z(), 1, 255, 1, 1);
            walkBack = false;
        }
        if (Player.Weight() > (Player.MaxWeight() - 40) || listHasEmptyInBackpack('Mining')) {
            TextWindow.Print('Going Home');
            if (useMagic) {
            if (Player.Weight() > Player.MaxWeight() ){
            Orion.Cast('Bless','self');
                            Orion.Wait(3500);

            } 
                Orion.Wait(500);
                MarkRune(lastLocationRune);
                Orion.Wait(3000);
                RecallRune(storageRune);
                Orion.Wait(1500);
                Orion.FindListEx('Ores').forEach(function (oreGraphic) {
                    if(Player.BankSerial()==storageBox.Serial())
                    {
                    Orion.Say('bank');
                    }
                    MoveItemsFromPlayer(storageBox, oreGraphic.Graphic());
                })
                Restock('Mining');
                Orion.Wait(1500);
                if (listHasEmptyInBackpack('Mining')) {
                    Orion.PauseScript();
                }
                RecallRune(lastLocationRune);
            }
            else {
                MoveItems(storageBox, oreGraphic.Graphic());
                Orion.Wait(1000);
                Orion.WalkTo(tile.X(), tile.Y(), Player.Z(), 0, 0, 1, 1, 3000);
            }

        }

        var pickaxe = Orion.FindType(pickAxe);
        pickaxe.forEach(function (pa) {
            if (Player.Weight() <= (Player.MaxWeight() - 40) &&
                Orion.GetDistance(tile.X(), tile.Y()) <= 1 &&
                (Orion.LastJournalMessage() == null ||
                    (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(far\saway)/gi) || []).length == 0)) {
                if (Orion.LastJournalMessage() != null) {
                    TextWindow.Print(Orion.LastJournalMessage().Text());

                }
                Orion.UseObject(pa);
                TextWindow.Print(Orion.GetDistance(tile.X(), tile.Y()));


                if (Orion.WaitForTarget(1000)) {
                    //Orion.Wait(100);
                    TextWindow.Print(tile.Flags());
                    Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
                    TextWindow.Print(Orion.LastJournalMessage().Text());
                    Orion.Wait(400);
                    if (Player.Weight() > (Player.MaxWeight() - 80)){
                    Orion.Wait(400+Orion.GetPing());
                    }
                }
            }
        });


    }
}

function GetRocks(oldRocks) {
    var rocks = Orion.GetTilesInRect('crag|cave', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range)
        .filter(function (rock) {
            return (Player.Z() + 15) > rock.Z() || IsReachable(rock)
        })
        .filter(function (rock) {
            return oldRocks.indexOf(rock.X().toString() + rock.Y().toString()) == -1;
        })
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });
    Orion.ClearFakeMapObjects();
    rocks.forEach(function (rock) {
        Orion.AddFakeMapObject(rock.X().toString() + rock.Y().toString(), '0x1BF7', '', rock.X(), rock.Y(), rock.Z());
    });
    return rocks;
}
function printJournal() {
    while (!Player.Dead()) {
        Orion.Wait(100);
        if (Orion.LastJournalMessage() != null) {
            TextWindow.Print(Orion.LastJournalMessage().Text());

        }
    }
}

function Smelt1By1() {
    while (!Player.Dead()) {
        Orion.Wait(500);
        Orion.FindTypeEx('0x19B9', any, ground).forEach(function (ore) {
            while (ore.Count() != 0) {
                Orion.MoveItem(ore.Serial(), 1);
                Orion.Wait(600);

                Orion.FindType('0x19B9').forEach(function (bore) {
                    Orion.UseObject(bore);
                    if (Orion.WaitForTarget(1000)) {
                        Orion.TargetObject('0x451CFB1C');
                        Orion.Wait(300);
                    }
                });
            }

        });
    }
}

function IsReachable(rock)
{
//Orion.GetTilesInRect('tileFlags', startX, startY, endX, endY);
return Orion.GetTilesInRect('mine',rock.X()-2,rock.Y()-2,rock.X()+2,rock.Y()+2).length<16;
}