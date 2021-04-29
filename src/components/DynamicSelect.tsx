import React, {useEffect, useState} from "react";
import CategoryOption from "../models/CategoryOption";
import CreatableSelect from "react-select/creatable";
import {getCategoriesLike} from "../services/getCategoris";

const DynamicSelect = (p: {
    changeListener: Function,
    placeholder: string | undefined,
    value: CategoryOption | undefined,
    disabled: boolean | undefined
}) => {
    const onSelectChange = (category: CategoryOption) => p.changeListener(category.value);
    const [options, setOptions] = useState<CategoryOption[]>();
    const [categoryValue, setCategoryValue] = useState<CategoryOption | undefined | null>(p.value);

    useEffect(() => {
        promiseOptions('*')
            .then(async categories => setOptions(await categories))
            .catch(_ => setOptions([]));
    }, []);

    return (
        <div className={`row align-items-baseline`}>
            <div style={{width: '89%'}} className={'d-inline-block'}>
                <CreatableSelect isDisabled={p.disabled}
                                 value={categoryValue}
                                 onCreateOption={newCat => {
                                     setCategoryValue(new CategoryOption(newCat, newCat));
                                     onSelectChange(new CategoryOption(newCat, newCat));
                                 }}
                                 className={'form-control-sm'}
                                 placeholder={p.placeholder}
                                 options={options}
                                 onChange={value => {
                                     if (value) {
                                         setCategoryValue(value);
                                         onSelectChange(new CategoryOption(value['label'], value['value']))
                                     }
                                 }}/>
            </div>
            <button type={"button"} style={{width: '10%'}}
                    className={'btn btn-secondary d-inline-block m-0 px-0'}
                    onClick={() => {
                        setCategoryValue(null);
                        onSelectChange(new CategoryOption('', ''));
                    }} data-toggle="tooltip" data-placement="right" title="Clear Category">
                &times;
            </button>
        </div>
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