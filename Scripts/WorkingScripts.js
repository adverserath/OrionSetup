///#include helpers/TestScripts.js

function BotPush(){
    var bot = "https://discordapp.com/api/webhooks/776482027423137792/-NRLMu49p8YsblDA8duSXXMBEH0mLTsnr8QpboGltdwh-mthWK5q8w4_m2JYOO7tGIqB"; // Webhook url
var paramText = "content=test";

Orion.HttpPost(bot, paramText + "Test message")
}

function SpeakBuy() {
    while (true) {
        var buyMessage = Orion.WaitJournal('', Orion.Now(), 0);

        TextWindow.Print(buyMessage);

        if (inNpc != null || buyMessage.Serial() == Player.Serial()) {
            var npc = buyMessage.Text().split(' ')[0];
            var action = buyMessage.Text().split(' ')[1];
            TextWindow.Clear();
            VendorAction(action, npc);

        }
    }
}

function VendorAction(action, npc, shopList) {
    var buy = 'buy';
    var sell = 'sell';
    var all = 'all';
    if ((action == buy || action == sell) && npc != null) {
        Orion.CancelContextMenu();

        TextWindow.Print('action:' + action);
        TextWindow.Print('npc:' + npc);

        var vendors = Orion.FindTypeEx(any, any, ground,
            'human|live|ignoreself|ignorefriends', 20, 7);
        TextWindow.Print(vendors);
        vendors.filter(function (mob) {
            var addNpc;
            if (npc === all) {
                addNpc = (mob.Properties().search("Quest Giver") == -1);
            }
            else {
                addNpc = (mob.Name().toLowerCase() === npc.toLowerCase());
            }
            return addNpc;
        })
            .forEach(function (vendor) {
                TextWindow.Print('found:' + vendor.Name());
                Orion.CancelContextMenu();
                if (vendor.Distance() > 8) {
                    TextWindow.Print('walking to ' + vendor.Name());
                    Orion.WalkTo(vendor.X(), vendor.Y(), vendor.Z(), 8, Player.Z(), 1, 1);
                }
                if (action == buy) {

                    TextWindow.Print('buy from ' + vendor.Name());

                    Orion.RequestContextMenu(vendor.Serial());
                    Orion.WaitContextMenuID(vendor.Serial(), 1);
                    if (shopList != null) { Orion.BuyRestock(shopList); }
                    Orion.Wait(1000);
                }
                else if (action == sell) {
                    TextWindow.Print('sell to ' + vendor.Name());
                    Orion.RequestContextMenu(vendor.Serial());
                    Orion.WaitContextMenuID(vendor.Serial(), 2);
                    if (shopList != null) { Orion.Sell(shopList); }
                    Orion.Wait(1000);
                }
            });
    }
}

function Restock(listName) {
    var requiredItems = Orion.GetFindList(listName).Items();
    requiredItems.forEach(function (reqItem) {
        var neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), any, backpack, '', '', true));
        DebugWrite('item:' + reqItem.Comment() + ' Needed: ' + neededAmount);

        if (neededAmount > 0) {
            Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
                return container.Serial() != Player.Serial();
            })
                .forEach(function (outside) {
                    Orion.FindTypeEx(reqItem.Graphic(), any, outside.Serial(), '', 2, '', true).forEach(function (item) {
                        neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), any, backpack, '', '', true));
                        if (item.Container() != Player.Serial() && neededAmount > 0) {
                            DebugWrite(item.Container() + '   ' + neededAmount);
                            Orion.MoveItem(item.Serial(), neededAmount);
                            Orion.Wait(300);
                        }
                    });
                });
        }
    });
    var successful = requiredItems.filter(function (item) {
        DebugWrite('item:' + (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)));
        return (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)) > 1;
    }).length == 0;
    return successful;
}

function CountAroundPlayer(graphicId) {
    var boxes = Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
        return container.Serial() != Player.Serial() && container.Serial()!=0;
    });
   
    var count = boxes.reduce(function (box,box2) {
    return box + Orion.Count(graphicId, any, box2.Serial(), any, 2, true)
    },0);
return count;
}

function listInBackpack(listName) {
    var requiredItems = Orion.GetFindList(listName);
    var result = requiredItems.Items().filter(function (item) {
        DebugWrite('item:' + item.Comment() + ' ' + Orion.Count(item.Graphic()) + '/' + CountAroundPlayer(item.Graphic()));
        return Orion.Count(item.Graphic()) == 0;
    });
    return result;
}

function listHasEmptyInBackpack(listName) {

    return listInBackpack(listName).length > 0;
}

