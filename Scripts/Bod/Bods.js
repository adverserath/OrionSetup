function IsBodInLarge(bodObject) {

    var bodProperties = bodObject.Properties()
    if (!Orion.Contains(bodProperties, 'Small Bulk Order'))
        return true; //Its large

    var lines = bodProperties.split('\n')
    var item = lines[lines.length - 1]
    var itemlength = item.indexOf(':')
    var itemName = item.substring(0, itemlength).toLowerCase()
    TextWindow.Print(itemName + ' ' + largeSmallBodNames.indexOf(itemName))
    var result = largeSmallBodNames.indexOf(itemName) !== -1
    TextWindow.Print(itemName + ' : ' + result)
    return result //is it in the lists
}

var bodChestSerial = '0x4003EE74' // '0x40148DBE' 

var bodMap = []

function GetName(color) {
    if (color == '0x0A26')
        return 'Inscription'
    if (color == '0x0455')
        return 'Tinker'
    if (color == '0x044E')
        return 'Blacksmith'
    if (color == '0x05E8')
        return 'Carpentry'
    if (color == '0x0483')
        return 'Tailor'
    if (color == '0x0591')
        return 'Fletch'
    if (color == '0x09C9')
        return 'Alchemy'
    return 'Other'
}


function NameBODBooksByColor() {
    Orion.FindTypeEx('0x2259', any, backpack).
        forEach(function (book) {
            Orion.RequestContextMenu(book.Serial());
            Orion.WaitContextMenuID(book.Serial(), 0);
            if (Orion.WaitForPrompt(1000))
                Orion.SendPrompt(GetName(book.Color()));
            Orion.Wait(300)
            Orion.MoveItem(book.Serial(), 1, '0x4003EE74')
            Orion.Wait(300)
        })
}

function PopulateBookIDs(map, usingBackPack) {
    var container = bodChestSerial
    if (usingBackPack)
        container = backpack
    TextWindow.Print('GetBook: ' + map.BookName())
    var books = Orion.FindTypeEx('0x2259', any, container, '', 2, '', true)
        .filter(function (book) {
            TextWindow.Print('name ' + (book.Properties().match(
                /Book\sName:\s(\w*)/i) || [])[1] || '')
            TextWindow.Print('count ' + ((book.Properties().match(
                /Deeds\sIn\sBook:\s(\d*)/i
            ) || [])[1] || 0))

            return ((book.Properties().match(
                /Book\sName:\s(\w*)/i) || [])[1] || '') === map.BookName() &&
                ((book.Properties().match(
                    /Deeds\sIn\sBook:\s(\d*)/i
                ) || [])[1] || 0) < 495
        })
    if (books.length > 0) {
        Orion.Print(books[0].Serial())
        TextWindow.Print(books[0].Serial())
        map.SetSerial(books[0].Serial())
    }
    else {
        Orion.Print(58,'No Bod Book for ' + map.BookName())
        //Orion.PauseScript();
    }
}

