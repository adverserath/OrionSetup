//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/ItemManager.js


function StartFishing() {

    DebugStart()
    // How far to look for trees from the player
    var range = 3;
    AutoFisherman(range);
}

function Messages() {
    while (true) {
        var msg = (Orion.WaitJournal('You need to be closer|You do not have room|You broke your|seem to be biting here|You do not have room|You broke your|', Orion.Now(), Orion.Now() + 10000, '2', '0'))

        if (msg != null) {
            TextWindow.Print(msg.Text())
            TextWindow.Print(msg.FindTextID())
            TextWindow.Print(msg.Flags())
            TextWindow.Print(msg.Serial())
        }

    }

}

function HighLightWater() {
    Orion.Print('Range ' + range);
    var waterTiles = Orion.GetTilesInRect('land', Player.X() - 10, Player.Y() - 10, Player.X() + 10, Player.Y() + 10)
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });
    Orion.ClearFakeMapObjects();
    waterTiles.forEach(function (water) {
        Orion.AddFakeMapObject(water.X().toString() + water.Y().toString(), '0x09CC', '', water.X(), water.Y(), water.Z());
    });
    return waterTiles;}
var debug = true;
var fishingRods = '0x0DC0'
var range;
var fishedWater = [];
var storageBox;
var fishingRod = null;

function AutoFisherman(_range) {
    range = _range;

    DebugStart();
    Orion.Say('Lets go fishing');
    Orion.Print("Go into war mode to stop the script at any point");

    storageBox = SelectTarget('Select a storage Box');

    fishingRod = Orion.FindTypeEx(fishingRods, any, backpack | Player.Serial()).shift();

    var waterTiles = [];

    while (!Player.Dead()) {
        EquipRod();
        waterTiles = GetWater();
        Orion.Print("Water" + waterTiles.length)
        fishedWater = fishedWater.concat(waterTiles.map(function (watertile) {
            return watertile.X().toString() + watertile.Y().toString()
        }));

        while (waterTiles.length > 0) {
        Orion.Wait(500)

            var waterTile = waterTiles.shift();
            TextWindow.Print('X:'+ waterTile.X() + ' Y:'+ waterTile.Y() + ' Z:'+  waterTile.Z());
            var outcome =Orion.WalkTo(waterTile.X(), waterTile.Y(), waterTile.Z(), 6, 255, 1, 1);
                            TextWindow.Print("Walked" + outcome);

            Orion.WalkTo(waterTile.X(), waterTile.Y(), waterTile.Z(), 6, 255, 1, 1)
            if (outcome) {
                Fish(waterTile)
                Orion.RemoveFakeMapObject(waterTile.X().toString() + waterTile.Y().toString());
            }
            Orion.ClearJournal();

            waterTiles.sort(function (waterA, waterB) {
                return Orion.GetDistance(waterA.X(), waterA.Y()) - Orion.GetDistance(waterB.X(), waterB.Y());
            });
            Orion.Print("Changing fishing location")
        }
    }
}

var walkBack;
function Fish(tile) {
Orion.Wait(500)
    DebugText('StartFishMethod');
    walkBack = false;
    var doNext = false;

    while (!doNext) {
        if (Player.WarMode()) {
            Orion.Print('In War Mode');
        }
        while (Player.WarMode()) {
            Orion.Wait(2000);
        }
        if (walkBack) {
            Orion.WalkTo(tile.X(), tile.Y(), tile.Z(), 1, 255, 1, 1);
            walkBack = false;
        }

        if (Player.Weight() > (Player.MaxWeight() - 40)) {
            WalkTo(storageBox)
            Orion.FindListEx('Fishies').forEach(function (fish) {
                MoveItemsFromPlayer(storageBox, fish.Graphic(), any);
            })
        }

        EquipRod();
        Orion.UseObject(fishingRod.Serial());

        if (Orion.WaitForTarget(1000)) {
            Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
        }
        var startTime = Orion.Now();
        while (!doNext) {
            Orion.Wait(500);
            startTime = Orion.Now();
            Orion.UseObject(fishingRod.Serial());

            if (Orion.WaitForTarget(1000)) {
                TextWindow.Print(tile.Flags());
                Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
                Orion.AddDisplayTimer('fishing',
                    10000,
                    'Top', 'Circle', 'Fishing', 0, 0,
                    'any', -1, '0x0000FFFE');
            }
            var msg = (Orion.WaitJournal('Already fishing|You need to be closer|You do not have room|You broke your|seem to be biting here|You do not have room|You broke your|', Orion.Now(), (Orion.Now() + 10000), '2', '0'))

            if (msg == null) {
                TextWindow.Print('Cant fish that');
                doNext = true;
            }
            else {
                //        TextWindow.Print(msg.Text());
                if (Orion.InJournal('You need to be closer|You do not have room|You broke your|cannot be seen', '', '0', '-1', Orion.Now() - 2000, Orion.Now()) != null) {
                    TextWindow.Print('Done here');
                    doNext = true;
                }
                else if (Orion.InJournal('seem to be biting here|You do not have room|You broke your', '', '0', '-1', Orion.Now() - 2000, Orion.Now()) != null) {
                    TextWindow.Print('Keep fishing here');

                    doNext = true;
                }
                else if (Orion.InJournal('already fishing', '', '0', '-1', Orion.Now() - 2000, Orion.Now()) != null) {
                    Orion.Wait(2000);

                }

            }

        }

    }
}
/*
 
                NoResourcesMessage = 503172, // The fish don't seem to be biting here.
                FailMessage = 503171, // You fish a while, but fail to catch anything.
                TimedOutOfRangeMessage = 500976, // You need to be closer to the water to fish!
                OutOfRangeMessage = 500976, // You need to be closer to the water to fish!
                PackFullMessage = 503176, // You do not have room in your backpack for a fish.
                ToolBrokeMessage = 503174 // You broke your fishing pole.
                */

