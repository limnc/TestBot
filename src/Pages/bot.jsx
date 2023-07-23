import { useState, useEffect } from "react"
import loading from "../Components/loading"
import Cookies from "js-cookie"
import { getDevices } from "../Repositories/deviceRepos"
import { getAccountByDevice } from "../Repositories/accountRepos"
import ImageComment from "./Actions/ImageComment"
import LikePost from "./Actions/likePost"
import Comment from "./Actions/comment"
const BOT = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [text, setText] = useState('')
    const [posts, setPosts] = useState([])
    const [action, setAction] = useState();
    const [selectedAgent, setSelectedAgent] = useState(Cookies.get('agentID'))
    const agentName = Cookies.get("agentName")
    const [devices, setDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState()
    const [selectedAccounts, setSelectedAccounts] = useState([])
    const [accounts, setAccounts] = useState([])
    const [renderForm, setRenderForm] = useState()
    

    /*
        1. Verify action chosen by user
        2. Render Form depends on action
            2.1 Read all the neccessory details like get the IP Address of devices and store in the variable / json
        3. Verify all input are filled
        4. Sent to server via Axios
        5. Return result

    */

    useEffect(() => {
        fetchDevices()
        setSelectedAccounts([])
        setSelectedDevice()
    }, [])

    const handleActionChange = (event) => {
        let actionValue = event.target.value
        setAction(actionValue)
    }

    const fetchDevices = async () => {
        const this_devices = await getDevices(selectedAgent)
        setDevices(this_devices)
    }

    const handleDeviceChange = (e) => {
        let device = e.target.value
        setSelectedDevice(device)

    }

    const getAccounts = async () => {
        setIsLoading(true)
        const accountList = await getAccountByDevice(selectedDevice)
        if (accountList) {
            setAccounts(accountList)
        } else {
            setAccounts([])
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }

    useEffect(() => {
        setAccounts([])
        setSelectedAccounts([])
        getAccounts()
    }, [selectedDevice])

    const handleSelectAccount = (e) => {
        let isChecked = e.target.checked
        let value = e.target.value
        if (isChecked) {

            setSelectedAccounts(account => [...account, value]);
            //console.log(selectedAccounts)
        }
        else {

            const accountList = selectedAccounts.filter((account) => account !== value)
            setSelectedAccounts(accountList)
        }
    }

    useEffect(() => {
        const data = {accounts:selectedAccounts,posts:posts}
        if (action === '1') {
            setRenderForm(<LikePost accounts={selectedAccounts} posts={posts}/>)
            //setRenderForm(<LikePost accounts={selectedAccounts}/>)
        }

        if(action==='2'){
            setRenderForm(<Comment data={data}/>)
        }

        if(action === '3'){
            setRenderForm(<ImageComment data={data} />)
        }
    }, [action, selectedAccounts,posts])

    const handlePostField = (e) =>{
        let textValues = e.target.value
        setText(textValues)
    }

    const wrappedPostLink = () =>{
        const lines = text.split('\n').filter(line => line.trim());
        setPosts(lines)
    }

    useEffect(()=>{
        wrappedPostLink()
    },[text])

   



    return (
        <main className="main" id="main">
            <div className="container-md">

                <div className="card">
                    <div className="card-header">
                        {agentName}
                    </div>
                    <div className="card-body">
                        <br />
                        {/**Filter Device */}
                        <div className="device-filter">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-2">
                                            <label htmlFor="#device">Device</label>
                                        </div>
                                        <div className="col-8">
                                            {
                                                <select name="deviceOption" id="deviceSelect" className="form-select" onChange={handleDeviceChange}>
                                                    <option value="">Select Devices</option>
                                                    {
                                                        devices && devices.map((device, index) => (
                                                            <option value={device.device_id} key={index}>{device.device_name}</option>
                                                        ))
                                                    }
                                                </select>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/** End Filter Device */}

                        <br />
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Account ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {   isLoading?<tr><td colSpan="4">{loading}</td></tr>:
                                    accounts.length > 0 ? accounts.map((account, index) => (
                                        <tr key={index + 1}>

                                            <td>{index + 1}</td>
                                            <td>{account.id}</td>
                                            <td>
                                                <input type="checkbox" id={account.id} value={account.id} className="form-input-check" onChange={handleSelectAccount} />
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="3">No Data </td></tr>
                                }
                            </tbody>


                        </table>


                    </div>
                </div>
                <br />

                {/** Action Card */}
                <div className="card">
                    <div className="card-header">Action</div>
                    <div className="card-body">
                        <br />
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-2">
                                        <label htmlFor="#type" className="form-label">Action</label>
                                    </div>
                                    <div className="col-10">
                                        <select name="" id="" className="form-select" value={action} onChange={handleActionChange}>
                                            <option value="">Choose Action</option>
                                            <option value="1">Like Post</option>
                                            <option value="2">Like & Reply Comment</option>
                                            <option value="3">Reply Comment with Image</option>
                                        </select>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-2">
                                        <label htmlFor="#post" className="form-label">Post Link(s)</label>
                                    </div>
                                    <div className="col-10">
                                        <textarea name="" id="post" cols="30" rows="10" className="form-control" onChange={handlePostField}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        {renderForm}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default BOT;
