import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';


const PaginationBar: React.FC = () => {

    const maxPage = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const prevPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        if (currentPage < maxPage)
            setCurrentPage(currentPage + 1);
    }

    const paginate = () => {

        let items: JSX.Element[] = [];

        let leftEllipsisIsInserted = false;
        let rightEllipsisIsInserted = false;

        for (let index = 1; index <= maxPage; index++) {
            // return always first and last
            if (index === 1 || index === maxPage) {
                items.push(<Pagination.Item
                    key={index}
                    active={currentPage === index}
                    onClick={() => setCurrentPage(index)}
                >
                    {index}
                </Pagination.Item>);
            }

            else if (
                index === currentPage ||
                index === currentPage - 1 ||
                index === currentPage + 1 ||
                (!leftEllipsisIsInserted && index === currentPage - 2) ||
                (!rightEllipsisIsInserted && index === maxPage - 1)
            ) {
                items.push(<Pagination.Item
                    key={index}
                    active={currentPage === index}
                    onClick={() => setCurrentPage(index)}
                >
                    {index}
                </Pagination.Item>);
            }

            else if (
                (!leftEllipsisIsInserted && index < currentPage) &&
                (index !== currentPage - 2)
            ) {
                items.push(<Pagination.Ellipsis
                    key={index}
                />);
                leftEllipsisIsInserted = true;
            }

            else if (
                (!rightEllipsisIsInserted && index > currentPage) &&
                (index !== maxPage - 1)
            ) {
                items.push(<Pagination.Ellipsis
                    key={index}
                />);
                rightEllipsisIsInserted = true;
            }
        }
        return items;
    };

    const paginationItems = paginate();

    return (
        <div className="pagination_bar__wrapper">
            <Pagination
                className="pagination_bar"
            >
                <Pagination.Prev
                    className="pagination_bar--only_desktop"
                    onClick={prevPage}
                />

                {paginationItems}

                <Pagination.Next
                    className="pagination_bar--only_desktop"
                    onClick={nextPage}
                />
            </Pagination>
        </div >
    );


};

export default PaginationBar;