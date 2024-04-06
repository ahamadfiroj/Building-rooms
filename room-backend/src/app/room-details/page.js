import Button from "@/components/Button/Button";
import UpdateRoomForm from "@/components/UpdateRoomForm/UpdateRoomForm";
async function fetchBuildingData() {
  const data = await fetch("http://localhost:3000/api/room",
  )
  const roomDetails = await data.json()
  return roomDetails.rooms
}
export default async function RoomDetails() {
  const roomDetails = await fetchBuildingData()
  return (
    <div className='room-details'>
      <Button buttonText = "Back to home" linkUrl="http://localhost:3000/"/>
      <UpdateRoomForm roomDetails={roomDetails}/>
    </div>
  );
}
