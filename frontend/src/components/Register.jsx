import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Link } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const API = "http://localhost:5000";
const theme = createTheme();

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API+"/api/auth/register", { username, password });
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
                        <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
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
                            Register
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Already have an account? Login
                                </Link>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Register;
