import Room, { RoomModel } from "../model/Room";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../../core/ApiError";
import { SucessMsgResponse } from "../../core/ApiResponse";

export class RoomRepo {
  public static async findRoomByName(name: string): Promise<Room | null> {
    return RoomModel.findOne({ name }).select("+name +pwd").lean<Room>().exec();
  }
  public static async removeRoomByName(name: string): Promise<void> {
    const room = await RoomModel.findOneAndRemove({ name });
    if (!room) throw new BadRequestError("No Room exists");
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
    return { room: createdRoom.toObject() };
  }
}
