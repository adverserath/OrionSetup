function UseBook(serial, button) {
    Orion.Print('Method Entry - UseBook')
    if (typeof button === "string") {
        Orion.Print('button string ' + object)
    }
    Orion.UseObject(serial);
    Orion.Wait(200)
    Orion.WaitForGump(1000)

    var gump0 = Orion.GetGump('last');
    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x00000059')) {
        Orion.Wait(1000);
        gump0.Select(Orion.CreateGumpHook(parseInt(button)));
        Orion.Wait(1000);
    }
}

var runeList = []
function BookControl() {
    //Loop through books
    var books = Orion.FindTypeEx('0x22C5').forEach(function (book) {
        Orion.UseObject(book.Serial())
        Orion.Wait(1000)
        Orion.WaitForGump()
        TextWindow.Open()
        //Get Gump
        var gump = Orion.GetGump('last')
        var regex = /button \d* 65 2103 2104 1 0 \d*\s,\scroppedtext \d* 60 115 17 (\d*) (\d*)\s,\shtmlgump \d* 80 130 38 (\d*) 0 0\s,\sbutton \d* 115 2437 2438 1 0 \d*\s,\sxmfhtmlgump \d* 115 100 18 1011298 0 0\s,\sbutton \d* 20 \d* \d* 1 0 \d*\s,\sxmfhtmlgump \d* 15 100 18 1011300 0 0\s,\sbutton \d* 140 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 136 110 20 1062722 0 0\s,\sbutton \d* 158 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 154 110 20 1062723 0 0\s,\sbutton \d* 176 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 172 110 20 1062724 0 0\s?\n?/g;
        var gumpText = gump.CommandList().toString()
        TextWindow.Print(gumpText)
        var match1 = gumpText.match(regex)
        if (match1 != null) {
            match1.forEach(function (matched) {
                var regex1 = /button \d* 65 2103 2104 1 0 \d*\s,\scroppedtext \d* 60 115 17 (\d*) (\d*)\s,\shtmlgump \d* 80 130 38 (\d*) 0 0\s,\sbutton \d* 115 2437 2438 1 0 \d*\s,\sxmfhtmlgump \d* 115 100 18 1011298 0 0\s,\sbutton \d* 20 \d* \d* 1 0 \d*\s,\sxmfhtmlgump \d* 15 100 18 1011300 0 0\s,\sbutton \d* 140 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 136 110 20 1062722 0 0\s,\sbutton \d* 158 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 154 110 20 1062723 0 0\s,\sbutton \d* 176 2103 2104 1 0 (\d*)\s,\sxmfhtmlgump \d* 172 110 20 1062724 0 0\s?\n?/g;

                var result = regex1.exec(matched)
                result.forEach(function (values) { TextWindow.Print(values) })

                var map = -1
                if (1102 == result[1])
                    map = 3
                if (81 == result[1])
                    map = 0
                if (10 == result[1])
                    map = 1
                if (1154 == result[1])
                    map = 4
                if (1645 == result[1])
                    map = 5
                TextWindow.Print(book.Serial())
                TextWindow.Print('color ' + result[1] + '   map:' + map)
                TextWindow.Print(result[2] + gump.TextList()[parseInt(result[2])])
                TextWindow.Print(result[3] + gump.TextList()[parseInt(result[3])])
                if (gump.TextList()[parseInt(result[3])] !== 'Nowhere') {
                    var pos = Orion.SextantToXY(gump.TextList()[parseInt(result[3])], map)
                    TextWindow.Print(pos.X() + '  ' + pos.Y())

                    runeList.push(runeEntry(book.Serial(), map, gump.TextList()[result[2]], pos.X(), pos.Y(), parseInt(result[4]), parseInt(result[5]), parseInt(result[6])))
                }
            })
            WriteRunesFile()
        }
    })
}
var maps = ['Felucca', 'Trammel', 'Ilshenar', 'Malas', 'Tokuno']

