import { saveCells } from './../action-creators/index';
import { RootState } from './../reducers/index';
import { ActionType } from './../action-types/index';
import { Dispatch } from 'redux';
import { Action } from '../actions';
// here we implemnt redux middleware for saving cells changes
export const persistMiddleware = ({
  dispatch,
  getState
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  let timer: any;

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (
        [
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.DELETE_CELL,
        ].includes(action.type)
      ) {
        console.log('timer.b: ', timer);
        if (timer) {
          clearTimeout(timer);
        }
        console.log('timer.a: ', timer);
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};