//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Target.js
function ttest()
{
var mob = Orion.Ignore('0x000018EE');
}
function TrainComabt() {
	Orion.Print('Select what you are fighting')
	var target = SelectTarget();
	var i = 0;
	var tColor;
	var tGraphic;
	if (target != null) {
		tColor = target.Color();
		tGraphic = target.Graphic()
	}
	else {
		tColor = any
		tGraphic = any
	}
	Orion.Print('Select pet or escape')
	var pet = SelectTarget();
	var range = 1;
	var bow = Orion.ObjAtLayer('LeftHand');

	if (bow != null) {
		range = bow.Properties().match(/Range\s(\d*)/i)
	}

	Orion.Print(range);
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
		'nothumanmobile|live|ignoreself|ignorefriends', 35, 3).
		filter(function (mob) {
			return mob.Notoriety() >= 3 && mob.Notoriety() <= 6
		})
		.sort(function (mobA, mobB) {
			return mobA.Distance() - mobB.Distance()
		})

	while (!Player.Dead()) {
			var agro = Orion.FindTypeEx(any, any, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 35, 4).
			filter(function (mob) {
				return mob.Notoriety() >= 4 && mob.Notoriety() <=6
			})
		var newmobs = Orion.FindTypeEx(tGraphic, tColor, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 35, 3).
			filter(function (mob) {
				return mob.Notoriety() >= 3 && mob.Notoriety() <=6
			})
			mobs = mobs.concat(newmobs.filter(function (value) { 
				return mobs.indexOf(value) == -1 }));
			mobs = mobs.concat(agro.filter(function (value) { 
				return mobs.indexOf(value) == -1 }));
		mobs = mobs.sort(function (mobA, mobB) {
			return mobA.Distance() - mobB.Distance()
		})
		Orion.ClearHighlightCharacters(true);
		//		WalkTo(start);
		TextWindow.Open()
		TextWindow.Clear()
		TextWindow.Print('mob killed:'+i)
		TextWindow.Print('mob count:'+mobs.length)
		mobs.forEach(function (mob) {
			TextWindow.Print(mob.Name())
		});
		var mob = mobs.shift();
		while (Player.Hits() < (Player.MaxHits() - 10) || Player.Poisoned()) {
			Orion.Wait(1000)
		}
		if (mob != null) {
		Orion.Print(mob.Serial())
			Orion.AddHighlightCharacter(mob.Serial(), '0x0AB0', true)

			if (pet != null) {
				WalkTo(mob, 4, 20000, 1);
				Orion.Follow(pet.Serial());
			}
			else {
				WalkTo(mob, 1, 20000, 1);
				Orion.Follow(mob.Serial());
			}
			Orion.Attack(mob.Serial());
			
			Orion.Wait(300)
			

			while (Orion.ClientLastAttack() === mob.Serial()) {
				Orion.PrintFast(mob.Serial(), '0x0501', 1, mob.Hits());
				Orion.Wait(300)
			}
			i++;
		}

		Orion.Wait(300);
if(mobs.length==0){WalkTo(start)}
	}
	BotPush('Dead')
}