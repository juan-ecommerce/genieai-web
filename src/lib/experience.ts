import { createContext, useContext } from "react";
export interface Inquiry {
  name: string;
  email: string;
  company: string;
  message: string;
}
export const emptyInquiry: Inquiry = {
  name: "",
  email: "",
  company: "",
  message: "",
};
export const ExperienceContext = createContext<{
  openContact: (draft?: Inquiry) => void;
  openChat: () => void;
}>({ openContact: () => {}, openChat: () => {} });
export function useExperience() {
  return useContext(ExperienceContext);
}
