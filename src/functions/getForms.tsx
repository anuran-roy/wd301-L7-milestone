import { formDataType, formItemType } from "../types/formTypes";

export const getForms: () => formDataType[] = () => {
  let savedFormsJSON = localStorage.getItem("savedForms");
  let persistentForms = savedFormsJSON ? JSON.parse(savedFormsJSON) : [];

  return persistentForms;
};

export const getFormItems: () => formItemType[] = () => {
  let savedFormItemsJSON = localStorage.getItem("savedFormItems");
  let persistentFormItems = savedFormItemsJSON
    ? JSON.parse(savedFormItemsJSON)
    : [];

  return persistentFormItems;
};
