function CastSpellOnTarget(spellName, targetID) {
	Orion.Cast(spellName);
	if (Orion.WaitForTarget(10000))
		Orion.TargetObject(targetID);
}

function MarkRune(runeItem) {
	CastSpellOnTarget("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	var x = Player.X();
	var y = Player.Y();
	CastSpellOnTarget("Recall", runeItem.Serial());
	Orion.Wait(1500);
	if (x == Player.X() && y == Player.Y()) {
		RecallRune(runeItem);
	}
}

function TakeOfClothesAndMeditate() {
	var equipment = [];
	equipment.push(Orion.ObjAtLayer('Pants'));
	equipment.push(Orion.ObjAtLayer('Shirt'));
	equipment.push(Orion.ObjAtLayer('Helmet'));
	equipment.push(Orion.ObjAtLayer('Gloves'));
	equipment.push(Orion.ObjAtLayer('Necklace'));
	equipment.push(Orion.ObjAtLayer('Arms'));

	equipment.forEach(function (piece) {
		if (piece != null) {
			Orion.Print("bit")
			Orion.MoveItem(piece.Serial());
			Orion.Wait(600);
		}
	})
	while (Player.Mana() < Player.MaxMana()) {
		if (!Orion.BuffExists('Meditation')) {
			Orion.UseSkill('Meditation');
		}
		Orion.Wait(4000);
	}

	equipment.forEach(function (piece) {
		if (piece != null)
			Orion.Equip(piece.Serial());
		Orion.Wait(600);

	})
}