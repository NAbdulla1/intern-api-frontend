import React, {useEffect, useState} from "react";
import CategoryOption from "../models/CategoryOption";
import CreatableSelect from "react-select/creatable";
import {getCategoriesLike} from "../services/getCategoris";

const DynamicSelect = (p: {
    changeListener: Function, className: string | undefined,
    placeholder: string | undefined,
    value: CategoryOption | undefined,
    disabled: boolean | undefined
}) => {
    const onSelectChange = (category: CategoryOption) => p.changeListener(category.value);
    const [options, setOptions] = useState<CategoryOption[]>();
    const [categoryValue, setCategoryValue] = useState(p.value);

    useEffect(() => {
        promiseOptions('*')
            .then(async categories => setOptions(await categories))
            .catch(_ => setOptions([]));
    }, []);

    return (
        <CreatableSelect isDisabled={p.disabled}
                         value={categoryValue}
                         onCreateOption={newCat => {
                             setCategoryValue(new CategoryOption(newCat, newCat));
                             onSelectChange(new CategoryOption(newCat, newCat));
                         }}
                         placeholder={p.placeholder} className={p.className}
                         options={options} onChange={value => {
            if (value) onSelectChange(new CategoryOption(value['label'], value['value']))
        }}/>
    )
}

const promiseOptions = (val: string) => {
    return getCategoriesLike(val)
        .then((json) => {
            return json.map((category: string) => {
                return ({
                    'label': category,
                    'value': category
                });
            });
        })
        .catch((_) => {
            return [];
        });
}

export default DynamicSelect;