var speed = 200
var rotateTime
function AutoCannon() {
    Orion.CancelWaitGump();
    var myCannons = GetMyCannonsInRange(10)
    var cannonGumps = []
    myCannons.forEach(function (cannon) {
        cannonGumps.push(CannonGump(cannon))
    })
    rotateTime = Orion.Now()
    while (true) {
        while (Player.WarMode()) {

            cannonGumps.forEach(function (cg) {
                cg.Attack()
                Orion.Wait(speed)
            })
            Orion.Wait(200)

            var firingCannons = cannonGumps.filter(function (cannons) {
                return cannons.HasStartedFiring()
            })
            if (rotateTime + 5000 < Orion.Now() && firingCannons.length == 0) {
            rotateTime = Orion.Now()
                Orion.Say("Come about")
            }
        }
        Orion.Print('No War')
        Orion.Wait(1000)
    }
}


function CannonGump(_cannon) {
    return {
        cannon: _cannon,
        action: "",
        lastReloaded: 0,
        lastFired: 0,
        GetCannon: function () {
            return this.cannon;
        },
        GetCannonSerial: function () {
            return this.cannon.Serial();
        },
        SetAction: function (newAction) {
            this.action = newAction
        },
        GetAction: function () {
            return this.action
        },
        SetStartedLoading: function () {
            this.action = 'Loading'
            this.lastReloaded = Orion.Now()
        },
        SetStartedFiring: function () {
            this.action = 'Firing'
            this.lastFired=Orion.Now()
        },
        HasStartedLoading: function () {
            return this.action === 'Loading'
        },
        HasStartedFiring: function () {
            return this.action === 'Firing'
        },
        CanFire: function () {
            return this.HasFiredTimePassed() && (Orion.Contains(this.cannon.Properties(), "Charged: Yes") && Orion.Contains(this.cannon.Properties(), "Ammo: Cannonball") && Orion.Contains(this.cannon.Properties(), "Primed: Yes"))
        },
        CanReload: function () {
            return this.HasReloadTimePassed() && (Orion.Contains(this.cannon.Properties(), "Charged: No") && Orion.Contains(this.cannon.Properties(), "Ammo: None") && Orion.Contains(this.cannon.Properties(), "Primed: No"))
        },
        HasAmmo: function () {
            return Orion.Contains(this.cannon.Properties(), "Contents: 3/3")
        },
        UseCannon: function () {
            Orion.UseObject(this.GetCannonSerial())
        },
        HasReloadTimePassed: function () {
            return (Orion.Now() - this.lastReloaded) > 5000
        },
        HasFiredTimePassed: function () {
            return (Orion.Now() - this.lastFired) > 3000
        },
        Prep: function () {
            if (this.cannon.Distance() > 1) {
                WalkTo(this.cannon, 1)
                Orion.Wait(250)
            }
            Orion.CancelWaitGump();
            Orion.WaitGump(Orion.CreateGumpHook(1));
            this.UseCannon()
            this.SetStartedLoading()
            //this.startPrepTime = Orion.Now()

            Orion.Wait(200)

        },
        Fire: function () {

            Orion.Print("Fire :" + this.GetCannonSerial())
            if (this.cannon.Distance() > 1) {
                WalkTo(this.cannon, 1)
                Orion.Wait(250)
            }
            Orion.CancelWaitGump();
            Orion.WaitGump(Orion.CreateGumpHook(6));
            Orion.Wait(50)
            rotateTime=Orion.Now()
            this.UseCannon()
            this.SetStartedFiring()
            Orion.Wait(200)
        },
        Attack: function () {
            Orion.PrintFast(this.cannon.Serial(), 53, 1, "Attack")
            if (this.CanReload() && this.HasReloadTimePassed()) {
                Orion.PrintFast(this.cannon.Serial(), 53, 1, "Can Reload")
                if (!this.HasAmmo()) {
                    Orion.PrintFast(this.cannon.Serial(), 53, 1, "No Ammo")
                }
                else {
                    Orion.PrintFast(this.cannon.Serial(), 53, 1, "Prepare")
                    this.Prep()
                }
            }
            else if (this.CanFire() && this.HasReloadTimePassed()) {
                Orion.PrintFast(this.cannon.Serial(), 53, 1, "Loaded")

                var shouldFire = DetectHits(this.GetCannon())
                if (shouldFire) {
                    Orion.PrintFast(this.cannon.Serial(), 53, 1, "Firing")
                    this.Fire()
                }
                else {
                    Orion.PrintFast(this.cannon.Serial(), 53, 1, "No Target")
                }
            }
            else{
            Orion.PrintFast(this.cannon.Serial(), 53, 1, "Reload in: "+this.CanReload()  +"  "+this.action + "  "+ (Orion.Now() - this.lastActionChange))
            }
            // else if(this.ReloadTakingTooLong() && this.HasStartedLoading() || this.HasStartedFiring()){
            //     Orion.PrintFast(this.cannon.Serial(), 27, 1, "Reset")
            //     this.SetAction('')
            // }

        }
    }
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

var showBoatTiles = false
var showHitMarkers = false

function GetMyCannonsInRange(distanceToCannon) {
    var cannons = []
    GetMultis()
    if (playerShip) {
        var cannonGraphicList = cannonTypes.toString().split(',').join('|');

        cannons = Orion.FindTypeEx(cannonGraphicList, any, ground, 'item', distanceToCannon)
            .filter(function (cannon) {
                return playerShip.Contains(cannon.X() - 1, cannon.Y())
            })
    }

    return cannons
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

            otherBoats.forEach(function (otherBoat) {
                if (otherBoat.Contains(newPoint.X(), newPoint.Y())) {
                    if (showHitMarkers)
                        Orion.AddFakeMapObject(Orion.Random(10000), '0x9F13', '0x0494', newPoint.X(), newPoint.Y(), -5);
                    damageables.push(newPoint)
                }
            })
            if (showBoatTiles)
                Orion.AddFakeMapObject(Orion.Random(10000), '0x9F13', '0x047E', newPoint.X(), newPoint.Y(), -5);

        }
    }
    return damageables.length > 0
}

