import { createContext } from 'react';
import { Socket } from 'socket.io-client';

const socketIdContext = createContext<string|null>(null);

export default socketIdContext;