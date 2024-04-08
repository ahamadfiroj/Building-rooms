## Coding Challenge Room UI

### The backend

- The backend can be written in Java, Python or a backend Javascript framework such as NodeJS
- All Source code for the backend shall be in the room-backend directory and ran as a standalone service

GET_BUILDING_DETAILS, ADD_ROOM, REMOVE_ROOM, CHANGE_TEMPERATURE api  : http://localhost:3000/api/building

request body :
GET_BUILDING_DETAILS:
METHOD GET

ADD_ROOM: {
  "action": "ADD_ROOM",
  "payload": {
    "name":[string],
  }
}
METHOD POST,

REMOVE_ROOM: {
  "action": "REMOVE_ROOM",
  "payload": {
    "roomId":[number],
  }
}
METHOD POST,

CHANGE_TEMPERATURE: {
  "action": "CHANGE_TEMPERATURE",
  "payload": {
    "newTemperature":[number],
  }
}
METHOD POST,

GET_ROOM, UPDATE_ROOM api  : http://localhost:3000/api/room/

request body :
ADD_ROOM: {
  "action": "GET_ROOM",
  "payload": {
    "name":[string]
  }
}
METHOD POST,

UPDATE_ROOM: {
  "action": "UPDATE_ROOM",
  "payload": {
    "roomId":[number],
    "name":[string],
    "temperature":[number]
  }
}
METHOD POST,

all api's are tested with POSTMAN and working.

### The frontend

- A basic NextJS application framework has been provided for you in room-frontend
- All Source code for the frontend shall be in the room-frontend directory and ran as a standalone service

All Data are static NO DB connection here only functionality and UI done with all api fetch data because of Static data no connection of DB so always page refresh with static data.
