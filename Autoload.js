//#include Scripts/helpers/Target.js

var unique;
var searchedBags = [];
function BinPicker() {
	var bin = Orion.FindObject('0x40053E83');
	TextWindow.Open();

	while (Player.WarMode()) {
		Orion.Wait(500);
		// TextWindow.Clear();

		SearchContainer(bin);
	}
}

function SearchContainer(container) {
	var everythingInBin = Orion.FindTypeEx('any', 'any', container.Serial(), '', '', '', 'true')

	everythingInBin
		.filter(function (item) {
			return item.Graphic() != '0x0E75' || item.Name() != 'Backpack';
		})
		.forEach(function (lootable) {
			PrintItem();
		});

	everythingInBin
		.filter(function (item) {
			return searchedBags.indexOf(item.Serial() == -1) &&
				(item.Graphic() == '0x0E75' || item.Name() == 'Backpack');
		})
		.forEach(function (bag) {
			searchedBags.push(bag.Serial());
			Orion.OpenContainer(bag.Serial());
			SearchContainer(bag);
		});
	 searchedBags =
		searchedBags.filter(function (bagSerial) {
			return everythingInBin.map(function (binItem) { binItem.Serial() }).indexOf(bagSerial) != -1
		});

}


function PrintItem(item) {
	TextWindow.Print(item.Name());
	TextWindow.Print(item.Properties());
	if (item.Name().toLowerCase().search('runic') >= 0) {
		Orion.MoveItem(item.Serial(), 200);
	}
	if (item.Properties().toLowerCase().search('slayer') >= 0) {
		//Orion.MoveItem(item.Serial())
	}
	if (item.Name().toLowerCase().search('Exceptional') >= 0) {
		Orion.MoveItem(item.Serial())
	}
	TextWindow.Print(' ');
}