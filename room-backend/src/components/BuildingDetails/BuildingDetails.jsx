import React from 'react';
import './BuildingDetails.css';
import Button from '../Button/Button';
import SubmitButton from '../SubmitButton/SubmitButton';

const BuildingDetails = ({ buildingData }) => {
    const { requestedTemperature, rooms } = buildingData
    return <div className='building-layout'>
        <div className='building-header'>
            <h3>Building details</h3>
            <div className='building-temperature'>Building temperature : {requestedTemperature}</div>
            <div className='building-action'>
                <Button buttonText="Update temperature" linkUrl={`http://localhost:3000/update-building-temperature/${requestedTemperature}`} />
                <Button buttonText="Add room" linkUrl={`http://localhost:3000/add-room`} />
            </div>
        </div>
        <div className='rooms-wrapper'>
            {rooms.map((roomItem) => {
                const { id, name, temperature, heatingEnabled } = roomItem;
                const requestParams = { action: "REMOVE_ROOM", payload: { roomId: id } }
                return <div className='room-card'>
                    <div className='room-card-heading'> <h3>{name}</h3> <SubmitButton buttonText="Remove" apiUrl='http://localhost:3000/api/building' requestParams={requestParams} reDirectLink='http://localhost:3000/' className="remove-button" /></div>
                    <div>Room temperature: {temperature} </div>
                    <div> {heatingEnabled ? "Room required more heating " : "Room required more cooling "}</div>
                    <Button buttonText="Update room details" linkUrl={`http://localhost:3000/room-details/${id}`} />
                </div>
            })}
        </div>
    </div>
}

export default BuildingDetails
