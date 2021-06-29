//#include Scripts/helpers/Target.js

function BottleThrower() {
    while (true) {
        Orion.FindTypeEx('0x0190', any, ground, '', 40).forEach(function (bottle) {
            Orion.Forget(bottle.Serial);
        })
        Orion.FindTypeEx('0x099B', any, ground, '', 40).forEach(function (bottle) {
            Orion.Forget(bottle.Serial);
        })
        Orion.Wait(500)
        Orion.Print('Start Check')
        var pirates = Orion.FindTypeEx('0x0190', any, ground, '', 40, 'red')

        var bottles = Orion.FindTypeEx('0x099B', any, ground, '', 40)
        // .filter(function (bottle){
        // return Orion.GetPathArray(bottle.X(), bottle.Y())!=null
        // })
        if (bottles.length > 0) {
            Orion.Print('bottles:' + bottles.length)
            var bottle = bottles.shift()

            WalkToAvoiding(bottle, pirates, 2, 2, 5000)
            pirates = Orion.FindTypeEx('0x0190', any, ground, '', 40, 'red')
                .sort(function (t1, t2) {
                    return t1.Distance() - t2.Distance()
                });

            if (pirates.length > 0) {
                var pirate = pirates.shift()
                Orion.AddHighlightCharacter(pirate.Serial(), '0x00ff');

                Orion.UseObject(bottle.Serial())
                Orion.Print('Use bottle')
                if (Orion.WaitForTarget(500)) {
                    Orion.Print('Throwing bottle')

                    while (!Orion.WaitWhileTargeting(300)) {
                        Orion.Print('Find pirate')

                        WalkTo(pirate, 10)
                        Orion.TargetObject(pirate.Serial())

                    }
                }
            }

        }
    }
}


