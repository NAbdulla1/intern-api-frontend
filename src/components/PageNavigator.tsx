import React from "react";

const PageNavigator = (p: { currentPageNumber: number, setPageNum: Function, totalPages: number }) => {
    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={(p.currentPageNumber > 1) ? "page-item" : "page-item disabled"}>
                    <button
                        onClick={() => p.setPageNum(Math.max(1, p.currentPageNumber - 1))}
                        className="page-link"
                        type={"button"}
                        tabIndex={(p.currentPageNumber <= 1) ? -1 : undefined}>Previous
                    </button>
                </li>
                {
                    ((function (st: number, end: number) {
                        const arr = [];
                        for (let pn = st; pn < end; pn++) {
                            arr.push(<li key={pn} className={"page-item"}>
                                <button
                                    onClick={() => p.setPageNum(pn)}
                                    className="page-link"
                                    type={'button'}>{pn}</button>
                            </li>);
                        }
                        return arr;
                    })(Math.max(1, p.currentPageNumber - 3), p.currentPageNumber))
                }
                <li className="page-item active">
                    <button className="page-link" type={'button'}>{p.currentPageNumber}</button>
                </li>
                {
                    ((function (st: number, end: number) {
                        const arr = [];
                        for (let pn = st; pn <= end; pn++) {
                            arr.push(<li key={pn} className={"page-item"}>
                                <button
                                    onClick={() => p.setPageNum(pn)}
                                    className="page-link"
                                    type={'button'}>{pn}</button>
                            </li>);
                        }
                        return arr;
                    })(p.currentPageNumber + 1, Math.min(p.currentPageNumber + 3, p.totalPages)))
                }

                <li className={(p.currentPageNumber >= p.totalPages) ? "page-item disabled" : "page-item"}>
                    <button
                        onClick={() => p.setPageNum(p.currentPageNumber + 1)}
                        className="page-link"
                        type={"button"}
                        tabIndex={(p.currentPageNumber >= p.totalPages) ? -1 : undefined}>Next
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default PageNavigator;