import needle from 'needle';

const BASE_URL = 'http://localhost:5000/user-transaction/order';
const VALID_PRODUCT_ID = '6835bae6be611a405d77b6f1';
const TEST_EMAIL = 'nbulatao9@gmail.com';

// 1. Test successful order
needle.post(BASE_URL, {
  productId: VALID_PRODUCT_ID,
  orderQuantity: 1,
  email: TEST_EMAIL,
}, { json: true }, (err, res) => {
  if (err) return console.error('Error placing order:', err);
  console.log('POST /order (success):', res.body);

  // 2. Test insufficient quantity (assuming 9999 is more than stock)
  needle.post(BASE_URL, {
    productId: VALID_PRODUCT_ID,
    orderQuantity: 9999,
    email: TEST_EMAIL,
  }, { json: true }, (err, res) => {
    if (err) return console.error('Error placing order (insufficient):', err);
    console.log('POST /order (insufficient quantity):', res.body);

    // 3. Test invalid product ID
    needle.post(BASE_URL, {
      productId: '000000000000000000000000',
      orderQuantity: 1,
      email: TEST_EMAIL,
    }, { json: true }, (err, res) => {
      if (err) return console.error('Error placing order (invalid product):', err);
      console.log('POST /order (invalid product):', res.body);

      setTimeout(() => process.exit(), 500); // Exit after all tests
    });
  });
});