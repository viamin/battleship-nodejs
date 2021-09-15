const Ship = require('./ship.js');
const colors = require("cli-color");

class Fleet {
  constructor() {
    // this.name = name;
    this.ships = [
      new Ship("Aircraft Carrier", 5, colors.blue()),
      new Ship("Battleship", 4, colors.red()),
      new Ship("Submarine", 3, colors.green()),
      // new Ship("Destroyer", 3, colors.yellow()),
      new Ship("Patrol Boat", 2, colors.redBright())
    ];
    // console.log(this.ships)
  }

  placeShipsRandomly() {
    // console.log("Placing ships randomly...");
    // Place the ships randomly
    for (let i = 0; i < this.ships.length; i++) {
      var shipPlaced = false;
      while (!shipPlaced) {
        shipPlaced = this.placeShipRandomly(this.ships[i]);
      }
    }
  }

  placeShipRandomly(ship) {
    let direction = Math.floor(Math.random() * 2);
    let x, y;
    if (direction === 0) { // Horizontal
      x = Math.floor(Math.random() * (7)) + 1;
      y = Math.floor(Math.random() * (7 - ship.size)) + 1;
    } else {
      x = Math.floor(Math.random() * (7 - ship.size)) + 1;
      y = Math.floor(Math.random() * (7)) + 1;
    }
    return this.placeShip(ship, x, y, direction);
  }

  // Place a ship on the board
  placeShip(ship, x, y, direction) {
    // Check if the ship can be placed
    if (this.canPlaceShip(ship, x, y, direction)) {
      // console.log("Placing ship " + ship.name + " at (" + x + ", " + y + ")");
      // Place the ship
      ship.place(x, y, direction);
      return true;
    }
    return false;
  }

  canPlaceShip(ship, x, y, direction) {
    // Check if the ship can be placed
    if (this.ships.length > 0) {
      // Check if the ship overlaps with another ship
      for (let i = 0; i < this.ships.length; i++) {
        if (this.ships[i].overlaps(ship, x, y, direction)) {
          return false;
        }
      }
    }
    return true;
  }

  isSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === "Not Sunk") {
        return false;
      }
    }
    return true;
  }
}

module.exports = Fleet;