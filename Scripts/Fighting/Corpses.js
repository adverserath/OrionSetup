//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Debug.js
//#include helpers/Notifier.js


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

var lootProperties = ['Magic Item|Artifact']

function AutoLootBeetleAssist() {

    var bettles = Orion.FindTypeEx('0x0317', any, ground, 'nothumanmobile', 15)
    Orion.Print("beetles" + bettles.length)
    var bettlesPacks = bettles.filter(function (mob) {
        var object = Orion.ObjAtLayer(21, mob.Serial());
        return object.Properties() != "";
    })

    if (bettlesPacks.length < 0)
        return;
    var beetle = bettlesPacks[0];
    var beetlebackpack = Orion.ObjAtLayer(21, beetle.Serial());
    Orion.Print("Beetle:" + beetle.Serial())

    Orion.Print("Pack:" + beetlebackpack.Serial())
    Orion.Print("Props:" + beetlebackpack.Properties())

    Orion.OpenContainer(beetlebackpack.Serial())
    var lootbox = beetlebackpack
    // Orion.FindTypeEx(any, any, beetlebackpack.Serial(), 'items').forEach(function (item) {
    //     if (Orion.Contains(item.Properties(), "Contents")) {
    //         lootbox = item;
    //         Orion.Print(lootbox.Properties())
    //         Orion.Print('Lootbox is : ' + item.Name())
    //         return;
    //     }
    // })

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
                    && mob.InLOS();
            }).length;

        if (Player.WarMode() && entireAreaMobs == 0) {

            var outcome = beetlebackpack.Properties().match(/Contents:\s(\d*)\/125 Items,\s(\d*)\/1600 Stones/im)
            if (outcome != null) {
                items = parseInt(outcome[1])
                itemWeight = parseInt(outcome[2])
            }

            if (Player.Weight() < Player.MaxWeight()) {
                if (items >= 125 || itemWeight > 1570) {
                    BotPush("Full Backpack")
                    Orion.PauseScript();
                }
                var corpses = Orion.FindTypeEx('0x2006', any, 'ground', any, 15);
                corpses.forEach(function (corpse) {
                    Orion.Print("Walking to " + corpse.Serial())
                    WalkTo(corpse, 1);
                    Orion.UseObject(corpse.Serial())
                    Orion.Wait(500);
                    while (beetle.Distance() > 2) {
                        Orion.Wait(400)
                    }
                    Orion.FindTypeEx(any, any, ground).filter(function (item) {
                        MoveItemTextFromTo("Gold Coin", corpse.Serial(), beetlebackpack)
                    })
                    Orion.FindTypeEx(any, any, ground).filter(function (item) {
                        MoveItemTextFromTo(lootProperties, corpse.Serial(), lootbox)
                    })
                    Orion.Wait(800);
                    //Orion.Hide(corpse.Serial())
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

function OpenNearbyCorpses() {
    var corpses = Orion.FindTypeEx('0x2006', any, 'ground', any, 2);
    corpses.forEach(function (corpse) {
        Orion.OpenContainer(corpse.Serial());
        // Orion.Ignore(corpse.Serial());
    });
}

function HideCorpse() {
    var target = SelectTarget()
    Orion.Hide(target.Serial())
}