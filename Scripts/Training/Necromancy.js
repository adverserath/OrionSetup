//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js


function GeneratedScript_094340() {

    while (true) {
        Orion.UseSkill('16');
        if (Orion.WaitForTarget(1000))
            Orion.TargetObject('0x0000B9E2');
        Orion.UseSkill('32');
        Orion.Cast('104');
    }
    Orion.Wait(500)
}

function TrainNecro() {
    var notified = false;
    var skillLevel = Orion.SkillValue('Necromancy');
    var trainingTarget = SelectTarget().Serial();

    while (Orion.SkillValue('Necromancy') < 1000) {
        Orion.Wait(500);
        if ((Orion.SkillValue('Necromancy') % 1 == 100) && notified == false) {
            BotPush("Necromancy" + Orion.SkillValue('Necromancy', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue('Necromancy');
        if (skillLevel < 201) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }

            Orion.Cast('Curse Weapon');


            Orion.Wait(500);
        }
        if (skillLevel < 500) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            if (Player.Hits() > 40) {
                Orion.Cast('Pain Spike', self);
            }

            Orion.Wait(500);
        }
        else if (skillLevel < 700) {
            if (Player.Mana() < 10) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Horrific Beast');

            Orion.Wait(500);
        }
        else if (skillLevel < 700) {
            if (Player.Mana() < 20) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Wither');
            Orion.Wait(500);
        }
        else if (skillLevel < 1000) {
            if (Player.Mana() < 40) {
                TakeOffClothesAndMeditate();
            }
            Orion.Cast('Lich Form', self);
            Orion.Wait(500);
        }
        else {
            BotPush("Player:" + Player.Name() + " GM Necro");
            Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}

function TrainSpiritSpeak() {
    while (Orion.SkillValue('Spirit Speak') < 1000) {
        Orion.UseSkill('Spirit Speak')
        Orion.Wait(6000)
    }
}