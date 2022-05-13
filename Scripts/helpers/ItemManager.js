//#include helpers/Target.js
//#include helpers/Debug.js

function MoveItems(fromContainer, toContainer, graphicIDs, color, amount, recursive) {
	Debug(' Method Entry - MoveItems')
    if (typeof fromContainer === "string") {
        fromContainer = Orion.FindObject(fromContainer)
    }
    if (typeof toContainer === "string") {
        toContainer = Orion.FindObject(toContainer)
    }

    if (color == null) {
        color = any;
        if (recursive == null) {
            recursive = true
        }
    }
    if (fromContainer.Serial() != backpack) {
        WalkTo(fromContainer, 1)
    }
    if (toContainer.Serial() != backpack) {
        WalkTo(toContainer, 1)
    }
    for (var attempt = 0; attempt < 2; attempt++) {
        var items = Orion.FindTypeEx(graphicIDs, color, fromContainer.Serial(), '', 'finddistance', '', recursive);
        items.forEach(function (item) {
	
            DebugText('Moving:' + item.Name());
            Orion.MoveItem(item.Serial(), 0, toContainer.Serial(), amount);
            Orion.Wait(900);
        });
    }
}

function MoveItemsFromPlayer(toContainer, graphicIDs, color, amount) {
	Debug(' Method Entry - MoveItemsFromPlayer')
    if (typeof toContainer === "string") {
        toContainer = Orion.FindObject(toContainer)
    }
    MoveItems(Orion.FindObject('backpack'), toContainer, graphicIDs, color, amount);
}

function MoveItemsFromBackpackTop(toContainer, graphicIDs, color, amount) {
	Debug(' Method Entry - MoveItemsFromBackpackTop')
    if (typeof toContainer === "string") {
        toContainer = Orion.FindObject(toContainer)
    }
    MoveItems(Orion.FindObject('backpack'), toContainer, graphicIDs, color, amount, false);
}
//#include helpers/Target.js

function EmptyTargetXToTargetY() {
	Debug(' Method Entry - EmptyTargetXToTargetY')
    EmptyContainerToAnother(SelectTarget(), SelectTarget())
}

function EmptyContainerToAnother(fromContainer, toContainer) {
	Debug(' Method Entry - EmptyContainerToAnother')
    WalkTo(toContainer, 2);
    Orion.FindTypeEx(any, any, fromContainer.Serial(), 3).forEach(function (items) {
        DebugText('Moving:' + items.Name());
        Orion.MoveItem(items.Serial(), 0, toContainer.Serial());
        Orion.Wait(850);
    });
    Orion.FindTypeEx(any, any, fromContainer.Serial(), 3).forEach(function (items) {
        DebugText('Moving:' + items.Name());
        Orion.MoveItem(items.Serial(), 0, toContainer.Serial());
        Orion.Wait(850);
    });
}

function Restock(listName) {
	Debug(' Method Entry - Restock')
    var requiredItems = Orion.GetFindList(listName).Items();
    var first = false;
    requiredItems.forEach(function (reqItem) {
	
        var neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), reqItem.Color(), backpack, '', '', true));
        DebugText('item:' + reqItem.Comment() + ' Needed: ' + neededAmount);

        if (neededAmount > 0) {
            Orion.FindTypeEx(any, any, ground, '', 2, '', true).filter(function (container) {
	
                return container.Serial() != Player.Serial();
            })
                .forEach(function (outside) {
	
                    Orion.FindTypeEx(reqItem.Graphic(), reqItem.Color(), outside.Serial(), '', '', '', true).forEach(function (item) {
	
                        DebugText('Getting:' + reqItem.Comment());

                        neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), reqItem.Color(), backpack, '', '', true));
                        if (item.Container() != Player.Serial() && neededAmount > 0) {
                            DebugText(item.Container() + '   ' + neededAmount);
                            //     Orion.WalkTo(item.X(), item.Y(), item.Z(), 0, 1, 1, 1);
                            //   DebugText('Here');
                            Orion.MoveItem(item.Serial(), reqItem.Count());
                            if (!first) { Orion.Wait(600); }
                            first = false;
                        }
                    });
                });
        }
    });
    var successful = requiredItems.filter(function (item) {
	
        DebugText('item:' + (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)));
        return (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)) > 1;
    }).length == 0;
    return successful;
}

