//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include Bod/Bods.js
//#include Bod/BodData.js
var tool = null;
var bodItemList = []

function CreateAllItemMap() {
    ReadBodFile()
    tool = SelectTarget().Graphic()
    TextWindow.Open()
    //open tool manually
    var newmapping = [] // load existing items from json
    var gump = Orion.GetLastGump()
    var leftButtons = []

    var buttonList = gump.CommandList().filter(function (command) {
        return Orion.Contains(command.toString(), 'button 15')
    })
    buttonList.forEach(function (button) {

        var matched = button.match(/button\s15\s(\d*)(?:\s\d*){4}\s(\d*) /)
        if (parseInt(matched[1]) > 60 && parseInt(matched[1]) < 270) {
            leftButtons.push(matched[2])
        }
    })

    leftButtons.forEach(function (button) {
        var gump1 = Orion.GetGump('last');
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x38920ABD')) {
            Orion.Print(button)

            gump1.Select(Orion.CreateGumpHook(parseInt(button)));
            Orion.Wait(1000);
            MapAllItems(button)
        }
    })
    WriteBodFile()
}

function MapAllItems(sideButton) {
    var gump1 = Orion.GetLastGump()

    var lines = gump1.CommandList().join('\n')
    lines.match(/button 220 \d* 4005 4007 1 0 \d*\s*xmfhtmlgumpcolor 255 \d* 220 18 \d* 0 0 32767 /gm).forEach(function (matches) {
        var subValue = matches.match(/button 220 \d* 4005 4007 1 0 (\d*)\s*xmfhtmlgumpcolor 255 \d* 220 18 (\d*) 0 0 32767/)
        if (largeSmallBodIds.indexOf(parseInt(subValue[2])) != -1) {
            TextWindow.Print(subValue[1] + ' ' + subValue[2])
            bodItemList.push(ItemMapping(subValue[2], Orion.GetCliLocString(subValue[2]), sideButton, subValue[1], tool))
        }
    })

}

function ItemMapping(_cliloc, _name, _menuButton, _createButton, _tool, jsonObject) {
    if (jsonObject != null) {
        return {
            cliloc: jsonObject.cliloc,
            name: jsonObject.name,
            menuButton: jsonObject.menuButton,
            createButton: jsonObject.createButton,
            tool: jsonObject.tool,
            Cliloc: function () {
                return this.cliloc;
            },
            Name: function () {
                return this.name;
            },
            MenuButton: function (button) {
                if (button != null)
                    this.menuButton = button
                return this.menuButton;
            },
            CreateButton: function (button) {
                if (button != null)
                    this.menuButton = button
                return this.createButton;
            },
            Tool: function (input) {
                if (input != null)
                    this.tool = input
                return this.tool;
            },

            Make: function () {
                Orion.Wait(1000)

                Orion.UseType(this.tool)

                if (Orion.WaitForGump(1000)) {
                    var gump0 = Orion.GetGump('last');
                    if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x38920ABD')) {
                        gump0.Select(Orion.CreateGumpHook(this.menuButton));
                        Orion.Wait(100);
                    }
                }
                if (Orion.WaitForGump(1000)) {
                    var gump1 = Orion.GetGump('last');
                    if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x38920ABD')) {
                        gump1.Select(Orion.CreateGumpHook(this.createButton));
                        Orion.Wait(100);
                    }
                }

            }
        }
    }
    else
        return {
            cliloc: _cliloc,
            name: _name,
            menuButton: _menuButton,
            createButton: _createButton,
            tool: _tool,
            Cliloc: function () {
                return this.cliloc;
            },
            Name: function () {
                return this.name;
            },
            MenuButton: function (button) {
                if (button != null)
                    this.menuButton = button
                return this.menuButton;
            },
            CreateButton: function (button) {
                if (button != null)
                    this.menuButton = button
                return this.createButton;
            },
            Tool: function (input) {
                if (input != null)
                    this.tool = input
                return this.tool;
            },
            Make: function () {
                Orion.Wait(800)


                var gump0 = Orion.GetGump('last');
                if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x38920ABD')) {
                    gump0.Select(Orion.CreateGumpHook(this.menuButton));
                    if (Orion.WaitForGump(1000)) {
                        Orion.Wait(400);
                        var gump1 = Orion.GetGump('last');
                        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x38920ABD')) {
                            gump1.Select(Orion.CreateGumpHook(this.createButton));
                            Orion.WaitForGump(2000)
                        }
                    }
                }
                else {
                    Orion.UseType(this.tool)
                    Orion.Wait(800)
                }



            }
        }
}

