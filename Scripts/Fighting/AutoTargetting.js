///#include helpers/Target.js
///#include helpers/Magic.js
//#include helpers/Debug.js
///#include helpers/ItemManager.js

//////START OF CONFIG///////
var range = 20; //How far to load status from
var delay = 400; //Delay between loop cycle
var notorietyToShow = 3;// 'green|gray|criminal|orange|red'; //Show targets with notoriety
var notorietyToAttack = 3; //Attack targets with notoriety
var pullTargetDistance = 15; //Distance of target to agro
var attackEverythingAtOnce = true; //Initiate an attack on every target within range at once otherwise 1 target at a time

var attack = true; //Enable attacking
var honor = false;
var attackList = []; //
var lastAttacker;
var lastSearchMobsIds = [];
var honorTargets = false;
//////END OF CONFIG///////
function ShowEnemiesByDistance(range,
    autoAttack,
    _honorTargets,
    delay,
    notorietyToShow,
    notorietyToAttack,
    pullTargetDistance,
    attackEverythingAtOnce) {
honorTargets= _honorTargets;
    //Stop When Dead
    while (!Player.Dead()) {
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
                    && mob.Notoriety() < 7;
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
            mobileByDistance[distanceFromPlayer]
                .sort(function (mobA, mobB) {
                    return mobA.Hits() - mobB.Hits();
                }).forEach(function (mobile, index, array) {
                    var mobId = mobile.Serial();
                    var indexX = index;
                    var x = indexX * 130;
                    var y = (distanceFromPlayer * 35) + 200;
                    Orion.ShowStatusbar(mobId, x, y);


                    var shouldAttack = lastAttacker == null
                        || attackEverythingAtOnce;

                    if (autoAttack &&
                        Player.WarMode() &&
                        attack == true &&
                        mobile != null
                        && shouldAttack
                        && distanceFromPlayer <= pullTargetDistance
                        && (mobile.Notoriety() >= notorietyToAttack && mobile.Notoriety() <= 5 || Orion.ClientLastAttack() == mobId)
                        && attackList.indexOf(mobId) < 0
                    ) {
                        if (attackEverythingAtOnce) {
                            Orion.ClientLastAttack(mobId);
                            AttackMobile(mobile);
                        }
                        else {
                            Orion.ClientLastAttack(mobId);
                            AttackMobile(mobile);
                        }
                    }
                })
        };
    }
    AttackMobile(lastAttacker);

    //Attack Closest with lowest health
    if (autoAttack && Player.WarMode() && (attack || lastAttacker == null || lastAttacker.Distance() > 1)) {
        if (attackList.length > 0) {
            var vicinity = mobileByDistance[0].concat(mobileByDistance[1]);

            if (vicinity != null && vicinity.length > 0) {

                vicinity = vicinity.sort(function (mobSerialA, mobSerialB) {
                    return mobSerialA.Hits() - mobSerialB.Hits();
                });
                var newTarget = vicinity.shift();
                AttackMobile(newTarget);
            }
        }
    }
}

function HonorTarget(mobile) {
    if (honorTargets &&
        Player.WarMode() &&
        mobile != null &&
        !Orion.BuffExists('Honored2') &&
        mobile.Hits() == mobile.MaxHits() &&
        mobile.Distance() < 10) {
        Orion.AddHighlightCharacter(mobile.Serial(), '0xF550', true);
        Orion.Print('Honor');
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(1000)) {
            Orion.TargetObject(mobile.Serial());
        }
    }
}
function AttackMobile(mobile) {
    if (attackList.indexOf(mobile)) {
var mobId = mobile.Serial();
        Orion.AddHighlightCharacter(mobId, '0x0FBA', true);
        HonorTarget(mobile);
        Orion.Attack(mobId);
        Orion.ClientLastAttack(mobId);

        if (attackList.indexOf(mobId) < 0) {
            attackList.push(mobId)
        }
    }
}