function CountAroundPlayer(graphicId) {
	Debug(' Method Entry - CountAroundPlayer')
    var boxes = Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
	
        return container.Serial() != Player.Serial() && container.Serial() != 0;
    });

    var count = boxes.reduce(function (box, box2) {
	
        return box + Orion.Count(graphicId, any, box2.Serial(), any, 2, true)
    }, 0);
    return count;
}

function GetEmptyFromListInBackpack(listName) {
	Debug(' Method Entry - GetEmptyFromListInBackpack')
    var requiredItems = Orion.GetFindList(listName);
    var result = requiredItems.Items().filter(function (item) {
	
        DebugText('item:' + item.Comment() + ' ' + Orion.Count(item.Graphic()) + '/' + CountAroundPlayer(item.Graphic()));
        return Orion.Count(item.Graphic()) == 0;
    });
    return result;
}

function listHasEmptyInBackpack(listName) {
	Debug(' Method Entry - listHasEmptyInBackpack')
    return GetEmptyFromListInBackpack(listName).length > 0;
}

function MoveItemText(text, to, alert) {
	Debug(' Method Entry - MoveItemText')
    if (typeof to === "string") {
        Orion.Print('finding ' + to)
        to = Orion.FindObject(to)
    }
    Orion.FindTypeEx(any, any, backpack)
        .filter(function (item) { return Orion.Contains(item.Properties(), text) })
	
        .forEach(function (loot) {
	
            if (alert) {
                BotPush('Looted' + loot.Name())
            }
            DebugText('Moving:' + loot.Name());
            Orion.MoveItem(loot.Serial(), 0, to.Serial())
            Orion.Wait(850);
        })
}

function MoveItemTextFromTo(text, from, to) {
	Debug(' Method Entry - MoveItemTextFromTo')
    if (typeof to === "string") {
        to = Orion.FindObject(to)
    }
    if (typeof from === "string") {
        from = Orion.FindObject(from)
    }
    if (to.Distance() > 2 || from.Distance() > 2) {
        WalkTo(from);
        WalkTo(to);
    }
    Orion.FindTypeEx(any, any, from.Serial(), '', '', 10, true)
        .filter(function (item) { return Orion.Contains(item.Properties(), text) })
	
        .sort(function (item) { return Orion.Random(0, 2) > 0 ? -1 : 1 })
	
        .forEach(function (loot) {
	
            Orion.Wait(400)
            DebugText('Moving:' + loot.Name());
            Orion.MoveItem(loot.Serial(), 0, to.Serial())
            Orion.Wait(400);
        })

    Orion.FindTypeEx(any, any, from.Serial())
        .filter(function (item) { return Orion.Contains(item.Properties(), 'Contents') })
	
        .forEach(function (container) {
	
            if (!Orion.GumpExists('container', container.Serial())) {
                Orion.Print('Searching ' + from.Name())
                Orion.Wait(400)
                Orion.OpenContainer(container.Serial())
                Orion.Boxhack(container.Serial());
                Orion.Wait(600)
            }
            MoveItemTextFromTo(text, container, to)
        })
}

function MoveScrolls(scrollBox) {
	Debug(' Method Entry - MoveScrolls')
    var firstScroll = parseInt('0x1F2D');
    for (var index = 0; index < 65; index++) {
        var scrollId = '0x' + (firstScroll + index).toString(16).toUpperCase();
        Orion.FindTypeEx(scrollId, any, backpack)
            .forEach(function (loot) {
	
                MoveItemsFromPlayer(scrollBox, loot.Graphic())
            })
    }
}