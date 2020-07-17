import Room, { RoomModel } from "../model/Room";
import bcrypt from "bcryptjs";

export class RoomRepo {
  public static async findRoomByName(name: string): Promise<Room | null> {
    return RoomModel.findOne({ name })
      .select("+name +password")
      .lean<Room>()
      .exec();
  }
  public static async create(
    name: string,
    pwd: string
  ): Promise<{ room: Room }> {
    const salt = bcrypt.genSaltSync(10);
    const hashPwd = bcrypt.hashSync(pwd, salt);
    const room = {
      name,
      pwd: hashPwd,
    };
    const createdRoom = await RoomModel.create(room);
    return { room: createdRoom };
  }
}
