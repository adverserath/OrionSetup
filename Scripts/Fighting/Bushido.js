//#include Scripts/helpers/Target.js

function BushKnight() {
    var range = 1;
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 2])[1]
    }
    Orion.Print(range)

    TextWindow.Open();
    while (true) {
        while (!Player.Dead() && Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());
            if (Player.Mana() > 10 && !Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Counter Attack');
                Orion.Wait(1000);
            }
            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', range, 3)
                .filter(function (mob) {
                    return mob.Notoriety() >= 3
                        && mob.Notoriety() < 7;
                });

                Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 15, 3)
                .filter(function (mob) {
                    return mob.Notoriety() >= 3
                        && mob.Notoriety() < 7;
                }).forEach(function (closemob){
			 Orion.ClientLastAttack(closemob.Serial())
			 Orion.Wait(50)
			 })
			 
			 if(attacker==null || attacker.Distance()>1)
			 {
			 Orion.Print('attack new')
			 entireAreaMobs.forEach(function (closemob){
			 Orion.ClientLastAttack(closemob.Serial())
			 })
			 }
			 else{
			 			 Orion.Print('attack last')
			 			 Orion.ClientLastAttack(attacker.Serial())
			 }
			 Orion.Wait(50)
			 attacker = Orion.FindObject(Orion.ClientLastAttack());
            // if(attacker!=null)
            //   {
            //   if (Player.Mana() > 10 && !Orion.BuffExists('Confidence')) {
            //       Orion.Cast('Confidence');
            //       Orion.Wait(1000);
            //   }
            Orion.Print(entireAreaMobs.length)
            if (!Orion.BuffExists('Honorable Execution')
                && attacker != null && attacker.Hits() < 5) {
                Orion.Print("Honorable Execution")
                Orion.Cast('Honorable Execution');
            }
            else if (Player.Mana() > 10 &&
                !Orion.BuffExists('Lightning Strike') &&
                !Orion.BuffExists('Honorable Execution') &&
                entireAreaMobs.length == 1
            ) {
                Orion.Print("Lightning Strike")

                Orion.Cast('Lightning Strike');
            }
            else if (Player.Mana() > 10 &&
                !Orion.BuffExists('Honorable Execution') &&
                !Orion.BuffExists('Momentum Strike') &&
                entireAreaMobs.length == 2
            ) {
                Orion.Print("Momentum Strike")
                Orion.Cast('Momentum Strike');
            }
            else if (range == 2 &&
                !Orion.BuffExists('Honorable Execution') &&
                entireAreaMobs.length >= 3
            ) {
                Orion.Print("Primary")
                Orion.UseAbility('Primary', true);
            }

            if (entireAreaMobs.length > 0) {
                if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon')) {
                    Orion.Cast('consecrate weapon');
                    Orion.Wait(1000);
                }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    Orion.Cast('divine fury');
                    Orion.Wait(1000);
                }
            }
        }
    }
}

function BushyArcher() {
    var range = 8;
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i) || [0, 2])[1]
    }
    Orion.Print(!Player.Dead())
    while (!Player.Dead()) {
        while (Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());

            var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', (range), 'gray|criminal|orange|red')
                .filter(function (mob) {
                    return mob.Notoriety() >= 3
                        && mob.Notoriety() < 7;
                });
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


            if (entireAreaMobs.length > 0) {
                   if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon')) {
                       Orion.Cast('consecrate weapon');
                       Orion.Wait(1000);
                }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                       Orion.Cast('divine fury');
                       Orion.Wait(1000);
                }
            }
        }
    }
}

function mobsInArea() {
    TextWindow.Print(Orion.GetStatus(Orion.ClientLastAttack()))
}
