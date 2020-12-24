//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js

function FillSpellBook(book) {
    DebugStart();

    if (book == null) {
        book = SelectTarget();
    }
    //		(/(reptile|dragon|demon|ogre|repond|bear|undead|orc|\n\s?elemental)\sslayer/gi) >= 1)

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
var pages = [1, 8, 15, 22, 29, 36, 43, 50];
//var pages = [50];

var spellNumbers = [2, 9, 16, 23, 30, 37, 44, 51];
var toolSet = '0x0FBF';
var listName = 'Inscription';
var storageBox = '0x46415E83';

function StartInscription(scrollBox) {
    Restock(listName);
    var tool = '0x0FBF';
    var scrollIndex = 0;
    var firstScroll = parseInt('0x1F2D');
    pages.forEach(function (page) {
        spellNumbers.forEach(function (spell) {
            var scrollId = '0x' + (firstScroll + scrollIndex).toString(16).toUpperCase();
            DebugText('Checking ' + scrollId);
            Orion.Print('Checking ' + scrollId);
            if (FindScrollAndMove(scrollId, scrollBox) == false) {
                DebugText('Creating ' + scrollId);

                CraftCreateLoop(page, spell, scrollBox.Serial(), scrollId);
                Orion.Wait(5000);
            }
            else {
                Orion.Print('Found ' + scrollId);
                Orion.Wait(5000);

            }
            Orion.Print(scrollIndex);
            scrollIndex = scrollIndex + 1;
        });
    });

    BotPush(Orion.Time() + "Book Finished Inscription");
}

function CraftCreateLoop(buttonMenuID, buttonItemID, containerID, scrollId) {
    Orion.UseObject(Orion.FindTypeEx(toolSet, 'any', 'backpack').shift().Serial());
    Orion.Print(scrollId);
    var triedToBuy = false;
    var itemCreated = false;
    while (itemCreated == false) {
        TextWindow.Clear();
        Orion.Wait(500);
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
        }
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
                    Orion.Wait(300);

                }
            }
        }
        else {
            Orion.UseObject(Orion.FindTypeEx(toolSet, 'any', 'backpack').shift().Serial());
        }
        Orion.Wait(500);
        FindScrollAndMove(scrollId);

    }

}

function FindScrollAndMove(scrollId, scrollBox) {
    var startTime = Orion.Now();

    var items = Orion.FindTypeEx(scrollId, any, backpack).concat(Orion.FindTypeEx(scrollId, any, storageBox));
    //Orion.Print(items.)
    items.forEach(function (item) {
        DebugText('Found ' + item.Name());
        if (Orion.ObjectExists(item.Serial())) {
            DebugText('Adding' + item.Name());
            Orion.MoveItem(item.Serial(), 1, scrollBox);

            Orion.Wait(300)
            itemCreated = true;


            output = Orion.InJournal("That spell is", '', '0', '-1', startTime, Orion.Now());
            if (output != null) {
                Orion.MoveItem(item.Serial(), 0, storageBox);
            }

        }
    });
    return (items.length > 0);
}

function RestackContainerItems() {
    Orion.Print('Select the container you would like to sort');
    var container = SelectTarget();
    MoveItems(container, container, 'any', 'any');
}
