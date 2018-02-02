window.onload = function () {
    const game = new Phaser.Game(640, 360, Phaser.AUTO);
    game.state.add('Boot', new App.Boot());
    game.state.add('Preload', new App.Preload());
    game.state.add('StartMenu', new App.StartMenu());

    game.state.start('Boot', true, false, 'assets/levels/StartMenu.json', 'StartMenu');
};