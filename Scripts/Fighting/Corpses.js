//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Debug.js
//#include helpers/Notifier.js
//#include helpers/Beetle.js

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
                    Orion.Wait(1000);
                    //      Orion.Hide(corpse.Serial())
                    Orion.Ignore(corpse.Serial());
                });

                Orion.Wait(1000);
            }
        }
    }
}

var lootProperties = ['Magic Item|Artifact|Bolt|Arrow|Armor']
var lootOnWar = true

function looted(serial) {
    Orion.Wait(Orion.Random(500));

    var array = Shared.GetArray('looted', [])

    var lootedMobs = Shared.GetArray('looted', [])
    if (lootedMobs.indexOf(serial) == -1) {
        lootedMobs.push(serial)
        Shared.AddArray('looted', lootedMobs)
        Orion.Print(68, "not looted:" + serial)
        return false
    }
    Orion.Print(38, 'Looted:' + serial)
    return true;
}

function AutoLootBeetleAssist() {
    var beetle = getMyBeetle()
    if (beetle == null)
        return
    var beetlebackpack = Orion.ObjAtLayer(21, beetle.Serial());

    Orion.OpenContainer(beetlebackpack.Serial())
    var lootbox = beetlebackpack
    Orion.Boxhack(beetlebackpack.Serial());

    var items = 0
    var itemWeight = 0
    while (true) {
        if (Player.Dead()) {
            BotPush("Dead")
            Orion.PauseScript();
        }
        Orion.Wait(1000)
        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 15, 3)
            .filter(function (mob) {
                return mob.Notoriety() >= 3
                    && mob.Notoriety() < 7
                    && mob.InLOS()
                    && mob.WarMode()
            }).length;

        if ((!Player.WarMode() || lootOnWar) && entireAreaMobs == 0) {

            var outcome = beetlebackpack.Properties().match(/Contents:\s(\d*)\/125 Items,\s(\d*)\/1600 Stones/im)
            if (outcome != null) {
                items = parseInt(outcome[1])
                itemWeight = parseInt(outcome[2])
            }

            if (Player.Weight() < Player.MaxWeight()) {
                if (items >= 120 || itemWeight > 1570) {
                    BotPush("Full Backpack")
                    Orion.PauseScript();
                }
                Orion.FindTypeEx('0x2006', any, 'ground', any, 10)
                    .sort(function (item) { return Orion.Random(0, 2) > 0 ? -1 : 1 })
                    .forEach(function (corpse) {
                        if (looted(corpse.Serial()))
                            Orion.Ignore(corpse.Serial());
                        else
                            if ((!Player.WarMode() || lootOnWar)) {
                                Orion.Print("Walking to " + corpse.Serial())
                                WalkTo(corpse, 0);
                                WalkTo(corpse, 1);
                                Orion.UseObject(corpse.Serial())
                                Orion.Wait(600);

                                Orion.FindTypeEx(any, any, ground).filter(function (item) {
                                    MoveItemTextFromTo("Gold Coin", corpse.Serial(), beetlebackpack)
                                })
                                Orion.FindTypeEx(any, any, ground).filter(function (item) {
                                    MoveItemTextFromTo(lootProperties, corpse.Serial(), lootbox)
                                })
                                Orion.Wait(800);
                                //Orion.Hide(corpse.Serial())
                                if (corpse.Distance() < 2) {
                                    Orion.Ignore(corpse.Serial());
                                }
                            }
                    });
                Orion.Wait(1000);
            }
        }
    }
}

function SwoopKiller() {
    var startCoordinate = SelectCoordinate()
    while (!Player.Dead()) {
        var swoops = Orion.FindTypeEx('0x0005', any, ground, any, 20);
        while (swoops.length == 0) {
            Orion.Wait(50)
            swoops = Orion.FindTypeEx('0x0005', any, ground, any, 20);
        }
        var swoop = swoops.shift();

        Orion.AddWaitTargetObject(swoop.Serial());
        Orion.Print('Honor');
        Orion.InvokeVirtue('Honor');
        if (swoop.Distance() > 6) {
            WalkTo(swoop, 4)
        }
        while (swoop.Distance() < 2) {
            Orion.Wait(1000)
        }
        Orion.Attack(swoop.Serial());

        while (swoop.Exists()) {
            Orion.Wait(3000)
            Orion.Print('Its alive')
        }
        WalkTo(startCoordinate)
    }

}

function OpenParagonCorpses() {
    while (!Player.Dead()) {
        Orion.Wait(1000)

        if (Player.WarMode()) {
            if (Player.Weight() < Player.MaxWeight()) {
                var corpses = Orion.FindTypeEx('0x2006', '0x0501', ground, any, 20);
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

function OpenNearbyCorpses() {
    var corpses = Orion.FindTypeEx('0x2006', any, ground, any, 2);
    corpses.forEach(function (corpse) {
        if (!Orion.GumpExists('container', corpse.Serial())) {
            Orion.OpenContainer(corpse.Serial());

        }
        // Orion.Ignore(corpse.Serial());
    });
}

function RecoverCorpse() {
    var x = Player.X() + 10
    var y = Player.Y()
    var corpses = Orion.FindTypeEx('0x2006|0x0ECC', any, ground, any, 15).filter(function (corpse) {
        Orion.Print(corpse.Name())
        Orion.Print(Orion.Contains(corpse.Properties(), Player.Name()))

        return Orion.Contains(corpse.Properties(), Player.Name())
    })
    corpses.forEach(function (corpse) {

        WalkTo(corpse)
        if (Orion.OpenContainer(corpse.Serial()))
            Orion.Ignore(corpse.Serial());
    });
}

function HideCorpse() {
    var target = SelectTarget()
    Orion.Hide(target.Serial())
}