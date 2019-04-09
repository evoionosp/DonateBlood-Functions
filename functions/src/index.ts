import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

const REQUEST_DATA_REF = "/REQUEST_DB"
const BGArray = ["UNKNOWN","A+","A-","B+","B-","O+","O-","AB+","AB-","RARE TYPE"]


  exports.sendNotification = functions.firestore.document(REQUEST_DATA_REF+'/{pushId}').onCreate((snapshot, context) => {
   
    console.log('Push notification event triggered');
   
   
    const orgName: String = snapshot.get('orgName')
    const orgPostalCode: String = snapshot.get('orgPostalCode').string
    const bloodGroup: String = BGArray[snapshot.get('bloodGroup')]
    const units: String = ""+snapshot.get('units')
    const requestID: String = snapshot.get("requestID")
    

    console.log('Data: '+orgName+", "+orgPostalCode+", "+bloodGroup+", "+units+", "+context.params.pushId.toString()+", "+requestID.toString())
    

    const payload = {        
        notification:{            
                organization: orgName.toString(),            
                bloodgroup: bloodGroup.toString(),
                request_id: context.params.pushId.toString(),            
                icon: "default",            
                sound: "default"
            }
        };
    
        const options = {        
                priority: "high",
                timeToLive: 60 * 60 * 24
        };
    
        return admin.messaging().sendToTopic('BG_'+snapshot.get('bloodGroup'), payload, options)

  });

  

