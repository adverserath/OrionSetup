const Orion = {
  /**
   * Get ability status.
   * @example bool Orion.AbilityStatus(name);
   * @param name - name or serial number of the ability  
   * @returns boolean - true if the ability is activated.
   */
  AbilityStatus: function(name) {
    return false;
  },
  /**
   * Activate the client window.
   * @example Orion.ActivateClient();
   * @returns 
   */
  ActivateClient: function() {
    // Unknown return type
  },
  /**
   * Draw a display timer in the client window.
   * @example Call variants:
   * @example Orion.AddDisplayTimer(id, timer);
   * @example Orion.AddDisplayTimer(id, timer, position);
   * @example Orion.AddDisplayTimer(id, timer, position, shape);
   * @example Orion.AddDisplayTimer(id, timer, position, shape, name);
   * @example Orion.AddDisplayTimer(id, timer, position, shape, name, x, y);
   * @example Orion.AddDisplayTimer(id, timer, position, shape, name, x, y, textColor);
   * @example Orion.AddDisplayTimer(id, timer, position, shape, name, x, y, textColor, font);
   * @example Orion.AddDisplayTimer(id, timer, position, shape, name, x, y, textColor, font, backgroundColor);
   * @param id - display timer id
   * @param timer - timer duration in milliseconds
   * @param  - timer position  
   * @param  - timer shape  
   * @param name - timer name  
   * @param x - X coordinate offset on screen  
   * @param y - Y coordinate offset on screen  
   * @param textColor - text color (header and countdown)  
   * @param font - font number for text  
   * @param backgroundColor - timer background color in format 0xRRGGBBAA  
   * @returns Does not return a value.
   */
  AddDisplayTimer: function(id, timer, position, shape, name, x, y, textColor, font, backgroundColor) {
    // Unknown return type
  },
  /**
   * Add enemy alias.
   * @example Call variants:
   * @example Orion.AddEnemy(enemyName);
   * @example Orion.AddEnemy(enemyName, serial);
   * @param enemyName - enemy alias name
   * @param serial - enemy serial number  
   * @returns Does not return a value.
   */
  AddEnemy: function(enemyName, serial) {
    // Unknown return type
  },
  /**
   * Add a fake semi-transparent static object to the world map.
   * @example Call variants:
   * @example Orion.AddFakeMapObject(serial, graphic, color, x, y, z);
   * @example Orion.AddFakeMapObject(serial, graphic, color, x, y, z, map);
   * @example Orion.AddFakeMapObject(serial, graphic, color, x, y, z, timeToLive, map);
   * @param serial - object serial number from '0x00000000' to '0x0000FFFF' or numbers from 0 to 65535
   * @param graphic - object graphics
   * @param color - object color
   * @param x - the X coordinate of the object in the world
   * @param y - the Y coordinate of the object in the world
   * @param z - the Z coordinate of the object in the world
   * @param timeToLive - object lifetime, milliseconds  
   * @param map - the number of the map on which the object will be placed  
   * @returns Does not return a value.
   */
  AddFakeMapObject: function(serial, graphic, color, x, y, z, timeToLive, map) {
    // Unknown return type
  },
  /**
   * Add item to search list.
   * @example Call variants:
   * @example Orion.AddFindList();
   * @example Orion.AddFindList(listName);
   * @example Orion.AddFindList(listName, graphic, color);
   * @example Orion.AddFindList(listName, graphic, color, comment);
   * @param listName - list name.  
   * @param graphic - object graphic.  
   * @param color - object color.  
   * @param comment - comment on the object.  
   * @returns Does not return a value.
   */
  AddFindList: function(listName, graphic, color, comment) {
    // Unknown return type
  },
  /**
   * Add friend alias.
   * @example Call variants:
   * @example Orion.AddFriend(friendName);
   * @example Orion.AddFriend(friendName, serial);
   * @param friendName - friend alias name
   * @param serial - friend serial number  
   * @returns Does not return a value.
   */
  AddFriend: function(friendName, serial) {
    // Unknown return type
  },
  /**
   * Highlight area in the client window.
   * @example Call variants:
   * @example Orion.AddHighlightArea(id);
   * @example Orion.AddHighlightArea(id, timer);
   * @example Orion.AddHighlightArea(id, timer, snapObject);
   * @example Orion.AddHighlightArea(id, timer, snapObject, color);
   * @example Orion.AddHighlightArea(id, timer, snapObject, color, rangeX, rangeY);
   * @example Orion.AddHighlightArea(id, timer, snapObject, color, rangeX, rangeY, highlightMode);
   * @example Orion.AddHighlightArea(id, timer, snapObject, color, rangeX, rangeY, highlightMode, x, y);
   * @param id - area id;
   * @param timer - area lifetime, in milliseconds;  
   * @param snapObject - serial number of the object to which the area is attached;  
   * @param color - highlight color, number from the UO color palette;  
   * @param rangeX - area range along the X axis;  
   * @param rangeY - area range along the Y axis;  
   * @param highlightMode - highlight mode, can be combined via |;  
   * @param x - world coordinate of the center of the area along the X axis (for snapObject='pos');  
   * @param y - world coordinate of the center of the area along the Y axis (for snapObject='pos');  
   * @returns Does not return a value.
   */
  AddHighlightArea: function(id, timer, snapObject, color, rangeX, rangeY, highlightMode, x, y) {
    // Unknown return type
  },
  /**
   * Add character to list for custom highlighting.
   * @example Call variants:
   * @example Orion.AddHighlightCharacter(serial, color);
   * @example Orion.AddHighlightCharacter(serial, color, priorityHighlight);
   * @param serial - character serial number
   * @param color - highlight color
   * @param priorityHighlight - highlight type  
   * @returns Does not return a value.
   */
  AddHighlightCharacter: function(serial, color, priorityHighlight) {
    // Unknown return type
  },
  /**
   * Add item to search ignore list.
   * @example Call variants:
   * @example Orion.AddIgnoreList();
   * @example Orion.AddIgnoreList(listName);
   * @example Orion.AddIgnoreList(listName, graphic, color);
   * @example Orion.AddIgnoreList(listName, graphic, color, comment);
   * @param listName - list name.  
   * @param graphic - object graphic.  
   * @param color - object color.  
   * @param comment - comment on the object.  
   * @returns Does not return a value.
   */
  AddIgnoreList: function(listName, graphic, color, comment) {
    // Unknown return type
  },
  /**
   * Add item to search ignore list.
   * @example Call variants:
   * @example Orion.AddIgnoreListObject();
   * @example Orion.AddIgnoreListObject(listName);
   * @example Orion.AddIgnoreListObject(listName, serial);
   * @example Orion.AddIgnoreListObject(listName, serial, comment);
   * @param listName - list name.  
   * @param serial - object serial number.  
   * @param comment - comment on the object.  
   * @returns Does not return a value.
   */
  AddIgnoreListObject: function(listName, serial, comment) {
    // Unknown return type
  },
  /**
   * Add object alias.
   * @example Call variants:
   * @example Orion.AddObject(objectName);
   * @example Orion.AddObject(objectName, typeValue);
   * @param objectName - object alias name
   * @param typeValue - object serial number  
   * @returns Does not return a value.   
   */
  AddObject: function(objectName, typeValue) {
    // Unknown return type
  },
  /**
   * Add type alias.
   * @example Call variants:
   * @example Orion.AddType(typeName);
   * @example Orion.AddType(typeName, typeValue);
   * @param typeName - alias name type
   * @param typeValue - graphic  
   * @returns Does not return a value.
   */
  AddType: function(typeName, typeValue) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook for an object found by a search on the ground.
   * @example Call variants:
   * @example Orion.AddWaitTargetGround(graphic);
   * @example Orion.AddWaitTargetGround(graphic, color);
   * @example Orion.AddWaitTargetGround(graphic, color, distance);
   * @example Orion.AddWaitTargetGround(graphic, color, distance, flags);
   * @example Orion.AddWaitTargetGround(graphic, color, distance, flags, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param  - search distance  
   * @param  - search flags  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  AddWaitTargetGround: function(graphic, color, distance, flags, ignoreLists) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook for an object found by a search on the ground.
   * @example Call variants:
   * @example Orion.AddWaitTargetGroundList(findListName);
   * @example Orion.AddWaitTargetGroundList(findListName, distance);
   * @example Orion.AddWaitTargetGroundList(findListName, distance, flags);
   * @param findListName - find list name
   * @param  - search distance  
   * @param  - search flags  
   * @returns Does not return a value.
   */
  AddWaitTargetGroundList: function(findListName, distance, flags) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook for the object(s).
   * @example Call variants:
   * @example Orion.AddWaitTargetObject(serial);
   * @example Orion.AddWaitTargetObject(serial, relativeTargetDistance);
   * @param relativeTargetDistance - distance for pointing the target at the tile relative to the specified character, depending on its direction  
   * @returns Does not return a value.
   */
  AddWaitTargetObject: function(relativeTargetDistance) {
    // Unknown return type
  },
  /**
   * Add a target hook to the ground in line.
   * @example Call variants:
   * @example Orion.AddWaitTargetTile(tileFlags);
   * @example Orion.AddWaitTargetTile(tileFlags, x, y, z);
   * @param  - tiles flags for search  
   * @param x - X coordinate in the world where to target
   * @param y - Y coordinate in the world where to target
   * @param z - Z coordinate in the world where to target
   * @returns Does not return a value.
   */
  AddWaitTargetTile: function(tileFlags, x, y, z) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook on the ground, relative to the character.
   * @example Call variants:
   * @example Orion.AddWaitTargetTileRelative(tileFlags);
   * @example Orion.AddWaitTargetTileRelative(tileFlags, x, y, z);
   * @param  - tiles flags for search  
   * @param x - X coordinate in the world relative to the character where to target
   * @param y - Y coordinate in the world relative to the character where to target
   * @param z - Z coordinate in the world relative to the character where to target
   * @returns Does not return a value.
   */
  AddWaitTargetTileRelative: function(tileFlags, x, y, z) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook for an object found by a search in the container.
   * @example Call variants:
   * @example Orion.AddWaitTargetType(graphic);
   * @example Orion.AddWaitTargetType(graphic, color, container);
   * @example Orion.AddWaitTargetType(graphic, color, container, flags);
   * @example Orion.AddWaitTargetType(graphic, color, container, flags, recurse);
   * @example Orion.AddWaitTargetType(graphic, color, container, flags, recurse, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  AddWaitTargetType: function(graphic, color, container, flags, recurse, ignoreLists) {
    // Unknown return type
  },
  /**
   * Add to the queue a target hook for an object found by a search in the container.
   * @example Call variants:
   * @example Orion.AddWaitTargetTypeList(findListName);
   * @example Orion.AddWaitTargetTypeList(findListName, container, flags);
   * @example Orion.AddWaitTargetTypeList(findListName, container, flags, recurse);
   * @param findListName - search list name
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns Does not return a value.
   */
  AddWaitTargetTypeList: function(findListName, container, flags, recurse) {
    // Unknown return type
  },
  /**
   * Put on a set.
   * @example Orion.Arm(setName);
   * @param setName - set name
   * @returns Does not return a value.
   */
  Arm: function(setName) {
    // Unknown return type
  },
  /**
   * Attack object.
   * @example Orion.Attack(serial);
   * @param serial - attack object serial number
   * @returns Does not return a value.
   */
  Attack: function(serial) {
    // Unknown return type
  },
  /**
   * Bandage up.
   * @example Call variants:
   * @example Orion.BandageSelf();
   * @example Orion.BandageSelf(color);
   * @param color - bandage color to search  
   * @returns Does not return a value.
   */
  BandageSelf: function(color) {
    // Unknown return type
  },
  /**
   * Apply bandage with the new targeting system.  
For the correct operation, the new targeting system must be supported by the server.
   * @example Orion.BandageTarget(serial);
   * @param serial - serial number of the object for using bandages
   * @returns Does not return a value.
   */
  BandageTarget: function(serial) {
    // Unknown return type
  },
  /**
   * Change the state of the character's movement blocking option.
   * @example Orion.BlockMoving(state);
   * @param state - new option state, true to block movement.
   * @returns Does not return a value.
   */
  BlockMoving: function(state) {
    // Unknown return type
  },
  /**
   * Bandage bloody bandages.
   * @example Orion.BloodyBandageSelf();
   * @returns 
   */
  BloodyBandageSelf: function() {
    // Unknown return type
  },
  /**
   * Block automatic closing of the container (manually - by right-clicking it closes).
   * @example Orion.Boxhack(serial);
   * @param serial - lock container serial number
   * @returns Does not return a value.
   */
  Boxhack: function(serial) {
    // Unknown return type
  },
  /**
   * Buff/debuff description.
   * @example String Orion.BuffDescription(name);
   * @param name - names or graphics of the buff/debuff picture to check
   * @returns String - buff description.  
   */
  BuffDescription: function(name) {
    // Unknown return type
  },
  /**
   * Check for buff/debuff.
   * @example bool Orion.BuffExists(nameOrGraphic);
   * @param nameOrGraphic - the name or graphic of the gamp buff/debuff
   * @returns boolean - true if a buff/debuff is on the character.
   */
  BuffExists: function(nameOrGraphic) {
    return false;
  },
  /**
   * Number of buffs/debuffs per player.
   * @example int Orion.BuffsCount();
   * @returns 
   */
  BuffsCount: function() {
    // Unknown return type
  },
  /**
   * Checking the remaining buff/debuff duration.
   * @example int Orion.BuffTimeRemaining(name);
   * @param name - names or graphics of the buff/debuff picture to check
   * @returns integer - milliseconds remaining.  
   */
  BuffTimeRemaining: function(name) {
    // Unknown return type
  },
  /**
   * Proceed to purchase the goods.  
If the list appears, but there were no items suitable for purchase, the function returns immediately.  
If the list does not appear, the function will wait for the specified time (Timeout if shop is not recv).
   * @example Call variants:
   * @example Orion.Buy(shopListName);
   * @example Orion.Buy(shopListName, vendorName);
   * @example Orion.Buy(shopListName, vendorName, shopDelay);
   * @param shopListName - shopping list name.
   * @param vendorName - name of the vendor from whom we buy the goods.  
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  Buy: function(shopListName, vendorName, shopDelay) {
    // Unknown return type
  },
  /**
   * Buy the current buylist if it exists and hasn't been answered yet.
   * @example Call variants:
   * @example Orion.BuyCurrent(shopListName);
   * @example Orion.BuyCurrent(shopListName, shopDelay);
   * @param shopListName - shopping list name.
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  BuyCurrent: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Set a hook for the next come bailist.
   * @example Call variants:
   * @example Orion.BuyHook(shopListName);
   * @example Orion.BuyHook(shopListName, shopDelay);
   * @param shopListName - shopping list name.
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  BuyHook: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Proceed to purchase items to restock.  
It only works if Graphic, Color and Count items are specified in the list.  
Before buying directly, he checks for items in the player’s backpack, if replenishment is not required, the purchase is not initialized.  
If the list appears, but there were no items suitable for purchase, the function returns immediately.  
If the list does not appear, the function will wait for the specified time (Timeout if shop is not recv).
   * @example Call variants:
   * @example Orion.BuyRestock(shopListName);
   * @example Orion.BuyRestock(shopListName, vendorName);
   * @example Orion.BuyRestock(shopListName, vendorName, shopDelay);
   * @param shopListName - shopping list name.
   * @param vendorName - name of the vendor from whom we buy the goods.  
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  BuyRestock: function(shopListName, vendorName, shopDelay) {
    // Unknown return type
  },
  /**
   * Buy the current buylist in restocking mode, if it exists and hasn't been answered yet.  
Only works if Graphic, Color and Count items are specified in the list.  
Before buying directly, he checks for items in the player’s backpack, if replenishment is not required, the purchase is not initialized.
   * @example Call variants:
   * @example Orion.BuyRestockCurrent(shopListName);
   * @example Orion.BuyRestockCurrent(shopListName, shopDelay);
   * @param shopListName - name of the shopping list.
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  BuyRestockCurrent: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Set a hook for buying items in replenishment mode.  
Only works if Graphic, Color and Count items are specified in the list.  
Before buying directly, he checks for items in the player’s backpack, if replenishment is not required, the purchase is not initialized.
   * @example Call variants:
   * @example Orion.BuyRestockHook(shopListName);
   * @example Orion.BuyRestockHook(shopListName, shopDelay);
   * @param shopListName - name of the shopping list.
   * @param shopDelay - general delay in the purchase of goods.  
   * @returns Does not return a value.
   */
  BuyRestockHook: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Cancel all hooks on the context menu.
   * @example Orion.CancelContextMenu();
   * @returns 
   */
  CancelContextMenu: function() {
    // Unknown return type
  },
  /**
   * Cancel the current target in the client (if any).
   * @example Orion.CancelTarget()();
   * @returns 
   */
  CancelTarget: function() {
    // Unknown return type
  },
  /**
   * Delete all installed gump hooks.
   * @example Orion.CancelWaitGump();
   * @returns 
   */
  CancelWaitGump: function() {
    // Unknown return type
  },
  /**
   * Delete all installed hooks on the menu.
   * @example Orion.CancelWaitMenu();
   * @returns 
   */
  CancelWaitMenu: function() {
    // Unknown return type
  },
  /**
   * Remove all hooks for prompts.
   * @example Orion.CancelWaitPrompt();
   * @returns 
   */
  CancelWaitPrompt: function() {
    // Unknown return type
  },
  /**
   * Cancel current target hooks.
   * @example Orion.CancelWaitTarget();
   * @returns 
   */
  CancelWaitTarget: function() {
    // Unknown return type
  },
  /**
   * Remove all set hooks for the text input dialog.
   * @example Orion.CancelWaitTextDialog();
   * @returns 
   */
  CancelWaitTextDialog: function() {
    // Unknown return type
  },
  /**
   * Check for the possibility of a step.
   * @example bool Orion.CanWalk(direction, x, y, z);
   * @param  - direction for step
   * @param x - X coordinate in the world where we take a step
   * @param y - Y coordinate in the world where we take a step
   * @param z - Z coordinate in the world where we take a step
   * @returns boolean - true if you can take a step there.
   */
  CanWalk: function(direction, x, y, z) {
    return false;
  },
  /**
   * Cast spell.
   * @example Call variants:
   * @example Orion.Cast(spellNameOrIndex);
   * @example Orion.Cast(spellNameOrIndex, targetSerial);
   * @example Orion.Cast(spellNameOrIndex, targetSerial, relativeTargetDistance);
   * @param spellNameOrIndex - spell name or number
   * @param targetSerial - spell target serial number  
   * @param relativeTargetDistance - distance for pointing the target at the tile relative to the specified character, depending on its direction  
   * @returns Does not return a value.
   */
  Cast: function(spellNameOrIndex, targetSerial, relativeTargetDistance) {
    // Unknown return type
  },
  /**
   * Cast a spell using the new targeting system.  
For the correct operation, the new targeting system must be supported by the server.
   * @example Orion.CastTarget(nameOrIndex, serial);
   * @param nameOrIndex - spell name or number
   * @param serial - spell cast serial number
   * @returns Does not return a value.
   */
  CastTarget: function(nameOrIndex, serial) {
    // Unknown return type
  },
  /**
   * Display a message over the character.
   * @example Orion.CharPrint(serial, color, text);
   * @param serial - the serial number of the character to display the message for.
   * @param color - message color.
   * @param text - message text.
   * @returns Does not return a value.
   */
  CharPrint: function(serial, color, text) {
    // Unknown return type
  },
  /**
   * Check the status of the specified agent.
   * @example Call variants:
   * @example bool Orion.CheckAgent(agentType, name);
   * @example bool Orion.CheckAgent(agentType, name, mode);
   * @param agentType - agent type, can be 'autoloot', 'scavenger', 'organizer'
   * @param name - name of the agent element to check
   * @param mode - list get mode, can be 'started', 'stopped', 'exists'  
   * @returns boolean - agent state.
   */
  CheckAgent: function(agentType, name, mode) {
    return false;
  },
  /**
   * Waiting for the delivery of packets to the server and receiving a response (by clicking on the backpack).
   * @example Call variants:
   * @example Orion.CheckLag();
   * @example Orion.CheckLag(delay);
   * @param delay - maximum delay (milliseconds)  
   * @returns Does not return a value.
   */
  CheckLag: function(delay) {
    // Unknown return type
  },
  /**
   * Clear the list of impassable coordinates.
   * @example Orion.ClearBadLocations();
   * @returns 
   */
  ClearBadLocations: function() {
    // Unknown return type
  },
  /**
   * Clear enemies list.
   * @example Orion.ClearEnemyList();
   * @returns 
   */
  ClearEnemyList: function() {
    // Unknown return type
  },
  /**
   * Remove all fake semi-transparent static objects from the world map.
   * @example Call variants:
   * @example Orion.ClearFakeMapObjects();
   * @example Orion.ClearFakeMapObjects(map);
   * @param map - the number of the map on which the object placed  
   * @returns Does not return a value.
   */
  ClearFakeMapObjects: function(map) {
    // Unknown return type
  },
  /**
   * Clear search list.
   * @example Orion.ClearFindList(listName);
   * @param listName - list name.
   * @returns Does not return a value.
   */
  ClearFindList: function(listName) {
    // Unknown return type
  },
  /**
   * Clear friends list.
   * @example Orion.ClearFriendList();
   * @returns 
   */
  ClearFriendList: function() {
    // Unknown return type
  },
  /**
   * Clear the list of global variables.
   * @example Orion.ClearGlobals();
   * @returns 
   */
  ClearGlobals: function() {
    // Unknown return type
  },
  /**
   * Clear list for custom highlighting.
   * @example Call variants:
   * @example Orion.ClearHighlightCharacters();
   * @example Orion.ClearHighlightCharacters(priorityHighlight);
   * @param priorityHighlight - backlight type  
   * @returns Does not return a value.
   */
  ClearHighlightCharacters: function(priorityHighlight) {
    // Unknown return type
  },
  /**
   * Clear search ignore list.
   * @example Orion.ClearIgnoreList(listName);
   * @param listName - list name.
   * @returns Does not return a value.
   */
  ClearIgnoreList: function(listName) {
    // Unknown return type
  },
  /**
   * Clear journal.
   * @example Call variants:
   * @example Orion.ClearJournal();
   * @example Orion.ClearJournal(pattern);
   * @example Orion.ClearJournal(pattern, flags);
   * @example Orion.ClearJournal(pattern, flags, serial);
   * @example Orion.ClearJournal(pattern, flags, serial, color);
   * @param pattern - clearing pattern.  
   * @param  - journal filter flags.  
   * @param serial - character serial number of the speaker.  
   * @param color - message color.  
   * @returns Does not return a value.
   */
  ClearJournal: function(pattern, flags, serial, color) {
    // Unknown return type
  },
  /**
   * Delete all assistant timers.
   * @example Orion.ClearTimers();
   * @returns 
   */
  ClearTimers: function() {
    // Unknown return type
  },
  /**
   * Click on an object.
   * @example Call variants:
   * @example Orion.Click();
   * @example Orion.Click(serial);
   * @param serial - serial number of the object to be clicked  
   * @returns Does not return a value.
   */
  Click: function(serial) {
    // Unknown return type
  },
  /**
   * Get/change the value of the global client variable lastattack.
   * @example Get value:
   * @example String Orion.ClientLastAttack();
   * @returns 
   */
  ClientLastAttack: function() {
    // Unknown return type
  },
  /**
   * Get/change the value of the global client variable lasttarget.
   * @example Getting value:
   * @example String Orion.ClientLastTarget();
   * @returns 
   */
  ClientLastTarget: function() {
    // Unknown return type
  },
  /**
   * Get the value of the specified client option.
   * @example int Orion.ClientOptionGet(option);
   * @param  - option name
   * @returns integer - option value.
   */
  ClientOptionGet: function() {
    // Unknown return type
  },
  /**
   * Change the value of the specified client option.
   * @example Orion.ClientOptionSet(option, value);
   * @param  - option name
   * @param value - value to set
   * @returns Does not return a value.
   */
  ClientOptionSet: function(option, value) {
    // Unknown return type
  },
  /**
   * Get/change the value of the global client variable View Range.
   * @example Getting value:
   * @example int Orion.ClientViewRange();
   * @returns 
   */
  ClientViewRange: function() {
    // Unknown return type
  },
  /**
   * Close the gump in the client.
   * @example Call variants:
   * @example bool Orion.CloseGump(type);
   * @example bool Orion.CloseGump(type, serial);
   * @example bool Orion.CloseGump(type, serial, id);
   * @param  - gump type
   * @param serial - gump serial number (only needed for interaction with gumps that have a serial number, for example: containers, statusbars, paperdolls, etc.)  
   * @param id - gump identifier (needed only for interacting with gumps that have an identifier, for example: server gumps, trade gump)  
   * @returns Does not return a value.
   */
  CloseGump: function(type, serial, id) {
    // Unknown return type
  },
  /**
   * Close menu.
   * @example Orion.CloseMenu(name);
   * @returns Does not return a value.
   */
  CloseMenu: function() {
    // Unknown return type
  },
  /**
   * Close character paperdoll gump.
   * @example Orion.ClosePaperdoll(serial);
   * @param serial - the serial number of the character whose paperdoll will be closed
   * @returns Does not return a value.
   */
  ClosePaperdoll: function(serial) {
    // Unknown return type
  },
  /**
   * Close the gump status bar in the client.
   * @example Orion.CloseStatusbar(serial);
   * @param serial - serial number of the object to which the gump status bar is attached, or 'all'
   * @returns Does not return a value.
   */
  CloseStatusbar: function(serial) {
    // Unknown return type
  },
  /**
   * Close a text dialog
   * @example Call variants:
   * @example Orion.CloseTextDialog(name);
   * @example Orion.CloseTextDialog(serial, id, name);
   * @param name - the name of the dialog to close  
   * @param serial - serial number of the dialog to close  
   * @param id - dialog id to close  
   * @returns Does not return a value.
   */
  CloseTextDialog: function(name, serial, id) {
    // Unknown return type
  },
  /**
   * Close game client.
   * @example Orion.CloseUO();
   * @returns 
   */
  CloseUO: function() {
    // Unknown return type
  },
  /**
   * Get server connection status.
   * @example bool Orion.Connected();
   * @returns 
   */
  Connected: function() {
    // Unknown return type
  },
  /**
   * Check for characters within a string.
   * @example Call variants:
   * @example bool Orion.Contains(text, pattern);
   * @example bool Orion.Contains(text, pattern, ignoreCase);
   * @param text - the string of text to check
   * @param pattern - text pattern to search. Multiple strings can be separated with a pipe: |
   * @param ignoreCase - true if you want to ignore case (capital letters) when searching  
   * @returns boolean - true if the pattern or one of the pattern sets is found.
   */
  Contains: function(text, pattern, ignoreCase) {
    return false;
  },
  /**
   * Management an agent.
   * @example bool Orion.ControlAgent(agentType, name, action);
   * @param agentType - agent type. Can be: 'autoloot', 'scavenger', 'organizer'
   * @param name - name of the agent
   * @param action - Can be: 'start', 'stop', 'toggle'
   * @returns boolean - true if the specified agent was found.
   */
  ControlAgent: function(agentType, name, action) {
    return false;
  },
  /**
   * Copy text to clipboard.
   * @example Orion.CopyToClipboard(text);
   * @param text - text to copy to clipboard
   * @returns Does not return a value.
   */
  CopyToClipboard: function(text) {
    // Unknown return type
  },
  /**
   * Count the total number of items by type
   * @example Call variants:
   * @example int Orion.Count(graphic);
   * @example int Orion.Count(graphic, color);
   * @example int Orion.Count(graphic, color, container);
   * @example int Orion.Count(graphic, color, container, distance);
   * @example int Orion.Count(graphic, color, container, distance, recurse);
   * @param graphic - graphic(s) to search. Can be combined with a pipe: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - serial of the container to search  
   * @param  - search distance  
   * @param recurse - true will search pre-opened subcontainers  
   * @returns integer - the total number of items found (the sum of all stacks).
   */
  Count: function(graphic, color, container, distance, recurse) {
    // Unknown return type
  },
  /**
   * Create a new client macro.
   * @example Call variants:
   * @example MacroObject Orion.CreateClientMacro();
   * @example MacroObject Orion.CreateClientMacro(action);
   * @example MacroObject Orion.CreateClientMacro(action, subAction);
   * @param action - action or group of actions  
   * @param subAction - an action (if the first parameter is specified as a group of actions) or text to enter  
   * @returns lass object MacroObject or null.
   */
  CreateClientMacro: function(action, subAction) {
    // Unknown return type
  },
  /**
   * Create custom gump.
   * @example GumpHookObject Orion.CreateCustomGump(serial);
   * @param serial - gump serial number.
   * @returns n object of class CustomGumpObject or null if the object could not be created.
   */
  CreateCustomGump: function(serial) {
    // Unknown return type
  },
  /**
   * Create a gump hook.
   * @example GumpHookObject Orion.CreateGumpHook(index);
   * @param index - gump response code.  
   * @returns lass object GumpHookObject or null, if could not create the object.
   */
  CreateGumpHook: function(index) {
    // Unknown return type
  },
  /**
   * Create and start a UDP server.
   * @example Call variants:
   * @example int Orion.CreateUdpServer(serverName, port);
   * @example int Orion.CreateUdpServer(serverName, host, port);
   * @param host - the address of the network adapter on which to start listening or 'broadcast'.  
   * @returns integer  
   */
  CreateUdpServer: function(host) {
    // Unknown return type
  },
  /**
   * Get the path to the directory where the current file loaded on the scripts tab is located.
   * @example String Orion.CurrentScriptDirPath();
   * @returns 
   */
  CurrentScriptDirPath: function() {
    // Unknown return type
  },
  /**
   * Get current date.
   * @example Call variants:
   * @example String Orion.Date();
   * @example String Orion.Date(format);
   * @param format - date format  
   * @returns String - current date in the specified format.
   */
  Date: function(format) {
    // Unknown return type
  },
  /**
   * Disarm.
   * @example Orion.Disarm();
   * @returns 
   */
  Disarm: function() {
    // Unknown return type
  },
  /**
   * Check for the existence of a display timer in the client.
   * @example bool Orion.DisplayTimerExists(id);
   * @param id - display timer ID
   * @returns boolean - true if the timer is in the client.
   */
  DisplayTimerExists: function(id) {
    return false;
  },
  /**
   * Get the remaining lifetime of the display timer.
   * @example int Orion.DisplayTimerGetTime(id);
   * @param id - display timer ID
   * @returns integer - the remainder of the timer display time (in milliseconds). If -1 is returned, then there is no timer in the client.
   */
  DisplayTimerGetTime: function(id) {
    // Unknown return type
  },
  /**
   * Add state to change the color of the timer when a specific timer time is reached (in %).  
You can add several states. States with the same % replace each other.
   * @example Call variants:
   * @example Orion.DisplayTimerSetColorStage(id, percentage, textColor);
   * @example Orion.DisplayTimerSetColorStage(id, percentage, textColor, backgroundColor);
   * @example Orion.DisplayTimerSetColorStage(id, percentage, textColor, backgroundColor, iconColor);
   * @param id - display timer id
   * @param percentage - % value when you need to activate this stage (from 0 to 100)
   * @param textColor - text color at this stage  
   * @param backgroundColor - background color at this stage in the format 0xRRGGBBAA  
   * @param iconColor - color icons at this stage  
   * @returns Does not return a value.
   */
  DisplayTimerSetColorStage: function(id, percentage, textColor, backgroundColor, iconColor) {
    // Unknown return type
  },
  /**
   * Add object icon to a timer.
   * @example Call variants:
   * @example Orion.DisplayTimerSetIcon(id, position, iconGraphic);
   * @example Orion.DisplayTimerSetIcon(id, position, iconGraphic, iconColor);
   * @example Orion.DisplayTimerSetIcon(id, position, iconGraphic, iconColor, iconX, iconY);
   * @example Orion.DisplayTimerSetIcon(id, position, iconGraphic, iconColor, iconX, iconY, iconWidth, iconHeight);
   * @param id - display timer ID
   * @param  - icon position, valid relative to timer  
   * @param iconGraphic - graphic timer icon
   * @param iconColor - timer icon color  
   * @param iconX - X coordinate of timer icon  
   * @param iconY - Y coordinate of timer icon  
   * @param iconWidth - timer icon width  
   * @param iconHeight - timer icon height  
   * @returns Does not return a value.
   */
  DisplayTimerSetIcon: function(id, position, iconGraphic, iconColor, iconX, iconY, iconWidth, iconHeight) {
    // Unknown return type
  },
  /**
   * Set display timer icon type.
   * @example Orion.DisplayTimerSetIconType(id, type);
   * @param id - display timer id
   * @param type - icon type, possible values: 'item', 'gump'
   * @returns Does not return a value.
   */
  DisplayTimerSetIconType: function(id, type) {
    // Unknown return type
  },
  /**
   * Link timer to object.
   * @example Orion.DisplayTimerSetObject(id, serial);
   * @param id - display timer ID
   * @param serial - serial number of object to link
   * @returns Does not return a value.
   */
  DisplayTimerSetObject: function(id, serial) {
    // Unknown return type
  },
  /**
   * Set radius for display timer (only for circular timers).
   * @example Orion.DisplayTimerSetRadius(id, radius);
   * @param id - display timer ID
   * @param radius - new timer radius
   * @returns Does not return a value.
   */
  DisplayTimerSetRadius: function(id, radius) {
    // Unknown return type
  },
  /**
   * Toggle direction of timer animation.
   * @example Orion.DisplayTimerSetReversed(id, reversed);
   * @param id - display timer ID
   * @param reversed - true if the timer should be animated in the opposite direction
   * @returns Does not return a value.
   */
  DisplayTimerSetReversed: function(id, reversed) {
    // Unknown return type
  },
  /**
   * Show/hide timer counter.
   * @example Orion.DisplayTimerSetShowTime(id, show);
   * @param id - display timer ID
   * @param show - true if you need to display a counter
   * @returns Does not return a value.
   */
  DisplayTimerSetShowTime: function(id, show) {
    // Unknown return type
  },
  /**
   * Set size for display timer.  
  
For rectangular timers, both width and height are used.  
For linear, only the width is used (regardless of the verticality of the timer).
   * @example Orion.DisplayTimerSetSize(id, width, height);
   * @param id - display timer ID
   * @param width - new display timer width
   * @param height - new display timer height
   * @returns Does not return a value.
   */
  DisplayTimerSetSize: function(id, width, height) {
    // Unknown return type
  },
  /**
   * Check if an item is being dragged.
   * @example bool Orion.Dragging();
   * @returns 
   */
  Dragging: function() {
    // Unknown return type
  },
  /**
   * Grab an item.
   * @example Call variants:
   * @example Orion.DragItem(serial);
   * @example Orion.DragItem(serial, count);
   * @param serial - object serial number
   * @param count - how many items to take.  
   * @returns Does not return a value.
   */
  DragItem: function(serial, count) {
    // Unknown return type
  },
  /**
   * Find an item in a list, and grab it.
   * @example Call variants:
   * @example bool Orion.DragItemList(listName);
   * @example bool Orion.DragItemList(listName, container);
   * @example bool Orion.DragItemList(listName, container, count);
   * @param listName - search list name
   * @param container - the serial or alias of the container to search  
   * @param count - how many items to take.  
   * @returns boolean - true if the item is found.
   */
  DragItemList: function(listName, container, count) {
    return false;
  },
  /**
   * Find an item by type and grab it.
   * @example Call variants:
   * @example bool Orion.DragItemType(graphic);
   * @example bool Orion.DragItemType(graphic, color);
   * @example bool Orion.DragItemType(graphic, color, container);
   * @example bool Orion.DragItemType(graphic, color, container, count);
   * @example bool Orion.DragItemType(graphic, color, container, count, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param count - how many items to take.  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns boolean - true if an item is found.
   */
  DragItemType: function(graphic, color, container, count, ignoreLists) {
    return false;
  },
  /**
   * Put on a set of equipment
   * @example Orion.Dress(setName);
   * @param setName - set name. You can add a set in the Agents tab.
   * @returns Does not return a value.
   */
  Dress: function(setName) {
    // Unknown return type
  },
  /**
   * Drop the item at the specified coordinates.
   * @example Call variants:
   * @example Orion.Drop();
   * @example Orion.Drop(serial);
   * @example Orion.Drop(serial, count);
   * @example Orion.Drop(serial, count, x, y, z);
   * @param serial - item serial number  
   * @param count - how many items to drop away.  
   * @param x - X coordinate.  
   * @param y - Y coordinate.  
   * @param z - Z coordinate.  
   * @returns Does not return a value.
   */
  Drop: function(serial, count, x, y, z) {
    // Unknown return type
  },
  /**
   * Drop an item from the character’s hand at the specified coordinates.  
If x, y are specified as -1, -1 (or not specified) - moving to containers occurs at a random place.
   * @example Call variants:
   * @example Orion.DropDraggedItem();
   * @example Orion.DropDraggedItem(container);
   * @example Orion.DropDraggedItem(container, x, y, z);
   * @param container - drop container serial number  
   * @param x - X coordinate  
   * @param y - Y coordinate  
   * @param z - Z coordinate (only when dropping to the ground)  
   * @returns Does not return a value.
   */
  DropDraggedItem: function(container, x, y, z) {
    // Unknown return type
  },
  /**
   * Drop a grabbed object to the ground relative to the character.
   * @example Call variants:
   * @example Orion.DropDraggedItemRelative(x, y);
   * @example Orion.DropDraggedItemRelative(x, y, z);
   * @param x - X coordinate relative to the character
   * @param y - Y coordinate relative to the character
   * @param z - Z coordinate relative to the character  
   * @returns Does not return a value.
   */
  DropDraggedItemRelative: function(x, y, z) {
    // Unknown return type
  },
  /**
   * Drop the item under your feet.
   * @example Call variants:
   * @example Orion.DropHere();
   * @example Orion.DropHere(serial);
   * @example Orion.DropHere(serial, count);
   * @param serial - item serial number  
   * @param count - how many items to drop away.  
   * @returns Does not return a value.
   */
  DropHere: function(serial, count) {
    // Unknown return type
  },
  /**
   * Find an object from a search list and drop the item under your feet.
   * @example Call variants:
   * @example bool Orion.DropHereList(listName);
   * @example bool Orion.DropHereList(listName, container);
   * @example bool Orion.DropHereList(listName, container, count);
   * @param listName - search list name. You can add new lists in the Lists tab
   * @param container - the serial or alias of the container to search  
   * @param count - how many items to drop  
   * @returns boolean - true if the item is found.
   */
  DropHereList: function(listName, container, count) {
    return false;
  },
  /**
   * Find an item by type, and drop it at your feet.
   * @example Call variants:
   * @example bool Orion.DropHereType(graphic);
   * @example bool Orion.DropHereType(graphic, color);
   * @example bool Orion.DropHereType(graphic, color, container);
   * @example bool Orion.DropHereType(graphic, color, container, count);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param count - how many items to drop away.  
   * @returns boolean - true if the item is found.
   */
  DropHereType: function(graphic, color, container, count) {
    return false;
  },
  /**
   * Find an item in the specified list, and drop it at the specified coordinates.
   * @example Call variants:
   * @example bool Orion.DropList(listName);
   * @example bool Orion.DropList(listName, container);
   * @example bool Orion.DropList(listName, container, count);
   * @example bool Orion.DropList(listName, container, count, x, y, z);
   * @param listName - search list name
   * @param container - the serial or alias of the container to search  
   * @param count - how many items to drop  
   * @param x - X coordinate.  
   * @param y - Y coordinate.  
   * @param z - Z coordinate.  
   * @returns boolean - true if the item is found.
   */
  DropList: function(listName, container, count, x, y, z) {
    return false;
  },
  /**
   * Find and drop the item at the specified coordinates.
   * @example Call variants:
   * @example bool Orion.DropType(graphic);
   * @example bool Orion.DropType(graphic, color);
   * @example bool Orion.DropType(graphic, color, container);
   * @example bool Orion.DropType(graphic, color, container, count);
   * @example bool Orion.DropType(graphic, color, container, count, x, y, z);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')   
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')   
   * @param container - container in which to look for items   
   * @param count - how many items to drop  
   * @param x - X coordinate.  
   * @param y - Y coordinate.  
   * @param z - Z coordinate.  
   * @returns boolean - true if the item is found.
   */
  DropType: function(graphic, color, container, count, x, y, z) {
    return false;
  },
  /**
   * Request for call emotes.
   * @example Orion.EmoteAction(actionName);
   * @param actionName - name of emote (for example: bow, salute)
   * @returns Does not return a value.
   */
  EmoteAction: function(actionName) {
    // Unknown return type
  },
  /**
   * Get a list of enemies in one line.
   * @example Call variants:
   * @example String Orion.EnemyListToString();
   * @example String Orion.EnemyListToString(separator);
   * @param separator - the delimiter used to split the serial numbers  
   * @returns String - a list of enemies, condensed to one line, and split by the specified separator.
   */
  EnemyListToString: function(separator) {
    // Unknown return type
  },
  /**
   * Equip an item.
   * @example Orion.Equip(serial);
   * @param serial - the serial number of the item to be worn
   * @returns Does not return a value.
   */
  Equip: function(serial) {
    // Unknown return type
  },
  /**
   * Equip the item from the character’s hand.
   * @example Call variants:
   * @example Orion.EquipDraggedItem();
   * @example Orion.EquipDraggedItem(container);
   * @param container - container serial number  
   * @returns Does not return a value.
   */
  EquipDraggedItem: function(container) {
    // Unknown return type
  },
  /**
   * Equip an item by type from the players backpack and pouches (with the recursive search option enabled).
   * @example Call variants:
   * @example Orion.EquipT(graphic);
   * @example Orion.EquipT(graphic, color);
   * @param graphic - graphic of item to search
   * @param color - color of item to search  
   * @returns Does not return a value.
   */
  EquipT: function(graphic, color) {
    // Unknown return type
  },
  /**
   * Convert the serial number of EasyUO into HEX.
   * @example String Orion.SerialToEuo(serial);
   * @param serial - serial number of EasyUO
   * @returns String - serial number HEX.
   */
  SerialToEuo: function(serial) {
    // Unknown return type
  },
  /**
   * Start execution of a new script (in a new thread independent of the current script).
   * @example Call variants:
   * @example Orion.Exec(functionName);
   * @example Orion.Exec(functionName, oneScriptRunning);
   * @example Orion.Exec(functionName, oneScriptRunning, argumentsList);
   * @param functionName - script name to run.
   * @param oneScriptRunning - ture to run only one instance of this script.  
   * @param argumentsList - script start arguments.  
   * @returns Does not return a value.
   */
  Exec: function(functionName, oneScriptRunning, argumentsList) {
    // Unknown return type
  },
  /**
   * Get all fake semi-transparent static objects added to the world map.
   * @example Call variants:
   * @example Orion.FakeMapObjectsList();
   * @example Orion.FakeMapObjectsList(map);
   * @param map - the ID of the map/facet  
   * @returns String list - serial numbers of added fake objects.
   */
  FakeMapObjectsList: function(map) {
    // Unknown return type
  },
  /**
   * Find an enemy.
   * @example Call variants:
   * @example String Orion.FindEnemy();
   * @example String Orion.FindEnemy(flags);
   * @example String Orion.FindEnemy(flags, distance);
   * @example String Orion.FindEnemy(flags, distance, notoriety);
   * @returns String - serial number of the enemy found.
   */
  FindEnemy: function() {
    // Unknown return type
  },
  /**
   * Find a friend.
   * @example Call variants:
   * @example String Orion.FindFriend();
   * @example String Orion.FindFriend(flags);
   * @example String Orion.FindFriend(flags, distance);
   * @example String Orion.FindFriend(flags, distance, notoriety);
   * @returns String - the serial number of the friend object.
   */
  FindFriend: function() {
    return 0
  },
  /**
   * Search for items in the search list from the specified container, taking into account flags, distance and notoriety.
   * @example Call variants:
   * @example StringList Orion.FindList(listName);
   * @example StringList Orion.FindList(listName, container);
   * @example StringList Orion.FindList(listName, container, flags);
   * @example StringList Orion.FindList(listName, container, flags, distance);
   * @example StringList Orion.FindList(listName, container, flags, distance, notoriety);
   * @example StringList Orion.FindList(listName, container, flags, distance, notoriety, recurse);
   * @param listName - May contain several search lists delimited by pipes: |  
   * @param container - the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns String list - serial numbers of found objects.
   */
  FindList: function(listName, container, recurse) {
    return 0
  },
  /**
   * Search for items in the search list from the specified container, taking into account flags, distance and notoriety.
   * @example Call variants:
   * @example GameObjectList Orion.FindListEx(listName);
   * @example GameObjectList Orion.FindListEx(listName, container);
   * @example GameObjectList Orion.FindListEx(listName, container, flags);
   * @example GameObjectList Orion.FindListEx(listName, container, flags, distance);
   * @example GameObjectList Orion.FindListEx(listName, container, flags, distance, notoriety);
   * @example GameObjectList Orion.FindListEx(listName, container, flags, distance, notoriety, recurse);
   * @param listName - May contain several search lists separated by pipes: |  
   * @param container - the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns n array of found class objects "GameObject"
   */
  FindListEx: function(listName, container, recurse) {
    return [GameObject]
  },
  /**
   * Get an object.
   * @example GameObject Orion.FindObject(serial);
   * @param serial - ID of the object to search. You can use "\_info" in-game to obtain a serial.
   * @returns lass object [GameObject](search:obj.), or null if the object with the specified serial number is not found.   
   */
  FindObject: function(serial) {
    retun [GameObject]
  },
  /**
   * Search for items by type and color (if necessary) from the specified container, taking into account (if specified) flags, distance, notoriety, etc.
   * @example Call variants:
   * @example StringList Orion.FindType(graphic);
   * @example StringList Orion.FindType(graphic, color);
   * @example StringList Orion.FindType(graphic, color, container);
   * @example StringList Orion.FindType(graphic, color, container, flags);
   * @example StringList Orion.FindType(graphic, color, container, flags, distance);
   * @example StringList Orion.FindType(graphic, color, container, flags, distance, notoriety);
   * @example StringList Orion.FindType(graphic, color, container, flags, distance, notoriety, recurse);
   * @example StringList Orion.FindType(graphic, color, container, flags, distance, notoriety, recurse, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - Can be combined with pipes: | such as: ('list1|list2')  
   * @returns String list - a list of serial numbers of the found objects.
   */
  FindType: function(graphic, color, container, recurse, ignoreLists) {
    return []
  },
  /**
   * Search for items by type and color (if necessary) from the specified container, taking into account (if specified) flags, distance, notoriety, etc.
   * @example Call variants:
   * @example GameObjectList Orion.FindTypeEx(graphic);
   * @example GameObjectList Orion.FindTypeEx(graphic, color);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container, flags);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container, flags, distance);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container, flags, distance, notoriety);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container, flags, distance, notoriety, recurse);
   * @example GameObjectList Orion.FindTypeEx(graphic, color, container, flags, distance, notoriety, recurse, ignoreLists);
   * @param graphic - string - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')
Value of 'any' - this field is ignored
   * @param color - color - string - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')
Value of 'any' - this field is ignored
Default value: 'any'
   * @param container - string - the serial or alias of the container to search
Default value: 'backpack'
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns n array of found class objects: GameObject
   */
  FindTypeEx: function(graphic) {
    // Unknown return type
  },
  FindTypeEx: function(graphic, color) {
    // Unknown return type
  },
  FindTypeEx: function(graphic, color, container) {
    // Unknown return type
  },
  FindTypeEx: function(graphic, color, container, flags) {
    // Unknown return type
  },
  /**
   * Search for wands in the specified container.
   * @example Call variants:
   * @example String Orion.FindWand(name);
   * @example String Orion.FindWand(name, container);
   * @example String Orion.FindWand(name, container, recurse);
   * @param name - can be:
   * @param container - the serial of the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns String - serial number of the found wand.
   */
  FindWand: function(name, container, recurse) {
    // Unknown return type
  },
  /**
   * Start/stop following a character.
   * @example Call variants:
   * @example Orion.Follow(serial);
   * @example Orion.Follow(serial, enabled);
   * @param serial - the other character serial number
   * @param enabled - following action. True if you want to follow. False if you want to stop  
   * @returns Does not return a value.
   */
  Follow: function(serial, enabled) {
    // Unknown return type
  },
  /**
   * Remove an object from the Orion's memory.
   * @example Orion.Forget(serial);
   * @param serial - object serial number
   * @returns Does not return a value.
   */
  Forget: function(serial) {
    // Unknown return type
  },
  /**
   * Get friends list in one line.
   * @example Call variants:
   * @example String Orion.FriendListToString();
   * @example String Orion.FriendListToString(separator);
   * @param separator - the delimiter used to split the serial numbers  
   * @returns String - friends serial numbers, condensed to one line.
   */
  FriendListToString: function(separator) {
    // Unknown return type
  },
  /**
   * Get a list of the specified agents.
   * @example Call variants:
   * @example StringList Orion.GetAgents(agentType);
   * @example StringList Orion.GetAgents(agentType, mode);
   * @param agentType - Can be 'autoloot', 'scavenger', 'organizer'
   * @param mode - Can be 'started', 'stopped', 'all'  
   * @returns String list
   */
  GetAgents: function(agentType, mode) {
    // Unknown return type
  },
  /**
   * Get the status of the text color replacement option for the rest of the objects in the world.
   * @example bool Orion.GetCharactersFontColor();
   * @returns 
   */
  GetCharactersFontColor: function() {
    // Unknown return type
  },
  /**
   * Get text replacement colors for other objects in the world.
   * @example String Orion.GetCharactersFontColorValue();
   * @returns 
   */
  GetCharactersFontColorValue: function() {
    // Unknown return type
  },
  /**
   * Get the cliloc String.
   * @example String Orion.GetCliLocString(cliLocId);
   * @returns String - the value of the cliloc
   */
  GetCliLocString: function() {
    // Unknown return type
  },
  /**
   * Get the serial number of the container that the specified object is in
   * @example String Orion.GetContainer(serial);
   * @param serial - The object serial ID
   * @returns String - the serial number of the object's container.
   */
  GetContainer: function(serial) {
    // Unknown return type
  },
  /**
   * Get the context menu object.
   * @example ContextMenuObject Orion.GetContextMenu();
   * @returns 
   */
  GetContextMenu: function() {
    // Unknown return type
  },
  /**
   * Get current abilities.
   * @example StringList Orion.GetCurrentAbilityNames();
   * @returns 
   */
  GetCurrentAbilityNames: function() {
    // Unknown return type
  },
  /**
   * Get the vendor's current product list object.
   * @example VendorListObject Orion.GetCurrentVendorList();
   * @returns 
   */
  GetCurrentVendorList: function() {
    // Unknown return type
  },
  /**
   * Calculate distance to an object OR a coordinate
   * @example Call variants:
   * @example int Orion.GetDistance(serial);
   * @example int Orion.GetDistance(x, y);
   * @param serial - serial number of the object
   * @param x - X coordinate in the world
   * @param y - Y coordinate in the world
   * @returns integer - tile distance to the object/coord.
   */
  GetDistance: function(serial, x, y) {
    // Unknown return type
  },
  /**
   * Get dress list item IDs
   * @example StringList Orion.GetDressList(name);
   * @param name - dress list name
   * @returns String list - list of item serials from the dress list.
   */
  GetDressList: function(name) {
    // Unknown return type
  },
  /**
   * Request the status of enemies within line-of-sight.
   * @example Orion.GetEnemiesStatus();
   * @returns 
   */
  GetEnemiesStatus: function() {
    // Unknown return type
  },
  /**
   * Get enemy list.
   * @example Call variants:
   * @example StringList Orion.GetEnemyList();
   * @example StringList Orion.GetEnemyList(names);
   * @param names - true to get names, false to get serial numbers  
   * @returns String list - list of enemy names/serials
   */
  GetEnemyList: function(names) {
    // Unknown return type
  },
  /**
   * Get/create a search list
   * @example FindList Orion.GetFindList(listName);
   * @param listName - search list name
   * @returns lass object FindList
   */
  GetFindList: function(listName) {
    // Unknown return type
  },
  /**
   * Get the status of the text color replacement option.
   * @example bool Orion.GetFontColor();
   * @returns 
   */
  GetFontColor: function() {
    // Unknown return type
  },
  /**
   * Get text replacement color.
   * @example String Orion.GetFontColorValue();
   * @returns 
   */
  GetFontColorValue: function() {
    // Unknown return type
  },
  /**
   * Get friends list.
   * @example Call variants:
   * @example StringList Orion.GetFriendList();
   * @example StringList Orion.GetFriendList(names);
   * @param names - true to get names, false to get serial numbers  
   * @returns String list - list of friend names/serials
   */
  GetFriendList: function(names) {
    // Unknown return type
  },
  /**
   * Request the status of friends within sight.
   * @example Orion.GetFriendsStatus();
   * @returns 
   */
  GetFriendsStatus: function() {
    // Unknown return type
  },
  /**
   * Get the value of a global variable.
   * @example String Orion.GetGlobal(name);
   * @param name - global variable name
   * @returns String - the value of the global variable, or if it is not yet declared.
   */
  GetGlobal: function(name) {
    // Unknown return type
  },
  /**
   * Get true graphic.
   * @example String Orion.GetGraphic(graphic);
   * @param graphic - alias to get the true graphic
   * @returns String - the true graphic.
   */
  GetGraphic: function(graphic) {
    // Unknown return type
  },
  /**
   * Get gump from Orion's memory.
   * @example Call variants:
   * @example GumpObject Orion.GetGump(index);
   * @example GumpObject Orion.GetGump(serial, id);
   * @param index - gump index. Starts at 0.
   * @param serial - gump serial number.
   * @param id - gump ID.
   * @returns lass object GumpObject or null if it does not exist
   */
  GetGump: function(index, serial, id) {
    // Unknown return type
  },
  /**
   * Get gump coordinates in the client.
   * @example Call variants:
   * @example PositionObject Orion.GetGumpPosition(type);
   * @example PositionObject Orion.GetGumpPosition(type, serial);
   * @example PositionObject Orion.GetGumpPosition(type, serial, id);
   * @param  - gump type
   * @param serial - gump serial number (only needed for interaction with gumps that have a serial number, for example: containers, statusbars, paperdolls, etc.)  
   * @param id - gump identifier (needed only for interacting with gumps that have an identifier, for example: server gumps, trade gump)  
   * @returns lass object PositionObject  
   */
  GetGumpPosition: function(type, serial, id) {
    // Unknown return type
  },
  /**
   * Get/create an ignore list object when searching.
   * @example IgnoreList Orion.GetIgnoreList(listName);
   * @returns lass object IgnoreList
   */
  GetIgnoreList: function() {
    // Unknown return type
  },
  /**
   * Get a land tiledata for the specified tile.
   * @example LandTiledataObject Orion.GetLandTiledata(graphic);
   * @param graphic - tile graphic
   * @returns lass object LandTiledataObject, or null if there is no land tiledata for this tile.
   */
  GetLandTiledata: function(graphic) {
    // Unknown return type
  },
  /**
   * Get the last recorded coordinates of the 'lastattack' flag.
   * @example PositionObject Orion.GetLastAttackPosition();
   * @returns 
   */
  GetLastAttackPosition: function() {
    // Unknown return type
  },
  /**
   * Get the last gump opened/created
   * @example GumpObject Orion.GetLastGump();
   * @returns 
   */
  GetLastGump: function() {
    // Unknown return type
  },
  /**
   * Get the last recorded coordinates 'lasttarget'.
   * @example PositionObject Orion.GetLastTargetPosition();
   * @returns 
   */
  GetLastTargetPosition: function() {
    // Unknown return type
  },
  /**
   * Get server menu.
   * @example MenuObject Orion.GetMenu(nameOrIndex);
   * @param nameOrIndex - menu name or index
   * @returns lass object MenuObject, or null if the menu does not exist
   */
  GetMenu: function(nameOrIndex) {
    // Unknown return type
  },
  /**
   * Get mouse coordinates in game window.
   * @example PositionObject Orion.GetMousePosition();
   * @returns 
   */
  GetMousePosition: function() {
    // Unknown return type
  },
  /**
   * Get a list of multi workspaces in the player's field of vision.
   * @example ObjectsArray Orion.GetMultisRect();
   * @returns 
   */
  GetMultisRect: function() {
    // Unknown return type
  },
  /**
   * Building a path to a specified point in the world.
   * @example Call variants:
   * @example PositionObjectList Orion.GetPathArray(endX, endY);
   * @example PositionObjectList Orion.GetPathArray(endX, endY, endZ);
   * @example PositionObjectList Orion.GetPathArray(endX, endY, endZ, distanceXY);
   * @example PositionObjectList Orion.GetPathArray(endX, endY, endZ, distanceXY, distanceZ);
   * @example PositionObjectList Orion.GetPathArray(endX, endY, endZ, distanceXY, distanceZ, run);
   * @example PositionObjectList Orion.GetPathArray(endX, endY, endZ, distanceXY, distanceZ, run, openDoor);
   * @param endX - target X coordinate
   * @param endY - target Y coordinate
   * @param endZ - target Z coordinate  
   * @param distanceXY - maximum distance along the X and Y axis to the end point  
   * @param distanceZ - maximum distance along the Z axis to the end point  
   * @param run - running mode  
   * @param openDoor - door opening mode  
   * @returns rray of objects PositionObject, with waypoints to the destination point.
   */
  GetPathArray: function(endX, endY, endZ, distanceXY, distanceZ, run, openDoor) {
    // Unknown return type
  },
  /**
   * Building a path from and to a specified point in the world.
   * @example Call variants:
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, endX, endY);
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, startZ, endX, endY, endZ);
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, startZ, endX, endY, endZ, distanceXY);
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, startZ, endX, endY, endZ, distanceXY, distanceZ);
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, startZ, endX, endY, endZ, distanceXY, distanceZ, run);
   * @example PositionObjectList Orion.GetPathArrayEx(startX, startY, startZ, endX, endY, endZ, distanceXY, distanceZ, run, openDoor);
   * @param startX - initial coordinate X
   * @param startY - initial coordinate Y
   * @param startZ - initial coordinate Z  
   * @param endX - target X coordinate
   * @param endY - target Y coordinate
   * @param endZ - target Z coordinate  
   * @param distanceXY - maximum distance along the X and Y axis to the end point  
   * @param distanceZ - maximum distance along the Z axis to the end point  
   * @param run - running mode  
   * @param openDoor - door opening mode  
   * @returns rray of objects PositionObject, with waypoints from start to destination.
   */
  GetPathArrayEx: function(startX, startY, startZ, endX, endY, endZ, distanceXY, distanceZ, run, openDoor) {
    // Unknown return type
  },
  /**
   * Get the ping value calculated by the client (only when the ping check option is enabled).
   * @example int Orion.GetPing(name);
   * @param name - ping mode  
   * @returns integer - ping value (9999 if the ping was not requested/received).
   */
  GetPing: function(name) {
    // Unknown return type
  },
  /**
   * Get a character profile.
   * @example Call variants:
   * @example bool Orion.GetProfile(serial);
   * @example bool Orion.GetProfile(serial, delay);
   * @example bool Orion.GetProfile(serial, delay, errorTextPattern);
   * @param serial - the serial number of the object to request the profile
   * @param delay - maximum latency in milliseconds. See [Wait](searchend:.wait) for information on string constants  
   * @param errorTextPattern - error text. When this text is received from the server, the wait is interrupted  
   * @returns boolean - true if the profile came from the server.
   */
  GetProfile: function(serial, delay, errorTextPattern) {
    return false;
  },
  /**
   * Get scripts list.
   * @example Call variants:
   * @example StringList Orion.GetScripts();
   * @example StringList Orion.GetScripts(mode);
   * @param mode - Can be 'started', 'paused', 'all'  
   * @returns String list of scripts
   */
  GetScripts: function(mode) {
    // Unknown return type
  },
  /**
   * Get a real serial number.
   * @example String Orion.GetSerial(serial);
   * @param serial - the alias of the object to obtain a true serial number  
   * @returns String - true serial number.
   */
  GetSerial: function(serial) {
    // Unknown return type
  },
  /**
   * Get/create a shopping list
   * @example ShopListObject Orion.GetShopList(listName);
   * @param delay - shopping list name
   * @returns lass object ShopListObject, or null if it does not exist
   */
  GetShopList: function(delay) {
    // Unknown return type
  },
  /**
   * Get a static tiledata for the specified tile.
   * @example StaticTiledataObject Orion.GetStaticTiledata(graphic);
   * @param graphic - tile graphics
   * @returns lass object StaticTiledataObject, or null if there is no static tiledata for this tile.
   */
  GetStaticTiledata: function(graphic) {
    // Unknown return type
  },
  /**
   * Get the status of an object.
   * @example Call variants:
   * @example Orion.GetStatus();
   * @example Orion.GetStatus(serial);
   * @param serial - serial number of the object  
   * @returns Does not return a value.
   */
  GetStatus: function(serial) {
    // Unknown return type
  },
  /**
   * Checking the possibility of passage to the specified range of coordinates.
   * @example Call variants:
   * @example StepsCounterObjectList Orion.GetStepsCountArray(startX, startY, endX, endY);
   * @example StepsCounterObjectList Orion.GetStepsCountArray(startX, startY, startZ, endX, endY, endZ);
   * @example StepsCounterObjectList Orion.GetStepsCountArray(startX, startY, startZ, endX, endY, endZ, openDoor);
   * @param startX - starting X coordinate of the zone
   * @param startY - starting Y coordinate of the zone
   * @param startZ - starting Z coordinate of the zone  
   * @param endX - target X coordinate of the zone
   * @param endY - target Y coordinate of the zone
   * @param endZ - target Z coordinate of the zone  
   * @param openDoor - door opening mode  
   * @returns rray of objects StepsCounterObject, for each tile for which a route was attempted.
   */
  GetStepsCountArray: function(startX, startY, startZ, endX, endY, endZ, openDoor) {
    // Unknown return type
  },
  /**
   * Checking the possibility of passage to the specified range of coordinates by distance relative to the position of the character in the world.
   * @example Call variants:
   * @example StepsCounterObjectList Orion.GetStepsCountArrayByDistance(maxDistance);
   * @example StepsCounterObjectList Orion.GetStepsCountArrayByDistance(minDistance, maxDistance);
   * @example StepsCounterObjectList Orion.GetStepsCountArrayByDistance(minDistance, maxDistance, openDoor);
   * @param maxDistance - maximum distance from the character
   * @param minDistance - minimum distance from the character  
   * @param openDoor - door opening mode  
   * @returns rray of objects StepsCounterObject, for each tile for which a route was attempted.
   */
  GetStepsCountArrayByDistance: function(maxDistance, minDistance, openDoor) {
    // Unknown return type
  },
  /**
   * Get target type.
   * @example int Orion.GetTargetType();
   * @returns 
   */
  GetTargetType: function() {
    // Unknown return type
  },
  /**
   * Get a server dialog for entering text.
   * @example Call variants:
   * @example TextDialogObject Orion.GetTextDialog(name);
   * @example TextDialogObject Orion.GetTextDialog(serial, id, name);
   * @param name - the name of the dialog  
   * @param serial - serial number of the dialog  
   * @param id - dialog id  
   * @returns lass object TextDialogObject, or null if object creation failed/no dialog.
   */
  GetTextDialog: function(name, serial, id) {
    // Unknown return type
  },
  /**
   * Get a list of tiles in the specified coordinates.
   * @example Call variants:
   * @example TileObjectList Orion.GetTiles(tileFlags, x, y);
   * @example TileObjectList Orion.GetTiles(tileFlags, x, y, startZ, endZ);
   * @param x - X coordinate in the world where to look for tiles
   * @param y - Y coordinate in the world where to look for tiles
   * @param startZ - the initial Z coordinate in the world from which to start searching for tiles  
   * @param endZ - the final Z coordinate in the world to which you want to search for tiles  
   * @returns rray TileObject - list of found tiles.
   */
  GetTiles: function(x, y, startZ, endZ) {
    // Unknown return type
  },
  /**
   * Get a list of tiles in the specified range of coordinates (rectangle).
   * @example Call variants:
   * @example TileObjectList Orion.GetTilesInRect(tileFlags, startX, startY, endX, endY);
   * @example TileObjectList Orion.GetTilesInRect(tileFlags, startX, startY, startZ, endX, endY, endZ);
   * @param  - tiles flags for search
   * @param startX - the initial X coordinate to start searching for tiles
   * @param startY - the initial Y coordinate to start searching for tiles
   * @param startZ - the initial Z coordinate to start searching for tiles  
   * @param endX - the final X coordinate you want to search for tiles
   * @param endY - the final Y coordinate you want to search for tiles
   * @param endZ - the final Z coordinate you want to search for tiles  
   * @returns rray TileObject - list of found tiles.
   */
  GetTilesInRect: function(tileFlags, startX, startY, startZ, endX, endY, endZ) {
    // Unknown return type
  },
  /**
   * Get the coordinates of the pointer on the world map (if the gump is open).
   * @example PositionObject Orion.GetWorldMapPointerPosition();
   * @returns 
   */
  GetWorldMapPointerPosition: function() {
    // Unknown return type
  },
  /**
   * Server guild gump request.
   * @example Orion.GuildGump();
   * @returns 
   */
  GuildGump: function() {
    // Unknown return type
  },
  /**
   * Get the number of unanswered gumps in Orion's memory.
   * @example int Orion.GumpCount();
   * @returns 
   */
  GumpCount: function() {
    // Unknown return type
  },
  /**
   * Check for a gump in the client.
   * @example Call variants:
   * @example bool Orion.GumpExists(type);
   * @example bool Orion.GumpExists(type, serial);
   * @example bool Orion.GumpExists(type, serial, id);
   * @param serial - gump serial number (only needed for interaction with gumps that have a serial number, for example: containers, statusbars, paperdolls, etc.)  
   * @param id - gump identifier (needed only for interacting with gumps that have an identifier, for example: server gumps, trade gump)  
   * @returns boolean - true if there is a gump, false if not.
   */
  GumpExists: function(serial, id) {
    return false;
  },
  /**
   * Checking the presence of a target in the client.
   * @example bool Orion.HaveTarget();
   * @returns 
   */
  HaveTarget: function() {
    // Unknown return type
  },
  /**
   * Server help gump request.
   * @example Orion.HelpGump();
   * @returns 
   */
  HelpGump: function() {
    // Unknown return type
  },
  /**
   * Hide object.
   * @example Call variants:
   * @example Orion.Hide();
   * @example Orion.Hide(serial);
   * @param serial - object serial number to hide  
   * @returns Does not return a value.
   */
  Hide: function(serial) {
    // Unknown return type
  },
  /**
   * Get the remaining lifetime of the highlighted area.
   * @example int Orion.HighlightAreaTimer(id);
   * @param id - area id;
   * @returns integer - the remainder of the area display time (in milliseconds). If 0 is returned, then there is no area in the client.
   */
  HighlightAreaTimer: function(id) {
    // Unknown return type
  },
  /**
   * Send GET request HTTP(S).
   * @example String Orion.HttpGet(request);
   * @param request - GET request.
   * @returns String - response text.
   */
  HttpGet: function(request) {
    // Unknown return type
  },
  /**
   * Send POST request HTTP(S).
   * @example String Orion.HttpPost(request, data);
   * @param request - POST request.
   * @param data - data for POST request.
   * @returns String - response text.
   */
  HttpPost: function(request, data) {
    // Unknown return type
  },
  /**
   * Send PUT request HTTP(S).
   * @example String Orion.HttpPut(request, data);
   * @param request - PUT request.
   * @param data - data for PUT request.
   * @returns String - response text.
   */
  HttpPut: function(request, data) {
    // Unknown return type
  },
  /**
   * Change state to Ignored of given object(s).
   * @example Call variants:
   * @example Orion.Ignore(serial);
   * @example Orion.Ignore(serial, state);
   * @example Orion.Ignore(serials, state);
   * @param serial - object serial number
   * @param serials - list of object serial numbers
   * @param state - true if the object should be ignored  
   * @returns Does not return a value.
   */
  Ignore: function(serial, serials, state) {
    // Unknown return type
  },
  /**
   * Reset Ignored state from all objects.
   * @example Orion.IgnoreReset();
   * @returns 
   */
  IgnoreReset: function() {
    // Unknown return type
  },
  /**
   * Display information about an object in a text window or object inspector.
   * @example Call variants:
   * @example Orion.Info();
   * @example Orion.Info(serial);
   * @param serial - serial number of the object  
   * @returns Does not return a value.
   */
  Info: function(serial) {
    // Unknown return type
  },
  /**
   * Display information about current buffs and debuffs in a text window.
   * @example Orion.InfoBuff();
   * @returns 
   */
  InfoBuff: function() {
    // Unknown return type
  },
  /**
   * Display information on the last context menu in the text window.
   * @example Orion.InfoContextMenu();
   * @returns 
   */
  InfoContextMenu: function() {
    // Unknown return type
  },
  /**
   * Display information about a gump in the text window.
   * @example Call variants:
   * @example Orion.InfoGump();
   * @example Orion.InfoGump(index);
   * @param index - gump index for information output.  
   * @returns Does not return a value.
   */
  InfoGump: function(index) {
    // Unknown return type
  },
  /**
   * Display information about the menu content from the server in the text window.
   * @example Call variants:
   * @example Orion.InfoMenu();
   * @example Orion.InfoMenu(index);
   * @param index - menu index for information output.  
   * @returns Does not return a value.
   */
  InfoMenu: function(index) {
    // Unknown return type
  },
  /**
   * Display information about the content of the dialog for entering text from the server into the text window.
   * @example Call variants:
   * @example Orion.InfoTextDialog();
   * @example Orion.InfoTextDialog(index);
   * @param index - index of the dialog for outputting information.  
   * @returns Does not return a value.
   */
  InfoTextDialog: function(index) {
    // Unknown return type
  },
  /**
   * Displaying tile information in a text window.
   * @example Call variants:
   * @example Orion.InfoTile();
   * @example Orion.InfoTile(tile);
   * @param tile - if 'lasttile' is specified, display information on the last tile targeted  
   * @returns Does not return a value.
   */
  InfoTile: function(tile) {
    // Unknown return type
  },
  /**
   * Check for a message in the journal.
   * @example Call variants:
   * @example JournalMessage Orion.InJournal(pattern);
   * @example JournalMessage Orion.InJournal(pattern, flags);
   * @example JournalMessage Orion.InJournal(pattern, flags, serial);
   * @example JournalMessage Orion.InJournal(pattern, flags, serial, color);
   * @example JournalMessage Orion.InJournal(pattern, flags, serial, color, startTime);
   * @example JournalMessage Orion.InJournal(pattern, flags, serial, color, startTime, endTime);
   * @param pattern - text pattern.
   * @param  - journal filter flags. For example: sys  
   * @param serial - the serial number of the character who spoke.  
   * @param color - message color.  
   * @param startTime - initial search time, in milliseconds. Can be obtained by function Orion.Now()  
   * @param endTime - the final search time, in milliseconds. Can be obtained by function Orion.Now()  
   * @returns lass object JournalMessage or null if nothing was found.
   */
  InJournal: function(pattern, flags, serial, color, startTime, endTime) {
    // Unknown return type
  },
  /**
   * Checking line of sight (LoS) to an object/point in the world.
   * @example Call variants:
   * @example bool Orion.InLOS(serial);
   * @example bool Orion.InLOS(endX, endY);
   * @example bool Orion.InLOS(endX, endY, endZ);
   * @example bool Orion.InLOS(startX, startY, endX, endY);
   * @example bool Orion.InLOS(startX, startY, startZ, endX, endY, endZ);
   * @param serial - serial number of the object to be checked LoS
   * @param startX - X origin in the world, where to check LoS  
   * @param startY - Y origin in the world, where to check LoS  
   * @param startZ - Z origin in the world, where to check LoS  
   * @param endX - the final X coordinate in the world, to where to check LoS
   * @param endY - the final Y coordinate in the world, to where to check LoS
   * @param endZ - the final Z coordinate in the world, to where to check LoS  
   * @returns boolean - true if the object/point is in direct line of sight and is not blocked by anything.
   */
  InLOS: function(serial, startX, startY, startZ, endX, endY, endZ) {
    return false;
  },
  /**
   * Check if the object is in a party
   * @example Call variants:
   * @example bool Orion.InParty();
   * @example bool Orion.InParty(serial);
   * @param serial - serial number of the object to be checked  
   * @returns boolean - true if the object (character) is in a party
   */
  InParty: function(serial) {
    return false;
  },
  /**
   * Set a hook for entering text into chat. The sent message will be completely intercepted by the assistant.  
Attention! If the hook retires by timeout, the sent message will go to the world.
   * @example Call variants:
   * @example String Orion.InputText();
   * @example String Orion.InputText(maxDelay);
   * @example String Orion.InputText(maxDelay, message);
   * @param maxDelay - maximum latency in milliseconds  
   * @param message - message displayed when hook is activated  
   * @returns String - intercepted message or empty line (if timeout is reached).
   */
  InputText: function(maxDelay, message) {
    // Unknown return type
  },
  /**
   * Checking if the number value is within the specified range.
   * @example bool Orion.InRange(value, minValue, maxValue);
   * @returns boolean - true if the value is within the specified range.
   */
  InRange: function() {
    return false;
  },
  /**
   * Interrupt spell casting by grabbing a random piece of equipment on the character.  
Attention! If the character is naked, the interruption will not occur.
   * @example Orion.InterruptCast();
   * @returns 
   */
  InterruptCast: function() {
    // Unknown return type
  },
  /**
   * Invoke one of the 8 virtues
   * @example Orion.InvokeVirtue(name);
   * @returns Does not return a value.
   */
  InvokeVirtue: function() {
    // Unknown return type
  },
  /**
   * Check whether the purchase/sale of goods is currently underway.
   * @example bool Orion.IsShopping();
   * @returns 
   */
  IsShopping: function() {
    // Unknown return type
  },
  /**
   * Check if pathfinding is currently running.
   * @example bool Orion.IsWalking();
   * @returns 
   */
  IsWalking: function() {
    // Unknown return type
  },
  /**
   * Get the number of journal messages.
   * @example int Orion.JournalCount();
   * @returns 
   */
  JournalCount: function() {
    // Unknown return type
  },
  /**
   * Option to control case sensitivity when searching a journal.
   * @example Orion.JournalIgnoreCase(state);
   * @param state - new option state.
   * @returns Does not return a value.
   */
  JournalIgnoreCase: function(state) {
    // Unknown return type
  },
  /**
   * Get the journal message at a specified line number
   * @example JournalMessage Orion.JournalLine(index);
   * @param index - message index starts at 0
   * @returns lass object JournalMessage or null if there is no such message.
   */
  JournalLine: function(index) {
    // Unknown return type
  },
  /**
   * Option to save object name in journal message.
   * @example Orion.JournalSaveName(state);
   * @param state - new option state.
   * @returns Does not return a value.
   */
  JournalSaveName: function(state) {
    // Unknown return type
  },
  /**
   * Send a key press to the client (triggering of the client's macros and the assistant's hotkeys without window focus).
   * @example Call variants:
   * @example bool Orion.KeyPress(key);
   * @example bool Orion.KeyPress(key, ctrl);
   * @example bool Orion.KeyPress(key, ctrl, alt);
   * @example bool Orion.KeyPress(key, ctrl, alt, shift);
   * @param key - will alternately press a, s, d)  
   * @param ctrl - hold Ctrl  
   * @param alt - hold Alt  
   * @param shift - hold Shift  
   * @returns Does not return a value.   
   */
  KeyPress: function(key, ctrl, alt, shift) {
    // Unknown return type
  },
  /**
   * Get the latest journal message.
   * @example JournalMessage Orion.LastJournalMessage();
   * @returns 
   */
  LastJournalMessage: function() {
    // Unknown return type
  },
  /**
   * Launch a third-party application.
   * @example Call variants:
   * @example Orion.Launch(filePath);
   * @example Orion.Launch(filePath, arguments);
   * @param filePath - path to the application
   * @param arguments - application start arguments.  
   * @returns Does not return a value.
   */
  Launch: function(filePath, arguments) {
    // Unknown return type
  },
  /**
   * Get the light level.
   * @example Call variants:
   * @example int Orion.Light();
   * @example int Orion.Light(type);
   * @param type - Can be: 'real' (sent by the server), 'current' (used by the assistant), 'personal'  
   * @returns integer - the value of the specified lighting type.
   */
  Light: function(type) {
    // Unknown return type
  },
  /**
   * Load a set of hotkeys (from the Hotkeys folder in the root of the assistant).
   * @example bool Orion.LoadHotkeys(fileName);
   * @param fileName - the path to the file
   * @returns boolean - true if the file is loaded.
   */
  LoadHotkeys: function(fileName) {
    return false;
  },
  /**
   * Load assistant profile.
   * @example Orion.LoadProfile(name);
   * @param name - profile name to load
   * @returns Does not return a value.
   */
  LoadProfile: function(name) {
    // Unknown return type
  },
  /**
   * Load the script file (replacing of the current one).
   * @example Orion.LoadScript(filePath);
   * @param filePath - the path to the file.
   * @returns Does not return a value.
   */
  LoadScript: function(filePath) {
    // Unknown return type
  },
  /**
   * Quit the game (without closing the client - exit to the start screen).
   * @example Orion.LogOut();
   * @returns 
   */
  LogOut: function() {
    // Unknown return type
  },
  /**
   * Check if any assistant macro is currently running.
   * @example bool Orion.MacroIsPlaying();
   * @returns 
   */
  MacroIsPlaying: function() {
    // Unknown return type
  },
  /**
   * The number of unreplied menus.
   * @example int Orion.MenuCount();
   * @returns 
   */
  MenuCount: function() {
    // Unknown return type
  },
  /**
   * Change character body graphic.
   * @example Call variants:
   * @example Orion.Morph();
   * @example Orion.Morph(graphic);
   * @example Orion.Morph(graphic, serial);
   * @param graphic - body graphic  
   * @param serial - character serial number  
   * @returns Does not return a value.
   */
  Morph: function(graphic, serial) {
    // Unknown return type
  },
  /**
   * Click with the mouse at the specified coordinates.
   * @example Orion.MouseClick(x, y, button);
   * @param x - X coordinate in the window to click
   * @param y - Y coordinate in the window to click
   * @param button - ID of the button to click (left/right/mid/x1/x2, can be combined with 'double' for doubleclick. For example: 'left|double')
   * @returns Does not return a value.   
   */
  MouseClick: function(x, y, button) {
    // Unknown return type
  },
  /**
   * Move (or open if possible) gump in client.
   * @example Call variants:
   * @example Orion.MoveGump(type, x, y);
   * @example Orion.MoveGump(type, x, y, serial);
   * @example Orion.MoveGump(type, x, y, serial, id);
   * @param x - X coordinate on screen to move gump
   * @param y - Y coordinate on screen to move gump
   * @param serial - gump serial number (only needed for interaction with gumps that have a serial number, for example: containers, statusbars, paperdolls, etc.)  
   * @param id - gump identifier (needed only for interacting with gumps that have an identifier, for example: server gumps, trade gump)  
   * @returns Does not return a value.   
   */
  MoveGump: function(x, y, serial, id) {
    // Unknown return type
  },
  /**
   * Move the object with the specified quantity into a container at the specified coordinates.  
If x, y are specified as -1, -1 (or not specified), the item is dropped in the container at a random coordinate.
   * @example Call variants:
   * @example Orion.MoveItem();
   * @example Orion.MoveItem(serial);
   * @example Orion.MoveItem(serial, count);
   * @example Orion.MoveItem(serial, count, container);
   * @example Orion.MoveItem(serial, count, container, index);
   * @example Orion.MoveItem(serial, count, container, x, y);
   * @example Orion.MoveItem(serial, count, container, x, y, z);
   * @example Orion.MoveItem(serial, count, container, x, y, z, index);
   * @param serial - serial number of the object to move  
   * @param count - number of items to move  
   * @param container - destination container serial number.  
   * @param index - Index of the object within the container (OSI-like servers only)  
   * @param x - X container coordinate for object drop  
   * @param y - Y container coordinate for object drop  
   * @param z - Z container coordinate for object drop (only when dropping to the ground)  
   * @returns Does not return a value.
   */
  MoveItem: function(serial, count, container, index, x, y, z) {
    // Unknown return type
  },
  /**
   * Iterate through a list of objects (see: Lists tab in Orion), and move an object with the specified quantity into a container, at the specified coordinates.  
If x, y are specified as -1, -1 (or not specified), the item is dropped in the container at a random coordinate.
   * @example Call variants:
   * @example bool Orion.MoveItemList(listName);
   * @example bool Orion.MoveItemList(listName, containerFrom);
   * @example bool Orion.MoveItemList(listName, containerFrom, count);
   * @example bool Orion.MoveItemList(listName, containerFrom, count, container);
   * @example bool Orion.MoveItemList(listName, containerFrom, count, container, index);
   * @example bool Orion.MoveItemList(listName, containerFrom, count, container, x, y);
   * @example bool Orion.MoveItemList(listName, containerFrom, count, container, x, y, z);
   * @example bool Orion.MoveItemList(listName, containerFrom, count, container, x, y, z, index);
   * @param listName - search list name
   * @param containerFrom - source container serial  
   * @param count - number of items to move  
   * @param container - destination container serial number.  
   * @param index - Index of the object within the container (OSI-like servers only)  
   * @param x - X container coordinate for object drop  
   * @param y - Y container coordinate for object drop  
   * @param z - Z container coordinate for object drop (only when dropping to the ground)  
   * @returns boolean - true if the item is found.
   */
  MoveItemList: function(listName, containerFrom, count, container, index, x, y, z) {
    return false;
  },
  /**
   * Move an object by type with the specified quantity into a container at the specified coordinates.  
If x, y are specified as -1, -1 (or not specified), the item is dropped in the container at a random coordinate.
   * @example Call variants:
   * @example bool Orion.MoveItemType(graphic);
   * @example bool Orion.MoveItemType(graphic, color);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count, container);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count, container, index);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count, container, x, y);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count, container, x, y, z);
   * @example bool Orion.MoveItemType(graphic, color, containerFrom, count, container, x, y, z, index);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param containerFrom - source container serial  
   * @param count - number of items to move  
   * @param container - destination container serial number.  
   * @param index - Index of the object within the container (OSI-like servers only)  
   * @param x - X container coordinate for object drop  
   * @param y - Y container coordinate for object drop  
   * @param z - Z container coordinate for object drop (only when dropping to the ground)  
   * @returns boolean - true if the item is found.
   */
  MoveItemType: function(graphic, color, containerFrom, count, container, index, x, y, z) {
    return false;
  },
  /**
   * Move character's paperdoll gump.
   * @example Orion.MovePaperdoll(serial, x, y);
   * @param serial - the serial number of the character
   * @param x - X coordinate on screen where to move paperdoll
   * @param y - Y coordinate on screen where to move paperdoll
   * @returns Does not return a value.
   */
  MovePaperdoll: function(serial, x, y) {
    // Unknown return type
  },
  /**
   * Create a file object.
   * @example FileObject Orion.NewFile();
   * @returns 
   */
  NewFile: function() {
    // Unknown return type
  },
  /**
   * Get the time since the assistant was launched.
   * @example int Orion.Now();
   * @returns 
   */
  Now: function() {
    // Unknown return type
  },
  /**
   * Get the value of an Orion assistant option.
   * @example String Orion.OAOptionGet(option);
   * @param  - option name
   * @returns String - option value (for boolean data types - "0" or "1").
   */
  OAOptionGet: function() {
    // Unknown return type
  },
  /**
   * Change the value of an Orion assistant option.
   * @example Orion.OAOptionSet(option, value);
   * @param  - option name
   * @param value - value to set (for boolean data types - "0" or "1")
   * @returns Does not return a value.
   */
  OAOptionSet: function(option, value) {
    // Unknown return type
  },
  /**
   * Get Orion assistant version.
   * @example String Orion.OAVersion();
   * @returns 
   */
  OAVersion: function() {
    // Unknown return type
  },
  /**
   * Get the object from the specified equipment layer.
   * @example Call variants:
   * @example GameObject Orion.ObjAtLayer(layerName);
   * @example GameObject Orion.ObjAtLayer(layerName, container);
   * @param container - character serial to search  
   * @returns lass object GameObject, or null if container is not found or the layer is empty (nothing equipped).   
   */
  ObjAtLayer: function(container) {
    // Unknown return type
  },
  /**
   * Check for the existence of an object.
   * @example bool Orion.ObjectExists(serial);
   * @param serial - object serial number
   * @returns boolean - true if the object is in Orion’s memory.
   */
  ObjectExists: function(serial) {
    return false;
  },
  /**
   * Switch global hotkey usage.
   * @example Getting value:
   * @example bool Orion.OnOffHotkeys();
   * @returns 
   */
  OnOffHotkeys: function() {
    // Unknown return type
  },
  /**
   * Open a container
   * @example Call variants:
   * @example bool Orion.OpenContainer(serial);
   * @example bool Orion.OpenContainer(serial, delay);
   * @example bool Orion.OpenContainer(serial, delay, errorTextPattern);
   * @param serial - container serial number
   * @param delay - the maximum wait time for the container to open, in milliseconds. See [Wait](searchend:.wait) for information on string constants  
   * @param errorTextPattern - error text. When this text is received from the server, the wait is interrupted  
   * @returns boolean - true if the container is successfully opened.
   */
  OpenContainer: function(serial, delay, errorTextPattern) {
    return false;
  },
  /**
   * Open a door.
   * @example Orion.OpenDoor(byDoubleClick);
   * @param byDoubleClick - open doors by doubleclick or standard package.  
   * @returns Does not return a value.
   */
  OpenDoor: function(byDoubleClick) {
    // Unknown return type
  },
  /**
   * Open Enhanced Map.
   * @example Call variants:
   * @example Orion.OpenEnhancedMap();
   * @example Orion.OpenEnhancedMap(filePath);
   * @param filePath - full path to the map.  
   * @returns Does not return a value.
   */
  OpenEnhancedMap: function(filePath) {
    // Unknown return type
  },
  /**
   * Open a character's paperdoll gump.
   * @example Orion.OpenPaperdoll(serial);
   * @param serial - the serial number of the character
   * @returns Does not return a value.
   */
  OpenPaperdoll: function(serial) {
    // Unknown return type
  },
  /**
   * Get or change the Fast Rotation option.
   * @example Getting value:
   * @example bool Orion.OptionFastRotation();
   * @returns 
   */
  OptionFastRotation: function() {
    // Unknown return type
  },
  /**
   * Get a list of group members.
   * @example StringList Orion.PartyMembers();
   * @returns 
   */
  PartyMembers: function() {
    // Unknown return type
  },
  /**
   * Pause script execution.
   * @example Call variants:
   * @example Orion.PauseScript();
   * @example Orion.PauseScript(name);
   * @example Orion.PauseScript(name, exceptScripts);
   * @param name - script name to pause.  
   * @param exceptScripts - functions to keep running. Use this in combination with the 'all' flag.  
   * @returns Does not return a value.
   */
  PauseScript: function(name, exceptScripts) {
    // Unknown return type
  },
  /**
   * Run an assistant macro.
   * @example Call variants:
   * @example Orion.PlayMacro(name);
   * @example Orion.PlayMacro(name, waitForFinished);
   * @example Orion.PlayMacro(name, waitForFinished, maxDelay);
   * @param name - macro name (case sensitive)
   * @param waitForFinished - wait for the completion of the macro  
   * @param maxDelay - maximum wait delay (ms)  
   * @returns Does not return a value.
   */
  PlayMacro: function(name, waitForFinished, maxDelay) {
    // Unknown return type
  },
  /**
   * Play a .WAV file.  
If the file name is specified without a path, it will search for the file in the Orion root folder.  
  
The path should either use double backslashes \\ or single forward slashes /  
Example 1: Orion.PlayWav('C:\\Sounds\\alert.wav');  
Example 2: Orion.PlayWav('C:/Sounds/alert.wav');
   * @example Orion.PlayWav(filePath);
   * @returns Does not return a value.
   */
  PlayWav: function() {
    // Unknown return type
  },
  /**
   * Display a message in the system chat.
   * @example Call variants:
   * @example Orion.Print(text);
   * @example Orion.Print(color, text);
   * @param text - output text.
   * @param color - message color.  
   * @returns Does not return a value.
   */
  Print: function(text, color) {
    // Unknown return type
  },
  /**
   * Display a message over a character and fast remove it.
   * @example Orion.PrintFast(serial, color, font, text);
   * @param serial - the serial number of the character
   * @param color - message color.
   * @param font - message font.
   * @param text - message text.
   * @returns Does not return a value.
   */
  PrintFast: function(serial, color, font, text) {
    // Unknown return type
  },
  /**
   * Checking the activity of prompt.
   * @example bool Orion.PromptExists();
   * @returns 
   */
  PromptExists: function() {
    // Unknown return type
  },
  /**
   * The identifier of the active propmt.
   * @example String Orion.PromptID();
   * @returns 
   */
  PromptID: function() {
    // Unknown return type
  },
  /**
   * Serial number of the active prompt.
   * @example String Orion.PromptSerial();
   * @returns 
   */
  PromptSerial: function() {
    // Unknown return type
  },
  /**
   * Get the coordinates (X, Y) of the quest arrow, where the arrow was last pointed.
   * @example PositionObject Orion.QuestArrowPosition();
   * @returns 
   */
  QuestArrowPosition: function() {
    // Unknown return type
  },
  /**
   * Open the server Quests gump.
   * @example Orion.QuestsGump();
   * @returns 
   */
  QuestsGump: function() {
    // Unknown return type
  },
  /**
   * Get pseudo random number.
   * @example Call variants:
   * @example int Orion.Random();
   * @example int Orion.Random(value);
   * @example int Orion.Random(minValue, maxValue);
   * @param value - maximum value from which to calculate. Cannot be larger than the default  
   * @param minValue - minimum output value
   * @param maxValue - maximum output value, result will be a random value from minValue to maxValue-1
   * @returns integer - pseudo random number.
   */
  Random: function(value, minValue, maxValue) {
    // Unknown return type
  },
  /**
   * Read string value from registry.
   * @example Call variants:
   * @example String Orion.RegRead(varName);
   * @example String Orion.RegRead(varName, subKey);
   * @param varName - variable name
   * @param subKey - registry path  
   * @returns String - result of reading the registry.
   */
  RegRead: function(varName, subKey) {
    // Unknown return type
  },
  /**
   * Write string value to registry.
   * @example Call variants:
   * @example bool Orion.RegWrite(varName, value);
   * @example bool Orion.RegWrite(varName, value, subKey);
   * @param varName - variable name
   * @param value - variable value
   * @param subKey - registry path  
   * @returns boolean - true if the value is successfully written.
   */
  RegWrite: function(varName, value, subKey) {
    return false;
  },
  /**
   * Relogin to the specified server with the specified character
   * @example Orion.Relogin();
   * @example Orion.Relogin(characterName);
   * @example Orion.Relogin(characterName, serverName);
   * @param characterName - character name to enter  
   * @param serverName - server name to enter  
   * @returns Does not return a value.
   */
  Relogin: function(characterName, serverName) {
    // Unknown return type
  },
  /**
   * Stop and remove all UDP servers.
   * @example Orion.RemoveAllUdpServers();
   * @returns 
   */
  RemoveAllUdpServers: function() {
    // Unknown return type
  },
  /**
   * Delete display timer.
   * @example Orion.RemoveDisplayTimer(id);
   * @param id - display timer ID or 'all' for clear timers list
   * @returns Does not return a value.
   */
  RemoveDisplayTimer: function(id) {
    // Unknown return type
  },
  /**
   * Remove enemy alias.
   * @example Orion.RemoveEnemy(serial);
   * @param serial - enemy serial number to remove from memory.
   * @returns Does not return a value.
   */
  RemoveEnemy: function(serial) {
    // Unknown return type
  },
  /**
   * Remove fake semi-transparent static object from the world map.
   * @example Orion.RemoveFakeMapObject(serial);
   * @param serial - object serial number from '0x00000000' to '0x0000FFFF' or numbers from 0 to 65535
   * @returns Does not return a value.
   */
  RemoveFakeMapObject: function(serial) {
    // Unknown return type
  },
  /**
   * Remove friend alias.
   * @example Orion.RemoveFriend(serial);
   * @param serial - friend serial number to remove from memory
   * @returns Does not return a value.
   */
  RemoveFriend: function(serial) {
    // Unknown return type
  },
  /**
   * Remove highlighted area.
   * @example Orion.RemoveHighlightArea(id);
   * @param id - area id or 'all' for clear areas list;
   * @returns Does not return a value.
   */
  RemoveHighlightArea: function(id) {
    // Unknown return type
  },
  /**
   * Remove character from list for custom highlighting.
   * @example Call variants:
   * @example Orion.RemoveHighlightCharacter(serial);
   * @example Orion.RemoveHighlightCharacter(serial, priorityHighlight);
   * @param serial - character serial number
   * @returns Does not return a value.
   */
  RemoveHighlightCharacter: function(serial) {
    // Unknown return type
  },
  /**
   * Remove object alias.
   * @example Orion.RemoveObject(objectName);
   * @param objectName - alias name of the object to remove from memory.
   * @returns Does not return a value.
   */
  RemoveObject: function(objectName) {
    // Unknown return type
  },
  /**
   * Delete timer.
   * @example Orion.RemoveTimer(name);
   * @param name - timer name.
   * @returns Does not return a value.
   */
  RemoveTimer: function(name) {
    // Unknown return type
  },
  /**
   * Remove a type alias.
   * @example Orion.RemoveType(typeName);
   * @param typeName - the name of the "type" alias to remove from memory.
   * @returns Does not return a value.
   */
  RemoveType: function(typeName) {
    // Unknown return type
  },
  /**
   * Stop and remove UDP server.
   * @example Orion.RemoveUdpServer(serverName);
   * @param serverName - server name.
   * @returns Does not return a value.
   */
  RemoveUdpServer: function(serverName) {
    // Unknown return type
  },
  /**
   * Rename a mount object.
   * @example Orion.RenameMount(serial, newName);
   * @param serial - object serial number
   * @returns Does not return a value.
   */
  RenameMount: function(serial) {
    // Unknown return type
  },
  /**
   * Request a context menu from the server.
   * @example Orion.RequestContextMenu(serial);
   * @param serial - serial number of the object for which the menu is requested
   * @returns Does not return a value.
   */
  RequestContextMenu: function(serial) {
    // Unknown return type
  },
  /**
   * Request an object name.  
If the object already has a name, immediately returns it without an additional request.
   * @example Call variants:
   * @example String Orion.RequestName(serial);
   * @example String Orion.RequestName(serial, delay);
   * @param serial - object serial number
   * @param delay - maximum latency in milliseconds. See [Wait](searchend:.wait) for information on string constants  
   * @returns String - the received/existing name of the object.
   */
  RequestName: function(serial, delay) {
    // Unknown return type
  },
  /**
   * Synchronization with the server.  
Can be used once every few seconds.
   * @example Orion.Resend();
   * @returns 
   */
  Resend: function() {
    // Unknown return type
  },
  /**
   * Reset used ignore list.
   * @example Orion.ResetIgnoreList();
   * @returns 
   */
  ResetIgnoreList: function() {
    // Unknown return type
  },
  /**
   * Reset the object name to an empty string.
   * @example Orion.ResetName(serial);
   * @param serial - object serial number for reset Name and FullName
   * @returns Does not return a value.
   */
  ResetName: function(serial) {
    // Unknown return type
  },
  /**
   * Reset area search limits to default values.  
minX = 0, maxX = 9999  
minY = 0, maxY = 9999  
minZ = -128, maxZ = 127
   * @example Orion.ResetSearchArea();
   * @returns 
   */
  ResetSearchArea: function() {
    // Unknown return type
  },
  /**
   * Reset limits on search by Z coordinate to default values.  
minZ = -128, maxZ = 127
   * @example Orion.ResetSearchRangeZ();
   * @returns 
   */
  ResetSearchRangeZ: function() {
    // Unknown return type
  },
  /**
   * Resume a script or all scripts.
   * @example Orion.ResumeScript(name);
   * @example Orion.ResumeScript(name, exceptScripts);
   * @param name - script name to resume.  
   * @param exceptScripts - functions to keep paused. Use this in combination with the 'all' flag.  
   * @returns Does not return a value.
   */
  ResumeScript: function(name, exceptScripts) {
    // Unknown return type
  },
  /**
   * Start sailing on a boat (new boat control system).
   * @example Call variants:
   * @example bool Orion.SailOnBoat(direction);
   * @example bool Orion.SailOnBoat(direction, fast);
   * @param  - direction to move
   * @param fast - true to move at top speed  
   * @returns Does not return a value.
   */
  SailOnBoat: function(direction, fast) {
    // Unknown return type
  },
  /**
   * Save the current assistant profile.
   * @example Orion.SaveConfig();
   * @returns 
   */
  SaveConfig: function() {
    // Unknown return type
  },
  /**
   * Save the current set of hotkeys (in the Hotkeys folder in the root of the assistant).
   * @example bool Orion.SaveHotkeys(fileName);
   * @param fileName - the path to the file
   * @returns boolean - true if the file is saved.
   */
  SaveHotkeys: function(fileName) {
    return false;
  },
  /**
   * Say a phrase in game.
   * @example Orion.Say(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  Say: function(text) {
    // Unknown return type
  },
  /**
   * Say phrase (ASCII).
   * @example Orion.Say(text);
   * @param text - message (ASCII) text to send.
   * @returns Does not return a value.
   */
  Say: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Alliance chat.
   * @example Orion.SayAlliance(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayAlliance: function(text) {
    // Unknown return type
  },
  /**
   * Say the phrase in the Broadcast chat.
   * @example Orion.SayBroadcast(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayBroadcast: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Emote chat (AKA colon + space).
   * @example Orion.SayEmote(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayEmote: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Guild chat.
   * @example Orion.SayGuild(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayGuild: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Party chat.
   * @example Orion.SayParty(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayParty: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Whisper chat (AKA semi-colon + space).
   * @example Orion.SayWhisper(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayWhisper: function(text) {
    // Unknown return type
  },
  /**
   * Say a phrase in Yell chat (AKA Exclamation + space).
   * @example Orion.SayYell(text);
   * @param text - message text to send.
   * @returns Does not return a value.
   */
  SayYell: function(text) {
    // Unknown return type
  },
  /**
   * Take a screenshot.
   * @example Orion.Screenshot();
   * @returns 
   */
  Screenshot: function() {
    // Unknown return type
  },
  /**
   * Check if the specified script is running.
   * @example int Orion.ScriptRunning(functionName);
   * @param functionName - script name to check
   * @returns integer - the number of running scripts with the specified name. If there is a paused script among the running scripts, it will return a negative value.
   */
  ScriptRunning: function(functionName) {
    // Unknown return type
  },
  /**
   * Get the current season.
   * @example Call variants:
   * @example int Orion.Season();
   * @example int Orion.Season(type);
   * @param type - the type of the received value can be: 'real' (sent by the server), 'current' (used by the assistant)  
   * @returns integer - the value of the specified season type.
   */
  Season: function(type) {
    // Unknown return type
  },
  /**
   * Make a selection in a menu.
   * @example Orion.SelectMenu(name, itemName);
   * @param name - menu name
   * @param itemName - name of item to select
   * @returns Does not return a value.
   */
  SelectMenu: function(name, itemName) {
    // Unknown return type
  },
  /**
   * Make a selection in a text dialog.
   * @example Call variants:
   * @example bool Orion.SelectTextDialog(name, answer);
   * @example bool Orion.SelectTextDialog(serial, id, name, answer);
   * @param name - the name of the dialog  
   * @param serial - serial number of the dialog  
   * @param id - dialog id  
   * @returns boolean - true if the choice is made.
   */
  SelectTextDialog: function(name, serial, id) {
    return false;
  },
  /**
   * Trigger a Sell event.  
If the sell list appears, but there are no items suitable for sale, the function immediately exits.  
If the sell list does not appear, the function will wait for the specified time.
   * @example Call variants:
   * @example Orion.Sell(shopListName);
   * @example Orion.Sell(shopListName, vendorName);
   * @example Orion.Sell(shopListName, vendorName, shopDelay);
   * @param shopListName - Shop list name.
   * @param vendorName - name of the vendor to sell to  
   * @param shopDelay - The delay to wait while items sell.  
   * @returns Does not return a value.
   */
  Sell: function(shopListName, vendorName, shopDelay) {
    // Unknown return type
  },
  /**
   * Sell the current sell list if it exists and hasn't been answered yet.
   * @example Call variants:
   * @example Orion.SellCurrent(shopListName);
   * @example Orion.SellCurrent(shopListName, shopDelay);
   * @param shopListName - Shop list name.
   * @param shopDelay - The delay to wait while items sell.  
   * @returns Does not return a value.
   */
  SellCurrent: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Set a hook on the next sell list.
   * @example Call variants:
   * @example Orion.SellHook(shopListName);
   * @example Orion.SellHook(shopListName, shopDelay);
   * @param shopListName - Shop list name.
   * @param shopDelay - The delay to wait while items sell.  
   * @returns Does not return a value.
   */
  SellHook: function(shopListName, shopDelay) {
    // Unknown return type
  },
  /**
   * Reply to an existing prompt.
   * @example Orion.SendPrompt(text);
   * @param text - text to enter
   * @returns Does not return a value.
   */
  SendPrompt: function(text) {
    // Unknown return type
  },
  /**
   * Convert the serial number of HEX to EasyUO.
   * @example String Orion.SerialToEuo(serial);
   * @param serial - serial number or object alias
   * @returns String - EasyUO serial number.
   */
  SerialToEuo: function(serial) {
    // Unknown return type
  },
  /**
   * Set the area for playing sounds.
   * @example Call variants:
   * @example Orion.SetAllowedSoundsArea(state);
   * @example Orion.SetAllowedSoundsArea(state, startX, startY, endX, endY);
   * @param state - option state on/off
   * @param startX - starting X coordinate of the region  
   * @param startY - starting Y coordinate of the region  
   * @param endX - end X coordinate of the region  
   * @param endY - end Y coordinate of the region  
   * @returns Does not return a value.
   */
  SetAllowedSoundsArea: function(state, startX, startY, endX, endY) {
    // Unknown return type
  },
  /**
   * Add a weapon set to memory.
   * @example Orion.SetArm(setName);
   * @returns Does not return a value.
   */
  SetArm: function() {
    // Unknown return type
  },
  /**
   * Mark coordinates as impassable. The impassable flag is automatically removed after 15 minutes.
   * @example Call variants:
   * @example Orion.SetBadLocation(x, y);
   * @example Orion.SetBadLocation(x, y, timer);
   * @param x - X coordinate in the world.
   * @param y - Y coordinate in the world.
   * @param timer - point time to live.  
   * @returns Does not return a value.
   */
  SetBadLocation: function(x, y, timer) {
    // Unknown return type
  },
  /**
   * Set a container for new loot.  
Attention! This function automatically moves objects. Conflicts with user actions/scripts may occur.
   * @example Orion.SetCatchBag(serial);
   * @param serial - object serial number
   * @returns Does not return a value.
   */
  SetCatchBag: function(serial) {
    // Unknown return type
  },
  /**
   * Change text color for other objects in the world + enable the option to change text if it is turned off.
   * @example Call variants:
   * @example Orion.SetCharactersFontColor(state);
   * @example Orion.SetCharactersFontColor(state, color);
   * @param state - true for the option to replace text color.
   * @param color - text color.  
   * @returns Does not return a value.
   */
  SetCharactersFontColor: function(state, color) {
    // Unknown return type
  },
  /**
   * Remember a set of clothes (except for weapons and shields).
   * @example Orion.SetDress(setName);
   * @returns Does not return a value.
   */
  SetDress: function() {
    // Unknown return type
  },
  /**
   * Change the bag for clothes.
   * @example Call variants:
   * @example Orion.SetDressBag();
   * @example Orion.SetDressBag(serial);
   * @param serial - serial number of the new clothes bag  
   * @returns Does not return a value.
   */
  SetDressBag: function(serial) {
    // Unknown return type
  },
  /**
   * Set dress list content.  
When setting the contents of the dress list, all specified items must be visible to the character. Inaccessible items will not be added to the list.
   * @example Orion.SetDressList(name, serials);
   * @param name - dress list name
   * @param serials - dress list content
   * @returns Does not return a value.
   */
  SetDressList: function(name, serials) {
    // Unknown return type
  },
  /**
   * Change text color + enable the option to change text if it is disabled.
   * @example Call variants:
   * @example Orion.SetFontColor(state);
   * @example Orion.SetFontColor(state, color);
   * @param state - true for the option to replace text color.
   * @param color - text color.  
   * @returns Does not return a value.
   */
  SetFontColor: function(state, color) {
    // Unknown return type
  },
  /**
   * Set the value of a global variable.
   * @example Orion.SetGlobal(name, value);
   * @param name - global variable name.
   * @param value - global variable value.
   * @returns Does not return a value.
   */
  SetGlobal: function(name, value) {
    // Unknown return type
  },
  /**
   * Mark coordinates as passable. The passable flag is automatically removed after 15 minutes.
   * @example Call variants:
   * @example Orion.SetGoodLocation(x, y);
   * @example Orion.SetGoodLocation(x, y, timer);
   * @param x - X coordinate in the world.
   * @param y - Y coordinate in the world.
   * @param timer - point time to live.  
   * @returns Does not return a value.
   */
  SetGoodLocation: function(x, y, timer) {
    // Unknown return type
  },
  /**
   * Set the light level.
   * @example Call variants:
   * @example Orion.SetLight(state);
   * @example Orion.SetLight(state, value);
   * @param state - true to turn on the light filter
   * @param value - light level from 0 to 31  
   * @returns Does not return a value.
   */
  SetLight: function(state, value) {
    // Unknown return type
  },
  /**
   * Set options for the LoS (Line of Sight) algorithm.
   * @example Orion.SetLOSOptions(options);
   * @param options - options for the algorithm LoS  
   * @returns Does not return a value.
   */
  SetLOSOptions: function(options) {
    // Unknown return type
  },
  /**
   * Set limits for search by coordinate area.  
Use the starting X/Y/Z combined with the end X/Y/Z to create a region (box shape) to search within.
   * @example Call variants:
   * @example Orion.SetSearchArea(startX, startY, endX, endY);
   * @example Orion.SetSearchArea(startX, startY, startZ, endX, endY, endZ);
   * @returns Does not return a value.
   */
  SetSearchArea: function() {
    // Unknown return type
  },
  /**
   * Set limits for searching by Z coordinate.
   * @example Orion.SetSearchRangeZ(minZ, maxZ);
   * @param minZ - minimum Z coordinate
   * @param maxZ - maximum Z coordinate
   * @returns Does not return a value.
   */
  SetSearchRangeZ: function(minZ, maxZ) {
    // Unknown return type
  },
  /**
   * Set the season and music in the client.
   * @example Call variants:
   * @example Orion.SetSeason(state);
   * @example Orion.SetSeason(state, index);
   * @example Orion.SetSeason(state, index, musicIndex);
   * @param state - true to enable the season filter
   * @param index - season number  
   * @param musicIndex - music file number  
   * @returns Does not return a value.
   */
  SetSeason: function(state, index, musicIndex) {
    // Unknown return type
  },
  /**
   * Set skill state (up, down, or locked).
   * @example Orion.SetSkillStatus(name, status);
   * @param name - skill name or index
   * @param status - can be 'Up', 'Down', 'Lock'
   * @returns Does not return a value.
   */
  SetSkillStatus: function(name, status) {
    // Unknown return type
  },
  /**
   * Set the state of a stat.
   * @example Orion.SetStatStatus(name, status);
   * @param name - stat name (str, dex, int);
   * @param status - new state, maybe 'Up', 'Down', 'Lock';
   * @returns Does not return a value.
   */
  SetStatStatus: function(name, status) {
    // Unknown return type
  },
  /**
   * Create or change a timer. If the timer does not exist, it will be created. If the timer exists, it will reset it to 0
   * @example Call variants:
   * @example Orion.SetTimer(name);
   * @example Orion.SetTimer(name, delay);
   * @param name - timer name.
   * @param delay - start timer value in milliseconds  
   * @returns Does not return a value.
   */
  SetTimer: function(name, delay) {
    // Unknown return type
  },
  /**
   * Show/hide the quest arrow  
If the coordinates are specified as -1, then the current location in the world is used.
   * @example Call variants:
   * @example Orion.SetTrack();
   * @example Orion.SetTrack(state);
   * @example Orion.SetTrack(state, x, y);
   * @param state - true to display  
   * @param x - X coordinate to which the arrow points  
   * @param y - Y coordinate to which the arrow points  
   * @returns Does not return a value.
   */
  SetTrack: function(state, x, y) {
    // Unknown return type
  },
  /**
   * Set the callback function to receive packets for the specified UDP server.
   * @example Orion.SetUdpServerCallback(serverName, functionName);
   * @param serverName - server name.
   * @param functionName - the name of the script function that will be called when the server receives a new package.  
   * @returns Does not return a value.
   */
  SetUdpServerCallback: function(serverName, functionName) {
    // Unknown return type
  },
  /**
   * Set weather conditions.
   * @example Call variants:
   * @example Orion.SetWeather(state);
   * @example Orion.SetWeather(state, index);
   * @example Orion.SetWeather(state, index, effectsCount);
   * @example Orion.SetWeather(state, index, effectsCount, temperature);
   * @param state - true to enable weather
   * @param index - weather ID  
   * @param effectsCount - number of effects (70 maximum)  
   * @param temperature - temperature (not used)  
   * @returns Does not return a value.
   */
  SetWeather: function(state, index, effectsCount, temperature) {
    // Unknown return type
  },
  /**
   * Set coordinates and facet on world map gump.
   * @example Call variants:
   * @example Orion.SetWorldMapPointerPosition(x, y);
   * @example Orion.SetWorldMapPointerPosition(x, y, facet);
   * @example Orion.SetWorldMapPointerPosition(x, y, facet, resetFollowing);
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param facet - facet name, can be: 'Felucca', 'Trammel', 'Ilshenar', 'Malas', 'Tokuno', 'TerMur', 'Current'.  
   * @param resetFollowing - reset flag follow character.  
   * @returns Does not return a value.
   */
  SetWorldMapPointerPosition: function(x, y, facet, resetFollowing) {
    // Unknown return type
  },
  /**
   * Get the (X, Y) coordinates from the sexatnt coordinates string.
   * @example Call variants:
   * @example PositionObject Orion.SextantToXY(text);
   * @example PositionObject Orion.SextantToXY(text, facet);
   * @param text - text to parse.  
   * @param facet - facet (map) number.  
   * @returns lass object PositionObject, coordinates or null if the text could not be parsed.
   */
  SextantToXY: function(text, facet) {
    // Unknown return type
  },
  /**
   * Get selected shard name.
   * @example String Orion.ShardName();
   * @returns 
   */
  ShardName: function() {
    // Unknown return type
  },
  /**
   * Display journal contents in a text window.
   * @example Call variants:
   * @example Orion.ShowJournal();
   * @example Orion.ShowJournal(linesCount);
   * @param linesCount - number of lines to output.  
   * @returns Does not return a value.
   */
  ShowJournal: function(linesCount) {
    // Unknown return type
  },
  /**
   * Show statusbar gump in client.
   * @example Call variants:
   * @example Orion.ShowStatusbar(serial, x, y);
   * @example Orion.ShowStatusbar(serial, x, y, minimized);
   * @param serial - serial number of the object to which the statusbar is linked
   * @param x - X coordinate on the screen where gump will be displayed
   * @param y - Y coordinate on the screen where gump will be displayed
   * @param minimized - false for the expanded version of the status bar  
   * @returns Does not return a value.
   */
  ShowStatusbar: function(serial, x, y, minimized) {
    // Unknown return type
  },
  /**
   * Turn off the computer (or try to do it).
   * @example Call variants:
   * @example Orion.ShutdownWindows();
   * @example Orion.ShutdownWindows(mode);
   * @param mode - shutdown mode  
   * @returns Does not return a value.
   */
  ShutdownWindows: function(mode) {
    // Unknown return type
  },
  /**
   * Get a skill growth state (up, down, or locked).
   * @example String Orion.SkillStatus(name);
   * @param name - name or index of the skill
   * @returns String - skill growth state.
   */
  SkillStatus: function(name) {
    // Unknown return type
  },
  /**
   * Get the value of a skill
   * @example Call variants:
   * @example int Orion.SkillValue(skillNameOrIndex);
   * @example int Orion.SkillValue(skillNameOrIndex, type);
   * @param skillNameOrIndex - skill name or index
   * @param type - output type. Can be:
   * @returns integer - value depending on type.
   */
  SkillValue: function(skillNameOrIndex, type) {
    // Unknown return type
  },
  /**
   * Play a sound.
   * @example Orion.Sound(index);
   * @param index - sound index (can be viewed in UOFiddler)
   * @returns Does not return a value.
   */
  Sound: function(index) {
    // Unknown return type
  },
  /**
   * Get the status of a spell (only if the server sends this information!).
   * @example bool Orion.SpellStatus(name);
   * @param name - spell name or index
   * @returns boolean - true if the spell is active.
   */
  SpellStatus: function(name) {
    return false;
  },
  /**
   * Split a sentence into an array (list) of individual words
   * @example Call variants:
   * @example StringList Orion.Split(text);
   * @example StringList Orion.Split(text, separator);
   * @example StringList Orion.Split(text, separator, skipEmptyWord);
   * @param text - the text to split
   * @param separator - the delimiter used to split the words  
   * @param skipEmptyWord - true to skip empty words  
   * @returns String list - the resulting array of words.
   */
  Split: function(text, separator, skipEmptyWord) {
    // Unknown return type
  },
  /**
   * Get the growth state of a character's stats.
   * @example String Orion.StatStatus(name);
   * @param name - stat name (str, dex, int)
   * @returns String - growth state.
   */
  StatStatus: function(name) {
    // Unknown return type
  },
  /**
   * Attempt to take a step in a specified direction.
   * @example Call variants:
   * @example bool Orion.Step(direction);
   * @example bool Orion.Step(direction, run);
   * @param run - true for running  
   * @returns boolean - true if an attempt is made.
   */
  Step: function(run) {
    return false;
  },
  /**
   * Stop playing the assistant macro, if there is one running.
   * @example Orion.StopMacro();
   * @returns 
   */
  StopMacro: function() {
    // Unknown return type
  },
  /**
   * Stop sailing on a boat (new boat control system).
   * @example bool Orion.StopSailOnBoat();
   * @returns 
   */
  StopSailOnBoat: function() {
    // Unknown return type
  },
  /**
   * Stop the search path.  
For example: During pathfinding or Orion.WalkTo();
   * @example Call variants:
   * @example Orion.StopWalking();
   * @returns 
   */
  StopWalking: function() {
    // Unknown return type
  },
  /**
   * Use a tool on a resource (3D client macro).
   * @example Orion.TargetByResource(resource, serial);
   * @param resource - resource type, can be: 'ore', 'sand', 'wood', 'graves', 'red mushrooms'
   * @param serial - serial number of the tool to use
   * @returns Does not return a value.
   */
  TargetByResource: function(resource, serial) {
    // Unknown return type
  },
  /**
   * Target at an object found by a search on the ground.
   * @example Call variants:
   * @example Orion.TargetGround(graphic);
   * @example Orion.TargetGround(graphic, color);
   * @example Orion.TargetGround(graphic, color, distance);
   * @example Orion.TargetGround(graphic, color, distance, flags);
   * @example Orion.TargetGround(graphic, color, distance, flags, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param  - search distance  
   * @param  - search flags  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  TargetGround: function(graphic, color, distance, flags, ignoreLists) {
    // Unknown return type
  },
  /**
   * Target at an object found by a search of ground tiles.
   * @example Call variants:
   * @example Orion.TargetGroundList(findListName);
   * @example Orion.TargetGroundList(findListName, distance);
   * @example Orion.TargetGroundList(findListName, distance, flags);
   * @param findListName - search list name
   * @param  - search distance  
   * @param  - search flags  
   * @returns Does not return a value.
   */
  TargetGroundList: function(findListName, distance, flags) {
    // Unknown return type
  },
  /**
   * Target an object.
   * @example Call variants:
   * @example Orion.TargetObject(serial);
   * @example Orion.TargetObject(serial, relativeTargetDistance);
   * @param serial - serial number (or numbers) of objects on which to set a hook
   * @param relativeTargetDistance - distance for pointing the target at the tile relative to the specified character, depending on its direction  
   * @returns Does not return a value.
   */
  TargetObject: function(serial, relativeTargetDistance) {
    // Unknown return type
  },
  /**
   * Get/change the target value of the new client’s system targeting.
   * @example Getting value:
   * @example String Orion.TargetSystemSerial();
   * @returns 
   */
  TargetSystemSerial: function() {
    // Unknown return type
  },
  /**
   * Target a tile.
   * @example Call variants:
   * @example Orion.TargetTile(tileFlags);
   * @example Orion.TargetTile(tileFlags, x, y, z);
   * @param x - X coordinate in the world
   * @param y - Y coordinate in the world
   * @param z - Z coordinate in the world
   * @returns Does not return a value.
   */
  TargetTile: function(x, y, z) {
    // Unknown return type
  },
  /**
   * Target a tile relative to your character.
   * @example Call variants:
   * @example Orion.TargetTileRelative(tileFlags);
   * @example Orion.TargetTileRelative(tileFlags, x, y, z);
   * @param x - X coordinate in the world relative to your character
   * @param y - Y coordinate in the world relative to your character
   * @param z - Z coordinate in the world relative to your character
   * @returns Does not return a value.
   */
  TargetTileRelative: function(x, y, z) {
    // Unknown return type
  },
  /**
   * Target at the object found by searching in the container.
   * @example Call variants:
   * @example Orion.TargetType(graphic);
   * @example Orion.TargetType(graphic, color, container);
   * @example Orion.TargetType(graphic, color, container, flags);
   * @example Orion.TargetType(graphic, color, container, flags, recurse);
   * @example Orion.TargetType(graphic, color, container, flags, recurse, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  TargetType: function(graphic, color, container, flags, recurse, ignoreLists) {
    // Unknown return type
  },
  /**
   * Target an object based on a list of object types
   * @example Call variants:
   * @example Orion.TargetTypeList(findListName);
   * @example Orion.TargetTypeList(findListName, container, flags);
   * @example Orion.TargetTypeList(findListName, container, flags, recurse);
   * @param findListName - The name of the list. For example, navigate to the Lists=>Find tab
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search in pre-opened subcontainers  
   * @returns Does not return a value.
   */
  TargetTypeList: function(findListName, container, flags, recurse) {
    // Unknown return type
  },
  /**
   * Stop execution of the specified script.  
Attention! The function names are case-sensitive
   * @example Call variants:
   * @example Orion.Terminate(functionName);
   * @example Orion.Terminate(functionName, functionsSave);
   * @param functionName - script name to terminate.  
   * @param functionsSave - functions to keep executing.  
   * @returns Does not return a value.
   */
  Terminate: function(functionName, functionsSave) {
    // Unknown return type
  },
  /**
   * Set the color of the item locally (changed only on the client side. The color is not sent to the server!).
   * @example Orion.TestItemColor(serial, color);
   * @param serial - serial number of the item
   * @returns Does not return a value.
   */
  TestItemColor: function(serial) {
    // Unknown return type
  },
  /**
   * Number of unanswered text input dialogs.
   * @example int Orion.TextDialogCount();
   * @returns 
   */
  TextDialogCount: function() {
    // Unknown return type
  },
  /**
   * Get the current time.
   * @example Call variants:
   * @example String Orion.Time();
   * @example String Orion.Time(format);
   * @param format - time output format  
   * @returns String - current time in the specified format.
   */
  Time: function(format) {
    // Unknown return type
  },
  /**
   * Get the current timer value.
   * @example Call variants:
   * @example int Orion.Timer(name);
   * @param name - timer name
   * @returns integer - The time, in milliseconds, elapsed since the timer was created.  
   */
  Timer: function(name) {
    // Unknown return type
  },
  /**
   * Check for a timer in the assistant's memory
   * @example Call variants:
   * @example bool Orion.TimerExists(name);
   * @param name - timer name
   * @returns boolean - true if a timer exists.
   */
  TimerExists: function(name) {
    return false;
  },
  /**
   * Toggle gargoyle flying.
   * @example Orion.ToggleGargoyleFlying();
   * @returns 
   */
  ToggleGargoyleFlying: function() {
    // Unknown return type
  },
  /**
   * Toggle a specified script on or off.
   * @example Call variants:
   * @example Orion.ToggleScript(functionName);
   * @example Orion.ToggleScript(functionName, oneScriptRunning);
   * @example Orion.ToggleScript(functionName, oneScriptRunning, argumentsList);
   * @param functionName - script name.
   * @param oneScriptRunning - 'true' to prevent the script from running more than one instance  
   * @param argumentsList - script parameters to pass in.  
   * @returns Does not return a value.
   */
  ToggleScript: function(functionName, oneScriptRunning, argumentsList) {
    // Unknown return type
  },
  /**
   * Change the status of a trade window confirmation checkbox.
   * @example Orion.TradeCheck(serialOrIndex, state);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @param state - true to check the confirmation checkbox. False to uncheck
   * @returns Does not return a value.
   */
  TradeCheck: function(serialOrIndex, state) {
    // Unknown return type
  },
  /**
   * Get the status of a trade window confirmation checkbox.
   * @example bool Orion.TradeCheckState(serialOrIndex, container);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @param container - window ID  
   * @returns boolean - true if checked.
   */
  TradeCheckState: function(serialOrIndex, container) {
    return false;
  },
  /**
   * Close a trade window.
   * @example Orion.TradeClose(serialOrIndex);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @returns Does not return a value.
   */
  TradeClose: function(serialOrIndex) {
    // Unknown return type
  },
  /**
   * Get the serial number of the trade window container.
   * @example String Orion.TradeContainer(serialOrIndex, container);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @param container - window ID  
   * @returns String - container serial number.
   */
  TradeContainer: function(serialOrIndex, container) {
    // Unknown return type
  },
  /**
   * Get the number of open trading windows.
   * @example int Orion.TradeCount();
   * @returns 
   */
  TradeCount: function() {
    // Unknown return type
  },
  /**
   * Get the name of the other character making the trade.
   * @example String Orion.TradeName(serialOrIndex);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @returns String - character name.
   */
  TradeName: function(serialOrIndex) {
    // Unknown return type
  },
  /**
   * Get the serial number of the other character making the trade.
   * @example String Orion.TradeOpponent(serialOrIndex);
   * @param serialOrIndex - trade window index. Starts from 0, or serial number
   * @returns String - character's serial number.
   */
  TradeOpponent: function(serialOrIndex) {
    // Unknown return type
  },
  /**
   * Character turn request.
   * @example Orion.Turn(direction);
   * @returns Does not return a value.
   */
  Turn: function() {
    // Unknown return type
  },
  /**
   * Attempting to retrieve data from the specified server.
   * @example String Orion.UdpRecv(serverName);
   * @param serverName - server name.
   * @returns String - received data. Empty string if there is no data to receive.
   */
  UdpRecv: function(serverName) {
    // Unknown return type
  },
  /**
   * Send packet via UDP.
   * @example Call variants:
   * @example int Orion.UdpSend(port, data);
   * @example int Orion.UdpSend(host, port, data);
   * @param host - IP address to send data to or 'broadcast'.  
   * @param port - port to send data to.
   * @param data - data to send.
   * @returns integer - number of bytes sent  
   */
  UdpSend: function(host, port, data) {
    // Unknown return type
  },
  /**
   * Get a list of all running UDP servers.
   * @example StringList Orion.UdpServersList();
   * @returns 
   */
  UdpServersList: function() {
    // Unknown return type
  },
  /**
   * Undress (except arms and shield).
   * @example Orion.Undress();
   * @returns 
   */
  Undress: function() {
    // Unknown return type
  },
  /**
   * Remove item from specified layer.
   * @example Orion.Unequip(layerName);
   * @returns Does not return a value.
   */
  Unequip: function() {
    // Unknown return type
  },
  /**
   * Show previously hidden object.
   * @example Orion.Unhide(serial);
   * @param serial - serial number of the object to be displayed. Accepts aliases: all, allitems, allmobiles
   * @returns Does not return a value.
   */
  Unhide: function(serial) {
    // Unknown return type
  },
  /**
   * Clear set.
   * @example Orion.UnsetArm(setName);
   * @param setName - set name
   * @returns Does not return a value.
   */
  UnsetArm: function(setName) {
    // Unknown return type
  },
  /**
   * Reset the receiving container for new loot.
   * @example Orion.UnsetCatchBag();
   * @returns 
   */
  UnsetCatchBag: function() {
    // Unknown return type
  },
  /**
   * Clear set.
   * @example Orion.UnsetDress(setName);
   * @param setName - set name
   * @returns Does not return a value.
   */
  UnsetDress: function(setName) {
    // Unknown return type
  },
  /**
   * Reset the dress/undress container.
   * @example Orion.UnsetDressBag();
   * @returns 
   */
  UnsetDressBag: function() {
    // Unknown return type
  },
  /**
   * Refresh search list.
   * @example Orion.UpdateFindList(findListObject);
   * @returns Does not return a value.
   */
  UpdateFindList: function() {
    // Unknown return type
  },
  /**
   * Refresh search ignore list.
   * @example Orion.UpdateIgnoreList(ignoreListObject);
   * @returns Does not return a value.
   */
  UpdateIgnoreList: function() {
    // Unknown return type
  },
  /**
   * Update vendor shopping list information.
   * @example Orion.UpdateShopList(shopListObject);
   * @returns Does not return a value.
   */
  UpdateShopList: function() {
    // Unknown return type
  },
  /**
   * Activate an ability.
   * @example Call variants:
   * @example Orion.UseAbility(abilityName);
   * @example Orion.UseAbility(abilityName, state);
   * @param abilityName - name or index of the ability  
   * @param state - true to activate ability  
   * @returns Does not return a value.
   */
  UseAbility: function(abilityName, state) {
    // Unknown return type
  },
  /**
   * Search and use an item by type, from the ground.
   * @example Call variants:
   * @example bool Orion.UseFromGround(graphic);
   * @example bool Orion.UseFromGround(graphic, color);
   * @example bool Orion.UseFromGround(graphic, color, distance);
   * @example bool Orion.UseFromGround(graphic, color, distance, flags);
   * @example bool Orion.UseFromGround(graphic, color, distance, flags, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param  - search distance  
   * @param  - search flags  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns boolean - true if the object is found and activated
   */
  UseFromGround: function(graphic, color, distance, flags, ignoreLists) {
    return false;
  },
  /**
   * Search a list and use an item by type (graphic), from the ground.
   * @example Call variants:
   * @example bool Orion.UseFromGroundList(listName);
   * @example bool Orion.UseFromGroundList(listName, distance);
   * @example bool Orion.UseFromGroundList(listName, distance, flags);
   * @param listName - the name of a list of object types (graphics) to use
   * @param  - search distance  
   * @param  - search flags  
   * @returns boolean - true if the object is found and an attempt to use it was made
   */
  UseFromGroundList: function(listName, distance, flags) {
    return false;
  },
  /**
   * Use ignore list in search.
   * @example Orion.UseIgnoreList(listName);
   * @param listName - ignore list name
   * @returns Does not return a value.
   */
  UseIgnoreList: function(listName) {
    // Unknown return type
  },
  /**
   * Use an item with the new targeting system.  
The new targeting system must be supported by the server to work correctly.
   * @example Orion.UseItemOnMobile(serial, targetSerial);
   * @param serial - serial number of the item to use
   * @param targetSerial - serial number of the mobile
   * @returns Does not return a value.
   */
  UseItemOnMobile: function(serial, targetSerial) {
    // Unknown return type
  },
  /**
   * Use an object.
   * @example Call variants:
   * @example Orion.UseObject();
   * @example Orion.UseObject(serial);
   * @param serial - serial number of the object to use  
   * @returns Does not return a value.
   */
  UseObject: function(serial) {
    // Unknown return type
  },
  /**
   * Use a skill.
   * @example Call variants:
   * @example Orion.UseSkill(skillNameOrIndex);
   * @example Orion.UseSkill(skillNameOrIndex, targetSerial);
   * @param targetSerial - skill target serial number  
   * @param relativeTargetDistance - tile distance from character  
   * @returns Does not return a value.
   */
  UseSkill: function(targetSerial, relativeTargetDistance) {
    // Unknown return type
  },
  /**
   * Use a skill with the new targeting system.  
For the correct operation, the new targeting system must be supported by the server.
   * @example Orion.UseSkillTarget(nameOrIndex, serial);
   * @param nameOrIndex - skill name or index
   * @param serial - the serial number of the target object
   * @returns Does not return a value.
   */
  UseSkillTarget: function(nameOrIndex, serial) {
    // Unknown return type
  },
  /**
   * Use an item by type (graphic).
   * @example Call variants:
   * @example bool Orion.UseType(graphic);
   * @example bool Orion.UseType(graphic, color);
   * @example bool Orion.UseType(graphic, color, container);
   * @example bool Orion.UseType(graphic, color, container, recurse);
   * @example bool Orion.UseType(graphic, color, container, recurse, ignoreLists);
   * @param graphic - graphic of the object. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('#010101|#FF0000')  
   * @param container - the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - names ignore lists. Can be combined with pipes: | such as ('list1|list2')  
   * @returns boolean - true if the object is found and activated
   */
  UseType: function(graphic, color, container, recurse, ignoreLists) {
    return false;
  },
  /**
   * Search a list and use an item by type (graphic).
   * @example Call variants:
   * @example bool Orion.UseTypeList(listName);
   * @example bool Orion.UseTypeList(listName, container);
   * @example bool Orion.UseTypeList(listName, container, recurse);
   * @param listName - search list name
   * @param container - the serial or alias of the container to search  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns boolean - true if the object is found and activated
   */
  UseTypeList: function(listName, container, recurse) {
    return false;
  },
  /**
   * Using ability Wrestling Disarm.
   * @example Orion.UseWrestlingDisarm();
   * @returns 
   */
  UseWrestlingDisarm: function() {
    // Unknown return type
  },
  /**
   * Using ability Wrestling Stun.
   * @example Orion.UseWrestlingStun();
   * @returns 
   */
  UseWrestlingStun: function() {
    // Unknown return type
  },
  /**
   * Validate whether a tile can be targetted.
   * @example Call variants:
   * @example bool Orion.ValidateTargetTile(tileFlags, x, y);
   * @example bool Orion.ValidateTargetTile(tileFlags, x, y, z);
   * @param  - Can be combined with pipes: | such as ('0x0123|0x0456')
   * @param x - X coordinate in the world
   * @param y - Y coordinate in the world
   * @param z - Z coordinate in the world relative to the character  
   * @returns boolean - true if you can target with the specified flags.
   */
  ValidateTargetTile: function(tileFlags, x, y, z) {
    return false;
  },
  /**
   * Validate whether a tile can be targetted, relative to the character.
   * @example Call variants:
   * @example bool Orion.ValidateTargetTile(tileFlags, x, y);
   * @example bool Orion.ValidateTargetTile(tileFlags, x, y, z);
   * @param  - tiles flags for search
   * @param x - X coordinate in the world relative to the character
   * @param y - Y coordinate in the world relative to the character
   * @param z - Z coordinate in the world relative to the character  
   * @returns boolean - true if you can target with the specified flags.
   */
  ValidateTargetTile: function(tileFlags, x, y, z) {
    return false;
  },
  /**
   * Force a script to wait (AKA sleep or pause).
   * @example Orion.Wait(delay);
   * @param delay - how much time to wait, in milliseconds.  
   * @returns Does not return a value.
   */
  Wait: function(delay) {
    // Unknown return type
  },
  /**
   * Add a wait hook for a context menu.
   * @example Orion.WaitContextMenu(serial, index);
   * @param serial - the serial number of the context menu to wait for  
   * @param index - context menu item index starting at 0
   * @returns Does not return a value.
   */
  WaitContextMenu: function(serial, index) {
    // Unknown return type
  },
  /**
   * Add a wait hook for a context menu.
   * @example Orion.WaitContextMenuCliloc(serial, clilocID);
   * @param serial - the serial number of the context menu to wait for.  
   * @param clilocID - the number of the cliloc whose text is displayed in the menu (can be found by the InfoContextMenu() function)
   * @returns Does not return a value.
   */
  WaitContextMenuCliloc: function(serial, clilocID) {
    // Unknown return type
  },
  /**
   * Add a wait hook for a context menu.
   * @example Orion.WaitContextMenuID(serial, itemIndex);
   * @param serial - the serial number of the context menu to wait for  
   * @param itemIndex - menu item identifier (can be recognized by the InfoContextMenu function)
   * @returns Does not return a value.
   */
  WaitContextMenuID: function(serial, itemIndex) {
    // Unknown return type
  },
  /**
   * Delete the previous alias of an object, open target to specify a new one manually, and wait for the selection (or timeout).
   * @example Call variants:
   * @example int Orion.WaitForAddObject(objectName);
   * @example int Orion.WaitForAddObject(objectName, delay);
   * @param objectName - object alias name
   * @param delay - maximum wait time. See [Wait](searchend:.wait) for information on string constants  
   * @returns integer  
   */
  WaitForAddObject: function(objectName, delay) {
    // Unknown return type
  },
  /**
   * Delete the previous alias of an object, open a target to specify a new one manually, and wait for the selection (or timeout).
   * @example Call variants:
   * @example int Orion.WaitForAddType(typeName);
   * @example int Orion.WaitForAddType(typeName, delay);
   * @param typeName - alias type name
   * @param delay - maximum wait time. See [Wait](searchend:.wait) for information on string constants  
   * @returns integer  
   */
  WaitForAddType: function(typeName, delay) {
    // Unknown return type
  },
  /**
   * Wait for a container gump to open
   * @example Call variants:
   * @example bool Orion.WaitForContainerGump();
   * @example bool Orion.WaitForContainerGump(delay);
   * @param delay - maximum wait time, in milliseconds  
   * @returns boolean - true if the gump is received
   */
  WaitForContainerGump: function(delay) {
    return false;
  },
  /**
   * Wait for a context menu to open
   * @example Call variants:
   * @example bool Orion.WaitForContextMenu();
   * @example bool Orion.WaitForContextMenu(delay);
   * @param delay - maximum time to wait, in milliseconds  
   * @returns boolean - true if the context menu is received.
   */
  WaitForContextMenu: function(delay) {
    return false;
  },
  /**
   * Wait for a gump to open/refresh.
   * @example Call variants:
   * @example bool Orion.WaitForGump();
   * @example bool Orion.WaitForGump(delay);
   * @example bool Orion.WaitForGump(delay, waitNewGump);
   * @param delay - maximum time to wait, in milliseconds.  
   * @param waitNewGump - true to wait for a new gump (if false, it will work if the last gump was not closed)  
   * @returns boolean - true if a gump opens
   */
  WaitForGump: function(delay, waitNewGump) {
    return false;
  },
  /**
   * Wait for a menu to open/refresh
   * @example Call variants:
   * @example bool Orion.WaitForMenu();
   * @example bool Orion.WaitForMenu(delay);
   * @param delay - max wait time, in milliseconds  
   * @returns boolean - true if a menu is found
   */
  WaitForMenu: function(delay) {
    return false;
  },
  /**
   * Wait for a prompt from the server.
   * @example Call variants:
   * @example bool Orion.WaitForPrompt();
   * @example bool Orion.WaitForPrompt(delay);
   * @param delay - max wait time, in milliseconds  
   * @returns boolean - true if prompt is received from the server.
   */
  WaitForPrompt: function(delay) {
    return false;
  },
  /**
   * Wait for a vendor shopping list to open/refresh
   * @example Call variants:
   * @example bool Orion.WaitForShop();
   * @example bool Orion.WaitForShop(delay);
   * @param delay - max wait time, in milliseconds  
   * @returns boolean - true if the list of goods was received from the server.
   */
  WaitForShop: function(delay) {
    return false;
  },
  /**
   * Wait for a (cursor) target from the server.
   * @example Call variants:
   * @example bool Orion.WaitForTarget();
   * @example bool Orion.WaitForTarget(delay);
   * @param delay - max wait time, in milliseconds  
   * @returns boolean - true if the target opened
   */
  WaitForTarget: function(delay) {
    return false;
  },
  /**
   * Wait for a text dialog to open
   * @example Call variants:
   * @example bool Orion.WaitForTextDialog();
   * @example bool Orion.WaitForTextDialog(delay);
   * @param delay - maximum wait time, in milliseconds  
   * @returns boolean - true if the text input dialog is received from the server.
   */
  WaitForTextDialog: function(delay) {
    return false;
  },
  /**
   * Wait for a trade window to open/refresh
   * @example Call variants:
   * @example bool Orion.WaitForTrade();
   * @example bool Orion.WaitForTrade(delay);
   * @param delay - maximum wait time, in milliseconds  
   * @returns boolean - true if the trade window opened
   */
  WaitForTrade: function(delay) {
    return false;
  },
  /**
   * Add a gump hook.  
When adding hooks, previous hooks are not overwritten, and a new one is added to the hook queue.
   * @example Orion.WaitGump(hook);
   * @returns Does not return a value.
   */
  WaitGump: function() {
    // Unknown return type
  },
  /**
   * Wait for a message to appear in the journal.
   * @example Call variants:
   * @example JournalMessage Orion.WaitJournal(pattern, startTime, endTime);
   * @example JournalMessage Orion.WaitJournal(pattern, startTime, endTime, flags);
   * @example JournalMessage Orion.WaitJournal(pattern, startTime, endTime, flags, serial);
   * @example JournalMessage Orion.WaitJournal(pattern, startTime, endTime, flags, serial, color);
   * @param pattern - text pattern to match. Example: 'must wait to perform'
   * @param startTime - initial search time, in milliseconds. Try using Orion.Now();  
   * @param endTime - the final search time, in milliseconds. Try using Orion.Now();  
   * @param  - journal filter flags.  
   * @param serial - the serial number of the character who made the message. If 0, this is ignored  
   * @param color - message color.  
   * @returns lass object JournalMessage or null if nothing was found.
   */
  WaitJournal: function(pattern, startTime, endTime, flags, serial, color) {
    // Unknown return type
  },
  /**
   * Add a menu hook (wait for a menu)
   * @example Orion.WaitMenu(prompt, choice);
   * @param prompt - title or part of a menu title
   * @param choice - name or part of the name of the menu item to select  
   * @returns Does not return a value.
   */
  WaitMenu: function(prompt, choice) {
    // Unknown return type
  },
  /**
   * Add a hook for prompt.
   * @example Call variants:
   * @example Orion.WaitPrompt(text);
   * @example Orion.WaitPrompt(text, serial);
   * @example Orion.WaitPrompt(text, serial, type);
   * @param text - text to enter
   * @param serial - prompt serial number  
   * @param type - check file availability before opening  
   * @returns Does not return a value.
   */
  WaitPrompt: function(text, serial, type) {
    // Unknown return type
  },
  /**
   * Set a target hook for an object found on the ground  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetGround(graphic);
   * @example Orion.WaitTargetGround(graphic, color);
   * @example Orion.WaitTargetGround(graphic, color, distance);
   * @example Orion.WaitTargetGround(graphic, color, distance, flags);
   * @example Orion.WaitTargetGround(graphic, color, distance, flags, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param  - search distance  
   * @param  - search flags  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  WaitTargetGround: function(graphic, color, distance, flags, ignoreLists) {
    // Unknown return type
  },
  /**
   * Set a target hook for an object found on the ground  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetGroundList(findListName);
   * @example Orion.WaitTargetGroundList(findListName, distance);
   * @example Orion.WaitTargetGroundList(findListName, distance, flags);
   * @param findListName - the name of the 'Find' list
   * @param  - search distance  
   * @param  - search flags  
   * @returns Does not return a value.
   */
  WaitTargetGroundList: function(findListName, distance, flags) {
    // Unknown return type
  },
  /**
   * Set a hook for a target on an object.  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetObject(serial);
   * @example Orion.WaitTargetObject(serial, relativeTargetDistance);
   * @param serial - serial number(s) of objects on which to set a hook
   * @param relativeTargetDistance - distance for targeting relative to the specified object, depending on its direction  
   * @returns Does not return a value.
   */
  WaitTargetObject: function(serial, relativeTargetDistance) {
    // Unknown return type
  },
  /**
   * Set a target hook to the ground.  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetTile(tileFlags);
   * @example Orion.WaitTargetTile(tileFlags, x, y, z);
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param z - Z coordinate
   * @returns Does not return a value.
   */
  WaitTargetTile: function(x, y, z) {
    // Unknown return type
  },
  /**
   * Set a target hook on the ground, relative to the character.  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetTileRelative(tileFlags);
   * @example Orion.WaitTargetTileRelative(tileFlags, x, y, z);
   * @param  - tiles flags for search  
   * @param x - X coordinate relative to the character
   * @param y - Y coordinate relative to the character
   * @param z - Z coordinate relative to the character
   * @returns Does not return a value.
   */
  WaitTargetTileRelative: function(tileFlags, x, y, z) {
    // Unknown return type
  },
  /**
   * Set a target hook on an object, by type  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetType(graphic);
   * @example Orion.WaitTargetType(graphic, color, container);
   * @example Orion.WaitTargetType(graphic, color, container, flags);
   * @example Orion.WaitTargetType(graphic, color, container, flags, recurse);
   * @example Orion.WaitTargetType(graphic, color, container, flags, recurse, ignoreLists);
   * @param graphic - graphic to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param color - color to search. Can be combined with pipes: | such as ('0x0123|0x0456')  
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @param ignoreLists - ignore list names. Can be combined with pipes: | such as ('list1|list2')  
   * @returns Does not return a value.
   */
  WaitTargetType: function(graphic, color, container, flags, recurse, ignoreLists) {
    // Unknown return type
  },
  /**
   * Set a target hook on an object from a list, by type  
Previous hooks are automatically canceled.
   * @example Call variants:
   * @example Orion.WaitTargetTypeList(findListName);
   * @example Orion.WaitTargetTypeList(findListName, container, flags);
   * @example Orion.WaitTargetTypeList(findListName, container, flags, recurse);
   * @param findListName - search list name
   * @param container - the serial or alias of the container to search  
   * @param  - search flags  
   * @param recurse - true if you want to search pre-opened subcontainers  
   * @returns Does not return a value.
   */
  WaitTargetTypeList: function(findListName, container, flags, recurse) {
    // Unknown return type
  },
  /**
   * Add a hook to the dialog for entering text from the server.
   * @example Orion.WaitTextDialog(serial, id, name, answer);
   * @param name - the name of the dialog  
   * @param serial - serial number of the dialog  
   * @param id - dialog id  
   * @returns Does not return a value.
   */
  WaitTextDialog: function(name, serial, id) {
    // Unknown return type
  },
  /**
   * Wait while there is line-of-sight in the client.  
If the client does not have a target, immediately return true.
   * @example Call variants:
   * @example bool Orion.WaitWhileTargeting();
   * @example bool Orion.WaitWhileTargeting(delay);
   * @param delay - maximum latency in milliseconds. See [Wait](searchend:.wait) for information on string constants  
   * @returns boolean - true if there is no target.
   */
  WaitWhileTargeting: function(delay) {
    return false;
  },
  /**
   * Attempt to move to the target coordinates
   * @example Call variants:
   * @example bool Orion.WalkTo(x, y, z);
   * @example bool Orion.WalkTo(x, y, z, distanceXY);
   * @example bool Orion.WalkTo(x, y, z, distanceXY, distanceZ);
   * @example bool Orion.WalkTo(x, y, z, distanceXY, distanceZ, run);
   * @example bool Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor);
   * @example bool Orion.WalkTo(x, y, z, distanceXY, distanceZ, run, openDoor, maxWalkingTime);
   * @param x - target X coordinate
   * @param y - target Y coordinate
   * @param z - target Z coordinate
   * @param distanceXY - variation allowed along the X and Y axes at the end point  
   * @param distanceZ - variation allowed along the Z axis at the end point  
   * @param run - running mode  
   * @param maxWalkingTime - maximum walking time (ms)  
   * @returns boolean - true if you move to the coordinates
   */
  WalkTo: function(x, y, z, distanceXY, distanceZ, run, maxWalkingTime) {
    return false;
  },
  /**
   * Switch war mode state
   * @example Call variants:
   * @example Orion.WarMode();
   * @example Orion.WarMode(state);
   * @returns Does not return a value.
   */
  WarMode: function() {
    // Unknown return type
  },
  /**
   * Get current weather conditions.
   * @example Call variants:
   * @example int Orion.Weather();
   * @example int Orion.Weather(type);
   * @param type - Can be: 'real' (sent by the server), 'current' (used by the assistant)  
   * @returns integer - the value of the specified weather conditions type.
   */
  Weather: function(type) {
    // Unknown return type
  },
  /**
   * Get a string of sexatnt coordinates, from an input of (X, Y) coordinates.
   * @example Call variants:
   * @example String Orion.XYToSextant(x, y);
   * @example String Orion.XYToSextant(x, y, facet);
   * @param text - X coordinate.
   * @param text - Y coordinate.
   * @param facet - facet (map) number.  
   * @returns String - sextant coordinate format. Example: 79o 0'S, 35o 5'E.
   */
  XYToSextant: function(text, text, facet) {
    // Unknown return type
  },
};

export default Orion;