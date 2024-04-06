import { NextResponse } from "next/server";

import { building } from '../../../utils/db';


const findRoom = (roomId) => {
    const roomDetails = building.rooms?.find((item) => item.id == roomId)
    return roomDetails
};

const updateRoom = (payload) => {
    const { roomId, name = "", temperature } = payload;
    let roomsArr = building.rooms
    const roomDetails = building.rooms.find((item) => item.id == roomId)
    console.log(roomDetails)
    roomDetails.name = name;
    roomDetails.temperature = temperature;
    roomsArr = roomsArr.map((item) => {
        if (item.id == roomId) {
            return roomDetails
        } else {
            return item;
        }
    })
    building.rooms = roomsArr;
    return roomDetails
};

export function GET(req, res) {
    const rooms = building.rooms
    return NextResponse.json({ rooms, status: 200 })
}

export async function POST(req, res) {
    const { action, payload } = await req.json();
    if (action == "GET_ROOM") {
        const roomDetails = findRoom(payload.roomId)
        return NextResponse.json({ roomDetails, status: 200 })
    } else if (action == "UPDATE_ROOM") {
        const roomDetails = updateRoom(payload)
        return NextResponse.json({ roomDetails, status: 200 })
    } else {
        const errorObj = { error: 'Invalid action' }
        return NextResponse.json({ errorObj, status: 400 });
    }

}