"use client";
import React from 'react';
import './Button.css';
import { usePathname, useRouter } from "next/navigation";

const Button = ({ buttonText, linkUrl = "" }) => {
    const route = useRouter()
    const path = usePathname()
    const clickHandler = () => {
        console.log("linkUrl", linkUrl)
        route.push(linkUrl)
    }
    return <button onClick={clickHandler} className='action-button'>{buttonText}</button>
}

export default Button;