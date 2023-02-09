import React, { useState, useEffect } from 'react';
import { singleFileUpload, multipleFilesUpload } from '../data/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './FileUploadScreen.css'
import axios from 'axios';


const FileUploadScreen = (props) => {
    const [singleFile, setSingleFile] = useState('');
    const [multipleFiles, setMultipleFiles] = useState('');
    const [title, setTitle] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);
    const [multipleProgress, setMultipleProgress] = useState(0);
    const [titledata, setTitledata] = useState([]);
    const [descriptiondata, setDescriptiondata] = useState([]);
    const [schooldata, setSchooldata] = useState([]);
    const [departmentdata, setDepartmentdata] = useState([]);
    const [AssignedTodata, setAssignedTodata] = useState([]);

    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }
    const MultipleFileChange = (e) => {
        setMultipleFiles(e.target.files);
        setMultipleProgress(0);
    }
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }
    const mulitpleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setMultipleProgress(percentage);
        }
    }

    function AddForm() {
        let x = document.getElementById("title").value;
        let y = document.getElementById("description").value;
        let z = document.getElementById("school").value;
        let a = document.getElementById("department").value;
        let b = document.getElementById("AssignedTo").value;
        axios.post(
            "http://localhost:8080/api/form/create",
            { title: x, description: y, school: z, department: a, AssignedTo: b },
        )
            .then((res) => console.log("post data", res.data))
            .then((err) => console.log(err));
    }

    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }
    const UploadMultipleFiles = async () => {
        const formData = new FormData();
        formData.append('title', title);
        for (let i = 0; i < multipleFiles.length; i++) {
            formData.append('files', multipleFiles[i]);
        }
        await multipleFilesUpload(formData, mulitpleFileOptions);
        props.getMultiple();
    }
    return (
        <div className="row mt-3">
            <div className="col-6">
                <div className='Form-data'>
                    <div className='form'>
                        {/* <div className="Submit-container"> */}
                            <label>Title: </label>
                            <input
                                className="Form"
                                id="title"
                                value={titledata}
                                onChange={(e) => {
                                    setTitledata(e.target.value);
                                }}
                                type="text"
                                placeholder="title"
                            />
                            <label className='labelNames'>Description: </label>
                            <input
                                className="Description"
                                id="description"
                                value={descriptiondata}
                                onChange={(e) => {
                                    setDescriptiondata(e.target.value);
                                }}
                                type="text"
                                placeholder="Description"
                            />
                            <label className='labelNames'>School: </label>
                            <input
                                className="school"
                                id="school"
                                value={schooldata}
                                onChange={(e) => {
                                    setSchooldata(e.target.value);
                                }}
                                type="text"
                                placeholder="School"
                            />
                            <label className='labelNames'>Department</label>
                            <input
                                className="Department"
                                id="department"
                                value={departmentdata}
                                onChange={(e) => {
                                    setDepartmentdata(e.target.value);
                                }}
                                type="text"
                                placeholder="Department"
                            />
                            <label className='labelNames'>AssignedTo: </label>
                            <input
                                className="AssignedTo"
                                id="AssignedTo"
                                value={AssignedTodata}
                                onChange={(e) => {
                                    setAssignedTodata(e.target.value);
                                }}
                                type="text"
                                placeholder="AssignedTo"
                            />
                        </div>
                        {/* <input type="text" placeholder='Enter Title' />
                        <input type="text" placeholder='Description' />
                        <input type="text" placeholder='School' />
                        <input type="text" placeholder='Enter Department' />
                        <input type="text" placeholder='Assign this to' /> */}
                    {/* </div> */}
                    <div className="form-group">
                        <label>Select Single File</label>
                        <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
                    </div>
                    <div className='btn-bar'>
                        <div className="col-10">
                            <button type="button" className="btn-btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                        </div>
                        <div className="col-2">
                            <CircularProgressbar
                                value={singleProgress}
                                text={`${singleProgress}%`}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                        </div>
                    </div>
                    <button className="Submit" onClick={AddForm}>
                                Submit
                    </button>
                </div>
                {/* <button onSubmit={j}>Submit</button> */}
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col-6">
                        <label >Title</label>
                        <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="enter title for your gallery" className="form-control" />
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label>Select Multiple Files</label>
                            <input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <button type="button" onClick={() => UploadMultipleFiles()}  >Upload</button>
                    </div>
                    <div className="col-2">
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#f88',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUploadScreen;