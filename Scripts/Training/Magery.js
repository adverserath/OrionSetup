//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js

function TrainMagery() {
    Orion.SetDress("magery");

    var notified = false;
    var skillLevel = Orion.SkillValue('Magery');
    var trainingTarget = SelectTarget().Serial();

    while (Orion.SkillValue('Magery') < 1000) {
Orion.Wait(500);
        if ((Orion.SkillValue('Magery') % 1 == 100) && notified == false) {
            BotPush("Magery" + Orion.SkillValue('Magery', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue('Magery');
                if (skillLevel < 550) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Greater Heal', trainingTarget);

            Orion.Wait(500);
        }
        else if (skillLevel < 650) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Magic Reflection', trainingTarget);

            Orion.Wait(500);
        }
        else if (Orion.SkillValue('Magery') < 790) {
            if (Player.Mana() < 20) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Invisibility', self);
            Orion.Wait(500);
        }
        else if (Orion.SkillValue('Magery') < 1000) {
            if (Player.Mana() < 40) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Mana Vampire', self);
            Orion.Wait(500);
        }
        else {
            BotPush("Player:" + Player.Name() + " GM Magery");
         //   Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}

function TrainResist() {
    Orion.SetDress("magery");

    var notified = false;
    var trainingTarget = SelectTarget().Serial();

    while (Orion.SkillValue('Resisting Spells') < 1000) {
        skillLevel = Orion.SkillValue('Resisting Spells');
            Orion.Cast('Clumsy', self);

            Orion.Wait(2000);
        }
        }