function ReadBodFile(_private) {
    var file = Orion.NewFile();

    if (file.Open('bodbuttons.json', true)) {
        var item = []
        while (item != null && item) {
            var item = file.ReadLine()
            if (item != '') {
                var itemJson = JSON.parse(item)
                bodItemList.push(ItemMapping(null, null, null, null, null, itemJson))
            }
        }
    }
    file.Close();
    return bodItemList
}

function WriteBodFile(_private) {
    var file = Orion.NewFile();
    file.Remove('bodbuttons.json');
    if (file.Open('bodbuttons.json')) {
        bodItemList.forEach(function (bodItem) {
            file.Write(JSON.stringify(bodItem) + '\n')
        })
    }
    file.Close();
}

function FillBulkOrders() {
    ReadBodFile()
    var smallOrders = Orion.FindTypeEx('0x2258', any, backpack).filter(function (bod) {
        return Orion.Contains(bod.Properties(), "Small Bulk Order")
    })
    
    CloseGumps();

    smallOrders.forEach(function (bod) {
        Orion.Wait(800)
        Orion.UseObject(bod.Serial())
        Orion.Wait(800)
        Orion.WaitForGump(2000)
        var gump1 = Orion.GetGump('any', '0x5AFBD742');

        var lines = gump1.CommandList().join('\n')
        var itemFind = lines.match(/xmfhtmlgumpcolor 75 96 210 20 (\d*) 0 0 32767/)
        Orion.Print(itemFind)
        if (itemFind.length == 0)
            return
        var itemID = itemFind[1]
        Orion.Print('item ' + itemID)

        var make = (parseInt(gump1.Text(parseInt(lines.match(/text 275 48 1152 (\d*)/)[1]))))

        var made = (parseInt(gump1.Text(parseInt(lines.match(/text 275 96 1152 (\d*)/)[1]))))
        var needToMake = (make - made)
        Orion.Print('need ' + needToMake)

        bodItemList.filter(function (itemBod) {
            return itemBod.Cliloc() == itemID
        })
            .forEach(function (bodItem) {
                Orion.Print('Making ' + bodItem.Name())
                MakeItems(bodItem, needToMake)
            })
            Orion.Print("Done making")
            Orion.Wait(1000)
            if ((gump1 !== null)) {
                gump1.Select(Orion.CreateGumpHook(4));
                Orion.Wait(100);
                if (Orion.WaitForTarget(1000))
                Orion.TargetObject(backpack);
            }
        
            gump1.Close()
            Orion.Wait(500);

    })
    CloseGumps();

}

function CloseGumps() {
    if (Orion.GumpExists(any, any, '0x38920ABD'))
        Orion.GetGump('any', '0x38920ABD').Close();
    Orion.Wait(800);

    if (Orion.GumpExists(any, any, '0x5AFBD742'))
        Orion.GetGump('any', '0x5AFBD742').Close();
    Orion.Wait(800);
}

function MakeItems(bodItem, needToMake) {
    for (var i = 0; i <= needToMake; i++) {
        bodItem.Make()
    }
}
function test() {
    var gump1 = Orion.GetLastGump()
    Orion.Print(gump1.Text(0))
}