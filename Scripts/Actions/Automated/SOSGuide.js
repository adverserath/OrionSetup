var seabook = '0x40019854'
var _seakey = 'A ship key'
var seaBox = '0x40055745'
var seaBin = '0x400F63CF'
var goldChestId = '0x40026602'
var netLoot = '0x400DEE70'
var mapMibBox = '0x4006BE64'
var bankGold = true
var bankRune = '0x4008436F'


var _rareBox = 'TMap Rares'
var _craftingBox = 'Crafting Material'
var _essenceBox = 'Crafting Resource'
var _recipeBox = 'Craft Recipes'
var _talismanBox = 'Talismans'
var _regBoxId = 'Scrolls and Reags'
var _bin = 'A Trash Barrel'
var _transcendenceBook = 'Transcendence Book'


//OPTIONS
var processNets = false
var storeNets = false

//orc lighthouse X1954 Y3747
function ProcessMibsInBox() {
    var container = SelectTarget('box of mibs')
    Orion.OpenContainer(container.Serial())
    while (Orion.Count('0xA30C|0x14EE', any, container.Serial()) > 0) {
        for (i = 0; i < 15; i++) {
            Orion.MoveItemType('0xA30C|0x14EE', any, container.Serial(), 0, backpack)
            Orion.Wait(800)
        }
        ProcessMibsInBackpack()
        WalkTo(container)

    }
}
function ProcessMibsInBackpack() {
    Orion.FindTypeEx('0xA30C').forEach(function (mib) {
        Orion.UseObject(mib.Serial())
        Orion.Wait(800)
    })
    SortSOSToBoxes()
}

function SortSOSToBoxes() {
    ProcessAllSosInBackpack(-1, [])
}

function AutoSOSDoerClosest() {
    var startNumber = parseInt(Orion.InputText(60000, 'Start at which number'))
    Orion.Print(58, '1 = Normal (default)')
    Orion.Print(62, '2 = Ancient')
    Orion.Print(66, '3 = Both')

    var sosTypes = parseInt(Orion.InputText(60000, 'Which Type?'))
    var sosColor = '0x0000'
    if (sosTypes == 1)
        sosColor = '0x0000'
    if (sosTypes == 2)
        sosColor = '0x0481'
    if (sosTypes == 3)
        sosColor = 'any'

    var seakey = FindBackpackItemWithProperties([_seakey]).Serial()//"Ship Recall Rune"
    RecallRune(seakey);
    Orion.Wait(2000)
    Orion.RegWrite('boatX', Player.X());
    Orion.RegWrite('boatY', Player.Y());
    RecallRune(seabook);
    Orion.Wait(2000)
    Orion.Print(Orion.RegRead('boatX') + ' ' + Orion.RegRead('boatY'))
    Orion.WalkTo(Player.X() + 3, Player.Y() - 3)
    var sosLevel = SoSLevel()
    sosLevel.Set(startNumber)

    while (true) {
      
            Orion.Print('Checking Zone: ' + sosLevel)

            var currentSOSBox = FindGroundItemWithProperties(["SOS " + sosLevel + '\n'])
            
            while  (currentSOSBox == null) {
                TextWindow.Print('Cant see box, trying again')
                RecallRune(seabook);
                Orion.Wait(3000)
                currentSOSBox = FindGroundItemWithProperties(["SOS " + sosLevel + '\n'])
                Orion.Wait(3000)
            }
            TextWindow.Print("Box Found: " + currentSOSBox.Properties())
            if (currentSOSBox != null) {
                TextWindow.Print('Walking to box')
                WalkTo(currentSOSBox)
                Orion.Wait(500)
                Orion.OpenContainer(currentSOSBox.Serial())
                var leftInBox = Orion.Count('0x14EE', sosColor, currentSOSBox.Serial())
                TextWindow.Print('SOS in box: ' + leftInBox)
                if (leftInBox != 0) {
                    var SosMap = []

                    while (Orion.MoveItemType('0x14EE', sosColor, currentSOSBox.Serial())) {
                        Orion.Wait(850)
                    }
                    ProcessAllSosInBackpack(sosLevel, SosMap)

                    while (Orion.MoveItemType('0x14EE', any, backpack, 0, currentSOSBox.Serial())) {
                        Orion.Wait(850)
                    }

                    while (leftInBox != 0 && SosMap.length != 0) {
                        Orion.Print(58, currentSOSBox.Properties())
                        Orion.Print(59, 'Left In Box: ' + leftInBox)
                        Orion.Print(59, 'SOS Map Count: ' + SosMap.length)

                        var bx = Orion.RegRead('boatX');
                        var by = Orion.RegRead('boatY');
                        SosMap.sort(function (s1, s2) {
                            return DistanceTo(s1[1], s1[2], bx, by) - DistanceTo(s2[1], s2[2], bx, by)
                        })
                        SosMap.forEach(function (s) {
                            Orion.Print('distance to ' + s[0] + ' ' + parseInt(DistanceTo(s[1], s[2], bx, by)))
                        })
                        var sos = SosMap.shift()
                        WalkTo(currentSOSBox)
                        Orion.OpenContainer(currentSOSBox.Serial())
                        Orion.Wait(2000)
                        Orion.Print('Doing ' + sos[0])

                        while (Orion.FindTypeEx('0x14EE', any, backpack).length == 0) {
                            Orion.MoveItem(sos[0], 1, backpack);
                            Orion.Wait(2000)
                        }
                        
                        while (Orion.FindTypeEx('0x14EE', any, backpack).length > 0) {
                            DoMethodWhileWaiting('DoSOSInOrder')
                            Orion.Wait(4000)
                        }

                        while (!Orion.ObjectExists(currentSOSBox.Serial())) {
                            TextWindow.Print('Cant see box - recalling')
                            RecallRune(seabook);
                            Orion.Wait(2000)
                        }
                        WalkTo(currentSOSBox)
                        Orion.OpenContainer(currentSOSBox.Serial())
                        Orion.Wait(1000)
                        leftInBox = Orion.Count('0x14EE', sosColor, currentSOSBox.Serial())
                        TextWindow.Print('Left in Box: ' + leftInBox)
                        if(leftInBox == 0 || SosMap.length == 0)
                        {
                        TextWindow.Print('left in box '+leftInBox + ' and sosmap len' + SosMap.length)
                        //Orion.PauseScript()
                        }
                    }
                }
                else {
                    Orion.Print("Box is empty")
                }
            }
            BotPush('Going to next box')
            sosLevel.Increase()
        //}
        Orion.Print(58, 'Complete Loop: Starting again')
        Orion.Wait(10000)
    }
}

