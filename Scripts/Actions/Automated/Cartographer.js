
// (startX, startY, startZ, endX, endY, endZ, distanceXY, distanceZ);
var portalLocation = [
    coordinate(1434, 1699, 2, 'britain mint'),
    coordinate(2724, 2192, 0, 'bucs mint'),
    coordinate(2238, 1195, 0, 'cove mint'),
    coordinate(5274, 3991, 37, 'delucia mint'),
    coordinate(3500, 2571, 14, 'haven mint'),
    coordinate(1417, 3821, 0, 'jhelom mint'),
    coordinate(3792, 2232, 20, 'magincia mint'),
    coordinate(2498, 561, 0, 'minoc mint'),
    coordinate(4471, 1177, 0, 'moonglow mint'),
    coordinate(3770, 1308, 0, 'nujelm mint'),
    coordinate(5675, 3144, 12, 'papua mint'),
    coordinate(2895, 3479, 15, 'serpent mint'),
    coordinate(596, 2138, 0, 'skara mint'),
    coordinate(1823, 2821, 0, 'trinsic mint'),
    coordinate(2899, 676, 0, 'vesper mint'),
    coordinate(5345, 93, 15, 'wind mint'),
    coordinate(1336, 1997, 5, 'britain moongate'),
    coordinate(3763, 2771, 50, 'haven moongate'),
    coordinate(1495, 3773, 0, 'jhelom moongate'),
    coordinate(3563, 2139, 34, 'magincia moongate'),
    coordinate(2701, 692, 5, 'minoc moongate'),
    coordinate(4467, 1283, 5, 'moonglow moongate'),
    coordinate(643, 2067, 5, 'skara moongate'),
    coordinate(1828, 2948, -20, 'trinsic moongate'),
    coordinate(2701, 692, 5, 'vesper moongate'),
    coordinate(771, 752, 5, 'yew moongate'),
    coordinate(2498, 921, 0, 'dungeon covetous'),
    coordinate(4111, 434, 5, 'dungeon deceit'),
    coordinate(1301, 1080, 0, 'dungeon despise'),
    coordinate(1176, 2640, 2, 'dungeon destard'),
    coordinate(1999, 81, 4, 'dungeon ice'),
    coordinate(2923, 3409, 8, 'dungeon fire'),
    coordinate(4721, 3824, 0, 'dungeon hythloth'),
    coordinate(1017, 1429, 0, 'dungeon orc'),
    coordinate(511, 1565, 0, 'dungeon shame'),
    coordinate(2043, 238, 10, 'dungeon wrong'),
    coordinate(1361, 895, 0, 'dungeon wind'),
    coordinate(3786, 1095, 18, 'dungeon prism'),
    coordinate(761, 1644, 0, 'dungeon sanctuary'),
    coordinate(5624, 3040, 13, 'dungeon palace'),
    coordinate(580, 1655, 0, 'dungeon grove'),
    coordinate(1717, 2991, 0, 'dungeon caves'),
    coordinate(1482, 1474, 0, 'dungeon blackthorn')
    //coordinate(4195,3263,5,'dungeon underworld')//locked land
]

var _rareBox = 'TMap Rares'
var _craftingBox = 'Crafting Material'
var _essenceBox = 'Crafting Resource'
var _recipeBox = 'Craft Recipes'
var _talismanBox = 'Talismans'
var _regBoxId = 'Scrolls and Reags'
var _bin = 'A Trash Barrel'
var _transcendenceBook = 'Transcendence Book'

var mount = null;
var home = '0x40144BF0' //Runebook or Rune of Home
var bankGold = true
var bankRune = '0x40145441' //Runebook or Rune of Bank
var usingPet = true;
var incompleteBox = ''

var useRuneBooks = true

