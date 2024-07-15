"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Modal } from '@/components/Custom/Modal'
import { Raleway } from 'next/font/google'
import { raleway } from '@/lib/fonts'

export function TextareaWithButton({ click }) {
  return (
    <div className="grid w-full gap-1.5 m-3">
      <Label htmlFor="message-2" className={raleway.className}>Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" className={raleway.className} />
      <Button 
        className={`bg-orange-500 hover:bg-orange-800 ${raleway.className}`} 
        onClick={() => click(true)}
      >
        Send
      </Button>
    </div>
  )
}

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${raleway.className} flex justify-center items-center`}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* Add Modal content here */}
      </Modal>
      <TextareaWithButton click={setIsOpen} />
    </div>
  )
}

export default Page;
