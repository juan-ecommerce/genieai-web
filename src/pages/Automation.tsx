import ServicePage from "./ServicePage";
import { services } from "../data/services";
export default function Automation() {
  return <ServicePage service={services[2]} />;
}
