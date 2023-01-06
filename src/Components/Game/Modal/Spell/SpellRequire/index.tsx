// Libraries
import ozeilleImg from "../../../../../assets/img/ozeille.png";
import spellImg from "../../../../../assets/img/spell.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddOneCounteurValue,
  actionBuySpellDeleteTokenAndMap,
  actionReduceDoubleToken,
  actionChangeStatusDoubleToken,
  actionTokenTime,
  actionAddTokenTime,
  actionAddCounteurDeleteLife,
  actionAllSpellsBuy,
} from "../../../../../actions";
import { useState, useEffect } from "react";
import axios from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";

// Interface
interface spellProps {
  dataDescription: string;
  dataPrice: number;
  dataName: string;
  dataId: number;
}

// Function
function SpellRequire({
  dataDescription,
  dataPrice,
  dataName,
  dataId,
}: spellProps) {
  // Dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const token = useSelector((state: any) => state.token);
  const monsters_id = useSelector((state: any) => state.id_monster);
  const monsters_life = useSelector((state: any) => state.life);
  const monsters_name = useSelector((state: any) => state.name_monster);
  const current_theme = useSelector((state: any) => state.current_map_id);
  const current_theme_name = useSelector((state: any) => state.current_map);
  const counteur = useSelector((state: any) => state.counteur);
  const tokenPerSec = useSelector((state: any) => state.tokenPerSec);
  const counteurDeleteLife = useSelector(
    (state: any) => state.counteurDeleteLife
  );
  const [spellBuy, setSpellBuy] = useState(false);
  const allSpellsBuy = useSelector((state: any) => state.allSpellsBuy);
  const [saveBuySpell, setSaveBuySpell] = useState(false);

  const statusDoubleToken = useSelector(
    (state: any) => state.statusDoubleToken
  );
  const actionBigDeleteLife = useSelector(
    (state: any) => state.counteurDeleteLife
  );

  // ComponentDidMount
  useEffect(() => {
    allSpellsBuy.forEach((allSpells: any) => {
      if (allSpells.spell_id === dataId) {
        console.log(allSpells.id, dataId);
        setSpellBuy(true);
      }
    });
  }, []);

  useEffect(() => {
    if (
      monsters_id !== 0 &&
      current_theme !== 0 &&
      monsters_name !== "" &&
      current_theme_name !== ""
    ) {
      axios
        .post("/api/updateSave", {
          token: token,
          monsters_id: monsters_id,
          monsters_life: monsters_life,
          current_theme: current_theme,
          counteur: counteur,
          counteur_delete_life: counteurDeleteLife,
          token_per_sec: tokenPerSec,
        })
        .then((response) => response);
    }
  }, [saveBuySpell]);

  // Methods
  // Check if the tokens are higher than the price of the spell
  const handleCheckCount = () => {
    axios
      .post("/api/createSpell", {
        spell_id: dataId,
      })
      .then(() => {
        axios
          .get("/api/spells/" + dataId)
          .then((response) => {
            allSpellsBuy.push(response.data);
            dispatch(actionAllSpellsBuy(allSpellsBuy));
            setSpellBuy(true);
          })
          .catch((response) => {
            if (response.response.data.message === "Unauthenticated.") {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_name");
              navigate("/connexion");
            }
          });
      });

    handleCallSpell();
  };

  const handleCallSpell = () => {
    switch (dataName) {
      case "Double Click":
        {
          dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
          statusDoubleToken
            ? dispatch(actionAddOneCounteurValue(counteur + 2))
            : dispatch(actionAddOneCounteurValue(counteur + 1));
        }
        break;
      case "Triple Click":
        {
          if (counteur >= 2 || counteur <= 4) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            statusDoubleToken
              ? dispatch(actionAddOneCounteurValue(counteur + 2))
              : dispatch(actionAddOneCounteurValue(counteur + 1));
          }
        }
        break;
      case "Four Click":
        {
          if (counteur >= 3 && counteur <= 6 && counteur != 4) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            statusDoubleToken
              ? dispatch(actionAddOneCounteurValue(counteur + 2))
              : dispatch(actionAddOneCounteurValue(counteur + 1));
          }
        }
        break;
      case "Greed Click":
        {
          dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
          dispatch(actionAddOneCounteurValue(counteur * 2));
          dispatch(actionChangeStatusDoubleToken());
          setTimeout(() => {
            dispatch(actionReduceDoubleToken());
            dispatch(actionChangeStatusDoubleToken());
          }, 30000);
        }
        break;
      case "Clock Click":
        {
          dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
          dispatch(actionAddTokenTime(1));
        }
        break;
      case "Clock Two Click":
        {
          if (tokenPerSec == 1) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            dispatch(actionAddTokenTime(1));
          }
        }
        break;
      case "Clack Click":
        {
          dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
          dispatch(actionAddCounteurDeleteLife(1));
        }
        break;
      case "Boum Click":
        {
          if (counteurDeleteLife >= 2) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            dispatch(actionAddCounteurDeleteLife(1));
          }
        }
        break;
      case "Clock Tree Click":
        {
          if (tokenPerSec == 2) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            dispatch(actionAddTokenTime(1));
          }
        }
        break;
      case "Five Click":
        {
          if (counteur >= 4 && counteur <= 10 && counteur != 5) {
            dispatch(actionBuySpellDeleteTokenAndMap(token - dataPrice));
            statusDoubleToken
              ? dispatch(actionAddOneCounteurValue(counteur + 2))
              : dispatch(actionAddOneCounteurValue(counteur + 1));
          }
        }
        break;
      default: {
        console.log("spell non trouvée");
      }
    }
    setSaveBuySpell(!saveBuySpell);
  };

  return (
    <div
      className={
        "flex items-center rounded-3xl bg-sky-700 justify-between text-center"
      }
    >
      <img
        className="md:h-20 w-14 md:w-[10rem] object-fill rounded-bl-3xl rounded-tl-3xl"
        src={spellImg}
        alt="map stadium"
      />
      <p className="pl-2 text-white text-[12px] md:text-2xl font-bold">
        {dataDescription}
      </p>
      {token >= dataPrice && spellBuy === false && (
        <button
          onClick={handleCheckCount}
          className="pl-2 ml-2 text-sm md:text-xl text-white uppercase font-bold md:h-max rounded-br-3xl rounded-tr-3xl md:pt-6 md:pb-7 btn btn-warning w-1/4 md:w-1/6 flex flex-col md:flex-row justify-center p-7"
        >
          {dataPrice}
          <img
            className="w-6 hidden md:block md:ml-2 object-cover"
            src={ozeilleImg}
            alt="ozeille"
          />
        </button>
      )}

      {token < dataPrice && spellBuy === false && (
        <button
          disabled
          className="pl-2 ml-2 text-sm md:text-xl text-white uppercase font-bold md:h-max rounded-br-3xl rounded-tr-3xl md:pt-6 md:pb-7 btn btn-warning w-1/4 md:w-1/6 flex flex-col md:flex-row justify-center p-7"
        >
          <p className="ml-2">{dataPrice}</p>
          <img
            className="w-6 hidden md:block md:ml-2 object-cover"
            src={ozeilleImg}
            alt="ozeille"
          />
        </button>
      )}

      {spellBuy && (
        <button className="pl-2 text-sm md:text-xl text-white uppercase font-bold h-max rounded-br-3xl rounded-tr-3xl rounded-xl py-4 md:pt-6 md:pb-7 btn-error w-1/4 md:w-1/6 cursor-auto text-left md:text-center">
          Actif
        </button>
      )}
    </div>
  );
}

export default SpellRequire;