function MonitorAndDoStashBox() {
    TextWindow.Open()
    var chest = Orion.FindTypeEx('0x0E3D', any, ground, 'item', 20).filter(function (box) {
        return Orion.Contains(box.Properties(), "T-Map Trammel Stash")
    })[0]
    while (true) {
        Debug(' Starting New Map')
        Orion.ClientOptionSet('BlockWalkingOnMultiStairsInWarMode', 0)
        Orion.WarMode(0)
        WalkTo(chest)
        Orion.Wait(500)
        Debug(' Get Map')
        Orion.OpenContainer(chest.Serial())
        Debug(' Open Container')
        Orion.Wait(600)
        var maps = Orion.FindTypeEx('0x14EC', any, chest.Serial()).filter(function (map) {
            return Orion.Contains(map.Properties(), "Trammel") && Orion.Contains(map.Properties(), "Stash")
        })
        Debug(' List Maps')
        if (maps.length > 0) {
            Orion.Print('Found ' + maps.length + ' maps')
            var currentMap = maps[0]
            Orion.Wait(800)
            Orion.MoveItem(currentMap.Serial())
            Debug(' Move Map')
            Orion.Wait(800)
            DoAllMapsInBag([currentMap])
        }
        else {
            Orion.Print('No Maps, Waiting for new map')
            Orion.Wait(60000)
        }
    }
}

function DoSpecificMap() {
    var maps = []
    maps.push(SelectTarget())
    DoAllMapsInBag(maps)
}

function DoAllMaps() {
    DoAllMapsInBag()
}

function DoAllMapsInBag(inMaps) {
    Debug(' DoAllMapsInBag')

    if (usingPet && mount == null) {
        mount = getMyBeetle()
        Debug(' Got Beetle')

        if (mount == null) {
            Mount(false)
            Orion.Print('Select Pet')
            mount = SelectTarget()
        }
        Orion.Print('Mount =' + mount.Name())
        Mount(true)
    }
    ResetContainerView()
    var maps;
    //Find all in bag when not single
    Orion.Print('Get Maps')
    maps = GetMaps(inMaps)

    //Complete Map
    maps.forEach(function (map) {

        //Open Maps
        Orion.Print('Open Map')
        while (!Orion.GumpExists('map')) {
            Orion.UseObject(map.Serial())
            Orion.Wait(1000)
        }

        //Mount Pet
        Mount(true)

        Heal()

        Orion.ClientOptionSet('BlockWalkingOnMultiStairsInWarMode', 1)
        Orion.WarMode(1)
        Orion.Wait(800)
        if (!GoToClosestPortal() &&
            Orion.GetDistance(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y()) > 5) {
            Orion.Print('No Portal Found')
            RecallRune(home)
            Orion.Wait(1000)
            Orion.MoveItem(map.Serial(), 1, incompleteBox)
            Orion.Wait(1000)
        }
        else {
            if (!usingPet) {
                //use daemon to fight
                var followers = Player.Followers()
                //SummonDaemon
                while (Player.Followers() == followers && followers < 2) {
                    Orion.Cast('Summon Daemon')
                    Orion.Wait(5000)
                }
                var daemonId = Orion.FindType('0x000A', '0x0000', ground, 10)
                Orion.Wait(100)
                Orion.Say('All guard')

            }
            if (usingPet) {
                Mount(false)
                //Getting pet to guard
                Orion.Print('Set Pet to guard')
                while (!Orion.Contains(mount.Properties(), "Guarding")) {
                    Orion.Wait(100)
                    Orion.Say('All guard')
                }
            }

            Orion.Print('Heal Checks')
            Heal()
            //Dig Chest
            Orion.Print('Dig Chest Up')

            Orion.RequestContextMenu(map.Serial());
            Orion.WaitContextMenuID(map.Serial(), 1);
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetTile('any', Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y(), 0);
                Orion.Wait(27000)
                var monsters = Orion.FindTypeEx(any, any, ground,
                    'nothumanmobile|live|ignoreself|ignorefriends', 8, 'gray|criminal|red')
                var safePath = Orion.GetPathArray(safeSpot.X(), safeSpot.Y())
                if (safePath.length > 11) {
                    WalkTo(safePath[10])
                }
                else {
                    WalkTo(safeSpot)
                }
                Orion.Print('Hide')
                //                Orion.UseSkill('Hiding')

                while (!Player.Hidden()) {
                    Orion.CastTarget('Invisibility', self)
                    Orion.Wait(2000)
                }

                Orion.Wait(1000)

                Orion.Print('Fight Monsters')
                monsters.forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    Orion.Wait(50)
                })
                Orion.WarMode(0);

                Orion.Wait(10000)
            }
            Orion.WarMode(0);
            Orion.Wait(1000)

            Orion.Print('Fight More Monsters')
            while (Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 5, 'gray|criminal|orange|red')
                .filter(function (mob) {
                    return mob.WarMode();
                }).length > 0) {
                Orion.FindTypeEx(any, any, ground,
                    'nothumanmobile|live|ignoreself|ignorefriends', 5, 'gray|criminal|orange|red')
                    .filter(function (mob) {
                        return mob.WarMode();
                    }).forEach(function (mob) {
                        if (Orion.ObjectExists(mob.Serial())) {
                            Orion.Attack(mob.Serial())
                            Orion.Wait(1000)
                        }
                    })
            }

            Heal()
            var chestid = LootChest()
            if (chestid == null) {
                Orion.Wait(4000)
                chestid = LootChest()
                if (chestid == null)
                    Orion.PauseScript()
            }

            while (Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 5, 'gray|criminal|orange|red')
                .filter(function (mob) {
                    return mob.WarMode();
                }).length > 0) {
                Orion.FindTypeEx(any, any, ground,
                    'nothumanmobile|live|ignoreself|ignorefriends', 5, 'gray|criminal|orange|red')
                    .filter(function (mob) {
                        return mob.WarMode();
                    }).forEach(function (mob) {
                        if (Orion.ObjectExists(mob.Serial())) {
                            Orion.Attack(mob.Serial())
                            Orion.Wait(1000)
                        }
                    })
            }

            Orion.Print('Destroy Chest')
            Orion.Wait(2000)
            // Orion.PauseScript()
            //DestroyChest
            Orion.RequestContextMenu(chestid);
            Orion.WaitContextMenuID(chestid, 0);
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xC8FD1EA7')) {
                    gump0.Select(Orion.CreateGumpHook(1));
                    Orion.Wait(100);
                }
            }
            if (!usingPet) {
                //ReleaseDaemon
                Orion.RequestContextMenu(daemonId);
                Orion.WaitContextMenuID(daemonId, 5);
            }
            //ReturnHome
            Mount(true)
            Orion.Wait(1000)
            SortLoot()
        }
    })
}

