import Button from "@/components/Button/Button";
import UpdateRoomForm from "@/components/UpdateRoomForm/UpdateRoomForm";
async function fetchBuildingData(id) {
  const requestParams = {
    action: "GET_ROOM",
    payload: {
      roomId: id
    }
  }
  const data = await fetch(`http://localhost:3000/api/room`,
    {
      method: "POST",
      body: JSON.stringify(requestParams)
    }
  )
  const roomData = await data.json()
  return roomData.roomDetails
}
export default async function RoomDetail(params) {
  const roomId = params.params?.roomId;
  const roomDetails = await fetchBuildingData(Number(roomId))
  return (
    <div className='room-details'>
      <Button buttonText="Back to home" linkUrl="http://localhost:3000/" />
      <UpdateRoomForm roomDetails={roomDetails} />
    </div>
  );
}
