class GameController {
    static InitializeShips() {
        var colors = require("cli-color");
        const Ship = require("./ship.js");
        const Fleet = require("./fleet.js");
        var myFleet = new Fleet();
        return myFleet;
    }

    static CheckIsHit(ships, shot) {
        if (shot == undefined)
            throw "The shooting position is not defined";
        if (ships == undefined)
            throw "No ships defined";
        var returnvalue = false;
        ships.forEach(function (ship) {
            ship.positions.forEach(position => {
                console.log(`${ship.name}: ${position.toString()}`);
                if (position.row == shot.row && position.column == shot.column) {
                    console.log("row and column matched!")
                    ship.addHit(position);
                    returnvalue = true;
                }
            });
        });
        return returnvalue;
    }

    static isShipValid(ship) {
        return ship.positions.length == ship.size;
    }
}

module.exports = GameController;