import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

import './styles.css';

interface Props {
    active: number;
    totalResults: number;
    sizePage: number;
    changePage: any;
}

const Paginator = ({ active, totalResults, sizePage, changePage }: Props) => {
    const [items, setItems] = useState<any>();

    const changePageEvent = useCallback(
        (number: number) => {
            changePage(number);
        },
        [changePage],
    )

    const generatePages = useCallback(
        () => {
            let items = [];

            let totalPages: number;

            if (totalResults <= sizePage) {
                totalPages = 1;
            } else if (totalResults % sizePage === 0) {
                totalPages = totalResults / sizePage;
                items.push(<Pagination.First key={0} onClick={() => changePageEvent(1)} />);
            } else {
                totalPages = Math.ceil(totalResults / sizePage);
                items.push(<Pagination.First key={0} onClick={() => changePageEvent(1)} />);
            }

            if (totalPages > 5) {
                if (active === 1 || active === 2) {
                    for (let i = 1; i <= 5; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={active === i}
                                onClick={() => changePageEvent(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                } else if (active === totalPages ||
                    active === (totalPages - 1)) {
                    for (let i = totalPages - 5; i <= totalPages; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={active === i}
                                onClick={() => changePageEvent(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                } else {
                    for (let i = active - 2; i <= active + 2; i++) {
                        items.push(
                            <Pagination.Item
                                key={i}
                                active={active === i}
                                onClick={() => changePageEvent(i)}
                                className="hover-item"
                            >{i}</Pagination.Item>
                        );
                    }
                }
            } else {
                for (let i = 1; i <= totalPages; i++) {
                    items.push(
                        <Pagination.Item
                            key={i}
                            active={active === i}
                            onClick={() => changePageEvent(i)}
                            className="hover-item"
                        >{i}</Pagination.Item>
                    );
                }
            }

            if (totalResults >= sizePage) {
                if (totalResults % sizePage === 0) {
                    items.push(<Pagination.Last key={totalPages + 1} onClick={() => changePageEvent(totalPages)} />);
                } else {
                    items.push(<Pagination.Last key={totalPages + 1} onClick={() => changePageEvent(totalPages)} />);
                }
            }

            setItems(items);
        },
        [active, changePageEvent, sizePage, totalResults]
    );

    useEffect(() => {
        generatePages();
    }, [generatePages]);

    return (
        <div className="paginator-container">
            <div>
                <p>Resultados totales: {totalResults}</p>
            </div>

            <div className="center">
                <Pagination>
                    {items}
                </Pagination>
            </div>
        </div>
    )
}

export default Paginator;