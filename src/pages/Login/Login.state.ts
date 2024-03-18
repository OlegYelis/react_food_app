export interface FormState {
  isValid: {
    email: boolean;
    password: boolean;
  };
  values: {
    email: string;
    password: string;
  };
  isReadyToSubmit: boolean;
}

export type FormAction =
  | { type: "RESET_VALIDITY" }
  | { type: "SUBMIT" }
  | { type: "CLEAR" }
  | { type: "RESET_READY_STATUS" }
  | { type: "SET_VALUE"; payload: { [key: string]: string } };

export const INITIAL_STATE: FormState = {
  isValid: {
    email: true,
    password: true,
  },
  values: {
    email: "",
    password: "",
  },
  isReadyToSubmit: false,
};

export const formReducer = (
  state: FormState,
  action: FormAction
): FormState => {
  switch (action.type) {
    case "RESET_VALIDITY":
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const emailValidity = state.values.email?.trim().length ?? 0;
      const passwordValidity = state.values.password?.trim().length ?? 0;
      return {
        ...state,
        isValid: {
          email: emailValidity > 0,
          password: passwordValidity > 0,
        },
        isReadyToSubmit: emailValidity > 0 && passwordValidity > 0,
      };
    }
    case "CLEAR":
      return { ...state, values: INITIAL_STATE.values, isReadyToSubmit: false };

    case "RESET_READY_STATUS":
      return { ...state, isReadyToSubmit: false };

    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };

    default:
      return state;
  }
};
