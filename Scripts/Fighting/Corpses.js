//#include Scripts/helpers/Target.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Debug.js

function WarCleaveCorpses() {
    var warcleaver = Orion.FindTypeEx('0x2D2F', any, backpack).shift();
    var beetleMobile = null;
    Orion.UseObject(Player.Serial());
    Orion.Wait(200);
    var beetles = Orion.FindTypeEx('0x0317', any, ground, 'mobile', 4).filter(function (beetle) {
        Orion.RequestContextMenu(beetle.Serial());
        return Orion.WaitForContextMenu(500);
    });
    if (beetles.length > 0) {
        beetleMobile = beetles.shift();
    }
    else {
        Orion.Print('No beetle')
    }

    while (warcleaver.Exists()) {
        Orion.Wait(300)
        var corpses = Orion.FindTypeEx('0x2006', any, ground, 'item', 2);
        corpses.forEach(function (corpse) {
            WalkTo(corpse)
            Orion.UseObject(warcleaver.Serial());
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(corpse.Serial());
            }
            Orion.Wait(1000)
            Orion.Ignore(corpse.Serial())
        });
        if (Player.Weight() > (Player.MaxWeight() - 10) && beetleMobile != null) {
            MoveItemsFromPlayer(beetleMobile, '0x1079', 0)
            Orion.Wait(600);
        }
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

function OpenParagonCorpses() {
    while (!Player.Dead()) {
        Orion.Wait(1000)
        
        if (Player.WarMode()) {
            if (Player.Weight() < Player.MaxWeight()) {
                var corpses = Orion.FindTypeEx('0x2006', '0x0501', 'ground', any, 8);
                corpses.forEach(function (corpse) {
                    Orion.Print("Walking to " + corpse.Serial())
                    WalkTo(corpse, 2);
                    Orion.UseObject(corpse.Serial())
                    Orion.Wait(1000);
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