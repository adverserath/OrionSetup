//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include Bod/Bods.js
//#include Bod/BodData.js
//#include helpers/cliloc.js
var tool = null;
var bodItemList = []

// function RebuildclilocsFromText() {
//     TextWindow.Open()
//     var clilocs = []
//     allCliloc.forEach(function (clilocMapping) {
//         if (largeSmallBodNames.indexOf(clilocMapping[1]) != -1) {
//             clilocs.push(clilocMapping[0])
//         }
//     })
//     TextWindow.Print(clilocs.join(','))
// }
function tests()
{
var val = Orion.GumpExists('generic', 'any', '0x38920ABC')
Orion.Print(val)
}
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
        Orion.Wait(500)
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
        //if (largeSmallBodIds.indexOf(parseInt(subValue[2])) != -1) {
        TextWindow.Print(subValue[1] + ' ' + subValue[2])

        var exists = bodItemList.some(function (bod) {
            if (bod.Name() == Orion.GetCliLocString(subValue[2])) {
                return true;
            }
            return false;
        })
        if (!exists) {
            TextWindow.Print(Orion.GetCliLocString(subValue[2]) + ' Adding')
            bodItemList.push(ItemMapping(subValue[2], Orion.GetCliLocString(subValue[2]), sideButton, subValue[1], tool))
        }
        //}
        //else {
        //    TextWindow.Print(Orion.GetCliLocString(subValue[2]) + ' Exists')
        //}
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

            Make: function (count) {
                ItemMake(this, count)
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
            Make: function (count) {
                ItemMake(this, count)
            }
        }
}
function ItemMake(itemBod, count) {
    var i = 0
    while (i < count) {
        Orion.Print(59, 'Made:' + i)
        if (!Orion.GumpExists('generic', 'any', '0x38920ABD')) {
            Orion.Print(48,'use tool')

            Orion.UseType(itemBod.Tool())
            Orion.Wait(1200)
        }
        var gump0 = Orion.GetGump('any', '0x38920ABD')

        if (gump0.CommandList().join(',').indexOf(itemBod.Cliloc() == -1)) {
            Orion.Print(48,'menu change')
            gump0.Select(Orion.CreateGumpHook(itemBod.MenuButton()));
            if (Orion.WaitForGump(1000)) {
                Orion.Wait(100);
            }
        }

        var gump1 = Orion.GetGump('any', '0x38920ABD')
        if ((gump1 !== null) && (!gump1.Replayed()) && (gump1.ID() === '0x38920ABD')) {
            gump1.Select(Orion.CreateGumpHook(itemBod.CreateButton()));
            Orion.WaitForGump(2000)
            //IF NOT MADE PAUSE
            i++;

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
        Orion.Resend()
        ReadBodFile()
        var smallOrders = Orion.FindTypeEx('0x2258', any, backpack).filter(function (bod) {
            var ma = bod.Properties().match(/\d+/g)
            var full = (ma[1] == ma[2])
            return Orion.Contains(bod.Properties(), "Small Bulk Order") && !full
        })


        smallOrders.forEach(function (bod) {
            CloseGumps();

            Orion.Wait(1000)
            Orion.UseObject(bod.Serial())
            Orion.WaitForGump(2000)
            Orion.Wait(2000)

            var gump1 = Orion.GetLastGump()//GetGump('any', '0x5AFBD742');
            FillFromBackPack(bod);
            Orion.Resend()
            Orion.Wait(500)
            var props = Orion.FindObject(bod.Serial()).Properties()
            var ma = props.match(/\d+/g)
            Orion.Print(props)
            Orion.Print(ma)

            var make = parseInt(ma[1])
            var made = parseInt(ma[2])
            Orion.Print(55, "make" + make)
            Orion.Print(55, "made" + made)

            var lines = gump1.CommandList().join('\n')
            TextWindow.Print(lines)

            var itemFind = lines.match(/xmfhtmlgumpcolor 75 96 210 20 (\d*) 0 0 32767/)
            TextWindow.Print('itemid in bod ' + itemFind)
            if (itemFind.length == 0)
                return
            var itemID = itemFind[1]
            Orion.Print('item ' + Orion.GetCliLocString(itemID))

            var needToMake = (make - made)
            Orion.Print('need ' + needToMake)

            bodItemList.filter(function (itemBod) {
                return itemBod.Name() == Orion.GetCliLocString(itemID)
            })
                .forEach(function (bodItem) {
                    Orion.Print(68, 'Making ' + bodItem.Name())
                    bodItem.Make(needToMake)
                })
            Orion.Print(68, "Done making")

            FillFromBackPack(bod);

            gump1.Close()
            Orion.Wait(500);



        })
        CloseGumps();

    }

    function FillFromBackPack(bod) {
        if (bod == null)
            bod = SelectTarget()
        CloseGumps()
        var gump0 = null

        Orion.AddWaitTargetObject(backpack);

        Orion.UseObject(bod.Serial())

        if (Orion.WaitForGump(1000)) {
            var gump0 = Orion.GetGump('last');
            if ((gump0 !== null) && (!gump0.Replayed()) && (gump0.ID() === '0x5AFBD742')) {
                gump0.Select(Orion.CreateGumpHook(4));
                Orion.Wait(100);
            }
        }

        Orion.CancelTarget()

    }

    function CloseGumps() {
        // if (Orion.GumpExists('any', 'any', '0x38920ABD'))
        var gump = Orion.GetGump('any', '0x38920ABD')
        if (gump != null)
            gump.Close();

        //if (Orion.GumpExists('any', 'any', '0x5AFBD742'))
        gump = Orion.GetGump('any', '0x5AFBD742')
        if (gump != null)
            gump.Close();
    }
