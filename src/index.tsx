import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./router/AppRouter";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://ef1a456bbfe947bb92346687af8cc498@o1219465.ingest.sentry.io/6361712",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
