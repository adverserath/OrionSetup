//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
//#include helpers/Gumps.js

function MakeLastScroll() {
    while (true) {
        Orion.Wait(100);
        Orion.UseObject('0x40010EE2');
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x38920ABD')) {
                gump0.Select(Orion.CreateGumpHook(21));
                Orion.Wait(100);
            }
        }
        while (Player.Mana() < Player.MaxMana()) {
            Orion.Wait(100);
        }
    }
}

function FillSpellBook() {
    DebugStart();

    Orion.FindTypeEx('0x0EFA')
        .filter(function (mbook) {
            return (mbook.Properties().match(/64 Spells/gi) || []).length != 1
        })
        .forEach(function (mbook) {
            if (mbook.Serial() != '0x423EAD8A') {
                TextWindow.Print(mbook.Serial())
                StartInscription(mbook)
            }

        })
}
var pages = [1, 8, 15, 22];
//var pages = [50];

var spellNumbers = [2, 9, 16, 23, 30, 37, 44, 51, 58, 65, 72, 79, 86, 93, 100, 107];
var toolSet = '0x0FBF';
var listName = 'Inscription';
var storageBox = '0x400F48A7';

function StartInscription(scrollBox) {
    Restock(listName);
    var tool = '0x0FBF';
    var scrollIndex = 0;
    var firstScroll = parseInt('0x1F2D');
    pages.forEach(function (page) {
        spellNumbers.forEach(function (spell) {
            var scrollId = '0x' + (firstScroll + scrollIndex).toString(16).toUpperCase();
            DebugText('Checking ' + scrollId);
            if (FindScrollAndMove(scrollId, scrollBox) == false) {
                DebugText('Creating ' + scrollId);

                CraftCreateLoop(page, spell, scrollBox, scrollId);
                Orion.Wait(1000);
            }
            else {
                Orion.Print('Scroll in book: ' + scrollId);
                Orion.Wait(1000);

            }
            Orion.Print(scrollIndex);
            scrollIndex = scrollIndex + 1;
        });
    });

    BotPush(Orion.Time() + "Book Finished Inscription");
}

function CraftCreateLoop(buttonMenuID, buttonItemID, containerID, scrollId) {
    Orion.Print(scrollId);
    var triedToBuy = false;
    var itemCreated = false;
    while (itemCreated == false) {
        var needToBuy = NotEnoughResourcesGump();
        if (needToBuy == false) {
            triedToBuy = false;
        }
        if (needToBuy && !triedToBuy) {
            Restock(listName);
            triedToBuy = true;
        }
        else if (needToBuy && triedToBuy) {
            BotPush("Out of regs")
            // Orion.ShutdownWindows('forced');
            Orion.PauseScript();
            triedToBuy = false;
        }
        else if (NeedMoreManaGump()) {
            while (Player.Mana() < Player.MaxMana()) {
                Orion.Wait(1000);
            }
        }

        var tools = Orion.FindTypeEx(toolSet, 'any', 'backpack');

        if (tools.length == 0) {
            BotPush("no tools left");
            Orion.PauseScript();
        }
        Orion.UseObject(tools.shift().Serial());
        Orion.Wait(500);

        var successfulCraft = false;
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {

                gump0.Select(Orion.CreateGumpHook(buttonMenuID));
            }
        }

        if (Orion.WaitForGump(1000)) {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (gump1.ID() === '0x38920ABD')) {
                gump1.Select(Orion.CreateGumpHook(buttonItemID));
                Orion.WaitForGump(2000);
                if (CreatedItemResourceGump() || CreatedExceptionalItemResourceGump() || InscribedScrollGump()) {
                    successfulCraft = true;
                    Orion.Wait(200);

                }
            }
        }
        else {
            Orion.UseObject(Orion.FindTypeEx(toolSet, 'any', 'backpack').shift().Serial());
        }
        Orion.Wait(100);
        itemCreated = FindScrollAndMove(scrollId, containerID);
    }

}

function FindScrollAndMove(scrollId, scrollBox) {
    var startTime = Orion.Now();

    var items = Orion.FindTypeEx(scrollId, any, backpack).concat(Orion.FindTypeEx(scrollId, any, storageBox));
    Orion.Wait(200);
    DebugText('FindAndMove');
    DebugText('Scroll: ' + scrollId);
    DebugText('Book: ' + scrollBox.Serial());
    if (items.length == 0) {
        DebugText('No Scrolls Found');
    }
    else {
        var item = items.shift();
        DebugText('Found Scrolls: ' + item.Name());
        if (Orion.ObjectExists(item.Serial())) {
            DebugText('Adding: ' + item.Name());
            Orion.MoveItem(item.Serial(), 0, storageBox);
            Orion.Wait(800);
            Orion.MoveItem(item.Serial(), 1, scrollBox.Serial());
            Orion.Wait(300);
            itemCreated = true;

            output = Orion.InJournal("That spell is", '', '0', '-1', startTime, Orion.Now());
            if (output != null) {
                DebugText('Already in book: ' + item.Name());
            }
            else {
                DebugText('Added to book: ' + item.Name());
            }
            return true;
        }
    }
    return false;
}

function RestackContainerItems() {
    Orion.Print('Select the container you would like to sort');
    var container = SelectTarget();
    MoveItems(container, container, 'any', 'any');
}
