import needle from 'needle';

const BASE_URL = 'http://localhost:5000/user';

// Test user registration
const newUser = {
  firstName: 'Nevi',
  lastName: 'Bulatao',
  email: 'ntbulatao@up.edu.ph',
  password: 'Nevi6381!'
};

needle.post(`${BASE_URL}/register`, newUser, { json: true }, (err, res) => {
  if (err) return console.error('Error registering user:', err);
  console.log('POST /user/register:', res.body);

  // Test login after registration
  const loginData = {
    email: newUser.email,
    password: newUser.password
  };

  needle.post(`${BASE_URL}/login`, loginData, { json: true }, (err, res) => {
    if (err) return console.error('Error logging in:', err);
    console.log('POST /user/login:', res.body);

    // Test get all users
    needle.get(`${BASE_URL}/`, (err, res) => {
      if (err) return console.error('Error fetching users:', err);
      console.log('GET /user:', res.body);

      // Test get user by id (using the first user's _id)
      const firstUser = Array.isArray(res.body) ? res.body[0] : null;
      if (firstUser && firstUser._id) {
        needle.get(`${BASE_URL}/${firstUser._id}`, (err, res) => {
          if (err) return console.error('Error fetching user by id:', err);
          console.log(`GET /user/${firstUser._id}:`, res.body);
          setTimeout(() => process.exit(), 500); // Exit after all tests
        });
      } else {
        setTimeout(() => process.exit(), 500);
      }
    });
  });
});