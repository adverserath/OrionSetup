//#include Scripts/helpers/Target.js

function FindKhaldun()
{
while(true){
var startCastTime = Orion.Now()

Orion.Wait(1800)
                Orion.UseSkillTarget('Detecting Hidden', self)
Orion.Wait(200)
//0x0AB9
		var chestIds = Orion.FindTypeEx(
			'0x0E42|0x0E40|0x0E3C|0x0E77|0x0E3E|0x0E7E|0x0E41|0x0E3D|0x09AB|0x0E7C|0x0E7F|0x0E43|0x0E3F'
			, '0x0AB9', any, any, 20).filter(function (chest) {
				return !chest.Ignored();
			}).filter(function (chest) {
			return ((chest.Properties().match(/contents/gi) || []).length) == 0
		});
		Orion.Print(chestIds.length)
                if (Orion.InJournal('keen senses', '', '0', '-1', startCastTime, Orion.Now()) != null || chestIds.length!=0) {
                    Orion.StopWalking();
                    if(chestIds.length == 0){
                    Orion.Wait(8000)
                    Orion.UseSkillTarget('Detecting Hidden', self)
		var chestIds = Orion.FindTypeEx(
			'0x0E42|0x0E40|0x0E3C|0x0E77|0x0E3E|0x0E7E|0x0E41|0x0E3D|0x09AB|0x0E7C|0x0E7F|0x0E43|0x0E3F'
			, '0x0AB9', any, any, 20).filter(function (chest) {
				return !chest.Ignored();
			}).filter(function (chest) {
			return ((chest.Properties().match(/contents/gi) || []).length) == 0
		});
                    }
                    if(chestIds.length>0)
                    {
                    Orion.Print('open chest')
                    var chest = chestIds.shift()
                    var chestId = chest.Serial()
                    Orion.AddFakeMapObject(chestId, chest.Graphic(), '0x35', chest.X(), chest.Y(), chest.Z()+5);
                    Orion.Print('X:' + chest.X(),    'Y:' + chest.Y(), '   Z:' + chest.Z())
                    WalkTo(chest);
                    startCastTime=Orion.Now();
                    				
                    				while(Orion.InJournal('yields|not appear', '', '0', '-1', startCastTime, Orion.Now()) == null){
                    				Orion.UseType('0x14FC', '0xFFFF')
                    								if (Orion.WaitForTarget(1000)) {
					Orion.TargetObject(chest.Serial());
				}
                    				}
                    				Orion.Wait(2000);
                    				startCastTime=Orion.Now();
                    				while(Orion.InJournal('harmless', '', '0', '-1', startCastTime, Orion.Now()) == null){
                    				Orion.Wait(10000);
                    				Orion.UseSkillTarget('Remove Trap', chest.Serial())
Orion.Wait(1000);
                    				}
                    				Orion.UseObject(chest.Serial())
				
                    }
                    Orion.PauseScript();
                }
var distance = 4
  Orion.ClearFakeMapObjects();

    var target = Orion.FindObject(Player.Serial())
    var x = target.X();
    var y = target.Y();
    
      Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance)
        .filter(function (tile) {
          return BorderEdge(x, y, tile, distance);
        })
        .forEach(function (tile) {
          Orion.AddFakeMapObject(Orion.Random(10000), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
        )
  }
}