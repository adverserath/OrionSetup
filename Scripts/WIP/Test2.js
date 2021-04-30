function TimeRun() {
	while (true) {
		var npc = Orion.FindTypeEx(any, any, ground,
			'mobile', 15, 'yellow|blue')
		//.
		//filter(function (mob) {
		//	return mob.Notoriety() >= 3 && mob.Notoriety() <= 6 && mob.Name() != ''
		//})
		npc.forEach(function (npc) {
			Orion.ActivateClient();

		})
		Orion.Wait(1000)
	}
}

function HerdEverything() {
	while (true) {
		var npc = Orion.FindTypeEx(any, any, ground,
			'mobile', 40, 'gray|criminal')
			.filter(function (mob) {
				return mob.Properties().indexOf('Tameable') !== -1
			})
			.sort(function (t1, t2) {
				return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
			});
		npc.forEach(function (npc) {
			var pathTo = Orion.GetPathArray(npc.X(), npc.Y()).length;
			if (pathTo == 0) {
				pathTo = npc.Distance()
			}
			Orion.Print(npc.Name() + pathTo)
		})
		Orion.Wait(4000)
	}

}