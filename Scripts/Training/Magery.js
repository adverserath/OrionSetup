//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js

function TrainMagery() {
var trainingTarget = SelectTarget();
    var notified = false;
    var skillLevel = Orion.SkillValue('Magery');
    while (Player.IsHuman()) {
        if ((Orion.SkillValue('Magery') % 1 == 100) && notified == false) {
            BotPush("Magery" + Orion.SkillValue('Magery', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }

        skillLevel = Orion.SkillValue('Magery');
        if (skillLevel < 600) {
            if (Player.Mana() < 10) {
                Meditate();
            }
            Orion.Cast('31');
            if (Orion.WaitForTarget(5000))
                Orion.TargetObject(trainingTarget.Serial());
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 700) {
            if (Player.Mana() < 20) {
                Meditate();
            }
            Orion.Cast('Invisibility');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 1000) {
            if (Player.Mana() < 40) {
                Meditate();
            }
            Orion.Cast('Mana Vampire');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject(trainingTarget.Serial());
            Orion.Wait(2000);
        }
        else {
BotPush("Player:"+Player.Name()+" GM Magery");
            Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}

function Meditate(){
    while (Player.Mana() < Player.MaxMana()) {
        if (!Orion.BuffExists('Meditation')) {
            Orion.UseSkill('Meditation');
        }
        Orion.Wait(4000);
    }
}