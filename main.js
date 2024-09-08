import { Order } from './order.js';
import { Bot } from './bot.js';        
import { VIP, NORMAL } from './constants.js';
import { botProcess } from './util.js';


/**
 * class State
 * main(){
 * setInterval(()=>checkUpdate(),500)
 * }
 */

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
        let orderToProcess = this.pendingOrders.shift() //need to check if it is undefined ?? maybe no need
        createOrder('.service-card.card-left', this.pendingOrders);
        let len = this.botList.push(new Bot())
        await botProcess(orderToProcess, this.botList[len-1], this.completedOrders)
    }

    removeBot(){
        let removed = this.botList.pop() //remove latest bot added need to check undefined
        if(!removed) return;

        let orderToReturn = removed.cancelOrder()
        if(!orderToReturn) return;

        this.pendingOrders.unshift(orderToReturn)
        createOrder('.service-card.card-left', this.pendingOrders);
    }

    newNormalOrder(){
        let normal = new Order(NORMAL,this.orderNo)
        this.updateOrderNo()
        this.pendingOrders.push(normal)
        createOrder('.service-card.card-left', this.pendingOrders);
    }
    
    newVIPOrder(){
        let vip = new Order(VIP,this.orderNo)
        this.updateOrderNo()
        //search from start
        for(var i = 0; i < this.pendingOrders.length; i++){
            if (this.pendingOrders[i].priority < vip.priority){
                this.pendingOrders.splice(i,0,vip)
                createOrder('.service-card.card-left', this.pendingOrders);
                break
            }
        }
        // insert based on priority
        // start from beginning, if the current index has lower prioity than his then splice(i)
    }

    test(){
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
        console.log("#1Completed:",this.completedOrders);
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
        setTimeout(() => this.removeBot(),50);
        console.log("#6Bots:",this.botList);
        console.log("#6Pending:",this.pendingOrders);
        console.log("#6Completed:",this.completedOrders);
        this.addBot();
        console.log("#7Bots:",this.botList);
        console.log("#7Pending:",this.pendingOrders);
        console.log("#7Completed:",this.completedOrders);
    }

    main(){
        setInterval(()=>this.tick(),500)
    }

    async tick(){
        // check if bot can get assigned to a new job
        for(let i = (this.botList.length-1); i >= 0; i--){
            if(this.botList[i].isIdle()){
                //check if there is a job available
                let orderToProcess = this.pendingOrders.shift()
                if(!orderToProcess) return;
                createOrder('.service-card.card-left', this.pendingOrders);
                await botProcess(orderToProcess,this.botList[i],this.completedOrders); // should I put await here
            }
        }
    }
}


let sys = new System();
document.getElementById('normal-order').addEventListener('click', () => {
    sys.newNormalOrder();
});

document.getElementById('vip-order').addEventListener('click', () => {
    sys.newVIPOrder();
});

document.getElementById('add-bot').addEventListener('click', () => {
    sys.addBot();
});

document.getElementById('remove-bot').addEventListener('click', () => {
    sys.removeBot();
});

sys.main();

//// Function to Show

// #1. processOrder and cancelOrder not sure will work or not
// #2. testing not done (npm install npm run dev then console.log)