//#include Scripts/helpers/Target.js
//#include Scripts/helpers/Magic.js
//#include Scripts/helpers/TradeItems.js
//#include Scripts/helpers/ItemManager.js
//#include Scripts/helpers/Debug.js
//#include Scripts/helpers/cliloc.js
//#include Scripts/helpers/Notifier.js

var walkableCities = ['Vesper', 'Trinsic', 'Minoc', 'Yew', 'Skara Brae']
var paths = [
	['Britain', ['gate', coordinate(1330, 1904),coordinate(1434, 1762)]],
	['Vesper', ['gate', coordinate(3007, 828)]],
	['Trinsic', ['gate', coordinate(2054, 2854)]],
	['Minoc', ['gate', coordinate(2502, 400)]],
	['Yew', ['gate', coordinate(620, 1048)]],
	['Skara Brae', ['gate',coordinate(642, 2229)]],
	['Moonglow', ['gate',coordinate(4415, 1047)]],
	['New Magincia', ['gate',coordinate(3678, 2251)]],
	['Jhelom', ['gate',coordinate(1378, 3880)]]
]

function GoToNPC(typeName) {
	var npc = Orion.FindTypeEx('any', any, ground, 'mobile', 45, 'yellow')
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

var startMinister
function GetCrate(_private) {
	startMinister = GoToNPC('Minister')
	Orion.RequestContextMenu(startMinister.Serial());
	Orion.WaitContextMenuID(startMinister.Serial(), 1)
	if (Orion.WaitForGump(1000)) {
		Orion.Wait(500)
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x0C31FC89')) {
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
}

function StartBritain(_private) {
	var runebook = Orion.FindTypeEx('0x22C5', '0x0851', backpack).shift()
	RecallRune(runebook)
	Orion.Wait(500)
}

function GoToDestination(destination) {
	paths.filter(function (_path) { return _path[0] === destination })[0][1].forEach(function (coord) {
		if(coord==='gate')
		{
			GateTo(destination)
			Orion.Wait(1000)
		}
		else
			WalkTo(coord);
	})

}

function HandIn(crate) {
	var minister = GoToNPC('Minister')
	Orion.RequestContextMenu(minister.Serial());
	Orion.WaitContextMenuID(minister.Serial(), 2)
	if (Orion.WaitForTarget()) {
		Orion.TargetObject(crate.Serial())
	}
}
function CancelCrate(crate) {
	Orion.RequestContextMenu(crate.Serial());
	Orion.WaitContextMenuID(crate.Serial(), 1)
	if (Orion.WaitForGump(1000)) {
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x1D639EB0')) {
			gump0.Select(Orion.CreateGumpHook(1));
			Orion.Wait(100);
		}
	}
	Orion.CancelContextMenu();
	Orion.Wait(121000);
}

function CheckIfCanDo(crate) {
	var canDo = true;
	var crateprop = crate.Properties().match(/^[\w\s]*:\s\d*\/\d*$/img)

	crateprop.forEach(function (rowMatch) {
		var itemMatch = rowMatch.match(/([\w\s]*):\s(\d*)\/(\d*)/i)
		var actualName = itemMatch[1];
		var nameNoSpace = itemMatch[1];
		var fullfilled = itemMatch[2];
		var amount = itemMatch[3];

		nameNoSpace = nameNoSpace.replace(/\s+/g, '');
		var clilocIds = getIDs(actualName)

		var itemset = tradeItems.filter(function (set) {
			return clilocIds.indexOf(set[0]) > -1 || set[1] === nameNoSpace || set[1] === nameNoSpace.slice(0, -1)
		})
		if (itemset.length == 0) {
			BotPush(actualName + ' not found in tradelist')
			canDo = false
		}
	})
	return canDo
}

function GetItem(crate) {
	Orion.SetCatchBag(crate.Serial())
	Orion.Print('crate found')
	var crateprop = crate.Properties().match(/^[\w\s']*:\s\d*\/\d*$/img)

	crateprop.forEach(function (rowMatch) {
		var itemMatch = rowMatch.match(/([\w\s']*):\s(\d*)\/(\d*)/i)
		var actualName = itemMatch[1];
		var nameNoSpace = itemMatch[1];
		var fullfilled = itemMatch[2];
		var amount = itemMatch[3];

		nameNoSpace = nameNoSpace.replace(/\s+/g, '');

		if (!(fullfilled === amount)) {
			Orion.Print('Item is:' + actualName)
			var clilocIds = getIDs(actualName)
			clilocIds.forEach(function (id) {
				Orion.Print("cliloc:" + id)
			})

			Orion.Wait(200)

			var itemset = tradeItems.filter(function (set) {
				return clilocIds.indexOf(set[0]) > -1 || set[1] === nameNoSpace || set[1] === nameNoSpace.slice(0, -1)
			})[0]

			//Orion.Print(itemset[0])//cliloc
			Orion.Print(itemset[1])//name
			//Orion.Print(itemset[2])//id
			Orion.Print(itemset[3])//npc
			//Orion.Print(itemset[4])//X
			//Orion.Print(itemset[5])//Y
			var shoplist = Orion.GetShopList('Trader')

			fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
			havecount = CountCurrent(actualName)
			needed = amount - havecount
			if (havecount > 0) {
				Orion.Print('Already have ' + actualName)
				Orion.Wait(2000)
				MoveItemsFromPlayer(crate, itemset[2], amount)
				Orion.Wait(1000)
				fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
			}

			if (needed > 0 && fullfilled !== amount) {
				//try twice
				Orion.WalkTo(itemset[4], itemset[5], 0, 1, 255, 1)
				Orion.Print(havecount + '/' + amount + ' : Try Restock by type and name')

				for (var index = 0; index < 2; index++) {
					havecount = CountCurrent(actualName)
					needed = (amount - havecount)
					buying = needed / (itemset[2].split('|').length)
					if (buying != 0) {
						var items =
							[
								//buy by graphic id and name
								new ShopListItem(itemset[2], '0xFFFF', actualName, buying, 0, actualName)
							];
						shoplist.SetItems(items)
						Orion.UpdateShopList(shoplist);

						var npc = GoToNPC(itemset[3])
						Orion.Print('have' + havecount)
						Orion.Print('need' + needed)

						Orion.Print('types' + itemset[2].split('|').length)

						Orion.Print('buying ' + buying + ' ' + actualName)

						Orion.BuyRestock('Trader', npc.Name())
						Orion.Wait(600)
						MoveItemsFromPlayer(crate, itemset[2], needed)
						Orion.Wait(500)
					}
				}

				havecount = CountCurrent(actualName)
				needed = amount - havecount
				Orion.Print('Need To Buy:'+needed)
				if (needed > 0) {
					Orion.Print(havecount + '/' + amount + ' : Try Buy directly')
					var items =
						[
							//buy by graphic id
							new ShopListItem('0xFFFF', '0xFFFF', actualName, 1, 0, actualName)
						];
					shoplist.SetItems(items)
					Orion.UpdateShopList(shoplist);
					Orion.Buy('Trader', npc.Name())
					Orion.Wait(1000)
					if (CountCurrent(actualName) > havecount) {
						Orion.Print('BUYING without Name')
						fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
						havecount = CountCurrent(actualName)
						needed = (amount - havecount)
						buying = needed / (itemset[2].split('|').length)
					
						items =
							[
								//buy by graphic id
								new ShopListItem('0xFFFF', '0xFFFF', actualName, needed, 0, actualName)
							];
						shoplist.SetItems(items)
						Orion.UpdateShopList(shoplist);
						Orion.Buy('Trader', npc.Name())
					}

					Orion.Wait(500)
					MoveItemsFromPlayer(crate, itemset[2], amount)
					Orion.Wait(500)
				}

				havecount = CountCurrent(actualName)
				needed = amount - havecount
				Orion.Print('Need To Buy:'+needed)
				if (needed > 0) {
					Orion.Print(havecount + '/' + amount + ' : Try Buy directly')
					var items =
						[
							//buy by graphic id
							new ShopListItem(itemset[2], '0xFFFF', '', 1, 0, actualName)
						];
					shoplist.SetItems(items)
					Orion.UpdateShopList(shoplist);
					Orion.Buy('Trader', npc.Name())
					Orion.Wait(1000)
					if (CountCurrent(actualName) > havecount) {
						Orion.Print('BUYING without Name')
						fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
						havecount = CountCurrent(actualName)
						needed = (amount - havecount)
						buying = needed / (itemset[2].split('|').length)
					
						items =
							[
								//buy by graphic id
								new ShopListItem(itemset[2], '0xFFFF', '', needed, 0, actualName)
							];
						shoplist.SetItems(items)
						Orion.UpdateShopList(shoplist);
						Orion.Buy('Trader', npc.Name())
					}

					Orion.Wait(500)
					MoveItemsFromPlayer(crate, itemset[2], amount)
					Orion.Wait(500)
				}
			}
			havecount = Orion.Count(itemset[2], any, crate.Serial())
			if (havecount < amount) {
				BotPush('Cannot Get ' + actualName + ' ' + havecount + '/' + amount)
				Orion.PauseScript();
			}
			Orion.Wait(2000)
		}
	})


	Orion.UnsetCatchBag();
}
function StartTradeRoute() {
	Orion.ToggleScript('MonitorTrade');
	while (true) {
		var crates = Orion.FindTypeEx('any', any, backpack).filter(function (item) {
			return Orion.Contains(item.Name(), 'Crate');
		})
		if (crates.length == 0) {
			if (startMinister == null || startMinister.Distance() > 10) {

				StartBritain()
				if (Player.WarMode()) {
					Orion.PauseScript();
				}
			}
			Orion.Wait(1000)
			GetCrate()
			Orion.Wait(1000)

		}
		crates = Orion.FindTypeEx('any', any, backpack).filter(function (item) {
			return Orion.Contains(item.Name(), 'Crate');
		})
		if (crates.length > 0) {
			var crate = crates[0]
			Orion.Print('crate found')
			var city = ((crate.Properties().match(
				/Destination\sCity:\s([\w|\s]*)\n/i) || [])[1] || '')
			Orion.Print(city)
			BotPush('Trade route to:' + city + '\n' + crate.Properties())
			if (CheckIfCanDo(crate)) {
				Orion.Print('I can do it')
				GetItem(crate)
				GoToDestination(city);
				HandIn(crate)
				Orion.Wait(1000)
			}
			else {
				Orion.Print('I canny do it')
				CancelCrate(crate)
				MoveItemsFromPlayer(Orion.FindObject('0x4015E22C'), '0x2831')
			}
		}
	}
}

function MonitorTrade() {
	Orion.Wait(1000)
	while (Orion.ScriptRunning('StartTradeRoute') != 0) {
		Orion.Wait(1000);
		if (Player.Poisoned()) {
			Orion.Wait(5000)
			Orion.CastTarget('Cure', self)
		}
		if (Player.Hits() < (Player.MaxHits() - 5)) {
			Orion.Wait(5000)
			Orion.CastTarget('Greater Heal', self)
			Orion.Wait(2000)
		}
		if (Orion.ScriptRunning('StartTradeRoute') < 0) {
			Orion.ActivateClient();
		}
	}

	BotPush('Script Stopped')
}

function CountCurrent(itemName) {
	return (Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Name(), itemName) })).reduce(function (a, b) {
		return a + b.Count();
	}, 0);
}

function AddBadTile() {
	Orion.SetBadLocation(Player.X(), Player.Y());
}


var britGate = coordinate(1417, 1687)

var gatePoints = [
	['Moonglow', 0],
	['Britain', 1],
	['Jhelom', 2],
	['Yew', 3],
	['Minoc', 4],
	['Vesper', 4],
	['Trinsic', 5],
	['Skara Brae', 6],
	['New Magincia', 7],
	['New Haven', 8],
	['Delucia', 9],
	['Papua', 10],
	['Mistas', 100],
	['Compassion', 101],
	['Honesty', 102],
	['Honor', 103],
	['Humility', 104],
	['Justice', 105],
	['Sacrifice', 106],
	['Spirituality', 107],
	['Valor', 108],
	['Chaos', 109]
]

function GateTo(placeName)
{
WalkTo(britGate,0)
var id = gatePoints.filter(function (place){
return place[0] ===placeName
})
if(id!=null){
Orion.Print(id[0][0])
var gateId = id[0][1]

Orion.UseType('0x0F6C|0x4BCB', '0xFFFF', 'ground');
	if (Orion.WaitForGump(1000)||Orion.GumpExists(any,any,'0xE0E675B8'))
	{
		var gump0 = Orion.GetGump('last');
		if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0xE0E675B8'))
		{
			var gumpHook0 = Orion.CreateGumpHook(1);
			gumpHook0.AddCheck(gateId, true);
			gump0.Select(gumpHook0);
			Orion.Wait(100);
		}
	}
	}
}