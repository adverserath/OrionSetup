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
            Orion.TargetTile('any', Player.X(), Player.Y(), Player.Z());
    }
}

function MoveMibs() {
    var target = SelectTarget('storage')
    while (Orion.MoveItemList('Fishies', backpack, 0, target.Serial())) {
        Orion.Wait(850)
    }
}

function GetNets() {
    var box = SelectTarget('storage')
    Orion.OpenContainer(box.Serial(), 1000)

    Orion.MoveItemType('0x0DCA', box.Serial())
    while (Orion.MoveItemType('0x0DCA', any, box.Serial(), 5) && Player.Weight() < (Player.MaxWeight() - 60)) {
        Orion.Wait(850)
    }
}

function KrakenLooter() {
    lootLists = 'Fishies'
    while (true) {
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
        Orion.Wait(4000)
    }
}