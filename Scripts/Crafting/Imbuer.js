//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js
var imbuegump
const imbuechest = 0x400C5858
var imbuebackpack = 0x400F6E24
function testMethod() {
var name = "Sapphire"

  Orion.FindTypeEx(any, any, 0x400C5858, 'item', 18).filter(function (item) {
    var nameLetters = item.Name().match(/([a-zA-Z\s]+)/)[1].trim()
 if(nameLetters == name)
 Orion.Print(nameLetters + '  '+name)
    return Orion.Contains(nameLetters, name)
 
  })
 



}
function RestockCurrentImbue() {
	imbuegump = Orion.GetGump(any, '0xEA767EE4')
	if (imbuegump != null && imbuegump.ID() == 0xEA767EE4) {
		var matches = getCommandItems(imbuegump.CommandList().toString())

		matches.forEach(function (match) {
			TextWindow.Print(match)
			var itemName = match[0]
			var have = CountBackpackItemWithExactName(itemName)
			if (have < match[1]) {
			var needed = match[1] - have
			Orion.Print('need ' + needed + ' ' + match[0])
			var item = FindContainerItemWithExactName(itemName, imbuechest)
			if(item==null)
				Orion.Print(itemName + ' not found in chest')
				Orion.MoveItem(item.Serial(), needed, imbuebackpack)
				Orion.Wait(1000)
			}
		})
	}
}

function getCommandItems(text) {
	const regex = /\w*\s40\s\d*\s390[\w\s]*@#(\d*)@\s,\stext(?:\s\d*){3}\s(\d*)/g; // Matches one or more digits
	const matches = text.match(regex);
	return matches.map(function (match) {
		return [Orion.GetCliLocString(getIngredients(match)), getAmount(match)]
	})
}

function getIngredients(command) {
	const regex = /@#(\d*)@/; // Matches one or more digits
	const matches = command.match(regex);
	return matches[1]
}

function getAmount(command) {
	const regex = /1153\s(\d*)/; // Matches one or more digits
	const matches = command.match(regex);
	return imbuegump.TextList()[matches[1]]
}

function ImbueEverything() {
	var itemtype = SelectTarget('Select imbue type')
	var tool = SelectTarget('Imbue tool')

	Orion.FindTypeEx(itemtype.Graphic(), 0x0000, itemtype.Container()).forEach(function (item) {
		Orion.UseObject(tool.Serial());
		if (Orion.WaitForTarget(1000))
			Orion.TargetObject(item.Serial());
		if (Orion.WaitForGump(1000)) {
			var gump0 = Orion.GetGump('last');
			if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x410F26AC')) {
				gump0.Select(Orion.CreateGumpHook(3));
				Orion.Wait(100);
			}
		}
		Orion.Wait(1000);
	})

	UnRavelContainer(itemtype.Container())

}

function UnRavelContainer(containerSerial) {
	Orion.UseSkill('Imbuing');
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x65290B89')) {
			gump0.Select(Orion.CreateGumpHook(10011));
			Orion.Wait(100);
		}
	}
	if (Orion.WaitForTarget(1000))
		Orion.TargetObject(containerSerial);
	if (Orion.WaitForGump(1000)) {
		var gump1 = Orion.GetGump('last');
		if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0xB73E81BB')) {
			gump1.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
}