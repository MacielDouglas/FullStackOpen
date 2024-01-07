import { Parts } from "../types";
import Part from "./Part";

export default function Content(props: Parts) {
  return (
    <div>
      <Part courses = {props.courses} />
    </div>
  )
}