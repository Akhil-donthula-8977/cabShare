"use client"
import React, { useContext } from 'react'
import { Raleway } from 'next/font/google'
import { raleway } from '@/lib/fonts'
import { Button } from '../ui/button'
import WebSocketContext from '../context/WebsocketContext'
import { getuserSocketId, userRequestAccept } from '@/actions/user.actions'
import { useSession } from 'next-auth/react'
const RequestsList = (data: object) => {
  const { data: session, status } = useSession()
  var socketInstance = useContext(WebSocketContext)
  const handleAccept = async (userId: string, reqid: string) => {
    const socketId = await getuserSocketId(userId);
    const check = await userRequestAccept(userId, session?.user?._id);
    socketInstance?.instance?.emit("requestAccept", { socketId, reqid })
  }
  const handleReject = (id, reqid) => {

  }
  return (
    <div className='flex flex-col items-center'>RequestsList
      {
        data.data.map((e) => {
          return (
            <div className={`text-[14px] p-2 ${raleway.className} border-2 mt-2 rounded-md`}>
              <p><span className='font-bold'>{e.userRequested.userName}</span> wants to travel with you with your requestId <span className='font-bold'> {e.requestId}</span> </p>
              <div className='flex m-2 mt-4 gap-3'>
                <Button className='m-1 h-[20px] sm:h-auto w-full bg-green-600' onClick={() => { handleAccept(e.userRequested._id, e.requestId) }}>Accept</Button>
                <Button className='m-1 w-full h-[20px] sm:h-auto bg-red-500' onClick={() => { handleReject(e.userRequested.socketId, e.requestId) }}>Reject</Button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RequestsList