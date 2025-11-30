const engine = {
    //these values are set to 0, and are intended to be changed in the game file
    _widthPX: 0,
    _heightPX: 0,

    //makeWindow MUST be called to establish the engine in the web page
    makeWindow: function() {
        const window = `<div id="window" style="width: ${this._widthPX}px; height: ${this._heightPX}px; background-color: black;"></div> <div id="items"> </div> <div id="buttonSet"></div>`;
        document.body.innerHTML += window;
    },
    //nested options to allow a higher degree of control over how the window is displayed
    window: {
        changeColor: function(color) {
            document.getElementById("window").style.backgroundColor = color;
        }
    },
    //allows user input
    buttons: {
        //makeButton creates a html button with a JS function, best used for menus
        makeButton: function(action, text) {
            document.getElementById("buttonSet").innerHTML += `<button onclick="${action}">${text}</button>`;
        },
        //keys stores data refering to which keys are currently being pressed
        keys: {},
        //checkKeys updates keys with informaton, and Must be put in the game loop if use of keys is intended
        checkKeys: function() {
            window.addEventListener("keydown", (e) => {
                this.keys[e.key] = true;
            });

            window.addEventListener("keyup", (e) => {
                this.keys[e.key] = false;
            });
        }
    },
    //anything added to the window (ie. sprite, object) is refered to as a item
    items: {
        //current offset fixes the issue with html flow, and places all items 0,0 pos to the same position
        currentOffset: 0,
        //makeItem is obviously used to make a item
        makeItem: function(x,y,name,width,height,color, radius="0", border="") {
            const temp =  {
                _x: x - this.currentOffset, //these var use _~~ before there name for no reason except that im too lazy to fix it
                _y: y,
                name: name,
                _width: width,
                _height: height,
                color: color,
                radius: radius,
                border: border,
                itemOffset: this.currentOffset
            }
            this.currentOffset += width;
            return temp;
        },
        //print item adds the selected item to the items div by converting it to a html DIV
        printItem: function(item, image="") {
            document.getElementById("items").innerHTML += `<div style="box-sizing: border-box; margin:0; padding:0; width: ${item._width}px; height: ${item._height}px; background-color: ${item.color}; position: relative; bottom: ${item._y + item._height}px; left: ${item._x}px; font-size: ${item._width / 2}px; background-image: ${image}; display: inline-block; border-radius: ${item.radius}px; border: ${item.border}">${item.name}</div>`;
        },
        //clear items emptys the item div so that the screen can refresh
        clearItems: function() {
            document.getElementById("items").innerHTML = "";
        },
        //incase you plan to fully remove a item from the screen (not refresh it), you must use removeOffset and remove the items width, or it may cause positioning errors
        removeOffset: function(offset) {
          this.currentOffset -= offset;
        },
        //basic collision detection
        isCollision: function(itemA, itemB) {
            return !(itemA._x + itemA._width + itemA.itemOffset < itemB._x  + itemB.itemOffset || itemA._x + itemA.itemOffset > itemB._x + itemB._width + itemB.itemOffset || itemA._y + itemA._height < itemB._y || itemA._y > itemB._y + itemB._height);
        }
    },
    sound: {
        //very basic, just added so sound was apart of the engine and wasnt a third party
        make: function(location) {
            return new Audio(location);
        }
    }
}