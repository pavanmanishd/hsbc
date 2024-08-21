import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const API = "http://localhost:5000";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API+"/api/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ 
                        mt: 1, 
                        border: "2px solid #ccc",
                        padding: "50px",
                        borderRadius: "15px", 
                    }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                                    Forgot password?
                                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
