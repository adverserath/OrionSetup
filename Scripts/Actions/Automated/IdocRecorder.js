//#include helpers/Target.js
//#include helpers/Notifier.js
//#include helpers/Beetle.js
//#include helpers/ItemManager.js
//#include Actions/Automated/IDOC.js

function CastID()
{
Orion.Cast(65)
}
function GetMap() {
    return Orion.ObjAtLayer(21, Player.Serial()).Map()
}
var greatly = false
function GreatlyWalker() {
    greatly = true
    HouseWalker()
}
function HouseWalker() {
if(Orion.ScriptRunning<=0)
	Orion.ToggleScript('IDOCScanner')
	
    Orion.ClientOptionSet('BlockWalkingOnMultiStairsInWarMode', true)
    Orion.WarMode(true)
    ReadHouseFile()
    var walkroute = houseList
        .filter(function (house) {
            if (greatly) {
                return house.Map() == GetMap()
                    && house.HouseStatus()[house.HouseStatus().length - 1].Condition() == 'This Structure Is Greatly Worn'
            }
            return house.Map() == GetMap()
        })
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        })
    while (walkroute.length > 0) {
    walkroute = walkroute.filter(function (house){
    var diff = Math.abs(house.HouseStatus()[house.HouseStatus().length - 1].Date() - new Date());
    var minutes = Math.floor((diff/1000)/60);
    if(minutes<10)
    {
    Orion.Print("Already Checked "+house.Serial())
    }
    return minutes>10
    })
        var house = walkroute[0]
        if (Orion.GetPathArrayEx(Player.X(), Player.Y(), Player.Z(), house.X(), house.Y(), Player.Z(), 8, 255, 0, 0).length == 0) {
            TextWindow.Print('Cant reach - ' + house.Serial() +' map:'+ house.Map() + ' X:' +house.X() +' Y:' + house.Y())
            walkroute = walkroute.slice(1)
        }
        else if (WalkTo(house, 12)) {
            Orion.Wait(200)
            walkroute = walkroute.slice(1).sort(function (t1, t2) {
                return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
            })
        }
    }
}

function GreatlyGump() {
    ReadHouseFile()
    var greatlyList = houseList
        .filter(function (house) {
            return house.Map() == GetMap()
                && house.HouseStatus()[house.HouseStatus().length - 1].Condition() == 'This Structure Is Greatly Worn'
        })
        .sort(function (t1, t2) {
            return Orion.GetDistance(t1.X(), t1.Y()) - Orion.GetDistance(t2.X(), t2.Y())
        })


    var gumpId = 67
    var gump = Orion.CreateCustomGump(gumpId);
    gump.Clear()
    gump.SetCallback('HostCallback');
    gump.AddHtmlGump(1, 0, 0, 300, 500, '0x0BB8');
    gump.Select('htmlgump', 1);
    var yPos = 10
    greatlyList.forEach(function (greatly) {
        gump.AddText(10, yPos += 20, '0', greatly.Name() + '  ' + Orion.GetDistance(greatly.X(), greatly.Y()));

    })

    gump.Select('gump');
    while (true) {
        Orion.Wait(1000)
        gump.Update();
    }
}

var houseList = []
function RecordHouses() {
    Orion.IgnoreReset()
    ReadHouseFile()
    var updated = false
    var lastUpdated = Orion.Now()
    while (true) {
        Orion.Wait(500)
        Orion.FindTypeEx(any, any, ground, 'item', 60).filter(function (item) {
            return item.Name() === 'A House Sign'
        }).forEach(function (houseSign) {
            CheckHouse(houseSign)
            Orion.Ignore(houseSign.Serial())
            updated = true
        })
        //Delete Missing Houses          
        var deleteList = houseList
            .filter(function (house) { return house.Map() == GetMap() })
            .filter(function (house) { return house.X() > Player.X() - 18 && house.X() < Player.X() + 18 })
            .filter(function (house) { return house.Y() > Player.Y() - 18 && house.Y() < Player.Y() + 18 })
            .map(function (house) {
                //Orion.Resend()
                //Orion.Wait(000)
                if (Orion.FindObject(house.Serial()) == null) {
                    Orion.Print('Deleted House ' + house.Serial())
                    return house.Serial()
                }
            })
        if (deleteList.length > 0) {
            deleteList.forEach(function (house) { Orion.Print(house) })
            houseList = houseList.filter(function (house) { return deleteList.indexOf(house.Serial()) == -1 })
            updated = true

        }
        if (updated && lastUpdated < Orion.Now() - 5000) {
            Orion.Print('Updated File')
            lastUpdated = Orion.Now()
            WriteHouseFile()
            updated = false
        }
    }
}

