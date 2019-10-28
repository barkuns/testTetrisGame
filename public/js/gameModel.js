var type1 = {
    "configuration": [[1, 1, 0], [0, 1, 1]],
    "color": 1
}
class GameModel {
    constructor(sizeX, sizeY) {
        this.board = new Board(sizeX, sizeY + 3);
        this.size = [sizeX, sizeY + 3]
        //this.items = {}
        this.currItem
        this.gameField = [];
        for (let i = 0; i < sizeY + 3; i++) {
            this.gameField[i] = []
            for (let k = 0; k < sizeX; k++) {
                this.gameField[i][k] = { "isEmpty": true };
            }
        }
        this.addItem()//временно, потом удалить- для теста

    }
    addItem(type) {
        this.currItem = new Item(0, 0, type1);//temp1 для теста- потом удалить
        this.updateModel()
    };
    moveItemRight() {
        this.setZerro()
        this.currItem.moveRight()
        this.updateModel()
    }
    moveItemLeft() {
        this.setZerro()
        this.currItem.moveLeft()
        this.updateModel()
    }
    moveItemRotate() {
        this.setZerro()
        this.currItem.rotate()
        this.updateModel()
    }
    moveItemDown() {
        this.setZerro()
        this.currItem.moveDown()
        this.updateModel()
    }
    updateModel() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = blocksObj[elem]
        }
        console.table(this.gameField)
    }
    setZerro() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = { "isEmpty": true }
        }
    }
    crashItem() {
        var blocksObj = this.currItem.model;
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            this.gameField[elemY][elemX] = { "isEmpty": false, "isIndependent": true, "color": blocksObj[elem].color }
        }
    }
    checkLeft() {
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemX == 0) return false;
            var leftFriend = this.gameField[elemY][elemX-1];
            if (leftFriend.isEmpty == false) return false
        }
        return true
    }
    checkRight() {
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemX == this.size[0]-1) return false;
            var rightFriend = this.gameField[elemY][elemX+1];
            if (rightFriend.isEmpty == false) return false
        }
        return true
    }
    checkDown(){
        var blocksObj = this.currItem.model
        for (let elem in blocksObj) {
            var elemX = blocksObj[elem].x
            var elemY = blocksObj[elem].y
            if (elemY == this.size[1]-1) return false;
            var downFriend = this.gameField[elemY+1][elemX];
            if (downFriend.isEmpty == false) return false
        }
        return true
    }
    checkRotate(){
        var nextConfigModel = transpose(this.currItem.currentModel);
        
    }
}