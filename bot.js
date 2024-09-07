class bot {
    constructor(order = undefined){
        this.order = order
        this.processID = undefined
    }

    assignOrder(order){
        this.order = order
    }

    processOrder(){
        this.processID = setTimeout(this.order.isCompleted(),TIME_PROCESSED)
        this.order = undefined //remove connected order after
        
    }

    cancelOrder(){
        clearTimeout(this.processID)
        //check if it is set to completed or not?
    }
}