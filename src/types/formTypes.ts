export type stringOrnumber = string | number;

export type textFieldTypes =
  | "text"
  | "email"
  | "url"
  | "password"
  | "number"
  | "tel"
  | "date";

export type TextField = {
  id: number;
  kind: "text";
  label: string;
  fieldType: string;
  value: string;
};

export type DropdownField = {
  id: number;
  kind: "dropdown";
  label: string;
  options: string[];
  value: string;
};

export type RadioField = {
  id: number;
  kind: "radio";
  label: string;
  options: string[];
  value: string;
};

export type MultiselectField = {
  id: number;
  kind: "multiselect";
  label: string;
  options: string[];
  value: string[];
};

export type TextareaField = {
  id: number;
  kind: "textarea";
  label: string;
  value: string;
};
export type formFieldType =
  | TextField
  | DropdownField
  | RadioField
  | MultiselectField
  | TextareaField;

export type fieldKind =
  | "text"
  | "dropdown"
  | "radio"
  | "multiselect"
  | "textarea";

export interface formDataType {
  created_on: string;
  id: number;
  hash: number;
  title: string;
  formFields: formFieldType[];
}

// export type formItemType = Omit<formDataType, "formFields">;

export type formItemType = {
  id: number;
  title: string;
  hash?: number;
  description?: string;
  is_public?: boolean;
  created_by?: number;
  created_date?: string;
  modified_date?: string;
  formFields?: formFieldType[];
};

export type errorType<T> = Partial<Record<keyof T, string>>;

export const validateForm = (formItem: formItemType) => {
  const errors: errorType<formItemType> = {};

  if (formItem.title.length < 1) {
    errors.title = "Title is required";
  } else if (formItem.title.length > 100) {
    errors.title = "Title must be between 1 and 100 characters";
  }

  return errors;
};

export type updateText = {
  type: "update_text";
  updated_value: string;
  id: number;
};

export type updateTextarea = {
  type: "update_textarea";
  updated_value: string;
  id: number;
};

export type updateSelect = {
  type: "update_select";
  updated_value: string;
  id: number;
};

export type updateMultiselect = {
  type: "update_multiselect";
  updated_value: string[];
  id: number;
};

export type updatePreviewAction =
  | updateText
  | updateTextarea
  | updateSelect
  | updateMultiselect;

export function itemAt<T>(index: number, arr: T[]): T {
  return arr[index];
}

// type User = {
//   name: string;
//   age: number;
//   email: string;
// }

// type PartialUser = {
//   name: string;
//   age: number;
// }

// enum ActionTypes {
//   ADD_FIELD,
//   REMOVE_FIELD,
// }

type AddAction = {
  type: "add_field";
  kind: fieldKind;
  label: string;
  callback: () => void;
};

type RemoveAction = {
  type: "remove_field";
  id: number;
};

type UpdateTitle = {
  type: "update_title";
  title: string;
};

type UpdateDescription = {
  type: "update_description";
  description: string;
};

type UpdateLabel = {
  type: "update_label";
  id: number;
  updatedLabel: string;
};

type RemoveLabel = {
  type: "remove_label";
  id: number;
};

type AddOption = {
  type: "add_option";
  option: string;
  id: number;
};

type RemoveOption = {
  type: "remove_option";
  option: string;
  field_id: number;
};

export type formAction =
  | AddAction
  | RemoveAction
  | UpdateTitle
  | UpdateDescription
  | AddOption
  | RemoveOption
  | UpdateLabel
  | RemoveLabel;

export type ChangeText = {
  type: "change_text";
  value: string;
};

export type ClearText = {
  type: "clear_text";
};

export type newFieldActions = ChangeText | ClearText;