function EquipRod() {
    if (fishingRod.Layer() == 0) {
        Orion.Unequip('LeftHand');
        Orion.Unequip('RightHand');
        Orion.Wait(400);

        while (Orion.ObjAtLayer('LeftHand') == null) {
            Orion.Equip(fishingRod.Serial());
            Orion.Wait(1000);
        }

    }

}

function GetWater1(_private) {
    Orion.Print('Range ' + range);
    var waterTiles = Orion.GetTilesInRect('water', Player.X() - range, Player.Y() - range, Player.X() + range, Player.Y() + range)
        .filter(function (water) {
            return ((Player.Z() - 5) > water.Z())
        })
        .filter(function (water) {
            return Orion.GetTiles('any', water.X(), water.Y()).length == 1
        })
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        });
    Orion.ClearFakeMapObjects();
    waterTiles.forEach(function (water) {
        Orion.AddFakeMapObject(water.X().toString() + water.Y().toString(), '0x09CC', '', water.X(), water.Y(), water.Z());
    });
    return waterTiles;
}

function GetWater(_private) {
    var waterTiles = [];
    Orion.Print('Range ' + range);
    for (var xLoc = (Player.X() - range); xLoc < (Player.X() + range); xLoc++) {
        for (var yLoc = (Player.Y() - range); yLoc < (Player.Y() + range); yLoc++) {
            var tiles = Orion.GetTilesInRect('water', xLoc, yLoc,xLoc, yLoc)
            if (tiles.length == 1 && tiles[0].Graphic() == '0x179A|0x1797') {
                TextWindow.Print(tiles[0].Graphic())
                var newTile = {
                    x: xLoc,
                    y: yLoc,
                    z: tiles[0].Z(),
                    X: function () {
                        return this.x;
                    },
                    Y: function () {
                        return this.y;
                    },
                    Z: function () {
                        return this.z;
                    }
                }
                TextWindow.Print(newTile.X())
                waterTiles.push(newTile);

            } else if (tiles.length == 0) {
                TextWindow.Print("create tile")
                var newTile = {
                    x: xLoc,
                    y: yLoc,
                    z: -5,
                    X: function () {
                        return this.x;
                    },
                    Y: function () {
                        return this.y;
                    },
                    Z: function () {
                        return this.z;
                    }
                }
                TextWindow.Print(newTile.X())
                waterTiles.push(newTile)
            }

        }
    }
    waterTiles = waterTiles.sort(function (t1, t2) {
        return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
    });
    Orion.ClearFakeMapObjects();
    waterTiles.forEach(function (water) {
        Orion.AddFakeMapObject(water.X().toString() + water.Y().toString(), '0x09CC', '', water.X(), water.Y(), water.Z());
    });
    return waterTiles;
}


function IsReachable(water) {
    //Orion.GetTilesInRect('tileFlags', startX, startY, endX, endY);
    return Orion.GetTilesInRect('water', water.X() - 4, water.Y() - 4, water.X() + 4, water.Y() + 4).length < 49;
}