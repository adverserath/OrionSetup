//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js

function TrainMagery() {
    Orion.SetDress("magery");

    var notified = false;
    var skillLevel = Orion.SkillValue('Magery');
    var trainingTarget = SelectTarget().Serial();

    while (!Player.Dead()) {

        if ((Orion.SkillValue('Magery') % 1 == 100) && notified == false) {
            BotPush("Magery" + Orion.SkillValue('Magery', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue('Magery');
                if (skillLevel < 700) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Greater Heal', trainingTarget);

            Orion.Wait(2000);
        }
        else if (skillLevel < 700) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Mana Drain', trainingTarget);

            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 700) {
            if (Player.Mana() < 20) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Invisibility', self);
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 1000) {
            if (Player.Mana() < 40) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Mana Vampire', self);
            Orion.Wait(2000);
        }
        else {
            BotPush("Player:" + Player.Name() + " GM Magery");
            Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}