import { Order } from './order.js';
import { Bot } from './bot.js';        
import { VIP, NORMAL } from './constants.js';
import { botProcess, updateOrderView} from './util.js';

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

    addBot(){
        this.botList.push(new Bot())
    }

    removeBot(){
        let removed = this.botList.pop() //remove latest bot added need to check undefined
        if(!removed) return;

        let orderToReturn = removed.cancelOrder()
        if(!orderToReturn) return;

        this.pendingOrders.unshift(orderToReturn)
    }

    newNormalOrder(){
        let normal = new Order(NORMAL,this.orderNo)
        this.updateOrderNo()
        this.pendingOrders.push(normal)
    }
    
    newVIPOrder(){
        let vip = new Order(VIP,this.orderNo)
        let end = false
        this.updateOrderNo()
        //search from start of the array (since it is queue)
        for(var i = 0; i < this.pendingOrders.length; i++){
            if (this.pendingOrders[i].priority < vip.priority){
                this.pendingOrders.splice(i,0,vip)
                end=true
                break
            }
        }
        // fallback when there is no normal
        if(!end){
            this.pendingOrders.push(vip)
        }
        console.log("HELLO")
    }

    updateView(){
        updateOrderView('pendingOrders', this.pendingOrders);
        updateOrderView('completedOrders', this.completedOrders);
    }

    // test(){
    //     /**
    //      * Add Bot
    //      * Minus Bot
    //      * Add Normal Order
    //      * Add VIP Order
    //      * Add Bot
    //      * Minus Bot before one seconds (setTimeOut for 50ms?)
    //      * Check pendingOrders
    //      * Add Bot
    //      * Check completedOrders
    //      */
    //     this.addBot();
    //     console.log("#1Bots:",this.botList);
    //     console.log("#1Completed:",this.completedOrders);
    //     this.removeBot();
    //     console.log("#2Bots:",this.botList);
    //     this.newNormalOrder();
    //     console.log("#3Pending:",this.pendingOrders);
    //     console.log("#3Length:",this.pendingOrders.length);
    //     this.newVIPOrder();
    //     console.log("#4Pending:",this.pendingOrders);
    //     this.addBot();
    //     console.log("#5Bots:",this.botList);
    //     console.log("#5Pending:",this.pendingOrders);
    //     console.log("#5Completed:",this.completedOrders);
    //     setTimeout(() => this.removeBot(),50);
    //     console.log("#6Bots:",this.botList);
    //     console.log("#6Pending:",this.pendingOrders);
    //     console.log("#6Completed:",this.completedOrders);
    //     this.addBot();
    //     console.log("#7Bots:",this.botList);
    //     console.log("#7Pending:",this.pendingOrders);
    //     console.log("#7Completed:",this.completedOrders);
    // }

    main(){
        setInterval(()=>this.tick(),500)
        // this.test()
    }

    async tick(){
        // update the content per tick
        this.updateView()

        for(let i = this.botList.length-1; i >= 0; i--){
            if(this.botList[i].isIdle()){
                //check if there is a job available
                let orderToProcess = this.pendingOrders.shift()
                if(!orderToProcess) continue;

                //this.updateView()
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