//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js

function ImbueEverything() {
	var itemtype = SelectTarget('Select imbue type')
	var tool = SelectTarget('Imbue tool')

	Orion.FindTypeEx(itemtype.Graphic(), 0x0000, itemtype.Container()).forEach(function (item) {
		Orion.UseObject(tool.Serial());
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject(item.Serial());
		if (Orion.WaitForGump(1000)) {
			var gump0 = Orion.GetGump('last');
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x410F26AC')) {
				gump0.Select(Orion.CreateGumpHook(3));
				Orion.Wait(100);
			}
		}
		Orion.Wait(1000);
	})

	UnRavelContainer(itemtype.Container())

}

function UnRavelContainer(containerSerial) {
	Orion.UseSkill('Imbuing');
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x65290B89')) {
			gump0.Select(Orion.CreateGumpHook(10011));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject(containerSerial);
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xB73E81BB')) {
			gump1.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
}