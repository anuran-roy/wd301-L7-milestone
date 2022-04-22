import { formDataType, formItemType } from "../types/formTypes";

export const saveForms = (localForms: formDataType[]) => {
  localStorage.setItem("savedForms", JSON.stringify(localForms));
};

export const saveFormItems = (localForms: formItemType[]) => {
  localStorage.setItem("savedFormItems", JSON.stringify(localForms));
};
