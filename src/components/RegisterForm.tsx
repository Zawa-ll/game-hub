import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import useUsers from '../hooks/useUsers';
import APIClientUser from '../services/api-client-user';

interface User {
    name: string;
    email: string;
    password: string;
}

function RegisterForm() {
    // const apiClient = new APIClientUser('/users/register');
    const apiClient = new APIClientUser('/auth/register');
    // const apiClient = new APIClientUser('/');
    const handleRegister = async (values: User) => {
        const { name, email, password } = values;
        apiClient.postOne({
            name,
            email,
            password
        })

        console.log(values);
        // apiClient.postOne(values);
        console.log('Register clicked');
    }

    return (
        <Box paddingLeft={5} paddingTop={10}>
            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={handleRegister}
            >
                <Form>
                    <Field name='name'>
                        {({ field }: { field: any }) => (
                            <FormControl>
                                <FormLabel fontSize={25} fontWeight='bold'>Name</FormLabel>
                                <Input {...field} placeholder='Name' type='name' style={{ width: '100%' }} />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='email'>
                        {({ field }: { field: any }) => (
                            <FormControl>
                                <FormLabel fontSize={25} fontWeight='bold'>Email</FormLabel>
                                <Input {...field} placeholder='Email' type='email' style={{ width: '100%' }} />
                            </FormControl>
                        )}
                    </Field>
                    <Field name='password'>
                        {({ field }: { field: any }) => (
                            <FormControl>
                                <FormLabel fontSize={25} fontWeight='bold'>Password</FormLabel>
                                <Input {...field} placeholder='Password' type='password' style={{ width: '100%' }} />
                            </FormControl>
                        )}
                    </Field>

                    <Box paddingTop={15}>
                        <Button colorScheme='blue' type='submit'>Register</Button>
                    </Box>
                </Form>
            </Formik>
        </Box>
    )
}

export default RegisterForm;
