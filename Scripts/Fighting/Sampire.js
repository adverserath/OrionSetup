var LMC = Player.LMC() / 100
var looting = true

function ShowJ() {
    Orion.ShowJournal();
}
function OpenMyCorpse() {
    Orion.FindTypeEx('0x2006', any, ground, 'item', 40).filter(function (corpse) {
        return Orion.Contains(corpse.Properties(), Player.Name())
    }).forEach(function (corpse) {
        WalkTo(corpse)
        Orion.Wait(100)
        Orion.UseObject(corpse.Serial())
    })

}
function ToggleJustParagons() {
    Orion.SetGlobal("justParagons", true)
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

function OpenCorpsesWhenIdle(_) {

    Orion.FindTypeEx('0x2006', any, ground, 'item|inlos', 25)
        .filter(function (corpse) {
            return looted.indexOf(corpse.Serial()) == -1
        })
        .sort(function (t1, t2) {
            return t1.Distance() - t2.Distance()
        })
        .forEach(function (corpse) {
            Orion.Print('looting ' + corpse.Name())
            if (!Player.Dead() && GetEnemiesInArea().length == 0) {
                Orion.AddHighlightCharacter(corpse.Serial(), '0x084C');

                Orion.PrintFast(corpse.Serial(), '0x0111', 1, 'Looting');
                WalkTo(corpse.Serial(), 1, 8000)
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
    var targetColor = any
    if (Orion.GetGlobal("justParagons")) {
        Orion.Print('Killing Paragons')
        targetColor = '0x0501'
    }

    if (Player.Poisoned() || Player.Hits() < Player.Hits() / 2) {
        Orion.Print('Need to heal')
        return;
    }
    else {
        var mobCount = Orion.FindTypeEx(GetMobType(), targetColor, ground,
            'live|ignoreself|ignorefriends|inlos', 6, 'gray|criminal|red|enemy').length
        Orion.Print('Count = ' + mobCount)
        Orion.Print('Checking next location')

        if (currentlocation >= locations.length)
            currentlocation = 0;

        if (mobCount == 0 && locations.length > currentlocation) {
            Orion.Print('Going to next location')
            WalkTo(locations[currentlocation++])

            //Find Next Target Far away

            var farMobs = Orion.FindTypeEx(GetMobType(), targetColor, ground,
                'live|ignoreself|ignorefriends|inlos', 30, 'gray|criminal|red|enemy')
            if (farMobs.length > 0) {
                Orion.Print(56, 'Far mobs = ' + farMobs.length)
                //WalkTo(farMobs[0])
            }
        }

    }
}

function SampireSpells() {
    var spellName = ""
    while (true) {
        Orion.Wait(500)
        while (!Player.Dead() && Player.WarMode()) {
            var allMobsLength = Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends', 18, 'gray|criminal|red|enemy').length

            if (allMobsLength == 0) {
                Orion.Wait(1000)
                continue;
            }
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())
            if (lastAttacker != null) {
                Orion.Wait(200)
                //Counter Attack
                spellName = "Counter Attack"
                if (ManaCheck(5, LMC) && !Orion.SpellStatus(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                    continue
                }

                //Ability
                var mobsCount = Orion.FindTypeEx(GetMobType(), any, ground,
                    'live|ignoreself|ignorefriends', 1, 'gray|criminal|red|enemy').length
                if (mobsCount == 1) {
                    if (CanDoAbility('Double Strike')) {
                        spellName = "Double Strike"
                        var manaCost = 20
                        if (Orion.InJournal('You attack with lightning speed!', any, any, any, Orion.Now() - 3000)) {
                            manaCost *= 2
                        }
                        if (CanDoAbility(spellName) && ManaCheck(manaCost, LMC) && !AbilityIsActive(spellName)) {
                            Orion.PrintFast(self, '0x0111', 1, spellName);
                            DoAbility(spellName)
                            continue
                        }
                    }
                    else {
                        spellName = "Lightning Strike"
                        if (ManaCheck(10, LMC) && !Orion.SpellStatus(spellName)) {
                            Orion.PrintFast(self, '0x0111', 1, spellName);
                            CastSpell(spellName)
                            continue
                        }
                    }
                }
                else if (mobsCount > 1) {
                    spellName = "Whirlwind Attack"
                    var manaCost = 15
                    if (Orion.InJournal('The whirling attack strikes a target!', any, any, any, Orion.Now() - 3000)) {
                        manaCost *= 2
                    }
                    if (CanDoAbility(spellName) && ManaCheck(manaCost, LMC) && !AbilityIsActive(spellName)) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        DoAbility(spellName)
                        continue
                    }
                }

                //Divine Fury
                spellName = "Divine Fury"
                if (ManaCheck(15, LMC) && !Orion.BuffExists(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                    continue
                }
                //Consecrate Weapon
                spellName = "Consecrate Weapon"
                if (ManaCheck(10, LMC) && !Orion.BuffExists(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                }

                //Curse Weapon
                spellName = "Curse Weapon"
                if (!Orion.BuffExists('Curse Weapon')
                    && Player.Hits() < Player.MaxHits() * 0.4) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                    continue
                }

            } //Has Target
            else {
                if (Player.Poisoned()) {
                    CastSpell('Cleanse by fire', self)
                } else if (Player.Hits() < Player.MaxHits() * 0.9) {
                    CastSpell('Close Wounds', self)
                }

                Orion.Wait(500)

                spellName = "Counter Attack"
                if (ManaCheck(5, LMC) && !Orion.SpellStatus(spellName)) {
                    Orion.PrintFast(self, '0x0111', 1, spellName);
                    CastSpell(spellName);
                    continue
                }

                if (CanDoAbility('Double Strike')) {
                    spellName = "Double Strike"
                    var manaCost = 20
                    if (Orion.InJournal('You attack with lightning speed!', any, any, any, Orion.Now() - 3000)) {
                        manaCost *= 2
                    }
                    if (CanDoAbility(spellName) && ManaCheck(manaCost, LMC) && !AbilityIsActive(spellName)) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        DoAbility(spellName)
                        continue
                    }
                }
                else {
                    spellName = "Lightning Strike"
                    if (ManaCheck(10, LMC) && !Orion.SpellStatus(spellName)) {
                        Orion.PrintFast(self, '0x0111', 1, spellName);
                        CastSpell(spellName)
                        continue
                    }
                }

            }
        }  //while war
    } //while true
}

function TargetClosest(_) {
    var targetColor = any
    if (Orion.GetGlobal("justParagons")) {
        Orion.Print('Killing Paragons')
        targetColor = '0x0501'
    }

    SetLocations()
    while (true) {
        Orion.Wait(3000)
        Orion.Print('Not fighting')
        var pathDistance
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(200)
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())
            if (lastAttacker != null)
                pathDistance = Orion.GetPathArray(lastAttacker.X(), lastAttacker.Y(), lastAttacker.Z()).length
            else
                pathDistance = 0
            if (lastAttacker == null || !lastAttacker.InLOS() || lastAttacker.Distance() < (pathDistance - 10) || pathDistance == 0) {
                Orion.Print('no enemy')
                Orion.Wait(300)
                var closest = Orion.FindTypeEx(GetMobType(), targetColor, ground,
                    'live|ignoreself|ignorefriends', 1, 'gray|criminal|red|enemy')

                if (closest.length > 0) {
                    Orion.Exec('HonorSampire', true, [closest[0].Serial()]);
                    Orion.Wait(100)
                    Orion.Attack(closest[0].Serial())
                    Orion.PrintFast(self, '0x0111', 1, closest[0].Name());
                }
                else {
                    closest = GetEnemiesInArea(10)

                    //.filter(function (mob){
                    //                    var walkDist = Orion.GetPathArray(mob.X(), mob.Y(), mob.Z()).length
                    //                    return mob.Distance() < (walkDist - 10) || (walkDist == 0 && mob.Distance()!=0)
                    //                    })

                    closest.sort(function (mobA, mobB) {
                        return mobA.Distance() - mobB.Distance()
                    });

                    //if (closest.filter(function (mob) { return !mob.WarMode() }).length == 0) {
                    if (closest.length == 0) {
                        Orion.PrintFast(self, '0x0111', 1, 'Loot');
                        if (looting)
                            OpenCorpsesWhenIdle()
                        if (locations.length > 0) {
                            while (Player.Weight() > Player.MaxWeight()) {
                                Orion.Wait(1000)
                            }
                            closest = GetEnemiesInArea()
                            if (closest.length == 0)
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

                        if (!WalkTo(closest[0])) {
                            Orion.Ignore(closest[0].Serial())
                        }
                        Orion.PrintFast(self, '0x0111', 1, closest[0].Name());


                    }
                }
            }
            else {
                Orion.Print('Fight current')
                var mob = Orion.FindObject(Orion.ClientLastAttack())
                if (mob != null && mob.Distance() > 1) {
                    if (!WalkTo(mob, 1, 6000)) {
                        Orion.Ignore(closest[0].Serial())
                    }
                }
                if (mob != null) {
                    Orion.Wait(300)
                }
            }
        }
    }
}

function ShowLoS() {
    while (true) {
        Orion.Wait(100)
        Orion.ClearHighlightCharacters();
        Orion.FindTypeEx(any, any, ground,
            'live|ignoreself|ignorefriends|inlos', 30, 'gray|criminal|red|enemy')
            .forEach(function (mob) {
                Orion.AddHighlightCharacter(mob.Serial(), 0x0146);
            })
    }
}
function GetEnemiesInArea(distance) {
    if (distance == null)
        distance = 20
    var mobs = Orion.FindTypeEx(GetMobType(), any, ground,
        'live|ignoreself|ignorefriends|inlos', distance, 'gray|criminal|red|enemy')
        .concat(Orion.FindTypeEx(any, any, ground,
            'live|ignoreself|ignorefriends|inlos', distance + 5, 'gray|criminal|red|enemy')
            .filter(function (mob) { return mob.WarMode() }))

    mobs.forEach(function (mob) {
        Orion.AddHighlightCharacter(mob.Serial(), 59);
    })
    return mobs
}
function HonorSampire(mobileSerial) {
    var mobile = Orion.FindObject(mobileSerial);
    //if target isnt honorable, get one that is
    if (mobile.Hits() != mobile.MaxHits()) {
        var closest = Orion.FindTypeEx(GetMobType(), any, ground,
            'live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|red|enemy')
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

function CanDoAbility(abilityName) {
    return Orion.GetCurrentAbilityNames().indexOf(abilityName) > -1
}

function AbilityIsActive(abilityName) {
    var index = Orion.GetCurrentAbilityNames().indexOf(abilityName)
    if (index == 0) {
        return Orion.AbilityStatus('Primary')
    }
    else if (index == 1) {
        return Orion.AbilityStatus('Secondary')
    }
    else {
        return false
    }
}

function DoAbility(abilityName) {
    Orion.PrintFast(self, '0x0111', 1, 'Using ' + abilityName);
    var index = Orion.GetCurrentAbilityNames().indexOf(abilityName)
    if (index == 0) {
        Orion.UseAbility('Primary', true)
        Orion.Wait(300)
    }
    else if (index == 1) {
        Orion.UseAbility('Secondary', true)
        Orion.Wait(300)
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
//#include helpers/Looter.js
//#include Actions/Automated/BagOfSending.js