function MoveBodsToBooks() {
    if (bodMap.length == 0) {
        bodMap.push(createMap('Tailor', '0x00000000', '0x0483'))//tailor
        bodMap.push(createMap('Fletch', '0x00000000', '0x0591'))//fletch
        bodMap.push(createMap('Carpentry', '0x00000000', '0x05E8'))//carpentry
        bodMap.push(createMap('Blacksmith', '0x00000000', '0x044E'))//blacksmith
        bodMap.push(createMap('Tinker', '0x00000000', '0x0455'))//tinker
        bodMap.push(createMap('Inscription', '0x00000000', '0x0A26'))//inscription
        //  bodMap.push(createMap(('Alchemy'), '0x00000000', '0x09C9'))//alchemy

        bodMap.forEach(function (bodMapping) {
            Orion.Print(bodMapping.BookName())
            PopulateBookIDs(bodMapping, true)
            Orion.Print(bodMapping.Serial())
        }
        )
    }
    var bin = FindGroundItemWithName("A Trash Barrel")
    if (bin == null)
        bin = FindBackpackItemWithProperties(['Rubbish'])
    if (bin == null)
        bin = ground
    WalkTo(bin)
    bodMap.forEach(function (map) {
        var bodBook = Orion.FindObject(map.Serial())
        while (Orion.FindTypeEx('0x2258', map.BodColor(), backpack).length > 0 && (((bodBook.Properties().match(
            /Deeds\sIn\sBook:\s(\d*)/i
        ) || [])[1] || 0)) != 500) {
            var bodCount = (((bodBook.Properties().match(
                /Deeds\sIn\sBook:\s(\d*)/i
            ) || [])[1] || 0))
            TextWindow.Print('Book:' + map.BookName() + ' ' + map.Serial() + ' ' + map.BodColor())
            TextWindow.Print('Currently has ' + bodCount + ' bod in ' + map.BookName())

            Orion.FindTypeEx('0x2258', map.BodColor(), backpack).
                forEach(function (bod) {
                    if (IsBodInLarge(bod)) {
                        //Keeper
                        Orion.MoveItem(bod.Serial(), 1, map.Serial())
                        Orion.Wait(800)
                    }
                    else {
                        //Trash
                        Orion.MoveItem(bod.Serial(), 1, bin.Serial())
                        Orion.Wait(800)
                    }
                })
            //Orion.MoveItemType('0x2258', map.BodColor(), backpack, 0, map.Serial());
            //Orion.Wait(800)
        }
    });
}
function SortBodsBookToColouredBODBooksInBackPack() {
    Orion.Print('Here')

    var bodBook = SelectTarget()
    MoveBodsToBooks()

    //emptybods
    while (((bodBook.Properties().match(
        /Deeds\sIn\sBook:\s(\d*)/i
    ) || [])[1] || 0) != 0) {
        Orion.UseObject(bodBook.Serial());
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
                gump0.Select(Orion.CreateGumpHook(1));
                Orion.Wait(100);
            }
        }
        if (Orion.WaitForGump(1000)) {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
                gump1.Select(Orion.CreateGumpHook(3));
                Orion.Wait(100);
            }
        }
        if (Orion.WaitForGump(1000)) {
            var gump2 = Orion.GetGump('last');
            if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB')) {
                gump2.Select(Orion.CreateGumpHook(0));
                Orion.Wait(100);
            }
        }

        Orion.Wait(400)
        TextWindow.Print('Start Bod Drop Book')

        while (Orion.FindType('any').length < 80 && (((bodBook.Properties().match(
            /Deeds\sIn\sBook:\s(\d*)/i
        ) || [])[1] || 0)) != 0) {
            Orion.Wait(200)
            TextWindow.Print('Empting Book')
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
                    gump0.Select(Orion.CreateGumpHook(5));
                    Orion.Wait(100);
                }
            }
        }
        Orion.Wait(200)

        MoveBodsToBooks()
    }
}

function SortBodsToBODBooksInChest() {
    Orion.Wait(500);
    var chest = Orion.FindObject(bodChestSerial)
    WalkTo(chest);
    Orion.UseObject(chest.Serial());
    Orion.Wait(1000);
    bodMap.push(createMap('Tailor', '0x00000000', '0x0483'))//tailor
    bodMap.push(createMap('Fletch', '0x00000000', '0x0591'))//fletch
    bodMap.push(createMap('Carpentry', '0x00000000', '0x05E8'))//carpentry
    bodMap.push(createMap('Blacksmith', '0x00000000', '0x044E'))//blacksmith
    bodMap.push(createMap('Tinker', '0x00000000', '0x0455'))//tinker
    bodMap.push(createMap('Inscription', '0x00000000', '0x0A26'))//inscription
    bodMap.push(createMap(('Alchemy'), '0x00000000', '0x09C9'))//alchemy

    bodMap.forEach(function (bodMapping) {
        Orion.Print(bodMapping.BookName())
        PopulateBookIDs(bodMapping)
        Orion.Print(bodMapping.Serial())
    }
    )


    var bodBook = Orion.FindTypeEx('0x2259')[0];
    MoveItems(chest, Player, '0x2259', any)

    //emptybods
    while (((bodBook.Properties().match(
        /Deeds\sIn\sBook:\s(\d*)/i
    ) || [])[1] || 0) != 0) {
        Orion.UseObject(bodBook.Serial());
        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
                gump0.Select(Orion.CreateGumpHook(1));
                Orion.Wait(100);
            }
        }
        if (Orion.WaitForGump(1000)) {
            var gump1 = Orion.GetGump('last');
            if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x968739DB')) {
                gump1.Select(Orion.CreateGumpHook(3));
                Orion.Wait(100);
            }
        }
        if (Orion.WaitForGump(1000)) {
            var gump2 = Orion.GetGump('last');
            if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x968739DB')) {
                gump2.Select(Orion.CreateGumpHook(0));
                Orion.Wait(100);
            }
        }

        Orion.Wait(400)
        TextWindow.Print('Start Bod Drop Book')

        while (Orion.FindType('any').length < 80 && (((bodBook.Properties().match(
            /Deeds\sIn\sBook:\s(\d*)/i
        ) || [])[1] || 0)) != 0) {
            Orion.Wait(200)
            TextWindow.Print('Empting Book')
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x54F555DF')) {
                    gump0.Select(Orion.CreateGumpHook(5));
                    Orion.Wait(100);
                }
            }
        }
        Orion.Wait(200)

        MoveBodsToBooks()
    }
    Orion.Ignore(bodBook.Serial())
    MoveItemsFromPlayer(chest, '0x2259', any)
    Orion.Wait(1000)
    //Orion.MoveItem(bodBook.Serial(), 0, Player.Serial());
    //  Orion.Wait(1000)
}


