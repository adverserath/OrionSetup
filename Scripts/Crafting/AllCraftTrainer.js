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
var tinkerTool = '0x1EBC|0x1EB8';
CraftCreateLoop('Tinkering',417,8,86,tinkerTool,'0x0FBB',trashBarrel); //makeTongs
CraftCreateLoop('Tinkering',950,8,121,tinkerTool,'0x14FC',storageBox); //makeLockpicks
CraftCreateLoop('Tinkering',1000,29,51,tinkerTool,'0x1849',trashBarrel); //makeHeatingStand
}


var trashBarrel = '0x4625B085';
var storageBox = '0x43AB4185';

function CraftCreateLoop(listName, trainToLevel, buttonMenuID, buttonItemID, toolset,itemsToTrash,containerID) {
    var toolSet;
if(listName==='Carpentry')
{
    EquipAxe();
    var righthand = Orion.ObjAtLayer('LeftHand');
    }
   else if(listName==='Tinkering')
{
toolSet='0x1EBC'
    } 
    var triedToBuy = false;
    while (Orion.SkillValue(listName)<trainToLevel) {
        Orion.Wait(400);
        TextWindow.Clear();
        DebugText(listName +':' + Orion.SkillValue(listName));
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
            Orion.Print('make');

	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD'))
		{
			gump0.Select(Orion.CreateGumpHook(buttonMenuID));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (gump1.ID() === '0x38920ABD'))
		{
			gump1.Select(Orion.CreateGumpHook(buttonItemID));
			Orion.Wait(100);
		}
	}
            else {
                var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');
                if (tools.length == 0 ) {
                    BotPush("no tools left");
                    BotPush(listName+": " + Orion.SkillValue(listName));
Orion.PauseScript();
              //      Orion.ShutdownWindows('forced');
                }
                Orion.UseObject(tools[0].Serial());

            }
            
            
            Orion.FindTypeEx(itemsToTrash).forEach(function (item) {
                Orion.MoveItem(item.Serial(), 1, trashBarrel);
                Orion.Wait(700);

            });

if(listName==='Carpentry')
{
            Orion.FindTypeEx('0x0E3D|0x09AA|0x0B4F').forEach(function (item) {
                Orion.ObjAtLayer('LeftHand');
                Orion.UseObject(righthand.Serial());
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(item.Serial());
                    Orion.Wait(700);
                }
            });
            }
        }
    }
    BotPush("You Died");
    Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', 10, 4).forEach(function (mob){
                    BotPush(mob.Name());
            });
              Orion.ShutdownWindows('forced');
}

function MakeItemGumpID(GumpBookId)
{
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (gump0.ID() === '0x38920ABD'))
		{
			gump0.Select(Orion.CreateGumpHook(GumpBookId));
			Orion.Wait(100);
		}
	}


function RestackContainerItems() {
Orion.Print('Select the container you would like to sort');
var container = SelectTarget();
MoveItems(container,container,'any','any');
}
}