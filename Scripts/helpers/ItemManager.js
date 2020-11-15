function MoveItems(containerItem, graphicIDs) {
    Orion.WalkTo(containerItem.X(), containerItem.Y(), containerItem.Z(), 2, 1, 1, 1);
    Orion.FindTypeEx(graphicIDs, any, backpack).forEach(function (items) {
      Orion.MoveItem(items.Serial(), 0, containerItem.Serial());
      Orion.Wait(800);
    });
  }

  function Restock(listName) {
    var requiredItems = Orion.GetFindList(listName).Items();
    requiredItems.forEach(function (reqItem) {
        var neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), any, backpack, '', '', true));
        DebugWrite('item:' + reqItem.Comment() + ' Needed: ' + neededAmount);

        if (neededAmount > 0) {
            Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
                return container.Serial() != Player.Serial();
            })
                .forEach(function (outside) {
                    Orion.FindTypeEx(reqItem.Graphic(), any, outside.Serial(), '', 2, '', true).forEach(function (item) {
                        neededAmount = (reqItem.Count() - Orion.Count(reqItem.Graphic(), any, backpack, '', '', true));
                        if (item.Container() != Player.Serial() && neededAmount > 0) {
                            DebugWrite(item.Container() + '   ' + neededAmount);
                            Orion.MoveItem(item.Serial(), neededAmount);
                            Orion.Wait(300);
                        }
                    });
                });
        }
    });
    var successful = requiredItems.filter(function (item) {
        DebugWrite('item:' + (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)));
        return (item.Count() - Orion.Count(item.Graphic(), any, backpack, '', '', true)) > 1;
    }).length == 0;
    return successful;
}

function CountAroundPlayer(graphicId) {
    var boxes = Orion.FindTypeEx(any, any, ground, '', '', '', true).filter(function (container) {
        return container.Serial() != Player.Serial() && container.Serial()!=0;
    });
   
    var count = boxes.reduce(function (box,box2) {
    return box + Orion.Count(graphicId, any, box2.Serial(), any, 2, true)
    },0);
return count;
}

function GetEmptyFromListInBackpack(listName) {
    var requiredItems = Orion.GetFindList(listName);
    var result = requiredItems.Items().filter(function (item) {
        DebugWrite('item:' + item.Comment() + ' ' + Orion.Count(item.Graphic()) + '/' + CountAroundPlayer(item.Graphic()));
        return Orion.Count(item.Graphic()) == 0;
    });
    return result;
}

function listHasEmptyInBackpack(listName) {

    return GetEmptyFromListInBackpack(listName).length > 0;
}