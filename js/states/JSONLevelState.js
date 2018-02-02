/**
 * JSONLevelState
 * Each game state that has its DisplayObjects and groups created using a JSON file should extends from this class
 * @constructor
 */
App.JSONLevelState = function () {
    'use strict';
    Phaser.State.call(this);

    this.__metadata = {};
    this.__prefabClasses = {};
    this.__prefabs = {};
    this.__groups = {};
};

/** @type {Phaser.State} */
App.JSONLevelState.prototype = Object.create(Phaser.State.prototype);

/** @type {App.JSONLevelState|*} */
App.JSONLevelState.prototype.constructor = App.JSONLevelState;

/**
 *
 * @param {string} metadata  :Object containing the loaded assets properties
 */
App.JSONLevelState.prototype.init = function (metadata) {
    'use strict';
    this.__metadata = metadata;
};


App.JSONLevelState.prototype.create = function () {
    'use strict';
    this.__createGroups(this.__metadata.groups);
    this.__createGameObjects(this.__metadata.prefabs);
};

/**
 * Create DisplayObject groups
 * @param {array} groups
 * @private
 */
App.JSONLevelState.prototype.__createGroups = function (groups) {
    'use strict';
    groups.forEach(function (reference) {
        this.__groups[reference] = this.add.group();
    }, this);
};

/**
 * Create GameObjects
 * @param {object} prefabsData
 * @private
 */
App.JSONLevelState.prototype.__createGameObjects = function (prefabsData) {
    'use strict';
    Object.keys(prefabsData).forEach(function (prefabName) {
        let data = prefabsData[prefabName];
        if (this.__prefabClasses.hasOwnProperty(data.type)) {
            new this.__prefabClasses[data.type](this, prefabName, data.position, data.properties);
        }
    }, this);
};

