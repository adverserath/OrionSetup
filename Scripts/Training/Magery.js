//#include Scripts/helpers/Notifier.js

function TrainMagery() {
    var notified = false;
    var skillLevel = Orion.SkillValue('Magery');
    while (Player.IsHuman()) {
        if ((Orion.SkillValue('Magery') % 1 == 100) && notified == false) {
            BotPush("Magery" + Orion.SkillValue('Magery', 'base'));
        }
        else if (notified == true) {
            notified = false;
        }
        if (skillLevel != Orion.SkillValue('Magery')) {
            BotPush("Magery: " + Orion.SkillValue('Magery'));
        }

        skillLevel = Orion.SkillValue('Magery');
        if (Orion.SkillValue('Magery', 'base') < 600) {
            if (Player.Mana() < 10) {
                Orion.UseSkill('Meditation');
    
                while (Player.Mana() < Player.MaxMana()) {
                    Orion.Wait(2000);
                }
            }
            Orion.Cast('31');
            if (Orion.WaitForTarget(5000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery', 'base') < 700) {
            if (Player.Mana() < 20) {
                Orion.UseSkill('Meditation');
    
                while (Player.Mana() < Player.MaxMana()) {
                    Orion.Wait(2000);
                }
            }
            Orion.Cast('Invisibility');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery', 'base') < 1000) {
            if (Player.Mana() < 40) {
                Orion.UseSkill('Meditation');
    
                while (Player.Mana() < Player.MaxMana()) {
                    Orion.Wait(2000);
                }
            }
            Orion.Cast('Mana Vampire');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else {
            Orion.HttpPost('https://maker.ifttt.com/trigger/Seed/with/key/dL1ugCFG4KbaRG5KPR5lXF/?value1=GM MAGING', '');

            Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }
}