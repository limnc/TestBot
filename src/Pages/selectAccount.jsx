import {useState,useEffect} from "react"
import { getAccountByDevice } from "../Repositories/accountRepos"

const AccountList = ({device,selectedAccountChangeHandling}) =>{
    const [accounts,setAccounts] = useState([])
    const [errors,setErrors] = useState([])
    const [message,setMessage] = useState([])
    const [selectedAccounts,setSelectedAccounts] = useState([])
    const [renderAccounts,setRenderAccounts] = useState()

    const filterAccount = async()=>{
        try{
            const getAccounts = await getAccountByDevice(device)
            if(getAccounts){
                setAccounts(getAccounts)
            }
            //setAccounts(getAccount)
        }catch(error){}

    }

    // updateState by effect when device changed
    useEffect(()=>{
        filterAccount()
        setSelectedAccounts([])
    },[device])

    const handleAccountSelect = (accountID) =>(event)=>{
        const isChecked = event.target.checked
       
        if(isChecked){
        
             const updateSelectedAcc = [...selectedAccounts,{account_id:accountID}];
             setSelectedAccounts(updateSelectedAcc)
        }else{
        
            const updateSelectedAcc = selectedAccounts.filter(
                (account)=>account.account_id !== accountID
            );
            setSelectedAccounts(updateSelectedAcc)
            
        }
        
        
    };

    useEffect(()=>{
        selectedAccountChangeHandling(selectedAccounts)
      
    },[selectedAccounts])

    //render

    return (
        <div className="account-list">
            {
            errors.length !== 0 &&
            <div className="alert-div">

                <div className="alert alert-danger">{message}</div>
            </div>
            }

            <div className="row">

                <div className="col-12">

                    <div className="table table-hovered">
                        <thead>
                            <tr>
                                <th>
                                    Select Account(s)
                                </th>
                               
                                <th>Account ID</th>
                            </tr>


                        </thead>

                        <tbody>
                            {
                                accounts.map((account,index)=>(
                                    <tr key={index}>
                                       <td>
                                            <input className="form-check-input acc-checkbox" type="checkbox" onChange={handleAccountSelect(account.account_id)} />
                                        </td>
                                       
                                        <td>
                                            {account.account_id}
                                        </td>

                                    </tr>    
                                ))
                            }
                        </tbody>
                    </div>
                </div>
            </div>
        </div>    
        
    )

}

export default AccountList