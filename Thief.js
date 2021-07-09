function StealStuff() {
	Orion.ToggleScript('BackupEscape');
	var checkedPlayers = []
	while (Player.Hidden()) {
		while (Orion.FindTypeEx(any, any, ground,
			'ignoreself|mobile', 24, 'blue|gray|green|criminal|red').filter(function (player) {
				return player.Properties().indexOf('Legacy') != -1
					&& checkedPlayers.indexOf(player.Serial()) == -1
			}).length == 0) {
			Orion.Wait(50)
		}
		TextWindow.Print('Player Detected')

		Orion.ActivateClient();
		Orion.Wait(100)
		Orion.Screenshot();

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
			WalkTo(player,1)
		}

		if (!Player.Hidden() && player == null) {
			player = allplayers.shift()
			WalkTo(player)
		}

		var backpackId = Orion.ObjAtLayer('backpack', player.Serial()).Serial()
		Orion.UseObject(backpackId)
		while (Orion.FindTypeEx(any, any, backpackId).length == 0) {
			Orion.Wait(100)
			Orion.UseObject(backpackId)
		}

		Orion.ToggleScript('PrintContainer', true, [Orion.FindObject(backpackId), player, true]);
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
			Orion.Wait(400)
			GetOut()
			Orion.Wait(10000)
			checkedPlayers = []
		}
		else {
		Orion.Print('checked'+player.Name())
			checkedPlayers.push(player.Serial())
		}
		if (!Player.Hidden()) {
			GetOut()
		}

	}
	Orion.Wait(1000)
}

function BackupEscape() {
	while (true) {
		Orion.Wait(100)
		if (!Player.Hidden() && (Player.Hits() < (Player.MaxHits() - 10)) && Orion.FindTypeEx(any, any, ground,
			'ignoreself|mobile', 15).length > 0) {
			GetOut()
		}
	}
}

function GetOut() {
	if (Player.Notoriety() === 3) {
		//DrinkInvis()
		WalkTo(coordinate(5140, 1773, 0), 0)
		Orion.Wait(100)
	}
	else {
		var gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 15).shift()
		WalkTo(gate,1)
		Orion.UseObject(gate.Serial());
		Orion.WaitForGump(1000)
		var gump0 = Orion.GetGump('last');

		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
			var gumpHook0 = Orion.CreateGumpHook(1);
			gumpHook0.AddCheck(200, true);
			gump0.Select(gumpHook0);
			Orion.Wait(100);
		}
		Orion.Wait(2000)
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

function LoopThoughGate() {
	for (var index = 0; index < 10; index++) {
		var gate = Orion.FindTypeEx('0x4B8F|0x4B8C|0x4BCB', any, ground, 'item', 15).shift()
		Orion.UseObject(gate.Serial());
		if (Orion.WaitForGump(1000)) {
			var gump0 = Orion.GetGump('last');
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
				gump0.Select(Orion.CreateGumpHook(index));
				Orion.Wait(100);
			}
		}
	}
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
		var msg = Orion.WaitJournal('anim', Orion.Now(), Orion.Now() + 1000)
		if (msg != null) {
			TextWindow.Print(Orion.Time());
			TextWindow.Print(msg.Text());
		}
	}
}
function StealTarget(){
var target = SelectTarget()
if(Orion.Contains(target.Properties(), 'Rarity'))
{
WalkTo(target)
Orion.UseSkillTarget('Stealing',target.Serial())
}
}

function HighlightArtifact() {
	var uniqueChestIds = [];
	while (!Player.Dead()) {
		Orion.ClearFakeMapObjects();
		Orion.IgnoreReset();
		var chestIds = Orion.FindTypeEx(
			any
			, any, any, 'item', 160).filter(function (item) {
				return Orion.Contains(item.Properties(), 'Rarity');
			});

		chestIds.forEach(function (chest) {
			var chestId = chest.Serial();
			Orion.AddFakeMapObject(chestId, chest.Graphic(), '0x35', chest.X(), chest.Y(), chest.Z());
		});
		Orion.Wait(1000);
	}
}

function TrainHiding() {
    while (!Player.Dead()) {
        Orion.Wait(500)
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() + 20, Player.Z(), 8, 8, 0);
        Orion.UseSkill('Hiding')
        Orion.WalkTo(Player.X(), Player.Y() - 20, Player.Z(), 8, 8, 0);
    }
}
function TrainStealth() {
    while (!Player.Dead()) {

        if (Orion.SkillValue('Stealth') > 999) {
            Orion.CloseUO();
        }
        var gate = Orion.FindTypeEx('0x4BCB', any, any, any, 20).shift();
        if (gate != null) {

            Orion.Wait(50);
        }
        WalkTo(gate, 0, 2000, 0)

        Orion.UseObject(gate.Serial());
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
                var gumpHook0 = Orion.CreateGumpHook(1);
                gumpHook0.AddCheck(200, true);
                gump0.Select(gumpHook0);
            }
        }
        Orion.Wait(500)
        Orion.Step(1)
    }
}
//#include Scripts/helpers/Target.js
//#include Stealther.js
//#include Scripts/Actions/Tricks.js