/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

const getInitialTheme = () => {
	const preferDarkMode = window.matchMedia(
		'(prefers-color-scheme: dark)',
	).matches;

	const storedDarkMode = localStorage.getItem('darkTheme');
	if (storedDarkMode === null) {
		return preferDarkMode;
	}
	return storedDarkMode === 'true';
};

export const AppProvider = ({ children }) => {
	const [isDarkTheme, setIsDarkTheme] = useState(getInitialTheme());
   const [searchTerm, setSearchTerm] = useState("cat");
	const toggleDarkTheme = () => {
		const newDarkTheme = !isDarkTheme;
		setIsDarkTheme(newDarkTheme);
		localStorage.setItem('darkTheme', newDarkTheme);
		
	};
    useEffect(() => {
			document.body.classList.toggle('dark-theme', isDarkTheme);
            console.log("Updated theme:", isDarkTheme? "Dark" : "Light");
		}, [isDarkTheme]);
	
	return (
		<AppContext.Provider value={{ isDarkTheme, toggleDarkTheme , searchTerm,setSearchTerm}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => useContext(AppContext);