var debug = true; //Show debug output
function DebugWrite(message) {
    if (debug == true) {
        TextWindow.Open();
        TextWindow.WriteLine(message);
    }
}

function Inscribe() {
    TextWindow.Open();
    var triedToBuy = false;
    while (!Player.Dead()) {
    Orion.Wait(400);
        TextWindow.Clear();
         DebugWrite('inscription :' + Orion.SkillValue('inscription'));
        var needToBuy = listHasEmptyInBackpack('Inscribe');

        if (needToBuy && !triedToBuy) {
            Restock('Inscribe');
            // VendorAction('sell', 'Pavel', 'sInscribe');

            triedToBuy = !listHasEmptyInBackpack('Inscribe');;
        }
        else if (needToBuy && triedToBuy) {
            Orion.Wait(60000);
            triedToBuy = false;
        }
        else {
            triedToBuy = false;
            Orion.Print('make');
            if (Player.Mana() < 40) {
                Orion.Wait(1000);
                Orion.Wait(2000);
                Orion.UseSkill('Meditation');

                while (Player.Mana() < Player.MaxMana()) {
                    if (!Orion.BuffExists('meditation')) {
                            DebugWrite('meditating');
                        Orion.UseSkill('Meditation');
                    }
                    Orion.Wait(4000);
                }
            }
            if (Orion.WaitForGump(1000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (gump0.ID() === '0x38920ABD')) {
                    gump0.Select(Orion.CreateGumpHook(21));
                    Orion.Wait(100);
                }
            }
            else {
                var pens = Orion.FindTypeEx('0x0FBF', 'any', 'backpack');
                Orion.UseObject(pens[0].Serial());
            }

            Orion.Wait(1000);
        }

    }
}

function showbuff() {
    while (Player.WarMode()) {
        Orion.Wait(1000);

        TextWindow.Write(Orion.InfoBuff());
    }
}
function BushKnight() {
    TextWindow.Open();
    while (Player.IsHuman()) {
        while (Player.WarMode()) {
            Orion.Wait(500);

            var attacker = Orion.FindObject(Orion.ClientLastAttack());
            if (Player.Mana() > 10 && !Orion.BuffExists('Counter Attack')) {
                Orion.Cast('Counter Attack');
                Orion.Wait(1000);
            }
            if (Player.Mana() > 10 &&
                !Orion.BuffExists('Lightning Strike') &&
                !Orion.BuffExists('Honorable Execution')
            ) {
                Orion.Cast('Lightning Strike');
                Orion.Wait(1000);
            }

            if (false && attacker != null && attacker.Distance() < 8) {
                if (Player.Mana() > 10 && !Orion.BuffExists('consecrate weapon')) {
                    Orion.Cast('consecrate weapon');
                    Orion.Wait(2000);
                }

                if (false && Player.Mana() > 10 && !Orion.BuffExists('divine fury')) {
                    Orion.Cast('divine fury');
                    Orion.Wait(2000);
                }
            }
        }
    }
}


function HealingSelf() {
    while (!Player.Dead()) {
        Orion.Wait(500);
        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(500);
            while (Orion.BuffExists('healing skill')) {
                Orion.Wait(100);
            }
        }
    }
}

function HealingSelfAndFriendLoop() {
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');

    Orion.Print('hits' + target.Hits() + 'maxhits' + target.MaxHits());

    while (Player.IsHuman) {
        Orion.Wait(500);
        if (target != null) {
            if (target != null && target.Hits() < target.MaxHits()
                && !Orion.BuffExists('healing skill') && target.Distance() < 2) {
                Orion.BandageTarget('myTarget');
                Orion.Wait(500);
            }
        }

        if (Player.Hits() < Player.MaxHits()) {
            Orion.BandageSelf();
            Orion.Wait(500);
        }

        while (Orion.BuffExists('healing skill')) {
            Orion.Wait(100);
        }
    }
}

