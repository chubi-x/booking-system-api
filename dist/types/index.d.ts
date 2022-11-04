declare module 'express-session' {
    interface Session {
        userId: string;
        hotelId: string;
    }
}
export {};
