class Order {
    constructor(priority,number){
        this.priority = priority;
        this.pending = true;
        this.complete = false;
        this.number = number;
    }

    isPending(){
        this.pending = true
    }

    isCompleted(){
        this.pending = false
        this.complete = true
    }

    toString(){
        return `${this.priority === 1 ? 'VIP ' : 'Normal '}Order #${this.number}`
    }
}

export { Order };