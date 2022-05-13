var seabook = '0x40019854'
var _seakey = 'A ship key'
var seaBox = '0x40055745'
var seaBin = '0x400F63CF'
var goldChestId = '0x40026602'
//var essenceBox = '0x400C5E3B'
//var shipwreckLoot = '0x40005936'
var netLoot = '0x400DEE70'
//var scrollBox = '0x400F48A7'
//var rareBox = '0x4014460B'
var mapMibBox = '0x4006BE64'
var bankGold = true
var bankRune = '0x4011634E'


var _rareBox = 'TMap Rares'
var _craftingBox = 'Crafting Material'
var _essenceBox = 'Crafting Resource'
var _recipeBox = 'Craft Recipes'
var _talismanBox = 'Talismans'
var _regBoxId = 'Scrolls and Reags'
var _bin = 'A Trash Barrel'
var _transcendenceBook = 'Transcendence Book'

function AutoSOSDoerClosest() {
    while (true) {
        for (var sosLevel = 0; sosLevel < 14; sosLevel++) {
            var currentSOSBox = FindGroundItemWithProperties(["SOS " + sosLevel])
            if (currentSOSBox != null) {
                WalkTo(currentSOSBox)
                Orion.OpenContainer(currentSOSBox.Serial())
                if (!Orion.Contains(currentSOSBox.Properties(), "Contents: 0")) {
                    var soses = Orion.FindTypeEx('0x14EE', any, currentSOSBox.Serial())
                    var SosMap = []
                   while(Orion.FindTypeEx('0x14EE', any, currentSOSBox.Serial()).length>0)
                    {
                    soses.forEach(function (sos) {
                        Orion.MoveItem(sos.Serial(), 1, backpack);
                        Orion.Wait(1000)
                    })
                    }
                    Orion.FindTypeEx('0x14EE').forEach(function (sos) {
                        var pos = GetSOSLocation(sos)
                        var zone = GetZone(pos.X(), pos.Y())
                        SosMap.push([sos.Serial(), pos.X(), pos.Y(), zone])
                    })
                    SosMap.sort(function (s1, s2) {
                        return s1[2] + s1[1] - s2[2] + s2[1]
                    })
                    while(Orion.FindTypeEx('0x14EE', any, backpack).length>0)
{
                    SosMap.forEach(function (sos) {
                        Orion.MoveItem(sos[0], 1, currentSOSBox.Serial());
                        Orion.Wait(1000)
                    })
}
                    SosMap.forEach(function (sos) {
                        WalkTo(currentSOSBox)
                        Orion.OpenContainer(currentSOSBox.Serial())
                        Orion.Wait(2000)
						Orion.Print('Doing '+ sos[0])
                        Orion.MoveItem(sos[0], 1, backpack);
                        Orion.Wait(2000)
                        DoSOSInOrder()

                    })
                }
                else {
                    Orion.Print("Box is empty")
                }
            }
        }
        Orion.Wait(30000)
    }
}

function AutoSOSDoer() {
    while (true) {
        for (var sosLevel = 0; sosLevel < 14; sosLevel++) {
            var currentSOSBox = FindGroundItemWithProperties(["SOS " + sosLevel])
            if (currentSOSBox != null) {
                if (!Orion.Contains(currentSOSBox.Properties(), "Contents: 0")) {
                    var soses = Orion.FindTypeEx('0x14EE', any, currentSOSBox.Serial()).slice(0, 9)
                    soses.forEach(function (sos) {
                        Orion.MoveItem(sos, 1, backpack);
                        Orion.Wait(1000)
                    })
                    DoSOSInOrder()
                }
                else {
                    Orion.Print("Box is empty")
                }
            }
        }
        Orion.Wait(30000)
    }
}
function GetSoSFromGroup() {
    Debug(' Method Entry - GetSoSFromGroup')
    Orion.Launch("cmd.exe", ['/c', 'a:/Orion Launcher/OA/Scripts/soslocations.jpg']);
    Orion.Print('Make sure you have all SOS in sos.txt')
    Orion.Print('Enter Groups')
    var group = Orion.InputText()
    var groups = Orion.Split(group, ' ').map(function (x) { return parseInt(x) });

    Orion.Print(groups.indexOf(0))

    Orion.Print('Select Box of SOS')
    var box = SelectTarget()
    WalkTo(box)
    Orion.OpenContainer(box.Serial())
    var soses = sosList

    soses.forEach(function (sos) {

        Orion.Print(groups[0].length)
        Orion.Print(groups.indexOf(parseInt(sos[3])))
        if (groups.indexOf(sos[3]) != -1) {
            Orion.MoveItem(sos[0], 1, backpack);
            Orion.Wait(850)
        }
    })
}

