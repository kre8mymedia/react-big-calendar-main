// Packages
import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import {
    TextField,
    Grid,
    Button
  } from "@material-ui/core";

export default function Login() {
    const { setToken } = useAuthContext();

    const [input, setInput] = React.useState('');

    function handleSubmit() {
        setToken(input);
        setInput('');
    }

	return (
		<div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h1>Welcome to the React Big Calendar Demo</h1>
            </div>
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth  
                        label="Enter Token" 
                        variant="outlined"
                        type="text" 
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    
                </Grid>
                <Grid item xs={8}>
                    <p>Get token from <b>GET /api/v1/login</b> -&gt; <a target="_blank" href="https://ts-dev-api.glootie.ml/docs">API Docs</a></p>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" className="m-3" style={{ float: 'right', backgroundColor: "green" }} color="primary">Submit</Button>
                </Grid>
            </Grid>
		</div>
	);
}
