import { HanoiTower } from './src/hanoi-tower.js'
import { HanoiNodesManager } from './src/hanoi-nodes-manager.js'
import { Towers } from './src/towers.js'
import { Settings } from './src/settings.js' 



const init = (settings)=>{
    const towers = new Towers()
    const hanoiTower = new HanoiTower(towers)
    const hanoiNodesManager = new HanoiNodesManager(document.querySelector('main'), settings.speed)
    towers.subscribe(hanoiNodesManager)
    const movesCount = hanoiTower.solve(settings.hanoiNodesCount)
    settings.setTotalMovesCount(movesCount)
    hanoiNodesManager.onMovedEvent = settings.onMovedEvent

}
const settings = Settings.getInstance(init)
init(settings)
