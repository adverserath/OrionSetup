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


 function Tracking() 
{ 
TextWindow.Open()
var count = 0
var found = 0
  while (!Player.Dead()) {
    var Gump;
    Orion.UseSkill("Tracking");
    Orion.Wait(500);
    Gump = Orion.GetLastGump();
    Gump.Select(Orion.CreateGumpHook(4));
      Orion.Wait(1000);
      Gump = Orion.GetLastGump();
      count++
            Orion.Print(Gump.Text(0))
      if(Gump.Text(0)==='ningar')
      {
      found++
      TextWindow.Print('found :'+found+'/'+count)

      }
      TextWindow.Print(found/count)

    Gump.Close()
Orion.Wait(9000);
    }
      Orion.Wait(1000);
  } 
  
  