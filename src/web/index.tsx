import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const App = () => {
    return (
        <>
            <h1>test page</h1>
        </>
    )
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);