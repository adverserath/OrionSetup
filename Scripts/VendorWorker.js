//Monitor journal to start script
//Say "VendorName buy" or "VendorName sell" - This will walk within range of the vendor and open the shop screen
//Say "all buy" or "all sell" to go between every npc on the range variable

function SpeakBuy() {
    while (true) {
        var buyMessage = Orion.WaitJournal('', Orion.Now(), 0);
        if (buyMessage != null && buyMessage.Serial() == Player.Serial()) {
            var npc = buyMessage.Text().split(' The')[0].toLowerCase();
            var action = buyMessage.Text().split(' ')[1].toLowerCase();
            VendorAction(action, npc);
        }
    }
}

// Function can be called from another function
// action : buy or sell
// npc : name of npc or "all" to search area
// shopList : list name to use for auto selling and restocking
// range : range to search for npcs (default 20)
var defaultRange = 20;
function VendorAction(action, npc, shopList, npcRange) {
    TextWindow.Print(npc);
    TextWindow.Print(action);

    if (npcRange == null) {
        npcRange = defaultRange;
    }
    var buy = 'buy';
    var sell = 'sell';
    var all = 'all';
    if ((action == buy || action == sell) && npc != null) {
        Orion.CancelContextMenu();
        var vendors = Orion.FindTypeEx(any, any, ground,
            'human|live|ignoreself|ignorefriends', npcRange, '7')
            .filter(function (mob) {
                return (mob.Notoriety() == 7);
            })
            .filter(function (mob) {
                var addNpc = false;
                return (npc === all && (mob.Properties().search("Quest Giver") == -1))
                    || mob.Properties().toLowerCase().search(npc.toLowerCase());
            })
            .sort(function (mobA, mobB) {
                return mobA.X() < mobB.X() && mobA.Y() < mobB.Y();
            });

        while (vendors.length > 0) {
            var vendor = vendors.shift();
            Orion.CancelContextMenu();

            if (vendor.Distance() > 8) {
                Orion.WalkTo(vendor.X(), vendor.Y(), vendor.Z(), 8, Player.Z(), 1, 1);
            }
            if (action == buy) {
                Orion.RequestContextMenu(vendor.Serial());
                Orion.WaitContextMenuCliloc(vendor.Serial(), 3006103);
                if (shopList != null) { Orion.BuyRestock(shopList); }
            }
            else if (action == sell) {
                Orion.RequestContextMenu(vendor.Serial());
                Orion.WaitContextMenuCliloc(vendor.Serial(), 3006104);
                if (shopList != null) { Orion.Sell(shopList); }
            }
            Orion.Wait(1000);
            Orion.CancelContextMenu();
            while (Orion.GumpExists('shop')) {
                Orion.Wait(500);
            }
            vendors.sort(function (mobA, mobB) {
                return mobA.Distance() - mobB.Distance()
            });
        }

    }
}
//3006118
//1153284
//1155001