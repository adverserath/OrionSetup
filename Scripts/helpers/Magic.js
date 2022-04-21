//#include helpers/Target.js

function CastSpellOnTarget(spellName, targetID) {
	Orion.Print('Method Entry - CastSpellOnTarget')
	var startCastTime = Orion.Now();
	Orion.CancelWaitTarget();
	Orion.Print('Cast on ' + targetID)
	Orion.WaitTargetObject(targetID);
	Orion.CastTarget(spellName, targetID);
	while (Player.Frozen()) {
		Orion.Wait(400)
		Orion.Print('Frozen')
	}
	Orion.Wait(1500)
	Orion.Print('Done')

	while (Orion.InJournal('You have not yet recovered', '', '0', '-1', startCastTime, Orion.Now()) != null) {
		startCastTime = Orion.Now()
		Orion.CastTarget(spellName, targetID);
		Orion.Wait(600)
	}
	Orion.Wait(100);
}

function CastSpellOnTargetV2(spellName, targetID) {
	Orion.Print('Method Entry - CastSpellOnTargetV2')
	var startCastTime = Orion.Now();
	while (!Orion.HaveTarget()) {
		Orion.Cast(spellName);
		Orion.WaitForTarget(3000)
	}
	Orion.TargetObject(targetID)
	Orion.Wait(200)
}

function MarkRune(runeItem) {
	Orion.Print('Method Entry - MarkRune')
	Orion.Print("MarkRune")
	if (typeof runeItem === "string") {
		runeItem = Orion.FindObject(runeItem)
	}

	CastSpellOnTargetV2("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	Orion.Print('Method Entry - RecallRune:'+runeItem)
	if (typeof runeItem === "string") {
		runeItem = Orion.FindObject(runeItem)
		Orion.Print('Found '+runeItem)
	}
	var startCastTime = Orion.Now();
	var x = Player.X();
	var y = Player.Y();
	if (Orion.SkillValue('Magery', 'base') > 40) {
		CastSpellOnTarget("Recall", runeItem.Serial());
	}
	if (Orion.SkillValue('Chivalry', 'base') > 30) {
		CastSpellOnTargetV2("Sacred Journey", runeItem.Serial());
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
	Orion.Print('Method Entry - TakeOffClothesAndMeditate')
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
	Orion.Print('Method Entry - GoHome')
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
	WaitFrozen("Going Home");
	Orion.WalkTo(Player.X() + 5, Player.Y() - 5, 0, 2)
}

function KeepGateOpen() {
	Orion.Print('Method Entry - KeepGateOpen')
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
	Orion.Print('Method Entry - StayHiddenMagically')
	while (true) {
		if (!Player.Hidden()) {
			Orion.CastTarget('Invisibility', self)
			Orion.Wait(2000)
		}
		Orion.Wait(500)
	}
}

function ReleaseAllSummons(_) {
	Orion.Print('Method Entry - ReleaseAllSummons')
	Orion.FindTypeEx(any, any, ground, 'live|ignoreself', 15, 1 | 2)
		.filter(function (mob) {
	
			return mob.Properties().indexOf('summoned') != -1
		}).forEach(function (mobile) {
	
			Orion.Say(mobile.Name() + ' release')
		})
}

function WaitFrozen(spellname) {
	Orion.Print('Method Entry - WaitFrozen')
	while (Player.Frozen()) {
		Orion.Print("casting " + spellname)
		Orion.Wait(100)
	}
	Orion.Wait(100)
}

function Cast(spellName, targetSerial) {
	Orion.Print('Method Entry - Cast')
	Orion.Print(spellName)
	while (Orion.ScriptRunning('Walk') == 1 || Orion.IsWalking()) {
		Orion.Wait(400)
	}
	if (targetSerial == null) {
		Orion.Cast(spellName)
	}
	else {
		Orion.CastTarget(spellName, targetSerial)
	}
	WaitFrozen(spellName)
}

function ManaCheck(required, lmc) {
	Orion.Print('Method Entry - ManaCheck')
	return Player.Mana() > required * lmc
}