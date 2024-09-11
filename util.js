// get order and complete
// 1. use the order parameter to assign
// 2. processOrder()
// 3. check if the order is undefined
import {Order} from './order.js'

function updateOrderView(id, orders){
    let displayList = document.getElementById(id)

    displayList.innerHTML = orders.map(order =>
        order.toString()
      ).join('<br>');

    // let textContainer = container.querySelector('.card-content');
    // if (textContainer) {
    //     textContainer.innerHTML = '';
    // } else {
    //     textContainer = document.createElement('div');
    //     textContainer.classList.add('card-content');
    //     container.appendChild(textContainer);
    // }
    // textContainer.innerHTML = orders.join('<br>');

}

async function botProcess(order, bot, completed){
    if(!order) return;
    bot.assignOrder(order)
    await bot.processOrder()
    completed.unshift(order)
    updateOrderView('completedOrders', completed)
}

export {botProcess, updateOrderView}
