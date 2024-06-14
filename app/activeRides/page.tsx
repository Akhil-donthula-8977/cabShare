"use client"
import React, { useEffect } from 'react';

const ActiveRequestFetch = () => {
    useEffect(() => {
        const fetchData = async () => {
            // Replace with your data fetching logic
            console.log("Fetching data...");
        };

        fetchData();
    }, []);

    return (
        <>
            <p>hi</p>
        </>
    );
};

const Page = () => {
    return (
        <div>
            page
            <ActiveRequestFetch />
        </div>
    );
};

export default Page;
