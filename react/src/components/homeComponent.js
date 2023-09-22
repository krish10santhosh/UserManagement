import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Actions, AddUser, columns, userManagement } from "../shared/constants/constants";
import { Button, CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData, getUserAddEditData, deleteUsersData } from "../slices/homeSlice";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HomeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState();
    const getUsers = useSelector((state) => state.homeReducer.userManagementData.getUsersList?.data);
    const deleteUserData = useSelector((state) => state.homeReducer.userManagementData.deleteUser);

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

    const handleAddEditUser = (value) => {
        if (value?.title == "Add User") {
            dispatch(getUserAddEditData({
                title: value?.title,
                id: null,
                buttonName: "Submit",
                data: value?.data
            }));
            navigate(`/user/addUser`);
        }
        else {
            dispatch(getUserAddEditData({
                title: value?.title,
                id: value?.id,
                buttonName: "Update",
                data: value?.data
            }));
            navigate(`/user/${value?.id}`);
        }
    }

    const handleDeleteUser = (value) => {
        dispatch(deleteUsersData(value)).then((data) => {
            if (data?.payload?.message) {
                dispatch(getUsersData({ page: page, limit: limit }));
            }
        });
    }

    return (
        <>
            {
                getUsers?.isloading == true ||
                    deleteUserData?.isloading == true
                    ?
                    (<CircularProgress className="centered" />) : null
            }
            <Grid container xs={12} sm={12} md={12} xl={12} lg={12} xxl={12}>
                <Paper sx={{ width: '100%', overflow: 'hidden', margin: "25px" }}>
                <Grid item xs={12} sm={12} md={12} xl={12} lg={12} xxl={12}>
                <Typography variant="h6" component="div" sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {userManagement}
                    </Typography>
                    <Button variant="contained" className="heading" onClick={() => handleAddEditUser({
                        title: "Add User",
                        id: null,
                        data: null
                    })}>{AddUser}</Button>
                    </Grid>
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
                                    <TableCell>
                                        {Actions}
                                    </TableCell>
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
                                                        <>
                                                            <TableCell key={column.id} align={column.align}>
                                                                {typeof (value) == "string" && moment(value).format("DD/MM/YYYY hh:mm A") !== 'Invalid date'
                                                                    ? moment(value).format("DD/MM/YYYY hh:mm A")
                                                                    : value}
                                                            </TableCell>
                                                        </>
                                                    );
                                                })}
                                                <TableCell>
                                                    <EditIcon sx={{
                                                        margin: '0px 25px 0px 0px',
                                                        cursor: 'pointer'
                                                    }} onClick={() => handleAddEditUser({
                                                        title: "Edit User",
                                                        id: row._id,
                                                        data: row
                                                    })} />
                                                    <DeleteIcon sx={{
                                                        cursor: 'pointer'
                                                    }} onClick={() => handleDeleteUser(row._id)} />
                                                </TableCell>
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