import React from 'react';
import ReactDOM from 'react-dom/client';
import { VideoCallApp } from './VideoCallApp';

import './css/styles.css'
import { OptionsProvider } from './context/OptionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <OptionsProvider>
    <VideoCallApp />
  </OptionsProvider>

);

