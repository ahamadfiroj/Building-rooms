"use client";
import React, {  useState } from 'react';
import '../../components/UpdateRoomForm/UpdateRoomForm.css';
import { useRouter } from "next/navigation";


const UpdateTemperatureForm = ({ buildingTemperature = null }) => {
    const [formState, setFormState] = useState({
        temperature: buildingTemperature,
        isTemperatureError: false
    })
    const route = useRouter()
    const {temperature, isTemperatureError} = formState
    const inputChangeHandler = (event) => {
        const { value = "" } = event.target;
        setFormState((prev) => {
            return { ...prev, temperature: value, isTemperatureError: false }
        })
    }
    const formValidation = () => {
        let isValid = true
        if (!temperature) {
            setFormState((prev) => {
                return { ...prev, isTemperatureError: true }
            })
            isValid = false
        }
        return isValid
    }
    const requestParams = {
        action: 'CHANGE_TEMPERATURE',
        payload: {
            newTemperature: temperature && Number(temperature),
        }
    }

    const apiUrl = "http://localhost:3000/api/building";
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
        <h3>Update building temperature </h3>
        <form className='form'>
             <div className='input-field'>
                <label htmlFor="temperature">Temperature</label>
                <input type="number" id='temperature' name="temperature" onChange={inputChangeHandler} value={temperature} />
                {isTemperatureError && <span className='error-message'>Please enter temperature</span>}
            </div>
        </form>
        <button onClick={submitHandler} className='submit-button'>Submit</button>
    </div>
}

export default UpdateTemperatureForm;