/**
 *
 * @param {Phaser.State} gameState
 * @param {string} prefabName
 * @param {{x: number, y: number}} position
 * @param {*} properties
 * @constructor
 */
App.ButtonPrefab = function (gameState, prefabName, position, properties) {
    'use strict';
    Phaser.Button.call(
        this,
        gameState.game,
        position.x,
        position.y,
        properties.texture,
        gameState[properties.callback],
        gameState,
        properties['frames'] ? properties.frames.over : null,
        properties['frames'] ? properties.frames.out : null,
        properties['frames'] ? properties.frames.down : null,
        properties['frames'] ? properties.frames.up : null
    );
    this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    this.scale.setTo(properties.scale.x, properties.scale.y);
    this.__name = prefabName;
    gameState.__prefabs[prefabName] = this;
    gameState.__groups[properties.group].add(this);

};

/** @type {Phaser.Button} */
App.ButtonPrefab.prototype = Object.create(Phaser.Button.prototype);

/** @type {App.ButtonPrefab|*} */
App.ButtonPrefab.prototype.constructor = App.ButtonPrefab;