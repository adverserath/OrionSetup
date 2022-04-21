function DebugStart(_private) {
	Orion.Print('Method Entry - DebugStart')
  TextWindow.Open();
}

function DebugText(message) {
	Orion.Print('Method Entry - DebugText')
  TextWindow.Print(Orion.Time() + ' : ' + message);
}

function DebugObject(object) {
	Orion.Print('Method Entry - DebugObject')
  if (object == null) {
    DebugText('Target is null');
  }
  else {
    DebugText('Target: Name:' + object.Name()
      + ' Graphic:' + object.Graphic()
      + ' Properties:' + object.Properties());
  }
}


