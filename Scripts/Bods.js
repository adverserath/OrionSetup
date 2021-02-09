//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

var bodMap = [
    createMap('0x4000CAB5', '0x0483'),//tailor
    createMap('0x4000CABA', '0x0591'),//fletch
    createMap('0x400C4071', '0x05E8'),//carpentry
    createMap('0x4000CAB1', '0x044E'),//blacksmith
    createMap('0x4000CAB6', '0x0455'),//tinker
    createMap('0x40139DEB', '0x0A26'),//inscription
    createMap('0x4000CAB8', '0x09C9'),//alchemy
]

function test() {
    var bodBook = Orion.FindTypeEx('0x2259')[0];

    Orion.Print(((bodBook.Properties().match(
        /Deeds\sIn\sBook:\s(\d*)/i
    ) || [])[1] || 0) === 240)
}

function SortBods() {

    var chest = Orion.FindObject('0x40148DC5')
    WalkTo(chest);
        Orion.UseObject(chest.Serial());

    var bodBook = Orion.FindTypeEx('0x2259')[0];
    MoveItems(chest, Player, '0x2259', '0x0000')

    //emptybods
    while (((bodBook.Properties().match(
        /Deeds\sIn\sBook:\s(\d*)/i
    ) || [])[1] || 0) != 0) {
    Orion.UseObject(bodBook.Serial());    
    	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF'))
		{
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB'))
		{
			gump1.Select(Orion.CreateGumpHook(3));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForGump(1000))
	{
		var gump2 = Orion.GetGump('last');
		if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB'))
		{
			gump2.Select(Orion.CreateGumpHook(0));
			Orion.Wait(100);
		}
	}

    Orion.Wait(400)
            Orion.Print('Start Bod Drop Book')

        while (Orion.FindType('any').length < 49 && (((bodBook.Properties().match(
            /Deeds\sIn\sBook:\s(\d*)/i
        ) || [])[1] || 0)) != 0)
        {
        Orion.Wait(200)
        Orion.Print('Empting Book')
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
                    gump0.Select(Orion.CreateGumpHook(5));
                    Orion.Wait(100);
                }
            }
}
        Orion.Wait(200)

        bodMap.forEach(function (map) {
            var bodBook = Orion.FindObject(map.Book())
            MoveItems(Player, bodBook, '0x2258', map.Color())
        });
    }

    MoveItems(Player, chest, '0x2259', any)
    Orion.MoveItem(bodBook.Serial(), 0, Player.Serial());
}

