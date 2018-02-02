/**
 * Preload state
 * Load all the required assets required in the next state
 * All custom properties are prefixed with `__` to avoid overwriting inherited properties
 * Switch to the next state in the create phase and pass the `metadata` object as a param
 * @constructor
 */
App.Preload = function () {
    'use strict';
    Phaser.State.call(this);

    /** @type {object}  assets metadata */
    this.__metadata = {};

    /** @type {string} next state to switch to */
    this.__nextState = '';

    /** @type {Phaser.Image|DisplayObject} */
    this.__loadingBar = null;

    /** @type {Phaser.Image|DisplayObject} */
    this.__loadingBarContainer = null;

    /** @type {Phaser.text|DisplayObject} */
    this.__loadingText = null;

    /** @type {Phaser.Group} */
    this.__loadingGroup = null;
};

/** @type {Phaser.State} */
App.Preload.prototype = Object.create(Phaser.State.prototype);

/** @type {App.Preload|*} */
App.Preload.prototype.constructor = App.Preload;

/**
 *
 * @param {string} metadata  :Object containing the assets informations to load
 * @param {string} nextState :the state to call after loading the assets
 */
App.Preload.prototype.init = function (metadata, nextState) {
    'use strict';
    this.__metadata = metadata;
    this.__nextState = nextState;

    this.__initLoadingBar();
    this.load.onFileComplete.add(this.__watchLoadingProgress, this);
};

App.Preload.prototype.preload = function () {
    'use strict';
    this.__load(this.__metadata.assets);
};

App.Preload.prototype.create = function () {
    'use strict';
    this.state.start(this.__nextState, true, false, this.__metadata);
};

/**
 * Initialize and render the loading bar
 * @private
 */
App.Preload.prototype.__initLoadingBar = function () {
    'use strict';
    this.__loadingBar = this.make.image(0, 0, 'loading_bar');
    this.__loadingBarContainer = this.make.image(0, 0, 'loading_bar_container');
    this.__loadingText = this.make.text(
        this.__loadingBar.x,
        this.__loadingBar.y, 'Loading...',
        {font: '18px kenvector', fill: '#ffffff'}
    );
    this.__loadingGroup = this.add.group();

    this.__loadingGroup.add(this.__loadingBar);
    this.__loadingGroup.add(this.__loadingBarContainer);
    this.__loadingGroup.add(this.__loadingText);

    this.__loadingText.position.set(this.__loadingBar.x, this.__loadingBar.y - this.__loadingBar.height);
    this.__loadingBar.crop(new Phaser.Rectangle(0, 0, 0, this.__loadingBarContainer.height));

    this.__loadingGroup.position.setTo(
        this.world.width - this.__loadingBarContainer.width - 10,
        this.world.height - this.__loadingBarContainer.height - 10
    );
};

/**
 * Update the loading progress feedback
 * @param {number} progress
 * @param {number} assetKey
 * @param {boolean} success
 * @param {number} loadCount
 * @param {number} totalToload
 * @private
 */
App.Preload.prototype.__watchLoadingProgress = function (progress, assetKey, success, loadCount, totalToload) {
    'use strict';
    this.__loadingText.text = 'Loading... ' + loadCount + '/' + totalToload;
    this.__loadingBar.crop(new Phaser.Rectangle(0, 0, this.__loadingBarContainer.width * progress / 100, this.__loadingBarContainer.height));
};

/**
 * Loop through the assets array and load each required asset
 * @param {object[]} assets
 * @private
 */
App.Preload.prototype.__load = function (assets) {
    'use strict';
    assets.forEach(function (asset) {
        switch (asset.type) {
            case "image":
                this.load.image(asset.key, asset.url);
                break;
            case "audio":
                this.load.audio(asset.key, asset.url);
                break;
            case "spritesheet":
                this.load.spritesheet(
                    asset.key,
                    asset.url,
                    asset.frameWidth,
                    asset.frameHeight,
                    asset['frameMax'], asset['margin'], asset['spacing']
                );
                break;
        }
    }, this);
};