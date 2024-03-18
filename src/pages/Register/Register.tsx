import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Headling } from "../../components/Headling/Headling";
import { Input } from "../../components/Input/Input";
import { FormEvent, useEffect, useReducer, useRef } from "react";
import { FormState, INITIAL_STATE, formReducer } from "./Register.state";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../helpers/firebaseInit";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

import styles from "../Login/Login.module.css";

export const Register = () => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isReadyToSubmit, values } = formState;
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const focusEmpty = (isValid: FormState["isValid"]) => {
    switch (true) {
      case !isValid.name:
        nameRef.current?.focus();
        break;
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
    if (!isValid.name || !isValid.email || !isValid.password) {
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
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: values.name,
          })
            .then(() => {
              user.getIdToken().then((accessToken) => {
                dispatch(userActions.addJwt(accessToken));
                dispatchForm({ type: "CLEAR" });
                navigate("/");
              });
            })
            .catch((error) => {
              console.error("Error updating profile:", error.message);
            });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Notify.failure("Such email is already in use");
          } else {
            dispatchForm({ type: "RESET_READY_STATUS" });
            Notify.failure("Registration error: " + error.message);
            console.error("Registration error:", error.message);
          }
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
      <Headling>Registration </Headling>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.field}>
          <label htmlFor="name">Your name</label>
          <Input
            isValid={isValid.name}
            value={values.name}
            ref={nameRef}
            onChange={changeInputHandler}
            type="name"
            id="name"
            name="name"
            placeholder="Name"
          />
        </div>
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
        <Button appearence="big">Sign Up</Button>
      </form>
      <div className={styles.alternative}>
        <p>Have an account?</p>
        <Link to="/auth/login">Log in now</Link>
      </div>
    </div>
  );
};