function TrainMagery() {
    var notified = false;
    while (Player.IsHuman()) {
        if ((Orion.SkillValue('Magery') % 1 == 100) && notified == false) {
            Orion.HttpPost('https://maker.ifttt.com/trigger/Seed/with/key/dL1ugCFG4KbaRG5KPR5lXF/?value1=MAGING' + Orion.SkillValue('Magery'), '');

        }
        else if (notified == true) {
            notified = false;
        }
        if (Player.Mana() < 10) {
            Orion.UseSkill('Meditation');

            while (Player.Mana() < Player.MaxMana()) {
                Orion.Wait(2000);
            }
        }

        if (Orion.SkillValue('Magery') < 600) {
            Orion.Cast('31');
            if (Orion.WaitForTarget(5000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 700) {
            Orion.Cast('Invisibility');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Magery') < 1000) {
            Orion.Cast('Mana Vampire');
            if (Orion.WaitForTarget(3000))
                Orion.TargetObject('self');
            Orion.Wait(2000);
        }
        else {
            Orion.HttpPost('https://maker.ifttt.com/trigger/Seed/with/key/dL1ugCFG4KbaRG5KPR5lXF/?value1=GM MAGING', '');

            Orion.ShutdownWindows('forced');
            Orion.Wait(2000);
        }
    }

}

function TrainChivalryAndBushido() {

    while (Player.IsHuman()) {
        if (Player.Mana() < 10) {
            Orion.UseSkill('Meditation');
            while (Player.Mana() < Player.MaxMana()) {
                Orion.Wait(1000);
            }
        }
        if (Orion.SkillValue('Chivalry') < 600) {
            Orion.Cast('Divine Fury');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 700) {
            Orion.Cast('Enemy Of One');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 900) {
            Orion.Cast('Holy Light');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Chivalry') < 1000) {
            Orion.Cast('Noble Sacrifice');
            Orion.Wait(2000);
        }

        if (Orion.SkillValue('Bushido') < 600) {
            Orion.Cast('Confidence');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Bushido') < 750) {
            Orion.Cast('Counter');
            Orion.Wait(2000);
        }
        else if (Orion.SkillValue('Bushido') < 1000) {
            Orion.Cast('Evasion');
            Orion.Wait(2000);
        }
    }
}

function CutCorpses() {

    do {
        var corpses = Orion.FindType('0x2006', any, ground, 'near', '2');
        if (corpses.length) {
            Orion.Wait(100);
            Orion.Print('skinning')
            Orion.UseObject(Orion.FindType('0x0EC4', any, backpack, 'near', '3').shift());
            Orion.TargetObject(corpses[0]);
            //    Orion.UseObject(corpses[0]);
            Orion.Ignore(corpses[0]);
        }
        Orion.Wait(400);
    } while (true);
}

//////START OF CONFIG///////
var range = 20; //How far to load status from
var delay = 400; //Delay between loop cycle
var notorietyToShow = 3;// 'green|gray|criminal|orange|red'; //Show targets with notoriety
var notorietyToAttack = 3; //Attack targets with notoriety
var pullTargetDistance = 5; //Distance of target to agro
var attack = true; //Enable attacking
var honor = true;
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
                return mob.Notoriety() >= (notorietyToShow);
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
                if (debug) { Orion.Print('pop:' + mobId); }
            }
        });
        lastSearchMobsIds = entireAreaMobs;

        //Group mobs into object by distance
        entireAreaMobs.forEach(function (mob) {
            if (mob != null) {
                mobileByDistance[mob.Distance()].push(mob);
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


                    if (debug && Orion.ClientLastAttack() == mobId) {
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
                            if (debug) {
                                Orion.Print('Attacking:' + mobile.Name() + ':' + attackList.indexOf(mobId) + ' : ' + attackList.length);
                                Orion.Print('push:' + mobId);
                            }
                        }
                    }
                })

        };

    }

    //Attack Closest with lowest health
    if (attack || lastAttacker == null || lastAttacker.Distance() > 1) {
        if (debug) {
            TextWindow.Print('no attacker');
            TextWindow.Print(attackList);
        }
        if (attackList.length > 0) {
            var vicinity = mobileByDistance[0].concat(mobileByDistance[1]);

            if (debug) {
                Orion.Print(vicinity != null && vicinity.length > 0);
            }
            if (vicinity != null && vicinity.length > 0) {

                vicinity = vicinity.sort(function (mobSerialA, mobSerialB) {
                    return mobSerialA.Hits() - mobSerialB.Hits();
                });
                if (debug) { Orion.Print('reattack ' + vicinity[0].Name()); }
                Orion.ClientLastAttack(vicinity[0].Serial());
                Orion.Attack(Orion.ClientLastAttack());
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
        Orion.AddHighlightCharacter(mobile.Serial(), '0xFFFF', true);
        Orion.Print('Honor');
        Orion.InvokeVirtue('Honor');
        if (Orion.WaitForTarget(500)) {
            Orion.TargetObject(mobile.Serial());

        }
    }
}
function AttackMobile(mobile) {
    var mobId = mobile.Serial();
    Orion.AddHighlightCharacter(mobId, '0xF2BF', true);
    HonorTarget(mobile);
    Orion.Attack(mobId);
    attackList.push(mobId)
}