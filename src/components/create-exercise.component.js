import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CreateExercise(props) {
    const [exercise, setExercise] = useState({
        username: '',
        description: '',
        duration: 0,
        users: ['']
    });

    const [startDate, setStartDate] = useState(new Date());

    function handleChange(event) {
        const { name, value } = event.target;

        setExercise(prevExercise => {
            return {
                ...prevExercise,
                [name]: value
            }
        });
    }

    function submitForm(event) {
        event.preventDefault();

        const exerciseDetails = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: startDate
        }

        console.log(exerciseDetails);

        axios.post("http://localhost:5000/exercises/add", exerciseDetails)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    React.useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => {
                if (res.data.length > 0) {
                    setExercise(prevExercise => {
                        return {
                            ...prevExercise,
                            users: res.data.map(user => user.username),
                            username: res.data[0].username
                        }
                    })
                }
            })
            console.log(exercise.users);
    }, [])

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        name="username"
                        required
                        className="form-control"
                        value={exercise.username}
                        onChange={handleChange}>
                        {
                            exercise.users.map(user => {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        name="description"
                        required
                        className="form-control"
                        value={exercise.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        name="duration"
                        type="text"
                        className="form-control"
                        value={exercise.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            name="date"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise;