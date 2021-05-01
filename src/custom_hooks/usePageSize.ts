import {useState} from "react";

const usePageSize = (initial: number) => {
    const pageSizeKey = 'prod_page_size';
    const getPageSize = () => {
        let ps = sessionStorage.getItem(pageSizeKey);
        return parseInt(ps ?? '10') ?? initial;
    }

    const [pageSize, setPageSize] = useState(getPageSize);

    const storePageSize = (newPageSize: number) => {
        newPageSize = isNaN(newPageSize) || !isFinite(newPageSize) || newPageSize === 0 ? getPageSize() : newPageSize;
        sessionStorage.setItem(pageSizeKey, newPageSize.toString());
        setPageSize(newPageSize);
    }

    return {
        pageSizeFilter: pageSize,
        setPageSizeFilter: storePageSize
    }
}

export default usePageSize;