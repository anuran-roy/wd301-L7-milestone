import React, { useState, useEffect } from 'react';
import LabelMultiselect from './Labels/LabelMultiselect';
import LabelSelect from './Labels/LabelSelect';
import LabelRadio from './Labels/LabelRadio';
import LabelText from './Labels/LabelText';
import LabelTextarea from './Labels/LabelTextarea';
import { formFieldMetaType, formFieldType, formItemType, formMetaType } from '../types/formTypes';
import { addFormField, fetchFormData, fetchFormFieldsData, request } from '../utils/apiUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form(props: {formId: number}) {
    const [formState, setFormState] = useState<formMetaType>({
        id: props.formId,
        title: "",
    });
    const [formFieldsState, setFormFieldsState] = useState<formFieldType[]>([]);
    const [newField, setNewField] = useState<string>("");
    const [fieldType, setFieldType] = useState<string>("");

    const addField = () => {
        let data: formFieldMetaType;
        switch(fieldType) {
            case "TEXT":
                data = {
                    kind: "TEXT",
                    label: newField,
                    // fieldType: "text",
                    value: "",
                };
                addFormField(formState, data);
                break;
            
            case "RADIO":
                data = {
                    kind: "RADIO",
                    label: newField,
                    // fieldType: "text",
                    value: "",
                };
                addFormField(formState, data);
                break;
            
            case "DROPDOWN":
                data = {
                    kind: "DROPDOWN",
                    label: newField,
                    // fieldType: "text",
                    value: "",
                };
                addFormField(formState, data);
                break;
            default:
                data = {
                    kind: "TEXT",
                    label: newField,
                    // fieldType: "text",
                    value: "",
                };
                addFormField(formState, data);
        }
        setNewField("");
        // window.location.reload();
    }

    const removeField = (id: number) => {
        setFormFieldsState(
            formFieldsState.filter((field) => {
            return field.id !== id;
          }),
        );

        request(`forms/${props.formId}/fields/${id}`, "DELETE", {});
      };
    
    const updateLabel = (label_value: string, id: number) => {
        setFormFieldsState(
            formFieldsState.map((field) => {
            if (field.id === id) {
              return {
                ...field,
                label: label_value,
              };
            }
    
            return field;
          }),
        );
      };
    
    const renderField = (field: formFieldType) => {
        switch(field.kind) {
            case "TEXT":
                return (<LabelText
                    id={field.id}
                    label={field.label}
                    fieldType="text"
                    value={field.value}
                    removeLabelCB={removeField}
                    updateLabelCB={updateLabel}
                    />);
                // break;
            // case "dropdown":
            //     return ();
            //     break;
            // case "radio":
            //     return ();
            default:
                return (<></>);
        }
    }

    useEffect(() => {
        toast("Form Page Loaded!");
        fetchFormData(setFormState, props.formId);
        fetchFormFieldsData(setFormFieldsState, props.formId);
    }, []);


    return <>
    <ToastContainer />
    {
        formFieldsState.map(field => renderField(field))
    }
    <div>
        Add Field: 
        <input
            className="py-4 bg-gray-100 border-2 px-3 mx-4 rounded-md"
            type="text"
            value={newField}
            placeholder="Enter field name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewField(e.target.value)}
        />

        <select id="fieldOptions" className="mx-2 rounded-md p-3" defaultValue={fieldType}>
            <option onClick={(_) => setFieldType("TEXT")} value="TEXT">Text</option>
            <option onClick={(_) => setFieldType("DROPDOWN")} value="DROPDOWN">Dropdown</option>
            <option onClick={(_) => setFieldType("RADIO")} value="RADIO">Radio</option>
            <option onClick={(_) => setFieldType("GENERIC")} value="GENERIC">Generic</option>
        </select>
        <button
        className="rounded-md px-3 bg-sky-500 text-white font-bold"
        onClick={addField}
        >Add</button>
    </div>
    </>;
}