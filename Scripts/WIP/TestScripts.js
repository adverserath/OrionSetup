// Sample items for comparison


function SuitFinder()
{
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


TextWindow.Open()
TextWindow.Clear()

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

function PrintBox(box,type)
{
TextWindow.Print('---'+type+'---')
Orion.Wait(1000)
WalkTo(box.Serial())
Orion.OpenContainer(box.Serial())

Orion.FindTypeEx(any, any, box.Serial()).forEach(function (item){
TextWindow.Print(item.Serial())
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
