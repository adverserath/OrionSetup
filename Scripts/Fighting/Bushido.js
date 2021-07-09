//#include Scripts/helpers/Target.js
//#include Tamer.js

function BushKnight() {
    var range = 1;
    Orion.Print(range)
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 1])[1]
    }
    Orion.Print(range)

    TextWindow.Open();
    while (true) {
        Orion.Wait(200)
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(500);

            Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 16, 3)
                .filter(function (mob) {
                    return mob.Notoriety() >= 3
                        && mob.Notoriety() < 7
                        && !mob.WarMode();
                }).forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    Orion.Wait(50)
                })

            var attacker = Orion.FindObject(Orion.ClientLastAttack());
            //if(attacker!=null)

            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', range, 3)
                .filter(function (mob) {
                    return mob.Notoriety() >= 3
                        && mob.Notoriety() < 7;
                });

            Orion.Print('mobs' + entireAreaMobs.length)

            if (attacker == null || attacker.Distance() > 1) {
                Orion.Print('attack new')
                entireAreaMobs.forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                })
            }
            else {
                Orion.Print('attack last')
                Orion.Attack(attacker.Serial())
            }
            Orion.Wait(50)
            attacker = Orion.FindObject(Orion.ClientLastAttack());
            // if(attacker!=null)
            //   {
            //   if (Player.Mana() > 10 && !Orion.BuffExists('Confidence')) {
            //       Orion.Cast('Confidence');
            //       Orion.Wait(1000);
            //   }
            if (Player.Mana() > 10 && !Orion.SpellStatus('Counter Attack') &&
                entireAreaMobs.length > 0) {
                Orion.Cast('Counter Attack');
                Orion.Wait(1000);
            }
            if (Orion.SpellStatus('Honorable Execution') &&
                (attacker == null || attacker.Hits() > 5)) {
                Orion.Print("Disabled Honorable Execution")
                Orion.Cast('Honorable Execution');
                Orion.Wait(200)
            }
            if (!Orion.SpellStatus('Honorable Execution')
                && attacker != null && attacker.Hits() < 5) {
                Orion.Print("Honorable Execution")
                Orion.Cast('Honorable Execution');
            }
            else if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Lightning Strike') &&
                !Orion.SpellStatus('Honorable Execution') &&
                entireAreaMobs.length == 1
            ) {
                Orion.Print("Lightning Strike")
                Orion.Cast('Lightning Strike');
            }
            else if (!Orion.AbilityStatus('Primary') && entireAreaMobs.length > 2) {
                Orion.Say("Whirly Whirly")
                Orion.UseAbility('Primary', true);
            }
            else if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Honorable Execution') &&
                !Orion.SpellStatus('Momentum Strike') &&
                entireAreaMobs.length == 2
            ) {
                Orion.Print("Momentum Strike")
                Orion.Cast('Momentum Strike');
            }
            if (entireAreaMobs.length > 0) {
                if (Player.Mana() > 10 && !Orion.BuffExists('curse weapon') && Orion.ScriptRunning('CastSpell') != 1) {
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
    var range = 8;
var attackall = true;
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 2])[1]
    }
    Orion.Print(!Player.Dead())
    while (!Player.Dead()) {
    while (!Player.WarMode()) {
    Orion.Wait(1000)
    }
        while (Player.WarMode()) {
            Orion.Wait(500);

if(attackall)
{
            Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 16, 'gray|criminal|orange')
				.forEach(function (closemob) {
                    Orion.Attack(closemob.Serial())
                    Orion.Wait(50)
                })
}
            var attacker = Orion.FindObject(Orion.ClientLastAttack());

            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', (range), 'gray|criminal|orange')

            var mobsAroundAttacker = entireAreaMobs.filter(function (mob) {
                return attacker != null && attacker.Exists() && mob.Exists() && InRange(attacker, mob, 5)
            }).length

            if (Orion.SpellStatus('Honorable Execution') &&
                (attacker == null || attacker.Hits() > 5)) {
                Orion.Print("Disabled Honorable Execution")
                Orion.Cast('Honorable Execution');
                Orion.Wait(200)
            }
            if (!Orion.SpellStatus('Honorable Execution')
                && attacker != null && attacker.Hits() < 5) {
                Orion.Print("Honorable Execution")
                Orion.Cast('Honorable Execution');
            }
            else if (Player.Mana() > 10 &&
                !Orion.SpellStatus('Lightning Strike') &&
                !Orion.SpellStatus('Honorable Execution') &&
                entireAreaMobs.length == 1
            ) {
                Orion.Print("Lightning Strike")
                Orion.Cast('Lightning Strike');
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
            Orion.Wait(500)

            if (entireAreaMobs.filter(function (mob){return mob.Distance()<12}).length > 0) {
                if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon')) {
                    CastSpell('consecrate weapon');
                    Orion.Wait(1000);
                }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    CastSpell('divine fury');
                    Orion.Wait(1000);
                }
            }
        }
    }
}

function mobsInArea() {
    TextWindow.Print(Orion.GetStatus(Orion.ClientLastAttack()))
}

function CastSpell(spell) {
    Orion.Cast(spell);
    Orion.Wait(1000);
}
