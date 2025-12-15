import Navbar from "../components/common/Navbar";
import GarageHeader from "../components/garage/GarageHeader";
import ListCars from "../components/garage/ListCars";

export default function Garage() {
    return (
        <div>
            <Navbar />
            <GarageHeader />
            <ListCars />
        </div>
    );
}
