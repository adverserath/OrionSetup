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

var goldChestId = '0x40026602'
var essenceBox = '0x400C5E3B'
var beetleMobileId = '0x0000C412'
var regBoxId = '0x400F48A7'
var bin = '0x400F63CF'
var beetleMobile
var usingBeetle = true
var home = '0x401111EF'

function DoSpecificMap()
{
var maps = []
maps.push(SelectTarget())
DoAllMapsInBag(maps)
}

function DoAllMapsInBag(inMaps) {
var maps;
if(inMaps==null)
{
    RecallRune(home)
    maps = Orion.FindTypeEx('0x14EC', '0x0000', backpack)
        .filter(function (map1) {
            return Orion.Contains(map1.Properties(), 'Treasure') &&
                Orion.Contains(map1.Properties(), 'Trammel') &&
                Orion.Contains(map1.Properties(), 'Stash')
        })
    Orion.Print('maps:' + maps.length)
    maps = maps.filter(function (map2) { return !Orion.Contains(map2.Properties(), 'Completed') })
    Orion.Print('maps:' + maps.length)
}
else{
maps= inMaps
}
    maps.forEach(function (map) {
        Orion.UseObject(map.Serial())
        Orion.Wait(1000)

        if (!GoToClosestPortal()) {
            RecallRune(home)
            Orion.UseObject(Player.Serial())
            Orion.Wait(1000)
            Orion.MoveItem(map.Serial(), 1, beetleMobileId)
            Orion.UseObject(beetleMobileId)
            Orion.Wait(1000)
        }
        else {
            var followers = Player.Followers()
            //SummonDaemon
            while (Player.Followers() == followers && followers < 2) {
                Orion.Cast('Summon Daemon')
                Orion.Wait(5000)
            }
            var daemonId = Orion.FindType('0x000A', '0x0000', ground, 10)
            Orion.Say('All guard')

            //DigChest
            Orion.RequestContextMenu(map.Serial());
            Orion.WaitContextMenuID(map.Serial(), 1);
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetTile('any', Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y(), 0);
                Orion.Wait(26000)
                Orion.UseSkill('Hiding')
            }
            Orion.Wait(2000)
            while (Orion.FindTypeEx(any, any, ground,
                'mobile|ignoreself|ignorefriends', 10, 'criminal|gray').length > 0) {
                Orion.Wait(1000)
            }
            var chestid = LootChest()
            if (chestid == null) {
                Orion.PauseScript()
            }
            Orion.Print('Destroy')
            Orion.PauseScript()
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
            //ReleaseDaemon
            Orion.RequestContextMenu(daemonId);
            Orion.WaitContextMenuID(daemonId, 5);
            //ReturnHome
            Orion.UseObject(beetleMobileId)
            Orion.Wait(1000)
            ReturnHomeSortLoot()
            Orion.UseObject(beetleMobileId)
            Orion.Wait(1000)
            WalkTo(bin)
            if (Orion.Contains(map.Properties(), 'Completed'))
                Orion.MoveItem(map.Serial(), 1, bin)
            Orion.Wait(500)
        }
    })

}
function WalkToQuestArrow() {
    WalkTo(coordinate(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y()))
}

function LootChest() {
    beetleMobile = Orion.FindObject(beetleMobileId)

    if (usingBeetle && beetleMobile == null) {
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
    var chest = Orion.FindTypeEx(any, any, ground, 'item', 10).filter(function (item) { return Orion.Contains(item.Name(), 'Treasure Chest') }).shift()
    if (chest != null) {
        WalkTo(chest)
        Orion.Wait(2000);
        while (Orion.OpenContainer(chest.Serial(), 1000,'reach that|too away|appears to be trapped')) {
            WalkTo(chest)
            Orion.Wait(1000)
            Orion.UseType('0x14FB|0x14FC', '0xFFFF');
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(chest.Serial());
            }
            Orion.Wait(2000);
            Orion.UseSkillTarget('Remove Trap', chest.Serial())
            Orion.Wait(11000);
        }

        MoveItems(chest, beetleMobile, '0xA331|0x0EED') //Gold
        MoveItems(chest, beetleMobile, '0xA32F') //Reg
        MoveItems(chest, beetleMobile, '0xA333') //Gem
        MoveItemTextFromTo('Board|Ingot|Cut Leather|Cloth', chest, beetleMobile)
        return chest.Serial()
    }

}
function ReturnHomeSortLoot() {
    RecallRune(home)
    Orion.Wait(400)
    Orion.UseObject(Player.Serial());
    Orion.Wait(200);
    beetleMobile = Orion.FindObject(beetleMobileId)


    MoveItemsFromPlayer(goldChestId, '0x0EED')
    MoveItemText("Essence|Crafting Resource", essenceBox)
    if (usingBeetle) {
        Orion.RequestContextMenu(beetleMobile.Serial());
        Orion.WaitContextMenuCliloc(beetleMobile.Serial(), 3006145);
        Orion.Wait(1000);
        //From Beetle
        Orion.Print('Move Gold')
        MoveItemTextFromTo("Gold Coin", beetleMobile, Orion.FindObject(goldChestId))

        MoveItems(beetleMobile, Orion.FindObject(goldChestId), '0x0EED', any, 0, true) //Gold
        Orion.Print('Move Reg')
        MoveItemTextFromTo("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", beetleMobile, Orion.FindObject(regBoxId))
        Orion.Print('Move Gem')
        MoveItemTextFromTo("Essence|Crafting Resource", beetleMobile, Orion.FindObject(essenceBox))//Gems
        Orion.Print('Move Stuff')
        MoveItemTextFromTo('Board|Ingot|Leather|Cloth', beetleMobile, Orion.FindObject(goldChestId))
    }
    MoveItemText("Essence|Crafting Resource", essenceBox)
    MoveItemsFromPlayer(goldChestId, '0x0EED')
    MoveItemText("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", regBoxId)

}

function GoToClosestPortal() {
    var x = Orion.QuestArrowPosition().X()
    var y = Orion.QuestArrowPosition().Y()

    portal = portalLocation.sort(function (loc1, loc2) {
        return (loc1.DistanceTo(x, y) - loc2.DistanceTo(x, y))
    }).shift()
    var i = 1;

    var portalCrystal = Orion.FindTypeEx('0x468A', any, ground, 'item', 20).shift()
    if (portalCrystal != null) {
        WalkTo(portalCrystal)
        Orion.Say(portal.Name())
        }
        Orion.Wait(1000)
        if (!Orion.WalkTo(x, y, 0, 3, 255, 1)) {
            var nx = parseInt(x + (Player.X() - x) / 2)
            var ny = parseInt(y + (Player.Y() - y) / 2)
            Orion.Print(Player.X() + '  ' + x + ' ' + nx)
            Orion.Print(Player.Y() + '  ' + y + ' ' + ny)
            Orion.WalkTo(nx, ny, 0, 10, 255, 1)
            Orion.WalkTo(x, y, 0, 3, 255, 1)
        }
        return Orion.WalkTo(x, y, 0, 3, 255, 1)
}

//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Debug.js