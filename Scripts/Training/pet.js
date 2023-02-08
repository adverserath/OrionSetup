//#include helpers/Target.js
//#include helpers/Pet.js
//#include helpers/Debug.js

function AutoRezTarget() {
	var targ = SelectTarget()
	while (true) {
		Orion.Wait(1000)
		if (targ.Dead()) {
			Orion.BandageTarget(targ.Serial())
			Orion.Wait(3000)

		}
	}
}
function AutoAcceptRez() {
	var target = SelectTarget()
	while (true) {
		if (!Orion.WaitForTarget(20))
			Orion.Cast('Word of Death')
		if (Orion.WaitForTarget(4000))
			if (Orion.WaitForGump(1000)) {
				var gump0 = Orion.GetGump('last');
				if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x04DA72C0')) {
					gump0.Select(Orion.CreateGumpHook(1));
					Orion.Wait(5000);
				}
			}
		if (!target.Dead()) {
			Orion.Wait(1000)
			Orion.TargetObject(target.Serial())
		}
	}
}

function CuHealing() {
	Orion.Say('All Stay')
	Orion.Step(6)
	Orion.Step(6)
	var target = Orion.FindObject('0x00007B95') //Tritton
	if (target == null)
		target = SelectTarget()

	while (true) {
		if (!target.Poisoned() && target.Hits() == (target.MaxHits())) {
			Orion.CastTarget('Flame strike', target.Serial())
			Orion.Wait(1000)
		}
		//	if (!target.Poisoned() && target.Hits() < (target.MaxHits() / 2)) {
		//	Orion.CastTarget('Gift of Renewal', target.Serial())
		//		Orion.Wait(20000)
		//	}
		Orion.Wait(3000)
	}
}

function TrainDiscoOnMobsInHouse() {
	//Orion.FindTypeEx('graphic', 'color', 'container', 'flags', 'distance', 'notoriety', recurse, 'ignoreLists');
	var mobsInHouse = Orion.FindTypeEx(any, any, ground, 'mobile', 18, 'grey|criminal').filter(function (mob) {
		return mob.Z() == Player.Z()
	})
		.sort(function (mobA, mobB) {
			return mobA.Y() - mobB.Y()
		})

	while (true) {
		mobsInHouse.forEach(function (mob) {
			Orion.Print('Attack mob:' + mob.Serial())
			Orion.ClearHighlightCharacters();
			Orion.AddHighlightCharacter(mob.Serial(), '0x55');

			Orion.Say('All Kill')
			if (Orion.WaitForTarget(1000)) {
				Orion.TargetObject(mob.Serial())
			}

			var waitTime = Orion.Now() + 20000
			while (Orion.WaitJournal('soundecho: id=0x058B', Orion.Now() - 500, Orion.Now() + 2000) == null && waitTime > Orion.Now()) {
				Orion.Wait(500)
			}
			Orion.Print(58, 'Switch Target')
			Orion.Wait(1000)
		})
		PetFollow()
		Orion.Wait(18000)
	}

}

function PetToTrainPet() {
	var target = Orion.FindObject('0x00007B95')
	var pet = Orion.FindObject('0x00003349')
	while (true) {
		if (!target.Poisoned() && target.Hits() > 10 && !pet.WarMode()) {
			Orion.Say('All Kill')
			if (Orion.WaitForTarget(1000)) {
				Orion.TargetObject(target.Serial())
			}
		}
		else if (pet.WarMode() && (target.Hits() < 10 || target.Poisoned())) {
			Orion.Say('All follow me')
		}
		Orion.Wait(1000)
	}

}