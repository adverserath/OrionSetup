//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

function GeneratedScript_110640()
{
	if (Orion.WaitForGump(1000))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x000001F2'))
		{
			gump0.Select(Orion.CreateGumpHook(133));
			Orion.Wait(100);
		}
	}
}

function CopyRuneBook() {
    DebugStart();

    Orion.Print('Select original book')
    var originalBook = SelectTarget();
    Orion.Print('Select new book')
    var newBook = SelectTarget();

var runeBookRune;
    if (originalBook.Container()!=backpack)
    {
        Orion.Print('Select runebook location rune')
        runeBookRune = SelectTarget();
        WalkTo(newBook);
//Create rune to location

    }
    //Open Original book
    Orion.UseObject(newBook.Serial())
    Orion.Wait(500)

    //Count Locations = X
    var newBookgumpinfo = Orion.GetLastGump().TextList();
    var newBooklocations = 0;
    for (var textId = 2; textId < 18; textId++) {
        if (newBookgumpinfo[textId] != 'Empty')
            newBooklocations++;
    }
    Orion.GetLastGump().Close();

    if (newBooklocations != 0) {
        Orion.Print('New book must be empty')
        Orion.ToggleScript('CopyRuneBook');
    }

    Orion.Wait(1000)
    //Open Original book
    Orion.UseObject(originalBook.Serial())
    Orion.Wait(500)
    //Count Locations = X
    var gumpinfo = Orion.GetLastGump().TextList();
    var locations = 0;
    for (var textId = 2; textId < 18; textId++) {
        if (gumpinfo[textId] != 'Empty')
            locations++;
    }
    Orion.Print(locations)
    //Get X runes
    //Orion.ClearFindList('Runes');
    var findList = Orion.GetFindList('Runes')

    var runeitem = findList.Items()[0];
    runeitem.SetCount(locations);
    Orion.UpdateFindList(findList);
    Restock('Runes')
    if (!Orion.Count(runeitem.Graphic(), runeitem.Color(), backpack, '', '', true) >= locations) {
        Orion.Print('Not Enough Runes, collect ' + (locations - Orion.Count(runeitem.Graphic(), runeitem.Color(), backpack, '', '', true)) + ' runes and continue')
        Orion.PauseScript();
    }
    var runes = Orion.FindTypeEx('0x1F14', '0x0000', backpack)
    if (runes.length < locations) {
        Orion.Print('You need more blank runes')
        Orion.ToggleScript('CopyRuneBook');
    }
    //For 0+2 to X+2
    for (var recallId = 1; recallId < locations; recallId++) {
        Orion.UseObject(originalBook.Serial());
        Orion.Print('Recalling to ' + gumpinfo[recallId + 1])
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00000059')) {
                gump0.Select(Orion.CreateGumpHook((49 + recallId)));
                Orion.Wait(100);
            }
        }
        var lastX = Player.X()
        var lastY = Player.Y()

        while (Player.X() == lastX && Player.Y() == lastY) {
            Orion.Wait(100)
        }
        Orion.Wait(2000)
        //Mark Rune
        var rune = runes.shift();
        MarkRune(rune);
        Orion.Wait(500);
        Orion.UseObject(rune.Serial());
        Orion.Wait(300);
        Orion.SendPrompt(gumpinfo[recallId + 1])
        Orion.Wait(600);
        //Add Rune to new book
        Orion.MoveItem(rune.Serial(), 0, newBook.Serial());
        Orion.Wait(1000);

    }


}