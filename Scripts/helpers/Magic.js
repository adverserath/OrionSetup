function CastSpellOnTarget(spellName, targetID) {
	Orion.CastTarget(spellName, targetID);
}

function MarkRune(runeItem) {
	CastSpellOnTarget("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	CastSpellOnTarget("Recall", runeItem.Serial());
}