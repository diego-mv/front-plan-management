import { FC, useState } from "react";

interface Props {
    initSize?: number;
}

type ReturnProps = {
    page: number,
    rowsPerPage: number,
    total: number,
    handleChangePage: (newPage: number) => void,
    handleChangeRowPerPage: (newSize: number) => void,
    updateTotal: (newTotal: number) => void,
}

const usePagination = ({ initSize = 3 }: Props = {}): ReturnProps => {
    const [rowsPerPage, setRowsPerPage] = useState(initSize);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const handleChangePage = (newPage: number): void => {
        setPage(newPage);
    }

    const handleChangeRowPerPage = (newSize: number): void => {
        setRowsPerPage(newSize);
        setPage(0);
    }

    const updateTotal = (newTotal: number): void => {
        setTotal(newTotal);
    }

    return {
        page,
        rowsPerPage,
        total,
        handleChangePage,
        handleChangeRowPerPage,
        updateTotal,
    }
}


export default usePagination;