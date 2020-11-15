function CastSpellOnTarget(spellName, targetID) {
	Orion.Cast(spellName);
	if (Orion.WaitForTarget(10000))
		Orion.TargetObject(targetID);
}

function MarkRune(runeItem) {
	CastSpellOnTarget("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	CastSpellOnTarget("Recall", runeItem.Serial());
}