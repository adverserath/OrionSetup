// Array of places with map ID filter
var trammel = 1
var felucca = 0
var malas = 3
var ilshenar = 2
var tokuno = 4
var eodon = 5

var places = [
    { serial: 0x4000121A, name: "T2A Champ Island Skull", mapID: felucca },
    { serial: 0x4005AC56, name: "T2A Champ Island Teleporter", mapID: felucca },

    { serial: 0x400A3F92, name: "T2A Ice", mapID: felucca },
    { serial: 0x4001A117, name: "tomb teleporter", mapID: malas },
    { serial: 0x00000003, name: "Forest", mapID: trammel },
    { serial: 0x00000003, name: "Forest", mapID: eodon },
    { serial: 0x00000004, name: "(X)Minoc Town Sheriff", mapID: felucca },

    { serial: 0x00000002, name: "unknown", mapID: -1 }

];


var availablePlaces = places.filter(function (place) { return place.mapID === Orion.ObjAtLayer(21).Map() || place.mapID === -1 });

// Gump creation function
function TeleportToPlace() {
    Orion.Resend();
    Orion.Print("Map:" + Player.Map())
    var gump = Orion.CreateCustomGump(10430); // Unique gump ID
    gump.Clear();
    gump.SetCallback('gumpCallback');

    // Define gump size and background
    gump.AddResizepic(0, 0, '0x9C4B', 200, 150); // Adjust dimensions and background as needed

    // Add combo box for places
    var rowPos = 40;
    gump.AddText(50, 20, 0x835, "Select a Place");
    gump.AddComboBox(1, 50, rowPos, '0x0BB8', 0, '0x0BB8', 120, -3, availablePlaces.length);
    Orion.Print(Player.Map())
    availablePlaces.forEach(function (place, index) {
        Orion.Print(place)
        gump.AddComboBoxText(place.name, 0, index === 0 ? 1 : 0, 110, 'center');
    });

    // Add Confirm button
    gump.AddButton(2, 75, rowPos + 50, 2311, 2313, 2312, '0x0000'); // Adjust button graphics as needed

    gump.Update();
}

// Gump callback function
function gumpCallback(_) {
    var code = CustomGumpResponse.ReturnCode();
    if (code === 2) {  // Confirm button clicked
        var selectedIndex = CustomGumpResponse.ComboBox(1);  // Combo box ID is 1
        if (selectedIndex >= 0) {
            var selectedPlace = availablePlaces[selectedIndex];
            Orion.Print("Teleporting to: " + selectedPlace.name);
            Orion.CastTarget('Teleport', selectedPlace.serial);  // Teleport to selected location
        } else {
            Orion.Print("No place selected.");
        }
    }
}