function ArmouryHelper() {
    var armour = Orion.FindTypeEx('0x1512|0x151A', any, ground, '', 40)
    var fires = Orion.FindTypeEx('0x19AB', any, ground, '', 40)

    while (true) {
        Orion.Wait(500)
        var corrupt = Orion.FindTypeEx('0x4686', '0x081B', ground, '', 40)
        if (corrupt.length > 0) {
            Orion.Print('corrupt ground' + corrupt.length)
            while (Orion.FindTypeEx('0x4686', '0x081B', ground, '', 40).length > 0) {
                corrupt.forEach(function (cr) {
                    WalkTo(cr)
                    Orion.MoveItem(cr.Serial())
                    Orion.Wait(500)

                })
            }
        }
        var corrupt = Orion.FindTypeEx('0x4686', '0x081B', backpack)
        if (corrupt.length > 0) {
            Orion.Print('corrupt bag' + corrupt.length)
            var fire = fires.sort(function (t1, t2) {
                return t1.Distance() - t2.Distance()
            })[0]
            WalkTo(fire)
            corrupt.forEach(function (cr) {
                Orion.UseObject(cr.Serial())
                Orion.Wait(500)
                Orion.TargetObject(fire.Serial())
            })
            Orion.Wait(500)
        }
        var purified = Orion.FindTypeEx('0x4686', '0x0000', backpack)
        if (purified.length > 0) {
            Orion.Print('pure bag' + purified.length)

            purified.forEach(function (pure) {
                var am = armour.sort(function (t1, t2) {
                    return t1.Distance() - t2.Distance()
                }).shift()
                WalkTo(am)
                Orion.UseObject(pure.Serial())
                Orion.Wait(500)
                Orion.TargetObject(am.Serial())
                Orion.Wait(500)
            })
        }

        var target = Orion.FindTypeEx(any, any, ground, 'live|human|near', 40, 'red')
        Orion.Print('target ground' + target.length)
        if (target.length > 0) {


            target = target.shift()
            Orion.RequestContextMenu(target.Serial());
            if (Orion.WaitForContextMenu()) {
                Orion.CancelContextMenu();
                Orion.Print(target.Serial())
                if (target.Distance() > 10) {
                    WalkTo(target, 5)
                }
                Orion.ClientLastAttack(target.Serial())
                if (!target.InLOS()) {
                    WalkTo(target, 1)
                    StayAway(target.Serial(), 3)
                    Orion.ClientLastAttack(target.Serial())
                }
                while (target.Exists()) {
                    Orion.Wait(1000);
                }
            }
        }
        else {
            Orion.Forget(target.Serial());
        }
    }
}
function Ignore() {
    var point = SelectTarget()

    Orion.Print(Orion.CanWalk('', point.X(), point.Y(), point.Z()))

    //Orion.FindTypeEx(any,any,any,ground,'',60).forEach(function(stuff){Orion.Forget(stuff.Serial())})
    //Orion.Ignore(SelectTarget().Serial())
    Orion.FindTypeEx('0x000D|0x0010', any, ground, 'mobile', 20).forEach(function (stuff) {
        Orion.Say('[kill')
        Orion.Wait(50)
        Orion.TargetObject(stuff.Serial())
        Orion.Wait(50)
    })

}
function FountainTest() {
    var spigs = 0
    while (spigs < 4) {
        spigs++
        Orion.ClearFakeMapObjects();
        // Orion.Print("Target the spigot")
        var startSpigot = SelectTarget();
        var start = null;
        var StartDir = 'N';
        var lastDir = null;
        if (startSpigot.Graphic() != '0x9BE5' && startSpigot.Graphic() != '0x9BF2') {
            Orion.Print("Not valid")
            Orion.ToggleScript('FountainTest');
        }
        if (startSpigot.Graphic() == '0x9BF2')//South
        {
            StartDir = 'S';
            start = coordinate(startSpigot.X(), startSpigot.Y() + 1, startSpigot.Z())
        }
        if (startSpigot.Graphic() == '0x9BE5')//East
        {
            StartDir = 'E';
            start = coordinate(startSpigot.X() + 1, startSpigot.Y(), startSpigot.Z())
        }

        //var endDrains = Orion.FindTypeEx('0x9BFF', any, ground,'',50).sort(function (a, b) {
        //    return a.X() - b.X()
        //})
        //Orion.Print(endDrains.length)
        //var endDrain = null
        //if(startSpigot.Graphic()==='0x9BF2'){
        //endDrain = endDrains[0]
        //}
        //else{
        //endDrain = endDrains[3]
        //}
        Orion.Print("Target the drain")
        var endDrain = SelectTarget();
        if (endDrain.Graphic() != '0x9BFF') {
            Orion.Print("Not valid")
            Orion.ToggleScript('FountainTest');
        }
        var end = coordinate(endDrain.X(), endDrain.Y(), endDrain.Z())

        // var start = SelectCoordinate();
        // var end = SelectCoordinate();


        var fountainPath = []

        var EW = '0x9BF4'
        var NS = '0x9BE7'
        var NW = '0x9BEB'
        var NE = '0x9BEF'
        var SE = '0x9BFC'
        var SW = '0x9BF8'

        var xSize = Math.abs(start.X() - end.X())
        var ySize = Math.abs(start.Y() - end.Y())
        var minY = Math.min(start.Y(), end.Y())
        var minX = Math.min(start.X(), end.X())

        var grid = []

        for (var y = 0; y <= ySize; y++) {
            grid.push([])
            for (var x = 0; x <= xSize; x++) {
                var tX = (minX + x);
                var tY = (minY + y)
                grid[y].push([])
                //  Orion.Print(x + ' ' + y)
                grid[y][x] = coordinate(tX, tY, 0)
                //  Orion.Print(tX+ ':' + tY)
                //    Orion.AddFakeMapObject(Orion.Random(10000), NE, '0x0000', tX, tY, Player.Z());
            }
        }

        var startposX
        var startposY

        for (var y = 0; y <= ySize; y++) {

            for (var x = 0; x <= xSize; x++) {
                if (grid[y][x].X() == start.X()) {
                    startposX = x
                }
                if (grid[y][x].Y() == start.Y()) {
                    startposY = y
                }
            }
        }

        var routes = []
        var path = []
        var alreadyUsed = []
        //Orion.Print(startposX + ':' + startposY)
        routes.push(createRoute(grid, startposX, startposY, path))
        var foundRoute = []
        var i = 0;
        while (routes.length != 0) {
            var route = routes.shift()
            startposX = route.X()
            startposY = route.Y()
            route.Grid()[startposY][startposX].Visited(true)

            var directions = CanGoNorth(route.Grid(), route.X(), route.Y()) + CanGoSouth(route.Grid(), route.X(), route.Y()) + CanGoWest(route.Grid(), route.X(), route.Y()) + CanGoEast(route.Grid(), route.X(), route.Y())
            if (directions & north) {
                pathTaken = route.Path().slice()
                pathTaken.push(validRoute(route.Grid()[startposY][startposX], 'N'))
                routes.push(createRoute(route.Grid(), startposX, startposY - 1, pathTaken))
            }
            if (directions & south) {
                pathTaken = route.Path().slice()
                pathTaken.push(validRoute(route.Grid()[startposY][startposX], 'S'))
                routes.push(createRoute(route.Grid(), startposX, startposY + 1, pathTaken))
            }
            if (directions & east) {
                pathTaken = route.Path().slice()
                pathTaken.push(validRoute(route.Grid()[startposY][startposX], 'E'))
                routes.push(createRoute(route.Grid(), startposX + 1, startposY, pathTaken))
            }
            if (directions & west) {
                pathTaken = route.Path().slice()
                pathTaken.push(validRoute(route.Grid()[startposY][startposX], 'W'))
                routes.push(createRoute(route.Grid(), startposX - 1, startposY, pathTaken))
            }
            if (route.Grid()[startposY][startposX].X() == end.X() && route.Grid()[startposY][startposX].Y() == end.Y()) {
                foundRoute.push(route.Path())
            }
        }
        var choosenRoute = null;
        while (choosenRoute == null) {
            foundRoute.forEach(function (route) {
                if (choosenRoute == null) {
                    //Orion.Wait(200)
                    Orion.ClearFakeMapObjects();
                    lastDir = StartDir

                    var partList = []
                    var canDoRoute = true;
                    route.forEach(function (loc) {
                        var part = null;
                        if ((lastDir == 'S' && loc.Direction() == 'S') || (lastDir == 'N' && loc.Direction() == 'N'))
                            part = NS
                        if ((lastDir == 'S' && loc.Direction() == 'E') || (lastDir == 'W' && loc.Direction() == 'N'))
                            part = NE
                        if ((lastDir == 'S' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'N'))
                            part = NW
                        if ((lastDir == 'W' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'E'))
                            part = EW
                        if ((lastDir == 'N' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'S'))
                            part = SW
                        if ((lastDir == 'N' && loc.Direction() == 'E') || (lastDir == 'W' && loc.Direction() == 'S'))
                            part = SE
                        if (part != null)
                            partList.push(part)
                        lastDir = loc.Direction()
                        //Orion.Print(loc.Location().X()+':'+loc.Location().Y())

                        Orion.AddFakeMapObject(Orion.Random(10000), part, '0x0000', loc.Location().X(), loc.Location().Y(), Player.Z());
                    });
                    var requiredParts = []
                    var uniqueparts = partList.filter(function (item, i, ar) { return ar.indexOf(item) === i });

                    uniqueparts.forEach(function (uPart) {
                        var count = partList.filter(function (cPart) {
                            return cPart === uPart
                        }).length
                        Orion.Print(uPart + ' : ' + count)
                        if (Orion.FindTypeEx(uPart, any, backpack).concat(Orion.FindTypeEx(uPart, any, ground, '', 30)).length < count) {
                            canDoRoute = false
                        }
                        requiredParts.push(partSet(uPart, count))
                    })
                    if (canDoRoute) {
                        choosenRoute = chosenRoute(requiredParts, route)
                    }
                }
            });
            Orion.Wait(1000)
        }
        //PICK UP PARTS
        Orion.Wait(100)
        choosenRoute.RequiredParts().forEach(function (reqPart) {
            var foundParts = Orion.FindTypeEx(reqPart.Graphic(), any, ground, '', 30)
            var heldParts = Orion.FindTypeEx(reqPart.Graphic(), any, backpack)
            Orion.Wait(800)

            Orion.Print('Found' + foundParts.length)
            Orion.Print('Held' + heldParts.length)
            Orion.Print('Required' + reqPart.Count())
            var i = 0
            while (Orion.FindTypeEx(reqPart.Graphic(), any, backpack).length < reqPart.Count()) {
                Orion.FindTypeEx(reqPart.Graphic(), any, ground, '', 30).forEach(function (fp) {
                    var part = fp;
                    Orion.WalkTo(part.X(), part.Y(), part.Z(), 1, 0, 1)
                    Orion.MoveItem(part.Serial())
                    Orion.Forget(part.Serial())
                    Orion.Wait(800)
                })
            }
        })

        //Dont stand on path
        choosenRoute.Route().forEach(function (loc) {
            Orion.SetBadLocation(loc.Location().X(), loc.Location().Y())
        })
        //PLACE PARTS
        lastDir = StartDir
        choosenRoute.Route().forEach(function (loc) {
            var part = null;
            if ((lastDir == 'S' && loc.Direction() == 'S') || (lastDir == 'N' && loc.Direction() == 'N'))
                part = NS
            if ((lastDir == 'S' && loc.Direction() == 'E') || (lastDir == 'W' && loc.Direction() == 'N'))
                part = NE
            if ((lastDir == 'S' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'N'))
                part = NW
            if ((lastDir == 'W' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'E'))
                part = EW
            if ((lastDir == 'N' && loc.Direction() == 'W') || (lastDir == 'E' && loc.Direction() == 'S'))
                part = SW
            if ((lastDir == 'N' && loc.Direction() == 'E') || (lastDir == 'W' && loc.Direction() == 'S'))
                part = SE
            lastDir = loc.Direction()
            Orion.Print(part)
            Orion.Print(Orion.FindTypeEx(part, any, backpack).length)
            var partObj = Orion.FindTypeEx(part, any, backpack).shift()
            Orion.Print('Moving')
            Orion.WalkTo(loc.Location().X(), loc.Location().Y(), Player.Z(), 1, 0, 1)
            Orion.Print('Dropping')

            Orion.FindTypeEx(any, any, ground, 'item', 1)
                .filter(function (fp) {
                    return !fp.Locked()
                })
                .forEach(function (fp) {
                    Orion.MoveItem(fp.Serial())
                    Orion.Wait(300)
                })
            Orion.Wait(300);
            Orion.Drop(partObj.Serial(), 1, loc.Location().X(), loc.Location().Y(), Player.Z());
            Orion.Wait(300);

            Orion.Ignore(partObj.Serial(), true)
            //Orion.Print(loc.Location().X()+':'+loc.Location().Y())
        });
        Orion.ClearBadLocations();
        WalkTo(startSpigot, 2)
        //Orion.UseObject(startSpigot.Serial())
    }
}

