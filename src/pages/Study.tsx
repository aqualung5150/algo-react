import useAxios from "hooks/useAxios";
import { useParams } from "react-router";

const Study = () => {
  const id = useParams().id;
  const { data, error, loading } = useAxios(`study/${id}`);
  console.log(data);
  return <div>{`스터디: ${id}`}</div>;
};

export default Study;
