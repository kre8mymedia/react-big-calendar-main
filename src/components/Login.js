// Packages
import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import {
    TextField,
    Grid,
    Button
  } from "@material-ui/core";

export default function Login() {
    const { setEmail, setPassword, submitLoginForm } = useAuthContext();

	return (
		<div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h1>Welcome to the React Big Calendar Demo</h1>
            </div>
            <Grid container spacing={2} style={{ padding: "400px" }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth  
                        label="Email" 
                        variant="outlined"
                        placeholder="Enter email..."
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth  
                        label="Password" 
                        variant="outlined"
                        placeholder="Enter password..."
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </Grid>
                <Grid item xs={8}>
                    <p>Register user at <b>POST /api/v1/register</b> -&gt; <a target="_blank" href="https://ts-dev-api.glootie.ml/docs">API Docs</a></p>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" className="m-3" style={{ float: 'right', backgroundColor: "green" }} color="primary" onClick={submitLoginForm}>Submit</Button>
                </Grid>
            </Grid>
		</div>
	);
}
