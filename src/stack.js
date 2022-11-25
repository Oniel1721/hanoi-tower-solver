class Node {
    constructor(value, next = null){
        this.value = value
        this.next = next
    }
}

export class Stack {
    constructor(){
        this.top = null
    }
    push(value){
        if (!this.top) this.top = new Node(value)
        else this.top = new Node(value, this.top)
    }
    pop(){
        if(!this.top) return null
        let value = this.top.value
        this.top = this.top.next
        return value
    }
    currentTop(){
        if(!this.top)return null
        return this.top.value
    }

    toString(){
        let text = '[ ';
        let currentNode = this.top;
        while (currentNode){
            text += `${currentNode.value}`
            if(currentNode.next) text += ' -> '
            currentNode = currentNode.next
        }
        text += ' ]'
        return text
    }
}
