/**
 *
 * @param {Phaser.State} gameState
 * @param {string} prefabName
 * @param {{x: number, y: number}} position
 * @param {*} properties
 * @constructor
 */
App.ImagePrefab = function (gameState, prefabName, position, properties) {
    'use strict';
    Phaser.Image.call(this, gameState.game, position.x, position.y, properties.texture);
    this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    this.scale.setTo(properties.scale.x, properties.scale.y);
    this.__name = prefabName;
    gameState.__prefabs[prefabName] = this;
    gameState.__groups[properties.group].add(this);
};

/** @type {Phaser.Image} */
App.ImagePrefab.prototype = Object.create(Phaser.Image.prototype);

/** @type {App.ImagePrefab|*} */
App.ImagePrefab.prototype.constructor = App.ImagePrefab;