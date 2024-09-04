//import Orion from "../../Orion";
//import Player from "../../Player";

function ReadPirateLocations() {
    while (true) {
        var startTime = Orion.Now()
        Orion.Wait(2000)
        var message = Orion.InJournal('°', '', '0x00007609', any, startTime, Orion.Now());
        if (message != null) {
            var matches = message.Text().match(/\d+.\d+...\d+.\d+../g)
            Orion.Print(matches[0].replace(/\°/g, 'o ').replace(/\,/g, ' '))

            var loc = Orion.SextantToXY(matches[0].replace(/\°/g, 'o ').replace(/\,/g, ' '))
            if (loc != null) {
                Orion.Print(loc.X() + '  ' + loc.Y())
                Orion.SayParty('last location:' + loc.X() + '  ' + loc.Y())
            }
        }
    }
}

function testPiarate() {

    //text - string, text to parse. For example "79o 0'S 35o 5'E" or "danger of collapsing near 79o 0'S, 35o 5'E at a location in the wilderness!"

    //var str = "Yar, me aunt's cousin's husband told me Jimmy was spotted at 154°20'N,48°9'E.".replace(/\°/g, 'o ').replace(/\,/g, ' ')
    var str = "Yar not going t believe this  but OShaughnessy has been spotted at 157o 8'N 32o 24'E..."
    Orion.Print(str)
    var loc = Orion.SextantToXY(str)
    Orion.Print(loc.X() + '  ' + loc.Y())
    Orion.SextantToXY('text');
}

function CannonFire() {
    while (true) {
        Orion.Wait(1000)
        while (Player.WarMode()) {
            //if(CanPrep())
            Prep()
            //CanUnload()
            WaitForFire()
            Fire()
            Orion.Wait(1000)
        }
    }
}

function CanPrep() {
    if (Orion.GetLastGump().ButtonList().indexOf(" button 10 35 4005 4007 1 0 1 ") > -1) {
        Orion.Print(58, "Can Prep")
        return true
    }
    return false
}

function Prep() {
    var gump0 = Orion.GetLastGump();
    if ((gump0 !== null) && (!gump0.Replayed())) {
        gump0.Select(Orion.CreateGumpHook(1));
        Orion.Wait(100);
    }
}

function CanUnload() {
    if (Orion.GetLastGump().ButtonList().indexOf(" button 10 35 4005 4007 1 0 8 ") > -1) {
        Orion.Print(58, "Can Unload")
    }
    return Orion.GetLastGump().ButtonList().indexOf(" button 10 35 4005 4007 1 0 8 ") > -1

}

function WaitForFire() {
    while (Orion.GetLastGump().CommandList().indexOf(" xmfhtmlgumpcolor 10 148 230 18 1149652 0 0 32743 ") == -1 && !Player.WarMode()) {
        Orion.Wait(200)
    }
    Orion.Print(58, "Can Fire")

}
function WaitForFired() {
    while (Orion.GetLastGump().CommandList().indexOf(" xmfhtmlgumpcolor 10 148 230 18 1149691 0 0 32743 ") == -1) {
        Orion.Wait(200)
    }
    Orion.Print(58, "Fired")

}
function Fire() {
    var gump0 = Orion.GetLastGump();
    if ((gump0 !== null) && (!gump0.Replayed())) {
        Orion.Print(58, "Fire")
        gump0.Select(Orion.CreateGumpHook(6));
    }
    WaitForFired()
}

function ShowArrowOnMap() {
    while (true) {
        Orion.Wait(500)
        Orion.SetWorldMapPointerPosition(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y());
    }
}
function AnnounceOrcs() {
    var x = Player.X() - Orion.QuestArrowPosition().X()
    var y = Player.Y() - Orion.QuestArrowPosition().Y()
    var vDirect = " North"
    var hDirect = " West"
    if (y < 0) {
        vDirect = " South"
    }
    if (x < 0) {
        hDirect = " East"
    }

    Orion.SayParty('Orcs Spotted: ' + Math.abs(x) + hDirect + '  :  ' + Math.abs(y) + vDirect)
    Orion.SetWorldMapPointerPosition(Orion.QuestArrowPosition().X(), Orion.QuestArrowPosition().Y());

}

