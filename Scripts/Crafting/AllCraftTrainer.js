//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

//Opens the carpentry window and created the last item
//Uses a FindList for saws and boards, labelled Carpentry
//WIP// 

var trashBarrel = '0x40002C0A';
var storageBox = '0x43AB4185';
var scrollBox = '0x46415E83';
var moveItem = true;
function StartAlchemy() {
    var tool = '0x0E9B';
    CraftCreateLoop('Alchemy', 'Alchemy', 600, 36, 9, tool, scrollBox, '0x0F0A'); //poison
    CraftCreateLoop('Alchemy', 'Alchemy', 1001, 36, 16, tool, scrollBox, '0x0F0A'); //greaterpoison
    //CraftCreateLoop('Alchemy', 'Alchemy', 950, 43, 16, tool, scrollBox, '0x0F0C'); //greatercure
    CraftCreateLoop('Alchemy', 'Alchemy', 1000, 36, 23, tool, scrollBox, '0x0F0A'); //deadlypoison
    BotPush(Orion.Time() + "GM Alchemy");
}


function StartTinkering() {
    var tool = '0x1EB8';
    CraftCreateLoop('Tinkering', 'Tinkering', 450, 15, 86, tool, trashBarrel); //makeTongs
    CraftCreateLoop('Tinkering', 'Tinkering', 940, 15, 121, tool, Player.BankSerial()); //makeLockpicks
    CraftCreateLoop('Tinkering', 'Tinkering', 1000, 36, 51, tool, trashBarrel); //makeHeatingStand
        BotPush(Orion.Time() + "GM Tinkering");

}

function StartInscription() {
    var tool = '0x0FBF';
    CraftCreateLoop('Inscription', 'Inscription', 520, 15, 23, tool, scrollBox, '0x1F40'); //poison
    CraftCreateLoop('Inscription', 'Inscription', 670, 22, 37, tool, scrollBox, '0x1F4A'); //lightening
    CraftCreateLoop('Inscription', 'Inscription', 1000, 43, 16, tool, scrollBox, '0x1F5F'); //flamestrike
    BotPush(Orion.Time() + "GM Inscription");
}


function StartFletching() {
    var tool = '0x1022';
    CraftCreateLoop('Bowcraft/Fletching', 'FletchingShaft', 400, 1, 9, tool, storageBox); //shaft
    CraftCreateLoop('Bowcraft/Fletching', 'Fletching', 500, 15, 2, tool, trashBarrel); //bow
    CraftCreateLoop('Bowcraft/Fletching', 'FletchingShaft', 899, 8, 16, tool, trashBarrel); //dart
    CraftCreateLoop('Bowcraft/Fletching', 'Fletching', 1000, 15, 23, tool, trashBarrel); //composite
    BotPush(Orion.Time() + "GM Fletching");
}


var scissorsGraphic = '0x0F9F';
var scissorsId;
function StartTailoring() {
    scissorsId = Orion.FindType(scissorsGraphic).shift();
    var tool = '0x0F9D';
    CraftCreateLoop('Tailoring', 'Tailoring', 480, 8, 16, tool, storageBox); //fancyshirt
    CraftCreateLoop('Tailoring', 'Tailoring', 520, 8, 44, tool, storageBox); //fancydress
    CraftCreateLoop('Tailoring', 'Tailoring', 600, 29, 9, tool, storageBox); //furboot
    CraftCreateLoop('Tailoring', 'Tailoring', 720, 1, 100, tool, storageBox); //kasa
    CraftCreateLoop('Tailoring', 'Tailoring', 780, 29, 16, tool, storageBox); //ninjatabi
    CraftCreateLoop('Tailoring', 'Tailoring', 985, 22, 72, tool, storageBox); //oiledcloth
    CraftCreateLoop('Tailoring', 'Tailoring', 1000, 8, 135, tool, storageBox); //elvenshirt
}


