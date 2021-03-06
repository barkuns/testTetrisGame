class View {
    constructor() {
        this.field = game.gameField
        const APPWIDTH = BOARDX * BLOCKSIZE
        const APPHEIGHT = BOARDY * BLOCKSIZE
        this.viewModel = []
        this.app = new PIXI.Application({
            width: APPWIDTH, height: APPHEIGHT, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });
        gameArea.appendChild(this.app.view);
        for (let i = 3, p = 0; i < this.field.length; i++ , p++) {
            var line = this.field[i]
            this.viewModel.push([])
            for (let k = 0; k < line.length; k++) {
                this.viewModel[p].push(createBlock())
                this.viewModel[p][k].x = k * BLOCKSIZE
                this.viewModel[p][k].y = p * BLOCKSIZE
                this.app.stage.addChild(this.viewModel[p][k])
            }
        }
        this.app.ticker.add(() => this.draw())
    }
    draw() {
        for (let i = 3, p = 0; i < this.field.length; i++ , p++) {
            var line = this.field[i]
            for (let k = 0; k < line.length; k++) {
                this.field[i][k].activeBlock ?
                    this.viewModel[p][k].visible = true : this.viewModel[p][k].visible = false
            }
        }
    }
}
const testSprite = PIXI.Texture.from('img/testSprite.png')
function createBlock() {
    var sprite = new PIXI.Sprite(testSprite)
    var block = new PIXI.Container()
    block.addChild(sprite)
    block.visible = false
    return block
}