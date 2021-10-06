//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js

//////START OF CONFIG///////
var range = 16; //How far to load status from
var delay = 300; //Delay between loop cycle
var notorietyToShow = 3;// 'green|gray|criminal|orange|red'; //Show targets with notoriety
var notorietyToAttack = 3; //Attack targets with notoriety
var pullTargetDistance = 1016 //Distance of target to agro
var attackEverythingAtOnce = true; //Initiate an attack on every target within range at once otherwise 1 target at a time
var honorTargets = true;
var autoAttack = true;
var archer = false;
var walkToNextTarget = false;
var retargetClosest = true;

//DO NOT CHANGE
var honor = true;
var attackList = []; //
var lastAttacker;
var lastSearchMobsIds = [];

//////END OF CONFIG///////
function ShowEnemiesByDistance() {

    //Stop When Dead
    while (true) {
        var mobileByDistance = [];
        for (var distance = 0; distance <= range; distance++) {
            if (!mobileByDistance.hasOwnProperty(distance)) {
                mobileByDistance[distance] = [];
            }
        };
        //Dont fight without warmode
        if (!Player.WarMode()) {
            lastAttacker = Orion.FindObject(Orion.ClientLastAttack());
            if (attackList.length > 0) {
                attackList = [];
            }
            Orion.ClearHighlightCharacters();
            Orion.Wait(2000);
        }

        lastAttacker = Orion.FindObject(Orion.ClientLastAttack());
        Orion.Wait(delay);

        //Get All mobs in area
        var entireAreaMobs = Orion.FindTypeEx(any, any, ground,
            'nothumanmobile|live|ignoreself|ignorefriends', range, notorietyToShow)
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
            if (attackList.indexOf(mobId) >= 0) {
                attackList.pop(mobId);
            }
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
            })
            //Agro everything
            if (attackEverythingAtOnce && distanceFromPlayer < pullTargetDistance) {
                mobInArea.forEach(function (mobile) {
                    var mobId = mobile.Serial();
                    if (autoAttack &&
                        Player.WarMode() &&
                        mobile != null
                        && (mobile.Notoriety() >= notorietyToAttack && mobile.Notoriety() <= 5 || Orion.ClientLastAttack() === mobId)
                        && attackList.indexOf(mobId) < 0
                    ) {
                        Orion.ClientLastAttack(mobId);
                        AttackMobile(mobile);
                    }
                });
            }
        }

        if (Player.WarMode()) {
            AttackMobile(lastAttacker);
            //Attack Closest with lowest health
            if (autoAttack && retargetClosest) {
                if (attackList.length > 0) {
                    var vicinity = [];
                    if (walkToNextTarget == true) {
                        mobileByDistance.forEach(function (distanceGroup) {
                            vicinity = vicinity.concat(distanceGroup);
                        });
                    }
                    else {
                        var vicinity = mobileByDistance[0].concat(mobileByDistance[1]);
                        if (archer) {
                            vicinity = vicinity.concat(mobileByDistance[2])
                                .concat(mobileByDistance[3])
                                .concat(mobileByDistance[4])
                                .concat(mobileByDistance[5])
                                .concat(mobileByDistance[6])
                                .concat(mobileByDistance[7])
                                .concat(mobileByDistance[8])
                                .concat(mobileByDistance[9])
                                .concat(mobileByDistance[10]);
                        }
                    }

                    vicinity = vicinity.filter(function (mob) {
                        return (mob.Notoriety() >= notorietyToAttack && mob.Notoriety() < 7)
                    })
                    if (vicinity != null && vicinity.length > 0) {
                        vicinity = vicinity.sort(function (mobSerialA, mobSerialB) {
                            return mobSerialA.Hits() - mobSerialB.Hits();
                        });
                        //var newTarget = vicinity[Orion.Random(vicinity.length)];
                        var newTarget = vicinity.shift();
                        if (lastAttacker == null || newTarget.Distance() < lastAttacker.Distance()) {
                            if (walkToNextTarget == true) {
                                if (archer == true) {
                                    WalkTo(newTarget, 8);
                                }
                                else
                                    WalkTo(newTarget, 1);

                                AttackMobile(newTarget);
                                Orion.Follow(newTarget.Serial());
                            }
                        }
                    }
                }
            }
            Orion.Wait(500)
        }
    }

    function HonorTarget(mobile) {
        if (honorTargets &&
            Player.WarMode() &&
            mobile != null &&
            !Orion.BuffExists('Honored2') &&
            mobile.Hits() == mobile.MaxHits() &&
            mobile.Distance() < 13 &&
            mobile.InLOS()) {
            if (mobile.Distance() > 13) {
                WalkTo(newTarget, 13);
            }
            Orion.AddHighlightCharacter(mobile.Serial(), '0xF550', true);
            Orion.Print('Honor');
            Orion.InvokeVirtue('Honor');
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetObject(mobile.Serial());
            }
        }
    }
    function AttackMobile(mobile) {
        if (mobile != null && Orion.ObjectExists(mobile.Serial())) {
            var mobId = mobile.Serial();
            HonorTarget(mobile);
            Orion.Attack(mobId);
            Orion.ClientLastAttack(mobId);

            if (attackList.indexOf(mobId) < 0) {
                attackList.push(mobId)
            }
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

function MobFinder() {
    var mob = SelectTarget();

    while (!Player.Dead()) {
        Orion.Wait(500);
        while (Player.WarMode()) {
            Orion.Wait(500);
            var mobs = Orion.FindTypeEx(mob.Graphic(), any, ground,
                'nothumanmobile|live|ignoreself|ignorefriends', '60', '3|4')

            if (mobs.length > 0) {
                WalkTo(mobs.shift(), 10);
            }

        }
    }
}