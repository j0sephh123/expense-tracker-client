import { useParams } from "react-router";

export default function SingleCategory() {
  const { id } = useParams();

  return <div>SingleCategory {id}</div>;
}