function ReadAllSOSToFile() {
    Debug(' Method Entry - ReadAllSOSToFile')
    var soses = []
    var SOSs = Orion.FindTypeEx('0x14EE', any, backpack)
    SOSs.forEach(function (sos) {

        var pos = GetSOSLocation(sos)
        var zone = GetZone(pos.X(), pos.Y())
        soses.push([sos.Serial(), pos.X(), pos.Y(), zone])
    })
    soses = soses.sort(function (z1, z2) { return z1[2] - z2[2] })

    soses = soses.sort(function (z1, z2) { return z1[3] - z2[3] })

    var newFile = Orion.NewFile();
    newFile.Remove('OA\\Scripts\\helpers\\SOSList.js');
    Orion.Wait(200)
    newFile.Open('OA\\Scripts\\helpers\\SOSList.js');
    newFile.Write('');
    newFile.WriteLine('var sosList = ' + JSON.stringify(soses))
    TextWindow.Print('var sosList = ' + JSON.stringify(soses))
    newFile.Close();
}

function GoToSOS() {
    Debug(' Method Entry - GoToSOS')
    var sos = SelectTarget()
    var pos = GetSOSLocation(sos)
    Orion.Wait(1000)
    SteerTo(pos.X(), pos.Y())
}

var sosOrder = []
function GoToClosestSOS(distance) {
    Debug(' Method Entry - GoToClosestSOS')
    if (sosOrder.length == 0) {
        Orion.Resend()
        var SOSs = Orion.FindTypeEx('0x14EE', any, backpack)
        SOSs.forEach(function (sos) {

            var pos = GetSOSLocation(sos)
            sosOrder.push([sos.Serial(), pos.X(), pos.Y()])
        })
    }
    sosOrder = sosOrder.sort(function (z1, z2) {

        return Orion.GetDistance(z1[1], z1[2]) - Orion.GetDistance(z2[1], z2[2])
    }
    )
    var sosId = sosOrder.shift()[0];
    var sosObj = Orion.FindObject(sosId)
    if (sosObj == null)
        return null
    var pos = GetSOSLocation(sosObj)
    if (pos === null) {
        return null
    }
    Orion.Wait(1000)
    SteerTo(pos.X(), pos.Y(), distance)
    return sosId
}

///#include soslocations.jpg
function DoSOSInOrder() {
    Debug(' Method Entry - DoSOSInOrder')
    var seakey = FindBackpackItemWithProperties([_seakey]).Serial()

    RecallRune(seakey);
    Orion.Wait(1000)

    //IF chest is on boat floor, pick it up and go again

    Orion.Print("ALL SOS must be parsed into \OA\Scripts\helpers\SOSList.js, using ReadAllSOSToFile")
    while (Orion.FindTypeEx('0x14EE', any, backpack).length != 0) {
        var sosId = GoToClosestSOS(45)
        if (sosId === null) {
            continue;
        }
        Orion.Wait(1000)
        Orion.Step(7)
        var startWeight = Player.Weight()
        while (Orion.ObjectExists(sosId) && Player.Weight() < (startWeight + 150) && !HasChest()) {
            //Check For Corpses
            SailToCorpse(true)

            //Should I heal here?
            //HealSelf()
            //Open MIBs and add them to the list here?
            //ProcessMib()
            //Fish
            Orion.UseObject('0x40026413');
            if (Orion.WaitForTarget(1000)) {
                Orion.TargetTileRelative('any', -3, -3, 65533);
            }
            Orion.Wait(10000)
        }
        BankAndHome()

    }
}

