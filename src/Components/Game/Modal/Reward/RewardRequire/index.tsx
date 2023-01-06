import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionInitialRewardUser } from "../../../../../actions";
import axios from "../../../../../config/axios";
import { Loader } from "../../../../Loader";

// Interface
interface RewardProps {
  token: number;
  userId: number;
  monsters_id: number;
  monsters_life: number;
}

function RewardRequire({
  token,
  userId,
  monsters_id,
  monsters_life,
}: RewardProps) {
  const [user, setUser]: any = useState([]);
  const [monster, setMonster]: any = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/rewardUser/" + userId).then((response) => {
      const data = response.data;
      setUser(data);
    axios.get("/api/monsters/" + monsters_id).then((response) => {
        const data = response.data;
        setMonster(data);
        setLoading(false);
    })
    });

    
  }, []);

  return (
    <div>
    {loading ? <Loader /> : (
       <div className="flex justify-between mt-4 border-gray-700 border-b-2  text-sm md:text-xl">
       <p className="lg:w-2/12 w-3/12  p-2 text-center">{user.name}</p>
       <p className="w-2/12 pt-2 pb-2 text-center">{token}</p>
       <p className="w-2/12 pt-2 pb-2 text-center">{monster.name}</p>
       <p className="w-4/12 pt-2 pb-2 text-center">{monsters_life} HP</p>
     </div>
    )}
    </div>
  );
}

export default RewardRequire;