function CheckHouse(sign) {
    var existing = houseList.filter(function (house) { return house.Serial() == sign.Serial() })
    if (existing.length > 0) {
        Orion.Print('Existing ' + sign.Serial())
        var house = existing[0]
        var newStatus = HouseStatus(sign)
        var lastStatus = house.HouseStatus()[house.HouseStatus().length - 1]
        if (newStatus.Condition() != lastStatus.Condition()) {
            TextWindow.Print(sign.Serial() + ' House Changed Status')
            TextWindow.Print('OLD ' + lastStatus.Condition())
            TextWindow.Print('NEW ' + newStatus.Condition())
            TextWindow.Print('\n')
            house.AddHouseStatus(newStatus)
            var lastSeen = dhm(newStatus.Date() - lastStatus.Date())
            Orion.Print('Last seen ' + lastSeen)
            Orion.Wait(4000)
        }
        else {
            if (house.HouseStatus().length > 1) {
                TextWindow.Print('Checking previous 2')
                lastStatus = house.HouseStatus()[house.HouseStatus().length - 2]
                if (newStatus.Condition() == lastStatus.Condition()) {
                    TextWindow.Print('update last status')
                    house.HouseStatus()[house.HouseStatus().length - 1] = newStatus
                }
            }
            else {
                house.AddHouseStatus(newStatus)
            }
        }
        return existing[0]
    }
    else {
        Orion.Print('New')
        var house = HouseVisit(sign)
        houseList.push(house)
        return house
    }
}

function HouseVisit(sign, jsonObject) {
    if (sign != null)
        return {
            serial: sign.Serial(),
            map: sign.Map(),
            x: sign.X(),
            y: sign.Y(),
            locName: sign.Properties().match(/Name..(.+)\n/im)[1],
            houseStatus: [HouseStatus(sign)],
            X: function () {
                return this.x;
            },
            Y: function () {
                return this.y;
            },
            Name: function () {
                return this.locName;
            },
            Serial: function () {
                return this.serial;
            },
            Map: function () {
                return this.map;
            },
            HouseStatus: function () {
                return this.houseStatus;
            },
            AddHouseStatus: function (newStatus) {
                this.houseStatus.push(newStatus);
            },
            DistanceTo: function (tx, ty) {
                var dx = Math.abs(tx - this.X());
                var dy = Math.abs(ty - this.Y());
                var min = Math.min(dx, dy);
                var max = Math.max(dx, dy);

                var diagonalSteps = min;
                var straightSteps = max - min;
                var ret = Math.sqrt(2) * diagonalSteps + straightSteps
                return ret;
            },
        }
    else
        return {
            serial: jsonObject.serial,
            map: jsonObject.map,
            x: jsonObject.x,
            y: jsonObject.y,
            locName: jsonObject.locName,
            houseStatus: HouseStatus(null, jsonObject.houseStatus),
            X: function () {
                return this.x;
            },
            Y: function () {
                return this.y;
            },
            Name: function () {
                return this.locName;
            },
            Serial: function () {
                return this.serial;
            },
            Map: function () {
                return this.map;
            },
            HouseStatus: function () {
                return this.houseStatus;
            },
            WriteHouseStatus: function (value) {
                this.houseStatus = value;
            },
            AddHouseStatus: function (newStatus) {
                this.houseStatus.push(newStatus);
            },
            DistanceTo: function (tx, ty) {
                var dx = Math.abs(tx - this.X());
                var dy = Math.abs(ty - this.Y());
                var min = Math.min(dx, dy);
                var max = Math.max(dx, dy);

                var diagonalSteps = min;
                var straightSteps = max - min;
                var ret = Math.sqrt(2) * diagonalSteps + straightSteps
                return ret;
            },
        }
}

function HouseStatus(sign, jsonObject) {
    if (sign != null) {
        var nowEpoch = new Date().getTime()
        return {
            epoch: nowEpoch,
            date: new Date(nowEpoch),
            condition: sign.Properties().match(/\nCondition..([\w\s]+)/im)[1],
            Date: function () {
                return this.date;
            },
            Condition: function () {
                return this.condition;
            },
        }
    }
    else {
        var statuses = []
        jsonObject.forEach(function (oldStatus) {
            statuses.push({
                epoch: oldStatus.epoch,
                date: new Date(oldStatus.epoch),
                condition: oldStatus.condition,
                Date: function () {
                    return this.date;
                },
                Condition: function () {
                    return this.condition;
                },
            })
        })
        return statuses
    }
}

