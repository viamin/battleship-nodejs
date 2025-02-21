const logo = require('asciiart-logo');
const readline = require('readline-sync');
const gameController = require("./GameController/gameController.js");
const cliColor = require('cli-color');
const beep = require('beepbeep');
const position = require("./GameController/position.js");
const letters = require("./GameController/letters.js");
const Fleet = require("./GameController/fleet.js");
const fonts = require("./fonts");

// Initialize list to track Computer's guesses
const computerHistory = new Set();
let name = 'Anonymous';

const colors = [
    "red", "green", "blue", "yellow", "magenta", "cyan",
]

class Battleship {

    start() {
        console.log(cliColor.white("                                     |__"));
        console.log(cliColor.white("                                     |\\/"));
        console.log(cliColor.white("                                     ---"));
        console.log(cliColor.white("                                     / | ["));
        console.log(cliColor.white("                              !      | |||"));
        console.log(cliColor.white("                            _/|     _/|-++'"));
        console.log(cliColor.white("                        +  +--|    |--|--|_ |-"));
        console.log(cliColor.white("                     { /|__|  |/\\__|  |--- |||__/"));
        console.log(cliColor.white("                    +---------------___[}-_===_.'____                 /\\"));
        console.log(cliColor.white("                ____`-' ||___-{]_| _[}-  |     |_[___\\==--            \\/   _"));
        console.log(cliColor.white(" __..._____--==/___]_|__|_____________________________[___\\==--____,------' .7"));
        console.log(cliColor.white("|                        Welcome to Battleship                         BB-61/"));
        console.log(cliColor.white(" \\_________________________________________________________________________|"));
        console.log();


        name = readline.question("Enter your name: ");

        this.InitializeGame();
        this.StartGame();
    }

    /**
     * Display a message when user wins
     */
    userWins() {
        console.clear();
        console.log(
            logo({
                name,
                font: fonts[Math.floor(Math.random() * fonts.length)],
                logoColor: colors[Math.floor(Math.random() * colors.length)],
                borderColor: colors[Math.floor(Math.random() * colors.length)],
            })
                .emptyLine()
                .center('General! You saved the day!!!')
                .render()
        );
        console.log(cliColor.yellow("     _______________"));
        console.log(cliColor.yellow("    |@@@@|     |####|"));
        console.log(cliColor.yellow("    |@@@@|     |####|"));
        console.log(cliColor.yellow("    |@@@@|     |####|"));
        console.log(cliColor.yellow("    \\@@@@|     |####/"));
        console.log(cliColor.yellow("     \\@@@|     |###/"));
        console.log(cliColor.yellow("      `@@|_____|##'"));
        console.log(cliColor.yellow("           (O)"));
        console.log(cliColor.yellow("        .-'''''-."));
        console.log(cliColor.yellow("      .'  * * *  `."));
        console.log(cliColor.yellow("     :  *       *  :"));
        console.log(cliColor.yellow(`    : ~   ${cliColor.green('Y O U')}   ~ :`));
        console.log(cliColor.yellow(`    : ~   ${cliColor.green('W I N !')} ~ :`));
        console.log(cliColor.yellow("     :  *       *  :"));
        console.log(cliColor.yellow("      `.  * * *  .'"));
        console.log(cliColor.yellow("        `-.....-'"));

    }

    /**
     * Display a message when house wins
     */
    computerWins() {
        console.clear();
        console.log(
            logo({
                name: 'YOU LOSE!',
                font: fonts[Math.floor(Math.random() * fonts.length)],
                logoColor: colors[Math.floor(Math.random() * colors.length)],
                borderColor: colors[Math.floor(Math.random() * colors.length)],
            })
                .emptyLine()
                .render()
        );
    }


    /**
     * You know what it is
     */
    djkhaledwins() {
        console.clear();
        console.log(
            logo({
                name,
                font: fonts[Math.floor(Math.random() * fonts.length)],
                logoColor: colors[Math.floor(Math.random() * colors.length)],
                borderColor: colors[Math.floor(Math.random() * colors.length)],
            })
                .emptyLine()
                .center('General! You have unlocked the sacred power!')
                .render()
        );
        console.log(cliColor.cyan("     _______________"));
        console.log(cliColor.cyan("    |@@@@|     |####|"));
        console.log(cliColor.cyan("    |@@@@|     |####|"));
        console.log(cliColor.cyan("    |@@@@|     |####|"));
        console.log(cliColor.cyan("    \\@@@@|     |####/"));
        console.log(cliColor.cyan("     \\@@@|     |###/"));
        console.log(cliColor.cyan("      `@@|_____|##'"));
        console.log(cliColor.cyan("           (O)"));
        console.log(cliColor.cyan("        .-'''''-."));
        console.log(cliColor.cyan("      .'  * * *  `."));
        console.log(cliColor.cyan("     :  *       *  :"));
        console.log(cliColor.cyan(`    : ~ ${cliColor.blue('DJ KHALED')} ~ :`));
        console.log(cliColor.cyan(`   : ~   ${cliColor.blue('ALWAYS')}    ~ :`));
        console.log(cliColor.cyan(`    : ~   ${cliColor.blue('WINS')}    ~ :`));
        console.log(cliColor.cyan("     :  *       *  :"));
        console.log(cliColor.cyan("      `.  * * *  .'"));
        console.log(cliColor.cyan("        `-.....-'"));
    }