function SortLoot() {
    if (bankGold) {
        Orion.Print('Going to Bank')
        RecallRune(bankRune);
        Orion.Say("bank")
        Orion.Wait(500)
        Orion.Print('Move Gold')
        MoveItemTextFromTo("Gold Coin", Player.Serial(), Player.BankSerial())
        Orion.Wait(1000)
    }
    ReturnHomeSortLoot()
}

function WalkToQuestArrow() {
    WalkTo(coordinate(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y()))
}

function LootChest() {
    Orion.Print('Start Loot Script')

    var chest = Orion.FindTypeEx(any, any, ground, 'item', 13).filter(function (item) { return Orion.Contains(item.Name(), 'Treasure Chest') }).shift()
    if (chest != null) {
        WalkTo(chest)
        while (!Orion.OpenContainer(chest.Serial(), 1000, 'reach that|too away|appears to be trapped')) {
            WalkTo(chest)
            Orion.Wait(500)

            CastSpellOnTarget('Unlock', chest.Serial())
            //Orion.UseType('0x14FB|0x14FC', '0xFFFF');
            //if (Orion.WaitForTarget(1000)) {
            //    Orion.TargetObject(chest.Serial());
            //}
            Orion.Wait(3000);
            Orion.UseSkillTarget('Remove Trap', chest.Serial())
            Orion.Wait(11000);
        }

        MoveItems(chest, backpack, '0xA331|0x0EED') //Gold
        MoveItems(chest, backpack, '0xA32F') //Reg
        MoveItems(chest, backpack, '0xA333') //Gem
        MoveItems(chest, backpack, '0xE75') //Artifact bag
        MoveItemTextFromTo('Woven|Transc|Treasure Map|Fragment|Cold Blood|Vine|Pardon|Phasing|Warding|Surge|Legendary|Engraving|Key|Treat|Souls|Brick|Steed|Ancient|Hearty', chest, backpack)

        MoveItemTextFromTo('Board|Ingot|Cut Leather|Cloth', chest, backpack)

        return chest.Serial()
    }

}

