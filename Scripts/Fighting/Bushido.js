function BushKnight() {
    TextWindow.Open();
    while (Player.IsHuman()) {
        while (Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());
            if (Player.Mana() > 10 && !Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Counter Attack');
                Orion.Wait(1000);
            }
            if (Player.Mana() > 10 &&
                !Orion.BuffExists('Lightning Strike') &&
                !Orion.BuffExists('Honorable Execution')
            ) {
                Orion.Cast('Lightning Strike');
                Orion.Wait(1000);
            }

            if (false && attacker != null && attacker.Distance() < 8) {
                if (Player.Mana() > 10 && !Orion.BuffExists('consecrate weapon')) {
                    Orion.Cast('consecrate weapon');
                    Orion.Wait(2000);
                }

                if (false && Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    Orion.Cast('divine fury');
                    Orion.Wait(2000);
                }
            }
        }
    }
}

function HealingSelf() {
    while (!Player.Dead()) {
        Orion.Wait(500);
        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(500);
            while (Orion.BuffExists('healing skill')) {
                Orion.Wait(100);
            }
        }
    }
}

function HealingSelfAndFriendLoop() {
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');

    Orion.Print('hits' + target.Hits() + 'maxhits' + target.MaxHits());

    while (Player.IsHuman) {
        Orion.Wait(500);
        if (target != null) {
            if (target != null && target.Hits() < target.MaxHits()
                && !Orion.BuffExists('healing skill') && target.Distance() < 2) {
                Orion.BandageTarget('myTarget');
                Orion.Wait(500);
            }
        }

        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(500);
        }

        while (Orion.BuffExists('healing skill')) {
            Orion.Wait(100);
        }
    }
}

function CutCorpses() {

    do {
        var corpses = Orion.FindType('0x2006', any, ground, 'near', '2');
        if (corpses.length) {
            Orion.Wait(100);
            Orion.Print('skinning')
            Orion.UseObject(Orion.FindType('0x0EC4', any, backpack, 'near', '3').shift());
            Orion.TargetObject(corpses[0]);
            //    Orion.UseObject(corpses[0]);
            Orion.Ignore(corpses[0]);
        }
        Orion.Wait(400);
    } while (true);
}

