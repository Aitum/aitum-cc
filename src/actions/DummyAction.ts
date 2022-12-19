import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, FloatInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import { DeviceType } from 'aitum.js/lib/enums';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Dummy Action';

// The custom code inputs
const inputs: ICCActionInputs = {
  testStringInput: new StringInput('What is your name?', { required: false }),
  testBooleanInput: new BooleanInput('Are you a fun person?', { required: false }),
  testIntInput: new IntInput('How old are you?', { required: false }),
  testFloatInput: new FloatInput('Volume level', { required: false })
}

// The code executed.
async function method(inputs: { [key: string]: number | string | boolean | string[] }) {
  const lib = AitumCC.get().getAitumJS();

  const aitumDevice = (await lib.getDevices(DeviceType.AITUM))[0];

  await lib.sleep(250);

  console.log('stopping sounds');
  await aitumDevice.stopAllSounds();
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;