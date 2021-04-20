//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

function GeneratedScript_001752() {
    var rune = SelectTarget();
    var newBook = SelectTarget();
    MarkRune(rune);

    Orion.UseObject(rune.Serial());
    if (Orion.WaitForPrompt(1000)) {
        Orion.SendPrompt('test')
    }
    Orion.Wait(1000);
    //Add Rune to new book
    Orion.MoveItem(rune.Serial(), 0, newBook.Serial());

}
function CopyRuneBook() {
    DebugStart();

    Orion.Print('Select a safe spot rune')
    var safeSpot = SelectTarget();
    if (safeSpot == null) {
        Orion.ToggleScript('CopyRuneBook');
    }

    Orion.Print('Select original book')
    var originalBook = SelectTarget();
    var originalBookName = originalBook.Properties()
        .match(/(?:.*\n)*((?:\w|\s|.)*){1}/i)[1];

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
            Orion.Wait(300)
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
    var runes = Orion.FindTypeEx('0x1F14', any, backpack).filter(function (rune) { return runeBookRune == null || rune.Serial() != runeBookRune.Serial() })
    if (runes.length < runesNeeded) {
        Orion.Print('You need more blank runes')
        Orion.ToggleScript('CopyRuneBook');
    }
    //For 0+2 to X+2
    var firstMove = true;
    for (var recallId = 1; recallId <= locations; recallId++) {
        MeditateSafely(safeSpot);
        if (runeBookRune != null) {
            var lastX = Player.X()
            var lastY = Player.Y()
            if (!firstMove)
                RecallRune(runeBookRune);
            firstMove = false;
            Orion.Wait(500)
            WalkTo(originalBook);
        }
        var firstTry = true;
        while (firstTry || Orion.InJournal('You have not yet recovered', '', '0', '-1', startCastTime, Orion.Now()) != null) {
            firstTry = false;
            Orion.UseObject(originalBook.Serial());
            var recallbutton = (49 + recallId);
            var lastX = Player.X()
            var lastY = Player.Y()
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
        }

        while (Player.X() == lastX && Player.Y() == lastY) {
            Orion.Wait(200)
            if (Orion.InJournal('blocking the location', '', '0', '-1', startCastTime, Orion.Now()) != null) {
                BotPush('Location (' + locationName + ') is blocked')
                Orion.PauseScript();
            }
        }
        newBooks.forEach(function (newBook) {
            Orion.Wait(600)
            Orion.Step(Orion.Random(0, 7))
            Orion.Wait(200)
            Orion.Step(Orion.Random(0, 7))

            //Mark Rune
            var rune = runes.shift();
            MarkRune(rune);

            Orion.UseObject(rune.Serial());
            if (Orion.WaitForPrompt(1000)) {
                Orion.Wait(200);
                Orion.SendPrompt(locationName)
            }
            //Add Rune to new book
            Orion.Wait(1000);
            Orion.MoveItem(rune.Serial(), 0, newBook.Serial());
            Orion.Wait(1000);
        });
    }
}

function MeditateSafely(safeSpot) {
    if (Player.Mana() < 50) {
        RecallRune(safeSpot)
        TakeOffClothesAndMeditate();
        Orion.Wait(2000);
    }
}