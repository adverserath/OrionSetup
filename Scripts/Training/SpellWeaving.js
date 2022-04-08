//#include helpers/Notifier.js
//#include helpers/Target.js
//#include helpers/Magic.js

function TrainSpellWeaving() {
    var notified = false;
    var skillLevel = Orion.SkillValue('SpellWeaving');
    var trainingTarget = SelectTarget().Serial();

    while (Orion.SkillValue('SpellWeaving') < 1000) {
        Orion.Wait(500);
        if (Player.Hits() < (Player.MaxHits() - 30)) {
            Orion.CastTarget('Gift Of Renewal', self);
        }
        if ((Orion.SkillValue('SpellWeaving') % 1 == 100) && notified == false) {
            BotPush("SpellWeaving" + Orion.SkillValue('SpellWeaving', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue('SpellWeaving', 'base');
                if (skillLevel < 380) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Thunderstorm');

            Orion.Wait(500);
        }
        else if (skillLevel < 755) {
            if (Player.Followers() > 0) {
                Orion.Wait(200);
                var fey = Orion.FindTypeEx('0x0080', any, ground, 'mobile|near', 10, 'blue|green').shift()

                Orion.Say(fey.Name() + ' Release')

            }
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Summon Fey', trainingTarget);

            Orion.Wait(500);
        }
        else if (skillLevel < 1150) {
            if (Player.Mana() < 40) {
                TakeOffClothesAndMeditate();
            }
            Orion.CastTarget('Wildfire', self);
            Orion.Wait(500);
        }
        else {
            BotPush("Player:" + Player.Name() + " GM SpellWeaving");
            //   Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}
