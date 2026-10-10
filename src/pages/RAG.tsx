import ServicePage from "./ServicePage";
import { services } from "../data/services";
export default function RAG() {
  return <ServicePage service={services[1]} />;
}
