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

            if (!Orion.BuffExists('Arcane Empowerment') && Orion.ClientLastAttack() != '0x00000000') {
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
            if(WoDReds)
            	return mob.Distance() <= (10) && mob.Notoriety()==6
            return mob.Distance() <= (10)})
                .filter(function (enemy) {
                    return enemy.Exists() &&
                        enemy.Hits() < (hitmarker) &&
                        !Orion.Contains(enemy.Properties(), 'Legacy')
                })

            if (wodTargets.length > 0) {
                Cast('Word Of Death', wodTargets.shift().Serial())
                continue;
            }

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



//#include helpers/Magic.js
//#include helpers/Movement.js
