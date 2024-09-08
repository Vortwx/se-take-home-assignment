// get order and complete
// 1. use the order parameter to assign
// 2. processOrder()
// 3. check if the order is undefined

function createOrder(containerSelector, orders){
    const container = document.querySelector(containerSelector);

    let textContainer = container.querySelector('.card-content');
    if (textContainer) {
        textContainer.innerHTML = '';
    } else {
        textContainer = document.createElement('div');
        textContainer.classList.add('card-content');
        container.appendChild(textContainer);
    }

    textContainer.innerHTML = orders.join('<br>');

}

async function botProcess(order, bot, completed){
    if(order === undefined){
        return
    }
    bot.assignOrder(order)
    await bot.processOrder()
    completed.unshift(order)
    createOrder('.service-card.card-right', completed);

}

export {botProcess}