function GetFacing(cannon) {
    var nCannonTypes = [nCarronade, nCulverin]
    var sCannonTypes = [sCarronade, sCulverin]
    var eCannonTypes = [eCarronade, eCulverin]
    var wCannonTypes = [wCarronade, wCulverin]

    if (nCannonTypes.indexOf(cannon.Graphic()) != -1) {
        return "N"
    }

    if (sCannonTypes.indexOf(cannon.Graphic()) != -1) {
        return "S"
    }

    if (eCannonTypes.indexOf(cannon.Graphic()) != -1) {
        return "E"
    }

    if (wCannonTypes.indexOf(cannon.Graphic()) != -1) {
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

var otherBoats = []
var playerShip = undefined

function GetMultis() {
    Orion.ClearFakeMapObjects()
    var list = Orion.GetMultisRect();
    Orion.Print("Multis Found: " + list.length)

    for (var i = 0; i < list.length; i++) {
        //TextWindow.Print("Multi: "+i)
        var item = list[i];
        var multi = Multi(item.x, item.y, item.z, item.minX, item.minY, item.maxX, item.maxY)

        var color = 0x0494
        if (multi.Contains(Player.X(), Player.Y())) {
            color = 0x0FFF
            playerShip = multi
        }
        else {
            otherBoats.push(multi)
            color = 0x0BFF
        }
        otherBoats.push(multi)
        color = 0x0BFF
        var yLayer = 0
        if (showBoatTiles)
            multi.Tiles().forEach(function (tileArray) {
                tileArray.forEach(function (tiles) {
                    //TextWindow.Print("tile: "+ tiles.X() +" : " + tiles.Y())
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
                var slotY = this.y - Math.abs(this.minY)
                var slotX = this.x - Math.abs(this.minX)

                tileRect.forEach(function (tile) {
                    if (tile != null) {
                        tileSuper[(tile.Y() - slotY)][(tile.X() - slotX)] = tile
                    }
                })
                this.tiles = tileSuper
            }
            return this.tiles;
        }
    }
}
function BoatArray(Height, Width) {
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



//#include helpers/Target.js