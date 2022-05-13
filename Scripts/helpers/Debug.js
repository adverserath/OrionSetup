function DebugStart(_private) {
  TextWindow.Open();
}

function DebugText(message) {
  TextWindow.Print(new Date().toISOString().replace(/[A-Za-z]/g,' ') + ' : ' + message);
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

function Debug(input)
{
  if (typeof input === "string") {
    DebugText(input)
  }
  else if (input ==null)
  {
	  DebugText('null object')
  }
  else{
  	DebugObject(input)
  }
}
