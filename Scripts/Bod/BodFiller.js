//#include helpers/Target.js
//#include helpers/Debug.js
//#include helpers/Magic.js
//#include helpers/ItemManager.js
//#include Bod/Bods.js
//#include Bod/BodData.js

function CreateAllItemMap() {
    //open tool manually
    var newmapping = [] // load existing items from json

    //list all buttons on left side
    //loop: press each button
    //search all small items in list
    //if found add to list
    //save list to json
    largeSmallBodIds.forEach(function (cliloc) {
        newmapping.push(ItemMapping(cliloc, Orion.GetCliLocString(cliloc), "", "", ""))
    });

}

function ItemMapping(_cliloc, _name, _menuButton, _createButton, _tool) {
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
    }
}