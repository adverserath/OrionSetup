function ShowTotDrop() {
    function ReadPoints(gump) {
        // htmlgump 450 200 200 16 22 0 0 
        var regex = /htmlgump 450 200 200 16 (\d*) 0 0/g;
        var gumpText = gump.CommandList().toString()
        var result = regex.exec(gumpText)

        var field = ''
        if (result != null) {
           field = gump.Text(result[1])    

        var lastPoints = parseFloat(Orion.RegRead('totPoints', 'Software\\OrionAssistant\\vars\\' + Player.Name()))
        var points = parseFloat(field.substring(24).replace(/,/g, ''))
        Orion.RegWrite('totPoints', points, 'Software\\OrionAssistant\\vars\\' + Player.Name());
        if (lastPoints > points)
            BotPush(Player.Name() + ' arti drop')
        return points
}
    }

    function WaitForKill(){
        // var journal = Orion.WaitJournal('You have gained some', Orion.Now(), Orion.Now()+10000);
        // if(journal!=null){
        //     Orion.Print(38, "killed")
        // }
        var last = Orion.ClientLastAttack()
        while(Orion.ClientLastAttack()==last)
            {
                Orion.Wait(100)
            }
    }

    while (true) {

        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x02EE5C01')) {
            if (Orion.Contains(gump0.ButtonList(), 'button 270 410 4005 4007 1 0 500')) {
                gump0.Select(Orion.CreateGumpHook(500));
                Orion.Wait(200);
                gump0 = Orion.GetGump('last');

                TotGump(ReadPoints(gump0))
                WaitForKill()

                continue;
            }
        }

        Orion.RequestContextMenu(Player.Serial());
        Orion.WaitContextMenuID(Player.Serial(), 1);
        Orion.Wait(500)
        if (Orion.WaitForGump(2000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x02EE5C01')) {
                gump0.Select(Orion.CreateGumpHook(11));
                Orion.Wait(400);
            }
        }
        if (Orion.WaitForGump(2000)) {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x02EE5C01')) {
                Orion.Wait(400);

                gump1.Select(Orion.CreateGumpHook(104));
            }
        }
        if (Orion.WaitForGump(2000)) {
            var gump3 = Orion.GetGump('last');
            if ((gump3 !== null) && (!gump3.Replayed()) && (gump3.ID() === '0x02EE5C01')) {
                TotGump(ReadPoints(gump3))
            }
        }
        WaitForKill()

    }


}


var gump = null
function TotGump(points) {
    var gumpId = 62
    gump = Orion.CreateCustomGump(gumpId);
    gump.SetNoClose(true);
    gump.Clear();
    gump.AddHtmlGump(1, 0, 0, 180, 50, '0x1400', 1, 0);
    gump.Select('htmlgump', 1);
    gump.AddText(10, 10, '0x0035', 'Tot drop chance -- ' + points);
    // gump.AddText(10, 30, '0x0035', 'Highest DPS -- ' + highestdps);
    // gump.AddText(10, 50, '0x0035', 'Taken DPS -- ' + takendps);
    // gump.AddText(10, 70, '0x0035', 'Damage Dealt -- ' + damageDealt);
    // gump.AddText(10, 90, '0x0035', 'Damage Taken -- ' + damageTaken);

    gump.Select('gump');
    gump.Update();
}
//#include helpers/Notifier.js
//#include helpers/Debug.js