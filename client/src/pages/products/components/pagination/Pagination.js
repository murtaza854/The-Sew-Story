import React from 'react';
import './Pagination.scss';

function Pagination(props) {
    const onClick = (page, button) => {
        if (page !== 0 && button === 'left') props.setPage(page - 1);
        else if (page + 1 < props.totalPages && button === 'right') props.setPage(page + 1);
        else if (button === 'number') props.setPage(page);
    };
    return (
        <div className="pagination">
            <div className="pagination__item" onClick={_ => onClick(props.page, 'left')}>
                <i className="fa fa-angle-left"></i>
            </div>
            <div className="pagination__numbers">
                {
                    [...Array(props.totalPages).keys()].map(page => {
                        let div = '';
                        if (page === props.page) div = <div className="bottom-line center-relative-horizontal" />;
                        return (
                            <div className="pagination__number" key={page} onClick={_ => onClick(page, 'number')}>
                                {page + 1}
                                {div}
                            </div>
                        );
                    })
                }
                {/* <div className="pagination__number active">
                    1
                    <div className="bottom-line center-relative-horizontal" />
                </div>
                <div className="pagination__number">
                    2
                    <div className="bottom-line center-relative-horizontal" />
                </div>
                <div className="pagination__number">
                    3
                    <div className="bottom-line center-relative-horizontal" />
                </div>
                <div className="pagination__number">
                    4
                    <div className="bottom-line center-relative-horizontal" />
                </div>
                <div className="pagination__number">
                    5
                    <div className="bottom-line center-relative-horizontal" />
                </div> */}
            </div>
            <div className="pagination__item" onClick={_ => onClick(props.page, 'right')}>
                <i className="fa fa-angle-right"></i>
            </div>
        </div>
    );
}

export default Pagination;