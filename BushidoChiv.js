//#include Scripts/Fighting/AutoTargetting.js
//#include Scripts/Fighting/Bushido.js
//#include Scripts/Fighting/Corpses.js
//#include Scripts/Fighting/Healing.js

function AutoTargetter() {
    var range = 15; //How far to load statusbars from
    var autoAttack = true; //Attack nearest targets automatically
    var honorTargets = true; //HonorTargets
    var delay = 200; //Delay between loop cycle
    var notorietyToShow = 3;// 'green|gray|criminal|orange|red'; //Show targets with notoriety
    var notorietyToAttack = 3; //Attack targets with notoriety
    var pullTargetDistance = 6; //Distance of target to agro
    var attackEverythingAtOnce = false; //Initiate an attack on every target within range at once otherwise 1 target at a time

    ShowEnemiesByDistance(range,
        autoAttack,
        honorTargets,
        delay,
        notorietyToShow,
        notorietyToAttack,
        pullTargetDistance,
        attackEverythingAtOnce);
}

function HealSelf(){
    BandageSelf();
}

function BandageNearbyFriend(){
    BandageSelfAndFriendLoop();
}