function SoSLevel(value) {
    Orion.RegWrite('SoSLevel', value)
    return {
      Set: function (value) {
        Orion.RegWrite('SoSLevel', value)
        return this.level = value
      },
      Increase: function () {
        var newValue = (parseInt(Orion.RegRead('SoSLevel')))+1
        if(newValue>13)
            newValue=0
        this.Set(newValue)
      },
      toString: function () {
        var value = Orion.RegRead('SoSLevel')
        return parseInt(value)
      },
    }
  }

function DistanceTo(tx, ty, bx, by) {
    var dx = Math.abs(tx - bx);
    var dy = Math.abs(ty - by);
    var min = Math.min(dx, dy);
    var max = Math.max(dx, dy);

    var diagonalSteps = min;
    var straightSteps = max - min;
    var ret = Math.sqrt(2) * diagonalSteps + straightSteps
    return ret;
}

function ProcessAllSosInBackpack(sosLevel, SosMap) {
    Orion.Print('sosLevel: ' + sosLevel)
    Orion.Print('SosMap: ' + SosMap)

    Orion.FindTypeEx('0x14EE').forEach(function (sos) {
        Orion.Wait(1000)
        var pos
        while (pos == null) {
            pos = GetSOSLocation(sos)
        }
        var zone = GetZone(pos.X(), pos.Y())
        Orion.Print('Zone: ' + zone)
        Orion.Print('CHECK' + zone + ' ' + sosLevel + '  ' + (sosLevel == zone))
        if (zone == sosLevel)
            SosMap.push([sos.Serial(), pos.X(), pos.Y(), zone])
        else {
            Orion.Wait(850)
            MoveSoSToChest(sos.Serial(), zone)
        }
    })
    SosMap.sort(function (s1, s2) {
        return parseInt(s1[1] / 20) - parseInt(s2[1] / 20)
    })
    SosMap.sort(function (s1, s2) {
        return parseInt(s1[2] / 40) - parseInt(s2[2] / 40)
    })
    SosMap.forEach(function (sos) {
        TextWindow.Print(sos[1] + '  ' + sos[2])
    })
}

