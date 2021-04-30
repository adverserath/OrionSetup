//#include Scripts/helpers/Target.js


function GeneratedScript_005351() {
	while (true) {
		Orion.UseObject('0x400D0669');
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
			Orion.TargetTile('any', 1627, 3539, 0);
		if (Orion.WaitForGump(300)) {
			var gump2 = Orion.GetGump('last');
			if ((gump2 !== null) && (!gump2.Replayed()) && (gump2.ID() === '0x11775C2E')) {
				gump2.Select(Orion.CreateGumpHook(1));
				Orion.Wait(100000);
			}
		}
		Orion.Wait(500)
		Orion.GetGump('last').Close()
	}
}


function CheckSelectedItem() {
	CheckItem(SelectTarget());
}

var bracelet = '0x1086|0x1F06';
var ring = '0x108A|0x1F09';
function CheckItem(item) {
	if (item.Graphic() === '0x0EFA') {
		Orion.Print(MageBookRating(item));
	}
	if (item.Graphic() == '0x1086') {
		Orion.Print(MageBookRating(item));
	}
	if (item.Graphic() === 'Weapon') {
		Orion.Print(MageBookRating(item));
	}
}

function MageBookRating(book) {
	var itemValue = 0;
	if (book != null && book.Properties().length > 1) {
		var itemName = book.Name();
		var itemProp = book.Properties();

		itemValue += ((itemProp.match(
			/Intelligence\sBonus\s(\d)/i
		) || [])[1] || 0) / 8;

		itemValue += ((itemProp.match(
			/Mana\sIncrease\s(\d)/i
		) || [])[1] || 0) / 8;

		itemValue += ((itemProp.match(
			/Faster\sCasting\s(\d)/i
		) || [])[1] || 0) / 1;

		itemValue += ((itemProp.match(
			/Faster\sCasting\sRecovery\s(\d)/i
		) || [])[1] || 0) / 3;

		itemValue += ((itemProp.match(
			/Spell\sDamage\sIncrease\s(\d*)/i
		) || [])[1] || 0) / 12;

		itemValue += ((itemProp.match(
			/Magery\s\+(\d*)/i
		) || [])[1] || 0) / 15;

		itemValue += ((itemProp.match(
			/Meditation\s\+(\d*)/i
		) || [])[1] || 0) / 15;

		itemValue += ((itemProp.match(
			/Evaluating\sIntelligence\s\+(\d*)/i
		) || [])[1] || 0) / 15;

		itemValue += ((itemProp.match(
			/Resisting\sSpells\s\+(\d*)/i
		) || [])[1] || 0) / 15;

		itemValue += ((itemProp.match(
			/Lower\sReagent\sCost\s(\d*)/i
		) || [])[1] || 0) / 20;

		itemValue += ((itemProp.match(
			/Lower\sMana\sCost\s(\d)/i
		) || [])[1] || 0) / 8;

		itemValue += ((itemProp.match(
			/Mana\sRegeneration\s(\d*)/i
		) || [])[1] || 0) / 2;

		itemValue += (itemProp.match(
			/Repond\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Undead\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Elemental\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Demon\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Arachnid\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Reptile\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/Dragon\sSlayer/i
		) || []).length / 2;

		itemValue += (itemProp.match(
			/\w*\sSlayer/i
		) || []).length / 2;
		return itemValue / 3 * 125;
	}
}