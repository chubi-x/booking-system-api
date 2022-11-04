declare enum RoomKind {
    STANDARD = "STANDARD",
    DELUXE = "DELUXE",
    EXECUTIVE = "EXECUTIVE",
    PRESIDENTIAL = "PRESIDENTIAL"
}
export declare class NewRoomDto {
    kind: RoomKind;
    price: number;
    image: string;
    numberAvailable: number;
}
export {};
