import { useState, useEffect } from "react"
import Form from "../Components/form"
import Modal from "../Components/modal"
import axios from "axios"
import loading from "../Components/loading"
import { getAllAgents } from "../Repositories/agencyRepos"
import { createDevice, retrieveDevice, getDevices, updateDevice , deleteDevice} from "../Repositories/deviceRepos"
import Cookies from "js-cookie"
const Device = () => {

    const [devices, setDevices] = useState([])
    const [deviceDetail, setDeviceDetail] = useState()
    const [isAlertShow, setAlertShow] = useState(false)
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState()

    //agency useState
    const agency = Cookies.get("agentID")
    const agencyName = Cookies.get("agentName")

    //useState for selectedAgency for filtering
    const [selectedAgent, setSelectedAgent] = useState('')

    //variable to render devices
    const [renderDevice, setRenderDevice] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getAllDevices()
    }, [])


    const addDevice = async (data) => {
        // try {
        //     await axios.post('http://127.0.0.1:5000/addDevice', data).then(response => {
        //         if (response.data.status === 200) {
        //             setMessage("Device added !")
        //             getAllDevices()
        //             setAlertShow(true)
        //             setTimeout(() => {
        //                 setAlertShow(false)
        //             }, 3000);

        //         }
        //     })
        // } catch (error) {
        //     console.log(error)
        // }
        const newDevice = await createDevice(agency, data)
        if (newDevice) {
            setAlertShow(true)
            setMessage("Device added !")
            setTimeout(() => {
                setAlertShow(false)
            }, 3000);

        }

    }



    const getAllDevices = async () => {
        setIsLoading(true)
        try{
            let devicesList = await getDevices(agency)

            if(devicesList){
                setDevices(devicesList)
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000);
            }
        }catch(error){}
    }

    const getDevice = async (device_id) => {
       console.log(device_id)
        let devicedata = await retrieveDevice(agency,device_id)
        //console.log({aid:agencyID,did:device_id})
        console.log(devicedata)
        if (devicedata) {
            setDeviceDetail(devicedata)
        }

    }

   

    const editDevice = async (data) => {

       try{
           if(data){
                const update = await updateDevice(data)
                if(update){
                    getAllDevices()
                    setMessage('Device updated')
                    setAlertShow(true)
                    setTimeout(() => {
                        setAlertShow(false)
                    }, 3000);
                }
            }
        }catch(error){
            console.log(error)
        }
    }




    const deleteThisDevice = async (device_id) => {
        //console.log(device_id)
        try {
            let deleted = await deleteDevice(agency,device_id)
            if(deleted){
                getAllDevices()
                setMessage("Device deleted")
                setAlertShow(true)
                setTimeout(() => {
                    setAlertShow(false)
                }, 3000);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //form
    const formData = [
        
        { name: "device_name", type: "text", label: "Device Name", id: 'device_name' },
        { name: 'device_ip', type: "text", label: "Device's IP", id: 'device_ip' }
    ];


  
    // useEffect(() => {
    //     let this_data = ""
    //     if (isLoading) {
    //         this_data = <tr><td colSpan="3">{loading}</td></tr>
    //     }
    //     else {
    //         if (devices.length > 0) {
    //             this_data = devices.map((device, index) => (
    //                 <tr key={device.device_id}>
    //                     <td>{index + 1}</td>
    //                     <td>{device.device_name}</td>
    //                     <td>{device.device_ip}</td>
    //                     <td>
    //                         <button className="btn btn-sm" title="Edit Device" onClick={() => getDevice(device.agencyID, device.device_id)} data-bs-toggle="modal" data-bs-target="#editDeviceModal"><i className="bi bi-sliders"></i>&emsp;Edit</button>
    //                         &emsp;
    //                         <button title="Delete Device" className="btn btn-sm" onClick={() => deleteDevice(device.device_id)}><i className="bi bi-trash text-danger"></i>&emsp;Delete</button>
    //                     </td>
    //                 </tr>
    //             ))
    //         }
    //         else {
    //             this_data = <tr><td colSpan="2">No data is shown</td></tr>
    //         }
    //     }




    //     setRenderDevice(this_data)


    // }, [devices, isLoading])


    return (
        <main className="main" id="main" >
            <div className="container-md">
                <Modal title="Add Device" modalID="addDeviceModal" content={<Form formFields={formData} onSubmit={addDevice}data="" />} />
                <Modal title="Edit Device" modalID="editDeviceModal" content={<Form formFields={formData} onSubmit={editDevice} data={deviceDetail} />} />
                <div className="text-start">
                    <a href="/agency-management" className="btn btn-primary">Agency Management</a>

                </div>
                <br />
                <div className="card">
                    <div className="card-header">Device Management ({agencyName})</div>
                    <div className="card-body">
                        <br />
                        {isAlertShow &&
                            <div className="alertDiv">
                                <div className={errors.length !== 0 ? 'alert alert-danger' : 'alert alert-success'}>{message}</div>
                            </div>
                        }


                        <div className="text-end">
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addDeviceModal">
                                <i className="bi bi-plus-circle"></i> Device
                            </button>
                        </div>

                        <br />
                        <br />

                        {/* Filter */}
                      
                        {/*End Filter */}
                        <br /><br />

                        <table className="table table-sm table-borderless">
                            <thead className="table-dark">
                                <tr>
                                    <th>No</th>
                                    <th width="30%">Devices</th>
                                    <th width="30%">IP Address</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isLoading?<tr><td colSpan="4">{loading}</td></tr>:
                                    devices ?
                                        devices.map((device, index) => (
                                            <tr key={device.device_id}>
                                                <td>{index + 1}</td>
                                                <td>{device.device_name}</td>
                                                <td>{device.device_ip}</td>
                                                <td>
                                                    <button className="btn btn-sm" title="Edit Device" onClick={() => getDevice(device.device_id)} data-bs-toggle="modal" data-bs-target="#editDeviceModal"><i className="bi bi-sliders"></i>&emsp;Edit</button>
                                                    &emsp;
                                                    <button title="Delete Device" className="btn btn-sm" onClick={() => deleteThisDevice(device.device_id)}><i className="bi bi-trash text-danger"></i>&emsp;Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    :<tr><td colSpan="3">No Data Found</td></tr>
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </main>
    )
}


export default Device