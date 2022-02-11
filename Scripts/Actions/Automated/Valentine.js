//#include helpers/Target.js
//#include helpers/ItemManager.js
//#include helpers/Magic.js
//#include helpers/Notifier.js
//#include helpers/Pet.js

function DoQuests() {
Orion.Print('DoQuests')
Orion.SetGlobal('stage',0)
	while (true) {
		var stage = CheckStage()

		var startTime = Orion.Now()
		Orion.Print('Start Hunt')

		while (Orion.InJournal('completed a quest', '', '0', '-1', startTime, Orion.Now()) == null) {
			Orion.Print('Set Stage' + stage)
			Orion.SetGlobal('stage', stage)
			if (stage == 1) {
				Orion.Print('Skeletons')
				Orion.WalkTo(1040, 492, 255, 1, 255, 1)
				//Use Jawbone
				var startX = Player.X()

				Orion.UseObject('0x4001D4FE');
				if (Orion.WaitForGump(2000)) {
					Orion.Wait(2000)

					var gump0 = Orion.GetGump('last');
					if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xF9A23032')) {
						gump0.Select(Orion.CreateGumpHook(1078308));
						Orion.Wait(100);
						while (Player.X() != startX) {
							Orion.Wait(400)
						}
					}
				}
				Orion.Wait(1000)

				//SpecialHug([coordinate(1717, 1156, 1, 'Skeletons'), '0x40055599'])
				SpecialHug([coordinate(1717, 1156, 1, 'Skeletons')])
				stage = 5;
			}
			if (stage == 2) {
				Orion.Wait(2000)
				Orion.Print('Ettins')
				Orion.WalkTo(1040, 492, 255, 1, 255, 1)
				//Use Jawbone
				var startX = Player.X()
				Orion.UseObject('0x4001D4FE');
				if (Orion.WaitForGump(2000)) {
					Orion.Wait(2000)
					var gump0 = Orion.GetGump('last');
					if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xF9A23032')) {
						gump0.Select(Orion.CreateGumpHook(1111764));
						Orion.Wait(100);
						while (Player.X() != startX) {
							Orion.Wait(400)
						}
					}
				}
Orion.Wait(2000)
				SpecialHug([coordinate(910, 1336, -71, 'EttinCentral'), coordinate(814, 1319, -82, 'EttinBridge')])
				stage = 5;
			}
			if (stage == 3) {

				Orion.Print('a lich')
				RecallRune('0x40106A4B')

				SpecialHug(
				[coordinate(5317, 709, 0, 'lich1'), 
				coordinate(5306, 654, 0, 'lich2'), 
				coordinate(5305, 648, 7, 'lichstairs'), 
				coordinate(5219, 744, -20, 'lich3'), 
				coordinate(5210, 676, -20, 'lich4'), 
				coordinate(5183, 657, 0, 'lich5'),
				coordinate(5149, 723, 0, 'lichRoom')])
				stage = 5;
			}
			if (stage == 4) {
				Orion.Print('Paragons')
				Orion.WalkTo(1040, 492, 1, 1, 1)
				SpecialHug()
				stage = 6;
			}
		}
		Orion.Print('Complete')

if(!Orion.ObjectExists('0x0000006D'))
{
RecallRune('0x4012AFCE')
Orion.Wait(1000)
}
if(stage==5)
{
	Orion.UseObject('0x0000006D');
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x4C4C6DB0'))
		{
			gump0.Select(Orion.CreateGumpHook(6));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x4C4C6DB0'))
		{
			gump1.Select(Orion.CreateGumpHook(4));
			Orion.Wait(100);
		}
	}
}
if(stage==6){
	Orion.UseObject('0x0000006D');
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x4C4C6DB0'))
		{
			gump0.Select(Orion.CreateGumpHook(6));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x4C4C6DB0'))
		{
			gump1.Select(Orion.CreateGumpHook(5));
			Orion.Wait(100);
		}
	}
	}

		Orion.SetGlobal('stage',0)
	}
}