function GetBods() {
    Orion.Wait(3000)
    if (!((Player.Name().match(/(\w*)ian/gi) || []).length >= 1)) {
        Orion.Print('Not me')
    }
    else {
        //Find RuneBook
        var runebook = Orion.FindTypeEx('0x22C5', '0x08A1|0x0850')[0];
        //Check for bod book
        var bodBook = Orion.FindTypeEx('0x2259', '0x0000')[0];
        //loop runebook locations and get bulks

        if (runebook == null || bodBook == null) {
            BotPush(Player.Name() + ' has no book')
            Orion.LogOut();
        }
        //logout
        Orion.UseObject(runebook.Serial())
        Orion.WaitForGump(1000);
        //Count Locations = X
        Orion.Wait(400);
        var gumpinfo = Orion.GetLastGump().TextList();
        var locations = 0;
        for (var textId = 2; textId < 18; textId++) {
            if (gumpinfo[textId] != 'Empty') {
                locations++;
            }
        }
        Orion.Print('Runes:' + locations);

        var npcs = ['0x0000511D', '0x0000EC37', '0x0000ED92', '0x0000A68F', '0x0000A6E2', '0x000002F4']
        //0x0000511D -ins
        //0x0000EC37 -weav
        //0x0000ED92 -tink
        //0x0000A68F -carp
        //0x0000A6E2 - arm
        //0x000002F4 - fletch
        for (var recallId = 1; recallId <= locations; recallId++) {
            Orion.Wait(500)

            if (Player.Mana() < 13) {
                while (Player.Mana() < 14) {
                    if (!Orion.BuffExists('Meditation')) {
                        Orion.UseSkill('Meditation');
                    }
                    Orion.Wait(4000);
                }
                Orion.Wait(4000);
                Orion.Wait(2000);
            }

            var skip = false;
            var startCastTime = Orion.Now();
            var lastX = Player.X()
            var lastY = Player.Y()



            while (Player.X() == lastX && Player.Y() == lastY && !skip) {
                if (Orion.InJournal('blocking the location', '', '0', '-1', startCastTime, Orion.Now()) != null) {
                    skip = true;
                }
                if (!skip) {
                    startCastTime = Orion.Now();
                    Orion.UseObject(runebook.Serial());
                    var recallbutton = (49 + recallId);
                    var locationName = gumpinfo[recallId + 1];
                    Orion.Print('Recalling to ' + locationName + ' button: ' + recallbutton)
                    var startCastTime = Orion.Now();
                    if (Orion.WaitForGump(1000)) {
                        Orion.Wait(200)
                        var gump0 = Orion.GetGump('last');

                        Orion.Print(recallbutton)
                        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00000059')) {
                            gump0.Select(Orion.CreateGumpHook(recallbutton));

                        }
                    }
                    Orion.Wait(3000)

                }
            }
            Orion.Print('recallId:' + recallId)
            Orion.Print('locations:' + locations)

            if (recallId == locations) {
                Orion.Print('Going Home')
                Orion.Wait(1000)
                Orion.Print('Walk In')
                Orion.WalkTo(Player.X() + 3, Player.Y() - 3, Player.Z(), 1, 255, 1, 1);
                Orion.Wait(1000)

                Orion.Print('Move Stuff to Book')
                MoveItemsFromPlayer(Orion.FindTypeEx('0x2259')[0], '0x2258')
                Orion.Print('Good Bye')
                Orion.CloseUO();
            }

            if (!skip) {
                var npcSerial = npcs[(recallId - 1)];
                WalkTo(Orion.FindObject(npcSerial))
                Orion.Print('GetBod')
                for (var index = 0; index < 3; index++) {
                    Orion.Wait(300)
                    Orion.RequestContextMenu(npcSerial);
                    Orion.WaitContextMenuCliloc(npcSerial, '3006152');
                    if (Orion.WaitForGump(1000)) {
                        Orion.Wait(200)
                        var gump0 = Orion.GetGump('last');
                        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9BADE6EA')) {
                            Orion.Wait(200)
                            gump0.Select(Orion.CreateGumpHook(1));
                            Orion.Wait(100);
                        }
                    }
                    Orion.Wait(500);

                }

            }
        }
    }
}

function createMap(id, color) {
    return {
        color: color,
        book: id,
        Color: function () {
            return this.color;
        },
        Book: function () {
            return this.book;
        }
    }
}

function BodReader(){
    Orion.File()
    TextWindow.Open()
    var gumpinfo = Orion.GetLastGump().CommandList();
gumpinfo.forEach(function (line) {
   // TextWindow.Print(line);

    (line.match(/.?xmfhtmlgumpcolor\s(?:\d*\s){4}(\d*)/i)||[]).forEach(function (match){

        TextWindow.Print(match)

    })
});
}

function ReadCliLoc() {
    var clilocs = []
    var file = Orion.NewFile();
  
    file.Open('cliloc.txt');
    if (file != null) {
      var i = 0;
      var location = '1'
      while (location != null && location) {
        //TextWindow.Print(i++)
        location = file.ReadLine();
        
          TextWindow.Print(location)
        if (location != null && location) {
          TextWindow.Print(location)
          var cliloc = location.split(';');
          var cliLine = {
            id: cliloc[0],
            name: cliloc[1],
            type: cliloc[2],
            Id: function () {
              return this.id;
            },
            Name: function () {
              return this.name;
            },
            Type: function () {
              return this.type;
            }
          }
          clilocs.push(cliLine);
    //      TextWindow.Print(cliLine[0])
   //       TextWindow.Print(cliLine[1])
        }
      }
    }
    file.Close();
    return clilocs;
  }