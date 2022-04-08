//#include helpers/Notifier.js
//#include helpers/Target.js
//#include helpers/Magic.js

var skillname = 'Mysticism'
function TrainMysticism() {
    var notified = false;
    var skillLevel = Orion.SkillValue(skillname);
    var trainingTarget = SelectTarget().Serial();

    while (Orion.SkillValue(skillname) < 1000) {
        Orion.Wait(500);
        if ((Orion.SkillValue(skillname) % 1 == 100) && notified == false) {
            BotPush("Necromancy" + Orion.SkillValue(skillname, 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue(skillname);
        if (skillLevel < 200) {
            Orion.Print('Goto trainer')
            Orion.PauseScript()
        }
        if (skillLevel < 629) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
                Orion.Cast('Stone Form');

            Orion.Wait(500);
        }
        else if (skillLevel < 800) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.CastTarget('Cleansing Winds',Player.Serial());

            Orion.Wait(500);
        }
        else if (skillLevel < 950) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.CastTarget('Hail Storm',Player.Serial());

            Orion.Wait(500);
        }
        else if (skillLevel < 1000) {
            if (Player.Mana() < 40) {
                TakeOffClothesAndMeditate();
            }

            Orion.CastTarget('Nether Cyclone',Player.Serial());

            Orion.Wait(500);
        }
    }
}