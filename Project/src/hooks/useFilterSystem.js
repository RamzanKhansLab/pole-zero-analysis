import { useReducer, useCallback } from 'react';
import { getPreset, PRESETS } from '../core/dsp/presets.js';

// Action types
const ACTIONS = {
  SET_GAIN: 'SET_GAIN',
  ADD_POLE: 'ADD_POLE',
  ADD_ZERO: 'ADD_ZERO',
  UPDATE_POLE: 'UPDATE_POLE',
  UPDATE_ZERO: 'UPDATE_ZERO',
  DELETE_POLE: 'DELETE_POLE',
  DELETE_ZERO: 'DELETE_ZERO',
  LOAD_PRESET: 'LOAD_PRESET',
  RESET: 'RESET'
};

function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_GAIN:
      return { ...state, gain: action.payload };

    case ACTIONS.ADD_POLE:
      return { ...state, poles: [...state.poles, action.payload] };

    case ACTIONS.ADD_ZERO:
      return { ...state, zeros: [...state.zeros, action.payload] };

    case ACTIONS.UPDATE_POLE:
      return {
        ...state,
        poles: state.poles.map((p, i) => i === action.index ? action.payload : p)
      };

    case ACTIONS.UPDATE_ZERO:
      return {
        ...state,
        zeros: state.zeros.map((z, i) => i === action.index ? action.payload : z)
      };

    case ACTIONS.DELETE_POLE:
      return {
        ...state,
        poles: state.poles.filter((_, i) => i !== action.index)
      };

    case ACTIONS.DELETE_ZERO:
      return {
        ...state,
        zeros: state.zeros.filter((_, i) => i !== action.index)
      };

    case ACTIONS.LOAD_PRESET:
      return { ...action.payload };

    case ACTIONS.RESET:
      return { ...getPreset('lpf_3p2z') };

    default:
      return state;
  }
}

const initialState = { ...getPreset('lpf_3p2z') };

/**
 * Central filter system state management.
 */
export function useFilterSystem() {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setGain = useCallback((gain) => {
    dispatch({ type: ACTIONS.SET_GAIN, payload: gain });
  }, []);

  const addPole = useCallback((pole) => {
    dispatch({ type: ACTIONS.ADD_POLE, payload: pole });
  }, []);

  const addZero = useCallback((zero) => {
    dispatch({ type: ACTIONS.ADD_ZERO, payload: zero });
  }, []);

  const updatePole = useCallback((index, pole) => {
    dispatch({ type: ACTIONS.UPDATE_POLE, index, payload: pole });
  }, []);

  const updateZero = useCallback((index, zero) => {
    dispatch({ type: ACTIONS.UPDATE_ZERO, index, payload: zero });
  }, []);

  const deletePole = useCallback((index) => {
    dispatch({ type: ACTIONS.DELETE_POLE, index });
  }, []);

  const deleteZero = useCallback((index) => {
    dispatch({ type: ACTIONS.DELETE_ZERO, index });
  }, []);

  const loadPreset = useCallback((key) => {
    const preset = getPreset(key);
    if (preset) {
      dispatch({ type: ACTIONS.LOAD_PRESET, payload: preset });
    }
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  return {
    system: state,
    setGain,
    addPole,
    addZero,
    updatePole,
    updateZero,
    deletePole,
    deleteZero,
    loadPreset,
    reset
  };
}
