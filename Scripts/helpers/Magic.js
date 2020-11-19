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
	if(x==Player.X() && y==Player.Y()){
		RecallRune(runeItem);
	}
}