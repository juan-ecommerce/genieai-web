import ServicePage from "./ServicePage";
import { services } from "../data/services";
export default function DataScience() {
  return <ServicePage service={services[3]} />;
}
