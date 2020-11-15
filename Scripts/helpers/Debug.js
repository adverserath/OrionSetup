function DebugStart() {
  TextWindow.Open();
}

function DebugText(message) {
  TextWindow.Print(Orion.Time() + ' : ' + message);
}

function DebugObject(object) {
  if (object == null) {
    DebugText('Target is null');
  }
  else {
    DebugText('Target: Name:' + object.Name()
      + ' Graphic:' + object.Graphic()
      + ' Properties:' + object.Properties());
  }
}


