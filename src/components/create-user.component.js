import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
    const [username, setUsername] = useState('');

    function handleChange(event) {
        setUsername(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();

        const userDetails = {
            username: username
        }

        console.log(userDetails);

        axios.post("http://localhost:5000/users/add", userDetails)
            .then(res => console.log(res.data));
            

        setUsername('');
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        name="username"
                        required
                        className="form-control"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;