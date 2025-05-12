import { useReducer, useEffect } from 'react';

/**
 * State values for the AudioGenerator component
 */
type State = 'idle' | 'loading' | 'ready';

/**
 * Actions that transition the AudioGenerator state machine
 */
interface StartAction {
  type: 'START';
}
interface SuccessAction {
  type: 'SUCCESS';
  payload: { audioUrl: string };
}
interface ResetAction {
  type: 'RESET';
}

type Action = StartAction | SuccessAction | ResetAction;

/**
 * Reducer implementing the AudioGenerator state transitions.
 * - START  → loading
 * - SUCCESS → ready
 * - RESET  → idle
 */
function audioReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return 'loading';
    case 'SUCCESS':
      return 'ready';
    case 'RESET':
      return 'idle';
    default:
      return state;
  }
}

/**
 * Custom hook that exposes state, dispatch, and reset logic for AudioGenerator
 */
export function useAudioGeneratorReducer(resetKey: any) {
  const [state, dispatch] = useReducer(audioReducer, 'idle');

  // Reset back to idle whenever resetKey changes
  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [resetKey]);

  return { state, dispatch };
}

export type { State, Action, StartAction, SuccessAction, ResetAction };
