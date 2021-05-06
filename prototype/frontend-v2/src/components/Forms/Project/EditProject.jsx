import { useEffect, useContect, useState } from 'react';
import { Context } from '../../../utils/Store'
import { MANAGER } from '../../../utils/ContractData';

const EditProject = () => {

    const [name, setName] = useState("");
    const [des, setDes] = useState("");
    const [personAddress, setPersonAddress] = useState("");
    const [personName, setPersonName] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);


    const onChangeHandler = (e) => {
        switch (e.target.id) {

            case "projectname":
                setName(e.target.value);
                break;

            case "shortDesc":
                setDes(e.target.value);
                break;

            case "addPersonAddress":
                setPersonAddress(e.target.value);
                break;

            case "addPersonName":
                setPersonName(e.target.value);
                break;

            default:
                break;
        }
        setTimeout(async () => {
            if(e.target.value == "") {
              setBtnDisabled(true);
            }
          })
    }

    return (
        <div className="editGroup">

            <div className="form-group">
                <label htmlFor="projectname">
                    Change project name
                </label>
                <input type="text" className="form-control" id="projectname" placeholder="Enter new project name..." onChange={onChangeHandler} />
            </div>

            <div className="form-group">
                <label htmlFor="shortDesc">
                    Change project description
                </label>
                <textarea className="form-control" id="shortDesc" placeholder="Enter new project description..." onChange={onChangeHandler}></textarea>
            </div>

            {/**
             * following two divs need better implementation: 
             */}
            <div className="form-group">
                <label htmlFor="addPersonAddress">Add person via address</label>
                <input type="number" classname="form-control" id="addPersonAddress" placeholder="Address of the person you want to add..." onChange={onChangeHandler} />
            </div>

            <div className="form-group">
                <label htmlFor="addPersonName">Add person via username</label>
                <input type="text" classname="form-control" id="addPersonName" placeholder="Username of the person you want to add..." onChange={onChangeHandler} />
            </div>

            <div>
                Delete Person
            </div>

            <div>
                Change owner
            </div>

            <button className="btn" disabled={btnDisabled}>Änderungen speichern</button>

        </div >
    );
}

export default EditProject;