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
        return this.order
        //check if it is set to completed or not?
    }
}

module.exports = Bot;