//#include Scripts/Actions/Automated/ShortCuts.js
//#include Scripts/Actions/Automated/Pickup.js
//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

function DoorOpened() {
    lastdoors = Orion.FindType('0x06CD', any, ground).length
    while (true) {
        Orion.Wait(500)
        var doors = Orion.FindType('0x06CD', any, ground).length
        if (doors != lastdoors) {
            if (doors < lastdoors) {
                BotPush('DoorOpened :' + Orion.Time())
                lastdoors = doors
            }
        }
    }

}

function WalkToCursor() {

}