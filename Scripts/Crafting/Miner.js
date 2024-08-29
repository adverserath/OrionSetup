//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Detectors.js
//#include helpers/Beetle.js
//#include helpers/Movement.js
//#include helpers/Generic.js

var pickAxe = '0xE86|0x0F39'
var beetleWeight = 1400

var twLocations = '[{"x":1450,"y":1478,"z":-28,"visited":false,"locName":"coordinate"},{"x":1440,"y":1486,"z":-28,"visited":false,"locName":"coordinate"},{"x":1445,"y":1485,"z":-28,"visited":false,"locName":"coordinate"},{"x":1452,"y":1485,"z":-28,"visited":false,"locName":"coordinate"},{"x":1459,"y":1485,"z":-28,"visited":false,"locName":"coordinate"},{"x":1470,"y":1486,"z":-28,"visited":false,"locName":"coordinate"},{"x":1462,"y":1492,"z":-28,"visited":false,"locName":"coordinate"},{"x":1469,"y":1493,"z":-28,"visited":false,"locName":"coordinate"},{"x":1475,"y":1494,"z":-28,"visited":false,"locName":"coordinate"},{"x":1474,"y":1497,"z":-28,"visited":false,"locName":"coordinate"},{"x":1466,"y":1500,"z":-28,"visited":false,"locName":"coordinate"},{"x":1461,"y":1500,"z":-27,"visited":false,"locName":"coordinate"},{"x":1463,"y":1506,"z":-28,"visited":false,"locName":"coordinate"},{"x":1458,"y":1506,"z":-28,"visited":false,"locName":"coordinate"},{"x":1453,"y":1506,"z":-27,"visited":false,"locName":"coordinate"},{"x":1452,"y":1503,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1508,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1505,"z":-28,"visited":false,"locName":"coordinate"},{"x":1437,"y":1507,"z":-28,"visited":false,"locName":"coordinate"},{"x":1436,"y":1500,"z":-28,"visited":false,"locName":"coordinate"},{"x":1439,"y":1491,"z":-28,"visited":false,"locName":"coordinate"},{"x":1436,"y":1492,"z":-28,"visited":false,"locName":"coordinate"},{"x":1425,"y":1495,"z":-28,"visited":false,"locName":"coordinate"},{"x":1420,"y":1492,"z":-28,"visited":false,"locName":"coordinate"},{"x":1415,"y":1493,"z":-28,"visited":false,"locName":"coordinate"},{"x":1427,"y":1498,"z":-28,"visited":false,"locName":"coordinate"},{"x":1418,"y":1506,"z":-28,"visited":false,"locName":"coordinate"},{"x":1413,"y":1505,"z":-28,"visited":false,"locName":"coordinate"},{"x":1415,"y":1502,"z":-28,"visited":false,"locName":"coordinate"},{"x":1421,"y":1502,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1519,"z":-28,"visited":false,"locName":"coordinate"},{"x":1434,"y":1518,"z":-28,"visited":false,"locName":"coordinate"},{"x":1430,"y":1518,"z":-28,"visited":false,"locName":"coordinate"},{"x":1430,"y":1521,"z":-28,"visited":false,"locName":"coordinate"},{"x":1455,"y":1518,"z":-28,"visited":false,"locName":"coordinate"},{"x":1458,"y":1519,"z":-28,"visited":false,"locName":"coordinate"},{"x":1456,"y":1522,"z":-28,"visited":false,"locName":"coordinate"},{"x":1451,"y":1522,"z":-28,"visited":false,"locName":"coordinate"},{"x":1443,"y":1523,"z":-28,"visited":false,"locName":"coordinate"},{"x":1438,"y":1527,"z":-28,"visited":false,"locName":"coordinate"},{"x":1434,"y":1532,"z":-28,"visited":false,"locName":"coordinate"},{"x":1430,"y":1534,"z":-28,"visited":false,"locName":"coordinate"},{"x":1434,"y":1537,"z":-28,"visited":false,"locName":"coordinate"},{"x":1445,"y":1533,"z":-28,"visited":false,"locName":"coordinate"},{"x":1451,"y":1534,"z":-28,"visited":false,"locName":"coordinate"},{"x":1449,"y":1538,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1537,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1529,"z":-28,"visited":false,"locName":"coordinate"},{"x":1444,"y":1507,"z":-28,"visited":false,"locName":"coordinate"}]'

