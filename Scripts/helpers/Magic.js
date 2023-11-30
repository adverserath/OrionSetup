//#include helpers/Target.js
//#include helpers/Debug.js
function BoxHack() {
	var sel = SelectTarget()
	Orion.Boxhack(sel.Serial())
}
function telefast() {
	while (true) {
		Orion.Cast('ShadowJump');
		if (Orion.WaitForTarget(1000))
			Orion.TargetTileRelative('any', 11, 0, 1);
		//Orion.Wait(750)
	}
}

function Spell(name, level, lowerFC) {
	return {
		_name: name,
		_level: level,
		_lowerFC: lowerFC,
		Name: function () {
			return this._name;
		},
		Level: function () {

			return this._level;
		},
		CastTime: function () {
			var fc = Player.FC()
			if (fc > 2 && this._lowerFC == true)
				fc = 2
			var fcDeduction = parseFloat((-1.0 * Player.FC() * 0.25))
			var baseCast = (4 + this._level) * 0.25
			var castTime = baseCast + fcDeduction;
			Orion.Print(fcDeduction + ' ' + baseCast + ' ' + castTime)
			return castTime * 1000
		},
		RecoveryTime: function () {
			var fcr = Player.FCR()
			if (fcr > 4 && this._lowerFC == true)
				fcr = 4
			var fcrDelay = (6 - fcr) * 250
			Orion.Print(fcrDelay)
			return fcrDelay;
		}
	}
}
var spellList = [
	Spell('Magic Arrow', 1, true),
	Spell('Harm', 2, true),
	Spell('Fireball', 3, true),
	Spell('Lightning', 4, true),
	Spell('Mind Blast', 5, true),
	Spell('Explosion', 6, true),
	Spell('Energy Bolt', 6, true),
	Spell('Flame Strike', 7, true),
	Spell('Chain Lightning', 7, true),
	Spell('Earthquake', 8, true),
	Spell('Word of Death', 10, false)
]

function CastSpellOnTarget(spellName, targetID) {
	Debug(' Method Entry - CastSpellOnTarget')
	var startCastTime = Orion.Now();
	Orion.CancelWaitTarget();
	Orion.Print('Cast on ' + targetID)
	//Orion.WaitTargetObject(targetID);
	Orion.CastTarget(spellName, targetID);
	while (Player.Frozen()) {
		Orion.Wait(400)
		Orion.Print('Frozen')
	}
	Orion.Wait(600)
	Orion.Print('Done')

	while (Orion.InJournal('You have not yet recovered', '', '0', '-1', startCastTime, Orion.Now()) != null) {
		startCastTime = Orion.Now()
		Orion.CastTarget(spellName, targetID);
		Orion.Wait(200)
	}
	//Orion.CancelWaitTarget();
	Orion.Wait(100);
}

function CastSpellOnTargetV2(spellName, targetID) {
	Debug(' Method Entry - CastSpellOnTargetV2')
	var startCastTime = Orion.Now();
	while (!Orion.HaveTarget()) {
		Orion.Cast(spellName);
		Orion.WaitForTarget(3000)
	}
	Orion.TargetObject(targetID)
	Orion.Wait(200)
}

function MarkRune(runeItem) {
	Debug(' Method Entry - MarkRune')
	Orion.Print("MarkRune")
	if (typeof runeItem === "string") {
		runeItem = Orion.FindObject(runeItem)
	}

	CastSpellOnTargetV2("Mark", runeItem.Serial());
}

