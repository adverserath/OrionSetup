//#include helpers/Target.js
//#include helpers/Notifier.js
//#include helpers/Beetle.js
//#include helpers/ItemManager.js

function MoveDropItemToBox()
{
Orion.ClearFakeMapObjects();
var item = SelectTarget()
var box = SelectTarget()
WalkTo(item,1)
var point = 0

var path = Orion.GetPathArray(box.X(), box.Y(), box.Z(), 1)
.forEach(function (position){
if(Orion.GetDistance(box.Serial())<3)
{
Orion.Wait(1000)
Orion.Print("box")
Orion.MoveItem(item.Serial(),0,box.Serial())
}
Orion.Wait(1000)
//Orion.AddFakeMapObject(Orion.Random(10000), item.Graphic(), item.Color(), position.X(),position.Y(),position.Z());
//walk to lift
if(box.Distance()<2)
{
Orion.MoveItem(item.Serial(),box.Serial())
}
if(point%4==1)
{
Orion.WalkTo(position.X(),position.Y(),position.Z())
Orion.DragItem(item.Serial())
point++
}
//skip
if(point%4==2)
{
point++
}
//drop
if(point%4==3)
{
Orion.DropDraggedItem(ground, position.X(), position.Y(), position.Z());
Orion.Wait(100)
Orion.WalkTo(position.X(),position.Y(),position.Z(),0)
point++
}
//skip
if(point%4==0)
{
point++
Orion.WalkTo(position.X(),position.Y(),position.Z())
}
})
if(Orion.GetDistance(box.Serial())<3)
{
Orion.Wait(1000)
Orion.Print("box")
Orion.MoveItem(item.Serial(),0,box.Serial())
}
}

var maps = ['Felucca', 'Trammel', 'Ilshenar', 'Malas', 'Tokuno']
function IDOCAlert() {
    var selected;
    var selecting = true;
    var signs = [];
    while (selecting) {
        var selectedObj = SelectTarget();
        if (selectedObj == null) {
            selecting = false
        }
        else {
            selected = selectedObj.Serial()

            signs.push(selected)
            Orion.Print('added ' + selected)
        }
    }
    var fallen = false;
    while (!fallen) {
        Orion.Wait(1000)
        signs.forEach(function (house) {
            var sign = Orion.FindObject(house)
            if (sign == null) {
                fallen = true
            }
        })
    }
    Orion.ActivateClient();
    var now = Orion.Date
    while (true) {
        BotPush('House Fallen')
        Orion.Wait(10000)
    }
}

function MoveItemToBeetle() {
    var item = SelectTarget()
    var beetle = getMyBeetle()
    while (item.Container() == '0xFFFFFFFF') {
        Orion.MoveItem(item.Serial(), 1, beetle.Serial());
        Orion.Wait(50);
    }
}

function PlaceHouse() {
    Orion.UseObject('0x40173554');
    if (Orion.WaitForGump(1000)) {
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x877C84F9')) {
            gump0.Select(Orion.CreateGumpHook(1));
            Orion.Wait(100);
        }
    }
    if (Orion.WaitForGump(1000)) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x5D40A15B')) {
            gump1.Select(Orion.CreateGumpHook(1));
            Orion.Wait(100);
        }
    }
    if (Orion.WaitForTarget(1000))
        Orion.TargetTile('any', 1011, 987, 65466);
}

function IDOCWalker() {



}
function IDOCScanner() {
    Orion.IgnoreReset()
    while (true) {
        Orion.Wait(500)
        Orion.FindTypeEx(any, any, ground, 'item', 50).filter(function (item) {
            return item.Name() === 'A House Sign'
        })
            .forEach(function (sign) {
                var condition = sign.Properties().match(/Condition.*/gi)
                Orion.PrintFast(sign.Serial(), 68, 1, condition);

            })
        var houseSigns = Orion.FindTypeEx(any, any, ground, 'item', 50).filter(function (item) {
            return item.Name() === 'A House Sign'
                && (item.Properties().match(/Condition..This\sstructure\sis\sin\sdanger\sof\scollapsing/gi)
                )
        })
        houseSigns.forEach(function (houseSign) {
            WalkTo(houseSign)
            BotPush('Map: ' + maps[Player.Map()] + '  X: ' + houseSign.X() + ' Y: ' + houseSign.Y())
            BotPush(houseSign.Properties())
            Orion.Print(houseSign.Properties())

            Orion.Wait(5000)
            Orion.Ignore(houseSign.Serial())
        })
    }
}