function NiterMiner() {
    Draw8x8()
    var allies = NearbyAllies().length
    Orion.Print("Allies:" + allies)

    ReadLocations()
    if (locations == null) {
        SetLocations()
    }
    GoHomeCheck(true)

    while (true) {
        Orion.Wait(3000)
        while (!Player.Dead()) {
            CheckShovels()
            MinerChecks()
            Orion.UseType(pickAxe)
            if (Orion.WaitForTarget(1000))
                Orion.TargetTile('land');
            Orion.Wait(750)

            Orion.FindTypeEx(any, any, ground, any, 24).filter(function (item) {
                return Orion.Contains(item.Name(), 'Niter')
            }).forEach(function (niter) {

                Orion.Print(niter.Serial())
                MinerChecks()
                WalkTo(niter.Serial())
                while (Orion.ObjectExists(niter.Serial()) && niter.Distance() < 3) {
                    Orion.Print('Digging Niter')
                    MinerChecks()
                    Orion.Wait(750)
                    Orion.UseType(pickAxe)
                    if (Orion.WaitForTarget(1000))
                        Orion.TargetObject(niter.Serial());

                }
            }
            )

            MinerChecks()
            LocationLoopWaitSolo(300)
            //Orion.Wait(750)

        }
    }

}

function ReadLocations() {
    allies = NearbyAllies().length
    var locData = JSON.parse(twLocations)
    locData.forEach(function (entry) {
        Orion.Print('x: ' + entry.x + ' y:' + entry.y)
        locations.push(coordinate(entry.x, entry.y, entry.z, 'coordinate'))
        Orion.AddFakeMapObject(Orion.Random(900000), 0x051A, '0x0F00', entry.x, entry.y, Player.Z());

    })
}

function CheckTinker() {
    var tools = Orion.Count(0x1EB8)
    Orion.Print(tools)
    if (tools < 3) {
        for (i = tools; i <= 3; i++) {
            Orion.UseType('0x1EB8', '0xFFFF');
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
                    gump0.Select(Orion.CreateGumpHook(23));
                    Orion.Wait(500);
                }
            }
        }
        Orion.CloseGump('generic', any, 0x9E26D92D)
    }
}

function CheckShovels() {
    CheckTinker()
    var tools = Orion.Count(pickAxe)
    Orion.Print(tools)
    if (tools < 5) {
        for (i = tools; i <= 5; i++) {
            Orion.UseType('0x1EB8', '0xFFFF');
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
                    gump0.Select(Orion.CreateGumpHook(72));
                    Orion.Wait(500);
                }

            }
        }
        Orion.CloseGump('generic', any, 0x9E26D92D)
    }
}

function MinerChecks() {
    CheckPickaxe()
    if (Player.MaxWeight() < Player.Weight() + 40) {
        Orion.Wait(750)
        NitrateToBeetle()
        ForgeOreOnBeetle()
        IngotsToBeetle()

        GoHomeCheck()
    }

}

function GoHomeCheck(forced) {
    var nitrateBox = 0x4006968E
    var nitrateBoxX = 2832
    var nitrateBoxY = 475

    var beetleMobile = Orion.FindTypeEx(0x0317, 0x0000, ground, 'mobile', 3).shift()
    if (beetleMobile != null) {
        if (((beetleMobile.Properties().match(/Weight:\s(\d*)/i) || [])[1] || 0) > beetleWeight || forced) {
            var returnX = Player.X()
            var returnY = Player.Y()
            while (returnX == Player.X() && returnY == Player.Y()) {
                GoHome()
                Orion.Wait(2000)
            }
            Orion.WalkTo(nitrateBoxX, nitrateBoxY)
            var storage = Orion.FindObject(nitrateBox)
            WalkTo(nitrateBox)
            while (beetleMobile.Distance() > 2) {
                Orion.Wait(1000)
            }
            var beetlebag = SnoopBeetle()
            Orion.Boxhack(beetlebag);
            Orion.Wait(600);

            EmptyContainerToAnother(Orion.FindObject(beetlebag), storage);
            Orion.Wait(600);

            //GoBack
            WalkTo(Orion.FindObject(0x400208C8), 1)
            while(allies  != NearbyAllies(1).length)
                {
                    Orion.Wait(500);
                }
                WalkTo(Orion.FindObject(0x400208C8), 0)
            Orion.Wait(1500);

            GotoTwistedWeald()
            Orion.WalkTo(returnX, returnY)

        }
    }
}

