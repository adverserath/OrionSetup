function QuestRenew() {
	var questnpc = Orion.FindObject('0x00000035')
	WalkTo(questnpc)
	Orion.Wait(200)
	Orion.UseObject(questnpc.Serial())

	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x4C4C6DB0')) {
			gump0.Select(Orion.CreateGumpHook(6));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x4C4C6DB0')) {
			gump1.Select(Orion.CreateGumpHook(5));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.UseObject(questnpc.Serial())

	if (Orion.WaitForGump(1000)) {
		var gump2 = Orion.GetGump('last');
		if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x4C4C6DB0')) {
			gump2.Select(Orion.CreateGumpHook(4));
			Orion.Wait(100);
		}
	}
	var gump2 = Orion.GetGump('last');
	gump2.Select(Orion.CreateGumpHook(0));
}