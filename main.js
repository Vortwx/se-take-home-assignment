var pendingOrders = []
var completedOrders = []
var botList = []
var orderNo = pendingOrders.length + completedOrders.length + 1

function addBot(){
    orderToProcess = pendingOrders.pop()
    newBot = new bot()
    newBot.assignOrder(orderToProcess)
    botList.push(newBot)
    newBot.processOrder()
    //append order into completedOrders afterwards
    completedOrders.unshift(orderToProcess)
    // check if undefined then null else normal
}

function removeBot(){
    removed = botList.pop() //remove latest bot added
    removed.cancelOrder()
}

function newNormalOrder(){
    normal = new order(NORMAL,orderNo)
    pendingOrders.push(normal)
}

function newVIPOrder(){
    vip = new order(VIP,orderNo)

    //search from start
    for(var i = 0; i < pendingOrders.length; i++){
        if (pendingOrders[i].priority < vip.priority){
            pendingOrders.splice(i,0,vip)
            break
        }
    }
    // insert based on priority
    // start from beginning, if the current index has lower prioity than his then splice(i)
}


//// Function to Show

// #1. processOrder and cancelOrder not sure will work or not
// #2. testing not done (npm install npm run dev then console.log)