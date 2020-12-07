function BushKnight() {
    var range = 2;
    var bow = Orion.ObjAtLayer('LeftHand');
    if (bow != null) {
        range = (bow.Properties().match(/Range\s(\d*)/i)||[0,2])[1]
    }
Orion.Print(range)

    TextWindow.Open();
    while (Player.IsHuman()) {
        while (Player.WarMode()) {
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

            // if(attacker!=null)
            //   {
            //   if (Player.Mana() > 10 && !Orion.BuffExists('Confidence')) {
            //       Orion.Cast('Confidence');
            //       Orion.Wait(1000);
            //   }
            Orion.Print(entireAreaMobs.length)
            if (!Orion.BuffExists('Honorable Execution')
                && attacker!=null && attacker.Hits() < 12) {
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
            else if (range==2 &&
                !Orion.BuffExists('Honorable Execution') &&
                entireAreaMobs.length >= 3
            ) {
                          Orion.Print("Primary")
                Orion.UseAbility('Primary', true);
            }

            if ( entireAreaMobs.length >0) {
             //   if (Player.Mana() > 10 && !Orion.BuffExists('Consecrate Weapon')) {
             //       Orion.Cast('consecrate weapon');
             //       Orion.Wait(1000);
             //   }

                if (Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                 //   Orion.Cast('divine fury');
                 //   Orion.Wait(1000);
                }
            }
        }
    }
}
