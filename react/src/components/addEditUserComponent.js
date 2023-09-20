import React, { useState } from "react";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../shared/components/input";
import PhoneInputComponent from "../shared/components/phoneInput";
import Card from '@mui/material/Card';
import { roleList } from "../shared/constants/constants";
import DropdownListComponent from "../shared/components/dropdownList";
import { addUsersData } from "../slices/homeSlice";
import AlertDialogComponent from "../shared/components/alertdialog"
import { useNavigate } from "react-router-dom";

const AddEditUserComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [AlertDialogOpen, setAlertDialogOpen] = useState(false);
    const addUser = useSelector((state) => state.homeReducer.userManagementData.addUser);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        role: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        role: '',
    });

    const handleFirstNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            firstName: event.target.value,
        }));
    };

    const handleLastNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            lastName: event.target.value,
        }));
    };

    const handleEmailIDInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
    };

    const handleChange = (event, value) => {
        console.log(value)
        setValues((values) => ({
            ...values,
            role: value.value,
        }));
    };

    const validateFirstName = (values) => {
        let errors = {};
        if (!values.firstName) {
            errors.firstName = 'First Name is required';
        }
        if (values.firstName.length < 4) {
            errors.firstName = 'First Name must be 4 or more characters';
        }
        setErrors((values) => ({
            ...values,
            firstName: errors.firstName,
        }));
    };

    const validateLastName = (values) => {
        let errors = {};
        if (!values.lastName) {
            errors.lastName = 'Email address is required';
        }
        if (values.lastName.length < 3) {
            errors.lastName = 'Last Name must be 3 or more characters';
        }
        setErrors((values) => ({
            ...values,
            lastName: errors.lastName,
        }));
    };

    const handlePhoneNumberInputChange = (event) => {
        event.persist();
        const regex = /^[0-9\b]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            setValues((values) => ({
                ...values,
                phoneNumber: event.target.value,
            }));
        }
    };

    const validatePhoneNumber = (values) => {
        console.log(/^\d+$/.test(values.phoneNumber));
        let errors = {};
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number is required';
        }
        if (/^\d+$/.test(values.phoneNumber)) {
            if (values.phoneNumber.length < 10 || values.phoneNumber.length > 10) {
                errors.phoneNumber = 'Phone Number is Invalid';
            }
            else {

            }
        }
        setErrors((values) => ({
            ...values,
            phoneNumber: errors.phoneNumber,
        }));
    };


    const validateEmailID = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        setErrors((values) => ({
            ...values,
            email: errors.email,
        }));
    };

    const validateRole = (values) => {
        let errors = {};
        if (!values.role) {
            errors.role = 'role is required';
        }
        setErrors((values) => ({
            ...values,
            role: errors.role,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateFirstName(values);
        validateLastName(values);
        validatePhoneNumber(values);
        validateEmailID(values);
        validateRole(values);
        if (errors.email === undefined &&
            errors.firstName === undefined &&
            errors.lastName === undefined &&
            errors.role === undefined) {
            dispatch(addUsersData(values)).then((data) => {
                if (data?.payload?.message) {
                    setText(data?.payload?.message);
                    setAlertDialogOpen(true);
                }
            });
        }
    };

    useEffect(() => {
        if (values.firstName !== '') {
            validateFirstName(values);
        }
        if (values.lastName !== '') {
            validateLastName(values);
        }
        if (values.phoneNumber !== '') {
            validatePhoneNumber(values);
        }
        if (values.email !== '') {
            validateEmailID(values);
        }
        if (values.role !== '') {
            validateRole(values);
        }
    }, [values]);

    const handleAlertFeedClose = React.useCallback((value) => {
        setAlertDialogOpen(false);
        navigate("/home");
    }, [dispatch]);

    return (
        <>
            {
                addUser?.isloading == true ?
                    (<CircularProgress className="centered" />) : null
            }
            <Grid container sx={{
                justifyContent: 'center',
                margin: '90px 0px'
            }}>
                <Card sx={{
                    width: "100%",
                    padding: "16px 16px 0px 16px"
                }}>
                    <Typography variant="h6" component="div" sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        Add User
                    </Typography>
                    <Grid lg={12} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid lg={5} sx={{
                            margin: '10px 0'
                        }}>
                            <InputComponent placeholder={"First Name"} value={values.firstName} handleChange={handleFirstNameInputChange} />
                            {errors.firstName && <span className='login-error'>{errors.firstName}</span>}
                        </Grid>
                        <Grid lg={5} sx={{
                            margin: '10px 0'
                        }}>
                            <InputComponent placeholder={"Last Name"} value={values.lastName} handleChange={handleLastNameInputChange} />
                            {errors.lastName && <span className='login-error'>{errors.lastName}</span>}
                        </Grid>
                    </Grid>
                    <Grid lg={12} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid lg={5} sx={{
                            margin: '10px 0'
                        }}>
                            <PhoneInputComponent placeholder={"Phone Number"} value={values.phoneNumber} handleChange={handlePhoneNumberInputChange}
                                length={10} />
                            {errors.phoneNumber && <span className='login-error'>{errors.phoneNumber}</span>}
                        </Grid>
                        <Grid lg={5} sx={{
                            margin: '10px 0'
                        }}>
                            <InputComponent placeholder={"Email ID"} value={values.email} handleChange={handleEmailIDInputChange} />
                            {errors.email && <span className='login-error'>{errors.email}</span>}
                        </Grid>
                    </Grid>
                    <Grid lg={12} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Grid lg={5} sx={{
                            margin: '10px 0'
                        }}>
                            <DropdownListComponent options={roleList} label={"Select Role"} handleChange={handleChange} />
                            {errors.role && <span className='login-error'>{errors.role}</span>}
                        </Grid>
                    </Grid>
                    <Grid lg={12} sx={{
                        textAlign: 'right'
                    }}>
                        <Grid lg={12} sx={{
                            margin: '10px 0'
                        }}>
                            <Button variant="contained" onClick={handleSubmit}
                                disabled={
                                    errors.email ||
                                    errors.firstName ||
                                    errors.lastName ||
                                    errors.role
                                }>Submit</Button>
                        </Grid>
                    </Grid>
                </Card>
                <AlertDialogComponent
                    open={AlertDialogOpen}
                    onClose={handleAlertFeedClose}
                    title={"User Management"}
                    text={text} />
            </Grid>
        </>
    )
}
export default AddEditUserComponent;