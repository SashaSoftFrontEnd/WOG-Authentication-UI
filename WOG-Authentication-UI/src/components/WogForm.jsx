import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import "./WogForm.css";

const WogForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+$/, "Некоректне ім'я")
        .min(3, "Закоротке ім’я")
        .max(40, "Заважке ім’я")
        .required("Введіть ваше ім’я"),
    }),

    onSubmit: (values) => {
      setSubmitted(true);
      console.log("SUBMIT:", values);

      setTimeout(() => setSubmitted(false), 1200);
    },
  });

  // CLEAR BUTTON FUNCTION
  const clearField = () => {
    formik.setFieldValue("name", "");
    formik.setTouched({ ...formik.touched, name: false });
  };

  return (
    <div className="page">
      <div className="page__container">
        <form className="registration-form" onSubmit={formik.handleSubmit}>
          <h1 className="registration-form__title">WOG PRIDE</h1>

          {/* ===== FIELD ===== */}
          <div className="form-field">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=" "
              className={clsx(
                "form-field__input",
                formik.touched.name && formik.errors.name && "is-error",
                formik.touched.name && !formik.errors.name && "is-success"
              )}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="name"
              className={clsx(
                "form-field__label form-field__label--float",
                formik.values.name !== "" && "float-active",
                formik.touched.name && formik.errors.name && "label-error",
                formik.touched.name && !formik.errors.name && "label-success"
              )}
            >
              Ведить імʼя
            </label>

            {/* CLEAR BUTTON */}
            {formik.values.name !== "" && (
              <button
                type="button"
                className="clear-button"
                onClick={clearField}
              >
                ✕
              </button>
            )}

            {/* ERROR */}
            {formik.touched.name && formik.errors.name && (
              <span className="form-field__error">{formik.errors.name}</span>
            )}
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <button
            type="submit"
            className={clsx(
              "registration-form__button",
              submitted && "button-success"
            )}
          >
            Увійти
          </button>

          {/* ===== FOOTER ===== */}
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

