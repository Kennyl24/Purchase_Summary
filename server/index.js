const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/../client/dist'));
app.use('/shoppingcart', express.static(__dirname + '/../client/dist'));
app.listen(3000, function() {
  console.log('listening on port 3000!');
});

const test = [ 
  {
    chairName: 'Essentials by OFM ESS-3085 Racing Style Leather Gaming Chair, Red', 
    quantity: '1',
    price: '102.96', 
    chairImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPmNJp8Eh_QjEj-CHXhpe645VDZBpDJH8-R_rW7-0nCNal9Jx',
  },
]; 

app.post('/shoppingcart', (req, res) => {
  if (test.length > 0) {
    res.send({ shoppingcart: test });
  }
});