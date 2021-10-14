
function BushKnight() {
    var range = 1;
    Orion.Print(range)
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 1])[1]
    }
    Orion.Print(range)
    Orion.ToggleScript('ActiveCounter', true, []);

    TextWindow.Open();
    while (true) {
        Orion.Wait(200)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());

            Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 16, 'gray|criminal|red|enemy')
                .filter(function (mob) {
                    return !mob.WarMode();
                }).forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    Orion.Wait(50)
                })

            //if(attacker!=null)

            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', range, 'gray|criminal|red|enemy')

            TextWindow.Print('mobs' + entireAreaMobs.length)

            if (attacker == null || attacker.Distance() > 1) {
                Orion.Print('attack new')
                entireAreaMobs.forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    attacker = closemob;
                })
            }
            else {
                Orion.Print('attack last')
                Orion.Attack(attacker.Serial())
            }
            if (attacker != null && attacker.Hits() == 25) {
                Orion.InvokeVirtue('Honor')
                if (Orion.WaitForTarget(2000)) {
                    Orion.TargetObject(attacker.Serial())
                }
            }
            Orion.Wait(50)
            attacker = Orion.FindObject(Orion.ClientLastAttack());
            // if(attacker!=null)
            //   {
            //   if (Player.Mana() > 10 && !Orion.BuffExists('Confidence')) {
            //       Orion.Cast('Confidence');
            //       Orion.Wait(1000);
            //   }
            //  if (Player.Mana() > 10 && !Orion.SpellStatus('Counter Attack') &&
            //      entireAreaMobs.length > 0) {
            //      TextWindow.Print('Counter')
            //      Orion.Cast('Counter Attack');
            //     Orion.Wait(1000);
            //}
            //            if (Orion.SpellStatus('Honorable Execution') &&
            //                (attacker == null || attacker.Hits() > 5)) {
            //                TextWindow.Print("Disabled Honorable Execution")
            //                Orion.Cast('Honorable Execution');
            //                Orion.Wait(200)
            //            }
            //            if (!Orion.SpellStatus('Honorable Execution')
            //                && attacker != null && attacker.Hits() < 5) {
            //                TextWindow.Print("Honorable Execution")
            //                Orion.Cast('Honorable Execution');
            //            }
            if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Lightning Strike') &&
                !Orion.SpellStatus('Honorable Execution') &&
                entireAreaMobs.length == 1
            ) {
                TextWindow.Print("Lightning Strike")
                Orion.Cast('Lightning Strike');
            }
            else if (!Orion.AbilityStatus('Primary') && entireAreaMobs.length > 2) {
                TextWindow.Print("Whirly Whirly")
                Orion.UseAbility('Primary', true);
            }
            else if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Honorable Execution') &&
                !Orion.SpellStatus('Momentum Strike') &&
                entireAreaMobs.length == 2
            ) {
                TextWindow.Print("Momentum Strike")
                Orion.Cast('Momentum Strike');
            }
            if (entireAreaMobs.length > 0) {
                if (Player.Hits() < (Player.MaxHits() / 2) && Player.Mana() > 10 && !Orion.BuffExists('curse weapon') && Orion.ScriptRunning('CastSpell') != 1) {
                    Orion.ToggleScript('CastSpell', true, ['curse weapon']);
                    Orion.Wait(100);
                }
                if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon') && Orion.ScriptRunning('CastSpell') != 1) {
                    Orion.ToggleScript('CastSpell', true, ['consecrate weapon']);
                    Orion.Wait(100);
                }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury') && Orion.ScriptRunning('CastSpell') != 1) {
                    Orion.ToggleScript('CastSpell', true, ['divine fury']);
                    Orion.Wait(100);
                }
            }
        }
    }
}

function BushyArcher() {
    var honorTarget
    var range = 8;
    var attackall = true;
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 2])[1]
    }
    Orion.ToggleScript('AutoHonor', true)
    Orion.Print(!Player.Dead())
    while (!Player.Dead()) {
        while (!Player.WarMode()) {
            Orion.Wait(1000)
        }
        while (Player.WarMode()) {
            Orion.Wait(200);


            var targets = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends|inlos', 12, 'gray|criminal|orange')

            if (attackall) {

                targets.forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    Orion.Wait(20)
                })

            }
            var attacker
            if (Orion.ObjectExists(honorTarget)) {
                Orion.Attack(honorTarget)
                attacker = Orion.FindObject(honorTarget);
            }
            else {
                attacker = Orion.FindObject(Orion.ClientLastAttack());
            }
            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', (range), 'gray|criminal|orange')
                .filter(function (at) {
                    return at.WarMode()
                })

            var mobsAroundAttacker = entireAreaMobs.filter(function (mob) {
                return attacker != null && attacker.Exists() && mob.Exists() && InRange(attacker, mob, 5)
            }).length

            //    if (Orion.SpellStatus('Honorable Execution') &&
            //        (attacker == null || attacker.Hits() > 5)) {
            //        Orion.Print("Disabled Honorable Execution")
            //        Orion.Cast('Honorable Execution');
            //        Orion.Wait(200)
            //    }
            //    if (!Orion.SpellStatus('Honorable Execution')
            //        && attacker != null && attacker.Hits() < 5) {
            //        Orion.Print("Honorable Execution")
            //        Orion.Cast('Honorable Execution');
            //    }
            if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Lightning Strike') &&
                !Orion.SpellStatus('Honorable Execution') &&
                entireAreaMobs.length == 1
            ) {
                if (bow.Graphic() == '0x26C3') {
                    Orion.Print("----DOUBLE SHOT-----")
                    Orion.UseAbility('Primary', true);
                } else {
                    Orion.Print("Lightning Strike")
                    Orion.Cast('Lightning Strike');
                }
            }
            else if (!Orion.AbilityStatus('Primary') && bow.Graphic() == '0x2D2B' && mobsAroundAttacker > 2) {
                Orion.Print("----LIGHTNING ARROW-----")
                Orion.UseAbility('Primary', true);
            }
            else if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Honorable Execution') &&
                !Orion.SpellStatus('Momentum Strike') &&
                entireAreaMobs.length > 2
            ) {
                Orion.Print("Momentum Strike")
                Orion.Cast('Momentum Strike');
            }
            //  Orion.Wait(500)

            if (entireAreaMobs.filter(function (mob) { return mob.Distance() < 12 }).length > 0) {
                if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon')) {
                    CastSpell('consecrate weapon');
                    Orion.Wait(1500);
                }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    CastSpell('divine fury');
                    Orion.Wait(1500);
                }
            }
        }
    }
}

function mobsInArea() {
    TextWindow.Print(Orion.GetStatus(Orion.ClientLastAttack()))
}

function CastSpell(spell) {
    TextWindow.Print(spell);

    Orion.Cast(spell);
    Orion.Wait(1000);
}

function ActiveCounter() {
    while (true) {
        Orion.Wait(100);
        while (Player.WarMode()) {
            Orion.Wait(50);
            if (Player.Mana() > 10 && !Orion.SpellStatus('Counter Attack')) {
                Orion.PrintFast(self, '0x0111', 1, 'Counter');
                Orion.Cast('Counter Attack');
                Orion.Wait(150);
            }
        }
    }
}
//#include helpers/Target.js
//#include Fighting/Tamer.js
//#include Fighting/AutoHonor.js