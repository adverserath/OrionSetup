// Sample items for comparison


function SuitFinder()
{
DumpEquippedItems()
var ring = SelectTarget('ring')
var bracelet = SelectTarget('bracelet')
var head = SelectTarget('head')
var neck = SelectTarget('neck')
var chest = SelectTarget('chest')
var gloves = SelectTarget('gloves')
var sleeves = SelectTarget('sleeves')
var legs = SelectTarget('legs')
var shield = SelectTarget('shield')
var weapon = SelectTarget('weapon')


PrintBox(ring,'ring')
PrintBox(bracelet,'bracelet')
PrintBox(head,'head')
PrintBox(chest,'chest')
PrintBox(neck,'neck')
PrintBox(sleeves,'sleeves')
PrintBox(gloves,'gloves')
PrintBox(legs,'legs')
PrintBox(shield,'shield')
PrintBox(weapon, 'weapon')
}

function DumpEquippedItems()
{
    var layers = [
        { id: 1,  name: "RightHand (1H weapon)" },
        { id: 2,  name: "LeftHand (2H / Shield)" },
        { id: 3,  name: "Shoes" },
        { id: 4,  name: "Pants" },
        { id: 5,  name: "Shirt" },
        { id: 6,  name: "Helmet" },
        { id: 7,  name: "Gloves" },
        { id: 8,  name: "Ring" },
        { id: 9,  name: "Talisman" },
        { id: 10, name: "Necklace" },
        { id: 11, name: "Hair" },
        { id: 12, name: "Waist" },
        { id: 13, name: "InnerTorso" },
        { id: 14, name: "Bracelet" },
        { id: 15, name: "Face" },
        { id: 16, name: "Beard" },
        { id: 17, name: "MidTorso" },
        { id: 18, name: "Earrings" },
        { id: 19, name: "Arms" },
        { id: 20, name: "Cloak" },
        { id: 22, name: "Robe" },
        { id: 24, name: "Legs" }
    ];

    TextWindow.Open();
    TextWindow.Clear();

    for (var i = 0; i < layers.length; i++)
    {
        var obj = Orion.ObjAtLayer(layers[i].id);

        if (obj)
        {
            TextWindow.Print(
                layers[i].name +
                ": 0x" + obj.Serial().toString(16).toUpperCase() +
                 " (" + obj.Properties() + ")\n"
            );
        }
        else
        {
            Orion.Print(layers[i].name + ": EMPTY");
        }
    }
}


function PrintBox(box,type)
{
	TextWindow.Print('---Box of '+type+'---')
	Orion.Wait(1000)
	WalkTo(box.Serial())
	Orion.OpenContainer(box.Serial())
	
	Orion.FindTypeEx(any, any, box.Serial()).forEach(function (item){
		TextWindow.Print(item.Serial() + " ["+type+"]")
		TextWindow.Print(item.Properties())
		TextWindow.Print('------')
	})
}

// Function to parse item properties
function parseProperties(item) {
    var properties = {};
    var lines = item.trim().split('\n');
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var match = line.match(/([\w\s]+):?\s*([\d\s\/\%]+)?/);
        if (match) {
            var key = match[1].trim();
            var value = match[2] ? match[2].trim() : true; // true for properties like 'Antique' which have no value
            properties[key] = value;
        }
    }
    return properties;
}

// Function to compare two items
function compareItems(item1, item2) {
    var props1 = parseProperties(item1.Properties());
    var props2 = parseProperties(item2.Properties());
    
    Orion.Print('Comparing Items:');
    for (var key in props1) {
        if (props1.hasOwnProperty(key)) {
            var value1 = props1[key];
            var value2 = props2[key] !== undefined ? props2[key] : 'N/A';
            Orion.Print(key + ': ' + value1 + ' vs ' + value2);
        }
    }
    
    for (var key in props2) {
        if (props2.hasOwnProperty(key) && props1[key] === undefined) {
            TextWindow.Print(key + ': ' + 'N/A' + ' vs ' + props2[key]);
        }
    }
}

function compare(){
var item1 = SelectTarget()
var item2 = SelectTarget()
compareItems(item1, item2)
}

//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Notifier.js
