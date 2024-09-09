var materialBox = 0x4006968E
var charcoal = [0x423A, 0x04A6]
var wood = [0x1BD7, 0x0000]
var potash = [0x423A, 0x044E]
var sulphAsh = [0x0F8C, 0x0000]
var saltpeter = [0x423A, 0x047E]
var blackpowder = [0x423A, 0x0455]
var yarn = [0x0E1D, 0x0000]
var fuse = [0x1420, 0x048C]
var cloth = [0x1766, 0x0000]
var charge = [0xA2BE, 0x0000]


var cookingTool = 0x097F
var alchemyTool = 0x0E9B
var tailorTool = 0x0F9D

function SheepShearer() {
	var wooly = '0x00CF'
	var notWooly = '0x00DF'
	var axe = 0x400C5E30
	var both = wooly + '|' + notWooly
	var sheeps = Orion.FindTypeEx(both, any, ground, 'mobile', 24)
	while (Player.Weight() - 10 < Player.MaxWeight()) {

		Orion.Wait(100)
		//if(sheeps.length > 0)
		Orion.Print(sheeps.length)
		if (sheeps.length > 0) {
			var sheep = sheeps.shift()
			var objSheep = Orion.FindObject(sheep.Serial())
			if (objSheep != null && objSheep.Graphic() == wooly && objSheep.Exists()) {
				WalkTo(sheep)
				Orion.Wait(100)
				Orion.UseObject(axe)
				if (Orion.WaitForTarget()) {
					Orion.TargetObject(sheep.Serial())
					Orion.Wait(500)

				}
			}
			if (objSheep != null && objSheep.Graphic() == notWooly && objSheep.Exists()) {
				WalkTo(sheep, 8)
				Orion.CastTarget('Nether Bolt', objSheep.Serial())
				Orion.Wait(500)
			}
		}
		var sheepSerials = sheeps.map(function (sh) { return sh.Serial() })
		Orion.FindTypeEx(both, any, ground, 'mobile', 35).forEach(function (sheepSerial) {
			TextWindow.Print(sheepSerial + ' : ' + sheepSerials.indexOf(sheepSerial.Serial()) == -1)
			if (sheepSerials.indexOf(sheepSerial) == -1) {
				sheeps.push(sheepSerial)
			}
		})
	}
}

function MakeCharge50() {
	Orion.OpenContainer(materialBox)
	Orion.Wait(800)
	Orion.MoveItemType(cloth[0], cloth[1], materialBox, 50);
	Orion.Wait(800)
	Orion.MoveItemType(blackpowder[0], blackpowder[1], materialBox, 200);
	Orion.Wait(800)
	Orion.UseType(tailorTool)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(500);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(16));
			Orion.Wait(500);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x9E26D92D')) {
			gump1.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.MoveItemType(charge[0], charge[1], backpack, -1, materialBox);
}

function MakeCharcoal(amount) {
	Orion.OpenContainer(materialBox)
	Orion.Wait(800)
	Orion.MoveItemType(wood[0], wood[1], materialBox, amount);
	Orion.Wait(800)
	Orion.UseType(cookingTool)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(135));
			Orion.Wait(500);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x9E26D92D')) {
			gump1.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.MoveItemType(charcoal[0], charcoal[1], backpack, -1, materialBox);
}

function MakePotash(amount) {
	Orion.OpenContainer(materialBox)
	Orion.Wait(800)
	Orion.MoveItemType(wood[0], wood[1], materialBox, amount);
	Orion.Wait(800)
	Orion.UseType(alchemyTool)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(36));
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(51));
			Orion.Wait(500);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x9E26D92D')) {
			gump1.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.MoveItemType(potash[0], potash[1], backpack, -1, materialBox);
}

function MakeBlackPowder(amount) {
	Orion.OpenContainer(materialBox)
	Orion.Wait(800)
	Orion.MoveItemType(saltpeter[0], saltpeter[1], materialBox, 6 * amount);
	Orion.Wait(800)
	Orion.MoveItemType(sulphAsh[0], sulphAsh[1], materialBox, amount);
	Orion.Wait(800)
	Orion.MoveItemType(charcoal[0], charcoal[1], materialBox, amount);
	Orion.Wait(800)
	Orion.UseType(alchemyTool)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(22));
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(51));
			Orion.Wait(500);
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x9E26D92D')) {
			gump1.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.MoveItemType(blackpowder[0], blackpowder[1], backpack, -1, materialBox);
}

function MakeFuses() {
	MakeFuse(100)
}
function MakeFuse(amount) {
	Orion.OpenContainer(materialBox)
	Orion.Wait(800)
	Orion.MoveItemType(yarn[0], yarn[1], materialBox, amount);
	Orion.Wait(800)
	Orion.MoveItemType(blackpowder[0], blackpowder[1], materialBox, amount);
	Orion.Wait(800)
	Orion.MoveItemType(potash[0], potash[1], materialBox, amount);
	Orion.Wait(800)
	Orion.UseType(alchemyTool)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
			gump0.Select(Orion.CreateGumpHook(22));
		}
	}

	while (Orion.InJournal('You have worn out your tool!') == null || !Player.WarMode()) {
		if (Orion.WaitForGump(1000)) {
			var gump0 = Orion.GetGump('last');
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9E26D92D')) {
				gump0.Select(Orion.CreateGumpHook(58));
				Orion.Wait(500);
			}
		}
	}
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x28721F1E')) {
			gump1.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}
	Orion.Wait(1000)
	Orion.MoveItemType(fuse[0], fuse[1], backpack, -1, materialBox);
}

function MakeShot() {
	var amount = 25

	while (true) {
		MakeBlackPowder(amount)
		Orion.Wait(1000)
	}
	//MakeFuse(amount)
}

function RefineLogs() {
	while (true) {
		Orion.OpenContainer(materialBox)
		Orion.Wait(800)
		Orion.MoveItemType(0x1BDD, any, materialBox, 150);
		Orion.Wait(800)
		Orion.UseObject(0x4010C358)
		if (Orion.WaitForTarget()) {
			Orion.TargetType(0x1BDD)
		}
		Orion.Wait(800)

		Orion.MoveItemType(0x1BD7, any, backpack, -1, materialBox);
	}
}
//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js