//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Notifier.js
//#include Scripts/helpers/Gumps.js

var bodChestSerial = '0x40148DBE'

var bodMap = []

function PopulateBookIDs(map) {
    TextWindow.Print('GetBook:' + map.BookName())
    var books = Orion.FindTypeEx('0x2259', any, bodChestSerial, '', 2, '', true)
        .filter(function (book) {
            TextWindow.Print('name' + (book.Properties().match(
                /Book\sName:\s(\w*)/i) || [])[1] || '')
            TextWindow.Print('count' + ((book.Properties().match(
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
        BotPush('No Bod Book for ' + map.BookName())
        Orion.PauseScript();
    }
}

function SortBods() {
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

        bodMap.forEach(function (map) {
            TextWindow.Print('Book:' + map.BookName() + ' ' + map.Serial() + ' ' + map.BodColor())
            //MoveItems(Player, map, '0x2258', map.BodColor())
            MoveItemsFromPlayer(map, '0x2258', map.BodColor(), 0)
        });
    }
    Orion.Ignore(bodBook.Serial())
    MoveItemsFromPlayer(chest, '0x2259', any)
    Orion.Wait(1000)
    //Orion.MoveItem(bodBook.Serial(), 0, Player.Serial());
    //  Orion.Wait(1000)
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

        var npcs = ['0x0000511D', '0x0000C052', '0x0000ED92', '0x000000AE', '0x0000A6E2', '0x000002F4']
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
                skip = true
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
                        if ((gump0 !== null) && (!gump0.Replayed()) && ((gump0.ID() === '0xBE0DAD1E') || (gump0.ID() === '0x9BADE6EA'))) {
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

function BodReader() {
    // Orion.File()
    TextWindow.Open()
    var gumpinfo = Orion.GetLastGump().CommandList();
    gumpinfo.forEach(function (line) {
        // TextWindow.Print(line);

        (line.match(/.?xmfhtmlgumpcolor\s(?:\d*\s){4}(\d*)/i) || []).forEach(function (match) {

            TextWindow.Print(match)

        })
    });
}

function ReadCliLoc(_private) {
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