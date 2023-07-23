import { useState, useEffect } from "react";
import { getAllAgents, getPassword } from "../Repositories/agencyRepos";
import Cookies from "js-cookie";
import Alert from "../Components/alert";
const Login = () => {
    const [showAlert,setShowAlert] = useState(false)

    const [agents, setAgents] = useState([])

    const [selectedAgent, setSelectedAgent] = useState('')

    const [errors, setErrors] = useState(false)

    const [message, setMessage] = useState('')

    const [name, setName] = useState('')

    const [auth, setAuth] = useState(false)

    const [agencypass, setAgencyPass] = useState()
    const [password, setPassword] = useState()

    const fetchAgents = async () => {
        try {
            let data = await getAllAgents()
            if (data) {
                setAgents(data)
            }
        } catch (error) {
            setErrors(true)
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAgents()
    }, [])

    const handleAgentChange = async (e) => {
        let value = e.target.value


        if (value) {
            let thisID = document.getElementById(value).innerText
            let this_password = await getPassword(value)
            if (this_password) {

                setSelectedAgent(value)
                setName(thisID)
                setAgencyPass(this_password)
            }
        }
        else {
            setSelectedAgent('')
            setName('')
            setPassword('')
        }

    }

    const handlePasswordChange = (e) => {
        let pass = e.target.value
        setPassword(pass)
    }

    const authenticate = (e) => {
        e.preventDefault()
        setMessage()
        setErrors(false)
        setTimeout(() => {


            if (selectedAgent && name && password) {
                if (password === agencypass) {
                    Cookies.set('agentID', selectedAgent)
                    Cookies.set('agentName', name)
                    setAuth(true)
                    setMessage("You are logged in")
                    setTimeout(() => {
                        window.location.href = "/bot"
                    }, 2500);
                }
                else {
                    setMessage("Invalid Password")
                    setErrors(true)
                }


            }

            if (!password) {
                setMessage("Please enter password")
                setErrors(true)
            }
            if (!selectedAgent) {
                setMessage("Please Select Agent")
                setErrors(true)
            }
        }, 1500);


    }

    return (
        <div>
            <br /><br /><br /><br />
            <div className="container-md">
                <div className="card">
                    <div className="card-header">Login</div>
                    <div className="card-body">
                        <br />
                        {
                            // errors && <div className="alert alert-danger">{message}</div>
                            errors && <Alert status="fail" message={message} display="true"/>
                        }

                        {
                            auth && <div className="alert alert-success">{message}</div>
                        }
                        <br />
                        <form onSubmit={authenticate}>
                            <div className="row">
                                <div className="col-2"></div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="#agent" className="form-label">Select Agency</label>
                                        </div>
                                        <div className="col-8">
                                            <select name="agent" id="agent" className="form-select" onChange={handleAgentChange}>
                                                <option value="">Please Select</option>
                                                {
                                                    agents.length > 0
                                                    &&
                                                    agents.map((agent, index) => (
                                                        <option value={agent.id} key={index} id={agent.id}>{agent.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>


                                    </div>

                                    <br />

                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="#password" className="form-label">Password</label>
                                        </div>
                                        <div className="col-8">
                                            <input type="password" name="password" id="pass" className="form-control" onChange={handlePasswordChange} disabled={selectedAgent ? '' : 'true'} value={password} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="text-center">
                                            <button className="btn btn-primary" type="submit">Login</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2"></div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;