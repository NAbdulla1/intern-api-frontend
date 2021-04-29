import {OptionTypeBase} from "react-select";

class CategoryOption implements OptionTypeBase {
    label: string;
    value: string;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

export default CategoryOption;