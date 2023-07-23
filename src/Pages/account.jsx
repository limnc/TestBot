import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "../Components/form";
import Modal from "../Components/modal";
import loading from "../Components/loading";
import { getDevices } from "../Repositories/deviceRepos";
import { getAccountByDevice, createAcc, updateAcc, deleteAcc, retrieveAcc } from "../Repositories/accountRepos";
import Alert from "../Components/alert";
const Account = () => {

    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const agency = Cookies.get("agentID")
    const agencyName = Cookies.get("agentName");
    const [accountsList, setAccountList] = useState([])
    const [accountData, setAccountData] = useState()
    const [deviceList, setDeviceList] = useState([])
    const [selectedDevice, setSelectedDevice] = useState([])

    const [accountDetail,setAccountDetail] = useState([])

    
    const displayLoading = () => {
        setisLoading(true)
        setTimeout(() => {
            setisLoading(false)
        }, 2000);
    }
    useEffect(() => {
        displayLoading()
        setAccountList([])
    }, [selectedDevice])
    const fetchDevices = async () => {
        try {
            let data = await getDevices(agency)
            if (data) {
                setDeviceList(data)
            }
            else {
                setDeviceList([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Fetch All Devices in initial
    useEffect(() => {
        fetchDevices()
    }, [])

    const handleDeviceChange = (e) => {
        let selected = e.target.value
        setSelectedDevice(selected)
    }

    const fetchAccountList = async () => {
        try {
            let accounts = await getAccountByDevice(selectedDevice)
            if (accounts) {
                setAccountList(accounts)
            }
            else {
                setAccountList([])
            }

        } catch (error) {
        }
    }

    useEffect(() => {
        fetchAccountList()
    }, [selectedDevice])

    // CRUD

    const addAccount = async (accountData) => {
        let newData = Object.assign({}, accountData, { agency: agency })
        try {
            let newAccount = await createAcc(newData)
            if (newAccount) {
                setMessage("New Account has been created")
                setShowAlert(true)
                fetchAccountList()
            }

        }
        catch (error) { }
    }

    const deleteAccount = async (id) => {
     
  
        try {
            const deleteAction = await deleteAcc(id)
            if (deleteAction) {
                setMessage("Account has been deleted")
                setShowAlert(true)
                fetchAccountList()
            }
        } catch (error) {
            console.log(error)
        }

    }

    const fetchAccount = async(id)=>{
       let thisAccount = await retrieveAcc(id)
       if (thisAccount){
            setAccountData(thisAccount)
           
        }
    }

    useEffect(()=>{
        console.log(accountData)
    },[accountData])

    const editAccount = async(data)=>{
        if(data){
            try{
                let update = await updateAcc(data)
                if(update){
                    setMessage("Account updated")
                    setShowAlert(true)
                    fetchAccountList()

                }
            }catch(error){}
        
        }
    }

    const formData = [
        { name: 'id', type: 'text', label: 'Facebook ID', id: 'facebook-id' },
        { name: 'password', type: 'password', label: 'Password', id: 'facebook-pass' },
        { name: 'otp', type: 'text', label: 'One-Time Password', id: 'fb-otp' },
        {
            name: 'device_id', type: 'select', label: 'Run On Device', id: 'fb-device_id',
            options: deviceList.map((device) => ({
                value: device.device_id,
                label: device.device_name

            }))

        }


    ]



    return (
        <main className="main" id="main">
            <div className="container-md">
                {/** Modal Place Here */}
                <Modal title={"Add Account (" + agencyName + ")"} modalID="addAccountModal" content={<Form formFields={formData} onSubmit={addAccount} />} data="" />
                <Modal title={"Edit Account (" + agencyName + ")"} modalID="editAccountModal" content={<Form formFields={formData} onSubmit={editAccount} data={accountData}/>} />
                {/** End Modal Place Here */}
                <div className="card">
                    <div className="card-header">Account Management</div>
                    <div className="card-body">
                        <br />
                        {/**Alert */}
                        {showAlert && <Alert status="success" message={message} display="true" />}
                        {/** EndAlert */}

                        <div className="text-end">
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addAccountModal">
                                <i className="bi bi-plus-circle"></i> Account
                            </button>
                        </div>
                        <br />
                        <br />
                        {/**filter */}
                        <div className="filter">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="device" className="form-label">Select Device</label>
                                        </div>
                                        <div className="col-8">
                                            <select name="device" id="device" className="form-select" onChange={handleDeviceChange}>
                                                <option value="">Please Select</option>
                                                {
                                                    deviceList && deviceList.map((device, index) => (
                                                        <option value={device.device_id} key={index}>{device.device_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/** End filter */}
                        <br />
                        <br />

                        <table className="table table-borderless">
                            <thead className="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Account ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    isLoading ? <tr><td colSpan="3">{loading}</td></tr> :
                                        accountsList.length > 0 ?
                                            accountsList.map((account, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{account.id}</td>
                                                    <td>
                                                        <button className="btn btn-sm" title="Edit Account" onClick={()=>fetchAccount(account.id)} data-bs-toggle="modal" data-bs-target="#editAccountModal" ><i className="bi bi-sliders"></i>&emsp;Edit</button>
                                                        &emsp;
                                                        <button title="Delete Account" className="btn btn-sm" onClick={()=>deleteAccount(account.id)}><i className="bi bi-trash text-danger" ></i>&emsp;Delete</button>
                                                        &emsp;
                                                        {/* <button className="collapse" title="Edit Account" data-bs-toggle="modal" data-bs-target="#editAccountModal" id={account.id}  ><i className="bi bi-sliders"></i>&emsp;Edit</button> */}
                                                        
                                                    </td>
                                                </tr>
                                            )) : <tr><td colSpan="3"><p className="text-danger">No Accounts Found</p></td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Account