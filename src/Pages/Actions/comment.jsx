import { useState, useEffect } from "react"
import axios from "axios"

const Comment = ({ data }) => {
    const [comment,setComment] = useState()
    const [info,setInfo] = useState({
        accounts:data.accounts,
        posts:data.posts
    })
    
    const sendComment = async()=>{
        try{
            await axios.post("http://192.168.0.133:5000/comment-message",info).then(res=>{
                if(res.data.status === 200){
                    alert("OK")
                }
            })
        }catch(error){}
    }

    const handleCommentChange = (e) =>{
        let msg = e.target.value
        setComment(msg)
    }

    useEffect(()=>{
        const newInfo = {
            accounts:data.accounts,
            posts:data.posts,
            comment:comment
        }
        setInfo(newInfo)
        console.log(info)
    },[comment,data.accounts,data.posts])
    return (
        <div>
            <div className="row">
                <div className="col-8">

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="#tag" className="form-label">Reply To@</label>
                        </div>
                        <div className="col-8">
                            <input type="text" name="reply" id="reply" className="form-control" />
                        </div>
                    </div>
                    <br />

                    <div className="row">
                        <div className="col-2">
                            <label htmlFor="#comment" className="form-label">Comment:</label>
                        </div>
                        <div className="col-8">
                            <textarea name="message" id="message" cols="10" rows="10" className="form-control" onChange={handleCommentChange}/>
                        </div>
                    </div>
                    <br />


                </div>
                <div className="text-center">
                    <button className="btn btn-dark" onClick={sendComment}>Comment</button>
                </div>
            </div>
        </div>
    )

}

export default Comment