import {collection, addDoc, getDocs,updateDoc,deleteDoc, getDoc,doc,setDoc} from "firebase/firestore"
import database from "../firebase"

const agencyCollectionRef = collection(database,'Agency')
const generateAgencyId = () => {
    // Implement your logic to generate a unique agency_id
    // You can use a library or custom logic to generate the ID
    // For example, you can use a combination of timestamp and random number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const agencyId = `AG${timestamp}${randomNum}`;
    return agencyId;
  };
export const getAllAgents = async () => {
  try {
    const querySnapshot = await getDocs(agencyCollectionRef);
    const agents = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return agents;
  } catch (error) {
    // Handle error
    console.error('Error getting agents:', error);
    throw error;
  }
};

export const createAgency = async(data) =>{
    const agencyId = generateAgencyId();
    const newData = {...data,id:agencyId}
    try{
        // const newAgent = await database.collection('Agency').doc(data.name)
        // return newAgent.setDoc(data)
        
        await setDoc(doc(agencyCollectionRef,agencyId),newData)
    }catch(error){
        console.log(error)
    }
}

export const deleteAgency = async(agentID) =>{
    try{
        await deleteDoc(doc(agencyCollectionRef,agentID))
        return true
    }catch(error){}
}

export const getAgent = async(agentID) =>{
    try{
        const agent = await getDoc(doc(agencyCollectionRef,agentID))
        if(agent.exists()){
           
            return {id:agent.id,...agent.data()}
        }
    }
    catch(error){
    
    }
}

export const updateAgent = async(id,data)=>{

    try{
        const agent = doc(database,"Agency",id)
        await updateDoc(agent,data)
        return true
    }catch(error){
    
    }
}

export const getPassword = async(agentID)=>{
    try{
        const agencyRef = doc(agencyCollectionRef,agentID)
        const agent = await getDoc(agencyRef)
        if(agent.exists()){
            return agent.data().password
        }
    }
    catch(error){
    
    }
}
