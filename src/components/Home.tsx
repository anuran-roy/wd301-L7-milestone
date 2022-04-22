import React, { useState, useEffect } from "react";
import { useQueryParams, navigate, Link } from "raviger";

// import logo from "../logo.svg";
import {getForms, getFormItems} from "../functions/getForms";
import {saveForms, saveFormItems} from "../functions/saveForms";

import { formDataType, formItemType, errorType } from "../types/formTypes";
import initialFormFields from "../presets/initialFormFields";

import Header from "./Header";

import Modal from "./common/Modal";
import CreateForm from "./CreateForm";
import AppContainer from "./AppContainer";
import { deleteFormAPI, listForms, me } from "../utils/apiUtils";
import { Pagination } from "../types/common";

export default function Home() {
  const localFormItems = getFormItems();
  const [listState, setListState] = useState<formItemType[]>(localFormItems);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const fetchFormData = async (setFormItemCB: (formItem: formItemType[]) => void) => {
    // const existing_forms: formItemType[] = getFormItems();
  
    try {
      const data: Pagination<formItemType> = await listForms({offset: offset, limit: 5});
      // const jsonData: formItemType[] = data.json();
      setFormItemCB(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const closeForm = () => {
    setOpenForm(false);
  }

  const mountForm = () => {
    setOpenForm(true);
  }
  
  useEffect(() => {
    fetchFormData(setListState);
    saveFormItems([...listState]);
  }, [offset]);

  useEffect(() => {
    fetchFormData(setListState);
    saveFormItems([...listState]);
  }, [limit]);

  useEffect(() => {
    const currentUser = me();

    if (currentUser === null) {
      navigate("/login");
    }
  }, []);
  const validateForm = (formItem: formItemType) => {
    const errors: errorType<formItemType>= {}
  
    if (formItem.title.length < 1) {
      errors.title = "Title is required";
    } else if(formItem.title.length > 100) {
      errors.title = "Title must be between 1 and 100 characters";
    }

    return errors;
  }


  // Search
  const [{ search }, setQueryParams] = useQueryParams();
  const [searchString, setSearchString] = useState("");

  const [currentFormId, setCurrentFormId] = useState<number>(0);
  const newForm = () => {
    const createdForm: formItemType = {
      created_date: new Date().toString(),
      hash: Number(new Date()),
      id: Number(new Date()),
      title: "Untitled Form",
      // formFields: initialFormFields,
    };
    // <Redirect to={`/form/${createdForm.id}`} />

    // Simulate an HTTP redirect:
    navigate(`/form/${createdForm.id}`);
    setCurrentFormId(createdForm.id);
  };

  const saveFormItem = (newFormItem: formItemType) => {
    setListState([...listState, newFormItem]);
    saveFormItems([...listState, newFormItem]);
  }

  const deleteForm = (formId: number) => {
    saveFormItems(listState.filter((form) => form.id !== formId));
    setListState(listState.filter((form) => form.id !== formId));
  };
  return (
    <>
      {/* <Header title="Home" /> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQueryParams({ search: searchString });
        }}
      >
        <input
          type="text"
          className="my-2 w-96 flex-1 border-0 p-2 text-4xl hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
          value={searchString}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target.value);
          }}
          placeholder="Enter search string..."
          name="search"
          id="searchTField"
          tabIndex={0}
        ></input>
      </form>
      <div className="flex">
        <div className="flex-1 items-center justify-center">
          {/* <p>Welcome to the Home Page</p> */}
          <button
            onClick={(_) => {
              newForm();
              navigate(`/create_form`);
              }
            }
            className="m-2 rounded-md p-2 text-sky-500 shadow-xl hover:bg-sky-700 hover:text-white"
          >
            New Form
          </button>
        </div>
        <div className="flex items-center justify-center">
        <label htmlFor="limitsInput">Entries per page:</label>
        <input
          type="number"
          className="my-2 w-48 flex-1 border-0 p-2 text-lg hover:border-b-2 hover:border-b-sky-500 focus:border-b-2 focus:border-b-sky-500 focus:outline-none focus:ring-0"
          value={limit}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLimit(Number(e.target.value));
          }}
          placeholder="Enter number of forms per page..."
          name="limit"
          id="limitsInput"
          tabIndex={1}
        ></input>
        </div>
      </div>
      <ul className="grid md:grid-cols-1 lg:grid-cols-2 justify-items-center">
        {listState
          .filter((form) =>
            form.title.toLowerCase().includes(search?.toLowerCase() || "")
          )
          .map((form, optionIndex) => {
            return (
              <li
                className="m-5 block max-w-md rounded-lg bg-white p-5 text-gray-700 shadow-xl"
                key={form.id}
              >
                <p className="m-2 flex justify-center text-2xl">{form.title}</p>
                <p>
                  <strong>Description: </strong>
                  {form.description}
                </p>
                <p>
                  <strong>Created on: </strong>
                  {form.created_date}
                </p>
                {/* <p>
                  <strong>Fields: </strong>
                  {form.formFields.length}
                </p> */}
                <ul className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-3 items-center justify-items-center">
                  <li
                  key={`${optionIndex}-1`} 
                  className="btn w-32 m-2 rounded-md bg-sky-500 p-2 font-bold text-white shadow-lg hover:bg-sky-700"
                  ><Link
                  href={`/preview/${form.id}`}
                >Preview Form</Link></li>
                  <li
                  key={`${optionIndex}-2`} 
                  ><button className="btn w-32 m-2 rounded-md bg-green-500 p-2 text-white font-bold shadow-lg hover:bg-green-700">
                  <Link href={`/form/${form.id}`}>Edit Form</Link>
                  </button></li>
                <li
                key={`${optionIndex}-3`}
                ><button
                  className="btn cursor-pointer w-32 m-2 rounded-md bg-red-500 p-2 text-white font-bold shadow-lg hover:bg-red-700"
                  onClick={(_) => {
                    deleteForm(form.id);
                    deleteFormAPI(form.id);
                  }}
                >
                  Delete Form
                </button></li>
                </ul>
              </li>
            );
          })}
      </ul>
      
      <div className="grid grid-cols-2 items-center">
      <button
        type="button"
        className="my-3 p-3 mx-3 rounded-md bg-sky-500 hover:bg-sky-700 text-white font-bold"
        onClick={(_) => {
          if (offset > 0){
          setOffset(offset-1);}
          else {
            alert("You're at the first page!");
          }
        }}
      >&lt; Previous
      </button>
      <button
        type="button"
        className="my-3 p-3 mx-3 rounded-md bg-sky-500 hover:bg-sky-700 text-white font-bold"
        onClick={(_) => {
          setOffset(offset+1);
        }}
      >Next &gt;
      </button>
      </div>
      
      {/* <CreateForm 
        open={openForm}
        closeCB={closeForm}
        saveForm={saveFormItem}
      /> */}
      {/* </CreateForm> */}
      {/* <Modal open={openForm} closeCB={closeForm} >
        <Form formId={currentFormId} />
      </Modal> */}
  </>);
}
