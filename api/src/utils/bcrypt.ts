import bcrypt from "bcrypt";
import logger from "../config/logger";

export class Bcrypt {
  private saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      logger.error(`Error hashing password: ${error}`);
      throw new Error("Erreur lors du hachage du mot de passe");
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      logger.error(`Error comparing password: ${error}`);
      throw new Error("Erreur lors de la comparaison des mots de passe");
    }
  }
}
