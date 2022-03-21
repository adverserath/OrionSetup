//#include helpers/Target.js
//#include helpers/Notifier.js
//#include helpers/Beetle.js
//#include helpers/ItemManager.js

var houseList = []
function RecordHouses() {
    Orion.IgnoreReset()
    ReadHouseFile()
    var updated = false

    while (true) {
        Orion.Wait(1000)
        Orion.FindTypeEx(any, any, ground, 'item', 40).filter(function (item) {
            return item.Name() === 'A House Sign'
        }).forEach(function (houseSign) {
            TextWindow.Print(JSON.stringify(CheckHouse(houseSign)))
            Orion.Ignore(houseSign.Serial())
            updated = true
        })
        if (updated) {
            WriteHouseFile()
            updated = false
        }
    }
}

function CheckHouse(sign) {
    var existing = houseList.filter(function (house) { return house.Serial() == sign.Serial() })
    if (existing.length > 0) {
        Orion.Print('Existing')
        var house = existing[0]
        var newStatus = HouseStatus(sign)
        var lastStatus = house.HouseStatus()[house.HouseStatus().length - 1]
        house.AddHouseStatus(newStatus)
if(newStatus.Condition() == lastStatus.Condition())
{
Orion.Print('House Changed Status')
var lastSeen = dhm(newStatus.Date() - lastStatus.Date())
Orion.Print(lastSeen)
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
 //   if (jsonObject != null)
  //      Orion.Print(jsonObject[0].date)
    if (sign != null)
        return {
            date: new Date(),
            condition: sign.Properties().match(/\nCondition..([\w\s]+)/im)[1],
            Date: function () {
                return this.date;
            },
            Condition: function () {
                return this._condition;
            },
        }
    else {
        var statuses = []
        jsonObject.forEach(function (oldStatus) {
        Orion.Print(new Date(Date(oldStatus.date)))
            statuses.push({
                date: Date(oldStatus.date),
                condition: oldStatus.condition,
                Date: function () {
                    return this.date;
                },
                Condition: function () {
                    return this._condition;
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
                    if(house!='')
                    {
        			var houseJson = JSON.parse(house)
					houseList.push(HouseVisit(null, houseJson))
					}
            }
//        houseJson.forEach(function (house) {
//            houseList.push(HouseVisit(null, house))
//        })
    }
        file.Close();

    TextWindow.Open()
    TextWindow.Print(houseList)
}

function WriteHouseFile(_private) {
    var file = Orion.NewFile();

    if (file.Open('IDOC.json')) {
    houseList.forEach(function (house){
            file.WriteLine(JSON.stringify(house))
    })
    }
    file.Close();
}

function dhm(t){
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  return [d, pad(h), pad(m)].join(':');
}
