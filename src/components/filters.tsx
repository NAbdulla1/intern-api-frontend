import React from "react";

const Filters = (p: {
    slpf: React.Dispatch<React.SetStateAction<number>>,
    shpf: React.Dispatch<React.SetStateAction<number>>,
    spsf: React.Dispatch<React.SetStateAction<number>>,
    scf: React.Dispatch<React.SetStateAction<string>>,
    filtering: boolean
}) => {
    return (
        <form className={'form-inline mx-0'} style={{maxWidth: '80%'}}>
            <fieldset>
                <input type={'number'} onChange={e => p.slpf(parseFloat(e.target.value))}
                       className={'mr-1 form-control-sm'}
                       style={{maxWidth: '25%'}} placeholder={'low price'}/>
                <input type={'number'} onChange={e => p.shpf(parseFloat(e.target.value))}
                       className={'mr-1 form-control-sm'}
                       style={{maxWidth: '25%'}} placeholder={'high price'}/>
                <input type={'number'} onChange={e => p.spsf(parseInt(e.target.value))}
                       className={'mr-1 form-control-sm'}
                       style={{maxWidth: '25%'}} placeholder={'page size'}/>
                <select onChange={e => p.scf(e.target.value)} className={'form-control-sm'}
                        style={{maxWidth: '25%'}}>
                    <option value={""}> All Category</option>
                    <option>cat1</option>
                    <option>cat2</option>
                    <option>cat3</option>
                </select>
            </fieldset>
        </form>
    )
}

export default Filters;