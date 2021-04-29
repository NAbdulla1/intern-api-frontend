import React from "react";
import DynamicSelect from "./DynamicSelect";

const Filters = (p: {
    slpf: React.Dispatch<React.SetStateAction<number>>,
    shpf: React.Dispatch<React.SetStateAction<number>>,
    spsf: Function,
    scf: React.Dispatch<React.SetStateAction<string>>,
    filtering: boolean,
    pageSize: number
}) => {
    return (
        <>
            <form className={'form-inline mx-1 my-1 w-100 align-items-end'}>
                <fieldset className={'text-center w-100 py-2 m-1 border rounded-lg px-0 mx-0'} disabled={p.filtering}>
                    <legend className={'w-auto'}><>Filters</>
                    </legend>
                    <input style={{width: '20%'}} type={'number'} onChange={e => p.slpf(parseFloat(e.target.value))}
                           className={'mr-1 form-control'} placeholder={'low price'} min={0}
                           data-toggle="tooltip" data-placement="right" title="Price Lower Bound"/>
                    <input style={{width: '20%'}} type={'number'} onChange={e => p.shpf(parseFloat(e.target.value))}
                           className={'mr-1 form-control'} placeholder={'high price'} min={0}
                           data-toggle="tooltip" data-placement="right" title="Price Upper Bound"/>
                    <input style={{width: '10%'}} type={'number'} onChange={e => p.spsf(parseInt(e.target.value))}
                           className={'mr-1 form-control'} placeholder={'page size'} min={1}
                           data-toggle="tooltip" data-placement="right" title="Page Size" value={p.pageSize}/>
                    <div style={{width: '40%', top: '2px'}} className={'d-inline-block ml-2 position-relative mr-2'}>
                        <DynamicSelect disabled={p.filtering}
                                       placeholder={'Filter Product by Category'}
                                       value={undefined}
                                       changeListener={(newVal: string) => p.scf(newVal)}/>
                    </div>
                </fieldset>
            </form>
        </>
    )
}

export default Filters;