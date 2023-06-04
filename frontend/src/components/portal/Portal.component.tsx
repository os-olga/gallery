import { createPortal } from "react-dom";

import { PortalProps } from "./Portal.types";

export const PortalComponent: React.FC<PortalProps> = ({ children }) => {
  const el: any = document.getElementById("portal");
  return createPortal(children, el);
};
