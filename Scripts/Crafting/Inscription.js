function Inscribe() {
    TextWindow.Open();
    var triedToBuy = false;
    while (!Player.Dead()) {
    Orion.Wait(400);
        TextWindow.Clear();
         DebugWrite('inscription :' + Orion.SkillValue('inscription'));
        var needToBuy = listHasEmptyInBackpack('Inscribe');

        if (needToBuy && !triedToBuy) {
            Restock('Inscribe');
            // VendorAction('sell', 'Pavel', 'sInscribe');

            triedToBuy = !listHasEmptyInBackpack('Inscribe');;
        }
        else if (needToBuy && triedToBuy) {
            Orion.Wait(60000);
            triedToBuy = false;
        }
        else {
            triedToBuy = false;
            Orion.Print('make');
            if (Player.Mana() < 40) {
                Orion.Wait(1000);
                Orion.Wait(2000);
                Orion.UseSkill('Meditation');

                while (Player.Mana() < Player.MaxMana()) {
                    if (!Orion.BuffExists('meditation')) {
                            DebugWrite('meditating');
                        Orion.UseSkill('Meditation');
                    }
                    Orion.Wait(4000);
                }
            }
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {
                    gump0.Select(Orion.CreateGumpHook(21));
                    Orion.Wait(100);
                }
            }
            else {
                var pens = Orion.FindTypeEx('0x0FBF', 'any', 'backpack');
                Orion.UseObject(pens[0].Serial());
            }

            Orion.Wait(1000);
        }

    }
}