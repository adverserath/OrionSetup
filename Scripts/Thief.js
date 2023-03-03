var gate = null

var checkedPlayers = []
function StealStuff() {
	gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 1).shift()
	if (gate != null)
		Orion.UseObject(gate.Serial())

	Orion.ToggleScript('BackupEscape');
	
	while (Player.Hidden()) {
		StealLoop()
	}
	Orion.Wait(1000)
}

function StealLoop() {
	//Wait For player
	while (Orion.FindTypeEx(any, any, ground,
		'ignoreself|mobile', 24, 'blue|gray|green|criminal|red').filter(function (player) {
			return player.Properties().indexOf('Legacy') != -1
				&& checkedPlayers.indexOf(player.Serial()) == -1
		}).length == 0) {
		Orion.Wait(200)
	}

	TextWindow.Print('Player Detected')

	//Take their picture
	Orion.ActivateClient();
	Orion.Wait(100)
	Orion.Screenshot();

	//Wait until they come close
	while (Player.Hidden() && Orion.FindTypeEx(any, any, ground,
		'ignoreself|mobile', 2, 'blue|gray|green|criminal|red').filter(function (player) {
			return player.Properties().indexOf('Legacy') != -1
		}).length == 0) {
		Orion.Wait(50)
	}
	TextWindow.Print('Active Moment')

	var allplayers = Orion.FindTypeEx(any, any, ground,
		'ignoreself|mobile', 20, 'blue|gray|green|criminal|red').filter(function (player) {
			return player.Properties().indexOf('Legacy') != -1
		})
	var players = Orion.FindTypeEx(any, any, ground,
		'ignoreself|mobile', 2, 'blue|gray|green|criminal|red').filter(function (player) {
			return player.Properties().indexOf('Legacy') != -1
		})
	var player = null
	if (players.length > 0) {
		player = players.shift()
		Orion.Print(player.Name())
		WalkTo(player, 1)
	}

	if (!Player.Hidden() && player == null) {
		player = allplayers.shift()
		WalkTo(player)
	}

	var backpackId = Orion.ObjAtLayer('backpack', player.Serial()).Serial()
	Orion.Print('Backpack : ' + backpackId)
	Orion.UseObject(backpackId)
	while (Orion.FindTypeEx(any, any, backpackId).length == 0) {
		Orion.Wait(100)
		Orion.UseObject(backpackId)
	}
	Orion.Wait(100)
	Orion.ToggleScript('PrintContainer', true, [backpackId, player.Serial(), true]);
	//PrintContainer(Orion.FindObject(backpackId), player, true)
	Orion.Print('Check for Powerscroll')
	var item = FindPowerscroll(backpackId)
	if (item == null) {
		Orion.Print('Check for Rarity')
		item = FindItem(backpackId, any, any, 'Rarity')
	}
	if (item == null) {
		Orion.Print('Check for Skull')
		item = FindItem(backpackId, any, any, 'Skull Of')
	}
	if (item == null) {
		Orion.Print('Check for Pigment')
		item = FindItem(backpackId, any, any, 'Pigment')
	}
	if (item == null) {
		Orion.Print('Check for Sending')
		item = FindItem(backpackId, any, any, 'Bag Of Sending')
	}
	if (item == null) {
		Orion.Print('Check for Cursed')
		item = FindItem(backpackId, any, any, 'Cursed')
	}
	if (item == null) {
		Orion.Print('Check for SmokeBomb')
		item = FindItem(backpackId, any, any, 'Smoke')
	}
	if (item != null) {
		while (player.Distance() > 1) {
			WalkTo(player)
			Orion.Wait(100)
		}

		Orion.UseSkillTarget('Stealing', item.Serial())
		//Orion.Wait(100)
		GetOut()
		Orion.Wait(10000)
		checkedPlayers = []
	}
	else {
		Orion.Print('checked' + player.Name())
		checkedPlayers.push(player.Serial())
	}
	if (!Player.Hidden()) {
		GetOut()
	}

}

function BackupEscape() {
	while (true) {
		Orion.Wait(300)
		if (!Player.Hidden() && (Player.Hits() < (Player.MaxHits() - 10)) && Orion.FindTypeEx(any, any, ground,
			'ignoreself|mobile', 15).length > 0) {
			GetOut()
		}
	}
}

function GetOut() {
	if (Player.Notoriety() === 3) {
		//Invis potion
		Orion.UseType('0xF0A', '0x048D', backpack)
		WalkTo(coordinate(5140, 1773, 0), 1,2500)
		
		WalkTo(coordinate(5140, 1773, 0))
	}
	else {
		gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 1).shift()
		if (gate != null) {
			WalkTo(gate)
			GateTo('Luna')
		}
	}
}

function FindPowerscroll(containerId) {
	var scroll = FindItem(containerId, '0x14F0', '0x0481', '120')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '+25')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '+20')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '+15')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '+10')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '115')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '110')
	if (scroll == null)
		scroll = FindItem(containerId, '0x14F0', '0x0481', '105')
	if (scroll != null)
		Orion.Print('Found:' + scroll.Name())
	return scroll
}