function ReturnHomeSortLoot() {
    Orion.Print('Going to House')
    if (Orion.FindObject(home) == null) {
        home = Orion.FindTypeEx('0x22C5', any, backpack)
            .filter(function (book) { return Orion.Contains(book.Properties(), 'Home') }).shift().Serial()
    }
    RecallRune(home)
    Orion.Wait(1000)
    Orion.ClientOptionSet('BlockWalkingOnMultiStairsInWarMode', 0)
    Orion.WarMode(0)
    Orion.Wait(300)

    while (Player.WarMode()) {
        Orion.Print('Disable War Mode')
        Orion.Wait(200)
        Orion.WarMode(0)
    }

    var craftingBox = FindGroundItemWithProperties([_craftingBox]).Serial()
    var rareBox = FindGroundItemWithProperties([_rareBox]).Serial()
    var essenceBox = FindGroundItemWithProperties([_essenceBox]).Serial()
    var recipeBox = FindGroundItemWithProperties([_recipeBox]).Serial()
    var talismanBox = FindGroundItemWithProperties([_talismanBox]).Serial()
    var regBoxId = FindGroundItemWithProperties([_regBoxId]).Serial()
    var bin = FindGroundItemWithProperties([_bin]).Serial()
    var transcendenceBook = FindGroundItemWithProperties([_transcendenceBook]).Serial()

    MoveItemsFromPlayer(craftingBox, '0x0EED')
    MoveItemText("Essence|Crafting Resource", essenceBox)
    MoveItemText("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", regBoxId)

    Orion.Print('Move Gold')
    MoveItemTextFromTo("Gold Coin", backpack, Orion.FindObject(craftingBox))

    MoveItems(backpack, Orion.FindObject(craftingBox), '0x0EED', any, 0, true) //Gold
    Orion.Print('Move Reg')
    MoveItemTextFromTo("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", backpack, Orion.FindObject(regBoxId))
    Orion.Print('Move Gem')
    MoveItemTextFromTo("Raptor Teeth|Faery Dust|Wolf Eye|Crushed Glass|Bottle Of Ichor|Daemon Claw|Essence|Crafting Resource|Goblin Blood|Slith Tongue", backpack, Orion.FindObject(essenceBox))//Gems
    Orion.Print('Move Stuff')
    MoveItemTextFromTo('Board|Ingot|Leather|Cloth', backpack, Orion.FindObject(craftingBox))
    Orion.Print('Move Artifact')
    MoveItems(backpack, rareBox, '0xE75') //Artifact bag
    Orion.Print('Move Fragment')
    MoveItemTextFromTo('Fragment|Cold Blood|Vine|Pardon|Phasing|Warding|Surge|Legendary|Engraving|Key|Treat|Souls|Brick|Steed|Ancient|Hearty', backpack, rareBox)
    Orion.Print('Move Transendance')
    MoveItemTextFromTo('Transcendence', backpack, transcendenceBook)

    Orion.Print('Move Recipes')
    MoveItemTextFromTo('Recipe', backpack, Orion.FindObject(recipeBox))

    Orion.Print('Move Talismans')
    MoveItemTextFromTo('Talisman', backpack, Orion.FindObject(talismanBox))

    Orion.Print('Bin Bags')
    MoveItemTextFromTo('A Bag', backpack, Orion.FindObject(bin))

    MoveItemTextFromTo("Completed", backpack, bin)
}

function GoToClosestPortal() {
    Debug(' Method Entry - GoToClosestPortal')

    var x = Orion.QuestArrowPosition().X()
    var y = Orion.QuestArrowPosition().Y()

    if (useRuneBooks) {
        UseClosestRuneOrWalk(x, y, 1, null, 10)
        safeSpot = Here()
        Orion.WalkTo(x, y, 0, 2, 255, 1)
        return Orion.GetDistance(x, y) < 10
    }
    else {
        Orion.Print('Find Portals')

        portalLocation = portalLocation.sort(function (loc1, loc2) {
            return (loc1.DistanceTo(x, y) - loc2.DistanceTo(x, y))
        })
        Orion.Print("Try first")
        if (!TryLocation(portalLocation.shift())) {
            Orion.Print("Try second")
            RecallRune(home)
            if (!TryLocation(portalLocation.shift())) {
                Orion.Print("Try third")
                RecallRune(home)
                return TryLocation(portalLocation.shift())
            }
        }

        return true
    }
}

