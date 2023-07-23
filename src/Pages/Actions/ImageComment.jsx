import { useState, useEffect } from "react";
import axios from "axios";
const ImageComment = ({ data }) => {

    const [image, setImage] = useState()
    const [errors, setErrors] = useState([])


    const validation = () => {

        let newError = []
        setErrors([])
        if (data.accounts.length <= 0) {
            newError.push('Please select at least one account')
        }
        if (data.posts.length <= 0) {
            newError.push("Please enter the post link(s) to comment")
        }
        if (!image) {
            newError.push("Please choose image to comment")
        }

        if (newError.length > 0) {
            setErrors(newError)
            return false
        }
        else {
            return true
        }
    }



    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const pushImageComment = async () => {
        let validate = validation()
        if (validate) {
            const formData = new FormData();
            formData.append('accounts', JSON.stringify(data.accounts));
            formData.append('posts', JSON.stringify(data.posts));
            formData.append('image', image);

            try {
                const response = await axios.post("http://192.168.0.133:5000/comment-with-image", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the correct Content-Type for file uploads
                    },
                });

                if (response.data.status === 200) {
                    console.log("DONE");
                }

                if (response.data.error) {
                    console.log(response.data.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-8">

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="#image" className="form-label">Choose Image</label>
                        </div>
                        <div className="col-8">
                            <input type="file" name="image" id="image" className="form-control" onChange={handleImageChange} />
                        </div>
                    </div>



                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <div className="col-2">
                            <label className="form-label" htmlFor="#selectedImage">Preview</label>
                        </div>

                        <div className="col-10">
                            <div
                                className="border border-2 border-secondary d-flex align-items-center justify-content-center"
                                style={{ height: '450px', width: '450px' }}
                            >
                                {image && (
                                    <img src={URL.createObjectURL(image)} id="selectedImage" alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className="text-start">
                {
                    errors.length > 0 &&
                    <div className="alert alert-danger">
                        <ul>
                            {
                                errors.map((error, index) => (
                                    <li className="text-danger" key={index}>{error}</li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className="text-center">
                <button className="btn btn-dark" onClick={pushImageComment}>Run BOT</button>
            </div>
            <br />

        </div>
    )

}
export default ImageComment