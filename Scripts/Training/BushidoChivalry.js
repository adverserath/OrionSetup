function TrainChivalryAndBushido() {

    while (Player.IsHuman()) {
        if (Player.Mana() < 10) {
            //  Orion.UseSkill('Meditation');
            while (Player.Mana() < Player.MaxMana()) {
                Orion.Wait(1000);
            }
        }
        if (Orion.SkillValue('Chivalry') < 600) {
            Orion.Cast('Divine Fury');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 700) {
            Orion.Cast('Enemy Of One');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 900) {
            Orion.Cast('Holy Light');
            Orion.Wait(3000);
        }
        else if (Orion.SkillValue('Chivalry') < 1000) {
            Orion.Cast('Noble Sacrifice');
            Orion.Wait(2000);
        }

        if (Orion.SkillValue('Bushido') < 600) {
            Orion.Cast('Confidence');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Bushido') < 750) {
            if (Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Confidence');
                Orion.Wait(2000);
            }
            else {
                Orion.Cast('Counter Attack');
                Orion.Wait(2000);
            }
        }
        else if (Orion.SkillValue('Bushido') < 1000) {
            Orion.Cast('Evasion');
            Orion.Wait(2000);
        }
    }
}