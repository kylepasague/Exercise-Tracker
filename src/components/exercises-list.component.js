import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Exercise from './exercise.component';

function ExercisesList() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/exercises/")
            .then(res => {
                setExercises(res.data);
                console.log(exercises);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    function deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => {
                console.log(res.data);
            })
        setExercises(prevExercises => {
            return (prevExercises.filter(el => el._id !== id))
        });
    }

    function exerciseList() {
        return (
            exercises.map(currentExercise => {
                return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} />;
            })
        )
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    );
}

export default ExercisesList;