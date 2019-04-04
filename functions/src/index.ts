import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

const REQUEST_DATA_REF = "/REQUEST_DB"


  export const omRequestCreate = functions.firestore.document(REQUEST_DATA_REF+'/{pushId}/newValue').onCreate((snapshot, context) => {
   
    console.log('Push notification event triggered');
   
   
    const newValue = snapshot.data

    console.log('Data'+newValue)
    

    const payload = {        
        notification:{            
                organization: "Location Monitor",            
                bloodgroup: "Your motorcycle has moved",            
                icon: "default",            
                sound: "default"
            }
        };
    
        const options = {        
                priority: "high",
                timeToLive: 60 * 60 * 24
        };
    
        return admin.messaging().sendToTopic("M1G", payload, options)

  });

  

