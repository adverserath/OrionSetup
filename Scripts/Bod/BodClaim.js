//#include helpers/Target.js
//#include helpers/Debug.js

var valorite = 239
var ancient = 237
var mastertalis = 231
var barbed = 224
var tail120 = 223
var horned = 222
var bless = 220
var copper = 223
//inscribe
var purpleDye = 209
var masterTalis = 210
var greyDye = 211
var shadowIron = 217

var pinkDye = 212
var spellTalis = 213

function Claim() {
for(i=0;i<10;i++)
{
	var item = shadowIron
	var itemsCount = Orion.FindTypeEx(any, any, backpack).length
	Orion.Print('items: ' + itemsCount)
	if (itemsCount == 125) {
		var npc = SelectTarget('Select NPC')
		var start = Orion.Now()
		Orion.RequestContextMenu(npc.Serial());
		Orion.WaitContextMenuCliloc(npc.Serial(), 1155593);
		PartClaim(200)
		if (Orion.WaitForGump(1000)) {

			if (Orion.InJournal('The reward could not be given', '', '0', '-1', (start), Orion.Now()) != null) {
				Orion.Print('Claim')
				var gump0 = Orion.GetGump('last');
				CutSomething()
				if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x69DA8520')) {
					gump0.Select(Orion.CreateGumpHook(item));
				}
				if (Orion.WaitForGump(1000)) {

					var gump1 = Orion.GetGump('last');
					if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x1440128A')) {
						gump1.Select(Orion.CreateGumpHook(2));
						Orion.Wait(100);
					}
				}
			}
		}
	}
	Orion.Wait(1000)
	}
}

function CutSomething() {
	Orion.UseType('0x0F9F', '0xFFFF');
	if (Orion.WaitForTarget(1000))
		Orion.TargetType('0x152E|0x1515|0x1517|0x1540|0x1539', '0xFFFF', backpack);
}

function PartClaim(button) {
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x69DA8520')) {
			gump0.Select(Orion.CreateGumpHook(button));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x1440128A')) {
			gump1.Select(Orion.CreateGumpHook(2));
			Orion.Wait(100);
		}
	}
}

function MoveCuttable() {
	var item = SelectTarget().Graphic()
	var box = SelectTarget()
	while (Orion.Count(item, any, backpack, 1, false) > 0) {
		Orion.MoveItemType(item, any, backpack, 0, box.Serial())
	}
}
