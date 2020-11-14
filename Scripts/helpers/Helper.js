function SelectTarget(itemUsage) {
  if (itemUsage != null) {
    Orion.Print("Select your" + itemName);
  }
  Orion.WaitForAddObject('myTarget');
  Orion.TargetObject('myTarget');
  var target = Orion.FindObject('myTarget');
  DebugObject(target);
  return target;
}

function DebugText(message) {
  if (debug) {
    TextWindow.Print(message);
  }
}

function DebugObject(object) {
  if (debug) {
    if (object == null) {
      DebugText('Target is null');
    }
    else {
      DebugText('Target: Name:' + object.Name()
        + ' Graphic:' + object.Graphic()
        + ' Properties:' + object.Properties());
    }
  }
}

function MoveItems(containerItem, graphicIDs) {
  Orion.WalkTo(container.X(), container.Y(), container.Z(), 2, 1, 1, 1);
  Orion.FindTypeEx(graphicIDs, any, backpack).forEach(function (items) {
    Orion.MoveItem(items.Serial(), 0, container.Serial());
    Orion.Wait(800);
  });
}