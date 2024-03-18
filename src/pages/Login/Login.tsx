import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import { Input } from "../../components/Input/Input";
import { FormEvent, useEffect, useReducer, useRef } from "react";
import { FormState, INITIAL_STATE, formReducer } from "./Login.state";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../helpers/firebaseInit";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

import styles from "./Login.module.css";

export const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isReadyToSubmit, values } = formState;
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const focusEmpty = (isValid: FormState["isValid"]) => {
    switch (true) {
      case !isValid.email:
        emailRef.current?.focus();
        break;
      case !isValid.password:
        passwordRef.current?.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    focusEmpty(isValid);
    if (!isValid.email || !isValid.password) {
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isReadyToSubmit) {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          user.getIdToken().then((accessToken) => {
            dispatch(userActions.addJwt(accessToken));
            dispatchForm({ type: "CLEAR" });
            navigate("/");
          });
        })
        .catch((error) => {
          dispatchForm({ type: "RESET_READY_STATUS" });
          Notify.failure("Invalid login or password");
          console.error(error.message);
        });
    }
  }, [isReadyToSubmit, values, navigate, dispatch]);

  const changeInputHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [evt.target.name]: evt.target.value },
    });
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  return (
    <div className={styles.login}>
      <Headling>Log In</Headling>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.field}>
          <label htmlFor="email">Your email</label>
          <Input
            isValid={isValid.email}
            value={values.email}
            ref={emailRef}
            onChange={changeInputHandler}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Your password</label>
          <Input
            isValid={isValid.password}
            value={values.password}
            ref={passwordRef}
            onChange={changeInputHandler}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Button appearence="big">LogIn</Button>
      </form>
      <div className={styles.alternative}>
        <p>No account?</p>
        <Link to="/auth/register">Register now</Link>
      </div>
    </div>
  );
};