function HouseScanner() {
    Orion.IgnoreReset()
    while (true) {
        Orion.Wait(500)
        Orion.FindTypeEx(any, any, ground, 'item', 40).filter(function (item) {
            return item.Name() === 'A House Sign'
        })
            .forEach(function (sign) {
                var condition = sign.Properties().match(/Condition.*/gi)
                Orion.PrintFast(sign.Serial(), 68, 1, condition);
				Orion.Print(sign.Serial() + condition)
            })
        var houseSigns = Orion.FindTypeEx(any, any, ground, 'item', 40).filter(function (item) {
            return item.Name() === 'A House Sign'
                && (item.Properties().match(/Condition..This\sstructure\sis\sin\sdanger\sof\scollapsing/gi)
                    || item.Properties().match(/Condition..This\sstructure\sis\sgreatly\sworn/gi)
                )
        })
        houseSigns.forEach(function (houseSign) {
            WalkTo(houseSign)
            BotPush('Map: ' + maps[Player.Map()] + '  X: ' + houseSign.X() + ' Y: ' + houseSign.Y())
            BotPush(houseSign.Properties())
            Orion.Print(houseSign.Properties())

            Orion.Wait(5000)
            Orion.Ignore(houseSign.Serial())
        })
    }
}

function GrubberTracking() {
    TextWindow.Open()
    var count = 0
    var found = 0
    while (!Player.Dead()) {
        var Gump;
        Orion.UseSkill("Tracking");
        Orion.Wait(500);
        Gump = Orion.GetLastGump();
        Gump.Select(Orion.CreateGumpHook(1));
        Orion.Wait(1000);
        Gump = Orion.GetLastGump();
        count++
        if (Gump.TextList().indexOf('grubber') != -1) {
            Orion.Print(39, 'found grubber')

        }
        Orion.Wait(3000);

        Gump.Close()
        Orion.Wait(6000);
    }
    Orion.Wait(1000);
}

function ReadHouseAccessor() {
    var HouseAccessor = Orion.FindTypeEx('0x22C4', any, ground, 'item|near', 2)[0]
    var start = Orion.Now()
    Orion.Print(HouseAccessor.Serial())
    Orion.UseObject(HouseAccessor.Serial())
    Orion.Wait(100)
    var message = Orion.WaitJournal('', start, Orion.Now() + 1000, 'item', HouseAccessor.Serial());
    if (message != null) {
        var hm = message.Text()
        var values = hm.match(/\d+/g)
        var houses = parseInt(values[0])
        var idoc = parseInt(values[1])
        var greatly = parseInt(values[2])
        Orion.Wait(1000)
        while (HouseAccessor != null && HouseAccessor.Distance() < 3) {
            start = Orion.Now()
            Orion.UseObject(HouseAccessor.Serial())
            var message = Orion.WaitJournal('', start, Orion.Now() + 1000, 'item', HouseAccessor.Serial());
            if (message != null) {
                var hm = message.Text()
                var values = hm.match(/\d+/g)

                if (parseInt(values[0]) != houses) {
                    BotPush('Houses ' + (parseInt(values[0]) - houses))
                }
                var houses = parseInt(values[0])

                if (parseInt(values[1]) != idoc) {
                    BotPush('IDOC ' + (parseInt(values[1]) - idoc))
                }
                var idoc = parseInt(values[1])

                if (parseInt(values[2]) != greatly) {
                    BotPush('Greatly ' + (parseInt(values[2]) - greatly))
                }
                var greatly = parseInt(values[2])

            }
            Orion.Wait(10000)
        }
    }
}