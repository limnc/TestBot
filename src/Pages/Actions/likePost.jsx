import { useState, useEffect } from "react";
import axios from "axios";
const LikePost = ({ accounts, posts }) => {
    const [data, setData] = useState({})

    const performLikeAction = async () => {

        if (accounts.length > 0 && posts.length > 0) {
            try {
                await axios.post('http://192.168.0.133:5000/likePost', data).then(response => {
                    if (response.data.status === 200) {
                        alert(response.data)
                    }
                })
            }
            catch(error){
                console.log(error)
                
            }
        }
        else {
            alert("Please select at least one account or enter post link")
        }
    }

    useEffect(() => {
        if (accounts.length > 0 && posts.length > 0) {
            setData({
                accounts: accounts,
                posts: posts
            });
        }
        

    }, [accounts, posts])

    return (
        <div>
            <div className="row">
                <div className="col-8">

                </div>
                <div className="text-center">
                    <button className="btn btn-dark" onClick={performLikeAction}> <i className="bi bi-robot"></i> Run BOT</button>
                </div>
            </div>
        </div>
    )
}

export default LikePost