function ReadHouseFile(_private) {
    var file = Orion.NewFile();

    if (file.Open('IDOC.json', true)) {
        var house = []
        while (house != null && house) {
            var house = file.ReadLine()
            if (house != '') {
                var houseJson = JSON.parse(house)
                houseList.push(HouseVisit(null, houseJson))
            }
        }
    }
    file.Close();

    TextWindow.Open()
    TextWindow.Print(houseList)
}

function ShrinkIDOCFile() {
    ReadHouseFile()
    houseList.forEach(function (house) {
        if (house.HouseStatus().length > 1) {
            house.WriteHouseStatus([house.HouseStatus()[house.HouseStatus().length - 1]])
        }
    })
    WriteHouseFile()
}

function WriteHouseFile(_private) {
    var file = Orion.NewFile();
    file.Remove('IDOC.json');
    if (file.Open('IDOC.json')) {
        houseList.forEach(function (house) {
            file.Write(JSON.stringify(house) + '\n')
        })
    }
    file.Close();
}

function ExportMapFile() {
    ReadHouseFile();
    var file = Orion.NewFile();
    file.Remove('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSES.txt');
    if (file.Open('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSES.txt')) {
        houseList.forEach(function (houseValue) {
            //147B	10	10	40	40	0	Someones house: 40x40 at 10,10 0
            file.Write(houseValue.Serial().slice(houseValue.Serial().length - 4) + '\t' + houseValue.X() + '\t' + houseValue.Y() + '\t' + '18\t18\t' + houseValue.Map() + '\t' + houseValue.Name() + '\n')
        })
    }
    file.Close();

    file.Remove('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSEGREATLY.txt');
    var file = Orion.NewFile();
    if (file.Open('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSEGREATLY.txt')) {
        houseList.filter(function (hv) { return hv.HouseStatus()[hv.HouseStatus().length - 1].Condition() === 'This Structure Is Greatly Worn' })
            .forEach(function (houseValue) {
                //-	Warrior's Battle Gear	2533	576	7	true
                var hv = '+\t' + houseValue.Name()+houseValue.HouseStatus()[houseValue.HouseStatus().length - 1].Date().toISOString() + '\t' + houseValue.X() + '\t' + houseValue.Y() + '\t' + houseValue.Map() + '\t' + 'true'
                file.Write(hv + '\n')
            })
    }
    file.Close();

    file.Remove('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSEIDOC.txt');
    var file = Orion.NewFile();
    if (file.Open('A:\\Games\\EnhancedMapClient\\Definitions\\HOUSEIDOC.txt')) {
        houseList.filter(function (hv) { return hv.HouseStatus()[hv.HouseStatus().length - 1].Condition() == 'This Structure Is In Danger Of Collapsing' })
            .forEach(function (houseValue) {
                //-	Warrior's Battle Gear	2533	576	7	true
                var hv = '+\t' + houseValue.Name() + '\t' + houseValue.X() + '\t' + houseValue.Y() + '\t' + houseValue.Map() + '\t' + 'true'
                file.Write(hv + '\n')
            })
    }
    file.Close();

    Orion.Launch('A:\\Games\\EnhancedMapClient\\EnhancedMap.exe')
}

function LaunchTest() {
    Orion.OpenEnhancedMap('A:\Games\EnhancedMapClient')
}
function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor((t - d * cd) / ch),
        m = Math.round((t - d * cd - h * ch) / 60000),
        pad = function (n) { return n < 10 ? '0' + n : n; };
    if (m === 60) {
        h++;
        m = 0;
    }
    if (h === 24) {
        d++;
        h = 0;
    }
    return [d, pad(h), pad(m)].join(':');
}

function CompareToBackup() {
    var file = Orion.NewFile();
houseJson = []
    if (file.Open('IDOC.json', true)) {
        var house = []
        while (house != null && house) {
            var house = file.ReadLine()
            if (house != '') {
                var houseJson = JSON.parse(house)
                houseList.push(HouseVisit(null, houseJson))
            }
        }
    }
    file.Close();

    var houseList2 = []
    var file2 = Orion.NewFile();

    if (file2.Open('IDOC-backup.json', true)) {
        var house = []
        while (house != null && house) {
            var house = file2.ReadLine()
            if (house != '') {
                var houseJson = JSON.parse(house)
                houseList2.push(HouseVisit(null, houseJson))
            }
        }
    }
    file.Close();

    var serials1 = houseList.map(function (house) { return house.Serial() })
    var serials2 = houseList2.map(function (house) {return  house.Serial() })

    TextWindow.Open()
    serials2.forEach(function (house) {
        if (serials1.indexOf(house) == -1)
            TextWindow.Print(house)
    })
}

