import { TIME_PROCESSED } from "./constants.js";

class Bot {
    constructor(order = undefined){
        this.order = order
        this.processID = undefined
    }

    assignOrder(order){
        this.order = order
    }

    processOrder(){
        return new Promise((resolve) => {
            this.processID = setTimeout(() => {
                this.order.isCompleted(); // Process order
                this.order = undefined;   // Remove connected order after
                resolve();                // Resolve the promise after completion
            }, TIME_PROCESSED);
        });
    }

    cancelOrder(){
        clearTimeout(this.processID)
        this.processID = undefined
        return this.order
    }

    isIdle(){
        return this.order === undefined
    }
}

export { Bot };