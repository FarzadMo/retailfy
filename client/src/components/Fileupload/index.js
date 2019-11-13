
import React from "react";


const FileUpload = (props) => {


    return (

        <>
            <form onSubmit={props.onSubmit}>
                <div className='custom-file '>

                    <input type="file" className='custom-file-input' id='customFile' onChange={props.onChange} />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {props.filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
            </form>
            {props.uploadedFile.filePath ?
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        {/* <h3 className="text-center">{props.uploadedFile.fileName}</h3> */}
                        <img alt="clothes" style={{ width: '100%', height: "100%" }} src={props.uploadedFile.filePath} />
                    </div>
                </div>)
                :
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        {/* <h3 className="text-center">{props.uploadedFile.fileName}</h3> */}
                        <img alt="retailfy" style={{ width: '100%', height: "100%" }} src={"./assets/images/back2.jpg"} />
                    </div>
                </div>)
            }

        </>


    )




}

export default FileUpload;