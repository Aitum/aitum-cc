import { BooleanInput, FloatInput, ICCActionInputs, ICustomCode, IntInput, StringInput } from 'aitum-cc-lib';
import { AitumJS } from 'aitum.js';
import { DeviceType } from 'aitum.js/src/enums/DeviceType';

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
  console.log(inputs)
  console.log('in method')

  const lib = AitumJS.get();

  const aitumDevice = (await lib.getDevices(DeviceType.AITUM))[0];

  await lib.sleep(250);

  console.log('playing sound')
  await aitumDevice.playSound('/Users/dussed/Downloads/DJ Fresh VS Jay Fay ft. Ms Dynamite - Dibby Dibby Sound [Official Video] [81Mw7Z9AOkw].m4a', 0.5);

  await lib.sleep(7500);

  console.log('stopping sound')
  await aitumDevice.stopAllSounds();
};

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;