//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js
var fightParagons = false
function TrainComabt() {
	TextWindow.Open()

	Orion.Print('Select what you are fighting')
	var target = SelectTarget();
	var i = 0;
	var tColor;
	var tGraphic;
	if (target != null) {
		tColor = target.Color();
		if (fightParagons)
			tColor = any
		tGraphic = target.Graphic()
	}
	else {
		Orion.Print('No target')
		tColor = any
		tGraphic = any
	}
	Orion.Print('Select pet or escape')
	var pet = SelectTarget();
	var range = 3;
	var bow = Orion.ObjAtLayer('LeftHand');

	if (bow != null) {
		range = bow.Properties().match(/Range\s(\d*)/i)
	}
	if (pet != null) {
		range = 5
	}

	Orion.Print('Range:' + range);
	var start = {
		x: Player.X(),
		y: Player.Y(),
		z: Player.Z(),
		X: function () {
			return this.x;
		},
		Y: function () {
			return this.y;
		},
		Z: function () {
			return this.z;
		}
	};
	var mobs = Orion.FindTypeEx(tGraphic, tColor, ground,
		'nothumanmobile|live|ignoreself|ignorefriends', 45, 3).
		filter(function (mob) {
			return mob.Notoriety() >= 3 && mob.Notoriety() <= 6 && mob.Name() != ''
		})
		.sort(function (mobA, mobB) {
			return mobA.Distance() - mobB.Distance()
		})

	while (!Player.Dead()) {
		Orion.Wait(1000)

		var agro = Orion.FindTypeEx(tGraphic, tColor, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 45, 4).
			filter(function (mob) {
				return mob.Notoriety() >= 5 && mob.Notoriety() <= 6
			})
		var newmobs = Orion.FindTypeEx(tGraphic, tColor, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 45, 3).
			filter(function (mob) {
				return mob.Notoriety() >= 3 && mob.Notoriety() <= 6
			})
		mobs = mobs.concat(newmobs.filter(function (value) {
			return mobs.indexOf(value) == -1
		}));
		mobs = mobs.concat(agro.filter(function (value) {
			return mobs.indexOf(value) == -1
		}));
		mobs = mobs.sort(function (mobA, mobB) {
			return mobA.Distance() - mobB.Distance()
		})
		Orion.ClearHighlightCharacters(true);
		//		WalkTo(start);
		TextWindow.Clear()
		TextWindow.Print('mob killed:' + i)
		TextWindow.Print('mob count:' + mobs.length)
		mobs.forEach(function (mob) {
			TextWindow.Print(mob.Name())
		});
		if (mobs.length > 0) {
			var mob = mobs.shift();
			while (Player.Hits() < (Player.MaxHits() - 10) || Player.Poisoned()) {
				Orion.Wait(1000)
			}
			if (mob != null && mob.Exists()) {
				Orion.Print(mob.Serial())
				Orion.AddHighlightCharacter(mob.Serial(), '0x0AB0', true)
				WalkTo(mob, 5, 20000, 1);

				if (!mob.InLOS()) {
					WalkTo(mob, 1, 20000, 1);

				}
				if (pet != null) {
					Orion.Wait(2000)
					if (mob.Distance() > pet.Distance()) {
						var dir = pet.Direction()
						Orion.Step(dir)
						Orion.Step(dir)
						Orion.Step(dir)
					}
				}
				else {
					WalkTo(mob, 1, 20000, 1);
					Orion.Follow(mob.Serial());
				}
				Orion.Print('Honor ' + mob.Name())
				Orion.InvokeVirtue('Honor');
				if (Orion.WaitForTarget(2000)) {
					Orion.TargetObject(mob.Serial());
					Orion.Wait(500)
				}
				if (pet.Distance() > 4) {
					Orion.Wait(3000)
				}

				Orion.Attack(mob.Serial());
				Orion.ClientLastAttack(mob.Serial());
				Orion.Wait(300)

				while (mob.Exists()) {
					//WalkTo(pet, 1, 20000, 1);
					//	HealPet(pet);
					//	Orion.CastTarget('Energy Bolt', mob.Serial())
					Orion.PrintFast(mob.Serial(), '0x0501', 1, mob.Hits());
					Orion.Wait(1500)
				}
				var corpses = Orion.FindTypeEx('0x2006', any, ground, '', 16);
				corpses.forEach(function (corpse) {
					var corpse = corpses[0]
					Orion.Print(corpse + ' ' + mob.Y())
					WalkTo(corpse, 0, 3000, 1);
					Orion.Wait(4000)
					Orion.Ignore(corpse.Serial());
				})

				i++;
			}
		}
		Orion.Wait(300);
		if (mobs.length == 0) { WalkTo(start) }
	}
	BotPush('Dead')
}

function HealPet(pet) {
	if (pet.Poisoned()) {
		Orion.CastTarget('201', pet.Serial()); //11 magery
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject('0x0000C419');

	}
	if (pet.Hits() < 20) {
		Orion.CastTarget('202', pet.Serial()); //29 magery
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject('0x0000C419');

	}
}