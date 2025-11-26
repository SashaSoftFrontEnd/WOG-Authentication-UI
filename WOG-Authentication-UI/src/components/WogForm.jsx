import clsx from "clsx";
import { useState } from "react";
import * as Yup from "yup";
import "./WogForm.css";

const iconClear = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const nameSchema = Yup.string()
  .trim()
  .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+$/, "Некоректне ім'я")
  .min(3, "Закоротке ім’я")
  .max(40, "Заважке ім’я")
  .required("Введіть ваше ім’я");

const WogForm = () => {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateName = (value) => {
    try {
      nameSchema.validateSync(value);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const clearField = () => {
    setName("");
    setTouched(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateName(name);
    setTouched(true);
    if (error || name.trim() === "") return;

    setSubmitted(true);
    console.log("SUBMIT:", { name });
    setTimeout(() => setSubmitted(false), 1200);
  };

  return (
    <div className="page">
      <div className="page__container">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h1 className="registration-form__title">WOG PRIDE</h1>

          <div className="form-field">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched) validateName(e.target.value);
              }}
              onBlur={() => {
                setTouched(true);
                validateName(name);
              }}
              className={clsx(
                "form-field__input",
                touched && error && "is-error",
                touched && !error && name !== "" && "is-success"
              )}
            />

            <label
              htmlFor="name"
              className={clsx(
                "form-field__label form-field__label--float",
                name !== "" && "float-active",
                touched && error && "label-error",
                touched && !error && name !== "" && "label-success"
              )}
            >
              Ведить імʼя
            </label>

            {name !== "" && (
              <button
                type="button"
                className="clear-button"
                onClick={clearField}
              >
                {iconClear}
              </button>
            )}

            {touched && error && (
              <span className="form-field__error">{error}</span>
            )}
          </div>

          <button
            type="submit"
            className={clsx(
              "registration-form__button",
              submitted && "button-success"
            )}
          >
            Увійти
          </button>

          <p className="registration-form__footer">
            Ще не маєте акаунт?{" "}
            <a className="registration-form__link" href="#">
              Створити
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default WogForm;