function GetBods() {
    if (!((Player.Name().match(/(\w*)ian/gi) || []).length >= 1)) {
        Orion.Print('Not me')
    }
    else {
        //Find RuneBook
        var runebook = Orion.FindTypeEx('0x22C5', '0x08A1|0x0850')[0];
        //Check for bod book
        var bodBook = Orion.FindTypeEx('0x2259')[0];
        //loop runebook locations and get bulks

        if (runebook == null || bodBook == null) {
            BotPush(Player.Name() + ' has no book')
            Orion.LogOut();
        }
        //logout
        Orion.UseObject(runebook.Serial())
        Orion.WaitForGump(1000);
        //Count Locations = X
        Orion.Wait(800);
        var gumpinfo = Orion.GetLastGump().TextList();
        var locations = 0;
        for (var textId = 2; textId < 18; textId++) {
            if (gumpinfo[textId] != 'Empty') {
                locations++;
                Orion.Print(gumpinfo[textId])
            }
        }
        Orion.Print('Runes:' + locations);
        Orion.Wait(1000)
        //      var npcs = ['0x0000511D', '0x0000C052', '0x0000ED92', '0x000000AE', '0x0000A6E2', '0x000002F4']
        var npcs = ['Scribe', 'Tailor', 'tinker', 'carpenter', 'blacksmith', 'bowyer']


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
                Orion.WalkTo(Player.X() + 3, Player.Y() - 4, Player.Z(), 1, 255, 1, 1);
                Orion.Wait(1000)

                Orion.Print('Move Stuff to Book')
                MoveBodsToBooks()
                skip = true
            }

            if (!skip) {
                Orion.Print('finding:' + npcs[(recallId - 1)])
                var mobs = Orion.FindTypeEx(any, any, ground, 'human', 15)
                    .filter(function (mob) {
                        Orion.Print(mob.Properties())
                        return Orion.Contains(mob.Properties(), npcs[(recallId - 1)])
                    })
                Orion.Print(mobs.length)
                var npcSerial = mobs.shift().Serial()

                WalkTo(Orion.FindObject(npcSerial))
                Orion.Print('GetBod')
                for (var index = 0; index < 3; index++) {
                    Orion.Wait(300)
                    Orion.RequestContextMenu(npcSerial);
                    Orion.WaitContextMenuCliloc(npcSerial, '3006152');
                    if (Orion.WaitForGump(1000)) {
                        Orion.Wait(200)
                        var gump0 = Orion.GetGump('last');
                        var large = '0xBE0DAD1E'
                        var small = '0x9BADE6EA'
                        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === large)) {
                            Orion.Wait(200)
                            Orion.Print(68, 'Accept : Large')
                            BotPush(Player.Name() + ' Accepted : Large')

                            gump0.Select(Orion.CreateGumpHook(1));
                            Orion.Wait(100);
                        }
                        else {
                            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === small)) {
                                Orion.Print('Small Bod')
                                Orion.Wait(200)
                                var gumpinfo = gump0.CommandList();
                                var line = gumpinfo.join() + ','

                                var smallItemNameLine = line.match(/xmfhtmlgumpcolor 40 120 210 20 (\d*) 0 0 16777215/ig)[0]
                                var smallItemCliloc = smallItemNameLine.match(/(\d+)/gm)[4];
                                var isWanted = largeSmallBodIds.indexOf(parseInt(smallItemCliloc)) != -1;

                                if (isWanted) {
                                    Orion.Print(68, 'Accept :' + Orion.GetCliLocString(smallItemCliloc))
                                    BotPush(Player.Name() + ' Accepted :' + Orion.GetCliLocString(smallItemCliloc))
                                    gump0.Select(Orion.CreateGumpHook(1));
                                }
                                else {
                                    Orion.Print(38, 'Reject :' + Orion.GetCliLocString(smallItemCliloc))
                                    gump0.Select(Orion.CreateGumpHook(0));
                                }

                                Orion.Wait(100);
                            }
                        }
                    }
                    Orion.Wait(500);
                }
            }
        }
    }
}

function createMap(name, id, color) {
    return {
        color: color,
        bookName: name,
        serial: id,
        BodColor: function () {
            return this.color;
        },
        Serial: function () {
            return this.serial;
        },
        SetSerial: function (id) {
            this.serial = id
        },
        BookName: function () {
            return this.bookName;
        }
    }
}

// function BodReader() {
//     // Orion.File()
//     TextWindow.Open()
//     var gumpinfo = Orion.GetLastGump().CommandList();
//     gumpinfo.forEach(function (line) {
//         // TextWindow.Print(line);

//         (line.match(/.?xmfhtmlgumpcolor\s(?:\d*\s){4}(\d*)/i) || []).forEach(function (match) {

//             TextWindow.Print(match)

//         })
//     });
// }

//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include Bod/BodData.js
//#include helpers/Notifier.js
