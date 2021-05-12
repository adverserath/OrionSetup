//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function PlayerDetected() {
	while (true) {
	Orion.Wait(500)
		var npc = Orion.FindTypeEx(any, any, ground,
			'mobile|human', 15, 'yellow|criminal')
		npc.forEach(function (npc) {
		if(npc.Properties().indexOf('Shop')==-1)
		{Orion.Print(npc.Properties().indexOf('Shop'))
			Orion.ActivateClient();
BotPush('Detected : '+npc.Name())
Orion.PlayWav('C:\\Sounds\\Windows Background.wav'); 
}
		})
		Orion.Wait(2000)	
		if(Player.Hits()<Player.MaxHits())
		{
				BotPush('Injured')
					Orion.ActivateClient();
							Orion.Wait(10000)	
		}
		var paragonCorpse = Orion.FindTypeEx('0x2006', '0x0501', ground,
			'', 10);
		if(paragonCorpse.length>0)
			{
			Orion.Ignore(paragonCorpse.shift().Serial())
					Orion.ActivateClient();
							Orion.Wait(10000)	
			}
	}
}

function DrawLOS()
{
while(true)
{
Orion.ClearFakeMapObjects();

  var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,15]

  var target = Player
  var x = target.X();
  var y = target.Y();

  range.forEach(function (distance) {
    Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance).concat()

      .forEach(function (tile) {
        if (Orion.InLOS(Player.X(),Player.Y(),Player.Z(),tile.X(), tile.Y(),tile.Z())) {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x0197', tile.X(), tile.Y(), tile.Z());

        }
        else {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
      }
      )
  })
Orion.Wait(1000)
}
}

function BardRange() {
  var range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  Orion.ClearFakeMapObjects();

  var target = Player
  var x = target.X();
  var y = target.Y();

  range.forEach(function (distance) {
    Orion.GetTilesInRect('land', x - distance, y - distance, x + distance, y + distance).concat()

      .forEach(function (tile) {
        var xDelta = tile.X() - Player.X()
        var yDelta = tile.Y() - Player.Y()
        var sqrt = Math.sqrt((xDelta * xDelta) + (yDelta * yDelta))

        if (sqrt < 15) {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x0197', tile.X(), tile.Y(), tile.Z());

        }
        else {
          Orion.AddFakeMapObject(Orion.Random(10000) + tile.Y(), '0x051A', '0x3197', tile.X(), tile.Y(), tile.Z());
        }
      }
      )
  })

}

function simpleJSONstringify() {
  var obj = SelectTarget().Properties;
  var prop, str, val,
    isArray = obj instanceof Array;

  if (typeof obj !== "object") return false;

  str = isArray ? "[" : "{";

  function quote(str) {
    if (typeof str !== "string") str = str.toString();
    return str.match(/^\".*\"$/) ? str : '"' + str.replace(/"/g, '\\"') + '"'
  }

  for (prop in obj) {
    if (!isArray) {
      // quote property
      str += quote(prop) + ": ";
    }

    // quote value
    val = obj[prop];
    str += typeof val === "object" ? simpleJSONstringify(val) : quote(val);
    str += ", ";
  }

  // Remove last colon, close bracket
  str = str.substr(0, str.length - 2) + (isArray ? "]" : "}");

  TextWindow.Print(str);
}

function openCorpse() {
  Orion.OpenContainer('0x4205AD94');
}


function NotEnoughResourcesGump() {
  TextWindow.Open();
  var output = Orion.GetLastGump();//.foreach(function (cmd){
  var value = output.CommandList().filter(function (text) {
    TextWindow.Print(text.search('1044155|1044154'));

    return text.search('1044155|1044154') >= 0;

  })
  TextWindow.Print(value);

}

function GumpText() {
  var output = Orion.GetLastGump();//.foreach(function (cmd){
  TextWindow.Open();
  TextWindow.Print(output.EntriesList());


}

var debug = true;

function GetTargetAndPrint() {
  TextWindow.Open();

  var obj = SelectTarget();
  //  Orion.GetProfile('myTarget',2000)
  TextWindow.Print(obj.Name());
  TextWindow.Print(obj.FullName());
  TextWindow.Print(obj.Notoriety());
  TextWindow.Print('player' + obj.IsPlayer());
  TextWindow.Print('color' + obj.NameColor());

  TextWindow.Print('yellow' + obj.YellowHits());

  TextWindow.Print(obj.Race());
  TextWindow.Print(obj.ProfileReceived());
  TextWindow.Print(obj.Flags());
  TextWindow.Print(obj.IgnoreCharacters());
  TextWindow.Print(obj.NameColor());
  TextWindow.Print(('' + obj.Title()).substr(0, 3));
}

function getFlags() {
  var a = Orion.InfoContextMenu()
  TextWindow.Print(a.trim());


}

function getTileData() {
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');

  var tiles = Orion.GetTiles('land', Player.X(), Player.Y(), 0, 100);
  TextWindow.Print('tile' + tiles.length);
  TextWindow.Print('tile' + tiles[0].Z());
}

function test() {
  TextWindow.Clear()
  TextWindow.Print('watertile')
  Orion.GetTiles(any, 2273, 1032).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
  TextWindow.Print('staticwater')
  Orion.GetTiles('any', 2276, 1053).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
  TextWindow.Print('grass')
  Orion.GetTiles('any', 2276, 1061).forEach(function (tile) {
    TextWindow.Print(tile.Flags())
    TextWindow.Print((tile.Flags() & 524288) == 524288)
  })
}

function getPeople() {
  Orion.FindTypeEx(any, any, ground, 'human|live|ignoreself|ignorefriends', 20, 7)
    .foreach(function (mob) {
      TextWindow.Print(mob.Name());
    });
}

function sell() {
  Orion.Buy('bInscribe');
}
//    Orion.WaitForAddObject('myTarget');
//    var enemy = Orion.TargetObject('myTarget');
//var enemy = Orion.FindEnemy();
//Orion.Print(enemy);
//Orion.ShowStatusbar(Orion.FindEnemy('next'), 1000, 1000);
//Orion.FindList('listName', 'container', 'mobile', '10');
//Orion.Print(Orion.FindList('listName', 'container', 'mobile', '10'));