function AutoSOSDoer() {
    while (true) {
        for (var sosLevel = 0; sosLevel < 14; sosLevel++) {
            var currentSOSBox = FindGroundItemWithProperties(["SOS " + sosLevel + '\n'])
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
    OpenMap()
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

function OpenMap() {
    Orion.Launch("cmd.exe", ['/c', 'a:/Orion Launcher/OA/Scripts/soslocations.jpg']);
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
    SteerTo(pos.X(), pos.Y(), 45)
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
    var sosX = pos.X()
    
    if(sosX<40)
    {
        sosX = 40
        distance = 10
    }

    var sosY = pos.Y()
    
    if(sosY<40)
    {
        sosY = 40
        distance = 10
    }
    if(sosY>4070)
    {
        sosY = 4070
        distance = 10
    }
    SteerTo(sosX, sosY, distance)
    return sosId
}

///#include soslocations.jpg
function DoSOSInOrder() {
    Debug(' Method Entry - DoSOSInOrder')
    PetGuard()
    var seakey = FindBackpackItemWithProperties([_seakey]).Serial()//"Ship Recall Rune"
    var boatStorage = FindGroundItemWithName(['Cargo Hold'])
    Orion.Print('Key ' + seakey)
    if(boatStorage==null)
    {
    	RecallRune(seakey);
    	Orion.Wait(1000)
    }
    boatStorage = FindGroundItemWithName(['Cargo Hold'])
   // if (boatStorage != null) {
        //WalkTo(boatStorage)
   // }
    //IF chest is on boat floor, pick it up and go again

    Orion.Print("ALL SOS must be parsed into \OA\Scripts\helpers\SOSList.js, using ReadAllSOSToFile")
    while (Orion.FindTypeEx('0x14EE', any, backpack).length != 0) {
        var sosId = GoToClosestSOS(30)
        if (sosId === null) {
            continue;
        }
        Orion.Wait(1000)
        // Orion.Step(7)
        var startWeight = Player.Weight()
        while (Orion.ObjectExists(sosId) && Player.Weight() < (startWeight + 150) && !HasChest()) {
            //Check For Corpses
            KillMonstersAndLoot()

            //Should I heal here?
            //HealSelf()
            //Open MIBs and add them to the list here?
            //ProcessMib()
            //Fish
            FishAtFeet()
            Orion.Wait(10000)
        }
        Orion.Wait(2000)
        KillMonstersAndLoot()
        ChestRecoveryService()
    }
}

function FishAtFeet() {
    if (Orion.HaveTarget()) {
        Orion.CancelTarget();
        Orion.Wait(300)
    }
    //Orion.WalkTo(Player.X()-1,Player.Y(),Player.Z(),0);
    Orion.UseObject('0x4008475A')
    if (Orion.WaitForTarget(1000)) {
        Orion.TargetTileRelative('water', 0, 0, -5)
        Orion.Wait(300)
    }
}

function ChestRecoveryService() {
    Orion.RegWrite('boatX', Player.X());
    Orion.RegWrite('boatY', Player.Y());

    Orion.Print('METHOD--Chest recovery service')
    var seakey = FindBackpackItemWithProperties([_seakey, "Ship Recall Rune"]).Serial()

    var droppedChest = FindGroundItemWithName(["Chest|Strongbox"])
	
	if(Player.MaxWeight()<Player.Weight())
	{
	Orion.Print(58, "Backpack too heavy")
	Orion.ActivateClient()
	Orion.PauseScript()
	}
	
    if (droppedChest != null) {
        Orion.OpenContainer(droppedChest.Serial())
        Orion.Boxhack(droppedChest.Serial())
        Orion.Wait(1000)
        var goldInChest = Orion.FindTypeEx('0x0EED', any, droppedChest.Serial())
        var availableGoldWeight = (Player.MaxWeight() - Player.Weight()) * 120
        Orion.Print('Can carry gold: ' + availableGoldWeight)
        if (goldInChest.length > 0 && Player.Weight() < (Player.MaxWeight() - 67)) {
            Orion.Print('Move Gold to backpack')
            Orion.MoveItem(goldInChest[0].Serial(), availableGoldWeight, backpack)
        }
        BankAndHome()
        Orion.Wait(1000)
        RecallRune(seakey);
        Orion.Wait(1000)
        var boatStorage = FindGroundItemWithName(['Cargo Hold'])
        if (boatStorage != null) {
            WalkTo(boatStorage)
            WalkTo(droppedChest)
            Orion.MoveItem(droppedChest.Serial(), 0, backpack)
            Orion.Wait(1000)
        }
    }
    OpenChestsInBackpack()
    BankAndHome()
}

function DoNets() {
    var box = SelectTarget('storage')
    while (true) {
        WalkTo(box.Serial())
        Orion.OpenContainer(box.Serial(), 1000)
        Orion.Wait(1000)
        Orion.MoveItemType('0x0DCA', any, box.Serial())
        Orion.Wait(1000)
        Orion.MoveItemType('0x0DCA', any, box.Serial())
        ProcessNets()
        RecallRune(seabook);
        Orion.Wait(1000)
        MoveAllSOSInBagToChests(true);
        MoveMapsInBagToChests()
        // while (Orion.MoveItemType('0x0DCA', any, box.Serial(), 5) && Player.Weight() < (Player.MaxWeight() - 60)) {
        //     Orion.Wait(850)
        // }
    }
}

function BankAndHome() {
    Debug(' Method Entry - BankAndHome')

    Orion.Wait(1000)
    if (bankGold && Player.Gold() > 0) {
        RecallRune(bankRune)
        CountGlobalValue('goldCollected', Player.Gold(), 'Gold Collected')
        CountGlobalValue('mibsComplete', 1, 'Mibs Completed')
        Orion.Wait(1000)
        Orion.Say("bank")
        Orion.Wait(500)

        MoveAllGoldToBank()
    }
    var doNets = processNets && (FindBackpackItemWithName('A Special Fishing Net') != null)

    if (doNets) {
        Orion.Print('Go Throw Nets')
        GoThrowTheNets();
    }

    RecallRune(seabook);
    ChestLootManager()
    Orion.Wait(1000)
    if (doNets) {
        ProcessNets()
        RecallRune(seabook);
    }
    if (Orion.Count('0xA30C') > 0)
        ChestLootManager()
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


function OpenChestsInBackpack() {
    var chests = Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Name(), "Chest") })

    chests.forEach(function (chest) {
        Orion.UseObject(chest.Serial())
        Orion.Wait(1000)
        Orion.Boxhack(chest.Serial());
        Orion.Wait(1000)
    })
    return chests
}
function ChestLootManager() {
    Debug(' Method Entry - ChestLootManager')
    //Walk to goldchest
    Orion.WalkTo(Player.X() + 3, Player.Y() - 3)
    chests = OpenChestsInBackpack()
    Orion.Wait(1000)
    //Orion.Print("Move Gold")
    // WalkTo(goldChestId)

    Orion.Print("SOSInBag")
    MoveAllSOSInBagToChests(chests.length != 0);

    Orion.Print("MoveStash")
    MoveMapsInBagToChests();


    Orion.Print("Engraved: Sea Loot")
    WalkTo(FindGroundItemWithProperties(["Engraved: Sea Loot"]).Serial())

    Orion.Wait(1000);
    Orion.Print("Engraved: Fabled Nets")
    MoveItemText("Fabled Fishing Net", FindGroundItemWithProperties(["Engraved: Fabled Nets"]).Serial())

    Orion.Print("Engraved: Special Nets")
    if(storeNets && !processNets)
    {
    	MoveItemText("Fishing Net", FindGroundItemWithProperties(["Engraved: Special Nets"]).Serial())
  	    MoveItemText("Fishing Net", backpack)

    }

    Orion.Print("Engraved: Sea Loot")
    Orion.FindListEx('Fishies').forEach(function (fish) {
        if (Orion.Contains(fish.Name(), "Special Fishing Net"))
            return
        MoveItemsFromPlayer(FindGroundItemWithProperties(["Engraved: Sea Loot"]).Serial(), fish.Graphic(), any);
    })

    MoveItemText("Ancient SOS", FindGroundItemWithProperties(["Engraved: Ancient SOS"]).Serial())

    Orion.Wait(1000);
    var seaBin = FindGroundItemWithName("A Trash Barrel").Serial()

    //MoveItemsFromPlayer(goldChestId, '0x0EED')
    Orion.Print(_rareBox)

    MoveItemText("Abysmal|Enchanted|Driftwood|Backpack|Wedding|Oars|Copper Portrait|Ocean|Salted|Live Rock|Aquarium|Polkadot|Sunflower|Wedding|Woven|Kelp|Driftwood|Valkyrie|Grape|Large Fish|Anchor|Ship In", FindGroundItemWithProperties([_rareBox]).Serial(), true)
    Orion.Print("scrolls")

    MoveScrolls(FindGroundItemWithProperties([_regBoxId]).Serial())

    Orion.Print(_regBoxId)
    MoveItemText("Blood moss|Black Pearl|Garlic|Ginseng|Mandrake Root|Nightshade|Spiders' Silk|Sulfurous Ash|Grave Dust|Nox Crystal|Daemon Blood|Batwing|Pig Iron", FindGroundItemWithProperties([_regBoxId]).Serial())

    if (Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Properties(), "The Shipwreck") }).length > 0) {

        BotPush('ancient!!')
        Orion.Print('ancient!!')
        //  Orion.PauseScript()
        MoveItemText("The Shipwreck", FindGroundItemWithProperties([_rareBox]).Serial())

    }

    WalkTo(FindGroundItemWithProperties(["Engraved: Legendary"]).Serial())
    MoveItemText("Legendary Artifact", FindGroundItemWithProperties(["Engraved: Legendary"]).Serial())
    MoveItemText("Major Artifact", FindGroundItemWithProperties(["Engraved: Major"]).Serial())
    MoveItemText("Greater Artifact", FindGroundItemWithProperties(["Engraved: Greater"]).Serial())

    chests.forEach(function (chest) {
        ImbueChest(chest.Serial())
    })
    Orion.Wait(1000)
    Orion.Print(_essenceBox)
    MoveItemText("Residue|Essence|Crafting Resource|Abyssal Cloth", FindGroundItemWithProperties([_essenceBox]).Serial())

    MoveItemText("Ingots", FindGroundItemWithProperties([_craftingBox]).Serial())

    WalkTo(FindGroundItemWithProperties([_bin]).Serial())
    MoveItemText("Shipwreck", FindGroundItemWithProperties([_bin]).Serial())

}