function SpecialHug(location) {
	Orion.Print('SpecialHug')

	var stage = CheckStage()
	var locationsCount = 0
	var counter = 0
	if (location != null && location.length > 0) {
		locationsCount = location.length
		if (GoTo(location[0])) {
			Orion.Print('Moved')
			counter++
		}
	}
	Orion.Print('Stage:::' + stage)

	var mobs = []

	var startTime = Orion.Now()-1000
	Orion.Print(Orion.InJournal('completed a quest', '', '0', '-1', startTime, Orion.Now()))
	
	while (Orion.InJournal('completed a quest', '', '0', '-1', startTime, Orion.Now()) == null) {
		
		if(Player.Hits()<Player.MaxHits() && Player.WarMode())
		{
			MountPet(false)
		}
		
		Orion.Print('Stage||' + stage)
		if (stage == 1)
			mobs = Orion.FindTypeEx(any, any, ground, 'mobile', 40, 3 | 4)
				.filter(function (mob) {
					return mob.Name() == "a skeleton"
				})
		if (stage == 2)
			mobs = Orion.FindTypeEx(any, any, ground, 'mobile', 40)
				.filter(function (mob) {
					return mob.Name() == "an ettin"
				})
		if (stage == 3)
			mobs = Orion.FindTypeEx(any, any, ground, 'mobile', 40)
				.filter(function (mob) {
					return mob.Name() == "a lich"
				})
		if (stage == 4)
			mobs = Orion.FindTypeEx(any, '0x0501', ground, 'mobile', 40)

		mobs = mobs.filter(function (mob) {
			return !mob.YellowHits()
		})
			.sort(function (mobA, mobB) {
				//return mobA.Distance() - mobB.Distance()
				var A = Orion.GetPathArray(mobA.X(), mobA.Y()).length
				var B = Orion.GetPathArray(mobB.X(), mobB.Y()).length
				return A - B;
			});

		if (mobs.length > 0) {
			var mob = mobs.shift()
			Orion.AddHighlightCharacter(mob.Serial(), 50);
			WalkTo(mob, 4)
			if (!mob.InLOS()) {
				WalkTo(mob, 1)
			}
			if(!Orion.Contains(mob.Properties(),"summoned"))
			{
			Orion.Say('[hug')
			if (Orion.WaitForTarget(500)) {
				Orion.TargetObject(mob.Serial())
				Orion.Wait(100)
			}
			}
		}
		else {
		Orion.Wait(500)

			if (location != null && location.length > 0 && counter < (locationsCount)) {
				Orion.Print(counter)
				MountPet(true)
				if (GoTo(location[counter])) {
					if (counter < (locationsCount)) {
						counter++
					}
			//		MountPet(false)
				}
			}
		}
		Orion.Wait(100)
	}
	
	MountPet(true)
	RecallRune('0x4012AFCE')
	Orion.SetGlobal('stage', -1)

}

function GoTo(location) {
Orion.Print('GoTo')
	if (typeof location === "string") {
		Orion.Print('GOTO Recall')
		return RecallRune(location)
	}
	else {
	Orion.Print('GOTO Walk')
		return WalkTo(location)
	}
}

function CheckStage() {
Orion.Print('CheckStage')
	var stage = 0

	Orion.QuestsGump()

	Orion.WaitForGump(1000)
	var gump0 = Orion.GetGump('last');
	Orion.Wait(1000)
	if (Orion.GetGlobal('stage')!=-1 && Orion.Contains(gump0.TextList()[0], 'Monsters Need Love')) {
		if (Orion.Contains(gump0.TextList()[0], '1 of 4')) {
			stage = 1;
		}
		if (Orion.Contains(gump0.TextList()[0], '2 of 4')) {
			stage = 2;
		}
		if (Orion.Contains(gump0.TextList()[0], '3 of 4')) {
			stage = 3;
		}
		if (Orion.Contains(gump0.TextList()[0], '4 of 4')) {
			stage = 4;
		}
		gump0.Close()
		Orion.SetGlobal('stage', stage)
	}
	else {
		gump0.Close()

		RecallRune('0x4012AFCE')

		//TAKE QUEST
		Orion.UseObject('0x0000006D');
		if (Orion.WaitForGump(1000)) {
			var gump0 = Orion.GetGump('last');
			if (Orion.Contains(gump0.TextList()[2], 'skeleton')) {
				stage = 1;
			}
			if (Orion.Contains(gump0.TextList()[2], 'ettin')) {
				stage = 2;
			}
			if (Orion.Contains(gump0.TextList()[2], 'lich')) {
				stage = 3;
			}
			if (Orion.Contains(gump0.TextList()[2], 'paragon')) {
				stage = 4;
			}
			Orion.Print('Stage' + stage)
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x4C4C6DB0')) {
				gump0.Select(Orion.CreateGumpHook(4));
				Orion.Wait(500);
			}
		}

	}
	Orion.SetGlobal('stage', stage)
	return stage;
}

function Hug() {
	SpecialHug()
}