function CraftCreateLoop(skillName, listName, trainToLevel, buttonMenuID, buttonItemID, toolSet, containerID, createdItemGraphicId) {
    DebugStart();
    BotPush("Started " + skillName + trainToLevel);
    Orion.UseObject(Orion.FindTypeEx(toolSet, 'any', 'backpack').shift().Serial());

    Orion.Print(skillName + ':' + Orion.SkillValue(skillName));
    if (skillName === 'Carpentry') {
        EquipAxe();
        var righthand = Orion.ObjAtLayer('LeftHand');
    }

    var triedToBuy = false;
    Orion.Wait(800);
    Orion.Print('Training ' + skillName + ' : ' + Orion.SkillValue(skillName) + ' / ' + trainToLevel);

    while (Orion.SkillValue(skillName) < trainToLevel) {
        if (Player.Dead()) {
            BotPush("you died");
            Orion.PauseScript();
        }
        TextWindow.Clear();
        DebugText(skillName + ':' + Orion.SkillValue(skillName));
        var needToBuy = NotEnoughResourcesGump();
        if (needToBuy == false) {
            triedToBuy = false;
        }
        DebugText("NeedToBuy:" + needToBuy);

        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = true;
            Orion.Print("getting restock")
        }
        else if (needToBuy && triedToBuy) {
            Orion.Print("failed")

            BotPush("Out of " + skillName + " resources")
           // Orion.ShutdownWindows('forced');
            Orion.PauseScript();
            triedToBuy = false;
        }
        else if (NeedMoreManaGump()) {
            TakeOffClothesAndMeditate();
        }

        //triedToBuy = false;
        Orion.Print('making items')
        var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');

        if (tools.length == 1) {
            BotPush("no tools left");
            BotPush(listName + ": " + Orion.SkillValue(skillName));
           //          Orion.ShutdownWindows('forced');
        }
        var backpackBeforeMake = Orion.FindType('any', 'any', 'backpack')
        var successfulCraft = false;

        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {

                gump0.Select(Orion.CreateGumpHook(buttonMenuID));
            }
        }


        if (Orion.WaitForGump(1000)) {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')) {
                gump1.Select(Orion.CreateGumpHook(buttonItemID));
                Orion.WaitForGump(2000);
                if (CreatedItemResourceGump() || CreatedExceptionalItemResourceGump()) {
                    successfulCraft = true;
                    Orion.Wait(300);

                }
            }
        }
        else {
            Orion.UseObject(Orion.FindTypeEx(toolSet, 'any', 'backpack').shift().Serial());
        }

        //Find any newly created item.
        var items = [];
        if (createdItemGraphicId == null) {
            items = Orion.FindType('any', 'any', 'backpack').filter(function (itemId) {
                return (backpackBeforeMake.indexOf(itemId) == -1 && successfulCraft);
            });
        }
        else {
            items = Orion.FindType(createdItemGraphicId, 'any', 'backpack');
        }

        Restock(listName);

        items.forEach(function (itemId) {
            if (skillName === 'Tailoring') {
                var item = Orion.FindObject(itemId);
                if (item != null) {
                    Orion.FindType(item.Graphic())
                        .forEach(function (itemId) {
                            Orion.UseObject(scissorsId);

                            if (Orion.WaitForTarget(1000)) {
                                Orion.TargetObject(itemId);
                                Orion.Wait(600);
                            }
                        });
                }
            }
            if (skillName === 'Carpentry') {
                Orion.ObjAtLayer('LeftHand');
                Orion.UseObject(righthand.Serial());
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(itemId);
                    Orion.Wait(700);
                }
            }
            var isFirst = true;

            if (Orion.ObjectExists(itemId) && moveItem == true) {
                var obj = Orion.FindObject(itemId);
                Orion.FindType(obj.Graphic(), 'any', 'backpack').forEach(function (binItem) {
                    Orion.MoveItem(itemId, 0, containerID);
                    if (!isFirst) { Orion.Wait(600); }
                    else {
                        Orion.Wait(300)
                    }
                    isFirst = false;

                })

            }
        });
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