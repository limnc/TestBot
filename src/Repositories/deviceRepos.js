import { collection, addDoc, getDocs, updateDoc, deleteDoc, getDoc, doc, setDoc } from "firebase/firestore"
import database from "../firebase"
import { useState } from "react";

function generateID() {
    const currentTime = Date.now().toString();
    return 'PC' + currentTime;
}


const agencyRef = (agencyID) => {
    return doc(database, 'Agency', agencyID)

}

export const createDevice = async (agencyID, deviceData) => {
    try {
        const agencyRef = doc(database, 'Agency', agencyID)
        const deviceCollectionRef = collection(agencyRef, 'devices')
        const deviceID = generateID()
        const newData = { ...deviceData, device_id: deviceID }
        await setDoc(doc(deviceCollectionRef, deviceID), newData)
        return true
    }
    catch (error) {
        console.log(error)
    }
}

export const retrieveDevice = async (agencyID, deviceID) => {
    try {
        const deviceRef = doc(collection(database, 'Agency', agencyID, 'devices'), deviceID)
        const deviceDoc = await getDoc(deviceRef)

        if (deviceDoc.exists()) {
            const deviceData = deviceDoc.data();
            return { id: deviceDoc.id, ...deviceData }
        }
        else {
            throw new Error("Device not found")
        }

        // const deviceRef = doc(database, 'agency', agencyID, 'devices', deviceID);
        // const deviceSnapshot = await getDoc(deviceRef);

        // if (deviceSnapshot.exists()) {
        //     const deviceData = deviceSnapshot.data();
        //     return {id:deviceData.device_id,...deviceData};
        // } else {
        //     throw new Error('Device not found');
        // }

    } catch (error) {
        console.log(error)
    }
}

export const getDevices = async (agencyID) => {
    try {

        const agencyRef = doc(database, 'Agency', agencyID)
        const deviceCollectionRef = collection(agencyRef, 'devices')
        const devices = await getDocs(deviceCollectionRef)
        const deviceArray = []
        devices.forEach((d) => {
            
            deviceArray.push({
               id:d.id,
                ...d.data(),
            });
        })
        return deviceArray;


    } catch (error) {
        console.log(error);
    }
};

export const updateDevice = async(deviceData) =>{
    try{
        const deviceRef = doc(database,'Agency',deviceData.agencyID,'devices',deviceData.device_id)
        await setDoc(deviceRef,deviceData)
        return true
      
        
    }
    catch(error){
        console.log(error)
    }

}

export const deleteDevice = async(agentID,deviceID) =>{
    try{
        await deleteDoc(doc(database,'Agency',agentID,'devices',deviceID))
        return true
    }catch(error){
        console.log(error)
    }

}
