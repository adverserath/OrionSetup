function SelectTarget(itemUsage) {
    if (itemUsage != null) {
      Orion.Print("Select your" + itemUsage);
    }
    Orion.WaitForAddObject('myTarget');
    Orion.TargetObject('myTarget');
    var target = Orion.FindObject('myTarget');
    DebugObject(target);
    return target;
  }