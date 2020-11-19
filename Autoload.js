//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Notifier.js

//#include Scripts/helpers/ItemManager.js

function test ()
{
TextWindow.Print('X '+Player.X()+' Y '+Player.Y()+ ' Z '+Player.Z())
var out = Orion.WalkTo(1173, 1495, 29,0, 255, 1, 1);
TextWindow.Print(out);
}
var unique;
var checkedIDs = [];
var bin;
function BinPicker() {
	bin = Orion.FindObject('0x40053E83');
	TextWindow.Open();
	checkedIDs = [];
	while (Player.WarMode()) {
		Orion.Wait(200);
		// TextWindow.Clear();
		//	TextWindow.Print('LoopStart');
		SearchBin(bin.Serial());
	}
}

function SearchBin(container) {
	//TextWindow.Print('Open BAGS');
	var bagsInBin = Orion.FindTypeEx('0x0E75', any, bin.Serial(), '', '', '', 'false').filter(function (item) {
		return item != null && checkedIDs.indexOf(item.Serial()) == -1;
	});
	var skip = false;
	bagsInBin.forEach(function (bag) {
		if (bag != null && !skip) {
			Orion.Wait(300);
			var bagID = bag.Serial();
			//TextWindow.Print('Open ' + bagID);
			checkedIDs.push(bagID);
			if (!Orion.OpenContainer(bagID, 300)) {
			//	TextWindow.Print('skip');
				skip = true;
			}
			Orion.Wait(200);
		}
	});

	if (!skip) {
		//TextWindow.Print('Open ITEMS');
		var items = Orion.FindTypeEx('any', 'any', container, '', '', '', 'true')
			.filter(function (item) {
				var checked = checkedIDs.indexOf(item.Serial()) == -1;
				return item != null && (item.Graphic() !== '0x0E75' || item.Name() !== 'Backpack')
					&& checkedIDs.indexOf(item.Serial()) == -1;
			});

		items.forEach(function (lootable) {
			if (Orion.ObjectExists(lootable.Serial())) {
				var lootSerial = lootable.Serial();
				PrintItem(lootSerial);
				checkedIDs.push(lootSerial);
			}
		});
	}
	if(skip)
	{
	checkedIDs=[];
	}
}

function PrintItem(id) {
	var item = Orion.FindObject(id);

	if (item != null && item.Properties().length > 1) {
		//	TextWindow.Print(item.Serial());
		//TextWindow.Print(item.Properties().length);

		//TextWindow.Print(item.Name());
		var itemName = item.Name();
		var itemProp = item.Properties();
		//TextWindow.Print('Runic: ' + (itemName.indexOf(/Ash Runic/gi) >= 0));

		if ((itemProp.match(/(cooking)|(fletcher)/gi) || []).length >= 1) {
		//	TextWindow.Print('no cooking');
		}
		else if ((itemName.match(/Ash Runic/gi) || []).length >= 1) {
			TextWindow.Print('--------TAKE  Ash');
			TakeItem(item);
		}
		//TextWindow.Print('DemonSlayer: ' + (itemProp.indexOf('demon slayer') >= 0));

		else if (itemProp.match(/(reptile|dragon|demon|ogre|repond|bear|undead|orc|\n\s?elemental)\sslayer/gi) >= 1) {
			TextWindow.Print('--------TAKE  slayer');
			TakeItem(item);
		}
		//TextWindow.Print('exceptional: ' + (itemName.indexOf('exceptional') >= 0));

		else if (itemName.indexOf('exceptional') >= 0) {
			TextWindow.Print('--------TAKE  exceptional');

			TakeItem(item);
		}
		//TextWindow.Print('fc: ' + (itemProp.indexOf('faster Casting 1') >= 0 && itemProp.indexOf('faster cast recovery 2') >= 0));

		else if ((itemProp.match(/cast(\s1)|(recovery\s2)/gi) || []).length >= 2) {
			TextWindow.Print('--------TAKE  fc');

			TakeItem(item);
		}
		//TextWindow.Print('hci: ' + (itemProp.indexOf('hit chance increase') >= 0) + 'dci' + (itemProp.indexOf('defense chance increase') >= 0));
		else if ((itemProp.match(/(Hit Chance Increase\s1\d)|(Defense Chance Increase\s1\d)/gi) || []).length >= 2) {
			TextWindow.Print('--------TAKE  hcidci');

			TakeItem(item);
		}
		else if ((itemProp.match(/Bonus:\s((2)(2|3|4|5|6|7|8|9))|(30) | Exceptional Bonus:\s((2)(\d)|(30))/gi) || []).length >= 2) {
			TextWindow.Print('--------TAKE  craftbonus');

			TakeItem(item)
		}
		//if ((itemProp.match(/bonus/g) || []).length >= 2 && itemProp.indexOf(' exceptional ') >= 0) {
		//	TakeItem(item)
		//}

		else if ((itemProp.match(/Taming\s\+((1|2)(\d))|Veterinary\s\+((1|2)(\d))|Peacemaking\s\+((1|2)(\d))|Discordance\s\+((1|2)(\d))|Musicianship\s\+((1|2)(\d))|Provocation\s\+((1|2)(\d))/gi) || []).length >= 2) {
			TextWindow.Print('--------TAKE  music');

			TakeItem(item)
		}

		else if ((itemProp.match(/Lower Reagent Cost\s(((1)(6|7|8|9))|(2\d))/gi) || []).length >= 1) {
			TextWindow.Print('--------TAKE  lrc');

			TakeItem(item)
		}
				else if ((itemProp.match(/Luck\s((9|10)(\d))/gi) || []).length >= 1) {
			TextWindow.Print('--------TAKE  luck');

			TakeItem(item)
		}

		//TextWindow.Print(' ');
	}
}

function TakeItem(item) {
	TextWindow.Print('Take' + item.Serial() + item.Name() + '\n')
	TextWindow.Print(item.Properties());
	Orion.Wait(300);
	Orion.MoveItem(item.Serial());
	BotPush('```'+item.Properties()+'```');
	Orion.Wait(100);
}