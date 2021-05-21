const cors = require('cors');
const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch')

require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hola pepe')
})

app.post('/order', (req, res) => {
    console.log('todo correcto', req.body);
    console.log('todo correcto2', req.body.id);
    let formData = {
        order:{
            tags: "return"
        }
    }

    fetch(`https://andres-test-gradiweb.myshopify.com/admin/api/2021-04/orders/${req.body.id}.json`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": process.env.ACCESS
        },
        body: JSON.stringify(formData)
    }).then((response) => {
        console.log(response);
    })
    res.send('working')
})

app.get('/order/count', (req, res) => {

    fetch(`https://andres-test-gradiweb.myshopify.com/admin/api/2021-04/orders.json?tags='return'`, {
        method: 'GET',
        headers: {
            "X-Shopify-Access-Token": process.env.ACCESS
        }
    }).then((response) => {
        const data = response.json()
        return data
    }).then((response) => {
        
        let tags = response.orders.filter((item) => item.tags === "return")
        
        res.send({orders: tags.length})
    })
})

app.listen(port, () => {
    console.log('escuchando el puertos.');
})

