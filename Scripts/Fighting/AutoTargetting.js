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
var attack = true; //Enable attacking
var honor = false;
var attackList = []; //
var lastAttacker;
var lastSearchMobsIds = [];
var attackEverythingAtOnce = true; //Initiate an attack on every target within range at once otherwise 1 target at a time

//////END OF CONFIG///////
function ShowEnemiesByDistance() {
    TextWindow.Open();

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
                if(mobInRange!=null){
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


                    if (Orion.ClientLastAttack() == mobId) {
                        TextWindow.Clear();
                        TextWindow.Print('War: ' + Player.WarMode());
                        TextWindow.Print('attack: ' + attack);
                        TextWindow.Print('mobile: ' + mobile.Name());
                        TextWindow.Print('distanceFromPlayer: ' + (distanceFromPlayer <= pullTargetDistance));
                        TextWindow.Print('Notoriety: ' + mobile.Notoriety() + ' ' + (notorietyToAttack && mobile.Notoriety() <= 5));
                        TextWindow.Print('ID: ' + Orion.ClientLastAttack() == mobId);
                        TextWindow.Print('attackList: ' + attackList.indexOf(mobId));
                        TextWindow.Print('LOS: ' + mobile.InLOS());
                    }

                    if (Player.WarMode() &&
                        attack == true &&
                        mobile != null
                        && shouldAttack
                        && distanceFromPlayer <= pullTargetDistance
                        && (mobile.Notoriety() >= notorietyToAttack && mobile.Notoriety() <= 5 || Orion.ClientLastAttack() == mobId)
                        && attackList.indexOf(mobId) < 0
                        //  && mobile.InLOS()
                    ) {
                        Orion.Print('Loop');

                        if (attackEverythingAtOnce) {
                            TextWindow.Print(Orion.ClientLastAttack());
                            Orion.ClientLastAttack(mobId);
                            Orion.Wait(100);
                            TextWindow.Print(Orion.ClientLastAttack());

                            AttackMobile(mobile);
                            TextWindow.Print(Orion.ClientLastAttack());
                            if (lastAttacker != null && !lastAttacker.Dead()) {
                                AttackMobile(lastAttacker);
                            }
                            //   Orion.Wait(1000);

                        }
                        else {
                            Orion.Print('Inner Attack');
                            AttackMobile(mobile);
                        }
                    }
                })

        };

    }

    //Attack Closest with lowest health
    if (attack || lastAttacker == null || lastAttacker.Distance() > 1) {
        if (attackList.length > 0) {
            var vicinity = mobileByDistance[0].concat(mobileByDistance[1]);

            if (vicinity != null && vicinity.length > 0) {

                vicinity = vicinity.sort(function (mobSerialA, mobSerialB) {
                    return mobSerialA.Hits() - mobSerialB.Hits();
                });
                Orion.ClientLastAttack(vicinity[0].Serial());
                Orion.Attack(Orion.ClientLastAttack());
                Orion.Print("Attack Closest");
                Orion.AddHighlightCharacter(mobile.Serial(), '0x00F0', true);
            }
        }
    }
}

function HonorTarget(mobile) {
    if (Player.WarMode() &&
        mobile != null &&
        // !attackEverythingAtOnce &&
        !Orion.BuffExists('Honored2') &&
        mobile.Hits() == mobile.MaxHits() &&
        mobile.Distance() < pullTargetDistance) {
        Orion.AddHighlightCharacter(mobile.Serial(), '0xF550', true);
        Orion.Print('Honor');
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(500)) {
            Orion.TargetObject(mobile.Serial());
        }
    }
}
function AttackMobile(mobile) {
    var mobId = mobile.Serial();
    Orion.AddHighlightCharacter(mobId, '0x0FBA', true);
    HonorTarget(mobile);
    Orion.Attack(mobId);
    attackList.push(mobId)
}