var north = 1
var south = 2
var west = 4
var east = 8
function CanGoNorth(array, x, y) {
    if (y == 0)
        return 0
    else if (array[y - 1][x].Visited())
        return 0
    return north
}
function CanGoSouth(array, x, y) {
    if (y == array.length - 1)
        return 0
    else if (array[y + 1][x].Visited())
        return 0
    return south
}
function CanGoWest(array, x, y) {
    if (x == 0)
        return 0
    else if (array[y][x - 1].Visited())
        return 0
    return west
}
function CanGoEast(array, x, y) {
    if (x == array[y].length - 1)
        return 0
    else if (array[y][x + 1].Visited())
        return 0
    return east
}

function createRoute(_grid, _x, _y, _path) {
    return {
        grid: _grid.slice(),
        x: _x,
        y: _y,
        path: _path,
        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        },
        Grid: function () {
            return this.grid;
        },
        Path: function () {
            return this.path;
        }
    }
}
function validRoute(_loc, _direction, _part) {
    return {
        loc: _loc,
        direction: _direction,
        part: _part,

        Location: function () {
            return this.loc;
        },
        Direction: function () {
            return this.direction;
        },
        Part: function () {
            return this.part;
        }
    }
}
function partSet(_graphic, _count) {
    return {
        graphic: _graphic,
        count: _count,

        Graphic: function () {
            return this.graphic;
        },
        Count: function () {
            return this.count;
        }
    }
}

function chosenRoute(_requiredParts, _route) {
    return {
        requiredParts: _requiredParts,
        route: _route,

        RequiredParts: function () {
            return this.requiredParts;
        },
        Route: function () {
            return this.route;
        }
    }
}