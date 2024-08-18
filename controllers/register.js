
const handleRegister =  (db , bcrypt) => (req,res) => {//bcrypt and db used first then (req,res)
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission');
    }

   
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    db.transaction(trx => {
        // Check if the email already exists in the login table
        trx('login')
            .where({ loginemail: email })
            .first()
            .then(existingLogin => {
                if (existingLogin) {
                    throw new Error('Email already registered'); // Email already exists in the login table
                }

                // Insert new login record
                return trx('login')
                    .insert({
                        hash: hash,
                        loginemail: email
                    })
                    .returning('loginemail');
            })
            .then(loginEmailArray => {
                const loginemail = loginEmailArray[0].loginemail; // This will return the email string
                console.log('Inserted login email:', loginemail); // Debugging log

                // Insert new user record
                return trx('users')
                    .returning('*')
                    .insert({
                        useremail: loginemail,
                        username: name,
                        joined: new Date(),
                    });
            })
            .then(userArray => {
                const user = userArray[0];
                console.log('Inserted user:', user); // Debugging log

                // Return user data excluding password hash
                res.json({
                    id: user.id,
                    email: user.useremail,
                    name: user.username,
                    entries: user.entries,
                    joined: user.joined
                });

                return trx.commit(); // Commit the transaction
            })
            .catch(err => {
                console.error('Transaction Error:', err.message); // Log detailed error
                return trx.rollback(); // Rollback the transaction on error
            });
    })
    .catch(err => {
        console.error('Database Error:', err.message); // Log detailed error
        res.status(400).json('unable to register'); // Respond with error message
    });
}

module.exports = {
    handleRegister : handleRegister
};