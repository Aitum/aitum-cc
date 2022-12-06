import { AitumCCLib } from 'aitum-cc-lib';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', 'settings.env') });

(async () => {
  // Set up the environment
  AitumCCLib.get().setEnv(process.env.AITUM_CC_ID as string, process.env.AITUM_CC_HOST as string, process.env.API_KEY as string);

  // Connect after a few seconds
  setTimeout(async () => await AitumCCLib.get().connect(), 5e3);
})();


