import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import RequestsList from '@/components/Custom/RequestsList'
import { userRequests } from '@/actions/user.actions'
import { unstable_noStore as noStore } from 'next/cache'
const page =async () => {
  noStore();
  const session=await getServerSession(options)
  const data=await userRequests(session?.user?._id)

  return (
    <div>
       <RequestsList data={data} ></RequestsList>
       
    </div>
  )
}

export default page