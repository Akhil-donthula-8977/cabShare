"use client"
import React, { useContext } from 'react'

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
    const check = await userRequestAccept(userId, session?.user?._id,reqid._id);
    socketInstance?.instance?.emit("requestAccept", { socketId, reqid })
  }
  const handleReject = (id, reqid) => {

  }
  console.log(data)
  if (data.data.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen  ${raleway.className}`}>
        <p className="text-2xl text-gray-500">No requests available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full px-4">
      <h2 className="text-xl font-semibold mb-4">Requests List</h2>
      {data?.data?.map((e) => (
        <div key={e.requestId} className={`text-[14px] p-4 ${raleway.className} border-2 mt-2 rounded-md shadow-md w-full max-w-xl bg-white hover:bg-gray-50 transition`}>
          <p className="mb-2">
            <span className="font-bold text-blue-600">{e.userRequested.userName}</span> wants to travel with you with your requestId <span className="font-bold text-blue-600"> {e.requestId.name}</span>
          </p>
          <div className="flex justify-between mt-4">
            <Button className="flex-1 mx-1 h-10 bg-green-600 text-white rounded-md hover:bg-green-700 transition" onClick={() => handleAccept(e.userRequested._id, e.requestId)}>
              Accept
            </Button>
            <Button className="flex-1 mx-1 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 transition" onClick={() => handleReject(e.userRequested.socketId, e.requestId)}>
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestsList