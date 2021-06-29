//#include Scripts/helpers/Notifier.js

function PickItUp() {
	while (true) {
		Orion.Wait(200)
		var stuff = Orion.FindTypeEx(any, any, ground, 'item', 1)
			.filter(function (item) {
				return !Orion.Contains(item.Properties(), 'Locked down') && item.InLOS()
			})

		stuff.forEach(function (item) {
			Orion.Print(item.Name())
			if (Player.WarMode())
				Orion.MoveItem(item.Serial());
			else
				Orion.DragItem(item.Serial());
			Orion.Wait(800);
		})
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
			}
			var startTime = Orion.Now()
			if (!Player.WarMode() && lastReset < Orion.Now() - 10000 && lastStepNumber >= 15) {
				lastReset = Orion.Now()
				Orion.UseSkill('Stealth')
			}

			var stealthReset = Orion.InJournal('You begin to move quietly', '', '0', '-1', lastStepTime, Orion.Now()) != null;
			if (stealthReset) {
				Orion.Print('Reset Stealth')
				lastStepNumber = 0
			}

			Orion.ClientOptionSet('BlockRunWhileHidden', lastStepNumber >= 15);

			lastStepTime = Orion.Now()
		}
	}

}

var untrustable = ['Maps', 'Clover', 'SoundWave', 'Melisande', 'Dark Mother', 'a unicorn', 'Katabrok']
function PlayerScanner() {
	var players = []
	var lastPlayers = []
	while (true) {
		Orion.Wait(1000)
		if (condition) {
			Orion.Say('[players');

			if(Orion.WaitForGump(1000))
{
			var gump0 = Orion.GetGump('last');
			if (gump0.ID() === '0x5B9791B5') {
				players = players.concat(gump0.TextList().slice(1, 11))
				while ((gump0.ButtonList().join(' ').match(/(?:(?:\w*)\s){7}2/gi) || []).length >= 1) {
					if ((gump0 !== null && gump0.ID() === '0x5B9791B5')) {
						gump0.Select(Orion.CreateGumpHook(2));
						Orion.WaitForGump(1000)
						gump0 = Orion.GetGump('last');

						players = players.concat(gump0.TextList().slice(1, 20))
					}

				}

				if (Orion.WaitForGump(1000)) {
					var gump2 = Orion.GetGump('last');
					if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x5B9791B5')) {
						gump2.Select(Orion.CreateGumpHook(0));
					}
				}


				players.forEach(function (player) {
					if (lastPlayers.indexOf(player) < 0 && lastPlayers.length != 0) {
						TextWindow.Print(player + ' has joined at ' + Orion.Time())
						BotPush(player + ' has joined at ' + Orion.Time(), true)
					//	Orion.SayAlliance(player + ' has joined');
					}
				})

				lastPlayers.forEach(function (player) {
					if (players.indexOf(player) == -1) {
						TextWindow.Print(player + ' has left at ' + Orion.Time())
						BotPush(player + ' has left at ' + Orion.Time(), true)
						//Orion.SayAlliance(player + ' has left');
					}
				})

				lastPlayers = players.slice()
				players = []
			}
		}
	}}
}

var condition = true
function PlayerDetected() {
	while (true) {
		Orion.Wait(100)

		if (condition) {
			var npc = Orion.FindTypeEx(any, any, ground,
				'ignoreself|mobile', 46)
			npc.forEach(function (npc) {
				if (npc.Properties().indexOf('Legacy') != -1 || npc.Name() === 'a unicorn') {
					Orion.Print(npc.Name())
					Orion.ActivateClient();
					BotPush('Detected : ' + npc.Name() + ' ' + npc.Notoriety() + '  ' + 'X' + npc.X() + 'Y' + npc.Y(), true)
					Orion.SayParty('Detected : ' + npc.Name() + ' ' + npc.Notoriety())
					Orion.Wait(3000)
					//  Orion.PlayWav('C:\\Sounds\\Windows Background.wav');
				}
			})
			Orion.Wait(2000)
			if (Player.Hits() < Player.MaxHits()) {
				//    BotPush('Injured')
				///   Orion.ActivateClient();
				Orion.Wait(10000)
			}
			var paragonCorpse = Orion.FindTypeEx('0x2006', '0x0501', ground,
				'', 10);
			if (paragonCorpse.length > 0) {
				Orion.Ignore(paragonCorpse.shift().Serial())
				// Orion.ActivateClient();
				Orion.Wait(10000)
			}
		}
	}
}
