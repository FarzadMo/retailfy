
import React from "react";


const FileUpload = (props) => {
    return (

        <>
            <form onSubmit={props.onSubmit}>
                <div className='custom-file '>

                    <input type="file" className='custom-file-input' id='customFile' onChange={props.onChange} />
                    <label className='custom-file-label' style={{ 
   fontFamily: "'Poppins', 'sans-serif'"}} htmlFor='customFile'>
                        {props.filename}
                    </label>
                </div>
                <input type="submit" value="Upload" className="btn btn-block mt-4" style={{ backgroundColor: "#5ED228",
    borderColor: "#5ED228", fontFamily: "'Poppins', 'sans-serif'", color:"white"}} />
            </form>
            {props.uploadedFile.filePath ?
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">

                        <img alt="clothes" style={{ width: '100%', height: "100%", marginBottom: "15px" }} src={props.uploadedFile.filePath} />
                    </div>
                </div>)
                :
                (<div className="row mt-5">
                    <div className="col-md-6 m-auto">

                        <img alt="retailfy" style={{ width: '100%', height: "100%", marginBottom: "15px" }} src={"./assets/images/bs3.jpg"} />
                    </div>
                </div>)
            }

        </>


    )




}

export default FileUpload;