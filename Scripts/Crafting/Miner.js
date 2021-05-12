//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Detectors.js

function StartMining() {
    //Use Mark and Recall spells to move to storage and back to last location
    //Otherwise it will use Orions WalkTo functionality
    var useMagicToMove = true;

    //How far to look for trees from the player
    var vRange = 16;
    AutoMiner(useMagicToMove, vRange);
}
var usingBeetle = true;
var debug = true;
var pickAxe = '0xE86|0x0F39'
var storageBox;
var storageRune;
var lastLocationRune
var startRune;
var useMagic;
var range;
var usedRocks = [];
var beetleMobile;

function AutoMiner(magicOption, _range) {
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
    Orion.Print("Using Beetle:" + usingBeetle)
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
    startRuneFile = file.Read();
    file.Close();
    storageBox = SelectTarget(' Storage Box. Press Escape to use the previous saved value');
    if (storageBox != null) {
        if (storageBox.Serial() === Player.Serial()) {
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
        startRune = SelectTarget(' Rune to start the job. ');
        newFile.Write(startRune.Serial() + ' ');
        newFile.Close();
    }
    else {
        storageBox = Orion.FindObject(storageFile);
        storageRune = Orion.FindObject(storageRuneFile);
        startRune = Orion.FindObject(startRuneFile);
        lastLocationRune = Orion.FindObject(lastLocationRuneFile);
    }
    var rocks = [];
    var startTime = Orion.Now();
    RecallRune(startRune);

    while (!Player.Dead()) {
        if (Orion.Now() - startTime > 1200000) {
            //Start again after 20 minutes
            startTime = Orion.Now();
            RecallRune(startRune);
            usedRocks = [];
        }
        rocks = GetRocks(usedRocks);

        usedRocks = usedRocks.concat(rocks.map(function (stRock) {
            return stRock.X().toString() + stRock.Y().toString()
        }));
        Orion.Print(rocks.length)
        Orion.Wait(1000);
        while (rocks.length > 0) {
            Orion.Wait(200);

            if (rocks.length > 5) {
                rocks.shift();
                rocks.shift();
                rocks.shift();
                rocks.shift();
            }
            var rockTile = rocks.shift();

            TextWindow.Print(rockTile.X(), rockTile.Y(), rockTile.Z(), 0, Player.Z(), 1, 1);
            TextWindow.Print('Orion.WalkTo(' + rockTile.X() + ', ' + rockTile.Y() + ', ' + rockTile.Z() + ', 1, ' + 255 + ', 1, 1);');
            var outcome = (Orion.GetDistance(rockTile.X(), rockTile.Y()) < range - 4) &&
                Orion.WalkTo(rockTile.X(), rockTile.Y(), rockTile.Z(), 1, 255, 1, 1);

            if (outcome) {
                Mine(rockTile)
                Orion.RemoveFakeMapObject(rockTile.X().toString() + rockTile.Y().toString());
            }
            Orion.ClearJournal();

            rocks = rocks.sort(function (rockA, rockB) {
                return Orion.GetDistance(rockA.X(), rockA.Y()) - Orion.GetDistance(rockB.X(), rockB.Y());
            });
            Orion.Print("Changing mining location")
        }
    }
}

var walkBack;
function Mine(tile) {
    DebugText('StartChopMethod');
    walkBack = false;

    while (Orion.GetDistance(tile.X(), tile.Y()) <= 1 && (Orion.LastJournalMessage() == null ||
        (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(metal\sbefore)|(far\saway)/gi) || []).length == 0)) {
        Orion.Wait(100);
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

        if ((Player.Weight() > (Player.MaxWeight() - 40))
            || (beetleMobile != null && ((beetleMobile.Properties().match(/Weight:\s(\d*)/i) || [])[1] || 0) > 1400)
            || listHasEmptyInBackpack('Mining')) {
            TextWindow.Print('Going Home');
            if (useMagic) {
                if (Player.Weight() > Player.MaxWeight()) {
                    Orion.Cast('Bless', 'self');
                    Orion.Wait(3500);

                }
                //   if (usingBeetle) {
                //   Orion.Wait(600);
                //  WalkTo(beetleMobile, 1)
                // Orion.UseObject(beetleMobile.Serial())
                //   }
                if (storageBox == null) {
                    storageBox = Orion.FindObject(storageFile);
                }
                Orion.Wait(600);
                MarkRune(lastLocationRune);
                Orion.Wait(500);
                RecallRune(storageRune);
                Orion.Wait(500);
                TextWindow.Print('Walk To Storage');
                Orion.WalkTo(storageBox.X(), storageBox.Y(), storageBox.Z(), 1, 255, 1, 1, 5000);
                TextWindow.Print('Open Storage');
                Orion.Wait(800);

                if (Player.BankSerial() == storageBox.Serial()) {
                    Orion.Say('bank');
                }
                WalkTo(storageBox, 1)
                Orion.FindListEx('Ores').forEach(function (oreGraphic) {
                    MoveItemsFromPlayer(storageBox, oreGraphic.Graphic(), any);
                })
                if (usingBeetle) {
                    Orion.RequestContextMenu(beetleMobile.Serial());
                    Orion.WaitContextMenuCliloc(beetleMobile.Serial(), 3006145);
                    Orion.Wait(600);
                    EmptyContainerToAnother(beetleMobile, storageBox);
                    Orion.Wait(600);
                    //    Orion.UseObject(beetleMobile.Serial())
                    //    Orion.Wait(600);
                }
                Restock('Mining');
                Orion.Wait(1000);
                if (listHasEmptyInBackpack('Mining')) {
                    Orion.PauseScript();
                }

                RecallRune(lastLocationRune);
                // Orion.Wait(1000);
                //  Orion.UseObject(Player.Serial())
            }
        }

        else if (usingBeetle) {
            Orion.Wait(500);
            Orion.FindListEx('Ores').forEach(function (oreGraphic) {
                Orion.MoveItem(oreGraphic.Serial(), 0, beetleMobile.Serial());
                Orion.Wait(600);
            });
        }
        TextWindow.Print('Digging');
        var pickaxe = Orion.FindType(pickAxe);
        pickaxe.forEach(function (pa) {
            Orion.Wait(100);
            if (Orion.LastJournalMessage() == null ||
                (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(metal\sbefore)|(far\saway)/gi) || []).length == 0) {

                if (Player.Weight() <= (Player.MaxWeight() - 40) &&
                    Orion.GetDistance(tile.X(), tile.Y()) <= 1 &&
                    (Orion.LastJournalMessage() == null ||
                        (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(far\saway)/gi) || []).length == 0)) {

                    Orion.UseObject(pa);
                    TextWindow.Print(Orion.GetDistance(tile.X(), tile.Y()));


                    if (Orion.WaitForTarget(200)) {
                        //Orion.Wait(100);
                        TextWindow.Print(tile.Flags());
                        Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
                        TextWindow.Print(Orion.LastJournalMessage().Text());
                        Orion.Wait(600);
                        if (Player.Weight() > (Player.MaxWeight() - 80)) {
                            Orion.Wait(400 + Orion.GetPing());
                        }
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

function IsReachable(rock) {
    //Orion.GetTilesInRect('tileFlags', startX, startY, endX, endY);
    return Orion.GetTilesInRect('mine', rock.X() - 2, rock.Y() - 2, rock.X() + 2, rock.Y() + 2).length < 16;
}

