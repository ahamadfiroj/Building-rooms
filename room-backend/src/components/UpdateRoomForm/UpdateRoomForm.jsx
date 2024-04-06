"use client";
import React, {  useState } from 'react';
import './UpdateRoomForm.css';
import { useRouter } from "next/navigation";

const getRandomTemperature = () => {
    return Math.floor(Math.random() * (40 - 10 + 1)) + 10;
};
const UpdateRoomForm = ({ roomDetails = {} }) => {
    const {
        id = null,
        name: roomName = "",
        temperature: roomTemperature = ""
    } = roomDetails
    const [formState, setFormState] = useState({
        name: roomName,
        temperature: roomTemperature,
        isNameError: false,
        isTemperatureError: false
    })
    const route = useRouter()
    const { name, temperature, isNameError, isTemperatureError} = formState
    const inputChangeHandler = (event) => {
        const { name = "", value = "" } = event.target;
        const errorKey = name == "name" ? 'isNameError' : 'isTemperatureError'
        setFormState((prev) => {
            return { ...prev, [name]: value, [errorKey]: false }
        })
    }
    const formValidation = () => {
        let isValid = true
        if (!name) {
            setFormState((prev) => {
                return { ...prev, isNameError: true }
            })
            isValid = false
        }
        if (!temperature && id) {
            setFormState((prev) => {
                return { ...prev, isTemperatureError: true }
            })
            isValid = false
        }
        return isValid
    }
    const requestParams = {
        action: id ? "UPDATE_ROOM" : 'ADD_ROOM',
        payload: {
            roomId: id,
            name: name,
            temperature: temperature && Number(temperature) || getRandomTemperature(),
        }
    }

    const apiUrl = id ? "http://localhost:3000/api/room" : "http://localhost:3000/api/building";
    const submitHandler = async () => {
        if (formValidation()) {
            await fetch(apiUrl, {
                method: "POST",
                body: JSON.stringify(requestParams)
            })
            route.push('http://localhost:3000/')
        }
    }
    return <div className='room-details-form'>
        <h3>{id ? "Update" : "Add"} room details {id}</h3>
        <form className='form'>
            <div className='input-field'>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name="name" onChange={inputChangeHandler} value={name} />
                {isNameError && <span className='error-message'>Please enter room name</span>}
            </div>
            {id && <div className='input-field'>
                <label htmlFor="temperature">Temperature</label>
                <input type="number" id='temperature' name="temperature" onChange={inputChangeHandler} value={temperature} />
                {isTemperatureError && <span className='error-message'>Please enter temperature</span>}
            </div>}
        </form>
        <button onClick={submitHandler} className='submit-button'>Submit</button>
    </div>
}

export default UpdateRoomForm;