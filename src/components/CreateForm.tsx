import React, { useState, useEffect } from "react";
import { errorType, formItemType, validateForm } from "../types/formTypes";
import { saveFormItems } from "../functions/saveForms";
import { getFormItems } from "../functions/getForms";
import { navigate } from "raviger";
import Modal from "./common/Modal";
import Header from "./Header";
import AppContainer from "./AppContainer";
import { createForm } from "../utils/apiUtils";
export default function CreateForm(props: {
  // open: boolean;
  // closeCB: () => void;
  // saveForm: (form: formItemType) => void;
}) {
  const [formSaved, setFormSaved] = useState<boolean>(false);

  const newForm: () => formItemType = () => {
    const createdForm: formItemType = {
      created_date: new Date().toString(),
      hash: Number(new Date()),
      id: Number(new Date()),
      title: "Untitled Form",
      description: "Random description",
      // formFields: initialFormFields,
    };
    // setListState([...listState, createdForm]);
    // saveFormItems([...listState, createdForm]);
    // <Redirect to={`/form/${createdForm.id}`} />

    // Simulate an HTTP redirect:
    return createdForm;
  };

  const [currentForm, setCurrentForm] = useState<formItemType>(() => newForm());

  const saveCurrentForm = () => {
    setFormSaved(true);
  };

  useEffect(() => {
    // props.saveForm(currentForm);
    saveFormItems([
      ...getFormItems().filter((formItem) => formItem.id !== currentForm.id),
      currentForm,
    ]);
    // navigate(`/form/${currentForm.id}`);
  }, [formSaved === true]);

  const discardPreview = () => {
    setFormSaved(false);
    saveFormItems(getFormItems().filter((form) => form.id !== currentForm.id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: errorType<formItemType> = validateForm(currentForm);

    if (Object.keys(errors).length === 0) {
      try {
        const data = await createForm(currentForm);
        navigate(`/form/${data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {/* <Header title="Home" /> */}
      <input
        type="text"
        className="my-2 h-14 w-96 flex-1 items-center border-0 p-2 text-center text-4xl hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
        // value={formState.title}
        value={currentForm.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // setTitle(props.formId, e.target.value);
          // dispatchAction({ type: "update_title", title: e.target.value });
          setCurrentForm({
            ...currentForm,
            title: e.target.value,
          });
        }}
        placeholder="Enter form name..."
        id="formTitle"
      ></input>
      <br />
      <input
        type="text"
        className="my-2 h-14 w-96 flex-1 items-center border-0 p-2 text-center text-lg hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
        // value={formState.title}
        value={currentForm.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // setTitle(props.formId, e.target.value);
          // dispatchAction({ type: "update_title", title: e.target.value });
          setCurrentForm({
            ...currentForm,
            description: e.target.value,
          });
        }}
        placeholder="Enter form description..."
        id="formDescription"
      ></input>
      <br />
      <button
        // onClick={saveCurrentForm}
        type="submit"
        className="btn btn-primary m-3 rounded-md bg-green-500 p-2 font-bold text-white"
      >
        Save
      </button>
      <button
        onClick={(_) => navigate("/")}
        className="btn btn-primary m-3 rounded-md bg-blue-500 p-2 font-bold text-white"
      >
        Close
      </button>
      <button
        className="btn btn-primary m-3 rounded-md bg-orange-500 p-2 font-bold text-white"
        onClick={(_) => {
          discardPreview();
          navigate("/");
        }}
      >
        Discard
      </button>
    </form>
  );
}