function RecallRune(runeItem) {
	Debug(' Method Entry - RecallRune:' + runeItem)
	if (typeof runeItem === "string") {
		runeItem = Orion.FindObject(runeItem)
		Orion.Print('Found ' + runeItem)
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
	Debug(' Method Entry - TakeOffClothesAndMeditate')
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
	Debug(' Method Entry - GoHome')
	Orion.OpenContainer(backpack)
	var runebook = Orion.FindTypeEx('0x22C5')
		.filter(function (book) {

			return Orion.Contains(book.Properties(), 'Home')
		}).shift()
	if (runebook != null) {
		Orion.Print("Going to:" + runebook.Serial())
		if (Orion.SkillValue('Magery', 'base') > 40) {
			CastSpellOnTargetV2("Recall", runebook.Serial());
		}
		if (Orion.SkillValue('Chivalry', 'base') > 30) {
			CastSpellOnTargetV2("Sacred Journey", runebook.Serial());
		}
	}
	WaitFrozen("Going Home");
	//Orion.WalkTo(Player.X() + 5, Player.Y() - 5, 0, 2)
}

function KeepGateOpen() {
	Debug(' Method Entry - KeepGateOpen')
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
	Debug(' Method Entry - StayHiddenMagically')
	while (true) {
		if (!Player.Hidden()) {
			Orion.CastTarget('Invisibility', self)
			Orion.Wait(2000)
		}
		Orion.Wait(500)
	}
}

function ReleaseAllSummons(_) {
	Debug(' Method Entry - ReleaseAllSummons')
	Orion.FindTypeEx(any, any, ground, 'live|ignoreself', 15, 1 | 2)
		.filter(function (mob) {

			return mob.Properties().indexOf('summoned') != -1
		}).forEach(function (mobile) {

			Orion.Say(mobile.Name() + ' release')
		})
}

function WaitFrozen(spellname) {
	Debug(' Method Entry - WaitFrozen')
	while (Player.Frozen()) {
		Orion.Print("casting " + spellname)
		Orion.Wait(100)
	}
	Orion.Wait(100)
}

function Cast(spellName, targetSerial) {
	Debug(' Method Entry - Cast')
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
	Debug(' Method Entry - ManaCheck ' + required + '  ' + lmc)
	var outcome = Player.Mana() > required * lmc
	Debug(' Result ' + outcome)
	return outcome
}

function EatMagicFood() {
	var backpackFood = getbackPackFood()
	Orion.Print(backpackFood.length)
	if (backpackFood.length == 0) {
		Orion.Cast('Create Food')
		Orion.Wait(2000)
	}
	var backpackFood = getbackPackFood()

	if (backpackFood.length != 0)
		Orion.UseObject(backpackFood.shift().Serial())
}
function getbackPackFood() {
	var food = '0x09D1|0x097B|0x1608|0x09D0'
	var backpackFood = Orion.FindTypeEx(food, any, backpack)
	return backpackFood
}

function FlameRottingCorpse() {
	var focus = Orion.FindTypeEx('0x3155')
		.filter(function (gem) {
			return gem.Properties().indexOf('Strength Bonus') != -1
		}).shift()

	var gemstr = (focus.Properties().match(/Strength\sBonus\s(\d)/i) || [])[1] || 0;
	var hitmarker = parseInt(0.05 * gemstr * 25)
	var spell = Spell('Flame strike', 7, true)

	while (true) {
		if (!Player.WarMode()) {
			Orion.Wait(500)
		}
		else {
			var mobs = Orion.FindTypeEx(any, any, ground,
				'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red')
				.filter(function (enemy) {
					return Orion.Contains(enemy.Properties(), 'The Lich King')
				})

			if (mobs.length > 0) {
				Orion.Wait(500)
				var mob = mobs[0]
				while (mob.Exists()) {
					Orion.Print(Orion.RequestName(mob.Serial()) + ' ' + mob.Hits() + ' ' + hitmarker)
					if (mob.Hits() == 0 || mob.Hits() > hitmarker) {
						CalculatedCastSpellOnTarget(spell, mob.Serial())
					}
					else if (mob.Hits() < hitmarker)
						CalculatedCastSpellOnTarget(Spell('Word of Death', 10), mob.Serial())
				}
			}
		}
	}
}

function CastRandomSpellsOnEverything() {
	while (true) {
		if (!Player.WarMode()) {
			Orion.Wait(500)
		}
		else {

			Orion.Wait(200)
			var mobs = Orion.FindTypeEx(any, any, ground,
				'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red')

			Orion.Wait(200)

			if (mobs.length > 0) {

				var mob = mobs[0]
				var spell = spellList[Orion.Random(1, spellList.length)]
				CalculatedCastSpellOnTarget(spell, mob.Serial())

			}
		}
	}
}

function ChainLightningAnything() {

	var spellt = Spell('Chain Lightning', 7, true)

	while (true) {
		if (!Player.WarMode()) {
			Orion.Wait(500)
		}
		else {
			var mobs = Orion.FindTypeEx(any, any, ground,
				'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red')
			if (mobs.length > 0) {
				var mob = mobs[Orion.Random(mobs.length)]
				CalculatedCastSpellOnTarget(spellt, mob.Serial())

			}
			else {
				Orion.Wait(200)
			}
		}
	}
}


function CastMagicArrowOnEverything() {
	var spell = Spell('Magic Arrow', 1, true)

	while (true) {
		if (!Player.WarMode()) {
			Orion.Wait(500)
		}
		else {

			//Orion.Wait(200)
			var mobs = Orion.FindTypeEx(any, any, ground,
				'nothumanmobile|live|ignoreself|ignorefriends|inlos', 10, 'gray|criminal|orange|red')

			//Orion.Wait(200)
			mobs.forEach(function (mob) {
				CalculatedCastSpellOnTarget(spell, mob.Serial())
			})
		}
	}
}

function CalculatedCastSpellOnTarget(chosenSpell, targetID) {
	//Debug(' Method Entry - CalculatedCastSpellOnTarget')
	if (!targetID || targetID == null) {
		Orion.Cast(chosenSpell.Name())
		Orion.Wait(chosenSpell.CastTime())
		Orion.Wait(chosenSpell.RecoveryTime())
	}
	else {
		Orion.Print('Cast ' + chosenSpell.Name() + ' on ' + targetID)
		Orion.CastTarget(chosenSpell.Name(), targetID);
		Orion.Wait(chosenSpell.CastTime())
		Orion.Print('Waited:' + chosenSpell.CastTime())
		Orion.Wait(chosenSpell.RecoveryTime())
		Orion.Print('Recovered:' + chosenSpell.RecoveryTime())
	}
}

function CreateMarkRune(runeSerial, name) {
	MarkRune(runeSerial);
	RenameRune(runeSerial, name)
}
function RenameRune(runeSerial, name) {
	Orion.UseObject(runeSerial);
	if (Orion.WaitForPrompt(1000)) {
		Orion.Wait(200);
		Orion.SendPrompt(name)
	}
	else {
		RenameRune(runeSerial, name)
	}
}

function DeathRayAllParagons() {
	while (true) {
		var paragons = Orion.FindTypeEx(any, '0x0501', ground, 'mobile', 10, 'gray|criminal|red')
		if (paragons.length > 0) {
			var paragon = paragons.shift()
			while (paragon.Exists() && !Orion.BuffExists('0x9BD2')) {
				var startTime = Orion.Now()
				Orion.Cast('Death Ray')
				if (Orion.WaitForTarget(4000)) {
					{
						Orion.TargetObject(paragon.Serial())
					}
				}
				Orion.Wait(1000)
			}
			Orion.Wait(1000)
		}
	}
}

function EquipSlayer()
{
//var mobType = Orion.GetObject(Orion.ClientLastAttack())).Graphic()
var slayers = Orion.FindTypeEx('0x0EFA',any,backpack).filter(function (book){return Orion.Contains(book.Properties(),'Slayer')})

			slayers.forEach(function (book) {
				Orion.Print(book.Properties().match(/\w*\sSlayer/g))
			})

}
// }
// 		if(Orion.FindTypeEx(any,'0x0501',ground,'mobile',18,'gray|criminal|red'))
// 		if (!Orion.BuffExists('0x9BD2')) {
// 			Orion.Cast('Death Ray')
// 			if (Orion.WaitForTarget(4000)) {
// 				while (Orion.BuffExists('0x9BD2')) {
// 					if (Player.Mana() > 60 && !Orion.BuffExists('Arcane Empowerment')) {
// 						Cast('Arcane Empowerment')
// 						Orion.Wait(2000)
// 					}
// 					if (Player.Followers() < 2) {
// 						Cast('Summon Fey')
// 						Orion.Wait(1000)
// 						Orion.Say('All guard')
// 					}
// 					Orion.CastTarget('Flame strike', lichking.Serial())
// 					Orion.Wait(2500)

// 				}
// 				Orion.TargetObject(lichking.Serial())
// 			}
// 		}
// 		//WraithForm/DeathRay/Recall to Malas??
// 	}
// }