//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js


function CarpentryCreateLoop(listName) {
    var triedToBuy = false;
    var toolSet = '0x1034';
    while (!Player.Dead()) {
    Orion.Wait(400);
        TextWindow.Clear();
        DebugText('Carpentry :' + Orion.SkillValue(listName));
        var needToBuy = NotEnoughResourcesGump();
Orion.Print("out:" + needToBuy);
        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = !listHasEmptyInBackpack(listName);
            Orion.Print("ttb:" + triedToBuy);

        }
        else if (needToBuy && triedToBuy) {
            Orion.Wait(60000);
            triedToBuy = false;
        }
        else {
            triedToBuy = false;
            Orion.Print('make');

            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {
                    gump0.Select(Orion.CreateGumpHook(21));
                    Orion.Wait(100);
                }
            }
            else {
                var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');
                Orion.UseObject(tools[0].Serial());
            }

            Orion.Wait(1000);
        }

    }
}