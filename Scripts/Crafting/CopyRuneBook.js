//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

function GeneratedScript_001752() {
    Orion.Print(Orion.ObjAtLayer(21).Serial())
}

function CopyRuneBook() {
    DebugStart();

    Orion.Print('Select original book')
    var originalBook = SelectTarget();
    var originalBookName = originalBook.Properties()
        .match(/(?:.*\n)*((?:\w|\s)*){1}/i)[1];

    Orion.Print('Select news books, press escape to start')
    var newBooks = [];
    var newSelectedBook = 1;
    while (newSelectedBook != null) {
        newSelectedBook = SelectTarget();
        if (newSelectedBook != null && newSelectedBook.Graphic() != '0x22C5') {
            Orion.Print('That wasnt a runebook')
        }
        else if (newSelectedBook != null) {
            //Open Original book
            Orion.UseObject(newSelectedBook.Serial())
            Orion.WaitForGump(1000)

            //Count Locations = X
            var newBookgumpinfo = Orion.GetLastGump().TextList();
            var newBooklocations = 0;
            for (var textId = 2; textId < 18; textId++) {
                if (newBookgumpinfo[textId] != 'Empty')
                    newBooklocations++;
            }

            if (newBooklocations != 0) {
                Orion.Print('Book is not empty')
                Orion.ToggleScript('CopyRuneBook');
            }
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00000059')) {
                    gump0.Select(Orion.CreateGumpHook(1));
                    Orion.Wait(300);
                    Orion.SendPrompt(originalBookName);
                    Orion.Wait(300);
                }
            }
            Orion.GetLastGump().Close();
            Orion.Wait(600)
            newBooks.push(newSelectedBook);
        }
    }
    if (newBooks.length == 0) {
        Orion.Print('No Books Selected')
        Orion.ToggleScript('CopyRuneBook');
    }

    var runeBookRune;
    if (originalBook.Container() != Orion.ObjAtLayer(21).Serial()) {
        Orion.Print('Select runebook location rune')
        runeBookRune = SelectTarget();
        WalkTo(originalBook);
        Orion.Wait(1000);
        Orion.Print('Marking Original Location')
        MarkRune(runeBookRune);
        Orion.Wait(1000);
    }

    //Open Original book
    Orion.UseObject(originalBook.Serial())
    Orion.WaitForGump(1000);
    //Count Locations = X
    var gumpinfo = Orion.GetLastGump().TextList();
    var locations = 0;
    for (var textId = 2; textId < 18; textId++) {
        if (gumpinfo[textId] != 'Empty')
            locations++;
    }
    var runesNeeded = (locations * newBooks.length)
    Orion.Print(locations)
    //Get X runes
    //Orion.ClearFindList('Runes');
    var findList = Orion.GetFindList('Runes')

    var runeitem = findList.Items()[0];
    runeitem.SetCount(runesNeeded);
    Orion.UpdateFindList(findList);
    Restock('Runes')
    if (!Orion.Count(runeitem.Graphic(), runeitem.Color(), backpack, '', '', true) >= runesNeeded) {
        Orion.Print('Not Enough Runes, collect ' + (runesNeeded - Orion.Count(runeitem.Graphic(), runeitem.Color(), backpack, '', '', true)) + ' runes and continue')
        Orion.PauseScript();
    }
    var runes = Orion.FindTypeEx('0x1F14', '0x0000', backpack)
    if (runes.length < runesNeeded) {
        Orion.Print('You need more blank runes')
        Orion.ToggleScript('CopyRuneBook');
    }
    //For 0+2 to X+2
    for (var recallId = 1; recallId <= locations; recallId++) {
        if (runeBookRune != null) {
            var lastX = Player.X()
            var lastY = Player.Y()
            Orion.Wait(500)
            RecallRune(runeBookRune);
            Orion.Wait(2000)
            while (Player.X() == lastX && Player.Y() == lastY) {
                Orion.Wait(2000)
                RecallRune(runeBookRune);
            }
            WalkTo(originalBook);
            Orion.Wait(1000)
        }
        Orion.UseObject(originalBook.Serial());
        var recallbutton = (49 + recallId);
        var lastX = Player.X()
        var lastY = Player.Y()

        Orion.Print('Recalling to ' + gumpinfo[recallId + 1] + ' button: ' + recallbutton)
        if (Orion.WaitForGump(1000)) {
            Orion.Wait(500)
            var gump0 = Orion.GetGump('last');

            Orion.Print(recallbutton)
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00000059')) {
                gump0.Select(Orion.CreateGumpHook(recallbutton));
                Orion.Wait(100);
            }
        }

        while (Player.X() == lastX && Player.Y() == lastY) {
            Orion.Wait(100)
        }
        newBooks.forEach(function (newBook) {
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

        });
    }
}