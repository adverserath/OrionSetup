
function TestResponseAllControls(unused)
{
	var code = CustomGumpResponse.ReturnCode();
	Orion.Print('Custom gump response code = ' + code);

	if (code == 0)
	{
		var gump = Orion.CreateCustomGump(15);
		gump.Close();
	}
	else if (code == 2) // Button tile art, reset page index
	{
		var gump = Orion.CreateCustomGump(15);
		gump.SetPage(0);
		gump.Update();
	}
	else if (code == 3) // Custom button, print response info
	{
		Orion.Print('Custom gump serial ' + CustomGumpResponse.Serial());

		Orion.Print('Checked checkboxes: ' + CustomGumpResponse.Checks());
		Orion.Print('Checked radio buttons: ' + CustomGumpResponse.Radios());

		var texts = CustomGumpResponse.Texts();

		for (var i = 0; i < texts.length; i++)
			Orion.Print('Text entry data, index: ' + texts[i].Index() + ' text: ' + texts[i].Text());

		var sliders = CustomGumpResponse.Sliders();

		for (var i = 0; i < sliders.length; i++)
			Orion.Print('Slider data, index: ' + sliders[i].Index() + ' value: ' + sliders[i].Value());

		var minMaxButtons = CustomGumpResponse.MinMaxButtons();

		for (var i = 0; i < minMaxButtons.length; i++)
			Orion.Print('MinMaxButtons data, index: ' + minMaxButtons[i].Index() + ' value: ' + minMaxButtons[i].Value());

		var comboBoxes = CustomGumpResponse.ComboBoxes();

		for (var i = 0; i < comboBoxes.length; i++)
			Orion.Print('ComboBox data, index: ' + comboBoxes[i].Index() + ' selected item index: ' + comboBoxes[i].Value());

		Orion.Print('Expanded spoilers: ' + CustomGumpResponse.Spoilers());
	}
}

