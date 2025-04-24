const bcrypt = require('bcryptjs');

(async () => {
    const password = 'admin123'; // or 'user123' depending on what you're testing
    const hash = '$2a$10$A9nF9O6dNnzmAf3HjZJ5U.yosTtXfLOa1Hn7fv9KQgAGuZzvlnQ7i'; // replace with your hashed password

    const isMatch = await bcrypt.compare(password, hash);
    console.log('Password match:', isMatch);
})();
