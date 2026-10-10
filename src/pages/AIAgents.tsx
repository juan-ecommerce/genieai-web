import ServicePage from "./ServicePage";
import { services } from "../data/services";
export default function AIAgents() {
  return <ServicePage service={services[0]} />;
}
