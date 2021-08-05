//#include Scripts/Actions/Automated/ShortCuts.js
//#include Scripts/Actions/Automated/Pickup.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function DoorOpened() {
    lastdoors = Orion.FindType('0x06CD', any, ground).length
    while (true) {
        Orion.Wait(500)
        var doors = Orion.FindType('0x06CD', any, ground).length
        if (doors != lastdoors) {
            if (doors < lastdoors) {
                BotPush('DoorOpened :' + Orion.Time())
                lastdoors = doors
            }
        }
    }
}

function RunHiddenOwnCounter() {
	var x = Player.X()
	var y = Player.Y()
	var lastReset = Orion.Now()
	var lastStepTime = Orion.Now()
	var steps = 0
	var lastStepNumber = 0
	var StealthLimit = Orion.SkillValue('Stealth') / 50
	Orion.Print('StealthLimit:' + StealthLimit)
	while (true) {
		Orion.Wait(10)
		if (Player.Hidden() && (x != Player.X() || y != Player.Y())) {
			x = Player.X()
			y = Player.Y()
			var steps = 1
			if (Player.Direction() > 127) {
				steps = 2
			}


			lastStepNumber += steps;
			Orion.Print(lastStepNumber)
			if (Player.Hidden() && Player.StealthSteps() == 0) {
				Orion.Step(1, false)
				Orion.AddDisplayTimer('hide', 10000, 'AboveChar');
			}
			var startTime = Orion.Now()
			if (!Player.WarMode() && !Orion.DisplayTimerExists('hide') && lastStepNumber >=(StealthLimit-4)) {
				Orion.UseSkill('Stealth')
				Orion.AddDisplayTimer('hide', 10000, 'AboveChar');
			}

			var stealthReset = Orion.InJournal('You begin to move quietly', '', '0', '-1', lastStepTime, Orion.Now()) != null;
			if (stealthReset) {
				Orion.Print('Reset Stealth')
				lastStepNumber = 0
			}

			Orion.ClientOptionSet('BlockRunWhileHidden', lastStepNumber >= (StealthLimit-4));

			lastStepTime = Orion.Now()
		}
	}
}