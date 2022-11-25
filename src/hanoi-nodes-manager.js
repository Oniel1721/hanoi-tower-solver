export class HanoiNodesManager {
    constructor(main = document.querySelector('main'), baseSpeed){
        this.main = main
        this.positions = [0,0,0]
        this.nodeBaseHeight = 48
        this.nodeBaseWidth = 60
        this.offsetBaseWidth = (0.033/2)
        this.nodeBaseSpeed = baseSpeed
        this.movesCount = 0
    }
    
    onMovedEvent = ()=>{}
    movesCount = 0
    
    commands = []

    status = 'idle'


    
    move(){
        if(this.status !== 'idle') return;
        if(!this.commands.length) return;
        this.status = 'running'
        const {origin, target, originValue} = this.commands.pop()
        const node = document.querySelector(`.hanoi-node[data-value="${originValue}"]`)
        this.positions[origin]--
        this.styleNode(node, target)
        this.positions[target]++
        this.movesCount++
        const callback = ()=>{
            if(this.onMovedEvent) this.onMovedEvent(this.movesCount)
            const originName = document.querySelector(`article[data-index="${origin}"]`)?.textContent
            const targetName = document.querySelector(`article[data-index="${target}"]`)?.textContent
            const moves = document.querySelector('.moves')
            moves.innerHTML = `<p>${originName}${originValue} → ${targetName}</p>`+moves.innerHTML
            this.status = 'idle'
            this.move()
            node.removeEventListener('transitionend', callback)
        }
        node.addEventListener('transitionend', callback)  
    }

    onNodeMoved(origin, target, towers){
        this.commands.unshift({origin, target, originValue: towers[origin].currentTop()})
        this.move()
    }

    onCleared(){
        this.positions = [0,0,0]
        document.querySelectorAll('.hanoi-node').forEach((el)=>this.main.removeChild(el))
        this.movesCount = 0
        document.querySelector('.moves').innerHTML = ''
    }

    createNode(length){
        const hanoiNode = document.createElement('div')
        hanoiNode.classList.add('hanoi-node')
        hanoiNode.setAttribute('data-value', length)
        hanoiNode.textContent = length
        hanoiNode.style.height = `${this.nodeBaseHeight}px`
        hanoiNode.style.width = `${this.nodeBaseWidth+(12*length)}px`
        hanoiNode.style.transition = `all linear ${1*((10/this.nodeBaseSpeed)/2)}s`
        return hanoiNode
    }

    styleNode(node, target){
        const sizes = this.main.getBoundingClientRect() 
        const position = this.positions[target]+1
        // vertical
        node.style.top = `${(sizes.height-10)-(position*this.nodeBaseHeight)}px`
        // horizontal
        const stackWidth = sizes.width*0.3
        const offset = sizes.width*this.offsetBaseWidth
        const gap = sizes.width*0.033
        const nodeWidth = parseInt(node.style.width.slice(0,node.style.width.length-2))
        node.style.left = `${(offset+(target*(stackWidth+gap)))+((stackWidth/2)-(nodeWidth/2))}px`
    }
    
    onFilled(length, target, towers){
        const hanoiNode = this.createNode(length)
        this.main.appendChild(hanoiNode)
        this.styleNode(hanoiNode, target)
        this.positions[target]++
    }
}