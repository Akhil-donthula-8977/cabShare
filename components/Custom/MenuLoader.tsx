"use client"
import React from 'react'
import { Skeleton } from '../ui/skeleton'
const MenuLoader = () => {
    return (
        <div className='flex flex-center h-screen'>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />

        </div>
    )
}

export default MenuLoader