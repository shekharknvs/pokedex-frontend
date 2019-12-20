import { ERROR } from '../constants';

export const getActionsWithPayload = type => {
  return payload =>{
    return {
      type,
      payload
    };
  };
};

export const throwError = getActionsWithPayload(ERROR);