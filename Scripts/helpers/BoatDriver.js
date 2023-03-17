//#include helpers/Notifier.js
//#include helpers/Target.js
/*

            if (reg.Name == "Sea Market")
                return 1116507; //Professional Fisher Quest - Floating Emporium
            if (reg.Name == "Britain")
                return 1116728; //Professional Fisher Quest - Britain
            if (reg.Name == "Trinsic")
                return 1116730; //Professional Fisher Quest - Trinsic
            if (reg.Name == "Moonglow")
                return 1116731; //Professional Fisher Quest - Moonglow
            if (reg.Name == "Skara Brae")
                return 1116732; //Professional Fisher Quest - Skara Brae
            if (reg.Name == "Vesper")
                return 1116733; //Professional Fisher Quest - Vesper
            if (reg.Name == "Jhelom" || reg.Name == "Jhelom Islands")
                return 1116734; //Professional Fisher Quest - Jhelom
            if (reg.Name == "Papua")
                return 1116735; //Professional Fisher Quest - Papua
                */
var SeaMarket = createDock("Sea Market", 4518, 2320, [coordinate(4518, 2320)], false, false);
var Britain = createDock("Britain", 1471, 1803, [coordinate(1471, 1803)], false, false);
var Trinsic = createDock("Trinsic", 2115, 2854, [coordinate(2115, 2854)], false, false);
var Moonglow = createDock("Moonglow", 4410, 1008, [coordinate(4410, 849), coordinate(4410, 1008)], false, false);
var SkaraBrae = createDock("Skara Brae", 655, 2306, [coordinate(655, 2306)], true, false);//Go through right
var Vesper = createDock("Vesper", 3051, 835, [coordinate(3051, 835)], false, false);
var Jhelom = createDock("Jhelom", 1388, 3925, [coordinate(1528, 3824), coordinate(1528, 3925), coordinate(1388, 3925)], false, false);
var Jhelom = createDock("Jhelom Islands", 1388, 3925, [coordinate(0, 0)], false, false);
var Papua = createDock("Papua", 5866, 3243, [coordinate(2983, 2886), coordinate(5972, 2687), coordinate(5866, 2687), coordinate(5866, 3243)], false, true);

function createDock(_name, _X, _Y, _path, goOffMap, _lostLand) {
    return {
        name: _name,
        x: _X,
        y: _Y,
        path: _path,
        lostLand: _lostLand,
        Name: function () {
            return this.name;
        },
        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        },
        Path: function () {
            return this.path;
        },
        inLostLand: function () {
            return this.lostLand;
        }

    }
}
function coordinate(xLoc, yLoc) {
    return {
        x: xLoc,
        y: yLoc,
        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        },
        Serial: function()
        {
            return "coordinate";
        }
    }
}

function createDock(_name, _X, _Y, _path) {
    return {
        name: _name,
        x: _X,
        y: _Y,
        path: _path,
        Name: function () {
            return this.name;
        },
        X: function () {
            return this.x;
        },
        Y: function () {
            return this.y;
        },
        Path: function () {
            return this.path;
        }

    }
}

var mast;
function SailTo(location) {
    if (mast == null)
        mast = SelectTarget();
    if (Player.X() < location + 5 && Player.X() > location - 5) {
        Orion.Say('Stop');
    }
    if (Player.Y() < location + 5 && Player.Y() > location - 5) {
        Orion.Say('Stop');
        var distance = toPositive(location - Player.Y())
        for (var x = 0; x < distance; x++) {
            Orion.Say('Forward one')
            Orion.Wait(200);
        }
    }
}

function toPositive(n) {
    if (n < 0) {
        n = n * -1;
    }
    return n;
}

function SetDirection(location) {
    var north = '0x0000'
    var east = '0x0001'
    var south = '0x0002'
    var west = '0x0003'
    var heading;
    var direction = mast.Graphic();
    var currentLocation = coordinate(Player.X(), Player.Y());
    if (location.X() < Player.X()) {
        heading = west;
    }
    else if (location.X() > Player.X()) {
        heading = east;
    }
    else if (location.Y() > Player.Y()) {
        if (location.Y() - Player.Y())
            heading = north;
    }
    else if (location.Y() < Player.Y()) {
        heading = east;
    }
}

function LookForAFight() {
    //if any mob within 12 tiles
    //  //STOP AND KILL EVERYTHING 
    //then carry on
}