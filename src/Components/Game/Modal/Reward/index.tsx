import axios from "../../../../config/axios";
import { useState, useEffect } from "react";
import RewardRequire from "./RewardRequire";
import { Loader } from "../../../Loader";
import imgReward from '../../../../assets/img/reward.jpg';

function Reward() {
  const [save, setSave] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get("/api/rewardSave").then((response) => {
      const data = response.data;
      setSave(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className='flex items-center justify-center '>
                <img
                    className='h-64 rounded-lg w-full object-cover '
                    src={imgReward}
                    alt='sort'
                />
            </div>
      <div className="border-x-2 border-gray-700 rounded-md">
      <div className="flex justify-between mt-4 border-gray-700 border-b-2 border-t-2 text-sm md:text-2xl items-center">
        <p className="lg:w-2/12 w-3/12  p-2 text-yellow-200 text-center">Pseudo</p>
        <p className="w-2/12 p-2 text-yellow-200 text-center">O'zeille</p>
        <p className="w-2/12 p-2 text-yellow-200 text-center">Monstre actuel</p>
        <p className="w-4/12 p-2 text-yellow-200 text-center">Point de vie restant du monstre</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        save.map((data: any) => <RewardRequire key={data.user_id} token={data.token} userId={data.user_id} monsters_id={data.monsters_id} monsters_life={data.monsters_life} />)
      )}
      </div>
    </div>
  );
}

export default Reward;
