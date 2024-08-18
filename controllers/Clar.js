import Clarifai from 'clarifai';



const PAT = 'd0de47e4b49249f0b5b79bbc768573d5';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const clarifaiApp = new Clarifai.App({
  apiKey: PAT
});

// Function to predict faces in the provided image URL
export const predictFaces = (imgurl) => {
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
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

//   console.log('Sending request with image URL:', imgurl);

  return fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log('Received response:', result);
    if (result.outputs && result.outputs[0].data && result.outputs[0].data.regions) {
        console.log( result.outputs[0].data.regions);
        return result.outputs[0].data.regions; // Return all regions
        
    
    } else {
      throw new Error('No regions found in the response.');
    }
  })
  .catch(error => {
    console.error('Error in predictFaces:', error);
    throw error;
  });
};


