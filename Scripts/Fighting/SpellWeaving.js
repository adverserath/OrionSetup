function KillTargetWithWoD(enemy) {
    while (enemy != null && enemy.Exists() && !enemy.Dead()) {
        if (enemy.Distance() <= 10 && enemy.inLOS() && !Orion.IsWalking() && !Player.Frozen() && ReadyForWod(enemy)) {
            Orion.Cast('Word Of Death')
            Orion.WaitTargetObject('serial', relativeTargetDistance);
            if (Orion.WaitForTarget(4000)) {
                while (!enemy.Distance() <= 10 || !enemy.inLOS()) {
                    Orion.Wait(300)
                }
                Orion.TargetObject(enemy.Serial());
                Orion.Wait(1000)
            }
        }
    }

}

function GetArcaneLevel() {
    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()
    return (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
}

function ReadyForWod(enemy) {
    return enemy.Hits() < (parseInt(0.05 * GetArcaneLevel() * 25))
}

function CastWOD() {
    var lastUpdate = Orion.Now()

    while (true) {
        var focus = Orion.FindTypeEx('0x3155')
            .filter(function (gem) {
                return gem.Properties().indexOf('Strength Bonus') != -1
            }).shift()

        var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
        //    var timeleft = (focus.Properties().match(/Lifespan:\s(\d*)/i) || [])[1] || 0;

        //     if (timeleft < 1000 && (Orion.Now() - lastUpdate) > 60000) {
        //         lastUpdate = Orion.Now()
        //         var minutes = parseInt(timeleft / 60)
        //         Orion.Print('Gem has ' + minutes + ' minutes left')
        //     }
        var target = Orion.ClientLastAttack();
        var enemy = Orion.FindObject(target)

        while (Player.WarMode() && enemy != null && enemy.Exists() && enemy.Distance() < 10) {
            Orion.Wait(500)
            if (enemy.Hits() < (parseInt(0.05 * gemstr * 25) + 1)) {

                Orion.Cast('Word Of Death')
                if (Orion.WaitForTarget(4000)) {
                    while (enemy.Exists() && enemy.Hits() > (parseInt(0.05 * gemstr * 25))) {

                        Orion.Print('waiting')
                    }
                    Orion.Print('casting')
                    Orion.TargetObject(enemy.Serial());
                    Orion.Wait(1000)
                }

            }
        }
        Orion.Wait(1000)
    }
}

function WoDKills() {
    while (true) {
        var focus = Orion.FindTypeEx('0x3155')
            .filter(function (gem) {
                return gem.Properties().indexOf('Strength Bonus') != -1
            }).shift()

        var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
        var hitmarker = parseInt(0.05 * gemstr * 25)


        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 10, 'gray|criminal|orange|red')
            .filter(function (enemy) {
                return enemy.Exists() && enemy.Hits() < (hitmarker + 4)
            })
        entireAreaMobs.forEach(function (mob) {
            Orion.AddHighlightCharacter(mob.Serial(), '0x0161');
        })
        if (entireAreaMobs.length > 0 && Player.WarMode()) {
            Orion.Cast('Word Of Death')
            if (Orion.WaitForTarget(4000)) {

                while (!Orion.WaitWhileTargeting(500)) {
                    Orion.Print('wait')
                    var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                        'nothumanmobile|live|ignoreself|ignorefriends', 10, 'gray|criminal|orange')
                        .filter(function (enemy) {
                            return enemy.Exists() && enemy.Hits() < (hitmarker)
                        })
                    Orion.Print('targets:' + entireAreaMobs.length)
                    entireAreaMobs.forEach(function (mob) {
                        Orion.AddHighlightCharacter(mob.Serial(), '0x01A1');
                    })

                    if (entireAreaMobs.length > 0) {
                        Orion.TargetObject(entireAreaMobs.shift().Serial())
                    }
                }
            }
        }
        Orion.Wait(500)
    }
}

