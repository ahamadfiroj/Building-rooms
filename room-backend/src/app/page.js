import BuildingDetails from "@/components/BuildingDetails/BuildingDetails";
import styles from "./page.module.css";
async function fetchBuildingData() {
  const data = await fetch("http://localhost:3000/api/building")
  const buildingData = await data.json()
  return buildingData.building
}
export default async function Home() {
  const buildingData = await fetchBuildingData()
  return (
    <main className={styles.main}>
      <BuildingDetails buildingData={buildingData}/>
    </main>
  );
}
