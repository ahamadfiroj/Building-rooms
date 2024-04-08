import Button from "@/components/Button/Button";
import UpdateRoomForm from "@/components/UpdateRoomForm/UpdateRoomForm";

export default async function RoomDetail() {
  return (
    <div className='room-details'>
      <Button buttonText="Back to home" linkUrl="http://localhost:3000/" />
      <UpdateRoomForm />
    </div>
  );
}
