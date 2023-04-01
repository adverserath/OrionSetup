//#include helpers/Target.js

var lootLists = 'ImbueIngred|Maps|Gold'
var looted = []

function SuperLooter(corpse) {

    if (!Orion.GumpExists('container', corpse.Serial())) {
        Orion.OpenContainer(corpse.Serial(), 1000)
        Orion.Wait(500)
    }
    while (corpse.Exists() && corpse.InLOS() && Orion.MoveItemList(lootLists, corpse.Serial()) && corpse.Distance() < 2) {
        Orion.Wait(500)
        Orion.Print('Still looting')
        Orion.AddHighlightCharacter(corpse.Serial(), '0x0846');
    }
    Orion.Wait(250)
    Orion.PrintFast(corpse.Serial(), '78', 1, 'Looted');

    //Orion.Ignore(corpse.Serial())
    if (Orion.GumpExists('container', corpse.Serial())) {
        looted.push(corpse.Serial())
    }
}

function ThrowTheNets() {
    while (Orion.Count('0x0DCA')) {
        Orion.UseType('0x0DCA', '0xFFFF');
        if (Orion.WaitForTarget(1000))
            Orion.TargetTile('any', Player.X(), Player.Y() + 6, 0);
        Orion.Wait(500)
    }
}

function MoveMibs() {
    var target = SelectTarget('storage')
    while (Orion.MoveItemList('Fishies', backpack, 0, target.Serial())) {
        Orion.Wait(850)
    }
}


function KillAndLootOnly() {
    lootLists = 'Fishies'

    Debug(' Method Entry - ClearOutMonsters')
    //Clear out monsters before recall
    var monsters = GetAllTarget(12)
    if (monsters.length > 0) {
        monsters.forEach(function (mob) {
            Orion.PrintFast(mob.Serial(), 58, 1, 'problem');
            Orion.Attack(mob.Serial())
            Orion.Wait(100)
        })
        while (GetAllTarget(15).length > 0) {
            Orion.Wait(2000)
            Orion.Print("wait for no monsters")
        }
    }

    if (Orion.ClientLastAttack() == '0x00000000' && Orion.FindTypeEx(any, any, ground,
        'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red').length == 0) {
        var corpses = Orion.FindTypeEx('0x2006|0x0ECC', any, ground, any, 15)
            .filter(function (corpse) {
                return looted.indexOf(corpse.Serial()) == -1
                //corpse.Count() == 77 && 
            })
        Orion.Print('Found corpses: ' + corpses.length)
        corpses.forEach(function (corpse) {

            WalkTo(corpse)
            SuperLooter(corpse)
        });
    }
    Orion.Wait(4000)
}

function IgnoreAllKrakenDead() {
    var corpses = Orion.FindTypeEx('0x2006|0x0ECC', any, ground, any, 15).filter(function (corpse) {
        return corpse.Count() == 77 && looted.indexOf(corpse.Serial()) == -1
    })
    Orion.Print('Found corpses: ' + corpses.length)
    corpses.forEach(function (corpse) {
        Orion.Ignore(corpse.Serial())
    });
}
function KrakenLooter() {
    lootLists = 'Fishies'
    while (true) {
        Orion.Wait(4000)
        if (Orion.ClientLastAttack() == '0x00000000' && Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red').length == 0) {
            var corpses = Orion.FindTypeEx('0x2006|0x0ECC', any, ground, any, 15).filter(function (corpse) {
                return corpse.Count() == 77 && looted.indexOf(corpse.Serial()) == -1
            })
            Orion.Print('Found corpses: ' + corpses.length)
            corpses.forEach(function (corpse) {

                WalkTo(corpse)
                SuperLooter(corpse)
            });
        }
        
    }
}

var location = ["Trammel", "Felucca", "Ilshenar", "Tokuno", "Malas", "Ter Mur"]
var mapType = ["Stash", "Supply", "Cache", "Hoard", "Trove"]

var foundMaps = 0
function MoveMapsInBagToChests() {
    // Move stash maps to box
    var maps = Orion.FindTypeEx('0x14EC', any, backpack)
        .filter(function (map) {
            return !Orion.Contains(map.Properties(), 'Completed')
        })

    if (maps.length != 0) {

        location.forEach(function (loc) {
            mapType.forEach(function (maptype) {
                var boxName = "Engraved: " + loc + " " + maptype
                var mapFilter = loc + "&" + maptype
                Orion.Print(boxName)
                MoveItemText(mapFilter, FindGroundItemWithProperties([boxName]).Serial())
            })
        })
        var foundList = maps.map(function (map) {
            var name = map.Name().split(' ')
            var prop = map.Properties().split(' ')
            return name[name.length - 1] + ' ' + prop[prop.length - 1]
        }).join("\n")

        foundMaps += maps.length

        CountGlobalValue('foundMaps', foundMaps, foundList + '\nMaps found :')
    }
}
