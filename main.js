const Order = require('./order');
const Bot = require('./bot');
const constants = require('./constants');

class System {
    constructor(){
        this.pendingOrders = []
        this.completedOrders = []
        this.botList = [] //stack
        this.orderNo = 1
    }

    updateOrderNo(){
        this.orderNo += 1
    }

    async addBot(){
        let orderToProcess = this.pendingOrders.pop() //need to check if it is undefined ?? maybe no need
        let newBot = new Bot()
        newBot.assignOrder(orderToProcess)
        this.botList.push(newBot)
        await newBot.processOrder()
        //append order into completedOrders afterwards
        this.completedOrders.unshift(orderToProcess)
        // check if undefined then null else normal
    }

    removeBot(){
        let removed = this.botList.pop() //remove latest bot added need to check undefined
        if (removed === undefined){
            return
        }
        let orderToReturn = removed.cancelOrder()
        if(orderToReturn === undefined){
            return 
        }else{
            this.pendingOrders.unshift(orderToReturn)
        }
    }

    newNormalOrder(){
        let normal = new Order(constants.NORMAL,this.orderNo)
        this.updateOrderNo()
        this.pendingOrders.push(normal)
    }
    
    newVIPOrder(){
        let vip = new Order(constants.VIP,this.orderNo)
        this.updateOrderNo()
        //search from start
        for(var i = 0; i < this.pendingOrders.length; i++){
            if (this.pendingOrders[i].priority < vip.priority){
                this.pendingOrders.splice(i,0,vip)
                break
            }
        }
        // insert based on priority
        // start from beginning, if the current index has lower prioity than his then splice(i)
    }

    main(){
        /**
         * Add Bot
         * Minus Bot
         * Add Normal Order
         * Add VIP Order
         * Add Bot
         * Minus Bot before one seconds (setTimeOut for 50ms?)
         * Check pendingOrders
         * Add Bot
         * Check completedOrders
         */
        this.addBot();
        console.log("#1Bots:",this.botList);
        this.removeBot();
        console.log("#2Bots:",this.botList);
        this.newNormalOrder();
        console.log("#3Pending:",this.pendingOrders);
        console.log("#3Length:",this.pendingOrders.length);
        this.newVIPOrder();
        console.log("#4Pending:",this.pendingOrders);
        this.addBot();
        console.log("#5Bots:",this.botList);
        console.log("#5Pending:",this.pendingOrders);
        console.log("#5Completed:",this.completedOrders);
        setTimeout(this.removeBot(),50);
        console.log("#6Bots:",this.botList);
        console.log("#6Pending:",this.pendingOrders);
        console.log("#6Completed:",this.completedOrders);
        this.addBot();
        console.log("#7Bots:",this.botList);
        console.log("#7Pending:",this.pendingOrders);
        console.log("#7Completed:",this.completedOrders);
    }
}


sys = new System();
sys.main();

//// Function to Show

// #1. processOrder and cancelOrder not sure will work or not
// #2. testing not done (npm install npm run dev then console.log)