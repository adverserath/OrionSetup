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
