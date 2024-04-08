import Button from "@/components/Button/Button";
import UpdateTemperatureForm from "@/components/UpdateTemperatureForm/UpdateTemperatureForm";

export default  function UpdateBuildingTemp({params, searchParams}) {
  console.log("searchParams", searchParams)
  const temperature = params?.temperature;
  return (
    <div className='room-details'>
      <Button buttonText="Back to home" linkUrl="http://localhost:3000/" />
      <UpdateTemperatureForm buildingTemperature={temperature}/>
    </div>
  );
}
