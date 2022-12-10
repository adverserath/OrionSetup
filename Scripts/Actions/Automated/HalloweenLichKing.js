//#include helpers/Target.js
//#include helpers/Pet.js
//#include helpers/Magic.js
//#include helpers/Debug.js
//#include Fighting/SpellWeaving.js

function DeathLoop() {
	while (true) {
		Orion.Wait(100)
		Orion.Attack('0x0000D235')
		if (Player.Dead()) {
			Orion.RequestContextMenu('0x40108F65');
			Orion.WaitContextMenuID('0x40108F65', 1);
			if (Orion.WaitForGump(1000)) {
				var gump0 = Orion.GetGump('last');
				if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xB04C9A31')) {
					gump0.Select(Orion.CreateGumpHook(1));
					Orion.Wait(100);
				}
			}

		}
	}
}
function CloseAll() {
	Orion.RemoveAllUdpServers();
}
function StealtherEventStarter() {
	var gate = Orion.FindObject('0x40000455')

	while (Orion.Connected()) {

		while (!Orion.Contains(gate.Properties(), 'LichKing:')) {
			Orion.Wait(1000)
			if (!Player.Hidden()) {
				Orion.UseSkill('Hiding')
				Orion.Wait(10000)
			}
			TextWindow.Print(gate.Properties())
		}
		Orion.UdpSend('127.0.0.1', 4444, 'StartEvent')
		Orion.Wait(1000 * 60 * 58)
	}
}

function UDPLichKingBot() {
	Orion.RemoveAllUdpServers();

	var created = Orion.CreateUdpServer(Player.Name(), '127.0.0.1', 4444);
	if (created == 0) {
		Orion.Print('UDP server created and listening port: ' + 4444);
	}
	Orion.SetUdpServerCallback(Player.Name(), 'GoFightLichKingStarter');
}


function LichKingBotManual() {
	TextWindow.Open()
	while (Orion.Connected()) {
		var message = Orion.WaitJournal("The Lich King", Orion.Now() - 500, Orion.Now() + 1000, 'system');

		if (message != null) {
			if (Orion.Contains(message.Text(), 'invaded')) {
				Orion.ActivateClient()
				var ready = Orion.InputText(60000, 'Press Y to start');
				if (Orion.Contains(ready, 'y', true))
					StartInvasion()
			}
		}
	}
}
function StartInvasion() {
	while (!Orion.BuffExists('wraith form')) {
		Orion.Cast('Wraith form')
		Orion.Wait(2000)
	}
	RecallRune('0x401080D4')
	Orion.Wait(2000)
	ReadGate()
}
function ReadGate() {
	var gate = Orion.FindObject('0x40000455')

	while (!Orion.Contains(gate.Properties(), 'LichKing:')) {
		Orion.Wait(1000)
		if (!Player.Hidden()) {
			Orion.CastTarget('Invisibility', self)
			Orion.Wait(2000)
		}
		TextWindow.Print(gate.Properties())
	}

	GoFightLichKing()
}
function GoFightLichKingStarter() {
	Orion.ActivateClient()
	//	var ready = Orion.InputText(60000, 'Press Y to start');
	//if (Orion.Contains(ready, 'y', true))
	GoFightLichKing()
}
function GoFightLichKing() {
	RecallRune('0x4003ACF7')
	Orion.Wait(2000)
	//Orion.Cast('Ethereal Voyage')
	//Orion.Wait(2000)
	WalkTo(2755, 866)
	var lichking = SearchForLichKing()
	if (lichking != null) {
		var distance = 9
		WalkTo(lichking, distance)
		while (!lichking.InLOS()) {
			WalkTo(lichking, distance--)
		}
		while (!Orion.BuffExists('wraith form')) {
			Orion.Cast('Wraith form')
			Orion.Wait(2000)
		}
		Orion.CastTarget('Invisibility', self)
		if (Player.Followers() < 4) {
			Cast('Summon Fey')
			Orion.Wait(1000)
			Orion.Say('All guard')
		}

		Orion.Attack(lichking.Serial())

		while (lichking.Exists()) {
			if (!Orion.BuffExists('0x9BD2')) {
				Orion.Cast('Death Ray')
				if (Orion.WaitForTarget(4000)) {
					while (Orion.BuffExists('0x9BD2')) {
						if (Player.Mana() > 60 && !Orion.BuffExists('Arcane Empowerment')) {
							Cast('Arcane Empowerment')
							Orion.Wait(2000)
						}
						if (Player.Followers() < 2) {
							Cast('Summon Fey')
							Orion.Wait(1000)
							Orion.Say('All guard')
						}
						Orion.CastTarget('Flame strike', lichking.Serial())
						Orion.Wait(2500)

					}
					Orion.TargetObject(lichking.Serial())
				}
			}

			//WraithForm/DeathRay/Recall to Malas??
		}
		openLoot = Orion.Now() + (1000 * 60 * 3)
		ReleaseAllSummons()

		LootLichKing()
		//GoHome()
		Leave()
	}
}
function SearchForLichKing() {
	var lichking = Orion.FindTypeEx(any, any, ground,
		'nothumanmobile|live|ignoreself|ignorefriends', 35, 'gray|criminal|orange')
		.filter(function (enemy) {
			return Orion.Contains(enemy.Name(), 'Lich King')
		})
	while (lichking.length == 0) {
		lichking = Orion.FindTypeEx(any, any, ground,
			'nothumanmobile|live|ignoreself|ignorefriends', 35, 'gray|criminal|orange')
			.filter(function (enemy) {
				return Orion.Contains(enemy.Name(), 'Lich King')
			})
	}
	return lichking.shift()
}
function Leave() {
	WalkTo(2794, 868)
	Orion.Wait(1500)
	WalkTo(3492, 2570)
}
var openLoot = 0

function LootLichKing() {
	var lichking = Orion.FindTypeEx(any, any, ground,
		'nearest', 35)
		.filter(function (enemy) {
			return enemy.Count() == 308//Count 308
		}).shift()
	if (lichking != null) {
		Orion.WalkTo(lichking.X(), lichking.Y(), lichking.Z(), 0, 255, 1)
		Orion.Wait(100)
		Orion.UseObject(lichking.Serial())
	}
	Orion.Wait(10000)

	while (Orion.Now() < openLoot) {
		Orion.Wait(1000)
		if (!Player.Hidden()) {
			Orion.CastTarget('Invisibility', self)
			Orion.Wait(2000)
		}
	}

	//Give free time to loot
	Orion.FindTypeEx(any, any, ground,
		'nothumanmobile|live|ignoreself|ignorefriends', 20, 3)
		.filter(function (mob) {
			return !Orion.Contains(mob.Properties(), 'legacy')
				&& !Orion.Contains(mob.Properties(), 'Loyalty')
				&& !Orion.Contains(mob.Properties(), 'summon')
		}).forEach(function (mobile) {
			Orion.Print(mobile.Name())
			Orion.Attack(mobile.Serial())
			Orion.Wait(200)
		})
	Orion.Wait(1000)

	Orion.UseObject(lichking.Serial())
	Orion.Wait(7000)
}