function GotoTwistedWeald() {
    WalkTo(Orion.FindObject(0x4015E476), 0)

    Orion.Wait(1500)
    var twGump
    
        Orion.UseObject('0x4015E476')
        if (Orion.WaitForGump(1000)) {
            Orion.Wait(150);
            while (Orion.ObjectExists(0x4015E476)) {
            twGump = Orion.GetGump(any, 0x664E1797)
                Orion.Wait(750);
                Orion.Print(twGump.Serial())
                twGump.Select(Orion.CreateGumpHook(1111825));
                Orion.Wait(750);
            }
        }
        Orion.CloseGump('generic', any, 0x664E1797)
        Orion.Wait(3000)
    
}

function CheckTW()
{
Orion.Print(Orion.GetGump(0x000049F6, 0x664E1797).Close())
}

function CheckPickaxe() {
    var pickaxe = Orion.FindType(pickAxe);
    if (pickaxe == null) {
        Orion.PauseScript()
    }
}

function Draw8x8() {
    Orion.ClearFakeMapObjects();
    var tiles = Orion.GetTilesInRect('land', Player.X() - 100, Player.Y() - 100, Player.X() + 100, Player.Y() + 100).filter(function (tile) {
        return tile.X() % 8 == 0 || tile.Y() % 8 == 0
    }).forEach(function (loc) {
        Orion.AddFakeMapObject(Orion.Random(900000), 0x051A, '0x0000', loc.X(), loc.Y(), Player.Z());
    })
}

function IngotsToBeetle() {
    var ingotCount = Orion.Count(0x1BF2)
    Orion.Print('Ingots:' + ingotCount)
    if (ingotCount > 100) {
        var beetle = Orion.FindObject(SnoopBeetle())//Orion.FindTypeEx(0x0317, 0x0000, ground,'mobile',3).shift()
        if (beetle != null) {
            Orion.Print(beetle.Serial())
            Orion.FindTypeEx(0x1BF2, any, backpack).forEach(function (ingot) {
                Orion.MoveItem(ingot.Serial(), -1, beetle.Serial());
                Orion.Wait(1000)
            })

        }
        Orion.MoveItemType(0x1BF2, 0x0000, beetle.Serial(), 40, backpack);
    }
}
function TakeIngot() {
    Orion.MoveItemType(0x1BF2, 0x0000, beetle.Serial(), 40, beetle.Serial());
}
function NitrateToBeetle() {
    var beetle = Orion.FindTypeEx(0x0317, 0x0000, ground, 'mobile', 3).shift()
    if (beetle != null) {
        Orion.MoveItemType(0x423A, any, backpack, -1, beetle.Serial());
        Orion.Wait(750)
    }
}

function ForgeOreOnBeetle() {
    var beetle = Orion.FindTypeEx(0x00A9, 0x0489, ground, 'mobile', 3).shift()
    if (beetle != null) {
        var ores = Orion.FindTypeEx(any, any, backpack).filter(function (item) {
            return Orion.Contains(item.Name(), 'Ore') && item.Count() > 1
        })
        ores.forEach(function (ore) {
            Orion.UseObject(ore.Serial())
            if (Orion.WaitForTarget()) {
                Orion.TargetObject(beetle.Serial())
                Orion.Wait(750)
            }
        })
    }
}

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
var mineSand = true

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
        if (mineSand) {
            rocks = GetSand(usedRocks)
        }
        else {
            rocks = GetRocks(usedRocks);
        }
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
        (Orion.LastJournalMessage().Text().match(/(mine\sthat)|(no\smetal)|(cannot\sbe\sseen)|(metal\sbefore)|(far\saway)|(no\ssand)/gi) || []).length == 0)) {
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

function GetSand(oldSand) {
    var rocks = Orion.GetTilesInRect('land', Player.X() - 8, Player.Y() - 8, Player.X() + 8, Player.Y() + 8)
        .filter(function (rock) {
            return rock.Graphic() === '0x0018'
        })
        .filter(function (rock) {
            return oldSand.indexOf(rock.X().toString() + rock.Y().toString()) == -1;
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