var wCarronade = '0x421B'
var wCulverin = '0x4217'
var sCarronade = '0x421A'
var sCulverin = '0x4216'
var eCarronade = '0x421D'
var eCulverin = '0x4219'
var nCarronade = '0x421C'
var nCulverin = '0x4218'

var cannonTypes = [wCarronade, wCulverin, eCarronade, eCulverin, sCarronade, sCulverin, nCarronade, nCulverin]

function HighlightCannonFire() {
    Orion.ClearFakeMapObjects()
    GetMultis()
    var cannon = cannonTypes.toString().split(',').join('|');

    var cannons = Orion.FindTypeEx(cannon, any, ground, 'item', 8)
    cannons.forEach(function (cannon) {
        DetectHits(cannon)
    })
}

function DetectHits(cannon) {
    var xOffset = 0;
    var yOffset = 0;
    var currentRange = 0;
    var pnt = Point2D(cannon.X(), cannon.Y());
    var d = GetFacing(cannon);
    var newPoint = []
    switch (d) {
        case "N":
            xOffset = 0; yOffset = -1; break;
        case "S":
            xOffset = 0; yOffset = 1; break;
        case "W":
            xOffset = -1; yOffset = 0; break;
        case "E":
            xOffset = 1; yOffset = 0; break;
    }

    var xo = xOffset;
    var yo = yOffset;
    var lateralOffset = 1;

    var latDist = 3;

    var range = 10;
    var xLoc = 0
    var yLoc = 0
    while (currentRange++ <= range) {
        xOffset = xo;
        yOffset = yo;

        if (currentRange % latDist == 0)
            lateralOffset++;

        var damageables = [];

        for (var i = -lateralOffset; i <= lateralOffset; i++) {
            if (xOffset == 0) {
                xLoc = pnt.X() + xOffset + i
                yLoc = pnt.Y() + yOffset * currentRange
                newPoint = Point2D(xLoc, yLoc);
            }
            else {
                xLoc = pnt.X() + xOffset * currentRange
                yLoc = pnt.Y() + yOffset + i
                newPoint = Point2D(xLoc, yLoc);
            }

            // Orion.AddFakeMapObject(Orion.Random(10000), '0x9F13', '0x047E', xLoc, yLoc, Player.Z());
            multiPoints.forEach(function(mp){
                if(mp.Contains(newPoint.X(),newPoint.Y())){
                    TextWindow.Print("Point In Array:" + newPoint.X() +" "+ newPoint.Y())
                    Orion.Print(mp.GetTile(newPoint.X(),newPoint.Y()).Graphic())
                    Orion.Print('in multi')
                    Orion.Print(newPoint.X() +" "+ newPoint.Y())
                    Orion.AddFakeMapObject(Orion.Random(10000), '0x9F13', '0x0494', newPoint.X(), newPoint.Y(), -5);
                    damageables.push(newPoint)
                }
            })

                //Orion.AddFakeMapObject(Orion.Random(10000), '0x9F13', '0x047E', newPoint.X(), newPoint.Y(), -5);

        }
    }
}

function GetFacing(cannon) {
    var nCannonTypes = [nCarronade, nCulverin]
    var sCannonTypes = [sCarronade, sCulverin]
    var eCannonTypes = [eCarronade, eCulverin]
    var wCannonTypes = [wCarronade, wCulverin]

    if (nCannonTypes.indexOf(cannon.Graphic()) != -1) {
        Orion.Print(cannon.Serial() + ' is north')
        return "N"
    }

    if (sCannonTypes.indexOf(cannon.Graphic()) != -1) {
        Orion.Print(cannon.Serial() + ' is south')
        return "S"
    }

    if (eCannonTypes.indexOf(cannon.Graphic()) != -1) {
        Orion.Print(cannon.Serial() + ' is east')
        return "E"
    }

    if (wCannonTypes.indexOf(cannon.Graphic()) != -1) {
        Orion.Print(cannon.Serial() + ' is west')
        return "W"
    }
}


