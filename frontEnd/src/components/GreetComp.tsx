import { FaArrowDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/store";
import { selectAllUsers } from "../Redux/loginslice";
function GreetComp() {
  const user = useSelector((state: RootState) => selectAllUsers(state));

  return (
    <div className="absolute top-72 mt-10 h-[400px] w-[450px]">
      <div className="flex flex-col gap-5 ml-6">
        <h1 className="text-6xl text-green-400 ml-3 select-none">
          Foodify App
        </h1>
        <h1 className="text-6xl text-green-400 ml-3 select-none">
          Welcome's You
        </h1>
        {user && (
          <h1 className="text-6xl ml-3 text-yellow-400 selection:bg-orange-300 selection:text-white">
            {user[0]?.username}
          </h1>
        )}

        <div className="flex items-center justify-end">
          <Link
            to={"/menu"}
            className="p-2 bg-yellow-400 rounded-xl w-36 h-fit flex flex-row items-center justify-end gap-5 font-medium hover:scale-105 transition-transform hover:bg-yellow-500"
          >
            Scroll Down
            <FaArrowDown size={20} color="white" className="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GreetComp;
