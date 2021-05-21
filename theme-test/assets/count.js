const getCountOrders = () => {
    return fetch('https://test-gradiweb-practice.herokuapp.com/order/count')
    .then((res) => {
        return res.json()
    }).then((res) => { 
        return res
    })
}

(async () => {
    let count = document.getElementById('count')

    let getCount = await getCountOrders()

    count.innerHTML = getCount.orders;

})()