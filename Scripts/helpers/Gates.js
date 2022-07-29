
var britGate = coordinate(1417, 1687)

var gatePoints = [
    ['Moonglow', 0, 3],
    ['Britain', 1, 3],
    ['Jhelom', 2, 3],
    ['Yew', 3, 3],
    ['Minoc', 4, 3],
    ['Vesper', 4, 3],
    ['Trinsic', 5, 3],
    ['Skara Brae', 6, 3],
    ['New Magincia', 7, 3],
    ['New Haven', 8, 3],
    ['Delucia', 9, 3],
    ['Papua', 10, 3],
    ['Mistas', 100, 2],
    ['Compassion', 101, 2],
    ['Honesty', 102, 2],
    ['Honor', 103, 2],
    ['Humility', 104, 2],
    ['Justice', 105, 2],
    ['Sacrifice', 106, 2],
    ['Spirituality', 107, 2],
    ['Valor', 108, 2],
    ['Chaos', 109, 2],
    ['Luna', 200, 1],
    ['Umbra', 201, 1],
    ['Doom', 202, 1]
]
function gateLocation(_name, _radioButton) {
    return {
        name: _name,
        radioButton: _radioButton,
        Name: function () {
            return this.name;
        },
        RadioButton: function () {
            return this.radioButton;
        },
        toString: function () {
            return this.Name() + '  ' + this.RadioButton()
        },
    }
}

function GetRadioNumber(name) {
    var gump0 = Orion.GetGump('last');
    var gate = gump0.CommandList().toString();
    var locationPattern = /radio(?:\s\d*){5}\s(\d+)(?:[\s,\n]+)xmfhtmlgump(?:\s\d*){4}\s(\d*)(?:\s\d*){2}/gi;
    var sublocationPattern = /radio(?:\s\d*){5}\s(\d+)(?:[\s,\n]+)xmfhtmlgump(?:\s\d*){4}\s(\d*)(?:\s\d*){2}/i;
    var htmlMapping = /radio(?:\s\d*){5}\s(\d+)(?:[\s,\n]+)htmlgump(?:\s\d*){4}\s(\d*)(?:\s\d*){2}/gi;
    var subhtmlMapping = /radio(?:\s\d*){5}\s(\d+)(?:[\s,\n]+)htmlgump(?:\s\d*){4}\s(\d*)(?:\s\d*){2}/i;

    var locations = []

    var result = gate.match(locationPattern);
    result.forEach(function (block) {
        var locationName = Orion.GetCliLocString(block.match(sublocationPattern)[2]).replace(/<[\/\w*\s=#]*>/gi, '')
        locations.push(gateLocation(locationName, block.match(sublocationPattern)[1]))
        TextWindow.Print(gateLocation(locationName, block.match(sublocationPattern)[1]))
    }
    )
    var result = gate.match(htmlMapping);
    result.forEach(function (block) {
        TextWindow.Print(block)
        var locationName = gump0.TextList()[block.match(subhtmlMapping)[2]]
        Orion.Print(locationName)
        locations.push(gateLocation(locationName, block.match(subhtmlMapping)[1]))
        TextWindow.Print(gateLocation(locationName, block.match(subhtmlMapping)[1]))
    }
    )
    locations = locations.filter(function (location) {
        TextWindow.Print(location.Name() + ' contains ' + Orion.Contains(location.Name(), name))
        return Orion.Contains(location.Name(), name)
    })
    Orion.Print('locations' + locations)
    return locations
    //	var gump0 = Orion.GetGump('last');
    // if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8'))
    // {
    // 	var gumpHook0 = Orion.CreateGumpHook(1);
    // 	var gateId = Orion.InputText(15000, 'Which gate number?')
    // 	gumpHook0.AddCheck(parseInt(gateId), true);
    // 	gump0.Select(gumpHook0);
    // 	Orion.Wait(100);
    // }
}

function GateTo(placeName) {
    var gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 15).shift()
    if (gate != null) {
        WalkTo(gate)
        Orion.UseType('0x0F6C|0x4BCB', '0xFFFF', 'ground');
        Orion.Wait(100)
        Orion.UseObject('0x4012F148');
        if (Orion.WaitForGump(2000)) {
            var retries = 0
            while (!Player.Hidden() || retries > 5) {
                retries++
                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
                    Orion.Wait(200)
                    var gumpHook0 = Orion.CreateGumpHook(1);
                    Orion.Wait(200)
                    gumpHook0.AddCheck(GetRadioNumber(placeName)[0].RadioButton(), true);
                    Orion.Wait(200)
                    gump0.Select(gumpHook0);
                    Orion.Wait(100);
                }
                Orion.Wait(500)
            }
        }
    }
}



// function GateTo(placeName) {
//     var gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 15).shift()
//     if (gate != null) {
//         WalkTo(gate)

//         var id = gatePoints.filter(function (place) {
//             return place[0] === placeName
//         })
//         if (id != null) {
//             TextWindow.Print(id[0][0])
//             var gateId = id[0][3]
// var page = id[0][2]
//             Orion.UseType('0x0F6C|0x4BCB', '0xFFFF', 'ground');
//             if (Orion.WaitForGump(1000) || Orion.GumpExists(any, any, '0xE0E675B8')) {
//                 var gump0 = Orion.GetGump('last');

//                 if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
//                  Orion.Wait(1000);
//                     var gumpHook0 = Orion.CreateGumpHook(1);
//                     gump0.Select(gumpHook0);

//                     gumpHook0.AddCheck(gateId, true);
//                      Orion.Wait(1000);
//                     gump0.Select(gumpHook0);
//                     Orion.Wait(100);
//                 }
//             }
//         }
//     }
// }

function GoTo() {
    GateTo('Britain')
}

function GotoMistas() {
    if (Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 15).length == 0) {
        if (Orion.FindTypeEx('0x468A', any, ground, 'item', 20).length == 0) {
            GoHome()
            Orion.Wait(500)
        }
        var portalCrystals = Orion.FindTypeEx('0x468A', any, ground, 'item', 20)
        var portalCrystal = portalCrystals.shift()

        if (portalCrystal != null) {
            WalkTo(portalCrystal)
            Orion.Say('luna mint')
        }
        Orion.Wait(500)
    }
    GateTo('Mistas')
}

function GotoTW() {
    GoHome()
    Orion.Wait(1000)
    WalkTo('0x4015E476')
    Orion.UseObject('0x4015E476');
    if (Orion.WaitForGump(1000)) {
        Orion.Wait(300)
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xF9A23032')) {
            gump0.Select(Orion.CreateGumpHook(1111825));
            Orion.Wait(100);
        }
    }
}
function GotoBlood() {
    GoHome()
    Orion.Wait(1000)
    WalkTo('0x4015E476')
    Orion.UseObject('0x4015E476');
    if (Orion.WaitForGump(1000)) {
        Orion.Wait(300)
        var gump0 = Orion.GetGump('last');
        if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xF9A23032')) {
            gump0.Select(Orion.CreateGumpHook(1078308));
            Orion.Wait(100);
        }
    }
}
//#include helpers/Target.js