import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Form from "../Components/form"
import Modal from "../Components/modal"
import { createAgency, getAllAgents, deleteAgency, getAgent, updateAgent } from "../Repositories/agencyRepos"
import Device from "./device"
import loading from "../Components/loading"
const Agency = () => {
    const agencyForm = [
        { name: "name", type: "text", label: "Agency Name", id: 'agency_name' },

    ]

    const deviceForm = [
        { name: "device_name", type: "text", label: "Device Name", id: 'device_name' },
        { name: 'device_ip', type: "text", label: "Device's IP", id: 'device_ip' }
    ]
    const [agents, setAgents] = useState([])
    const [thisAgent, setThisAgent] = useState([])
    const [renderAgent, setRenderAgent] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isAlertShow,setAlertShow] = useState(false)
    const [errors,setErrors] = useState([])
    const [message,setMessage] = useState()
    useEffect(() => {
        allAgency()
    }, [])
    const allAgency = async () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
        let data = await getAllAgents()
        setAgents(data)
        console.log(data)
    }

    const addAgent = async (data) => {
        console.log(data)
        await createAgency(data)
        allAgency()

    }

    const deleteAgent = async (id) => {

        let result = await deleteAgency(id)
        if (result)
        setMessage('Agent : '+id+' has been deleted')
        setAlertShow(true)
        setTimeout(()=>{
            setAlertShow(false)
        },3000)
            allAgency()

    }

    const fetchAgent = async (agentID) => {

        let this_agent = await getAgent(agentID)
        setThisAgent(this_agent)


    }

    const editAgent = async (data) => {
        let agentID = data.id
        let update = await updateAgent(agentID, data)
        if (update) { 
            setMessage("Agent updated")        
            allAgency()
            setAlertShow(true)
            setTimeout(() => {
                setAlertShow(false)
            }, 3000);
        }
    }

    useEffect(() => {
        let render = ""
        //render = loading
        if (isLoading) {
            render = <tr><td colSpan="3">{loading}</td></tr>
        }
        else {
            render = agents.map((agent, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{agent.name}</td>
                    <td>
                        {/* <a className="btn btn-sm" href={`/device-management/${agent.id}`}><i className="bi bi-plus"></i>&emsp;Manage Device</a> */}
                        {/* <button className="btn btn-sm" title="manage Device"  data-bs-toggle="modal" data-bs-target="#deviceModal"><i className="bi bi-sliders"></i>&emsp;Device</button> */}
                        <button className="btn btn-sm" title="Edit Agent" onClick={() => fetchAgent(agent.id)} data-bs-toggle="modal" data-bs-target="#editAgentModal"><i className="bi bi-sliders"></i>&emsp;Edit</button>
                        &emsp;
                        <button title="Delete Agent" className="btn btn-sm" onClick={() => deleteAgent(agent.id)}><i className="bi bi-trash text-danger"></i>&emsp;Delete</button>
                    </td>
                </tr>
            ))
        }

        setRenderAgent(render)
    }, [agents,isLoading])


    return (
        <main className="main" id="main">
            <div className="container-md">
                <Modal title="Add Agency" modalID="addAgentModal" content={<Form formFields={agencyForm} onSubmit={addAgent} data={""} />} />
                <Modal title="Edit Agency" modalID="editAgentModal" content={<Form formFields={agencyForm} onSubmit={editAgent} data={thisAgent} />} />
                <div className="card">
                    <div className="card-header">Agency Management</div>
                    <div className="card-body">
                        <br />
                        {isAlertShow && 
                            <div className="alertDiv">
                                <div className={errors.length != 0?'alert alert-danger':'alert alert-success'}>{message}</div>
                            </div>
                        }
                        <div className="text-end">
                            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addAgentModal">
                                <i className="bi bi-plus-circle"></i> Agency
                            </button>

                        </div>
                        <br /><br />

                        <table className="table table-sm table-borderless">
                            <thead className="table-dark">
                                <tr>
                                    <th>No.</th>
                                    <th>Agent</th>
                                    <th width="40%">Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                {
                                    renderAgent
                                }


                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Agency