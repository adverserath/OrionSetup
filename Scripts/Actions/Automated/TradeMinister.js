

var walkableCities = ['Vesper', 'Trinsic', 'Minoc', 'Yew']
var paths = [
	['Vesper', [coordinate(1664, 1512), coordinate(2028, 920), coordinate(2116, 898), coordinate(2473, 978), coordinate(3007, 828)]],
	['Trinsic', [coordinate(1367, 1757), coordinate(1348, 1963), coordinate(1471, 2148), coordinate(1696, 2731), coordinate(2054, 2854)]],
	['Minoc', [coordinate(1664, 1512), coordinate(2028, 920), coordinate(2407, 751), coordinate(2502, 400)]],
	['Yew', [coordinate(1367, 1757), coordinate(1090, 1939), coordinate(716, 1336), coordinate(620, 1048)]],
	['Skara Brae', [coordinate(1367, 1757), coordinate(1090, 1939), coordinate(720, 2235)]]
]

var returned = true;

function GoToNPC(typeName) {
	var npc = Orion.FindTypeEx('any', any, ground, 'mobile', 45, 'yellow')
		.filter(function (_npc) {
			return Orion.Contains(_npc.Properties(), typeName);
		})
	if (npc.length > 0) {
		TextWindow.Print('found')
		npc = npc[0]
		WalkTo(npc)
		return npc
	}
	TextWindow.Print('no found')
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

function GoToStart(_private) {
	var runebook = Orion.FindTypeEx('0x22C5', 'any', backpack)
	.filter(function (book){return Orion.Contains(book.Properties(), 'Trade')}).shift()
	RecallRune(runebook)
	Orion.Wait(500)
}

function GoToDestination(destination) {
	paths.filter(function (_path) { return _path[0] === destination })[0][1].forEach(function (coord) {
		if (coord === 'gate') {
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
	returned = false
	Orion.Wait(4000)
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
}

function CheckIfCanDo(crate) {
	var canDo = true;
	var crateprop = crate.Properties().match(/^[\w\s\']*:\s\d*\/\d*$/img)

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
	TextWindow.Print('Catch Bag :' +  crate.Serial())
	FillFromBackpack(crate)
	Orion.SetCatchBag(crate.Serial())

	var crateprop = crate.Properties().match(/^[\w\s']*:\s\d*\/\d*$/img)

	crateprop.forEach(function (rowMatch) {
		var itemMatch = rowMatch.match(/([\w\s']*):\s(\d*)\/(\d*)/i)
		var actualName = itemMatch[1];
		var nameNoSpace = itemMatch[1];
		var fullfilled = itemMatch[2];
		var amount = itemMatch[3];

		TextWindow.Print('itemMatch1 :' +  itemMatch[1])
		TextWindow.Print('amount :' +  itemMatch[3])
		TextWindow.Print('fullfilled :' +  itemMatch[2])

		nameNoSpace = nameNoSpace.replace(/\s+/g, '');
		TextWindow.Print('nameNoSpace :' +  nameNoSpace)

		if (!(fullfilled === amount)) {
			TextWindow.Print('Item is:' + actualName)
			var clilocIds = getIDs(actualName)
			clilocIds.forEach(function (id) {
				TextWindow.Print("cliloc:" + id)
			})

			Orion.Wait(200)

			var itemset = tradeItems.filter(function (set) {
				return clilocIds.indexOf(set[0]) > -1 || set[1] === nameNoSpace || set[1] === nameNoSpace.slice(0, -1)
			})[0]

			TextWindow.Print('cliloc ' + itemset[0])//cliloc
			TextWindow.Print('name ' + itemset[1])//name
			TextWindow.Print('type ' + itemset[2])//type
			TextWindow.Print('npc ' + itemset[3])//npc
			TextWindow.Print('X ' + itemset[4])//X
			TextWindow.Print('Y ' + itemset[5])//Y

			var shoplist = Orion.GetShopList('Trader')

			fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
			havecount = CountCurrent(actualName)
			needed = amount - havecount
			if (havecount > 0) {
				TextWindow.Print('Already have ' + actualName)
				Orion.Wait(2000)
				//MoveItemsFromPlayer(crate, itemset[2], any, amount)
				FillFromBackpack(crate)
				Orion.Wait(1000)
				fullfilled = crate.Properties().indexOf(actualName + ': ' + amount + '/' + amount) > -1
				TextWindow.Print('Is now fullfilled: ' + fullfilled)
			}

			if (needed > 0 && fullfilled !== amount) {
				//try twice
				Orion.WalkTo(itemset[4], itemset[5], 0, 1, 255, 1)
				TextWindow.Print(havecount + '/' + amount + ' : Try Restock by type and name')

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
						TextWindow.Print('have' + havecount)
						TextWindow.Print('need' + needed)

						TextWindow.Print('types' + itemset[2].split('|').length)

						TextWindow.Print('buying ' + buying + ' ' + actualName)

						Orion.BuyRestock('Trader', npc.Name())
						Orion.Wait(600)
						//MoveItemsFromPlayer(crate, itemset[2], any, amount)
						FillFromBackpack(crate)
						Orion.Wait(500)
					}
				}

				havecount = CountCurrent(actualName)
				needed = amount - havecount
				TextWindow.Print('Need To Buy:' + needed)
				if (needed > 0) {
					TextWindow.Print(havecount + '/' + amount + ' : Try Buy directly')
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
						TextWindow.Print('BUYING without Name')
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
					//MoveItemsFromPlayer(crate, itemset[2], any, amount)
					FillFromBackpack(crate)
					Orion.Wait(500)
				}

				havecount = CountCurrent(actualName)
				needed = amount - havecount
				TextWindow.Print('Need To Buy:' + needed)
				if (needed > 0) {
					TextWindow.Print(havecount + '/' + amount + ' : Try Buy directly')
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
						TextWindow.Print('BUYING without Name')
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
					TextWindow.Print('Move ' + amount + ' ' + itemset[2] + ' to '+ crate.Serial())
					//MoveItemsFromPlayer(crate, itemset[2], any, amount)
					FillFromBackpack(crate)
					Orion.Wait(500)
				}
			}
			var itemsInBp = Orion.FindTypeEx(itemset[2], any, backpack, '', '', '', false)
			if (itemsInBp.length > 0) {
				itemsInBp.forEach(function (item) {
					Orion.MoveItem(item, 0, crate.Serial())
					Orion.Wait(1000)
				})
			}
			havecount = Orion.Count(itemset[2], any, crate.Serial())
			if (havecount < amount) {
				//MoveItemsFromPlayer(crate, itemset[2], any, amount)
				FillFromBackpack(crate)
			}
			Orion.OpenContainer(crate.Serial())
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
	Orion.ToggleScript('DanDar');
	while (true) {
		var crates = Orion.FindTypeEx('any', any, backpack).filter(function (item) {
			return Orion.Contains(item.Name(), 'Crate');
		})
		if (crates.length == 0) {
			if (startMinister == null || startMinister.Distance() > 10) {

				GoToStart()
				while (Player.WarMode()) {
					Orion.Wait(1000)
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
			TextWindow.Print('crate found')
			var city = ((crate.Properties().match(
				/Destination\sCity:\s([\w|\s]*)\n/i) || [])[1] || '')
			TextWindow.Print(city)
			BotPush('Trade route to:' + city + '\n' + crate.Properties())
			if (walkableCities.indexOf(city) != -1 && CheckIfCanDo(crate)) {
				TextWindow.Print('I can do it')
				GetItem(crate)
				GoToDestination(city);
				HandIn(crate)
				Orion.Wait(1000)
			}
			else {
				TextWindow.Print('I canny do it')
				var startWait = Orion.Now()
				CancelCrate(crate)

				if(!returned)
				{
					returned = true
					ReturnHomeSortLoot()			
				}

				GoToStart()
				while(Orion.Now() - startWait <121000)
				{
				Orion.Wait(5000)
				}
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
			BotPush('Script Paused}')
			while(Orion.ScriptRunning('StartTradeRoute')<0)
			{
				Orion.Wait(2000)
			}
		}
	}
	BotPush('Script Stopped')
}

function FillFromBackpack(crate)
{
	Orion.RequestContextMenu(crate.Serial());
	Orion.WaitContextMenuID(crate.Serial(), 0);
}
function CountCurrent(itemName) {
	return (Orion.FindTypeEx(any, any, backpack).filter(function (item) { return Orion.Contains(item.Name(), itemName) })).reduce(function (a, b) {
		return a + b.Count();
	}, 0);
}

function AddBadTile() {
	Orion.SetBadLocation(Player.X(), Player.Y());
}


//#include helpers/Target.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include helpers/Debug.js

//#include helpers/Notifier.js
//#include WIP/TestScripts.js
//#include helpers/Gates.js

//#include Actions/Automated/Cartographer.js
//#include helpers/TradeItems.js
//#include helpers/cliloc.js