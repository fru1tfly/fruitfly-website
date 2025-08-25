import { FormValueType } from "types/FormValueType";



export function getFormDataKeys(mapping) {
    let keys = [];
    
    Object.keys(mapping).forEach(key => {
        addKeys(key, mapping[key], keys);
    });

    return keys;
}

export function normalizeFormData(data, mapping) {
    const newValues = {...data.value};
    for(const [key, value] of Object.entries(newValues)) {
        const field = findInMapping(key, mapping);

        if (value && field && field.type === FormValueType.MULTISELECT) {
            newValues[key] = value.join(field.joinCharacter);
        }

        if (!value && field && field.placeholder) {
            newValues[key] = field.placeholder;
        } else if (!value) {
            delete newValues[key];
        }
    }

    return {
        value: newValues,
        setter: data.setter
    }
}

export function extractErrorMessage(errors) {
    const hasError = errors?.length > 0;
    const errorMessage = hasError ? errors[0] : '';
    return errorMessage;
}

const addKeys = (key, value, keys) => {
    if (value.type === FormValueType.COLUMNS) {
        for (const column of value.columns) {
            Object.keys(column).forEach(k => {
                addKeys(k, column[k], keys);
            });
        }
    } else if (value.type === FormValueType.HEADER) {
        Object.keys(value.children).forEach(k => {
            addKeys(k, value.children[k], keys);
        })
    } else {
        keys.push(key);
    }
}

export const findInMapping = (key, mapping) => {
    for(const field in mapping) {
        if (field === key) {
            return mapping[field];
        }
        if (mapping[field].children) {
            const keyInChild = findInMapping(key, mapping[field].children);
            if (keyInChild) return keyInChild;
        } else if (mapping[field].columns) {
            for (const column of mapping[field].columns) {
                const keyInChild = findInMapping(key, column);
                if (keyInChild) return keyInChild;
            }
        }
    }
    return null;
}
