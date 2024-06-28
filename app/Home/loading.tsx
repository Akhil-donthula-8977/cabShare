"use client"
import SkeletonLoad from '@/utils/loaders'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
const loading = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex flex-row justify-evenly gap-2 mt-3'>
      <Skeleton className="h-10 w-1/3 rounded-[10px]" />
      <Skeleton className="h-10 w-1/3 rounded-[10px]" />
      <Skeleton className="h-10 w-[40px] rounded-[10px]" />
    </div>
    <Skeleton className="h-20  rounded-[10px] mx-10" />
  </div>
  )
}

export default loading