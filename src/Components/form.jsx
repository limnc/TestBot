import React from "react";
import { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
const Form = ({ formFields, onSubmit, data }) => {
    const [formData, setFormData] = useState({})
    const [valid, setValid] = useState(false)
    const [errorMsg, setErrorMsg] = useState()

    const [value, setValue] = useState()
    const closeButtonRef = useRef();

    useEffect(() => {
        if (data) {
            setFormData({})
            setFormData(data)
        }
    }, [data])

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const validation = () => {
        const errors = []
        formFields.forEach((field) => {
            if (formData[field.name] === undefined || formData[field.name] === "") {
                errors.push(<li>[ {field.label} ] is required</li>)

                //Add each error into an array and print below 
                //make use of useEffect

            }
        });
        return errors

    }

    const formSubmit = (event) => {
        event.preventDefault()
        const errors = validation()
        setValid(errors.length === 0)
        setErrorMsg(errors)

        if (errors.length === 0) {
            
            onSubmit(formData)
            closeButtonRef.current.click();
            event.target.reset()
            setFormData({})
            setValid(false)
        }

    }

    function closeModal() {
        let close = document.querySelector('#closeModal')
        close.click()
    }



    return (
        <div className="row">
            <div className="col-12">
                <div className={valid ? 'collapse' : ''}>
                    <ul className="text-danger">
                        {
                            errorMsg
                        }
                    </ul>
                </div>
                {
                    valid && <div className="alert alert-primary">Processing</div>
                }
                <form onSubmit={formSubmit} autoComplete="off">
                    {   formFields.length > 0 &&
                        formFields.map((field, index) =>
                            <div className="mb-3" key={index}>
                                <label htmlFor={field.id} className="form-label">{field.label}</label>
                                {
                                    // field.type === 'input'?
                                    // (<input type={field.type} classname="form-control" id={field.id}/>):
                                    field.type === 'select' ?
                                        (<select className="form-select" name={field.name} onChange={handleInputChange} value={formData[field.name] || ''} >
                                            <option value="">Please Select</option>
                                            {field.options.map((option) =>
                                                <option key={option.value} value={option.value} selected={formData[field.name] && option.value === formData[field.name]}>{option.label}</option>
                                            )}
                                        </select>) :
                                        (<input type={field.type} name={field.name} className="form-control" id={field.id}      value={
                                           formData ? formData[field.name] : ''
                                            
                                        }
                                         onChange={handleInputChange}  />)

                                }
                            </div>

                        )
                    }
                    <div className="text-center">
                        <button className="btn btn-dark">Submit</button>
                        <div className="collapse">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                id="closeModal"
                                ref={closeButtonRef}
                            >
                                Close
                            </button>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form