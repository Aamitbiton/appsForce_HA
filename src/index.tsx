import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import store from "./store/store";
import {createTheme, ThemeProvider} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6565FD',
        }
    },
});
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
