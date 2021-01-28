//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

function test()
{
            Orion.Print('Going Home')
            Orion.Wait(2000)
                        Orion.Print('Walk In')
                Orion.WalkTo(Player.X()+3, Player.Y()-3, Player.Z(), 2, 255, 1, 1);
                Orion.Print('Move Stuff to Book')
                MoveItemsFromPlayer(Orion.FindTypeEx('0x2259')[0], '0x2258')
                                Orion.Print('Good Bye')
                Orion.CloseUO();
}
function Autostart() {
    Orion.Wait(3000)
    if (!((Player.Name().match(/(\w*)ian/gi) || []).length >= 1)) {
    Orion.Print('Not me')
    }
    else{
        //Find RuneBook
        var runebook = Orion.FindTypeEx('0x22C5', '0x08A1')[0];
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

        var npcs = ['0x0000511D','0x0000EC37','0x0000ED92','0x0000A68F','0x0000A6E2','0x000002F4']
        //0x0000511D -ins
        //0x0000EC37 -weav
        //0x0000ED92 -tink
        //0x0000A68F -carp
        //0x0000A6E2 - arm
        //0x000002F4 - fletch
        for (var recallId = 1; recallId <= locations; recallId++) {
            Orion.Wait(500)

            if(Player.Mana()<13){
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
                        Orion.Print('recallId:'+recallId)
                        Orion.Print('locations:'+locations)

            if(recallId==locations){
            Orion.Print('Going Home')
            Orion.Wait(1000)
                        Orion.Print('Walk In')
                Orion.WalkTo(Player.X()+3, Player.Y()-3, Player.Z(), 1, 255, 1, 1);
                Orion.Wait(1000)

                Orion.Print('Move Stuff to Book')
                MoveItemsFromPlayer(Orion.FindTypeEx('0x2259')[0], '0x2258')
                                Orion.Print('Good Bye')
                Orion.CloseUO();
            }

            if(!skip){
                var npcSerial =npcs[(recallId-1)]; 
                WalkTo(Orion.FindObject(npcSerial))
                Orion.Print('GetBod')
                for (var index = 0; index < 3; index++) {
                    
                    Orion.RequestContextMenu(npcSerial);
                    Orion.WaitContextMenuCliloc(npcSerial, '3006152');
                    if (Orion.WaitForGump(1000))
                    {
                        var gump0 = Orion.GetGump('last');
                        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x9BADE6EA'))
                        {
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

