import { Towers } from './towers.js'

export class HanoiTower {
    constructor(towers){
        this.towers = towers
        this.movesCount = 0
    }

    moveNode(origin, target){
        this.towers.moveTo(origin, target)
        this.movesCount++
    }

    moveBlock(origin, auxiliar, target){
        this.moveNode(origin, auxiliar)
        this.moveNode(origin, target)
        this.moveNode(auxiliar, target)
    }

    moveTower(origin, auxiliar, target, length){
        if(length === 1) this.moveNode(origin, target)
        else if(length === 2) this.moveBlock(origin, auxiliar, target)
        else if(length === 3){
            this.moveBlock(origin, target, auxiliar)
            this.moveNode(origin, target)
            this.moveBlock(auxiliar, origin, target)
        }
        else if(length >= 4){
            this.moveTower(origin, target, auxiliar, length-1)
            this.moveNode(origin, target)
            this.moveTower(auxiliar, origin, target, length-1)
        }
    }

    solve(length){
        this.movesCount = 0
        this.clearTowers()
        this.fillFirstTower(length)
        this.moveTower(0,1,2,length)
        return this.movesCount
    }

    clearTowers(){
        this.towers.clear()
    }

    fillFirstTower(length){
        this.towers.fill(length, 0)
    }

}
