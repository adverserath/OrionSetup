function SelectTarget() {
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