
//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include Bod/Bods.js
//#include Bod/BodData.js


function EmptyUnusableSmallsOutBODBooks() {
    var books = [SelectTarget()]//[Orion.FindObject('0x4014549A')]  //Orion.FindTypeEx('0x2259', any, backpack)

    books.forEach(function (book) {
        ResetBookToSmall(book);
        ParsePagesForUnusable(book);
    })
    MoveBodsToBooks()
}

var startBookTime = 0
function ParsePagesForUnusable(book) {
    Orion.UseObject(book.Serial());
    Orion.Wait(500);
    var endOfBook = false;
    startBookTime = Orion.Now()
    while (!endOfBook) {
        while (ReadPageSearch(book.Serial())) {
            TextWindow.Print('Check same page again')
            if (Orion.FindTypeEx('0x2258', any, backpack).length > 10) {
                MoveBodsToBooks()
            }
        }
        Orion.Print('Check for Next Page')
        endOfBook = Orion.GetGump('last').ButtonList().join().match(/button\s225/i) == null;
        MoveBodsToBooks()
        ClickNextPage();
    }
    if (Orion.InJournal('The book is empty.', '', '0', '-1', startBookTime, Orion.Now()) == null)
        ResetBookFilter(book)
}

function ClickNextPage() {
    if (Orion.WaitForGump(3000)) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x54F555DF')) {
            gump1.Select(Orion.CreateGumpHook(3));
            Orion.Wait(100);
        }
    }
}

function ResetBookToSmall(book) {
    ResetBookFilter(book)
    Orion.Wait(200);
    if (Orion.WaitForGump(1000)) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
            gump1.Select(Orion.CreateGumpHook(8));
        }
    }
    Orion.Wait(200);
}
function ResetBookFilter(book) {
    Orion.UseObject(book.Serial());
    Orion.Wait(500);
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
            gump0.Select(Orion.CreateGumpHook(1));
            Orion.Wait(200);
        }
    }
    if (Orion.WaitForGump(1000)) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
            gump1.Select(Orion.CreateGumpHook(3));
        }
    }
    Orion.Wait(200);
}

function ReadPageSearch(bookId) {
    TextWindow.Print('Read Page - ' + bookId)
    hasDroppedOne = false;
    Orion.Wait(80);
    var gump = Orion.GetLastGump();
    var gumpinfo = gump.CommandList();
    var line = gumpinfo.join() + ','

    var smallBods = (line.match(/button\s(?:\d*\s){7},\stext\s(?:\d*\s){4},.?\w*\s61(?:\d*\s){4}\d*1062224\s(?:\d*\s){3},.?\w*\s103(?:\d*\s){4}\d*(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}\d*(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}\d*(?:\d*\s){4}){0,1},\s\w*\s\d*\s\d*\s\d*\s\d*/ig) || []);
    TextWindow.Print("small bods " + smallBods.length)
    smallBods.forEach(function (bod) {
        TextWindow.Print(bod)
        if (!hasDroppedOne) {
            var matches = (bod.match(/.?xmfhtmlgumpcolor\s61(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s103(?:\d*\s){4}(\d*)(?:\d*\s){4},.?\w*\s235(?:\d*\s){4}(\d*)(?:\d*\s){4}(?:,.?\w*\s316(?:\d*\s){4}(\d*)(?:\d*\s){4})?,\s\w*\s\d*\s\d*\s\d*\s(\d*)/i) || [])
            var buttons = (bod.match(/button(?:\d*\s){7}(\d*)/i) || [])
            var buttonId = parseInt(buttons[1]) - 1
            Orion.Print('matches ' + matches.length)
            TextWindow.Print('found ' + matches[2] + Orion.GetCliLocString(matches[2]))

            hasDroppedOne = SmallInLarge(matches[2], buttonId)
        }
    })
    Orion.Wait(100)
    return hasDroppedOne && Orion.InJournal('The book is empty.', '', '0', '-1', startBookTime, Orion.Now()) == null;
}

function SmallInLarge(smallBodCliloc, buttonId) {
    var retVal = false;

    if (!hasDroppedOne) {
        if ((largeSmallBodIds.indexOf(parseInt(smallBodCliloc)) == -1)) {
            hasDroppedOne = true;
            TextWindow.Print('DROPPING :' + smallBodCliloc + '  ' + Orion.GetCliLocString(smallBodCliloc) + ' button ' + buttonId)
            Orion.GetLastGump().Select(Orion.CreateGumpHook(buttonId));
            Orion.Wait(800)
            //Bin Here
            retVal = true;
        }
    }

    return retVal;
}
