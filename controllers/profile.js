

const handleProfile =  (req,res , db )=>{
    const {id} = req.params;
   
    
    db.select('*').from('users')
    .where({
        userid : id
    })
    .then(user => {
        if(user.length){
            res.json(user[0]);
        }else { 
            res.status(400).json('user not found !');
        }
    }).catch(err => res.status(400).json('error registering'));
       
    
}

module.exports ={
    handleProfile : handleProfile
}