export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ONE_COUNTEUR = "ADD_ONE_COUNTEUR";
export const BUY_ONE_SPELL = "BUY_ONE_SPELL";
export const REDUCE_DOUBLE_TOKEN = "REDUCE_DOUBLE_TOKEN";
export const CHANGE_STATUS_DOUBLE_TOKEN = "CHANGE_STATUS_DOUBLE_TOKEN";
export const TOKEN_TIME = "TOKEN_TIME";
export const ADD_TOKEN_TIME = "ADD_TOKEN_TIME";
export const DELETE_LIFE = "DELETE_LIFE";
export const ADD_COUNTEUR_DELETE_LIFE = "ADD_COUNTEUR_DELETE_LIFE";
export const ROUND_LIFE = "ROUND_LIFE";
export const INITIAL_TOKEN = "INITIAL_TOKEN";
export const MONSTERS_LIFE = "MONSTERS_LIFE";
export const NAME_MONSTER = "NAME_MONSTER";
export const ID_MONSTER = "ID_MONSTER";
export const ID_MONSTER_ADD = 'ID_MONSTER_ADD';
export const CURRENT_MAP_ID = "CURRENT_MAP_ID";
export const CURRENT_MAP = "CURRENT_MAP";
export const ALL_MAPS_BUY = "ALL_MAPS_BUY";
export const MUTED = "MUTED";
export const ALL_SPELLS_BUY = "ALL_SPELLS_BUY";
export const LIFE_MAX_VALUE = "LIFE_MAX_VALUE";
export const INITIAL_TOKEN_PER_SEC ="INITIAL_TOKEN_PER_SEC";
export const INITIAL_COUNTEUR_DELETE_LIFE = "INITIAL_COUNTEUR_DELETE_LIFE";
export const REWARD_USER = "REWARD_USER";



export function actionInitialToken(newValue: number) {
  return {
    type: INITIAL_TOKEN,
    value: newValue,
  };
}

export function actionInitialTokenPerSec(newValue: number) {
  return {
    type: INITIAL_TOKEN_PER_SEC,
    value: newValue,
  };
}

export function actionInitialRewardUser(newValue: any[]) {
  return {
    type: REWARD_USER,
    value: newValue,
  };
}

export function actionInitialCounteurDeleteLife(newValue: number) {
  return {
    type: INITIAL_COUNTEUR_DELETE_LIFE,
    value: newValue,
  };
}

export function actionMuted() {
  return {
    type: MUTED,
  };
}

export function actionLifeMaxValue(newValue : number) {
  return {
    type: LIFE_MAX_VALUE,
    value : newValue
  };
}


export function actionAllMapsBuy(newValue: any[]) {
  return {
    type: ALL_MAPS_BUY,
    value: newValue,
  };
}


export function actionAllSpellsBuy(newValue: any[]) {
  return {
    type: ALL_SPELLS_BUY,
    value: newValue,
  };
}

export function actionNameMonster(newValue: string) {
  return {
    type: NAME_MONSTER,
    value: newValue,
  };
}
export function actionIdMonster(newValue: number) {
  return {
    type: ID_MONSTER,
    value: newValue,
  };
}

export function actionLifeMonster(newValue: number) {
  return {
    type: MONSTERS_LIFE,
    value: newValue,
  };
}

export function actionIdMonsterAdd() {
  return {
    type: ID_MONSTER_ADD,
  };
}

export function actionCurrentMapId(newValue : number) {
  return {
    type: CURRENT_MAP_ID,
    value: newValue
  };
}
export function actionCurrentMap(newValue : string) {
  return {
    type: CURRENT_MAP,
    value: newValue
  };
}

export function actionAddToken() {
  return {
    type: ADD_TOKEN,
  };
}

export function actionAddOneCounteurValue(newValue: number) {
  return {
    type: ADD_ONE_COUNTEUR,
    payload: {
      newValue,
    },
  };
}

export function actionBuySpellDeleteTokenAndMap(newValue: number) {
  return {
    type: BUY_ONE_SPELL,
    payload: {
      newValue,
    },
  };
}

export function actionChangeStatusDoubleToken() {
  return {
    type: CHANGE_STATUS_DOUBLE_TOKEN,
  };
}

export function actionReduceDoubleToken() {
  return {
    type: REDUCE_DOUBLE_TOKEN,
  };
}

export function actionTokenTime() {
  return {
    type: TOKEN_TIME,
  };
}
export function actionAddTokenTime(newValue: number) {
  return {
    type: ADD_TOKEN_TIME,
    value: newValue,
  };
}

export function actionDeleteLife() {
  return {
    type: DELETE_LIFE,
  };
}
export function actionAddCounteurDeleteLife(newValue: number) {
  return {
    type: ADD_COUNTEUR_DELETE_LIFE,
    value: newValue,
  };
}

export function actionRoundLife() {
  return {
    type: ROUND_LIFE,
  };
}
