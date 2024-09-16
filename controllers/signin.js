

  

const handleSignin =  (req, res ,db , bcrypt) => {
    const { email, password } = req.body;
    if ( !email || !password ){
        return res.status(400).json('wrong inputs ');
    }
    // Check login table for email and hash
    db.select('loginemail', 'hash')
        .from('login')
        .where({ loginemail: email })
        .then(data => {
            // Check if user was found
            if (data.length === 0) {
                return res.status(400).json('Wrong email or password');
            }

            // Compare provided password with stored hash
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                // Fetch user details
                db.select('*')
                    .from('users')
                    .where({ useremail: email })
                    .then(user => {
                        if (user.length) {
                            res.json(user[0]); // Return user details



                           



                        } else {
                            res.status(400).json('User not found');
                        }
                    })
                    .catch(err => res.status(400).json('Error retrieving user'));
            } else {
                res.status(400).json('Wrong email or password');
            }
        })
        .catch(err => res.status(400).json('Error checking credentials'));
}

module.exports = {
    handleSignin : handleSignin
}