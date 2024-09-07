class Order {
    // introduce mechanism for prevent conflict
    // maybe order connect to bot but bot dont hold record of order done?

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
}

module.exports = Order;