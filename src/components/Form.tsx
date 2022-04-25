import React, { useState, useEffect } from 'react';
import LabelMultiselect from './Labels/LabelMultiselect';
import LabelSelect from './Labels/LabelSelect';
import LabelRadio from './Labels/LabelRadio';
import LabelText from './Labels/LabelText';
import LabelTextarea from './Labels/LabelTextarea';
import { formFieldMetaType, formFieldType, formItemType, formMetaType } from '../types/formTypes';
import { addFormField, fetchFormData, fetchFormFieldsData, request } from '../utils/apiUtils';

export default function Form(props: {formId: number}) {
    const [formState, setFormState] = useState<formMetaType>({
        id: 0,
        title: "",
    });
    const [formFieldsState, setFormFieldsState] = useState<formFieldType[]>([]);
    const [newField, setNewField] = useState<string>("");
    const [fieldType, setFieldType] = useState<string>("");

    const addField = () => {
        let data: formFieldMetaType;
        switch(fieldType) {
            case "Text":
                data = {
                    kind: "text",
                    label: newField,
                    // fieldType: "text",
                    value: "",
                };
                addFormField(formState, data);
        }
        setNewField("");
        // window.location.reload();
    }


    useEffect(() => {
        fetchFormData(setFormState, props.formId);
        fetchFormFieldsData(setFormFieldsState, props.formId);
    }, []);


    return <>
    {
        formFieldsState.map(field => <div>{JSON.stringify(field)}</div>)
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

        <select id="fieldOptions" className="mx-2 rounded-md p-3" defaultValue="TEXT">
            <option onClick={(_) => setFieldType("TEXT")}value="Text">Text</option>
            <option onClick={(_) => setFieldType("DROPDOWN")}value="Dropdown">Dropdown</option>
            <option onClick={(_) => setFieldType("RADIO")}value="Radio">Radio</option>
            <option onClick={(_) => setFieldType("GENERIC")}value="Generic">Generic</option>
        </select>
        <button
        className="rounded-md px-3 bg-sky-500 text-white font-bold"
        onClick={addField}
        >Add</button>
    </div>
    </>;
}