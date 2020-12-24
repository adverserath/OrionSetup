//#include Scripts/helpers/Target.js

function DiscordRandom() {
	while (!Player.Dead()) {
		Orion.Wait(1000);

		Orion.FindType('0x00E2|0x00D0', any, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 15, 3).forEach(function (horse) {
				Orion.Wait(1000);
				Orion.Print(horse);
				Orion.UseType('0x2805', '0xFFFF');
				Orion.UseSkill('15');
				if (Orion.WaitForTarget(100)) {
					Orion.TargetObject(horse);
				}
			});
	}

	Orion.PauseScript();
}

function StayAway() {
	var target = SelectTarget();
	while (!Player.Dead()) {
		Orion.WalkTo(target.X(), target.Y() + 3, target.Z(), 0);
		Orion.Wait(50);

	}
}