function SuperLooter(_) {
    Orion.IgnoreReset()
    while (true) {
        Orion.FindTypeEx('0x2006', any, ground, 'item', 2)
            .forEach(function (corpse) {
                if (Orion.GumpExists('container', corpse.Serial())) {
                    if(!Orion.MoveItemList(lootLists, corpse.Serial()))
                    {
                        Orion.Ignore(corpse.Serial())
                    }
                }
            })
        Orion.Wait(50)
    }
}
var lootLists = 'ImbueIngred|Gold/Arrows/Artis'
function OpenCorpsesWhenIdle() {
    Orion.FindTypeEx('0x2006', any, ground, 'item', 6)
        .sort(function (t1, t2) {
            return t1.Distance() - t2.Distance()
        })
        .forEach(function (corpse) {
            Orion.Print(corpse.Properties())
            if (!Orion.GumpExists('container', corpse.Serial())) {
                WalkTo(corpse.Serial(), 1)
                Orion.OpenContainer(corpse.Serial())
                Orion.Wait(400)
            }
        })
}

function SampireLoops() {
    //Start Target Script
    Orion.Exec('TargetClosest', true);
    Orion.Exec('SuperLooter', true);

    //Start Counter Script
    Orion.Exec('ActiveCounter', true);

    //Start DF script
    Orion.Exec('KeepSpellActive', false, ['Divine Fury', 13]);
    //Start DF script
    Orion.Exec('KeepSpellActive', false, ['Consecrate Weapon', 10]);
    //Start Primary script
    Orion.Exec('PrimaryAbility', true);

    //Start Primary script
    Orion.Exec('Confidence', true);

    //Chiv Healer
    Orion.Exec('Heal', true);

}

function Confidence() {
    while (true) {
        Orion.Wait(500)
        while (Player.WarMode()) {
            Orion.Wait(200)

            if (Orion.ClientLastAttack() != '0x00000000' && Player.Hits() < 20) {
                CastSpell('Confidence')
                Orion.Wait(20000)
            }
        }
    }
}

function PrimaryAbility() {
    while (true) {
        Orion.Wait(500)
        while (Player.WarMode()) {
            Orion.Wait(200)
            if (Orion.ClientLastAttack() != '0x00000000') {
                var mobsCount = Orion.FindTypeEx(any, any, ground,
                    'live|ignoreself|ignorefriends', 1, 'gray|criminal|red|enemy').length
                if (mobsCount == 1) {
                    if (!Orion.SpellStatus('Lightning Strike')) {
                        CastSpell('Lightning Strike')
                    }
                }
                else if (mobsCount == 2) {
                    if (!Orion.SpellStatus('Momentum Strike')) {
                        CastSpell('Momentum Strike')
                    }
                }
                else if (mobsCount > 2) {
                    if (!Orion.AbilityStatus('Primary')) {
                        TextWindow.Print("Whirly Whirly")
                        Orion.UseAbility('Primary', true);
                    }
                }

            }
        }
    }
}
function TargetClosest() {
    while (true) {
        Orion.Wait(500)
        while (Player.WarMode()) {
            Orion.Wait(150)
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())

            if (lastAttacker == null) {
                var closest = Orion.FindTypeEx(any, any, ground,
                    'live|ignoreself|ignorefriends|near', 1, 'gray|criminal|red|enemy')
                Orion.Wait(150)

                if (closest.length > 0) {
                    Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                    Orion.Wait(100)
                    Orion.Attack(closest[0].Serial())
                    Orion.PrintFast(self, '0x0111', 1, closest[0].Name());
                }
                else {
                    closest = Orion.FindTypeEx(any, any, ground,
                        'live|ignoreself|ignorefriends|near', 6, 'gray|criminal|red|enemy')
                    closest.concat(Orion.FindTypeEx(any, any, ground,
                        'live|ignoreself|ignorefriends|near', 12, 'gray|criminal|red|enemy').filter(function (mob) { return mob.WarMode() }))
                    if (closest.length > 0) {
                        Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                        Orion.Wait(100)
                        Orion.Attack(closest[0].Serial())

                        WalkTo(closest[0])
                        Orion.PrintFast(self, '0x0111', 1, closest[0].Name());
                    }
                    if(closest.length == 0)
                    {
                        OpenCorpsesWhenIdle()

                    }
                }
            }
            else {
                var mob = Orion.FindObject(Orion.ClientLastAttack())
                if (mob != null && mob.Distance() > 1) {
                    WalkTo(mob)
                }
            }
        }
    }
}

function HonorSampire(mobileSerial) {
    var mobile = Orion.FindObject(mobileSerial);
    Orion.PrintFast(self, '0x0111', 1, 'Honor');
    Orion.WaitTargetObject(mobileSerial);
    Orion.AddHighlightCharacter(mobileSerial, '0xF550', true);
    Orion.Print(' Honor ' + mobile.Properties())

    if (mobile != null &&
        !Orion.BuffExists('Honored2') &&
        mobile.Hits() == mobile.MaxHits()) {
        Orion.Print('Can Honor ' + mobile.Properties())
        while (mobile != null && mobile.Distance() > 11 ||
            !mobile.InLOS()) {
            Orion.Wait(100)
        }
        Orion.InvokeVirtue('Honor');
    }
}

function ActiveCounter() {
    while (true) {
        Orion.Wait(500)
        while (Player.WarMode()) {
            Orion.Wait(50)
            if (Player.Mana() > 10 && !Orion.SpellStatus('Counter Attack')) {
                Orion.PrintFast(self, '0x0111', 1, 'Counter');
                Orion.Cast('Counter Attack');
                Orion.Wait(750);
            }
        }
    }
}

function KeepSpellActive(spellName, mana) {
    while (true) {
        Orion.Wait(500)
        while (Player.WarMode()) {
            Orion.Wait(50)
            if (Orion.ClientLastAttack() != '0x00000000') {
                if (!Orion.BuffExists(spellName) && Player.Mana() > mana) {
                    Orion.Print(Orion.ClientLastAttack())

                    CastSpell(spellName)
                }
            }
        }
    }
}

function CastSpell(spell, target) {
    TextWindow.Print(spell);
    if (target == null)
        Orion.Cast(spell);
    else
        Orion.CastTarget(spell, target)
}



function Heal() {
    while (true) {
        Orion.Wait(500)

        if (!Orion.BuffExists('Curse Weapon') && Orion.ClientLastAttack() != '0x00000000') {
            CastSpell('Curse Weapon')
            Orion.Wait(1500)
        }
        if (Orion.ClientLastAttack() == '0x00000000' && Player.Poisoned()) {
            CastSpell('Cleanse by fire', self)
            Orion.Wait(2000)
        }
        if (Orion.ClientLastAttack() == '0x00000000' && Player.Hits() < Player.MaxHits() && !Player.Poisoned()) {
            CastSpell('Close Wounds', self)
            Orion.Wait(2000)
        }
    }
}




//#include helpers/Target.js
//#include Fighting/Tamer.js
//#include Fighting/AutoHonor.js