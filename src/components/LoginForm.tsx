import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import LikedGame from '../entities/LikedGame';
import APIClientUser from '../services/api-client-user';

interface User {
    email: string;
    password: string;
}

function LoginForm() {
    const apiClientUser = new APIClientUser<User>('/auth/login');
    const apiClientUserGame = new APIClientUser<LikedGame>('/games');


    const handleLogin = async (values: User) => {
        console.log('Login clicked');

        // Check if email and password are not empty
        if (!values.email || !values.password) {
            console.log('Email and password cannot be empty');
            return;
        }

        const response = await apiClientUser.postOne(values);
        const token = response.data.token;

        // Store the token in local storage
        localStorage.setItem('token', token);
    };

    const checkTokenInLocalStorage = () => {
        const token = localStorage.getItem('token');
        console.log('Token in local storage:', token);
    };

    useEffect(() => {
        checkTokenInLocalStorage();
    }, []);

    return (
        <Box paddingLeft={5} paddingTop={10}>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
                <Form>
                    <Field name="email">
                        {({ field }: { field: any }) => (
                            <FormControl>
                                <FormLabel fontSize={25} fontWeight="bold">
                                    Email
                                </FormLabel>
                                <Input {...field} placeholder="Email" type="email" style={{ width: '100%' }} />
                            </FormControl>
                        )}
                    </Field>
                    <Field name="password">
                        {({ field }: { field: any }) => (
                            <FormControl>
                                <FormLabel fontSize={25} fontWeight="bold">
                                    Password
                                </FormLabel>
                                <Input {...field} placeholder="Password" type="password" style={{ width: '100%' }} />
                            </FormControl>
                        )}
                    </Field>

                    <Box paddingTop={15}>
                        <Button colorScheme="blue" type="submit">
                            Login
                        </Button>
                    </Box>
                </Form>
            </Formik>
        </Box>
    );
}

export default LoginForm;