function ImbueChest(chestSerial) {
    var soulForges = Orion.FindTypeEx('0x4263', any, ground, '', 15)
    if (soulForges != null) {
        var soulForge = soulForges.shift()
        Orion.Print(soulForge.Serial())
        WalkTo(soulForge)
        for (var i = 0; i < 2; i++) {
            Orion.UseSkill('Imbuing')

            if (Orion.WaitForGump(2000)) {
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x65290B89')) {
                    gump0.Select(Orion.CreateGumpHook(10011));
                }
            }
            if (Orion.WaitForTarget(2000))
                Orion.TargetObject(chestSerial);
            if (Orion.WaitForGump(2000)) {
                var gump1 = Orion.GetGump('last');
                if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xB73E81BB')) {
                    gump1.Select(Orion.CreateGumpHook(1));
                }
                Orion.Wait(1000)
                gump1.Close();
            }
            Orion.Wait(2000)
        }
    }
}

function GoThrowTheNets() {
    Debug(' Method Entry - GoThrowTheNets')
    if (Orion.Count('0x0DCA') > 0) {
        RecallRune(FindBackpackItemWithProperties(["Magincia Dock"]).Serial())
        Orion.Wait(1500)
        //Orion.UseObject(FindBackpackItemWithProperties(["Fishing Net"]).Serial())
        ThrowTheNets()
    }
}
function ProcessNets() {
    Debug(' Method Entry - ProcessNets')

    RecallRune(FindBackpackItemWithProperties(["Magincia Dock"]).Serial())
    Orion.Wait(2000)
    IgnoreAllKrakenDead()
    KillAndLootOnly()


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
//#include helpers/PathFinding2.js
//#include helpers/Generic.js
//#include helpers/SOSList.js
//#include helpers/Pet.js
//#include Fighting/Tamer.js
//#include helpers/Looter.js