import { ICCActionInputs, ICustomCode } from 'aitum.js/lib/interfaces';
import { BooleanInput, FloatInput, IntInput, StringInput } from 'aitum.js/lib/inputs';
import { AitumCC } from 'aitum.js';
import SpotifyWebApi from 'spotify-web-api-node';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { count } from 'console';

/*********** CONFIG ***********/
// The custom code action name
const name: string = 'Get Spotify Song';

// The custom code inputs
const inputs: ICCActionInputs = {
  songInput: new StringInput('Song Details', { required: true }),
}

// Initialize the Spotify Web API
const spotifyApi = new SpotifyWebApi({
  clientId: '7b280e3002014a7986cbba356db2518b',
  clientSecret: '075d671caf264c4283b6c8a447bd6f21',
  redirectUri: 'http://localhost:3000', // Must match the registered redirect URI in your Spotify app settings
});

// The code executed.
async function method(inputs: { songInput: string }) {
  const aitumJS = AitumCC.get().getAitumJS().aitum;

  const vars = await aitumJS.getGlobalVariables();

  const counterVar = vars.find((v) => v.name === 'Spotify Song');

  if (!counterVar) {
    throw new Error('Please create a text global variable called "Spotify Song"');
  }

  try {
    // Extract the song title from the input
    const query = inputs.songInput;

    // Search for the song on Spotify
    const searchResult = await spotifyApi.searchTracks(query, { limit: 1 });

    // Check if any tracks were found
    const tracks = searchResult?.body?.tracks?.items;

    if (tracks && tracks.length > 0) {
      const firstTrack = tracks[0];
      console.log('Found track:', firstTrack);

      // Update the counterVar with the URI of the track
      const trackURI = firstTrack.uri;
      await counterVar.update(trackURI);
    } else {
      console.log('No tracks found for the provided song input.');
    }
  } catch (error) {
    console.error('Error searching Spotify:', error);
  }
}

/*********** DON'T EDIT BELOW ***********/
export default { name, inputs, method } as ICustomCode;