/**
 * StartMenu state
 * @constructor
 */
App.StartMenu = function () {
    'use strict';
    App.JSONLevelState.call(this);

    this.__prefabClasses = {
        image: App.ImagePrefab.prototype.constructor,
        text: App.TextPrefab.prototype.constructor,
        audio: App.AudioPrefab.prototype.constructor,
        button: App.ButtonPrefab.prototype.constructor
    };
};

/** @type {App.JSONLevelState} */
App.StartMenu.prototype = Object.create(App.JSONLevelState.prototype);

/** @type {App.StartMenu|*} */
App.StartMenu.prototype.constructor = App.StartMenu;


App.StartMenu.prototype.create = function () {
    'use strict';
    App.JSONLevelState.prototype.create.call(this);

    this.world.bringToTop(this.__groups.ui);

    this.__groups.ui.children.forEach(function (uiObject) {
        uiObject.visible = false;
    }, this);

};

/**
 * Start the game
 * @private
 */
App.StartMenu.prototype.__start = function () {
    'use strict';
    console.log('start game');
    this.__prefabs.sfxBtnClick.play();
};

/**
 * Open settings panel
 * @param {Phaser.Button} button
 * @private
 */
App.StartMenu.prototype.__settings = function (button) {
    'use strict';
    this.__openPanel(button.__name);
    console.log('settings');
};

/**
 * Open credits panel
 * @param {Phaser.Button} button
 * @private
 */
App.StartMenu.prototype.__credits = function (button) {
    'use strict';
    this.__openPanel(button.__name);
    console.log('credits');
};

/**
 * Open the matching panel
 * @param {string} buttonName
 * @private
 */
App.StartMenu.prototype.__openPanel = function (buttonName) {
    'use strict';
    let label = buttonName.replace('Btn', '');
    this.__prefabs.sfxBtnClick.play();
    this.__prefabs.panel.visible = true;
    this.__prefabs[label + 'PanelLabel'].visible = true;
    this.__prefabs.closeBtn.visible = true;
    this.__groups.menu.visible = false;
};

/**
 * Close an opened panel
 * @private
 */
App.StartMenu.prototype.__closePanel = function () {
    'use strict';
    this.__prefabs.sfxBtnOver.play();
    this.__groups.ui.forEach(function (uiObject) {
        if (uiObject.visible) {
            uiObject.visible = false;
        }
    }, this);
    this.__groups.menu.visible = true;
};
