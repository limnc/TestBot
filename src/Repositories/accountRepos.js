import { collection, addDoc, getDocs, updateDoc, deleteDoc, getDoc, doc, setDoc, query,where} from "firebase/firestore"
import database from "../firebase"

//declared collection
const accountCollectionRef = collection(database, 'Accounts')
export const getAllAcc = async () => {
    try {
        const data = await getDocs(accountCollectionRef);
        const account = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(account)
        return account
    } catch (error) {
        console.log(error)
    }

}

export const retrieveAcc = async (accountID) => {
    try {
        const accountRef = doc(accountCollectionRef, accountID)
        const accountDoc = await getDoc(accountRef)
        if (accountDoc.exists()) {
            const account = accountDoc.data()
            const accountObj = {
                id:account.id,
                otp:account.otp,
                password:account.password,
                device_id:account.device_id
            }
            //console.log(account)
            //return account
            return { id: accountDoc.id, ...account };
        }
    } catch (error) {
        throw new Error("Failed to retrieve account")
    }
}

export const createAcc = async (accountData) => {
    try {
        const accountRef = doc(accountCollectionRef, accountData.id)
        await setDoc(accountRef, accountData)
        return true
    } catch (error) {
        console.log(error)
    }
}

export const updateAcc = async (accountData) => {
    try{
        const accountRef = doc(accountCollectionRef,accountData.id)
        await setDoc(accountRef,accountData)
        return true
    }catch(error){
    
    }
}

export const deleteAcc = async (accountID) => {
    try{
       await deleteDoc(doc(accountCollectionRef,accountID))
       return true
    }catch(error){
        console.log(error)
    }

}

export const getAccountByDevice = async (deviceID) => {
    const accountList = []
    try {
        //use Query to look for which account has the device_id match with deviceID
        const account_query = query(collection(database,"Accounts"),where("device_id","==",deviceID));
        const snapshot = await getDocs(account_query)
   
        if (snapshot.size> 0){
            snapshot.forEach((doc)=>{
               // console.log(doc.id, " => ", doc.data()['name']);
                accountList.push({id:doc.id,account_id:doc.data().id})
                
            })
            return accountList
            // accountList.forEach((acc)=>{
            //     console.log(acc.account_id)
            // })
        }
        else{
            return []
            console.log("No account found")
        }

    } catch (error) {
        console.log(error)
    }
}



