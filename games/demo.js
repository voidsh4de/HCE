let y = 0;
let x = 0;
let running = true;
function randColour() {
    const colours = ["purple", "grey", "green", "blue", "red", "pink"];
    return colours[Math.floor(Math.random() * colours.length)];
}

function start() {
    engine._widthPX = 1000;
    engine._heightPX = 600;
    engine.makeWindow();
    engine.window.changeColor("green");

    //items
    
    const bobby = engine.items.makeItem(x, y, "bobby", 20, 20, "purple", 20, "black inset 3px");
    const billy = engine.items.makeItem(0, 100, "billy", 20, 20, "purple");
    //buttons
    engine.buttons.makeButton("running = false;", "stop"); //stops game
    engine.buttons.makeButton("engine.window.changeColor(randColour())", "colour change");
    engine.buttons.makeButton("y += 5", "up"); //player goes up by 5 pixels
    engine.buttons.makeButton("y -= 5", "down"); //player goes down by 5 pixels
    engine.buttons.makeButton("x += 5", "right"); //player goes up by 5 pixels
    engine.buttons.makeButton("x -= 5", "left"); //player goes down by 5 pixels
    const click = engine.sound.make("https://www.soundjay.com/buttons/sounds/button-3.mp3");
    //functions
    function main() {
        if (running === true) {
            bobby._x = x;
            bobby._y = y;
            engine.items.clearItems();
            engine.items.printItem(bobby);
            engine.items.printItem(billy);

            engine.buttons.checkKeys();
            if (engine.buttons.keys["w"]) y += 5;
            if (engine.buttons.keys["s"]) y -= 5;
            if (engine.buttons.keys["d"]) x += 5;
            if (engine.buttons.keys["a"]) x -= 5;
            if (engine.items.isCollision(bobby, billy)) {
                engine.window.changeColor(randColour());
                click.play();
            }
            setTimeout(main, 100)
        }
    }
    
    main()
}