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

function SpellTimer()
{
var total = 0
var count = 0
while(true)
{
Orion.Wait(2000)
var start = Orion.Now()
Orion.Cast("Magic Arrow")
if(Orion.WaitForTarget(3000))
{
var fin = Orion.Now()
count++
total += fin-start
Orion.Print(Orion.GetPing('avg'))
Orion.Print('AvgTime:'+(total/count))
Orion.CancelTarget()
}
}
}