function TestRunes() {
    UseClosestRuneOrWalk(1789, 2424, 1)
}
function UseClosestRuneOrWalk(dX, dY, map) {
    ReadRunebookFile()

    var filteredList = runeList.filter(function (rune) {
        return rune.Map() == map
    })
    Orion.Print('runes on map ' + filteredList.length)
    Orion.Print(filteredList[0].Name())
    filteredList.sort(function (placeA, placeB) {
        Orion.Print(placeA.DistanceTo(dX, dY))
        return placeA.DistanceTo(dX, dY) - placeB.DistanceTo(dX, dY);
    })
    Orion.Print(filteredList[0].Name())

    filteredList = filteredList.slice(0, 5)
    filteredList.forEach(function (rune) {
        Orion.Print('slice ' + rune.Name())
    })

    // filteredList = filteredList.filter(function (rune) {
    //     return Orion.GetPathArrayEx(dX, dY, 255, rune.X(), rune.Y(), 255, 2, 255).length > 1;
    // })
    filteredList.forEach(function (rune) {
        var pathDistance = Orion.GetPathArrayEx(dX, dY, 255, rune.X(), rune.Y(), 255, 2, 255).length;
        if (pathDistance > 0) {
            Orion.Print('Path distance = '+pathDistance)
            if (pathDistance < Orion.GetPathArray(rune.X(), rune.Y(), 255, 2, 255).length) {
                rune.Recall()
            }
            else {
                Orion.Print(dX + ' '+ dY)
                WalkTo(coordinate(dX, dY,255,"Destination"))
            }
            return;
        }
        Orion.Print('From ' + rune.Name())
        Orion.Print(Orion.GetPathArrayEx(dX, dY, rune.X(), rune.Y()).length)
        Orion.Print(rune.X() + '   ' + rune.Y())
    })
    filteredList[0].Recall()

}

function TestPathArray() {
    Orion.Print(Orion.GetPathArrayEx(1657, 2030, 1608, 2305).length)
}
function GetMap() {
    return Orion.ObjAtLayer(21, Player.Serial()).Map()
}
function WriteRunesFile(_private) {
    var file = Orion.NewFile();
    file.Remove('RuneBooks.json');
    if (file.Open('RuneBooks.json')) {
        runeList.forEach(function (rune) {
            file.Write(JSON.stringify(rune) + '\n')
        })
    }
    file.Close();
}

function ReadRunebookFile(_private) {
    var file = Orion.NewFile();

    if (file.Open('RuneBooks.json', true)) {
        var rune = []
        while (rune != null && rune) {
            rune = file.ReadLine()
            if (rune != '') {
                var runeJson = JSON.parse(rune)
                runeList.push(runeEntry(runeJson.serial, runeJson.map, runeJson.locName, runeJson.x, runeJson.y, runeJson.recallButton, runeJson.gateButton, runeJson.sacredButton))
            }
        }
    }
    file.Close();
}
function runeEntry(_serial, _map, _name, _X, _Y, _recall, _gate, _sacred) {
    Orion.Print('Method Entry - coordinate')
    return {
        serial: _serial,
        map: _map,
        x: _X,
        y: _Y,
        locName: _name,
        recallButton: _recall,
        gateButton: _gate,
        sacredButton: _sacred,
        X: function () {

            return this.x;
        },
        Y: function () {

            return this.y;
        },
        Name: function () {

            if (this.locName == null)
                return 'coordinate';
            else
                return this.locName;
        },
        Map: function () {
            return this.map;
        },
        DistanceTo: function (tx, ty) {

            var dx = Math.abs(tx - this.X());
            var dy = Math.abs(ty - this.Y());
            var min = Math.min(dx, dy);
            var max = Math.max(dx, dy);

            var diagonalSteps = min;
            var straightSteps = max - min;
            var ret = Math.sqrt(2) * diagonalSteps + straightSteps
            return ret;
        },
        CanPathTo: function (tx, ty) {
            return Orion.GetPathArrayEx(tx, ty, x, y).length > 0
        },
        Recall: function () {
            Orion.Print(this.serial + '   ' + this.recallButton)
            UseBook(this.serial, this.recallButton)
        },
        Gate: function () {
            Orion.Print(this.serial + '   ' + this.gateButton)
            UseBook(this.serial, this.gateButton)
        },
        Sacred: function () {
            Orion.Print(this.serial + '   ' + this.sacredButton)
            UseBook(this.serial, this.sacredButton)
        }
    }
}