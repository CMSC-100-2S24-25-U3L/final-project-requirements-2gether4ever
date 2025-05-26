import needle from 'needle';

// Base URL of your backend
const BASE_URL = 'http://localhost:3000/product';

// Example: Get all products
// needle.get(`${BASE_URL}/list`, (err, res) => {
//   if (err) return console.error('Error fetching products:', err);
//   console.log('GET /product/list:', res.body);
// });

// Example: Add a new product
// const newProduct = {
//   id: 'P001',
//   name: 'Sample Crop',
//   description: 'Fresh crop',
//   type: 1, // 1 = Crop
//   quantity: 100,
//   price: 50
// };

// needle.post(`${BASE_URL}/add`, newProduct, { json: true }, (err, res) => {
//   if (err) return console.error('Error adding product:', err);
//   console.log('POST /product/add:', res.body);
// });

// Example: Update product inventory
const updateQuantity = { quantity: 10 };
needle.put(`${BASE_URL}/inventory/P001`, updateQuantity, { json: true }, (err, res) => {
  if (err) return console.error('Error updating inventory:', err);
  console.log('PUT /product/inventory/P001:', res.body);
});