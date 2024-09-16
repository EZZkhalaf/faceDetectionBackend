const Clarifai = require('clarifai');


const PAT = 'd0de47e4b49249f0b5b79bbc768573d5';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const clarifaiApp = new Clarifai.App({
  apiKey: PAT
});

const handleImgURL = (req,res) =>{

    const { imgurl } = req.body;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imgurl
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT,
            'Content-Type': 'application/json'
        },
        body: raw
    };

    // Send request to Clarifai API
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // console.log('Received response:', result);
             
            // Check if the result contains the necessary data
            if (result.outputs && result.outputs[0].data && result.outputs[0].data.regions) {
                // Send the regions data back to the client
                res.json(result.outputs[0].data.regions);
            } else {
                // Send an error response if no regions are found
                res.status(400).json({ error: 'No regions found in the response.' });
            }
        })
        .catch(error => {
            // console.error('Error in detectFaces:', error);
            res.status(500).json({ error: 'An error occurred while processing the request.' });
        });
}


  
const handleImage =  (req,res , db)=>{
    const {id} = req.body;
    
    const nn=req.body.id;
    console.log('the passed id is ',nn);
    db('users')
    .select('*')
    .where({
        userid : id
     })
    //  .then(() => console.log('the user 1 ',id))
    .increment('entries' , 1)
    .returning('entries')
    
    
    .then(entries =>{
        // console.log(entries[0].entries) //  used for debugging 
        if (entries.length) {
             res.json(entries[0].entries);  // Send the updated 'entries' count
        } else {
            res.status(400).json('User not found'); //error from the db 
        }
    }).catch(err=>{
        res.status(400).json('error calculating entries'); 
    })
}

module .exports = {
    handleImage : handleImage,
    handleImgURL : handleImgURL
}