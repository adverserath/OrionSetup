const Player = {

    /**
     * Get your character's armor value.
     * 
     * @returns {integer} integer - player armor.
     */
    Armor: () => { return 0; },

    /**
     * Get your character's bank serial number.  
The bank serial number can only be obtained if the bank has been opened at least once during the current session.
     * 
     * @returns {string} string
     */
    BankSerial: () => { return ''; },

    /**
     * Check if your character's name can be changed
     * 
     * @returns {boolean} boolean - true if the player can change names.
     */
    CanChangeName: () => { return true; },

    /**
     * Get your character's cold resistance.
     * 
     * @returns {integer} integer - players cold resistance value
     */
    ColdResistance: () => { return 0; },

    /**
     * Get your character's skin color.
     * 
     * @returns {string} string - player color.
     */
    Color: () => { return ''; },

    /**
     * Get your character's container serial number (the container that the player is in).
     * 
     * @returns {string} string - The player’s container serial number (usually land is '0xFFFFFFFF').
     */
    Container: () => { return ''; },

    /**
     * Get your character's count.  
This value and path comes from the server. Maybe somewhere it plays a role and someone will need it.
     * 
     * @returns {integer} integer - player's count.
     */
    Count: () => { return 0; },

    /**
     * Check whether your character is alive or dead
     * 
     * @returns {boolean} boolean - true if the player is dead.
     */
    Dead: () => { return true; },

    /**
     * Get your character's dexterity.
     * 
     * @returns {integer} integer - player dexterity.
     */
    Dex: () => { return 0; },

    /**
     * Get your character's total "Damage Increase" stat.
     * 
     * @returns {integer} integer - player Damage Increase.
     */
    DI: () => { return 0; },

    /**
     * Get your character's current direction.
     * 
     * @returns {integer} integer - player's [direction](search:Directions).
     */
    Direction: () => { return 0; },

    /**
     * Get your character's energy resistance.
     * 
     * @returns {integer} integer - energy resistance
     */
    EnergyResistance: () => { return 0; },

    /**
     * Get your character's total Faster Casting stat.
     * 
     * @returns {integer} integer - player Faster Casting.
     */
    FC: () => { return 0; },

    /**
     * Get your character's total Faster Cast Recovery stat.
     * 
     * @returns {integer} integer - player Faster Cast Recovery.
     */
    FCR: () => { return 0; },

    /**
     * Check your gender
     * 
     * @returns {boolean} boolean - true if your character is female
     */
    Female: () => { return true; },

    /**
     * Get your character's total Fire Resistance value.
     * 
     * @returns {integer} integer - fire resistance
     */
    FireResistance: () => { return 0; },

    /**
     * Get your character's bitflags.
     * 
     * @returns {integer} integer - player bitflags.
     */
    Flags: () => { return 0; },

    /**
     * Character flight check.
     * 
     * @returns {boolean} boolean - true if your player is flying.
     */
    Flying: () => { return true; },

    /**
     * Get the amount pets your character has (unshrunk/in the world).
     * 
     * @returns {integer} integer - number of player pets.
     */
    Followers: () => { return 0; },

    /**
     * Check if your character is frozen
     * 
     * @returns {boolean} boolean - true if the player is frozen.
     */
    Frozen: () => { return true; },

    /**
     * Get your character's full name.
     * 
     * @returns {string} string - player’s full name.
     */
    FullName: () => { return ''; },

    /**
     * Get your character's amount of gold.
     * 
     * @returns {integer} integer - amount of player gold.
     */
    Gold: () => { return 0; },

    /**
     * Get your character's graphic ID.
     * 
     * @returns {string} string - player graphic.
     */
    Graphic: () => { return ''; },

    /**
     * Check if your character is hidden.
     * 
     * @returns {boolean} boolean - true if the player is hidden
     */
    Hidden: () => { return true; },

    /**
     * Get your character's hit points.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - amount of player life.
     */
    Hits: () => { return 0; },

    /**
     * Check if ignoring other characters when moving.
     * 
     * @returns {boolean} boolean - true if the player ignores other characters.
     */
    IgnoreCharacters: () => { return true; },

    /**
     * Check if your character is in the ignore list.
     * 
     * @returns {boolean} boolean - true if the player is on Orion's ignore list.
     */
    Ignored: () => { return true; },

    /**
     * Get your character's intelligence.
     * 
     * @returns {integer} integer - player intelligence.
     */
    Int: () => { return 0; },

    /**
     * Check whether your character is in human form  
Check Graphic on 0x0190-0x0193, 0x00B7-0x00BA, 0x025D-0x0260, 0x029A-0x029B, 0x02B6-0x02B7, 0x03DB, 0x03DF, 0x03E2
     * 
     * @returns {boolean} boolean - true if a player is a human type/graphic.
     */
    IsHuman: () => { return true; },

    /**
     * Get your character's Lower Mana Cost stat.
     * 
     * @returns {integer} integer - player Lower Mana Cost.
     */
    LMC: () => { return 0; },

    /**
     * Get your character's dexterity growth status.
     * 
     * @returns {integer} integer - player dexterity growth state.
     */
    LockDexState: () => { return 0; },

    /**
     * Player locked check.
     * 
     * @returns {boolean} boolean - true if the player is locked.
     */
    Locked: () => { return true; },

    /**
     * Get your character's state of intelligence growth.
     * 
     * @returns {integer} integer - player's state of intelligence growth.
     */
    LockIntState: () => { return 0; },

    /**
     * Get your character's strength growth state.
     * 
     * @returns {integer} integer - player strength growth state.
     */
    LockStrState: () => { return 0; },

    /**
     * Get your character's Lower Reagent Cost stat.
     * 
     * @returns {integer} integer - player Lower Reagent Cost.
     */
    LRC: () => { return 0; },

    /**
     * Get character's Luck amount.
     * 
     * @returns {integer} integer - amount of player luck.
     */
    Luck: () => { return 0; },

    /**
     * Get your character's mana amount.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - player mana amount.
     */
    Mana: () => { return 0; },

    /**
     * Get the index of the facet/map the player is on.
     * 
     * @returns {integer} integer - player map index.
     */
    Map: () => { return 0; },

    /**
     * Get your character's maximum damage.
     * 
     * @returns {integer} integer - maximum player damage.
     */
    MaxDamage: () => { return 0; },

    /**
     * Get the maximum number of your character's pets.
     * 
     * @returns {integer} integer - maximum number of player pets.
     */
    MaxFollowers: () => { return 0; },

    /**
     * Get your character's maximum life.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - maximum amount of hit points
     */
    MaxHits: () => { return 0; },

    /**
     * Get your character's maximum mana.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - maximum amount of player’s mana.
     */
    MaxMana: () => { return 0; },

    /**
     * Get the maximum amount of your character's stamina.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - maximum number of player stamina.
     */
    MaxStam: () => { return 0; },

    /**
     * Get your character's maximum weight.
     * 
     * @returns {integer} integer - maximum player weight.
     */
    MaxWeight: () => { return 0; },

    /**
     * Get your character's minimum damage
     * 
     * @returns {integer} integer - minimum damage
     */
    MinDamage: () => { return 0; },

    /**
     * Animation check of your character.
     * 
     * @returns {boolean} boolean - true if you are animated.
     */
    Mobile: () => { return true; },

    /**
     * Get the name of your character.
     * 
     * @returns {string} string
     */
    Name: () => { return ''; },

    /**
     * Get the color of your character's name.
     * 
     * @returns {string} string - the color of your character's name, 0x0000 if the color was not received from the server.
     */
    NameColor: () => { return ''; },

    /**
     * Get your character's notoriety.
     * 
     * @returns {integer} integer - player [notoriety](search: Notoriety).
     */
    Notoriety: () => { return 0; },

    /**
     * Player paralysis check (debuff 0x755B search).
     * 
     * @returns {boolean} boolean - true if you are paralyzed.
     */
    Paralyzed: () => { return true; },

    /**
     * Player poisoned check.
     * 
     * @returns {boolean} boolean - true if you are poisoned.
     */
    Poisoned: () => { return true; },

    /**
     * Get your character's Poison Resistance stat
     * 
     * @returns {integer} integer - your poison resistance value
     */
    PoisonResistance: () => { return 0; },

    /**
     * Get your character's profile text.
     * 
     * @returns {string} string - player profile text.
     */
    Profile: () => { return ''; },

    /**
     * Player profile check.
     * 
     * @returns {boolean} boolean - true if the player received profile information.
     */
    ProfileReceived: () => { return true; },

    /**
     * Get your character's properties.
     * 
     * @returns {string} string - player properties.
     */
    Properties: () => { return ''; },

    /**
     * Get your character's race.
     * 
     * @returns {integer} integer - player race.
     */
    Race: () => { return 0; },

    /**
     * Get your character's Spell Damage Increase stat.
     * 
     * @returns {integer} integer - your Spell Damage Increase value.
     */
    SDI: () => { return 0; },

    /**
     * Get your character's serial number.
     * 
     * @returns {string} string - player serial number.
     */
    Serial: () => { return ''; },

    /**
     * Get your character's Swing Speed Increase stat.
     * 
     * @returns {integer} integer - your Swing Speed Increase value
     */
    SSI: () => { return 0; },

    /**
     * Get your character's stamina.  
Before calling, you need to make sure that the server sent this information to the client.  
Character status request Orion.GetStatus('serial');
     * 
     * @returns {integer} integer - amount of player stamina.
     */
    Stam: () => { return 0; },

    /**
     * Get your character's stat limit.
     * 
     * @returns {integer} integer - your stat cap (maximum)
     */
    StatsCap: () => { return 0; },

    /**
     * Get the number of steps taken since the player hid
     * 
     * @returns {integer} integer
     */
    StealthSteps: () => { return 0; },

    /**
     * Get your character's strength.
     * 
     * @returns {integer} integer - player strength.
     */
    Str: () => { return 0; },

    /**
     * Get your character's amount of tithing points.
     * 
     * @returns {integer} integer - your tithing points.
     */
    TithingPoints: () => { return 0; },

    /**
     * Get your character's title.
     * 
     * @returns {string} string - player title.
     */
    Title: () => { return ''; },

    /**
     * Get the class fields of the Player, and output their values.
     * 
     * @returns {string} string - Player class fields.
     */
    ToString: () => { return ''; },

    /**
     * Checking your character's combat state.
     * 
     * @returns {boolean} boolean - true if you are in war mode.
     */
    WarMode: () => { return true; },

    /**
     * Get your character's current weight.
     * 
     * @returns {integer} integer - current player weight.
     */
    Weight: () => { return 0; },

    /**
     * Get your character's X coordinate.
     * 
     * @returns {integer} integer - X coordinate of the player.
     */
    X: () => { return 0; },

    /**
     * Get your character's Y coordinate.
     * 
     * @returns {integer} integer - Y coordinate of the player.
     */
    Y: () => { return 0; },

    /**
     * Check if your character has a yellow health bar.
     * 
     * @returns {boolean} boolean - true if you have a yellow health bar.
     */
    YellowHits: () => { return true; },

    /**
     * Get your character's Z coordinate.
     * 
     * @returns {integer} integer - Z coordinate of the player.
     */
    Z: () => { return 0; },
};
export default Player;