var WoDReds = true
function SpellWeavingKills() {
    ReleaseAllSummons()
    Orion.Wait(1000)

    var summoned = false
    var timer = Orion.Now()
    var castSummons = Player.Followers() != 5
    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()

    var gemstr = parseInt((focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0);
    var hitmarker = parseInt(0.05 * gemstr * 25)

    while (true) {
        if (summoned == true) {
            ReleaseAllSummons()
            summoned = false;
            Orion.Wait(1000)
        }
        Orion.Wait(300)

        while (Player.WarMode()) {
            if (castSummons && Player.Followers() < 4) {//&& Orion.ClientLastAttack() != '0x00000000'
                Cast('Summon Fey')
                Orion.Say('All guard')
                summoned = true
            }

            if (Player.Mana() > 40 && !Orion.BuffExists('Arcane Empowerment') && Orion.ClientLastAttack() != '0x00000000') {
                Cast('Arcane Empowerment')
                continue;
            }

            var allTargets = Orion.FindTypeEx(any, any, ground,
                'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|orange|red')

            if (allTargets.filter(function (mob) { return mob.Distance() <= 4 }).length > 3) {
                Cast('Wither')
                continue;
            }

            var fireTargets = allTargets.filter(function (mob) { return mob.Distance() <= (5 + gemstr) })

            if (fireTargets.length > 6 && timer < Orion.Now()) {
                timer = Orion.Now() + 1000
                fireTargets.forEach(function (mob) {
                    Orion.Print(mob.Name());
                    Orion.AddHighlightCharacter(mob.Serial(), '0x0161');
                })
                fireTargets.sort(function (mobA, mobB) {
                    return mobA.Distance() - mobB.Distance()
                });
                Cast('Wildfire', fireTargets[parseInt(fireTargets.length / 2)].Serial())
                continue;
            }

            var thunderTargets = allTargets.filter(function (mob) { return mob.Distance() <= (3 + gemstr) })
            if (thunderTargets.length > 3) {
                Cast('Thunderstorm')
                continue;
            }

            //WOD
            var wodTargets = allTargets.filter(function (mob) {
                if (WoDReds)
                    return mob.Distance() <= (10) && mob.Notoriety() == 6
                return mob.Distance() <= (10)
            })
                .filter(function (enemy) {
                    return enemy.Exists() &&
                        enemy.Hits() < (hitmarker) &&
                        !Orion.Contains(enemy.Properties(), 'Legacy')
                })

            if (wodTargets.length > 0) {
                Cast('Word Of Death', wodTargets.shift().Serial())
                continue;
            }
            if (Orion.SkillValue('Magery') > 600 && Orion.SkillValue('Evaluating Intelligence') > 600)
                if (Player.Mana() > 70) {
                    var fsTargets = allTargets.filter(function (mob) { return mob.Distance() <= (10) })
                    if (fsTargets.length > 0) {
                        Cast('Energy Bolt', fsTargets.shift().Serial())
                        continue;
                    }
                }

            Orion.Wait(500)
        }
    }
}

function SmartHealer() {
    
    Orion.Print('SmartHealer')
    var targets = Orion.FindTypeEx(any, any, ground, 'nothuman', 10, 'green').filter(function (_) { return Orion.Contains(_.Properties(), 'bonded') })
    targets.push(Orion.FindObject(self))
    Orion.PartyMembers().forEach(function (party) {
        var partyGuy = Orion.FindObject(party)
        if (partyGuy != null)
            targets.push(partyGuy)
    })
    targets.sort(function (patientA, patientB) {
        return (patientA.Hits() / patientA.MaxHits()) - (patientB.Hits() / patientB.MaxHits())
    })
        .forEach(function (patient) {
            Orion.Print(patient.Name())

            if (patient != null && !Player.Paralyzed() && patient.Hits() < (patient.MaxHits() - 5)) {
                if (!Player.Frozen()) {
                    if (Orion.SkillValue('Magery') > 500 && patient != null && patient.Poisoned()) {
                        Orion.CastTarget('Arch Cure', patient.Serial());
                    }
                    // else if (Orion.SkillValue('Spellweaving') > 300 && patient != null && !patient.Dead() && patient.Hits() < (patient.MaxHits() - 10) && gorTime < (Orion.Now() - 60000)) {
                    //     Orion.CastTarget('Gift of renewal', patient.Serial())
                    //     gorTime = Orion.Now()
                    // }
                    else if (Orion.SkillValue('Magery') > 300 && patient != null && !patient.Poisoned() && !patient.Dead() && patient.Hits() < (patient.MaxHits() - 5)) {
                        Orion.CastTarget('Greater Heal', patient.Serial());

                    }
                    else if (Orion.SkillValue('Magery') > 90 && patient.Dead() && patient.Distance() <= 1) {
                        Orion.CastTarget('Resurrection', patient.Serial());
                    }
                }
                Orion.Wait(300);
            }
        })

}

function SmartWither() {
    Orion.Print('SmartWither')
    var allTargets = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|orange|red')
    var mobsInRange = allTargets.filter(function (mob) { return mob.Distance() <= 4 }).length
    if (mobsInRange > 2) {
        Orion.Print('Targets:' + mobsInRange)
        Orion.Cast('*', 'Wither');
    }
    else {
        Orion.Print('Not enough Targets')
    }

}

function SmartThunderstorm() {
    Orion.Print('SmartThunderStorm')
    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()

    var gemstr = parseInt((focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0);

    var allTargets = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|orange|red')
    var thunderTargets = allTargets.filter(function (mob) { return mob.Distance() <= (3 + gemstr) })
    if (thunderTargets.length > 0) {
        Orion.Print('Targets:' + thunderTargets.length)

        Orion.Cast('Thunderstorm');
        Orion.Wait(150)
    }
    else {
        Orion.Print('Not enough Targets')
    }
}

function SmartWildfire() {
    Orion.Print('SmartWildfire')
    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()

    var gemstr = parseInt((focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0);

    var allTargets = Orion.FindTypeEx(any, any, ground,
        'live|ignoreself|ignorefriends|inlos', 18, 'gray|criminal|orange|red')
    var fireTargets = allTargets.filter(function (mob) { return mob.Distance() <= (5 + gemstr) })

    if (fireTargets.length > 0) {
        Orion.Print('Targets:' + fireTargets.length)
        var furthest = fireTargets.sort(function (mobA, mobB) {
            return mobB.Distance() - mobA.Distance()
        })
        Orion.AddHighlightCharacter(furthest[0].Serial(), '0x0161');
        Orion.Print(furthest[0].Serial() + '   ' + furthest[0].Distance())
        Orion.CastTarget('Wildfire', furthest[0].Serial());
        Orion.Wait(150)
    }
    else {
        Orion.Print('Not enough Targets')
    }

}


function SmartWoD() {
    Orion.Print('SmartWoD')
    //Word Of Death on last attacker or weakest target

    var focus = Orion.FindTypeEx('0x3155')
        .filter(function (gem) {
            return gem.Properties().indexOf('Strength Bonus') != -1
        }).shift()

    var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
    var hitmarker = parseInt(0.05 * gemstr * 25)
    Orion.Print('Getting targets under:' + (parseInt(0.05 * gemstr * 100)) + '%')
    var attacker = Orion.FindObject(Orion.ClientLastAttack())
    var target = null
    if (attacker != null && attacker.Hits() < hitmarker) {
        Orion.Print('Last Target')
        target = attacker
    }
    else {
        Orion.Print('Find Target')

        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red')
            .filter(function (enemy) {
                return !Orion.Contains(enemy.Properties(), 'Legacy')
                    && !Orion.Contains(enemy.Properties(), 'Loyalty')
                    && enemy.Hits() <= hitmarker && enemy.Hits() > 0
            })

        entireAreaMobs.forEach(function (mob) {
            Orion.AddHighlightCharacter(mob.Serial(), '0x0161');
        })
        Orion.Print('all targets:' + entireAreaMobs.length)
        target = entireAreaMobs.shift()
    }

    if (target != null)
        Orion.CastTarget('Word Of Death', target.Serial());

}
//#include helpers/Magic.js
//#include helpers/Movement.js
