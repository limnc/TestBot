import React from "react";

const Modal = ({title,content,modalID}) => {
    
    return (
        <div className="modal fade" id={modalID} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                        <button type="button" className="btn-close" id="close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">Close</button>
                            
                      
                     
                            
                        
                        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal