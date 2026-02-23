var LMC = Player.LMC() / 100
var looting = true
function gtest() {
    var t = Orion.CreateGumpHook('book');
    if (Orion.WaitForContainerGump(5000)) {
        var g = Orion.WaitGump(t)
        Orion.Print(g)
    }
}

function MonitorDeath() {
    while (true) {
        while (!Player.Dead()) {
            Orion.Wait(500)
        }
        BotPush('Dead')
        while (Player.Dead()) {
            Orion.Wait(500)
        }
    }
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

    Orion.Exec('StayMounted', true);
    Orion.Exec('MonitorDeath', true);
    Orion.Exec('StayMounted', true);

}

function StayMounted() {
    while (true) {
        Orion.Wait(3000)
        if (!Orion.BuffExists('No Remount') && Orion.ObjAtLayer('mount') == null && Orion.ClientLastAttack() == 0x00000000) {
            Orion.UseObject(0x400C9752)
            Orion.Wait(3000)

        }
    }
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

function resetMobType() {
    Orion.SetGlobal("mobType", '')
}

var mobType
function GetMobType() {
    if (mobType == null || mobType == '')
        mobType = Orion.GetGlobal("mobType")
    if (mobType == null || parseFloat(Orion.RegRead('totPoints', 'Software\\OrionAssistant\\vars\\' + Player.Name())) > 1)
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
            Orion.Print('Going to next location: ' + currentlocation)
            if (typeof locations[currentlocation] == "string") {
                Orion.Print('Cast SJ: ' + locations[currentlocation])
                Orion.Cast('Sacred Journey', locations[currentlocation])
                Orion.Wait(2000)
            }
            else {
                Orion.Print('Walk to dest')
                WalkTo(locations[currentlocation])
            }
            currentlocation++
            Orion.Wait(3000)
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
    var agroOnce = [];

    function TryCast(spellName, manaCost) {
        if (ManaCheck(manaCost, LMC) && !Orion.SpellStatus(spellName)) {
            Orion.PrintFast(self, '0x0111', 1, spellName);
            CastSpell(spellName);
            return true;
        }
        return false;
    }

    function TryAbility(abilityName, manaCost) {
        if (CanDoAbility(abilityName) && ManaCheck(manaCost, LMC) && !AbilityIsActive(abilityName)) {
            Orion.PrintFast(self, '0x0111', 1, abilityName);
            DoAbility(abilityName);
            return true;
        }
        return false;
    }

    while (true) {
        Orion.Wait(200);

        while (!Player.Dead() && Player.WarMode()) {
            // Find mobs in range
            var mobs = Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|red|enemy');

            var nearby = Orion.FindTypeEx(any, any, ground,
                'live|ignoreself|ignorefriends|inlos', 1, 'gray|criminal|red|enemy');

            // Filter nearby to only those in WarMode
            for (var i = 0; i < nearby.length; i++) {
                if (nearby[i].WarMode()) {
                    mobs.push(nearby[i]);
                }
            }

            if (Orion.BuffExists('heightened senses') && Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|inlos|near', 10, 'gray|criminal|red|enemy').length==0) {
                Orion.Cast('Heighten Senses');
                Orion.Wait(1000);
            }
            // Maintain Heightened Senses buff
            if (!Orion.BuffExists('heightened senses') && Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|inlos|near', 10, 'gray|criminal|red|enemy').length>0) {
                Orion.Cast('Heighten Senses');
                Orion.Wait(1000);
            }

            if (mobs.length === 0) {
                agroOnce = []; // reset if no mobs around
                Orion.Wait(500);
                continue;
            }

            // Determine closest attacker
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack());
            var newAttackerList = Orion.FindTypeEx(GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|inlos|near', 18, 'gray|criminal|red|enemy');
            var newAttacker = newAttackerList.length > 0 ? newAttackerList[0] : null;

            if (!lastAttacker || (newAttacker && newAttacker.Distance() < lastAttacker.Distance())) {
                lastAttacker = newAttacker;
            }

            // Attack mobs
            for (var i = 0; i < mobs.length; i++) {
                var mob = mobs[i];
                if (!mob.WarMode() || agroOnce.indexOf(mob.Serial()) === -1) {
                    Orion.Attack(mob.Serial());
                    Orion.Wait(50);
                    agroOnce.push(mob.Serial());
                }
            }

            // Handle movement and attack of main target
            if (lastAttacker) {
                WalkTo(lastAttacker, 1);
                Orion.Attack(lastAttacker);

                // Counter Attack
                if (TryCast('Counter Attack', 5)) continue;

                // Determine abilities/spells based on mob count
                var mobCount = Orion.FindTypeEx(GetMobType(), any, ground,
                    'live|ignoreself|ignorefriends', 1, 'gray|criminal|red|enemy').length;

                if (mobCount === 1) {
                    if (CanDoAbility('Double Strike')) {
                        var manaCost = 20;
                        if (Orion.InJournal('You attack with lightning speed!', any, any, any, Orion.Now() - 3000)) {
                            manaCost *= 2;
                        }
                        if (TryAbility('Double Strike', manaCost)) continue;
                    } else {
                        if (TryCast('Lightning Strike', 10)) continue;
                    }
                } else if (mobCount > 1) {
                    var whirlwindCost = 15;
                    if (Orion.InJournal('The whirling attack strikes a target!', any, any, any, Orion.Now() - 3000)) {
                        whirlwindCost *= 2;
                    }
                    if (TryAbility('Whirlwind Attack', whirlwindCost)) continue;
                }

                // Curse Weapon if low HP
                if (!Orion.BuffExists('Curse Weapon') && Player.Hits() < Player.MaxHits() * 0.4) {
                    CastSpell('Curse Weapon');
                    continue;
                }

            } else { // No target
                if (Player.Poisoned()) {
                    CastSpell('Cleanse by fire', self);
                } else if (Player.Hits() < Player.MaxHits() * 0.9) {
                    CastSpell('Close Wounds', self);
                }

                Orion.Wait(500);

                // Always try Counter Attack
                if (TryCast('Counter Attack', 5)) continue;

                // Try single-target abilities
                if (CanDoAbility('Double Strike')) {
                    var manaCost = 20;
                    if (Orion.InJournal('You attack with lightning speed!', any, any, any, Orion.Now() - 3000)) {
                        manaCost *= 2;
                    }
                    if (TryAbility('Double Strike', manaCost)) continue;
                } else {
                    if (TryCast('Lightning Strike', 10)) continue;
                }
            }
        }
    }
}



function AISampireSpells() {
    // ===== STATE =====
    var agroOnce = [];
    var currentTarget = null;
    var lastCounter = 0;
    var lastCurseAttempt = 0;

    // ===== CONFIG (tuned to your stats) =====
    var MANA_RECOVERY_PCT = 0.30;
    var PANIC_HP_PCT     = 0.40;
    var SAFE_WW_HP_PCT   = 0.55;
    var CW_HP_PCT        = 0.70;
    var CURSE_COOLDOWN   = 8000; // ms

    function ManaPct() {
        return Player.Mana() / Player.MaxMana();
    }

    function TryCast(spellName, manaCost) {
        if (ManaCheck(manaCost, LMC) && !Orion.SpellStatus(spellName)) {
            Orion.PrintFast(self, '0x0111', 1, spellName);
            CastSpell(spellName);
            return true;
        }
        return false;
    }

    function TryAbility(abilityName, manaCost) {
        if (CanDoAbility(abilityName) && ManaCheck(manaCost, LMC) && !AbilityIsActive(abilityName)) {
            Orion.PrintFast(self, '0x0111', 1, abilityName);
            DoAbility(abilityName);
            return true;
        }
        return false;
    }

    while (true) {
        Orion.Wait(150);
UpdateGump();
        while (!Player.Dead() && Player.WarMode()) {

            var hpPct   = Player.Hits() / Player.MaxHits();
            var manaPct = ManaPct();

            // ===== Maintain Heighten Senses =====
            if (!Orion.BuffExists('Heightened Senses') && Player.Mana() > 15) {
                Orion.Cast('Heighten Senses');
                Orion.Wait(750);
            }

            // ===== Find mobs =====
            var mobs = Orion.FindTypeEx(
                GetMobType(), any, ground,
                'live|ignoreself|ignorefriends|inlos',
                18, 'gray|criminal|red|enemy'
            );

            if (mobs.length === 0) {
                // reset agro if nothing is around
                agroOnce = [];
                currentTarget = null;
                Orion.Wait(300);
                continue;
            }

            // ===== Target lock (pick closest mob) =====
            if (!currentTarget || currentTarget.Dead() || currentTarget.Distance() > 6) {
				var closestMob = null;
				for (var i = 0; i < mobs.length; i++) {
				    var mob = mobs[i];
				    if (!closestMob || mob.Distance() < closestMob.Distance()) {
				        closestMob = mob;
				    }
				}
				currentTarget = closestMob;
            }

            // ===== Aggro newly spotted mobs =====
            for (var i = 0; i < mobs.length; i++) {
                var mobSerial = mobs[i].Serial();
                if (agroOnce.indexOf(mobSerial) === -1) {
                    Orion.Attack(mobs[i]);
                    agroOnce.push(mobSerial);
                }
            }

            // ===== Clean up dead mobs from agro list =====
				var newAgro = [];
				for (var i = 0; i < agroOnce.length; i++) {
				    var serial = agroOnce[i];
				    var obj = Orion.FindObject(serial);
				    if (obj && !obj.Dead()) {
				        newAgro.push(serial);
				    }
				}
				agroOnce = newAgro;
            // ===== Move to and attack current target =====
            if (currentTarget) {
                WalkTo(currentTarget, 1);
                Orion.Attack(currentTarget);
            }

            var mobCount = mobs.length;

            // ===== Poison handling =====
            if (Player.Poisoned()) {
                CastSpell('Cleanse by fire', self);
                continue;
            }

            // ===== Curse Weapon (reagent + cooldown protected) =====
            if (!Orion.BuffExists('Curse Weapon') && Orion.Now() - lastCurseAttempt > CURSE_COOLDOWN) {
                if (!Orion.InJournal('You lack', any, any, any, Orion.Now() - 2000)) {
                    if (hpPct < CW_HP_PCT || mobCount > 1) {
                        CastSpell('Curse Weapon');
                        lastCurseAttempt = Orion.Now();
                        continue;
                    }
                } else {
                    lastCurseAttempt = Orion.Now() + 15000; // back off on reagent failure
                }
            }

            // ===== Mana recovery mode =====
            if (manaPct < MANA_RECOVERY_PCT) {
                TryCast('Lightning Strike', 10);
                continue;
            }

            // ===== Counter Attack (cooldown protected) =====
            if (Orion.Now() - lastCounter > 2000) {
                if (TryCast('Counter Attack', 5)) {
                    lastCounter = Orion.Now();
                    continue;
                }
            }

            // ===== Main combat logic =====
            var usingWeaponAbility = false;

            if (mobCount === 1) {
                // Single target
                if (CanDoAbility('Double Strike')) {
                    var dsCost = 20;
                    if (Orion.InJournal('You attack with lightning speed!', any, any, any, Orion.Now() - 3000)) {
                        dsCost *= 2;
                    }
                    if (ManaCheck(dsCost, LMC)) {
                        TryAbility('Double Strike', dsCost);
                        usingWeaponAbility = true;
                    }
                }

                if (!usingWeaponAbility) {
                    TryCast('Lightning Strike', 10);
                }

            } else if (mobCount > 1 && hpPct > SAFE_WW_HP_PCT) {
                // Multiple mobs
                var wwCost = 15;
                if (Orion.InJournal('The whirling attack strikes a target!', any, any, any, Orion.Now() - 3000)) {
                    wwCost *= 2;
                }
                if (ManaCheck(wwCost, LMC)) {
                    TryAbility('Whirlwind Attack', wwCost);
                    usingWeaponAbility = true;
                }
            }

            // ===== Panic heal =====
            if (hpPct < PANIC_HP_PCT && !Player.Poisoned()) {
                CastSpell('Close Wounds', self);
            }
        }
    }
}


function TargetClosest() {
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
            //Orion.Wait(200)
            var lastAttacker = Orion.FindObject(Orion.ClientLastAttack())
            if (lastAttacker != null)
                pathDistance = Orion.GetPathArray(lastAttacker.X(), lastAttacker.Y(), lastAttacker.Z()).length
            else
                pathDistance = 0
            if (lastAttacker == null || lastAttacker.Serial() == 0x00000000 || !lastAttacker.InLOS() || lastAttacker.Distance() < (pathDistance - 10) || pathDistance == 0) {
                Orion.Wait(200)
                var closest = GetEnemiesInArea(15)

                if (closest.length == 0) {
                    Orion.Print('no enemy')

                    Orion.PrintFast(self, '0x0111', 1, 'Loot');
                    if (looting)
                        OpenCorpsesWhenIdle()
                    if (locations.length > 0) {
                        while (Player.Weight() > Player.MaxWeight()) {
                            Orion.Wait(1000)
                            Orion.PrintFast(self, '0x0111', 1, 'Full bag');
                        }
                        LocationLoop()
                    }
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
            Orion.Wait(200)
        }
        Orion.PrintFast(self, '0x0111', 1, 'Honor');
        Orion.WaitTargetObject(mobile.Serial());
        Orion.AddHighlightCharacter(mobile.Serial(), '0xF550', true);

        Orion.InvokeVirtue('Honor');
        Orion.Wait(200)
        Orion.CancelTarget()
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


// ============================
// AISampire Optimized Script
// Orion JavaScriptCore Compatible
// Targeting fix applied
// ============================

var AISampire = {
    agroOnce: [],
    currentTarget: null,
    lastCastTimes: { curse: 0, counter: 0 },
    config: {
        MANA_RECOVERY_PCT: 0.30,
        PANIC_HP_PCT: 0.40,
        SAFE_WW_HP_PCT: 0.55,
        CW_HP_PCT: 0.70,
        CURSE_COOLDOWN: 8000
    },
    settings: {
        autoSpells: true,
        autoAbilities: true,
        autoHeal: true
    }
};

// ============================
// GUMP
// ============================
function createSampireGump() {
    var gump = Orion.CreateCustomGump(30001);
    gump.Clear();
    gump.AddResizepic(0, 0, '0x9C4B', 200, 150);

    gump.AddCheckbox(1, 20, 20, '0x2342', '0x2343', '0x2343', AISampire.settings.autoSpells ? 1 : 0, '0', 'Auto Spells', '0x0033');
    gump.AddCheckbox(2, 20, 50, '0x2342', '0x2343', '0x2343', AISampire.settings.autoAbilities ? 1 : 0, '0', 'Auto Abilities', '0x0033');
    gump.AddCheckbox(3, 20, 80, '0x2342', '0x2343', '0x2343', AISampire.settings.autoHeal ? 1 : 0, '0', 'Auto Heal', '0x0033');

    gump.Update();
}

// ============================
// UTILITY FUNCTIONS
// ============================

function ManaPct() {
    return Player.Mana() / Player.MaxMana();
}

function TryCast(spellName, manaCost) {
    if (Player.Mana() >= manaCost && !Orion.SpellStatus(spellName)) {
        Orion.PrintFast(self, '0x0111', 1, spellName);
        CastSpell(spellName);
        return true;
    }
    return false;
}

function TryAbility(abilityName, manaCost) {
    if (CanDoAbility(abilityName) && Player.Mana() >= manaCost && !AbilityIsActive(abilityName)) {
        Orion.PrintFast(self, '0x0111', 1, abilityName);
        DoAbility(abilityName);
        return true;
    }
    return false;
}

// ============================
// TARGETING FUNCTIONS
// ============================

function getClosestTarget(mobs) {
    var validMobs = [];
    for (var i = 0; i < mobs.length; i++) {
        var mob = mobs[i];
        if (!mob.Dead() && mob.Distance() <= 18) {
            var name = mob.Name().toLowerCase();
            if (name.indexOf("energy vortex") === -1 && name.indexOf("colossus") === -1) {
                validMobs.push(mob);
            }
        }
    }
    if (validMobs.length === 0) return null;

    var closest = validMobs[0];
    for (var j = 1; j < validMobs.length; j++) {
        if (validMobs[j].Distance() < closest.Distance()) closest = validMobs[j];
    }
    return closest;
}

// Check for mobs within 1 tile
function getNearbyTarget() {
    var mobs = Orion.FindTypeEx(GetMobType(), any, ground, 'live|ignoreself|ignorefriends|inlos', 1, 'gray|criminal|red|enemy');
    if (mobs.length > 0) return mobs[0]; // attack first nearby mob
    return null;
}

// ============================
// MAIN LOOP
// ============================
function AISampireLoop() {
    createSampireGump();

    while (!Player.Dead()) {
        Orion.Wait(150);

        var hpPct = Player.Hits() / Player.MaxHits();
        var manaPct = ManaPct();

        // Buff Heightened Senses
        if (!Orion.BuffExists('Heightened Senses') && Player.Mana() > 15)
            Orion.Cast('Heighten Senses');

        // Always check nearby 1-tile mobs first
        var nearby = getNearbyTarget();
        if (nearby) {
            Orion.Attack(nearby.Serial());
            AISampire.currentTarget = nearby;
            continue;
        }

        // Find all mobs in range
        var mobs = Orion.FindTypeEx(GetMobType(), any, ground, 'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|red|enemy');
        if (mobs.length === 0) {
            AISampire.agroOnce = [];
            AISampire.currentTarget = null;
            continue;
        }

        // Pick closest valid target
        AISampire.currentTarget = getClosestTarget(mobs);
        if (AISampire.currentTarget) {
            Orion.Attack(AISampire.currentTarget.Serial());
            WalkTo(AISampire.currentTarget, 1);
        }

        // Aggro new mobs
        for (var i = 0; i < mobs.length; i++) {
            var m = mobs[i];
            if (AISampire.agroOnce.indexOf(m.Serial()) === -1) {
                Orion.Attack(m.Serial());
                AISampire.agroOnce.push(m.Serial());
            }
        }

        // Clean dead mobs from agro
        var newAgro = [];
        for (var j = 0; j < AISampire.agroOnce.length; j++) {
            var s = AISampire.agroOnce[j];
            var mobObj = Orion.FindObject(s);
            if (mobObj && !mobObj.Dead()) newAgro.push(s);
        }
        AISampire.agroOnce = newAgro;

        // Poison
        if (Player.Poisoned()) CastSpell('Cleanse by fire', self);

        // Curse Weapon
        if (!Orion.BuffExists('Curse Weapon') && Orion.Now() - AISampire.lastCastTimes.curse > AISampire.config.CURSE_COOLDOWN) {
            if (hpPct < AISampire.config.CW_HP_PCT || mobs.length > 1) {
                CastSpell('Curse Weapon');
                AISampire.lastCastTimes.curse = Orion.Now();
            }
        }

        // Mana recovery
        if (AISampire.settings.autoSpells && manaPct < AISampire.config.MANA_RECOVERY_PCT) {
            TryCast('Lightning Strike', 10);
            continue;
        }

        // Counter Attack
        if (Orion.Now() - AISampire.lastCastTimes.counter > 2000) {
            if (TryCast('Counter Attack', 5)) {
                AISampire.lastCastTimes.counter = Orion.Now();
                continue;
            }
        }

        // Combat logic
        if (AISampire.settings.autoAbilities) {
            if (mobs.length === 1) {
                if (CanDoAbility('Double Strike') && Player.Mana() >= 20) {
                    TryAbility('Double Strike', 20);
                } else {
                    TryCast('Lightning Strike', 10);
                }
            } else if (mobs.length > 1 && hpPct > AISampire.config.SAFE_WW_HP_PCT) {
                if (CanDoAbility('Whirlwind Attack') && Player.Mana() >= 15) {
                    TryAbility('Whirlwind Attack', 15);
                }
            }
        }

        // Panic heal
        if (AISampire.settings.autoHeal && hpPct < AISampire.config.PANIC_HP_PCT && !Player.Poisoned()) {
            CastSpell('Close Wounds', self);
        }
    }
}

// ============================
// START SCRIPT
// ============================
Orion.Print("AISampire script started.");
AISampireLoop();




//#include helpers/TotDropGump.js
//#include helpers/DpsGump.js
//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Debug.js
//#include helpers/Notifier.js

//#include helpers/Looter.js
//#include Actions/Automated/BagOfSending.js
//#include helpers/Generic.js
//#include helpers/ItemManager.js
//#include helpers/Teleporter.js