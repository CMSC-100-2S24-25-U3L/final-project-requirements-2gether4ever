import needle from 'needle';

const BASE_URL = 'http://localhost:5000/user-transaction';

// Test: Get all user transactions
needle.get(BASE_URL, (err, res) => {
  if (err) {
    console.error('Error fetching user transactions:', err);
    process.exit(1);
  }
  if (res.statusCode !== 200) {
    console.error('Non-200 status:', res.statusCode, res.body);
    process.exit(1);
  }
  console.log('User transactions response:', res.body);
});