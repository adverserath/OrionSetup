//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Debug.js
//#include helpers/ItemManager.js

//////START OF CONFIG///////
var range = 16; //How far to load status from
var delay = 400; //Delay between loop cycle
var notorietyToShow = 3;// 'green|gray|criminal|orange|red'; //Show targets with notoriety

//DO NOT CHANGE
var lastSearchMobsIds = [];

//////END OF CONFIG///////
function ShowEnemiesByDistance() {
    //var gump = Orion.CreateCustomGump(15);
    //	gump.Clear();
    //gump.AddResizepic(0, 0, '13BE', 900, 500);

    //	gump.Update();


    while (true) {
        var mobileByDistance = [];
        for (var distance = 0; distance <= range; distance++) {
            if (!mobileByDistance.hasOwnProperty(distance)) {
                mobileByDistance[distance] = [];
            }
        };

        Orion.Wait(delay);

        //Get All mobs in area
        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'mobile|ignoreself|ignorefriends', range, notorietyToShow)
            .filter(function (mob) {
                return mob.Notoriety() >= (notorietyToShow)
                    && mob.Notoriety() < 7
                    && mob.InLOS()
            })
            .sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });

        //Filter out mobs removed since the last iteration
        lastSearchMobsIds.filter(function (mob) {
            return entireAreaMobs.map(function (mobile) { return mobile.Serial() }).indexOf(mob.Serial()) < 0;
        }).forEach(function (mobile) {
            var mobId = mobile.Serial();
            Orion.CloseStatusbar(mobId);
        });
        lastSearchMobsIds = entireAreaMobs;

        //Group mobs into object by distance
        entireAreaMobs.forEach(function (mob) {
            if (mob != null) {
                var mobInRange = mobileByDistance[mob.Distance()];
                if (mobInRange != null) {
                    mobInRange.push(mob);
                }
            }
        });

        //Show Gumps and Manage Attacks
        for (var distanceFromPlayer in mobileByDistance) {
            var mobInArea = mobileByDistance[distanceFromPlayer]
                .sort(function (mobA, mobB) {
                    return mobA.Hits() - mobB.Hits();
                });

            //Show Status Bars
            mobInArea.forEach(function (mobile, index) {
                var mobId = mobile.Serial();
                var indexX = index;
                var x = indexX * 130;
                var y = (distanceFromPlayer * 35) + 200;
                Orion.ShowStatusbar(mobId, x, y);
                // gump.AddButton(mobId, x, y, '0x00F3', '0x00F2', '0x00F1', '0');
                // gump.AddText(x, y, '#FF0000', mobile.Name());
                //    		gump.AddColoredPolygone(x, y/2, 100, 10, '0x000f', 1, 2, 1, mobId);
            })
            //   gump.Update();
        }
    }
}



function DrawRange() {
    var range = 16;
    var bow = Orion.ObjAtLayer('LeftHand');

    if (bow != null) {
        range = bow.Properties().match(/Range\s(\d*)/i)[1]
    }

    Orion.Print(range);
    while (!Player.Dead()) {
        var x = Player.X();
        var y = Player.Y();

        Orion.ClearHighlightCharacters(true);
        Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', range, 'grey|criminal|enemy')
            .forEach(function (mob) {
                if (mob.Distance() <= range && mob.InLOS() == true)
                    Orion.AddHighlightCharacter(mob.Serial(), '0x00B0', true)
                else
                    Orion.RemoveHighlightCharacter(mob.Serial(), true);

            })
        Orion.Wait(200);
    }
}
