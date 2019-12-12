const express = require('express');
const router = express.Router();

/* GET users listing. */
idcounter = 0;
products = [
    { id: idcounter++, name: '2020 Chevrolet Camaro', price: 35000 },
    { id: idcounter++, name: '2020 Porsche 911', price: 125000 },
    { id: idcounter++, name: '2020 Audi R8', price: 190000 },
    { id: idcounter++, name: '2020 Mercedes-Benz E-Class', price: 63000 },
]

orders = []

router.get('/', function (req, res, next) {
    res.status(200).json(orders);
});

router.get('/:id', function (req, res, next) {
    const response = orders.find(c => c.id === parseInt(req.params.id));
    if (!response) return res.status(404).send("Couldn't find the order");
    res.status(200).json(response);
});

router.get('/:id/products', function (req, res, next) {
    const response = orders.find(c => c.id === parseInt(req.params.id));
    if (!response) return res.status(404).send("Couldn't find the order");
    res.status(200).json(response.products);
});

router.get('/:id/products/:id2', function (req, res, next) {
    const response = orders.find(c => c.id === parseInt(req.params.id));
    if (!response) return res.status(404).send("Couldn't find the order");
    const specific = response.products.find(c => c.id === parseInt(req.params.id2))
    if (!specific) return res.status(404).send('Could not find product ID');
    res.status(200).json(specific);
});

router.post('/', function (req, res, next) {
    const today = new Date();
    const products_sent = JSON.parse((req.body.products));
    let products_sum = calSum(products_sent);
    if (!products_sum) return res.status(404).send('One or more products could not be found.');
    const extracted = extractProducts(req.body);
    if (!extracted) return res.status(404).send('Something went wrong with the products provided');
    const new_order = {
        id: today.getTime(),
        date: (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear(),
        sum: products_sum,
        products: extracted,
    }
    orders.push(new_order);
    res.status(201).send('Added order');
});

calSum = (items) => {
    let price = 0;
    items.forEach((element, index) => {
        const product = products.find(c => c.id === parseInt(element));
        product ? price += product.price : price = undefined;
    });
    return price;
}

extractProducts = (items) => {
    items = JSON.parse((items.products))
    let products_arr = [];
    items.forEach((element, index) => {
        const product = products.find(c => c.id === parseInt(element));
        product ? products_arr.push(product) : products_arr = undefined;
    });
    return products_arr
}


module.exports = router;
