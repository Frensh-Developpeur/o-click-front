// Actions
import {
    ADD_TOKEN,
    ADD_ONE_COUNTEUR,
    BUY_ONE_SPELL,
    REDUCE_DOUBLE_TOKEN,
    CHANGE_STATUS_DOUBLE_TOKEN,
    TOKEN_TIME,
    ADD_TOKEN_TIME,
    DELETE_LIFE,
    ADD_COUNTEUR_DELETE_LIFE,
    ROUND_LIFE,
    INITIAL_TOKEN,
    MONSTERS_LIFE,
    ID_MONSTER,
    NAME_MONSTER,
    ID_MONSTER_ADD,
    CURRENT_MAP_ID,
    CURRENT_MAP,
    ALL_MAPS_BUY,
    MUTED,
    LIFE_MAX_VALUE,
    ALL_SPELLS_BUY,
    INITIAL_TOKEN_PER_SEC,
    INITIAL_COUNTEUR_DELETE_LIFE,
    REWARD_USER,
} from '../actions';

// States
export const initialState = {
    token: 0,
    counteur: 1,
    statusDoubleToken: false,
    tokenPerSec: 0,
    life: 0,
    counteurDeleteLife: 0.05,
    name_monster: '',
    life_max_value: 0,
    id_monster: 0,
    current_map_id: 0,
    current_map: '',
    allMapsBuy: [],
    allSpellsBuy: [],
    rewardUser: [],
    muted: false,
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIAL_TOKEN:
            return {
                ...state,
                token: action.value,
            };
        case INITIAL_TOKEN_PER_SEC:
            return {
                ...state,
                tokenPerSec: action.value,
            };
        case INITIAL_COUNTEUR_DELETE_LIFE:
            return {
                ...state,
                counteurDeleteLife: action.value,
            };
        case ID_MONSTER:
            return {
                ...state,
                id_monster: action.value,
            };
        case MUTED:
            return {
                ...state,
                muted: !state.muted,
            };
        case ALL_MAPS_BUY:
            return {
                ...state,
                allMapsBuy: action.value,
            };
        case ALL_SPELLS_BUY:
            return {
                ...state,
                allSpellsBuy: action.value,
            };
        case LIFE_MAX_VALUE:
            return {
                ...state,
                life_max_value: action.value,
            };
        case NAME_MONSTER:
            return {
                ...state,
                name_monster: action.value,
            };
        case MONSTERS_LIFE:
            return {
                ...state,
                life: action.value,
            };
        case CURRENT_MAP_ID:
            return {
                ...state,
                current_map_id: action.value,
            };

        case CURRENT_MAP:
            return {
                ...state,
                current_map: action.value,
            };
        case ID_MONSTER_ADD:
            return {
                ...state,
                id_monster: state.id_monster + 1,
            };

        case ADD_TOKEN:
            return {
                ...state,
                token: state.token + state.counteur,
            };

        case ADD_ONE_COUNTEUR:
            return {
                ...state,
                counteur: action.payload.newValue,
            };

        case BUY_ONE_SPELL:
            return {
                ...state,
                token: action.payload.newValue,
            };
        case TOKEN_TIME:
            return {
                ...state,
                token: state.token + state.tokenPerSec,
            };
        case REDUCE_DOUBLE_TOKEN:
            return {
                ...state,
                counteur: state.counteur / 2,
            };
        case CHANGE_STATUS_DOUBLE_TOKEN:
            return {
                ...state,
                statusDoubleToken: !state.statusDoubleToken,
            };

        case ADD_TOKEN_TIME:
            return {
                ...state,
                tokenPerSec: action.value + state.tokenPerSec,
            };
        case DELETE_LIFE:
            return {
                ...state,
                life: state.life - state.counteurDeleteLife,
            };
        case ADD_COUNTEUR_DELETE_LIFE:
            return {
                ...state,
                counteurDeleteLife:
                    state.counteurDeleteLife + action.value,
            };
        case ROUND_LIFE:
            return {
                ...state,
                life: Math.round(state.life * 100) / 100,
            };
        default:
            return state;
    }
};

export default reducer;
