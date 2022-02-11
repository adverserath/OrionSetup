//#include helpers/Target.js

function CastSpellOnTarget(spellName, targetID) {
	var startCastTime = Orion.Now();

	Orion.Cast(spellName + '');
	Orion.Wait(400)
	while (Orion.InJournal('You have not yet recovered', '', '0', '-1', startCastTime, Orion.Now()) != null) {
		startCastTime = Orion.Now()
		Orion.Cast(spellName + '');
		Orion.Wait(400)
	}

	if (Orion.WaitForTarget(3000))
		Orion.TargetObject(targetID);
	Orion.Wait(1000);

}

function MarkRune(runeItem) {
	CastSpellOnTarget("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	if (typeof runeItem === "string") {
		runeItem = Orion.FindObject(runeItem)
	}
	var startCastTime = Orion.Now();
	var x = Player.X();
	var y = Player.Y();
	if (Orion.SkillValue('Magery', 'base') > 40) {
		CastSpellOnTarget("Recall", runeItem.Serial());
	}
	if (Orion.SkillValue('Chivalry', 'base') > 30) {
		CastSpellOnTarget("Sacred Journey", runeItem.Serial());
	}
	if (Orion.InJournal('blocking the location', '', '0', '-1', startCastTime, Orion.Now() + 1500) != null) {
		BotPush('Location is blocked')
		Orion.PauseScript();
	}
	if (x == Player.X() && y == Player.Y()) {
		RecallRune(runeItem);
	}
	return true;
}

function TakeOffClothesAndMeditate(_private) {
	var equipment = [];
	//		Orion.Undress();

	while (Player.Mana() < Player.MaxMana()) {
		if (!Orion.BuffExists('Meditation')) {
			Orion.UseSkill('Meditation');
		}
		Orion.Wait(4000);
	}
	Orion.Wait(4000);
}

function GoHome() {
	Orion.OpenContainer(backpack)
	var runebook = Orion.FindTypeEx('0x22C5')
		.filter(function (book) {
			return Orion.Contains(book.Properties(), 'Home')
		}).shift()
	if (runebook != null) {
		if (Orion.SkillValue('Magery', 'base') > 40) {
			CastSpellOnTarget("Recall", runebook.Serial());
		}
		if (Orion.SkillValue('Chivalry', 'base') > 30) {
			CastSpellOnTarget("Sacred Journey", runebook.Serial());
		}
	}
}

function KeepGateOpen() {
	var gateTarget = SelectTarget()
	while (true) {
		var gates = Orion.FindTypeEx('0x0F6C', any, ground, '', 1).length
		if (gates < 1) {
			Orion.Cast('Gate Travel')
			if (Orion.WaitForTarget(4000))
				Orion.TargetObject(gateTarget.Serial());
			Orion.Wait(3000)
		}
		Orion.Wait(1000)
	}
}


function StayHiddenMagically() {
	while (true) {
		if (!Player.Hidden()) {
			Orion.CastTarget('Invisibility', self)
			Orion.Wait(2000)
		}
		Orion.Wait(500)
	}
}