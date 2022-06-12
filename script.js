class Grid {
    constructor(columnsNumber, rowsNumbers, redPlayer, yellowPlayer, selector) {
        this.x = 7;
        this.y = 6;
        this.turn = 1;
        this.redPlayer = redPlayer;
        this.yellowPlayer = yellowPlayer;
        this.selector = selector;
        this.redScore = 0;
        this.yellowScore = 0;
        this.history = [null, null];
        if(columnsNumber < 26) {
            if(columnsNumber !== "") {
                this.x = columnsNumber;
            }
            if(rowsNumbers !== "") {
                this.y = rowsNumbers;
            }
        }
        else {
            alert("columns number must be < 26");
            exit();
        }
        this.drawGame();
        this.showPlayers();
        this.showScore();
        this.clickColumn();
        this.turnPlayer();
    }
    isDraw() {
        let result = true;
        for(let i = 1; i <= this.x; i++) {
            for(let j = 1; j <= this.y; j++) {
                if($("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").hasClass("empty")) {
                    result = false;
                }
            }
        }
        if(result === true) {
            $(".message").text("draw");
            $(".undo-button").hide();
            $(".replay-button").show();
        }
    }
    showPlayers() {
        $(".red-player").text(this.redPlayer);
        $(".yellow-player").text(this.yellowPlayer);
    }
    showScore() {
        $(".red-score").text(this.redScore);
        $(".yellow-score").text(this.yellowScore);
    }
    drawGame() {
    let game = $(this.selector);
        for(let i = 1; i <= this.x; i++) {
            let column = $("<div>").addClass("column-"+i);
            for(let j = this.y; j > 0; j--) {
                let cell = $("<div>").addClass("cell empty").attr("data-x", i).attr("data-y", j);
                column.append(cell);
            }
            game.append(column);
        }
    }
    getCell(x, y) {
        return $("div[data-x=\""+x+"\"][data-y=\""+y+"\"]");
    }
    doesCellExist(x, y) {
        if(this.getCell(x, y).hasClass("empty") || this.getCell(x, y).hasClass("yellow") || this.getCell(x, y).hasClass("red")) {
            return true;
        }
        else return false;
    }
    clickColumn() {
        for(let x = 1; x <= this.x; x++) {
            let string = ".column-"+x;
            $(string).click(() => {
                if(this.isColumnFull(x) === true) {
                    return;
                }
                let y = this.emptyCell(x);
                if(this.turn%2 === 1) {
                    $("div[data-x=\""+x+"\"][data-y=\""+y+"\"]").removeClass("empty");
                    $("div[data-x=\""+x+"\"][data-y=\""+y+"\"]").addClass("red");
                }
                else if(this.turn%2 === 0) {
                    $("div[data-x=\""+x+"\"][data-y=\""+y+"\"]").removeClass("empty");
                    $("div[data-x=\""+x+"\"][data-y=\""+y+"\"]").addClass("yellow");
                }
                this.updateHistory(x, y);
                this.turn++;
                $(".undo-button").show();
                this.turnPlayer();
                this.detectWin();
                this.isDraw();
            });
        }
    }
    isColumnFull(i) {
        let result = false;
        for(let j = 1; j <= this.y; j++) {
            if($("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").hasClass("empty")) {
                result = false;
            }
            else result = true;
        }
        return result;
    }
    emptyCell(i) {
        for(let y = 1; y <= this.y; y++) {
            if($("div[data-x=\""+i+"\"][data-y=\""+y+"\"]").hasClass("empty")) {
                return y;
            }
        }
    }
    updateHistory(x, y) {
        this.history[0] = x;
        this.history[1] = y;
    }
    detectWin() {
        let result = 0;
        for(let i = 1; i <= this.x; i++) {
            for(let j = 1; j <= this.y; j++) {
                if($("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").hasClass("empty")) {
                    break;
                }
                else if($("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").hasClass("red")) {
                    result = 1;
                    for(let a = i + 1; a < i + 4; a++) {
                        if(this.doesCellExist(a, j) === true && $("div[data-x=\""+a+"\"][data-y=\""+j+"\"]").hasClass("red")) {
                            result++;
                            if(4 == result) {
                                this.winScreen("red");
                                $(".undo-button").hide();
                            }
                        }
                    }
                    result = 1;
                    for(let a = j + 1; a < j + 4; a++) {
                        if(this.doesCellExist(i, a) === true && $("div[data-x=\""+i+"\"][data-y=\""+a+"\"]").hasClass("red")) {
                            result++;
                            if(4 == result) {
                                this.winScreen("red");
                                $(".undo-button").hide();
                            }
                        }
                    }
                    result = 1;
                    for(let n = 1; n < 4 ; n++) {
                        if(this.doesCellExist(i+n, j+n) === true && $("div[data-x=\""+(i+n)+"\"][data-y=\""+(j+n)+"\"]").hasClass("red")) {
                            result++;
                        }
                        if(4 == result) {
                            this.winScreen("red");
                            $(".undo-button").hide();
                        }
                    }
                    result = 1;
                    for(let n = 1; n < 4 ; n++) {
                        if(this.doesCellExist(i+n, j-n) === true && $("div[data-x=\""+(i+n)+"\"][data-y=\""+(j-n)+"\"]").hasClass("red")) {
                            result++;
                        }
                        if(4 == result) {
                            this.winScreen("red");
                            $(".undo-button").hide();
                        }
                    }
                    result = 1;
                }
                else if($("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").hasClass("yellow")) {
                    result = 1;
                    for(let a = i + 1; a < i + 4; a++) {
                        if(this.doesCellExist(a, j) === true && $("div[data-x=\""+a+"\"][data-y=\""+j+"\"]").hasClass("yellow")) {
                            result++;
                            if(4 == result) {
                                this.winScreen("yellow");
                                $(".undo-button").hide();
                            }
                        }
                    }
                    result = 1;
                    for(let a = j + 1; a < j + 4; a++) {
                        if(this.doesCellExist(i, a) === true && $("div[data-x=\""+i+"\"][data-y=\""+a+"\"]").hasClass("yellow")) {
                            result++;
                            if(4 == result) {
                                this.winScreen("yellow");
                                $(".undo-button").hide();
                            }
                        }
                    }
                    result = 1;
                    for(let n = 1; n < 4 ; n++) {
                        if(this.doesCellExist(i+n, j+n) === true && $("div[data-x=\""+(i+n)+"\"][data-y=\""+(j+n)+"\"]").hasClass("yellow")) {
                            result++;
                        }
                        if(4 == result) {
                            this.winScreen("yellow");
                            $(".undo-button").hide();
                        }
                    }
                    result = 1;
                    for(let n = 1; n < 4 ; n++) {
                        if(this.doesCellExist(i+n, j-n) === true && $("div[data-x=\""+(i+n)+"\"][data-y=\""+(j-n)+"\"]").hasClass("yellow")) {
                            result++;
                        }
                        if(4 == result) {
                            this.winScreen("yellow");
                            $(".undo-button").hide();
                        }
                    }
                    result = 1;
                }
            }
        }
    }
    turnPlayer() {
        if(this.turn%2 === 1) {
            $(".message").text("turn: "+this.redPlayer);
        }
        else if(this.turn%2 === 0) {
            $(".message").text("turn: "+this.yellowPlayer);
        }
    }
    winScreen(color) {
        $(".revenge-button").show();
        if(color === "red") {
            this.redScore++;
            this.showScore();
            $(".message").text(this.redPlayer+" won");
            $(".win-div").show();
            $("#game").css("pointer-events", "none");
        }
        else if(color === "yellow") {
            this.yellowScore++;
            this.showScore();
            $(".message").text(this.yellowPlayer+" won");
            $(".win-div").show();
            $("#game").css("pointer-events", "none");
        }
    }
    restartGame() {
        for(let i = 1; i <= this.x; i++) {
            for(let j = 1; j <= this.y; j++) {
                $("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").removeClass("red");
                $("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").removeClass("yellow");
                $("div[data-x=\""+i+"\"][data-y=\""+j+"\"]").addClass("empty");
            }
        }
        this.updateHistory(null, null);
        $(".replay-button").hide();
        $(".revenge-button").hide();
        $(".undo-button").hide();
        if(this.turn%2 === 1) {
            $(".message").text(this.redPlayer+" starts");
        }
        else if(this.turn%2 === 0) {
            $(".message").text(this.yellowPlayer+" starts");
        }
        $("#game").css("pointer-events", "auto");
    }
    resetGame() {
        Storage.fourInALine = null;
        $("#game").text("");
        sessionStorage.setItem("columns", "");
        sessionStorage.setItem("rows", "");
        sessionStorage.setItem("yellow-player", "");
        sessionStorage.setItem("red-player", "");
        $(".yellow-input").val("");
        $(".red-input").val("");
        $(".columns-input").val("");
        $(".rows-input").val("");
        this.redScore = 0;
        this.yellowScore = 0;
        $(".game-div").hide();
        $(".menu-div").show();
        $("#game").css("pointer-events", "auto");
    }
}
$(() => {
    $(".game-div").hide();
    $(".revenge-button").hide();
    $(".yellow-input").on("keyup", () => {
        let string = $(".yellow-input").val();
        sessionStorage.setItem("yellow-player", string);
    });
    $(".red-input").on("keyup", () => {
        let string = $(".red-input").val();
        sessionStorage.setItem("red-player", string);
    });
    $(".columns-input").on("keyup", () => {
        let string = $(".columns-input").val();
        sessionStorage.setItem("columns", string);
    });
    $(".rows-input").on("keyup", () => {
        let string = $(".rows-input").val();
        sessionStorage.setItem("rows", string);
    });
    $(".clear-dimensions").click(() => {
        sessionStorage.setItem("columns", "");
        sessionStorage.setItem("rows", "");
        $(".columns-input").val("");
        $(".rows-input").val("");
    });
    $(".clear-names").click(() => {
        sessionStorage.setItem("yellow-player", "");
        sessionStorage.setItem("red-player", "");
        $(".yellow-input").val("");
        $(".red-input").val("");
    });
    $(".start-button").click(() => {
        $(".menu-div").hide();
        $(".revenge-button").hide();
        $(".game-div").show();
        $(".undo-button").hide();
        let redPlayer = "red player";
        let yellowPlayer = "yellow player";
        let columns = 7;
        let rows = 6;
        if(sessionStorage.getItem("red-player")) {
            redPlayer = sessionStorage.getItem("red-player");
        }
        if(sessionStorage.getItem("yellow-player")) {
            yellowPlayer = sessionStorage.getItem("yellow-player");
        }
        if(sessionStorage.getItem("columns")) {
            columns = Number(sessionStorage.getItem("columns"));
        }
        if(sessionStorage.getItem("rows")) {
            rows = Number(sessionStorage.getItem("rows"));
        }
        let fourInALine = new Grid(columns, rows, redPlayer, yellowPlayer, "#game");
        $(".replay-button").hide();
        $(".replay-button").click(() => {
            fourInALine.turn--;
            fourInALine.restartGame();
        });
        $(".revenge-button").click(() => {
            fourInALine.restartGame();
            $(".revenge-button").hide();
        });
        $(".undo-button").click(() => {
            if($("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").hasClass("red")) {
                $("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").removeClass("red");
                $("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").addClass("empty");
                console.log("red");
            }
            else if($("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").hasClass("yellow")) {
                $("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").removeClass("yellow");
                $("div[data-x=\""+fourInALine.history[0]+"\"][data-y=\""+fourInALine.history[1]+"\"]").addClass("empty");
                console.log("yellow");
            }
            else {
                console.log("error");
                return;
            }
            fourInALine.turn--;
            fourInALine.turnPlayer();
            $(".undo-button").hide();
            return;
        });
        $(".menu-button").click(() => {
            fourInALine.resetGame();
            $(".game-div").hide();
            $(".menu-div").show();
        });
        $("*").click(() => {
            console.clear();
            console.log("history x = "+fourInALine.history[0]);
            console.log("history y = "+fourInALine.history[1]);
            console.log("turn = "+fourInALine.turn);
        });
    });
});