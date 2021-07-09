function SeaFish()
{
while(true)
{
if(            Orion.FindTypeEx(any, any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', 16, 'gray|criminal|red').length==0)
                {
	Orion.Say('forward');
	Orion.Wait(4000);
	Orion.Say('stop');
	Orion.UseObject('0x40026413');
	if (Orion.WaitForTarget(1000))
		Orion.TargetTileRelative('any', -4, 1, 65533);
	Orion.Wait(10000);
	}
	else{
	Orion.Say('Stop')
		Orion.Wait(1000);
		}
}
}


function StartFishing() {

    DebugStart()
    // How far to look for trees from the player
    var range = 16;
    AutoFisherman(range);
}

function Messages() {
    TextWindow.Open();

    TextWindow.Clear();
    range = 10//0x00A8|0x00A9|0x00AA|0x00AB|0x0136|0x0137
    //Orion.GetTilesInRect('0x00A8|0x00A9|0x00AA|0x00AB|0x0136|0x0137', (Player.X() - range), (Player.Y() - range), -10, (Player.X() + range), (Player.Y() + range), 255)
    //            var tiles = Orion.GetTilesInRect('0x1797|0x1798|0x1799|0x179A|0x00A8|0x00A9|0x00AA|0x00AB|0x0136|0x0137', xLoc, yLoc,xLoc, yLoc)
    //           if (tiles.length==1 && tiles[0].Graphic() == '0x1797|0x1798|0x1799|0x179A|0x00A8|0x00A9|0x00AA|0x00AB|0x0136|0x0137') {
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
    return waterTiles;
}
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
    bin = Orion.FindObject('0x40034372');
    fishingRod = Orion.FindTypeEx(fishingRods, any, backpack | Player.Serial()).shift();

    var waterTiles = [];

    while (!Player.Dead()) {
        EquipRod();
        waterTiles = GetWater(range)

        Orion.Print("Water tiles: " + waterTiles.length)

        while (waterTiles.length > 0) {
            Orion.Wait(500)

            var waterTile = waterTiles.shift();
            Orion.RemoveFakeMapObject(waterTile.X().toString() + waterTile.Y().toString());

            Orion.AddFakeMapObject(waterTile.X().toString() + waterTile.Y().toString(), '0x09CC', '0xFF00', waterTile.X(), waterTile.Y(), waterTile.Z() + 15);

            TextWindow.Print('X:' + waterTile.X() + ' Y:' + waterTile.Y() + ' Z:' + waterTile.Z());
            var outcome = Orion.WalkTo(waterTile.X(), waterTile.Y(), waterTile.Z(), 4, 255, 1, 1);
            TextWindow.Print("Walked" + outcome);

            Orion.WalkTo(waterTile.X(), waterTile.Y(), waterTile.Z(), 6, 255, 1, 1)
            if (outcome) {
                Fish(waterTile)
                var chunkX = parseInt((waterTile.X() / 8))
                var chunkY = parseInt((waterTile.Y() / 8))
                Orion.RemoveFakeMapObject(waterTile.X().toString() + waterTile.Y().toString());
                var newChunk = {
                    x: chunkX,
                    y: chunkY,
                    X: function () {
                        return this.x;
                    },
                    Y: function () {
                        return this.y;
                    }
                };
                TextWindow.Print('newChunk')
                TextWindow.Print(newChunk.X() + '  ' + newChunk.Y())

                fishedWater.push(newChunk);
                fishedWater.forEach(function (chunk) {
                    TextWindow.Print('fished chunks')
                    TextWindow.Print(chunk.X() + '  ' + chunk.Y())
                })
                waterTiles = waterTiles.filter(function (tiles) {
                    var keepTile = parseInt((tiles.X() / 8)) != chunkX && parseInt((tiles.Y() / 8)) != chunkY
                    if (!keepTile)
                        Orion.RemoveFakeMapObject(tiles.X().toString() + tiles.Y().toString());
                    return keepTile;

                })

            }
            Orion.ClearJournal();

            waterTiles.sort(function (waterA, waterB) {
                return Orion.GetDistance(waterA.X(), waterA.Y()) - Orion.GetDistance(waterB.X(), waterB.Y());
            });
            Orion.Print("Changing fishing location")
        }
    }
}
var doNext = true;
var walkBack;
function Fish(tile) {
    Orion.Wait(500)
    DebugText('StartFishMethod');
    walkBack = false;
    doNext = false;
    while (!doNext) {
        if (Player.WarMode()) {
            Orion.Print('In War Mode');
        }
        while (Player.WarMode()) {
            Orion.Wait(2000);
        }
        if (Player.Weight() > (Player.MaxWeight() - 50)) {
            Orion.FindListEx('Fishies').forEach(function (fish) {
                Orion.UseType('0x13F6', '0xFFFF');
                if (Orion.WaitForTarget(1000)) {
                    Orion.TargetObject(fish.Serial());
                    Orion.Wait(600);
                }
            })

        }

        if (Player.Weight() > (Player.MaxWeight() - 50)) {

            DebugText('Heading Back to Storage');

            WalkTo(storageBox)
            Orion.Wait(1000);
            Orion.FindListEx('Fishies').forEach(function (fish) {
                MoveItemsFromPlayer(storageBox, fish.Graphic(), any);
            })
            Orion.Wait(1000);
            WalkTo(storageBox)
            Orion.FindListEx('UnwantedStuff').forEach(function (notFish) {
            //Orion.DropHere(notFish.Serial());
                MoveItemsFromPlayer(bin, notFish.Graphic(), any);
            })
            walkBack = true;
        }
        if (walkBack) {
            Orion.WalkTo(tile.X(), tile.Y(), tile.Z(), 4, 255, 1, 1);
            walkBack = false;
        }
        EquipRod();
        var startTime = Orion.Now();

        while (!doNext && Player.Weight() < (Player.MaxWeight() - 40)) {
            DebugText('Cast Rod');

            Orion.Wait(1000);

            startTime = Orion.Now();
            Orion.UseObject(fishingRod.Serial());

            if (Orion.WaitForTarget(1000)) {
                Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
                Orion.AddDisplayTimer('fishing',
                    6000,
                    'Top', 'Circle', 'Fishing', 0, 0,
                    'any', -1, '0x0000FFFE');
            }
            Orion.Wait(1000);
            Orion.UseObject(fishingRod.Serial());

            if (Orion.WaitForTarget(1000)) {
                Orion.TargetTile(any, tile.X(), tile.Y(), tile.Z());
            }
            var msg = (Orion.WaitJournal('Already fishing|You need to be closer|You do not have room|You broke your|seem to be biting here|You do not have room|You broke your|', Orion.Now() - 1000, (Orion.Now() + 2000), '2', '0'))

            if (msg == null) {
                DebugText('Cant fish that');
                doNext = true;
            }
            else {
                //        TextWindow.Print(msg.Text());
                if (Orion.InJournal('You need to be closer|You do not have room|You broke your|cannot be seen', '', '0', '-1', (startTime), Orion.Now()) != null) {
                    DebugText('Done here');
                    doNext = true;
                    Orion.Wait(1000);
                }
                else if (Orion.InJournal('seem to be biting here|You do not have room', '', '0', '-1', (startTime), Orion.Now()) != null) {
                    DebugText('Keep fishing here');
                    doNext = true;
                    Orion.Wait(1000);
                }
                else if (Orion.InJournal('You broke your', '', '0', '-1', (startTime), Orion.Now()) != null) {
                    //NeedNewRod
                    BotPush('New rod needed')
                    doNext = true;
                    Orion.Wait(1000);
                }
                else if (Orion.InJournal('already fishing', '', '0', '-1', (startTime), Orion.Now()) != null) {
                    while (Orion.DisplayTimerExists('fishing')) {
                        Orion.Wait(1000);
                        doNext = false;

                    }
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
function WaterTest() {
    GetWater(32);
}
function GetWater(_range) {
    Orion.Wait(300)
    Orion.Print('Range ' + _range);
    var waterTiles = Orion.GetTilesInRect('water', (Player.X() - _range), (Player.Y() - _range), (Player.X() + _range), (Player.Y() + _range))
        .concat(
            Orion.GetTilesInRect('land', (Player.X() - _range), (Player.Y() - _range), (Player.X() + _range), (Player.Y() + _range))
        ).filter(function (tile) {
            return tile.Graphic() == '0x00A8'
                || tile.Graphic() == '0x00A9'
                || tile.Graphic() == '0x00AA'
                || tile.Graphic() == '0x00AB'
                || tile.Graphic() == '00x0136'
                || tile.Graphic() == '0x0137'
                || tile.Graphic() == '0x1797'
                || tile.Graphic() == '0x1798'
                || tile.Graphic() == '0x1799'
                || tile.Graphic() == '0x179A'
                || tile.Graphic() == '0x179B'
                || tile.Graphic() == '0x179C'
        })
        .filter(function (tile) {
            return (IsReachable(tile, 5)) && (tile.X() - 1) % 8 != 0 && (tile.Y() - 1) % 8 != 0
        })

        .filter(function (tile) {
            return fishedWater.map(
                function (e) {
                    return e.X();
                })
                .indexOf(parseInt((tile.X() / 8)))
                && fishedWater.map(
                    function (e) {
                        return e.Y();
                    })
                    .indexOf(parseInt((tile.Y() / 8)));

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

function IsReachable(tile, _range) {
    var result = Orion.GetTilesInRect('land', (tile.X() - _range), (tile.Y() - _range), 0, (tile.X() + _range), (tile.Y() + _range), 255).length;
    //Orion.GetTilesInRect('tileFlags', startX, startY, endX, endY);
    return result >= 9 && result < 30;
}

function GetWater2(range) {
    var waterTiles = [];
    Orion.Print('Range ' + range);
    for (var xLoc = (Player.X() - range); xLoc < (Player.X() + range); xLoc++) {
        for (var yLoc = (Player.Y() - range); yLoc < (Player.Y() + range); yLoc++) {
            var tiles = Orion.GetTilesInRect('', xLoc, yLoc, xLoc, yLoc)

            if (tiles.length > 1 && (tiles[0].Graphic() == '0x00A8'
                || tiles[0].Graphic() == '0x00A9'
                || tiles[0].Graphic() == '0x00AA'
                || tiles[0].Graphic() == '0x00AB'
                || tiles[0].Graphic() == '00x0136'
                || tiles[0].Graphic() == '0x0137')) {
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

//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/ItemManager.js
