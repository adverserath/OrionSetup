//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/Crafting/Miner.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

//Opens the carpentry window and created the last item
//Uses a FindList for saws and boards, labelled Carpentry
//WIP// 
function StartTinkering() {
    var tool = '0x1EB8';
    CraftCreateLoop('Tinkering', 450, 8, 86, tool, trashBarrel); //makeTongs
    CraftCreateLoop('Tinkering', 940, 8, 121, tool, storageBox); //makeLockpicks
    CraftCreateLoop('Tinkering', 1000, 29, 51, tool, trashBarrel); //makeHeatingStand
}

var scissorsGraphic = '0x0F9F';
var scissorsId;
function StartTailoring() {
scissorsId = Orion.FindType(scissorsGraphic).shift();
    var tool = '0x0F9D';
    CraftCreateLoop('Tailoring', 480, 8, 16, tool, storageBox); //fancyshirt
    CraftCreateLoop('Tailoring', 520, 8, 44, tool, storageBox); //fancydress
    CraftCreateLoop('Tailoring', 600, 29, 9, tool, storageBox); //furboot
    CraftCreateLoop('Tailoring', 720, 1, 100, tool, storageBox); //kasa
    CraftCreateLoop('Tailoring', 780, 29, 16, tool, storageBox); //ninjatabi
    CraftCreateLoop('Tailoring', 996, 22, 72, tool, storageBox); //oiledcloth
    CraftCreateLoop('Tailoring', 1000, 8, 135, tool, storageBox); //elvenshirt
}

var trashBarrel = '0x4625B085';
var storageBox = '0x43AB4185';

function CraftCreateLoop(listName, trainToLevel, buttonMenuID, buttonItemID, toolSet, containerID) {
    var toolSet;
    if (listName === 'Carpentry') {
        EquipAxe();
        var righthand = Orion.ObjAtLayer('LeftHand');
    }

    var triedToBuy = false;
    while (Orion.SkillValue(listName) < trainToLevel) {
        Orion.Wait(400);
        TextWindow.Clear();
        DebugText(listName + ':' + Orion.SkillValue(listName));
        var needToBuy = NotEnoughResourcesGump();
        DebugText("NeedToBuy:" + needToBuy);
        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = listHasEmptyInBackpack(listName);
        }
        if (needToBuy && triedToBuy) {
            Orion.Print(triedToBuy);

            Orion.PauseScript();
        }
        else {
            triedToBuy = false;
            Orion.Print('making')
            var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');

            if (tools.length == 1) {
                BotPush("no tools left");
                BotPush(listName + ": " + Orion.SkillValue(listName));
                Orion.PauseScript();
                //      Orion.ShutdownWindows('forced');
            }
            var backpackBeforeMake = Orion.FindType('any');

            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {

                    gump0.Select(Orion.CreateGumpHook(buttonMenuID));
                    Orion.Wait(50);
                }

            }

            if (Orion.WaitForGump(1000)) {
                var gump1 = Orion.GetGump('last');
                if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')) {
                    gump1.Select(Orion.CreateGumpHook(buttonItemID));
                    Orion.WaitForGump(1500);
                    Orion.Wait(50);
                }
            }
            else {
                Orion.UseObject(tools[0].Serial());
            }

            //Find any newly created item.
            var items = Orion.FindType('any').filter(function (itemId) {
                return backpackBeforeMake.indexOf(itemId) == -1;
            });

            items.forEach(function (itemId) {
                if (listName === 'Tailoring') {
                Orion.Print("cutting")
                    Orion.UseObject(scissorsId);
                                    Orion.Print(itemId)

                    if (Orion.WaitForTarget(1000)) {
                        Orion.TargetObject(itemId);
                    }
                }

                if (listName === 'Carpentry') {
                    Orion.ObjAtLayer('LeftHand');
                    Orion.UseObject(righthand.Serial());
                    if (Orion.WaitForTarget(1000)) {
                        Orion.TargetObject(itemId);
                        Orion.Wait(700);
                    }

                }
if(Orion.ObjectExists(itemId))
{
                Orion.MoveItem(itemId, 1, containerID);
                Orion.Wait(700);
                }
            });



        }
    }
}

function MakeItemGumpID(GumpBookId) {
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {
            gump0.Select(Orion.CreateGumpHook(GumpBookId));
            Orion.Wait(100);
        }
    }


    function RestackContainerItems() {
        Orion.Print('Select the container you would like to sort');
        var container = SelectTarget();
        MoveItems(container, container, 'any', 'any');
    }
}