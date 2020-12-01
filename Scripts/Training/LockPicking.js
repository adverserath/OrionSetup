//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js

function TrainLockpickingWithKey() {
	var box = SelectTarget();
	var key = SelectTarget();
	BotPush("LockPicking Start:" + Orion.SkillValue("Lockpicking"))

	while (Orion.FindType('0x14FC', any, backpack).length > 0) {
		Orion.Wait(1000);
		while (((box.Properties().match(/contents/gi) || []).length) == 0) {
			Orion.Print(box.Locked())
			Orion.UseType('0x14FC', '0xFFFF');
			if (Orion.WaitForTarget(1000))
				Orion.TargetObject(box.Serial());

		}
		Orion.UseObject(key.Serial());
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject(box.Serial());
	}

	BotPush("LockPicking End:" + Orion.SkillValue("Lockpicking"))

}

function AutoLockpicking() {
	Orion.ClearFakeMapObjects();
	Orion.IgnoreReset();
	var uniqueChestIds = [];
	while (!Player.Dead()) {
		var chestIds = Orion.FindTypeEx(
			'0x0E42|0x0E40|0x0E3C|0x0E77|0x0E3E|0x0E7E|0x0E41|0x0E3D|0x09AB|0x0E7C|0x0E7F|0x0E43|0x0E3F'
			, any, any, any, 30).filter(function(chest){
				return !chest.Ignored();
			});

		chestIds.forEach(function (chest) {
			var chestId = chest.Serial();

			if (((chest.Properties().match(/contents/gi) || []).length) == 0
				&& uniqueChestIds.indexOf(chestId) === -1) {
				Orion.Print("Adding " + chestId)
				uniqueChestIds.push(chestId);
				Orion.AddFakeMapObject(chestId, chest.Graphic(), '0x35', chest.X(), chest.Y(), chest.Z());

			}
		});

		uniqueChestIds.forEach(function (chestId) {
			var chest = Orion.FindObject(chestId);

			if (chest.Distance() > 30) {
				uniqueChestIds.pop(chestId);
			}

			var startTime = Orion.Now()
			var keepPicking = true;
			while (chest.Distance() < 2 && keepPicking==true && ((chest.Properties().match(/contents/gi) || []).length) == 0) {
				Orion.Wait(200);
				Orion.UseType('0x14FC', '0xFFFF');
				if (Orion.WaitForTarget(1000)) {
					Orion.TargetObject(chest.Serial());
				}

				if (Orion.InJournal('lock can be manipulated', '', '0', '-1', startTime, Orion.Now()) != null) {
					keepPicking = false;
					uniqueChestIds.pop(chestId);
					Orion.Print(chestId + ' cant open')
					Orion.Ignore(chestId);
					Orion.RemoveFakeMapObject(chest.Serial());
					Orion.AddFakeMapObject(chest.Serial(), chest.Graphic(), '0x26', chest.X(), chest.Y(), chest.Z());
				}

				if (((chest.Properties().match(/contents/gi) || []).length) > 0 ) {
					keepPicking = false;
						uniqueChestIds.pop(chestId);
						Orion.Print(chestId + ' open')
						Orion.RemoveFakeMapObject(chest.Serial());
						Orion.AddFakeMapObject(chest.Serial(), chest.Graphic(), '0x3', chest.X(), chest.Y(), chest.Z());
				}
			}

		});
		Orion.Wait(1000);
	}

	//var box = SelectTarget();

	//while  (((box.Properties().match(/contents/gi) || []).length) ==0)
	//{
	//Orion.Print(box.Locked())/
	//Orion.UseType('0x14FC', '0xFFFF');
	//	if (Orion.WaitForTarget(1000))
	//		Orion.TargetObject(box.Serial());
	//Orion.Wait(50);
	//}



}