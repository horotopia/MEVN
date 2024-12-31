import bcrypt from 'bcryptjs';
import logger from "../config/logger";

export class Bcrypt {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = bcrypt.genSaltSync(this.saltRounds);
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      logger.error(`Error hashing password: ${error}`);
      throw new Error("Erreur lors du hachage du mot de passe");
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return bcrypt.compareSync(password, hash);
    } catch (error) {
      logger.error(`Error comparing password: ${error}`);
      throw new Error("Erreur lors de la comparaison des mots de passe");
    }
  }
}
