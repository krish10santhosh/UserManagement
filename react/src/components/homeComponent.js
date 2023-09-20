import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { columns, users } from "../shared/constants/constants";
import { Button, Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../slices/homeSlice";
import moment from 'moment';

const HomeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState();
    const getUsers = useSelector((state) => state.homeReducer.userManagementData.getUsersList?.data);

    useEffect(() => {
        const data = {
            page: page,
            limit: limit,
        }
        dispatch(getUsersData(data));
    }, [dispatch]);

    useEffect(() => {
        if (getUsers?.data) {
            setPage(getUsers?.page);
            setTotal(Math.ceil(getUsers?.total / limit));
            setLimit(parseInt(getUsers?.limit));
        }
    }, [getUsers]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
        dispatch(getUsersData({ page: newPage, limit: limit }));
    };

    return (
        <>
            <Grid container xs={12} sm={12} md={12} xl={12} lg={12} xxl={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden', margin: "25px" }}>
                    <Button variant="contained" sx={{
                        float: 'right',
                        margin: '10px'
                    }} onClick={() => navigate(`/user/addUser`)}>Add User</Button>
                    <TableContainer sx={{ height: 'calc(100vh - 370px)' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getUsers?.data
                                    ?.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {moment(value).format("DD/MM/YYYY hh:mm A") !== 'Invalid date'
                                                                ? moment(value).format("DD/MM/YYYY hh:mmA")
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '10px'
                    }}>
                        <Pagination
                            count={total}
                            onChange={(event, value) => handleChangePage(value)}
                            page={page}

                        />
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}
export default HomeComponent;