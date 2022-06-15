var LMC = 0.40
var looting = false

function OpenMyCorpse() {
    Orion.FindTypeEx('0x2006', any, ground, 'item', 40).filter(function (corpse) {
        return Orion.Contains(corpse.Properties(), Player.Name())
    }).forEach(function (corpse) {
        WalkTo(corpse)
        Orion.Wait(100)
        Orion.UseObject(corpse.Serial())
    })

}
function SampireLoops() {
    Orion.Print('Do you want to target a specific mob?')
    var targetSpecificMob = SelectTarget()
    if (targetSpecificMob != null)
        Orion.SetGlobal("mobType", targetSpecificMob.Graphic())
    else
        Orion.SetGlobal("mobType", any)
    //Start Target Script
    Orion.Exec('TargetClosest', true);
    // Orion.Exec('SuperLooter', true);
    Orion.Exec('BagOfSendingGold', true);
    //Start SampireSpells script
    Orion.Exec('SampireSpells', true);
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
    Orion.FindTypeEx('0x2006', any, ground, 'item', 10)
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

var mobType
function GetMobType() {
    if (mobType == null)
        mobType = Orion.GetGlobal("mobType")
    if (mobType == null)
        return any
    else
        return mobType
}

function LocationLoop(_) {
    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        return;
    }
    {
        var mobCount = Orion.FindTypeEx(GetMobType(), any, ground,
            'live|ignoreself|ignorefriends|near', 6, 'gray|criminal|red|enemy').length
        Orion.Print('Checking next location')

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location')
            WalkTo(locations[currentlocation++])

            //Find Next Target Far away
            var farMobs = Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|near', 30, 'gray|criminal|red|enemy')
            if (farMobs.length > 0) {
                WalkTo(farMobs[0])
            }
        }

    }
}

function SampireSpells() {
    var spellName = ""
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())
            if (lastAttacker != null) {
                Orion.Wait(200)
                //Counter Attack
                spellName = "Counter Attack"
                if (ManaCheck(5, LMC) && !Orion.SpellStatus(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                }

                //Ability
                var mobsCount = Orion.FindTypeEx(GetMobType(), any, ground,
                    'live|ignoreself|ignorefriends', 1, 'gray|criminal|red|enemy').length
                if (mobsCount == 1) {
                    spellName = "Lightning Strike"
                    if (ManaCheck(10, LMC) && !Orion.SpellStatus(spellName)) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        CastSpell(spellName)
                    }
                }
                else if (false) {
                    spellName = "Momentum Strike"
                    if (ManaCheck(10, LMC) && !Orion.SpellStatus(spellName)) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        CastSpell(spellName)
                    }
                }
                else if (mobsCount > 1) {
                    spellName = "Whirlwind"
                    if (ManaCheck(5, LMC) && !Orion.AbilityStatus('Primary')) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        Orion.UseAbility('Primary', true);
                    }
                }

                //Divine Fury
                spellName = "Divine Fury"
                if (ManaCheck(15, LMC) && !Orion.BuffExists(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                }
                //Consecrate Weapon
                //      spellName = "Consecrate Weapon"
                //       if (ManaCheck(10, LMC) && !Orion.BuffExists(spellName)) {
                //           Orion.PrintFast(self, '0x0111', 1, spellName);
                //           CastSpell(spellName);
                //        }

                //Curse Weapon
                spellName = "Curse Weapon"
                if (!Orion.BuffExists('Curse Weapon')
                    && Player.Hits() < Player.MaxHits() * 0.4) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                }

            } //Has Target
            else {
                if (Player.Poisoned()) {
                    CastSpell('Cleanse by fire', self)
                } else if (Player.Hits() < Player.MaxHits() * 0.9) {
                    CastSpell('Close Wounds', self)
                }
                Orion.Wait(400)
            }
        }  //while war
    } //while true
}

function TargetClosest(_) {
    SetLocations()
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(150)
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())

            if (lastAttacker == null) {
                var closest = Orion.FindTypeEx(GetMobType(), any, ground,
                    'live|ignoreself|ignorefriends|near', 1, 'gray|criminal|red|enemy')

                if (closest.length > 0) {
                    Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                    Orion.Wait(100)
                    Orion.Attack(closest[0].Serial())
                    Orion.PrintFast(self, '0x0111', 1, closest[0].Name());
                }
                else {
                    closest = Orion.FindTypeEx(GetMobType(), any, ground,
                        'live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|red|enemy')
                    closest.concat(Orion.FindTypeEx(any, any, ground,
                        'live|ignoreself|ignorefriends', 12, 'gray|criminal|red|enemy')
                        .filter(function (mob) { return mob.WarMode() }))

                    closest = closest.sort(function (mobA, mobB) {
                        return mobA.Distance() - mobB.Distance()
                    });

                    if (closest.filter(function (mob) { return !mob.WarMode() }).length == 0) {
                        Orion.PrintFast(self, '0x0111', 1, 'Loot');
                        if (looting)
                            OpenCorpsesWhenIdle()
                        if (locations.length > 0) {
                            while (Player.Weight() > Player.MaxWeight()) {
                                Orion.Wait(1000)
                            }
                            LocationLoop()
                        }
                    }
                    if (closest.length > 0) {
                        Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                        Orion.Wait(100)

                        Orion.Print('0x0111', "Attack All")
                        closest.forEach(function (mobile) {
                            Orion.Attack(mobile.Serial())
                            Orion.Wait(50)
                        })

                        Orion.Attack(closest[0].Serial())

                        WalkTo(closest[0])
                        Orion.PrintFast(self, '0x0111', 1, closest[0].Name());


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
    //if target isnt honorable, get one that is
    if (mobile.Hits() != mobile.MaxHits()) {
        var closest = Orion.FindTypeEx(GetMobType(), any, ground,
            'live|ignoreself|ignorefriends|inlos|near', 10, 'gray|criminal|red|enemy')
            .filter(function (mob) {
                return mob.Hits() == mob.MaxHits()
            })
        if (closest.length == 0)
            return
        else
            mobile = closest[0]
    }

    if (mobile != null &&
        !Orion.BuffExists('Honored2') &&
        mobile.Hits() == mobile.MaxHits()) {
        Orion.Print('Can Honor ' + mobile.Properties())
        while (mobile != null && mobile.Distance() > 11 ||
            !mobile.InLOS()) {
            Orion.Wait(100)
        }
        Orion.PrintFast(self, '0x0111', 1, 'Honor');
        Orion.WaitTargetObject(mobile.Serial());
        Orion.AddHighlightCharacter(mobile.Serial(), '0xF550', true);

        Orion.InvokeVirtue('Honor');
    }
}


function CastSpell(spell, target) {
    if (target == null)
        CastSpellOnTarget(spell, self)
    else
        CastSpellOnTarget(spell, target)
}
//#include helpers/DpsGump.js
//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Debug.js

//#include Actions/Automated/BagOfSending.js
