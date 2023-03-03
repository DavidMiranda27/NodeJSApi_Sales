import AppDataSource from "src/data-source";
import UserToken from "../entities/UserToken";

const UserTokenRepository = AppDataSource.getRepository(UserToken).extend({

  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOne({ where: { token } });
    return userToken;
  },

  async generateToken(user_id: number, token: string): Promise<UserToken> {
    const userToken = this.create({ user_id, token });
    await this.save(userToken);
    return userToken;
  }

});

export default UserTokenRepository;