    StartGame() {
        console.clear();
        console.log("                  __");
        console.log("                 /  \\");
        console.log("           .-.  |    |");
        console.log("   *    _.-'  \\  \\__/");
        console.log("    \\.-'       \\");
        console.log("   /          _/");
        console.log("  |      _  /");
        console.log("  |     /_\\'");
        console.log("   \\    \\_/");
        console.log("    \"\"\"\"");

        do {
            console.log();
            console.log("Player, it's your turn");
            this.PrintEnemyFleet();
            console.log("Enter coordinates for your shot (e.g. A3):");
            var position = Battleship.ParsePosition(readline.question());
            if (position === "djkhaled") {
                this.djkhaledwins();
                process.exit(0);
            }
            var isHit = gameController.CheckIsHit(this.enemyFleet.ships, position);
            if (isHit) {
                beep();

                console.log(cliColor.green("       888888b.    .d88888b.   .d88888b.  888b     d888 888"));
                console.log(cliColor.green("       888  \"88b  d88P\" \"Y88b d88P\" \"Y88b 8888b   d8888 888"));
                console.log(cliColor.green("       888  .88P  888     888 888     888 88888b.d88888 888"));
                console.log(cliColor.green("       8888888K.  888     888 888     888 888Y88888P888 888"));
                console.log(cliColor.green("       888  \"Y88b 888     888 888     888 888 Y888P 888 888"));
                console.log(cliColor.green("       888    888 888     888 888     888 888  Y8P  888 Y8P"));
                console.log(cliColor.green("       888   d88P Y88b. .d88P Y88b. .d88P 888   \"   888  \""));
                console.log(cliColor.green("       8888888P\"   \"Y88888P\"   \"Y88888P\"  888       888 888"));
                console.log(cliColor.green("\nYeah ! Nice hit !"));
            } else {
                console.log(cliColor.blue("Miss"));
            }
            if (this.enemyFleet.isSunk()) {
                this.userWins();
                break;
            }

            var computerPos = this.GetRandomPosition();
            var isHit = gameController.CheckIsHit(this.myFleet.ships, computerPos);
            console.log();
            if (isHit) {
                console.log(cliColor.red(`Computer shot in ${computerPos.column}${computerPos.row} and has hit your ship !\n`));

                beep();

                console.log(cliColor.red("       888888b.    .d88888b.   .d88888b.  888b     d888 888"));
                console.log(cliColor.red("       888  \"88b  d88P\" \"Y88b d88P\" \"Y88b 8888b   d8888 888"));
                console.log(cliColor.red("       888  .88P  888     888 888     888 88888b.d88888 888"));
                console.log(cliColor.red("       8888888K.  888     888 888     888 888Y88888P888 888"));
                console.log(cliColor.red("       888  \"Y88b 888     888 888     888 888 Y888P 888 888"));
                console.log(cliColor.red("       888    888 888     888 888     888 888  Y8P  888 Y8P"));
                console.log(cliColor.red("       888   d88P Y88b. .d88P Y88b. .d88P 888   \"   888  \""));
                console.log(cliColor.red("       8888888P\"   \"Y88888P\"   \"Y88888P\"  888       888 888"));
            } else {
                console.log(cliColor.green(`Computer shot in ${computerPos.column}${computerPos.row} and missed.`));
            }
            if (this.myFleet.isSunk()) {
                this.computerWins();
                break;
            }
            console.log("\n_________________________________________________________________________\n");
        }
        while (true);
    }

    static ParsePosition(input) {
        if (input === "djkhaled") {
            return "djkhaled";
        }
        var letter = letters.get(input.toUpperCase().substring(0, 1));
        var number = parseInt(input.substring(1), 10);
        return new position(letter, number);
    }

    GetRandomPosition() {
        const rows = 8;
        const lines = 8;
        while (true) {
            var rndColumn = Math.floor((Math.random() * lines));
            var letter = letters.get(rndColumn + 1);
            var number = Math.floor((Math.random() * rows));
            var nextPosition = new position(letter, number);
            // Check if the nextPosition is in the history of Computer's guesses
            if (!computerHistory.has(`${letter}${number}`)) {
                computerHistory.add(`${letter}${number}`);
                return nextPosition;
            }
            // If it is is hitory come up with a new `nextPosition' in the next interation
        }
    }

    InitializeGame() {
        var enemyFleet = this.InitializeEnemyFleet();
        console.log(enemyFleet.ships);
        this.InitializeMyFleet();
    }

    InitializeMyFleet() {
        this.myFleet = gameController.InitializeShips();

        console.log("Please position your fleet (Game board size is from A to H and 1 to 8) :");

        this.myFleet.ships.forEach(function (ship) {
            console.log();
            console.log(`Please enter the positions for the ${ship.name} (size: ${ship.size})`);
            for (var i = 1; i < ship.size + 1; i++) {
                console.log(`Enter position ${i} of ${ship.size} (i.e A3):`);
                const position = readline.question();
                ship.addPosition(Battleship.ParsePosition(position));
            }
        })
    }

    InitializeEnemyFleet() {
        this.enemyFleet = new Fleet();
        this.enemyFleet.placeShipsRandomly();
        return this.enemyFleet;
    }

    PrintEnemyFleet() {
        console.log("\nEnemy fleet :\n");
        this.enemyFleet.ships.forEach(function (ship) {
            if (ship.isSunk() === "Sunk") {
                console.log(cliColor.green(`${ship.name} : ${ship.isSunk()}`));
            } else {
                console.log(cliColor.magenta(`${ship.name} : ${ship.isSunk()}`));
            }
        })
        console.log("");
    }
}

module.exports = Battleship;
