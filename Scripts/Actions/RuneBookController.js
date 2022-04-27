function UseBook(serial, button) {
    TextWindow.Print('Method Entry - UseBook')
    if (typeof button === "string") {
        TextWindow.Print('button string ' + object)
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
function A____ReadAllBooksToFile() {
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
                    var pos = Orion.SextantToXY(gump.TextList()[parseInt(result[3])], 1)
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

function GotoMap(map)
{
    TextWindow.Print('Going to map ' + map)

    ReadRunebookFile()

    var filteredList = runeList.filter(function (rune) {
        return rune.Map() == map
    })
    if(filteredList.length==0)
    {
        return
    }
    TextWindow.Print(filteredList[0].Name())
    filteredList.sort(function (placeA, placeB) {
        return placeA.DistanceTo(1000, 500) - placeB.DistanceTo(1000, 500);
    })
    filteredList[0].Recall()
    Orion.Wait(1000)
}

function UseClosestRuneOrWalk(dX, dY, map, walkPathLength) {
    TextWindow.Print('Finding Closest to ' + dX + ' ' + dY + 'Map:' + map)
    ReadRunebookFile()

    var filteredList = runeList.filter(function (rune) {
        return rune.Map() == map
    })
    TextWindow.Print('runes on map ' + filteredList.length)
    TextWindow.Print(filteredList[0].Name())
    filteredList.sort(function (placeA, placeB) {
        return placeA.DistanceTo(dX, dY) - placeB.DistanceTo(dX, dY);
    })

    filteredList = filteredList.slice(0, 3)
    filteredList.forEach(function (rune, i) {
        TextWindow.Print(i + ' : ' + rune.Name())
    })
    Orion.Wait(1000)

    filteredList = filteredList.filter(function (rune, i) {
        rune.CalculatePath(dX, dY)
        var pathable = rune.CanPathTo()
        return pathable
    })

    filteredList.sort(function (placeA, placeB) {
        return placeA.PathLength() - placeB.PathLength();
    })
    filteredList.forEach(function (rune, i) {
        TextWindow.Print('ordered:' + i + ' : ' + rune.Name())
    })

    var returnRune = null
    if (walkPathLength == null)
        walkPathLength = Orion.GetPathArray(dX, dY, 255, 2, 255).length
    TextWindow.Print('Walk Distance ' + walkPathLength, 78)

    filteredList.every(function (rune, i) {
        TextWindow.Print(i + ' Closest Rune ' + rune.Name())
        var pathDistance = rune.PathLength();
        TextWindow.Print(i + 'Closest Rune: ' + pathDistance)

        if (pathDistance > 0) {

            if (pathDistance < walkPathLength || walkPathLength == 0) {
                TextWindow.Print('Closer than walking')
                rune.Recall()
                Orion.Wait(2000)
                return false
                // returnRune = rune
            }
            TextWindow.Print('Ill walk')
            WalkTo(coordinate(dX, dY, 255, "Destination"))

            return false
        }
        else {
            TextWindow.Print('Cant use Rune ' + 'from: ' + rune.X() + ' ' + rune.Y() + ' ' + rune.Name() + ' to ' + dX + ' ' + dY)
            Orion.Wait(1000)
        }
    })
    WalkTo(coordinate(dX, dY, 255, "Target Destination"))
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
    if (runeList.length < 1) {
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
}
function runeEntry(_serial, _map, _name, _X, _Y, _recall, _gate, _sacred) {
    return {
        serial: _serial,
        map: _map,
        x: _X,
        y: _Y,
        locName: _name,
        recallButton: _recall,
        gateButton: _gate,
        sacredButton: _sacred,
        pathDistance: 0,
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
        CalculatePath: function (tx, ty) {
            TextWindow.Print('Check Path:'+tx +' '+ ty +' '+ this.x +' '+ this.y)
           this.pathDistance = Orion.GetPathArrayEx(parseInt(tx), parseInt(ty), 0, parseInt(this.x), parseInt(this.y), 0, 4, 255).length
           TextWindow.Print('Check Path:'+this.Name() + this.pathDistance)
        },
        CanPathTo: function () {
            return this.pathDistance > 0
        },
        PathLength: function () {
            return this.pathDistance
        },
        Recall: function () {
            TextWindow.Print(this.serial + '   ' + this.recallButton)
            UseBook(this.serial, this.recallButton)
        },
        Gate: function () {
            TextWindow.Print(this.serial + '   ' + this.gateButton)
            UseBook(this.serial, this.gateButton)
        },
        Sacred: function () {
            TextWindow.Print(this.serial + '   ' + this.sacredButton)
            UseBook(this.serial, this.sacredButton)
        }
    }
}