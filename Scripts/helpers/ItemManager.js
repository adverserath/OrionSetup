function MoveItems(fromContainer, toContainer, graphicIDs, color) {
    DebugText('Sorting');
    if (color == null) {
        DebugText('Any color');
        color = any;
    }
    DebugText('Walking');
    Orion.WalkTo(fromContainer.X(), fromContainer.Y(), fromContainer.Z(), 2, 1, 1, 1);
    DebugText('Here');
    for (var attempt = 0; attempt < 2; attempt++) {
        Orion.FindTypeEx(graphicIDs, color, fromContainer.Serial()).forEach(function (items) {
            DebugText('Moving:' + items.Name());
            Orion.MoveItem(items.Serial(), 0, toContainer.Serial());
            Orion.Wait(800);
        });
    }
}

function MoveItemsFromPlayer(toContainer, graphicIDs) {
    MoveItems(Orion.FindObject('backpack'), toContainer, graphicIDs, any);
}
//#include Scripts/helpers/Target.js

function EmptyTargetXToTargetY(){
EmptyContainerToAnother(SelectTarget(),SelectTarget())
}

function EmptyContainerToAnother(fromContainer, toContainer) {
    WalkTo(toContainer, 2);
    Orion.FindTypeEx(any, any, fromContainer.Serial(), 3).forEach(function (items) {
        Orion.MoveItem(items.Serial(), 0, toContainer.Serial());
        Orion.Wait(800);
    });
}

function Restock(listName) {
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
    var boxes = Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
        return container.Serial() != Player.Serial() && container.Serial() != 0;
    });

    var count = boxes.reduce(function (box, box2) {
        return box + Orion.Count(graphicId, any, box2.Serial(), any, 2, true)
    }, 0);
    return count;
}

function GetEmptyFromListInBackpack(listName) {
    var requiredItems = Orion.GetFindList(listName);
    var result = requiredItems.Items().filter(function (item) {
        DebugText('item:' + item.Comment() + ' ' + Orion.Count(item.Graphic()) + '/' + CountAroundPlayer(item.Graphic()));
        return Orion.Count(item.Graphic()) == 0;
    });
    return result;
}

function listHasEmptyInBackpack(listName) {
    return GetEmptyFromListInBackpack(listName).length > 0;
}
