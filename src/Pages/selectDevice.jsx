import { useState, useEffect } from "react"
import axios from "axios"
import { getDevices } from "../Repositories/deviceRepos"
const DeviceList = ({ agent, onSelectedDevicesChange }) => {
    const [devices, setDevices] = useState([])
    const [errors, setErrors] = useState([])
    const [message, setMessage] = useState('')
    const [selectedDevices, setSelectedDevices] = useState([])
    const [renderDevices, setRenderDevices] = useState()
    const fetchDevices = async () => {
        // try {
        //     await axios.get('http://127.0.0.1:5000/getAllDevices').then(response => {
        //         if (response.data.status === 200) {
        //             const device = response.data.devices;
        //             const devicesArray = Object.keys(device).map((key) => ({
        //                 name: key,
        //                 ...device[key],
        //             }));
        //             setDevices(devicesArray);
        //         }
        //     })
        // }
        // catch (error) {
        //     setMessage('Cannot connect to server')
        //     setErrors(error)
        // }

        try {
            const this_devices = await getDevices(agent) 
            if(this_devices){ // this statement is to prevent set undefined data to device useState hooks
                setDevices(this_devices)
            }
        }
        catch (error) { 
            console.log(error)
        }

    }

    useEffect(() => {
        fetchDevices()
        setSelectedDevices([])
    }, [agent])

    // useEffect(() => {
    //     const render = devices.map((device, index) => (
    //         <tr key={index}>
    //             <td>
    //                 <input className="form-check-input device-checkbox" type="checkbox" onChange={handleSelect(device.device_name, device.device_ip)} />
    //             </td>
    //             <th>
    //                 {device.device_name}
    //             </th>
    //             <td>
    //                 {device.device_ip}
    //             </td>
    //         </tr>
    //     ))
    //     setRenderDevices(render)
    // }, [devices])



    const handleSelect = (deviceName, deviceIP) => (event) => {
        const isChecked = event.target.checked;

        // setSelectedDevices((prevSelectedDevices) => {
        //     if (isChecked) {
        //         // Add the selected device to the selectedDevice state
        //         return [...prevSelectedDevices,
        //             {device_name:deviceName,device_ip:deviceIP}
        //         ];
        //     } else {
        //         // Remove the unchecked device from the selectedDevice state
        //         return prevSelectedDevices.filter((device) => device !== deviceName);
        //     }
        // });
        if (isChecked) {
            // Add the selected device to the selectedDevices state
            const updatedDevices = [...selectedDevices, { device_name: deviceName, device_ip: deviceIP }];
            setSelectedDevices(updatedDevices);
            //onSelectedDevicesChange(updatedDevices);
        } else {
            // Remove the unchecked device from the selectedDevices state
            const updatedDevices = selectedDevices.filter(
                (device) => device.device_name !== deviceName
            );
            setSelectedDevices(updatedDevices);
            //onSelectedDevicesChange(updatedDevices);
        }


    };

    useEffect(() => {
        onSelectedDevicesChange(selectedDevices)
    }, [selectedDevices])



    return (
        <div className="device-list">
            {
                errors != 0 &&
                <div className="alert-div">
                    <div className=" alert alert-danger">{message}</div>
                </div>
            }
            <div className="row">
                <div className="col-12">
                    <table className="table table-hovered">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>PC</th>
                                <th>IP address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                              devices.map((device, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input className="form-check-input device-checkbox" type="checkbox" onChange={handleSelect(device.device_name,device.device_ip)} />
                                        </td>
                                        <th>
                                            {device.device_name}
                                        </th>
                                        <td>
                                            {device.device_ip}
                                        </td>
                                    </tr>
                                ))
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DeviceList