function BankAndHome() {
    Orion.Wait(1000)
    if (bankGold && Player.Gold() > 0) {
        RecallRune(bankRune);
        Orion.Wait(1000)
        Orion.Say("bank")
        Orion.Wait(500)
        MoveItemsFromPlayer(Player.BankSerial(), '0x0EED')
        Orion.Wait(1000)
    }
    RecallRune(seabook);
    ChestLootManager()
    RecallRune(seakey);
    Orion.Wait(1000)
}

function HasChest() {
    Debug(' Method Entry - HasChest')
    var result = Orion.FindTypeEx(any, any, backpack)
        .filter(function (item) {

            return item.Name() == "Chest"
        }
        )
    return (result.length != 0)
}

function ChestLootManager() {
    Debug(' Method Entry - ChestLootManager')
    //Walk to goldchest
    Orion.WalkTo(Player.X() + 3, Player.Y() - 3)
    Orion.Wait(1000)
    //Orion.Print("Move Gold")
    // WalkTo(goldChestId)
    Orion.Print("Engraved: Sea Loot")
    WalkTo(FindGroundItemWithProperties(["Engraved: Sea Loot"]).Serial())

    Orion.Wait(1000);
    Orion.Print("Engraved: Fabled Nets")
    MoveItemText("Fabled Fishing Net", FindGroundItemWithProperties(["Engraved: Fabled Nets"]).Serial())

    Orion.Print("Engraved: Special Nets")
    MoveItemText("Fishing Net", FindGroundItemWithProperties(["Engraved: Special Nets"]).Serial())

    Orion.Print("SOSInBag")
    MoveAllSOSInBagToChests();

    Orion.Print("MoveStash")
    MoveStashMapsInBagToChests();

    Orion.Print("Engraved: Sea Loot")
    Orion.FindListEx('Fishies').forEach(function (fish) {
        MoveItemsFromPlayer(FindGroundItemWithProperties(["Engraved: Sea Loot"]).Serial(), fish.Graphic(), any);
    })

    Orion.Print("Engraved: Sea Loot")
    MoveItemText("Waterstained SOS|Ancient SOS|Message In|Treasure Map", FindGroundItemWithProperties(["Engraved: Sea Loot"]).Serial())
    Orion.Wait(1000);
    var seaBin = FindGroundItemWithName("A Trash Barrel").Serial()


    //MoveItemsFromPlayer(goldChestId, '0x0EED')
    Orion.Print(_essenceBox)
    MoveItemText("Essence|Crafting Resource", FindGroundItemWithProperties([_essenceBox]).Serial())
    Orion.Print(_rareBox)

    MoveItemText("Backpack|Wedding|Oars|Copper Portrait|Ocean|Salted|Live Rock|Aquarium|Polkadot|Sunflower|Wedding|Kelp|Driftwood|Valkyrie|Grape|Large Fish|Anchor|Ship In", FindGroundItemWithProperties([_rareBox]).Serial(), true)
    Orion.Print("scrolls")

    MoveScrolls(FindGroundItemWithProperties([_regBoxId]).Serial())

    Orion.Print(_regBoxId)
    MoveItemText("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", FindGroundItemWithProperties([_regBoxId]).Serial())
    var chests = Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Name(), "Chest") })

    chests.forEach(function (chest) {

        Orion.UseObject(chest.Serial())
        Orion.Wait(1000)
    })
    if (Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Properties(), "The Shipwreck") }).length > 0) {

        BotPush('ancient!!')
        Orion.Print('ancient!!')
        //  Orion.PauseScript()
        MoveItemText("The Shipwreck", FindGroundItemWithProperties([_rareBox]).Serial())

    }
    WalkTo(FindGroundItemWithProperties([_bin]).Serial())
    MoveItemText("Shipwreck", FindGroundItemWithProperties([_bin]).Serial())

    //Orion.ActivateClient();
    //   BotPush('Paused')
    if (Player.WarMode())
        Orion.PauseScript()
}

function Resume() {
    Debug(' Method Entry - Resume')
    Orion.ResumeScript('all');
}
//#include helpers/Notifier.js
//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js
//#include Actions/Automated/DriveBoat.js
//#include helpers/Map.js
//#include helpers/SOS.js
//#include helpers/PathFinding.js
//#include WIP/TestScripts.js
//#include helpers/SOSList.js