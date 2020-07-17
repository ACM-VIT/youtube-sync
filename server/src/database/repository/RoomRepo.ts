import Room, { RoomModel } from '../model/Room';


export class RoomRepo {
    public static async findRoomByName(name: string): Promise<Room | null> {
        return RoomModel.findOne({ name })
            .select('+name +password')
            .lean<Room>()
            .exec();
    }
    public static async create(room: Room): Promise<{ room: Room }> {
        const createdRoom = await RoomModel.create(room);
        return { room: createdRoom };
    }

}