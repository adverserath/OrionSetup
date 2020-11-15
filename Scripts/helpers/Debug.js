function DebugText(message) {
  if (debug) {
    TextWindow.Print(Orion.Time() + ' : ' + message);
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

