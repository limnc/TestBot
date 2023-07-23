import React from "react";
import { useState, useEffect } from "react";
import Modal from "../Components/modal";
import Form from "../Components/form";
const TestCaseManagement = () => {
    const [cases, setCases] = useState()
    const form = [
       
        {name:"network",type:"select",label:"Network",id:"network",options:[
            {value:"Keysight Network",label:"Keysight Network"},
            {value:"DLAN",label:"DLAN"},
            {value:"DHCPv4",label:"DHCP (IPv4)"},
            {value:"DHCPv6",label:"DHCP (IPv6)"},
            {value:"private",label:"Private (Switch)"}
        ]},
        {name:"lxi-version",type:"select",label:"LXI-version",id:"lxi-version",options:[
            {value:"1.5",label:"1.5"},
            {value:"1.6",label:"1.6"}
        ]},
         {name:"os",type:"select",label:"Operating System",id:"os",options:[
            {value:"All",label:"ALL"},
            {value:"Windows",label:"Windows"},
            {value:"Linux",label:"Linux"}
         ]},
         {name:"tc_name",type:"text",label:"Test Case Name",id:"tc_name"},
         {name:"description",type:"text",label:"Test Description",id:"description"},
         {name:"function",type:"text",label:"Pointed Function",id:"function"},
        
    ]

    return (
        <div className="container-lg">
            {/* Modal Tag place here */}
            <Modal title="Add Test Case" content={<Form formFields={form}/>}/>
            <div className="card">
                <div className="card-header">Test Cases</div>
                <div className="card-body">
                    <br />

                    <div className="text-start">
                    <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal">
                            <i className="bi bi-plus-circle"></i> Test Case
                        </button>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="filter" id="filter">
                        <div className="row">
                            <div className="col-4">
                                <div className="row">
                                    <div className="col-3">
                                        <label htmlFor="#type" className="form-label">Network</label>
                                    </div>
                                    <div className="col-8">
                                        <select name="type" id="type" className="form-select">
                                            <option value="all">All</option>
                                            <option value="Keysight">Keysight Network</option>
                                            <option value="DLAN">Direct LAN</option>
                                            <option value="DHCPv4">DHCP (IPv4)</option>
                                            <option value="DHCPv6">DHCP (IPv6)</option>
                                            <option value="private">Private (Switch)</option>
                                        </select>
                                    </div>
                                </div>


                            </div>

                            <div className="col-3">
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="#lxi-version" className="form-label">LXI Version</label>
                                    </div>
                                    <div className="col-8">
                                        <select name="version" id="version" className="form-select">
                                            <option value="all">All</option>
                                            <option value="1.5">1.5</option>
                                            <option value="1.6">1.6</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-5">
                                <div className="row">
                                    <div className="col-4">
                                        <label htmlFor="#os" className="form-label">Operating System</label>
                                    </div>
                                    <div className="col-8">
                                        <select name="os" id="os" className="form-select">
                                            <option value="all">All</option>
                                            <option value="Windows">Windows</option>
                                            <option value="Linux">Linux</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                        <br /><br />
                        <div className="row">
                            <div className="text-center">
                                <button className="btn btn-outline-primary">
                                    <i className="bi bi-filter"></i> Filter
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />

                    {/*Table*/}
                    <table className="table table-borderless">
                        <thead className="table-dark">
                            <tr>
                                <th>No.</th>
                                <th>Test Case</th>
                                <th>Description</th>
                                <th>LXI Version</th>
                                <th>OS</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>TC_1.5_001</td>
                                <td>Ensure Instrument IP is accessible</td>
                                <td>1.5</td> 
                                <td>Windows and Linux</td>
                                <td>
                                    <button className="btn">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default TestCaseManagement