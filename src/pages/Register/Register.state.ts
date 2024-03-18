export interface FormState {
  isValid: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
  values: {
    name: string;
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
    name: true,
    email: true,
    password: true,
  },
  values: {
    name: "",
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
      const nameValidity = state.values.name?.trim().length ?? 0;
      const emailValidity = state.values.email?.trim().length ?? 0;
      const passwordValidity = state.values.password?.trim().length ?? 0;
      return {
        ...state,
        isValid: {
          name: nameValidity > 0,
          email: emailValidity > 0,
          password: passwordValidity > 0,
        },
        isReadyToSubmit:
          nameValidity > 0 && emailValidity > 0 && passwordValidity > 0,
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
