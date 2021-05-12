//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Debug.js

function CutHides() {
    var scissors = Orion.FindTypeEx('0x0F9F').shift();
    var hides = Orion.FindTypeEx('0x1079');
    UseItemOnTargets(scissors, hides);

}

function BankLeather() {
    Orion.Print("bank leather")
    var leather = Orion.FindTypeEx('0x1081');
    if (leather.length > 0) {
        Orion.Wait(200);
        MoveItems(Orion.FindObject(backpack), Orion.FindObject(Player.BankSerial()), '0x1081', any)
    }

}

function MoveHides(corpse) {
    Orion.Print("move hide")
    MoveItems(corpse, Orion.FindObject(backpack), '0x1079', any)
    Orion.Wait(600);
}

function CutCorpses() {
while(true)
{
Orion.Wait(300)

    var knife = Orion.FindType('0x2D2F|0x0EC4|0x13F6', any, backpack).shift();

    var corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 2);
    corpses.forEach(function (corpse) {
    Orion.Print('Open')
    Orion.UseObject(corpse.Serial())
        Orion.Wait(1000);
            Orion.Print('Cut')
        Orion.UseObject(knife);
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject(corpse.Serial());
        }
        Orion.Wait(600);
            Orion.Print('Move')
        MoveHides(corpse);
        Orion.Wait(600);
        Orion.Ignore(corpse.Serial());
    });

     CutHides();
    }

}

function AutoLootAssist() {
    while (!Player.Dead()) {
        Orion.Wait(1000)
        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 10, 3)
            .filter(function (mob) {
                return mob.Notoriety() >= 3
                    && mob.Notoriety() < 7
                    && mob.InLOS();
            }).length;
        if (Player.WarMode() && entireAreaMobs == 0) {
            if (Player.Weight() < Player.MaxWeight()) {
                var corpses = Orion.FindTypeEx('0x2006', any, 'ground', any, 8);
                corpses.forEach(function (corpse) {
                    Orion.Print("Walking to " + corpse.Serial())
                    WalkTo(corpse, 2);
                    Orion.UseObject(corpse.Serial())
                    Orion.Wait(3000);
                    //      Orion.Hide(corpse.Serial())
                    Orion.Ignore(corpse.Serial());
                });

                Orion.Wait(1000);
            }
        }
    }
}

function HideCorpse() {
    var target = SelectTarget()
    Orion.Hide(target.Serial())
}