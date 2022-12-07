import { AitumCCLib } from 'aitum-cc-lib';
import { InputType } from 'aitum-cc-lib/src/enums/InputType';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import DummyAction from './actions/DummyAction';

dotenv.config({ path: resolve(__dirname, '..', 'settings.env') });

const lib = AitumCCLib.get();
(async () => {
  // Set up the environment
  lib.setEnv(process.env.AITUM_CC_ID as string, process.env.AITUM_CC_HOST as string, process.env.API_KEY as string);

  // Register actions
  lib.registerAction('Dummy Action', {
    testInput: {
      type: InputType.STRING,
      required: true
    }
  }, DummyAction);


  // Connect after a few seconds
  setTimeout(async () => await lib.connect(), 5e3);
})();