var safeSpot = null
function TryLocation(portal) {
    Orion.Print(portal.Name())
    var x = Orion.QuestArrowPosition().X()
    var y = Orion.QuestArrowPosition().Y()

    var portalCrystals = Orion.FindTypeEx('0x468A', any, ground, 'item', 20)


    if (portalCrystals.length == 0) {
        Orion.Wait(2000)
        portalCrystals = Orion.FindTypeEx('0x468A', any, ground, 'item', 20)
    }

    var portalCrystal = portalCrystals.shift()

    if (portalCrystal != null) {
        WalkTo(portalCrystal)
        Orion.Say(portal.Name())
    }
    Orion.Wait(1000)

    //Cross water at skara
    if (Orion.Contains(portal.Name(), 'skara')) {
        Orion.Wait(2000)
        if (!Orion.WalkTo(x, y, 1, 1, 255, 1)) {
            CrossAtSkara()
        }
    }

    if (!Orion.WalkTo(x, y, 1, 10, 255, 1)) {
        var nx = parseInt(x + (Player.X() - x) / 2)
        var ny = parseInt(y + (Player.Y() - y) / 2)
        Orion.Print(Player.X() + '  ' + x + ' ' + nx)
        Orion.Print(Player.Y() + '  ' + y + ' ' + ny)
        Orion.WalkTo(nx, ny, 1, 10, 255, 1)
        Orion.WalkTo(x, y, 1, 10, 255, 1)
    }
    safeSpot = Here()
    return Orion.WalkTo(x, y, 0, 2, 255, 1)
}

function CrossAtSkara() {

    Orion.WalkTo(679, 2233, 0, 1, 255, 1)
    Orion.WalkTo(683, 2234, 0, 1, 255, 1)
    Orion.Say('cross')
    Orion.Wait(1000)

}

function Mount(getOn) {
    Orion.Print('Mount')
    if (getOn) {
        Orion.Print('Mount')
        while (Orion.ObjAtLayer('mount') == null) {
            Orion.Print('Mount ' + mount.Name())
            Orion.UseObject(mount.Serial());
            Orion.Wait(1000);
        }
    }
    else {
        Orion.Print('Unmount')
        while (Orion.ObjAtLayer('mount') != null) {
            Orion.UseObject(Player.Serial());
            Orion.Wait(800);
        }
    }
}

function Heal() {
    if (Player.Hits() < Player.MaxHits()) {
        Orion.CastTarget('Greater Heal', self)
        Orion.Wait(2000)
    }
}

function GetMaps(inMaps) {
    var maps;
    if (inMaps == null) {
        maps = Orion.FindTypeEx('0x14EC', '0x0000', backpack)
            .filter(function (map1) {
                return Orion.Contains(map1.Properties(), 'Treasure') &&
                    Orion.Contains(map1.Properties(), 'Trammel') &&
                    Orion.Contains(map1.Properties(), 'Stash|Supply')
            })
        maps.filter(function (map1) {
            return !Orion.Contains(map1.Properties(), 'Blessed')
                && !Orion.Contains(map1.Properties(), 'Completed')
        }).forEach(function (m2) {
            Orion.UseObject(m2.Serial())
            Orion.Wait(1500)
        })
        Orion.Print('maps:' + maps.length)
    }
    else {
        maps = inMaps
    }
    Orion.Print('Found ' + maps.length)
    return maps
}

function TestPrintLayers() {
    TextWindow.Clear()

    TextWindow.Open()
    for (i = 1; i < 30; i++) {
        TextWindow.Print(i)

        if (Orion.ObjAtLayer(i) != null)

            TextWindow.Print(Orion.ObjAtLayer(i).Name())

    }
}

function ResetContainerView() {
    Debug(' DoAllMapsInBag')

    for (var index = 0; index < 8; index++) {
        Orion.CloseGump('container');
    }
    Orion.OpenContainer(backpack)
}
//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Beetle.js
//#include helpers/Notifier.js
//#include helpers/ItemManager.js
//#include helpers/Debug.js
//#include Actions/RuneBookController.js
