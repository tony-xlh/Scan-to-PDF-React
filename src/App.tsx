import { useState, useEffect, useRef } from 'react'
import './App.css'
import {init as initDynamsoft, initDocDetectModule} from './dynamsoft.config'
import Scanner from './components/Scanner';

function App() {
  const initializing = useRef(false);
  const [isScanning,setIsScanning] = useState(false);
  const [initialized,setInitialized] = useState(false);
  useEffect(()=>{
    if (initializing.current == false) {
      initializing.current = true;
      initialize();
    }
  },[])

  const initialize = async () => {
    await initDynamsoft();
    await initDocDetectModule();
    setInitialized(true);
  }

  const startScanning = () => {
    setIsScanning(true);
  }

  return (
    <>
      <h1>Scan to PDF</h1>
      {initialized && (
        <button onClick={startScanning}>
          Start Scanning
        </button>
      )}
      {!initialized && (
        <div>Initializing...</div>
      )}
      {isScanning&& (
        <div id="scanner">
          <Scanner></Scanner>
        </div>
      )}
      <div style={{marginTop:"2em"}}>
        Powered by <a href='https://www.dynamsoft.com' target='_blank'>Dynamsoft</a>
      </div>
    </>
  )
}

export default App