function Point2D(xLoc, yLoc) {
    return {
        x: xLoc,
        y: yLoc,
        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        }
    }
}


var multiPoints = []

function GetMultis() {
    Orion.ClearFakeMapObjects()
    var list = Orion.GetMultisRect();

    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var multi = Multi(item.x, item.y, item.z, item.minX, item.minY, item.maxX, item.maxY)

        var color = 0x0494
        if (multi.Contains(Player.X(), Player.Y())) {
            color = 0x0FF1
        }
        else {
            multiPoints.push(multi)
            color = 0x0BFF
        }
        var i = 0
        multi.Tiles().forEach(function (tileArray) {
            TextWindow.Print("ta"+ (i++) +": " + tileArray)
            tileArray.forEach(function (tiles) {
                Orion.AddFakeMapObject(Orion.Random(100000), '0x9F14', color, tiles.X(), tiles.Y(), -5);
            })
        })
    }
}

function Multi(xLoc, yLoc, zLoc, _minX, _minY, _maxX, _maxY) {
    return {
        x: xLoc,
        y: yLoc,
        z: zLoc,
        minX: _minX,
        minY: _minY,
        maxX: _maxX,
        maxY: _maxY,
        tiles: [],

        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        },
        Z: function () {
            return this.z;
        },
        Height: function () {
            return Math.abs(this.minY) + Math.abs(this.maxY) + 1;
        },
        Width: function () {
            return Math.abs(this.minX) + Math.abs(this.maxX) + 1
        },
        MinX: function () {
            return this.minX;
        },
        MinY: function () {
            return this.minY;
        },
        MaxX: function () {
            return this.maxX;
        },
        MaxY: function () {
            return this.maxY;
        },
        Contains: function (_x, _y) {
            _x -= this.X() + this.MinX();
            _y -= this.Y() + this.MinY();


            TextWindow.Print("Y ::: "+ _y)
            TextWindow.Print("X :::"+ _x)
            TextWindow.Print("Width :::"+ this.Width())
            TextWindow.Print("Height :::"+ this.Height())

            return _x >= 0 && _x < this.Width() && 
            _y >= 0 && _y < this.Height() && 
            this.Tiles()[_y][_x] != null
        },
        GetTile: function (_x, _y) {
            _x -= this.X() + this.MinX();
            _y -= this.Y() + this.MinY();

            return this.Tiles()[this.y - (this.y - Math.abs(this.minY))][this.x - (this.x - Math.abs(this.minX))]
        },
        Tiles: function () {
            if (this.tiles.length == 0) {
                var voidTile = Orion.GetTilesInRect('any', 0, 0, -5, 0, 0, -5).shift()
                var tileSuper = BoatArray(this.height, this.width)
                var tileRect = Orion.GetTilesInRect('any', this.x - Math.abs(this.minX), this.y - Math.abs(this.minY), -5, this.x + this.maxX, this.y + this.maxY, -5)
                
                for (var y = 0; y <= this.Height(); y++) {
                    tileSuper.push([])
                }
                var slot = this.y - Math.abs(this.minY)

                tileRect.forEach(function (tile) {
                    if (tile != null) {
                        tileSuper[(tile.Y() - slot)].push(tile)
                    }
                    else {
                        tileSuper[(tile.Y() - slot)].push(voidTile)
                    }

                })
                this.tiles = tileSuper
            }


            Orion.Print(this.tiles.length)
            return this.tiles;
        }
    }
}
function BoatArray(Height, Width)
{
    var voidTile = Orion.GetTilesInRect('any', 0, 0, -5, 0, 0, -5).shift()
    
        var a = [];
        for (var i = 0; i < Height; i++) {
            var b = []
            for (var j = 0; j < Width; j++) {
                b.push(undefined);
            }
            a.push(b);
        }
        return a;
    
}