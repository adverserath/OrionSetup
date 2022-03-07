
var britGate = coordinate(1417, 1687)

var gatePoints = [
    ['Moonglow', 0,3],
    ['Britain', 1,3],
    ['Jhelom', 2,3],
    ['Yew', 3,3],
    ['Minoc', 4,3],
    ['Vesper', 4,3],
    ['Trinsic', 5,3],
    ['Skara Brae', 6,3],
    ['New Magincia', 7,3],
    ['New Haven', 8,3],
    ['Delucia', 9,3],
    ['Papua', 10,3],
    ['Mistas', 100,2],
    ['Compassion', 101,2],
    ['Honesty', 102,2],
    ['Honor', 103,2],
    ['Humility', 104,2],
    ['Justice', 105,2],
    ['Sacrifice', 106,2],
    ['Spirituality', 107,2],
    ['Valor', 108,2],
    ['Chaos', 109,2],
        ['Luna', 200,1],
            ['Umbra', 201,1],
                ['Doom', 202,1]
]

function GateTo(placeName) {
    var gate = Orion.FindTypeEx('0x4BCB|0x4B8F', any, ground, 'item|near', 15).shift()
    if (gate != null) {
        WalkTo(gate)

        var id = gatePoints.filter(function (place) {
            return place[0] === placeName
        })
        if (id != null) {
            TextWindow.Print(id[0][0])
            var gateId = id[0][3]
var page = id[0][2]
            Orion.UseType('0x0F6C|0x4BCB', '0xFFFF', 'ground');
            if (Orion.WaitForGump(1000) || Orion.GumpExists(any, any, '0xE0E675B8')) {
                var gump0 = Orion.GetGump('last');

                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8')) {
                 Orion.Wait(1000);
                    var gumpHook0 = Orion.CreateGumpHook(1);
                    gump0.Select(gumpHook0);

                    gumpHook0.AddCheck(gateId, true);
                     Orion.Wait(1000);
                    gump0.Select(gumpHook0);
                    Orion.Wait(100);
                }
            }
        }
    }
}

function GoTo() {
    GateTo('Britain')
}

//#include helpers/Target.js