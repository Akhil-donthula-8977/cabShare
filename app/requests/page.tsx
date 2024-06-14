import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import RequestsList from '@/components/Custom/RequestsList'
import { userRequests } from '@/actions/user.actions'
import { unstable_noStore as noStore } from 'next/cache'
const page = async () => {
  noStore();
  const session = await getServerSession(options)
  const data = await userRequests(session?.user?._id)
  // console.log(typeof data)
  if (typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">No requests available</p>
      </div>
    );
  }
  else {
    return (
      <div>
        <RequestsList data={data} ></RequestsList>

      </div>
    )
  }
}

export default page