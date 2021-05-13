//#include Scripts/helpers/Target.js
//#include Scripts/helpers/TradeItems.js

var walkableCities = ['Vesper', 'Britain', 'Trinsic', 'Minoc', 'Yew', 'Skara Brae']

function GoToNPC(typeName) {
	var npc = Orion.FindTypeEx('any', any, ground, 'mobile', 30, 'yellow')
		.filter(function (_npc) {
			return Orion.Contains(_npc.Properties(), typeName);
		})
	if (npc.length > 0) {
		Orion.Print('found')
		npc = npc[0]
		WalkTo(npc)
		return npc
	}
	Orion.Print('no found')
	return null
}
function GetCrate() {
	var minister = GoToNPC('Minister')
	Orion.RequestContextMenu(minister.Serial());
	Orion.WaitContextMenuID(minister.Serial(), 1)
}

function StartBritain() {
	var runebook = Orion.FindTypeEx('0x22C5', '0x0851', backpack).shift()
	Orion.Cast('Recall')
	if (Orion.WaitForTarget(4000)) {
		Orion.TargetObject(runebook.Serial())
	}
}

function HandIn(crate) {
	var minister = GoToNPC('Minister')
	Orion.RequestContextMenu(minister.Serial());
	Orion.WaitContextMenuID(minister.Serial(), 2)
	if (Orion.WaitForTarget()) {
		Orion.TargetObject(crate.Serial())
	}
}

function GetItem() {
	var crates = Orion.FindTypeEx('any', any, backpack).filter(function (item) {
		return Orion.Contains(item.Name(), 'Crate');
	})
	if (crates.length > 0) {
		var crate = crates[0]
		Orion.Print('crate found')
		var crateprop = (crate.Properties().match(
			/%\n([\w\s]*):\s\d*\/(\d*)/i) || [])
		var itemName = crateprop[1];
		var amount = crateprop[2];
		while (itemName.indexOf(' ') > -1) {
			itemName = itemName.replace(' ', '');
		}
		Orion.Print(itemName)
		var itemset = tradeItems.filter(function (set){
			return set[0]===itemName
		})[0]
		Orion.Print(itemset[0])
		Orion.Print(itemset[1])
		Orion.Print(itemset[2])
		Orion.Print(itemset[3])
		Orion.Print(itemset[4])
		Orion.WalkTo(itemset[3],itemset[4],0,1,255,1)
		Orion.Print(amount)
	}
}
function FindMinister() {
	GetCrate()
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x0C31FC89')) {
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
	var crates = Orion.FindTypeEx('any', any, backpack).filter(function (item) {
		return Orion.Contains(item.Name(), 'Crate');
	})
	if (crates.length > 0) {
		var crate = crates[0]
		Orion.Print('crate found')
		var city = ((crate.Properties().match(
			/Destination\sCity:\s(\w*)/i) || [])[1] || '')
		Orion.Print(city)
		if (walkableCities.indexOf(city) != -1) {
			Orion.Print('I Can Do This!')
		}
		GetItem()
	}
}