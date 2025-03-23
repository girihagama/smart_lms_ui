import { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
} from "firebase/remote-config";
import firebaseConfig from "./FirebaseConfig"; // Import the config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour

export const FirebaseConfigContext = createContext(null);

export const FirebaseConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null); // Initialize state as null

  useEffect(() => {
    // Fetch remote config data
    fetchAndActivate(remoteConfig)
      .then(() => {
        const configValue = getValue(remoteConfig, 'REMOTE_CONFIG'); // Get the 'REMOTE_CONFIG' value
        setConfig(configValue.asString()); // Save it in the state
      })
      .catch((error) => {
        console.error("Error fetching remote config:", error);
        setConfig(null); // Optionally handle errors by setting state to null or default value
      });
  }, []); // Run this effect only once (on mount)

  return (
    <FirebaseConfigContext.Provider value={config}>
      {children}
    </FirebaseConfigContext.Provider>
  );
};
