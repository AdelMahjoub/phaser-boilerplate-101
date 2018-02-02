/** global namespace */
const App = {};

/**
 * Boot state
 * Load a JSON file containing the assets metadata to load in the Preload state
 * Switch to the Preload state in the create phase and pass the `metadata object` as a param
 * All custom properties are prefixed with `__` to avoid overwriting inherited properties
 * @constructor
 */
App.Boot = function () {
    'use strict';
    Phaser.State.call(this);

    /** @type {string} JSON file to load */
    this.__JSONLevelFile = '';

    /** @type {string} state to call after the Preload state */
    this.__nextState = '';
};

/** @type {Phaser.State} */
App.Boot.prototype = Object.create(Phaser.State.prototype);

/** @type {App.Boot|*} */
App.Boot.prototype.constructor = App.Boot;

/**
 *
 * @param {string} JSONLevelFile  : JSON file containing assets information
 * @param {string} nextState      : the state to call in the Preload state
 */
App.Boot.prototype.init = function (JSONLevelFile, nextState) {
    'use strict';
    this.__JSONLevelFile = JSONLevelFile;
    this.__nextState = nextState;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.setMinMax(480, 270, 960, 540);

    this.time.desiredFps = 24;

    this.add.text(0, 0, 'font preload hack', {font: '1px kenvector'}); // A Hack to Load a .ttf font
};

App.Boot.prototype.preload = function () {
    'use strict';
    this.load.image('loading_bar', 'assets/images/loading_bar.png');
    this.load.image('loading_bar_container', 'assets/images/loading_bar_container.png');
    this.load.json('metadata', this.__JSONLevelFile);
};

App.Boot.prototype.create = function () {
    'use strict';
    const metadata = this.cache.getJSON('metadata');
    this.state.start('Preload', true, false, metadata, this.__nextState);
};
