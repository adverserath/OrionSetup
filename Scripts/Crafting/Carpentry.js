//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js


function Carpentry() {
    TextWindow.Open();
    var triedToBuy = false;
    var listName = 'Carpentry';
    while (!Player.Dead()) {
    Orion.Wait(400);
        TextWindow.Clear();
         DebugWrite('Carpentry :' + Orion.SkillValue(listName));
        var needToBuy = listHasEmptyInBackpack(listName);

        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = !listHasEmptyInBackpack(listName);;
        }
        else if (needToBuy && triedToBuy) {
            Orion.Wait(60000);
            triedToBuy = false;
        }
        else {
            triedToBuy = false;
            Orion.Print('make');

                Orion.UseObject('0x43E2EFF4');
                if (Orion.WaitForGump(1000))
                {
                    var gump0 = Orion.GetGump('last');
                    if ((gump0 !== null) && (gump0.ID() === '0x38920ABD'))
                    {
                        gump0.Select(Orion.CreateGumpHook(21));
                        Orion.Wait(100);
                    }
                }
                if (Orion.WaitForGump(1000))
                {
                    var gump1 = Orion.GetGump('last');
                    if ((gump1 !== null) && (gump1.ID() === '0x38920ABD'))
                    {
                        gump1.Select(Orion.CreateGumpHook(0));
                        Orion.Wait(100);
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