// lib/socket.ts
import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000', {
    withCredentials: true,
    transports: ['websocket'],
});
