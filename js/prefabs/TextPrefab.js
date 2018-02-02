/**
 *
 * @param {Phaser.State} gameState
 * @param {string} prefabName
 * @param {{x: number, y: number}} position
 * @param {*} properties
 * @constructor
 */
App.TextPrefab = function (gameState, prefabName, position, properties) {
    Phaser.Text.call(this, gameState.game, position.x, position.y, properties.text, properties.style);
    this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    this.scale.setTo(properties.scale.x, properties.scale.y);
    this.__name = prefabName;
    gameState.__prefabs[prefabName] = this;
    gameState.__groups[properties.group].add(this);
};

/** @type {Phaser.Text} */
App.TextPrefab.prototype = Object.create(Phaser.Text.prototype);

/** @type {App.TextPrefab|*} */
App.TextPrefab.prototype.constructor = App.TextPrefab;