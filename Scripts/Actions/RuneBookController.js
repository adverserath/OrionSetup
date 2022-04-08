// button \d* 65 2103 2104 1 0 \d* 
// croppedtext \d* 60 115 17 (\d*) (\d*)    //TextColour PlaceName
// htmlgump \d* 80 130 38 (\d*) 0 0         //Coordinate
// button \d* 115 2437 2438 1 0 \d* 
// xmfhtmlgump \d* 115 100 18 1011298 0 0 
// button \d* 20 \d* \d* 1 0 \d* 
// xmfhtmlgump \d* 15 100 18 1011300 0 0 
// button \d* 140 2103 2104 1 0 (\d*)        //RecallButton
// xmfhtmlgump \d* 136 110 20 1062722 0 0 
// button \d* 158 2103 2104 1 0 (\d*)        //GateButton
// xmfhtmlgump \d* 154 110 20 1062723 0 0 
// button \d* 176 2103 2104 1 0 (\d*)        //Sacred Journey Button
// xmfhtmlgump \d* 172 110 20 1062724 0 0 

//Loop through books
//Get Gump
//Scan Regex
//Get all place names
//Get all sextants/Convert to coordinates
//Store placename/map/X/Y/runebook/recall/gate/sacred


//on USE
//Get location/Map
//filter buttons by map
//Find closest to target and is pathable
//If target!=currentlyPathable && currentDistance>ClosestMatch
//recall or sacred
//WalkTo destination