function TestCustomGumpAllControls()
{
	// Create new custom gump with serial 15
	var gump = Orion.CreateCustomGump(15);
	
	// This gump will be no closible by a right mouse click
	gump.SetNoClose(true);
	
	// Clear gump cpntents (for rebuilds)
	gump.Clear();

	// Set callback function
	gump.SetCallback('TestResponseAllControls');

	// Main background
	gump.AddResizepic(0, 0, '13BE', 900, 500);

	var itemSerial = 1;

	// Buttons section
	gump.AddText(36, 15, '0', "Close button:");
	gump.AddButton(0, 45, 35, '0x00F3', '0x00F2', '0x00F1', '0');

	gump.AddText(20, 65, '0', "Change page button:");
	gump.AddButton(itemSerial++, 45, 85, '0x00F6', '0x00F5', '0x00F4', '0', 0, 2);

	gump.AddText(15, 115, '0', "Test button tile art:");
	gump.AddButtonTileArt(itemSerial++, 45, 135, '0x00F9', '0x00F7', '0x00F8', '0', '0x09AB', '0x0009', 10, 25);

	gump.AddResizepic(25, 215, '0x24EA', 100, 30, itemSerial++, 1);
	gump.AddText(32, 220, '0', "Custom button");



	// Checkboxes and radio buttons section
	gump.AddCheckbox(itemSerial++, 170, 20, '0x00D2', '0x00D2', '0x00D3', 1);
	gump.AddCheckbox(itemSerial++, 170, 40, '0x00D2', '0x00D2', '0x00D3', 0, '0', 'Checkbox 2 (unchecked)');
	gump.AddCheckbox(itemSerial++, 170, 60, '0x00D2', '0x00D2', '0x00D3', 1, '0', 'Checkbox 3 (red)', '0x0020');
	gump.AddCheckbox(itemSerial++, 170, 80, '0x00D2', '0x00D2', '0x00D3', 1, '0x0010', 'Colored checkbox 4', '0x001F');

	// Radios group 1
	gump.AddGroup(1);
	gump.AddRadio(itemSerial++, 170, 120, '0x00D0', '0x00D0', '0x00D1', 0);
	gump.AddRadio(itemSerial++, 170, 140, '0x00D0', '0x00D0', '0x00D1', 1, '0', 'Radio 2 G1');
	gump.AddRadio(itemSerial++, 170, 160, '0x00D0', '0x00D0', '0x00D1', 0, '0', 'Radio 3 G1 (yellow)', '0x0035');

	// Radios group 2
	gump.AddGroup(2);
	gump.AddRadio(itemSerial++, 170, 190, '0x00D0', '0x00D0', '0x00D1', 0, '0', 'Radio 4 G2');
	gump.AddRadio(itemSerial++, 170, 210, '0x00D0', '0x00D0', '0x00D1', 0, '0x0022', 'Radio 5 G2');
	gump.AddRadio(itemSerial++, 170, 230, '0x00D0', '0x00D0', '0x00D1', 1, '0', 'Radio 6 G2 (green)', '0x0044');



	// Tilepics and gumppics section
	gump.AddText(360, 20, '0', "How much is the fish?!?");
	gump.AddTilePic(360, 45, '0x09CC');
	gump.AddResizepic(410, 50, '0x0BB8', 90, 30);
	gump.AddMinMaxButtons(itemSerial++, 460, 56, '0x0037', 0, 0, 100000, 3500);
	gump.SetTextParameters(1, 'LeftCenter');

	gump.AddGumpPic(320, 50, '0x0065');
	// Load external image
	gump.AddText(370, 170, '0', '<img src="http://orionuo.online/grcat.png" width=130 height=100>');

	// Scaled gumppics/tilepics are not supported, but...Orion can do it
	gump.AddText(380, 340, '0xFFFE', '<img src="gump:0x0041" width=100 height=100>');
	for (var i = 0, j = 0; i < 9; i++)
	{
		if (i == 4)
			gump.AddTilePic(330 + i * 20, 284, '0x0B1A');
		else
		{
			gump.AddTilePic(330 + i * 20, 284, 0x1853 + j);
			j++;
		}
	}
	gump.AddTilePic(485, 340, '0x0C84');
	gump.AddTilePic(335, 340, '0x0C84');
	gump.AddTilePic(445, 330, '0x2102');
	gump.AddTilePic(400, 360, '0x09CC', '0', 0, '0', 1);
	gump.AddTilePic(425, 355, '0x09BA', '0', 0, '0', 1);
	gump.AddTilePic(405, 370, '0x09CF', '0', 0, '0', 1);
	gump.AddTilePic(405, 350, '0x09AD');
	gump.AddTilePic(430, 390, '0x09AD');
	gump.AddTilePic(385, 390, '0x09AD');
	gump.AddTilePic(335, 390, '0x09BB');
	// Colorise the pig with a global RGB color
	gump.AddGlobalColor(1, "#FF00FF");
	gump.AddTilePic(475, 390, '0x09BB');
	gump.AddGlobalColor(0);
	
	// Colorise the pig with a global RGBA color
	gump.AddBlending(1);
	gump.AddGlobalColor(1, "#7FFF00FF");
	gump.AddTilePic(515, 390, '0x09BB');
	gump.AddGlobalColor(0);
	gump.AddBlending(0);

	// Slider
	gump.AddSlider(itemSerial++, 390, 460, '0x00D8', '0x00D8', '0x00D8', '0x00D5', 1, 0, 90, 0, 255, 100);
	gump.SetTextParameters(1, 'Right', 0, 0, 0, 'Left');



	// ComboBox section
	gump.AddComboBox(itemSerial++, 15, 260, '0x0BB8', 0, '0x0BB8', 200, -3);
	
	gump.AddComboBoxText('Item 1');
	gump.AddComboBoxText('Auto selected colored item 2', '0x0021', 1);
	gump.AddComboBoxText('Colored item 3', '0x0006');
	// Width required to aligned items
	gump.AddComboBoxText('Item 4 center aligned', '0', 0, 190, 'center');
	gump.AddComboBoxText('Item 5 right aligned', '0', 0, 190, 'right');



	// Text entry section
	gump.AddResizepic(25, 295, '0x0BB8', 200, 20);
	gump.AddTextEntry(itemSerial++, 30, 295, '0x0035', 'User text 1', 190, 20);
	
	gump.AddResizepic(25, 320, '0x0BB8', 200, 20);
	gump.AddTextEntry(itemSerial++, 30, 320, '0x0052', '', 190, 20);
	gump.SetTextEntryPlaceholderText('Enter your name');


	// Hitbox section
	gump.AddGumpPic(200, 270, '0x0009');
	gump.AddGumpPic(200 + 45, 270 + 30, '0x0045');
	//gump.AddGumpPic(320 + 45, 50 + 30, '0x0046');
	// Click on corpse eyes
	gump.AddHitBox(itemSerial++, 200 + 45, 270 + 30, 60, 30, 1);
	
	gump.AddTilePic(235, 396, '0x1BC4', '0', itemSerial++, '0x0035');



	// Scissor section
	gump.AddGumpPic(15, 350, '0x004D');
	gump.AddTilePic(75, 396, '0x099E');
	gump.AddTilePic(95, 396, '0x09C4');
	gump.AddTilePic(115, 396, '0x09A2');

	gump.AddScissor(1, 0, 0, 50, 440, 50, 50);
	gump.AddGumpPic(15, 420, '0x004D');
	gump.AddScissor(0);



	// HTML gump section
	var htmlSerial = itemSerial++;
	gump. AddHtmlGump(htmlSerial, 580, 15, 300, 170, '0x0BB8');

	// Select HTML gump as current container for new items
	gump.Select('htmlgump', htmlSerial);

	var step = 18;
	var x = 5;
	var y = 2;
	gump.AddText(x, y, '0', "Name: {name}");
	y += step;
	gump.AddText(x, y, '0', "Name with notoriety color: {namenoto}");
	y += step;
	gump.AddText(x, y, '0', "Str: <basefont color='magenta'>{str}");
	y += step;
	gump.AddText(x, y, '0', "Int: <basefont color='magenta'>{int}");
	y += step;
	gump.AddText(x, y, '0', "Dex: <basefont color='magenta'>{dex}");
	y += step;
	gump.AddText(x, y, '0', "Hits: <basefont color='red'>{hits}</basefont>/<basefont color='red'>{maxhits}</basefont> (<basefont color='red'>{hits%}%</basefont>)");
	y += step;
	gump.AddText(x, y, '0', "Mana: <basefont color='cyan'>{mana}</basefont>/<basefont color='cyan'>{maxmana}</basefont> (<basefont color='cyan'>{mana%}%</basefont>)");
	y += step;
	gump.AddText(x, y, '0', "Stam: <basefont color='green'>{stam}</basefont>/<basefont color='green'>{maxstam}</basefont> (<basefont color='green'>{stam%}%</basefont>)");
	y += step;
	gump.AddText(x, y, '0', "Weight: <basefont color='olive'>{weight}</basefont>/<basefont color='olive'>{maxweight}</basefont> (<basefont color='olive'>{weight%}%</basefont>)");
	y += step;
	gump.AddText(x, y, '0', "Armor: <basefont color='teal'>{armor}");
	y += step;
	gump.AddText(x, y, '0', "Gold: <basefont color='yellow'>{gold}</basefont> (GP in pack: <basefont color='yellow'>{item:0x0EED}</basefont>)");
	y += step;
	gump.AddText(x, y, '0', "Followers: <basefont color='gray'>{followers}</basefont>/<basefont color='gray'>{maxfollowers}</basefont>");

	// Reset container for new items to gump
	gump.Select('gump');



	// Spoiler section
	var spoilerSerial = itemSerial++;
	gump.AddSpoiler(spoilerSerial, 580, 200, 1, 290, Player.Graphic(), '0x0827', '0x0827', '0x0826', '0x0826', '0x0826');
	gump.SetSpoilerText('Is spoiler o.O', 0, 0x0035, 0x0021);

	// Select spoiler as current container for new items
	gump.Select('spoiler', spoilerSerial);

	x = 5;
	y = 5;
	gump.AddTilePic(x, y, '0x19B8');
	gump.AddText(x + 38, y + 3, '0', "Total ores: {item:0x19B7|0x19B8|0x19B9|0x19BA}");
	y += 30;

	gump.AddTilePic(x, y, '0x19B8');
	gump.AddText(x + 38, y + 3, '0', "Iron ores: {item:0x19B7|0x19B8|0x19B9|0x19BA,0}");
	y += 30;

	gump.AddTilePic(x, y, '0x19B8', '0x0590');
	gump.AddText(x + 38, y + 3, '0', "Green ores: {item:0x19B7|0x19B8|0x19B9|0x19BA,0x0590}");
	y += 30;

	gump.AddTilePic(x, y, '0x19B8', '0x0058');
	gump.AddText(x + 38, y + 3, '0', "Blue ores: {item:0x19B7|0x19B8|0x19B9|0x19BA,0x0058}");
	y += 30;

	gump.AddTilePic(x, y, Player.Graphic(), '0x008F');
	gump.AddText(x + 38, y + 3, '0', "Orange ores: {item:0x19B7|0x19B8|0x19B9|0x19BA,0x008F}");
	y += 30;

	// Reset container for new items to gump
	gump.Select('gump');



	// Satanic page 2 section
	gump.AddPage(2);

	gump.AddBlending(1);
	gump.AddColoredPolygone(0, 0, 900, 500, "#4FFF0000");
	gump.AddBlending(0);

gump.AddGumpPic(10, 10, Player.Graphic(), 'red');
	gump.AddLine(25, 25, 100, 175, "red", 3);
	gump.AddLine(100, 175, 175, 25, "red", 3);
	gump.AddLine(0, 125, 200, 125, "red", 3);
	gump.AddLine(0, 125, 175, 25, "red", 3);
	gump.AddLine(25, 25, 200, 125, "red", 3);
	
	gump.AddGlobalColor(1, "#FF00FF");
	
	gump.AddTilePic(-15, 110, '0x09E9');
	gump.AddTilePic(180, 105, '0x09CC');
	gump.AddTilePic(8, 12, '0x1BF1');
	gump.AddTilePic(150, 12, '0x1BE1');
	gump.AddTilePic(78, 155, '0x0EEF');
	
	gump.AddGlobalColor(0);
	
	gump.AddTilePic(78, 55, '0x1FD5', '0x0021');

	// Commit gump changes and update it in client
	gump.Update();
}