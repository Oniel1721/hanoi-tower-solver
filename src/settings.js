export class Settings {
    static hanoiNodesCountInput = document.querySelector('input[type="range"][name="hanoi-nodes-count"]')
    static speedInput = document.querySelector('input[type="range"][name="speed"]')
    static hanoiNodesCounter = document.querySelector('#hanoi-nodes-count')
    hanoiNodesCount = parseInt(Settings.hanoiNodesCountInput.value)
    speed = parseInt(Settings.speedInput.value)
    progressBar = document.querySelector('progress')

    changeEvent = null
    totalMovesCount = 0;

    static instance;

    constructor(changeEvent){
        Settings.hanoiNodesCountInput.addEventListener('input', Settings.onHanoiNodesCountChange)
        Settings.speedInput.addEventListener('input', Settings.onSpeedChange)
        this.changeEvent = changeEvent
    }

    static onHanoiNodesCountChange(e){
        Settings.instance.hanoiNodesCount = parseInt(e.target.value)
        Settings.hanoiNodesCounter.textContent = `(${Settings.instance.hanoiNodesCount})`
        Settings.instance.changeEvent(Settings.instance)
    }

    static onSpeedChange(e){
        Settings.instance.speed = parseInt(e.target.value)
        Settings.instance.changeEvent(Settings.instance)
    }

    setTotalMovesCount(totalMovesCount){
        Settings.instance.totalMovesCount = totalMovesCount
    }

    onMovedEvent(movesCount){
        Settings.instance.progressBar.value = (movesCount/Settings.instance.totalMovesCount)*100
    }

    static getInstance(changeEvent){
        if(Settings.instance) return Settings.instance;
        Settings.instance = new Settings(changeEvent)
        return Settings.instance
    }
}