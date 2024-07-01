import { observer } from "mobx-react";
import { useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

import AppStore from "../store/AppStore"
import './Login.css'

const Login = (observer(() => {


    const [formData, setFormData] = useState({
        nameAdmin: '',
        password: '',
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }


    const handleSubmit = async (event) => {
        
        event.preventDefault();
        AppStore.checkLogin(formData.nameAdmin, formData.password);

        sessionStorage.setItem("name", formData.nameAdmin);
        sessionStorage.setItem("password", formData.password);

        setFormData({ nameAdmin: '', password: ''});
    }


    return (

        <div className="center">

            <Container maxWidth="xs">

                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

                    <img src={AppStore.BussinessData.image} alt="Business Logo" />

                    <form onSubmit={handleSubmit} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type='text'
                            id="nameAdmin"
                            label="Admin name"
                            name="nameAdmin"
                            autoComplete="name"
                            onChange={handleChange}
                            value={formData.nameAdmin}
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            value={formData.password}
                            autoComplete="current-password"
                        />

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    )
}))

export default Login
