/**
 *
 * @param {Phaser.State} gameState
 * @param {string} prefabName
 * @param {{x: number, y: number}} position
 * @param {*} properties
 * @constructor
 */
App.AudioPrefab = function (gameState, prefabName, position, properties) {
    'use strict';
    Phaser.Sound.call(this, gameState.game, properties.key, properties.volume, properties.loop, properties.connect);
    this.__name = prefabName;
    gameState.__prefabs[prefabName] = this;
};

/** @type {Phaser.Sound} */
App.AudioPrefab.prototype = Object.create(Phaser.Sound.prototype);

/** @type {App.AudioPrefab|*} */
App.AudioPrefab.prototype.constructor = App.AudioPrefab;