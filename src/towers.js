import { Stack } from './stack.js'

export class Towers{
    constructor(){
        this.towers = [new Stack(), new Stack(), new Stack()]
        this.subscriptors = []
    }

    subscribe(subscriptor){
        this.subscriptors.push(subscriptor)
    }

    unsubscribe(subscriptor){
        this.subscriptors = this.subscriptors.filter((sub)=>sub !== subscriptor)
    }

    emitEvent(callback){
        this.subscriptors.forEach((sub)=>{
            callback(sub)
        })
    }

    moveTo(origin, target){
        this.emitEvent((sub)=>sub.onNodeMoved(origin, target, this.towers))
        this.towers[target].push(this.towers[origin].pop())
    }

    fill(length, target = 0){
        while(length >=1){
            this.towers[target].push(length)
            this.emitEvent((sub)=>{sub.onFilled(length, target, this)})
            length--
        }
    }

    clear(){
        this.towers = [new Stack(), new Stack(), new Stack()]
        this.emitEvent(sub=>sub.onCleared())
    }
}