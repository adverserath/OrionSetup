//#include helpers/Target.js
//#include helpers/Pet.js
function CuHealing() {
	var target = SelectTarget()
	while (true) {
		if (!target.Poisoned() && target.Hits() > (target.MaxHits() / 2)) {
			Orion.CastTarget('Poison', target.Serial())
			Orion.Wait(1000)
		}
		Orion.Wait(3000)
	}
}

function TrainPetDiscord() {
	TextWindow.Open()
	var waitForStop = false
	while (true) {
		//Successful Discord
		var msg = Orion.WaitJournal('effectecho: type=3', Orion.Now() - 500, Orion.Now() + 2000)
		if ((msg != null && !waitForStop) || (msg == null && waitForStop)) {
			if (waitForStop) {
				TextWindow.Print(Orion.Time());
				TextWindow.Print("Discord wore off");
				MountPet(false)
			}
			else {
				TextWindow.Print(Orion.Time());
				TextWindow.Print("Discorded");
				MountPet(true)
			}
			waitForStop = !waitForStop
		}
	}
}
