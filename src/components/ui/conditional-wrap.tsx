import { cloneElement } from "react";
interface ConditionalWrapProps {
  condition: boolean;
  wrap: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

const ConditionalWrap = ({
  condition,
  children,
  wrap,
}: ConditionalWrapProps) =>
  condition ? cloneElement(wrap(children)) : children;
export default ConditionalWrap;
