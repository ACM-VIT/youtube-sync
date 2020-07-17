import User, { UserModel } from "../model/User";

export class UserRepo {
  public static async findByName(name: string): Promise<User | null> {
    return UserModel.findOne({ name })
      .select("+name +noOfSync +createdAt")
      .lean<User>()
      .exec();
  }

  public static async create(name: string): Promise<{ user: User }> {
    const createdUser = await UserModel.create({
      name,
      noOfSyncs: 0,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });
    return { user: createdUser.toObject() };
  }
}
