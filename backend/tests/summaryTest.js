import needle from 'needle';

const BASE_URL = 'http://localhost:5000/user';

needle.get(`${BASE_URL}/admin/summary`, (err, res) => {
  if (err) {
    console.error('Error fetching summary:', err);
    process.exit(1);
  }
  if (res.statusCode !== 200) {
    console.error('Non-200 status:', res.statusCode, res.body);
    process.exit(1);
  }
  console.log('Summary response:', res.body);
});