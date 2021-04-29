import React from "react";
import DynamicSelect from "./DynamicSelect";

const Filters = (p: {
    slpf: React.Dispatch<React.SetStateAction<number>>,
    shpf: React.Dispatch<React.SetStateAction<number>>,
    spsf: React.Dispatch<React.SetStateAction<number>>,
    scf: React.Dispatch<React.SetStateAction<string>>,
    filtering: boolean
}) => {
    return (
        <>
            <form className={'form-inline mx-1 my-1 w-100'}>
                <fieldset className={'text-center w-100 p-0, m-0'} disabled={p.filtering}>
                    <label className={'d-inline mr-1'}>Filters:</label>
                    <input type={'number'} onChange={e => p.slpf(parseFloat(e.target.value))}
                           className={'mr-1 form-control-sm'} placeholder={'low price'} min={0}/>
                    <input type={'number'} onChange={e => p.shpf(parseFloat(e.target.value))}
                           className={'mr-1 form-control-sm'} placeholder={'high price'} min={0}/>
                    <input type={'number'} onChange={e => p.spsf(parseInt(e.target.value))}
                           className={'mr-1 form-control-sm'} placeholder={'page size'} min={1}/>
                </fieldset>
            </form>
                <DynamicSelect disabled={p.filtering} placeholder={'Filter Product by Category'} value={undefined}
                               changeListener={(newVal: string) => p.scf(newVal)} className={'form-control-sm mx-0 px-0 w-100 mb-3'}/>
        </>
    )
}

export default Filters;