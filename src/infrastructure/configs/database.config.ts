import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

export class DatabaseConfig {
  public static initialize = async (): Promise<void> => {
    try {
      await mongoose.connect(process.env.DATABASE_URI);
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
      await mongoose.disconnect();
      console.log('🔴 Data Source has been closed.');
    } catch (error) {
      console.error('Error during Data Source closure:', error);
      throw error;
    }
  };
}