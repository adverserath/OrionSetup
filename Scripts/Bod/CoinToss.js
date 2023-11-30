var preitems
var serialsCount
var postItems
var gembag
var newItemStr = ''

function TossACoin() {
	if (Player.Weight() > Player.MaxWeight()) {
		BotPush(Player.Name() + ' has a full bag')
		Orion.PauseScript()
	}
	if (GetBackpackItemCount(Orion.ObjAtLayer(21))>120) {
		BotPush(Player.Name() + ' too many items in bag')
		Orion.PauseScript()
	}
	
	preitems = GetItemsList()
	
	serialsCount = preitems.map(function (item) { 
	var serialCount = item.Serial()+item.Count()
	Orion.Print(item.Name() +'   '+ serialCount)
	return serialCount 
	})
	
	gembag = GetGemBag()

	var coins = Orion.FindTypeEx('0x0F87')
	if (coins.length > 1) {
		coins.forEach(function (coin) {
			Orion.MoveItem(coin.Serial(), 1, 'backpack', 1, 1, 1);
			Orion.Wait(1000)
		})
		coins = Orion.FindTypeEx('0x0F87')
	}

	if (coins.length == 1 && coins[0].Count() > 1) {
		Orion.MoveItem(coins[0].Serial(), 1, 'backpack', 1, 1, 1);
		Orion.Wait(1000)
	}
	var newCoins = Orion.FindTypeEx('0x0F87')

	if (newCoins.length == 0) {
		BotPush(Player.Name() + ': no coins')
		return
		//Orion.PauseScript()
		//newCoins = Orion.FindTypeEx('0x0F87')
	}
	if (newCoins.length == 1) {
		BotPush(Player.Name() + ': only 1 coin')
		return
		//Orion.PauseScript()
		//newCoins = Orion.FindTypeEx('0x0F87')
	}
	if (newCoins.length > 1) {
		Orion.UseObject(newCoins[0].Serial());
		if (Orion.WaitForTarget(1000)) {
			Orion.Wait(1000)
			Orion.MoveItem(newCoins[0].Serial(), 1, 'backpack');
			Orion.Wait(500)
			Orion.TargetObject('0x400000A0');
			//Orion.TargetObject('0x40016073');
			Orion.Print(newCoins[0].Exists())
		}
	}
	Orion.Wait(1000)
	ProcessNewItem()
	Orion.Wait(300)

	BotPush(Player.Name() + ':' + Player.Serial() + '\n' + 
	' Coins: ' + coins[0].Count() + ' Weight: ' + Player.Weight() + '/' + Player.MaxWeight() + '\n' + 
	Orion.LastJournalMessage().Text() + '\n' + 
	newItemStr, true)

}
function ProcessNewItem(_) {
	postItems = GetItemsList().filter(function (item) {
		return serialsCount.indexOf(item.Serial()+item.Count()) == -1 && item.Graphic() != 0x0F87
	})

	var itemNames = postItems.map(function (item) { return item.Name() }).toString().replace(/,/g, '\n')
	if (postItems.length > 0) {
		newItemStr = (Player.Name() + ' Rewarded:\n' + itemNames)
		var newItem = postItems.shift()
		Orion.Print(newItem != null)
		Orion.Print(newItem.Name())
		if (newItem != null && newItem.Graphic() == 0x0E76 && gembag != null) {
			EmptyContainerToAnother(newItem, gembag)
		}
	}

}

function GetItemsList(_) {
	//return Orion.FindTypeEx(any, any, backpack)
	return Orion.FindTypeEx(any, any, backpack, 'item', 0, '', false);
}

function GetWeight(item) {
	return item.Properties().match(/Contents:\s\d*\/125 Items,\s(\d*) Stones/im)[1]
}

function GetBackpackItemCount(item) {
var itemCount =  item.Properties().match(/Contents:\s(\d*)\/125 Items,\s\d*(:?\/\d*) Stones/im)[1]
Orion.Print(itemCount)
	return itemCount
}

function GetGemBag(_) {
	return Orion.FindTypeEx(0x0E76, any, backpack, 'item', 0, '', false)
		.sort(function (bagA, bagB) {
			return GetWeight(bagB) - GetWeight(bagA)
		})
		.shift()
}

//#include helpers/Generic.js
//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/ItemManager.js
//#include helpers/Notifier.js
