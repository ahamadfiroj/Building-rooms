"use client";
import React from 'react';
import './SubmitButton.css';
import { useRouter } from "next/navigation";

const SubmitButton = ({requestParams, buttonText, apiUrl = "", reDirectLink = "", className=""})=>{
    const route = useRouter()
    const clickHandler = async () => {
        await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(requestParams)
        })
        route.push(reDirectLink)

    }
    return <button onClick={clickHandler} className={`submit-button ${className}`}>{buttonText}</button>
}

export default SubmitButton;