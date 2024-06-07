import * as dotenv from 'dotenv';
import { Collection, Db, MongoClient } from 'mongodb';

dotenv.config();

export class DatabaseConfig {
  private static client = new MongoClient(process.env.DATABASE_URI);
  private static database: Db;

  public static getCollection<T>(name: string): Collection<T> {
    return this.database.collection<T>(name);
  }

  public static initialize = async (): Promise<void> => {
    try {
      this.database = this.client.db(process.env.DATABASE_NAME);
      console.log('🟢 Data Source has been initialized.');
      this.setupCloseOnExit();
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  };

  private static setupCloseOnExit() {
    const events: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
    events.forEach((event) => {
      process.on(event, async () => {
        await this.close();
        process.exit(0);
      });
    });
  }

  public static close = async (): Promise<void> => {
    try {
      await this.client.close();
      console.log('🔴 Data Source has been closed.');
    } catch (error) {
      console.error('Error during Data Source closure:', error);
      throw error;
    }
  };
}