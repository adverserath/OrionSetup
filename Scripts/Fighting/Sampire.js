
function SampireLoops() {
    //Start Target Script
    Orion.Exec('TargetClosest', true);
    // Orion.Exec('SuperLooter', true);
    Orion.Exec('BagOfSendingGold', true);

    //Start Counter Script
    Orion.Exec('ActiveCounter', true);

    if (Orion.ScriptRunning('KeepSpellActive') != 0) {
        Orion.ToggleScript('KeepSpellActive');
    }
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

function SuperLooter(corpse) {

    if (!Orion.GumpExists('container', corpse.Serial())) {
        Orion.OpenContainer(corpse.Serial(), 1000)

    }
    while (Orion.MoveItemList(lootLists, corpse.Serial())) {
        Orion.AddHighlightCharacter(corpse.Serial(), '0x0846');
    }
    Orion.PrintFast(corpse.Serial(), '78', 1, 'Looted');

    Orion.Ignore(corpse.Serial())

}
var lootLists = 'ImbueIngred|Gold/Arrows/Artis|Weapons'
function OpenCorpsesWhenIdle(_) {
    Orion.FindTypeEx('0x2006', any, ground, 'item', 6)
        .sort(function (t1, t2) {
            return t1.Distance() - t2.Distance()
        })
        .forEach(function (corpse) {
            if (!Player.Dead()) {
                Orion.AddHighlightCharacter(corpse.Serial(), '0x084C');

                Orion.PrintFast(corpse.Serial(), '0x0111', 1, 'Looting');
                WalkTo(corpse.Serial(), 0)
                Orion.OpenContainer(corpse.Serial(), 1000)
                SuperLooter(corpse)
            }
        })
}
var locations = []
var currentlocation = 0

function SetLocations(_) {
    locations = SelectMultipleLocations();
}

function LocationLoop(_) {
    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        return;
    }
    {
        var mobCount = Orion.FindTypeEx(any, any, ground,
            'live|ignoreself|ignorefriends|near', 6, 'gray|criminal|red|enemy').length
        Orion.Print('Checking next location')

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location')
            WalkTo(locations[currentlocation++])

            //Find Next Target Far away
            var farMobs = Orion.FindTypeEx(any, any, ground,
                'live|ignoreself|ignorefriends|near', 30, 'gray|criminal|red|enemy')
            if (farMobs.length > 0) {
                WalkTo(farMobs[0])
            }
        }

    }
}



function Confidence(_) {
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(200)

            if (Orion.ClientLastAttack() != '0x00000000' && Player.Hits() < 20) {
                CastSpell('Confidence')
                Orion.Wait(20000)
            }
        }
    }
}

function PrimaryAbility(_) {
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
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
function TargetClosest(_) {
    SetLocations()
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
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
                        'live|ignoreself|ignorefriends|near|inlos', 10, 'gray|criminal|red|enemy')
                    closest.concat(Orion.FindTypeEx(any, any, ground,
                        'live|ignoreself|ignorefriends|near', 12, 'gray|criminal|red|enemy').filter(function (mob) { return mob.WarMode() }))
                    if (closest.length > 0) {
                        Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                        Orion.Wait(100)
                        Orion.Attack(closest[0].Serial())

                        WalkTo(closest[0])
                        Orion.PrintFast(self, '0x0111', 1, closest[0].Name());
                    }
                    if (closest.length == 0) {
                        Orion.PrintFast(self, '0x0111', 1, 'Loot');

                        OpenCorpsesWhenIdle()
                        if (locations.length > 0)
                            LocationLoop()
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

function ActiveCounter(_) {
    while (true) {
        Orion.Wait(100)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(50)
            if (Player.Mana() > 10 && !Orion.SpellStatus('Counter Attack')) {
                Orion.PrintFast(self, '0x0111', 1, 'Counter');
                Orion.Cast('Counter Attack');
                Orion.Wait(300);
            }
        }
    }
}

function KeepSpellActive(spellName, mana) {
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
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
        CastSpellOnTarget(spell, self)
    else
        CastSpellOnTarget(spell, target)
}



function Heal(_) {
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(500)
            if (!Orion.BuffExists('Curse Weapon') && Orion.ClientLastAttack() != '0x00000000' && Player.Hits() < Player.MaxHits() / 1.5) {
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
}

//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/DpsGump.js
//#include Actions/Automated/BagOfSending.js
