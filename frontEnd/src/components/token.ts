import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { selectAllUsers } from "../Redux/loginslice";

function useGetToken() {
  const fetchtoken = useSelector((state: RootState) => selectAllUsers(state));
  const token = fetchtoken[0]?.token;
  if (token) {
    return token;
  }
}

export default useGetToken;