function FindItem(containerId, graphic, color, text) {
	var items = Orion.FindTypeEx(graphic, color, containerId)
	if (text != null && text.length > 0) {
		items = items.filter(function (item) {
			return Orion.Contains(item.Properties(), text)
		})
		Orion.Print(text + ' ' + items.length)
	}
	if (items.length > 0)
		return items.shift()
	else
		return null
}

function TrainStealing() {
	var item = SelectTarget()

	Orion.Wait(1000)
	while (true) {
		var itemserials = Orion.FindTypeEx(item.Graphic(), any, backpack);
		if (itemserials.length != 0) {
			var id = itemserials[0].Serial()
			Orion.Print('drop ' + itemserials[0].Serial())
			Orion.DragItem(id);
			Orion.Wait(1000)
			Orion.DropDraggedItem(ground, Player.X() + 1, Player.Y(), Player.Z());
		}
		Orion.Wait(5000)
		Orion.Wait(1000)
		Orion.UseSkill('33');
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject(item.Serial());
		Orion.Wait(4000)

	}
}

function AutoToStar() {
	if (Orion.ScriptRunning('RunHiddenOwnCounter') == 0) {
		Orion.ToggleScript('RunHiddenOwnCounter');
	}

	if (WalkTo(coordinate(1041, 496, -83), 0)) //luna hosue
		Orion.Say('fel dungeon fire')
	Orion.Wait(500)
	if (!Player.Hidden()) {
		Orion.UseSkill('Hiding')
		Orion.Wait(500)
	}
	WalkTo(coordinate(2923, 3405, 6), 0)
	Orion.Wait(500)
	Orion.Print('To Despise')
	WalkToAvoiding(intoDespise, GetAllMobsAround(), 1, 0, 60000)
	Orion.Wait(500)
	Orion.Print('Exit Despise')
	WalkToAvoiding(despiseExit, GetAllMobsAround(), 1, 0, 60000)
	Orion.Wait(1000)
	Orion.Print('Exit Teth')
	WalkToAvoiding(tethExit, GetAllMobsAround(), 1, 0, 60000)
	Orion.Wait(800)
	Orion.Print('To Gate')
	WalkTo(exitgatepx1, 0)
}

function GetAllMobsAround() {
	return Orion.FindTypeEx(any, any, ground, 'ignoreself|mobile', 15)
}

function CheckForGateSound() {
	TextWindow.Open()
	while (true) {
		var msg = Orion.WaitJournal('soundecho: id=', Orion.Now(), Orion.Now() + 1000)
		if (msg != null) {
			TextWindow.Print(Orion.Time());
			TextWindow.Print(msg.Text());
		}
	}
}

function PrintAnimation() {
	TextWindow.Open()
	while (true) {
		var msg = Orion.WaitJournal('', Orion.Now(), Orion.Now() + 1000)
		if (msg != null) {
			TextWindow.Print(Orion.Time());
			TextWindow.Print(msg.Text());
		}
	}
}
function StealTarget() {
	var target = SelectTarget()
	if (Orion.Contains(target.Properties(), 'Rarity')) {
		WalkTo(target)
		if (Player.Hidden()) {
			AgroReset()
		}
		Orion.Wait(1000)
		Orion.UseSkillTarget('Stealing', target.Serial())
		Orion.WaitForTarget()
		Orion.TargetObject(target.Serial())
		Orion.CancelTarget()
	}
}

function FastInsure() {
	Orion.RequestContextMenu(Player.Serial());
	Orion.WaitContextMenuCliloc(Player.Serial(), 3006201);
}

function HighlightArtifact() {
	var uniqueChestIds = [];
	while (!Player.Dead()) {
		Orion.ClearFakeMapObjects();
		Orion.IgnoreReset();
		var chestIds = Orion.FindTypeEx(
			any
			, any, any, 'item', 40).filter(function (item) {
				return Orion.Contains(item.Properties(), 'Rarity');
			});

		chestIds.forEach(function (chest) {
			var chestId = chest.Serial();
			Orion.Print('Found ' + chest.Name())
			Orion.AddFakeMapObject(chestId, chest.Graphic(), '0x35', chest.X(), chest.Y(), chest.Z());
		});
		Orion.Wait(1000);
	}
}



function AgroReset() {
	Orion.PrintFast(self, 20, 1, "Agro")
	if (!Player.Hidden()) {
		var end = Orion.Now() + 3000
		Orion.CastTarget('Invisibility', self)
		while (!Player.Hidden() || Orion.Now() < end) {
			Orion.Print('wait')
			Orion.Wait(100)
		}
	}

	var mobs = Orion.FindTypeEx(any, any, ground,
		'live|ignoreself|ignorefriends', 15, 3 | 4 | 5 | 6)
		.filter(function (mob) {
			return mob.Notoriety() >= 3
				&& mob.Notoriety() <= 6
				&& mob.Properties().indexOf('Legacy') == -1
		})
	mobs.forEach(function (mobile) {

		if (Player.Hidden()) {
			Orion.Attack(mobile.Serial())
			Orion.Wait(100)
		}
	})
}



//#include helpers/Gates.js
//#include helpers/Debug.js
//#include helpers/Target.js
//#include Stealther.js
//#include Actions/Tricks.js