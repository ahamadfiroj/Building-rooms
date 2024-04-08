
import { NextResponse } from "next/server";

import { building } from '../../../utils/db';


const getRandomTemperature = () => {
  return Math.floor(Math.random() * (40 - 10 + 1)) + 10;
};

const determineHeatingCoolingStatus = (roomTemperature, buildingTemperature) => {
  if (roomTemperature < buildingTemperature) {
    return { heatingEnabled: true, coolingEnabled: false };
  } else if (roomTemperature > buildingTemperature) {
    return { heatingEnabled: false, coolingEnabled: true };
  } else {
    return { heatingEnabled: false, coolingEnabled: false };
  }
};

const createRoom = (name) => {
  const room = {
    id: building.rooms.length + 1,
    name: name,
    temperature: getRandomTemperature(),
    heatingEnabled: false,
    coolingEnabled: false
  };

  const { heatingEnabled, coolingEnabled } = determineHeatingCoolingStatus(
    room.temperature,
    building.requestedTemperature
  );

  room.heatingEnabled = heatingEnabled;
  room.coolingEnabled = coolingEnabled;

  building.rooms.push(room);
};

const removeRoom = (roomId) => {
  const updatedRooms = building.rooms.filter((item)=>item.id !==roomId);
  building.rooms = updatedRooms
};

const changeRequestedTemperature = (newTemperature) => {
  building.requestedTemperature = newTemperature;
  building.rooms.forEach((room) => {
    const { heatingEnabled, coolingEnabled } = determineHeatingCoolingStatus(
      room.temperature,
      newTemperature
    );
    room.heatingEnabled = heatingEnabled;
    room.coolingEnabled = coolingEnabled;
  });
};

export function GET(req, res) {
  return NextResponse.json({ building, status: 200 })
}

export async function POST(req, res) {
  const { action, payload } = await req.json();
  if (action === 'ADD_ROOM') {
    createRoom(payload.name);
    return NextResponse.json({ building, status: 200 });
  } else if (action === 'REMOVE_ROOM') {
    removeRoom(payload.roomId);
    return NextResponse.json({ building, status: 200 });
  } else if (action === 'CHANGE_TEMPERATURE') {
    changeRequestedTemperature(payload.newTemperature);
    return NextResponse.json({ building, status: 200 });
  } else {
    const errorObj = { error: 'Invalid action' }
    return NextResponse.json({ errorObj, status: 400 });
  }
}

