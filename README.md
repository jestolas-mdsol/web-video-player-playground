## This is a simple app for learning about the Video Embed Element

### Functionalities:
* Default video controls and autoplay enabled
* A progress bar mimicking the time slider in the video controls
* Clicking the progress bar will adjust the video's current time intuitively.
* Time elapsed and total video duration are displayed in minutes:seconds
* When the video has eight seconds or less remaining, an notification appears in the bottom-right, displaying the next video's title.
* When the video ends, it plays the next video in queue.
* A second video player with custom controls that can be used in and out of full-screen mode.
  * Has custom controls for play/pause, and full-screen.
  * Clicking the video or progress bar  will toggle play/pause.
  * Progress bar can be clicked to scan the video.
  * Progress bar now expands correctly in full-screen mode.
  * Controls can be seen and used in full-screen mode.
    * TODO: auto-hide controls while video is playing, improve controls UI, add volume control

### Usage
1. Clone this repo
2. `cd` into the project's root directory from your terminal
3. `npm install` to install dependencies
4. `npm run start` to start the app
5. Open your browser and navigate to `localhost:3000`

#### Video sources:
* "Dust" - https://videos.pexels.com/videos/tiny-particles-in-the-air-1245333
* "Ice Bubble" - https://videos.pexels.com/videos/bubble-turning-into-ice-855627
* "Mountain View" - https://videos.pexels.com/videos/view-of-mountains-from-the-park-1466206

### Built with the [create-react-app](https://github.com/facebook/create-react-app) boilerplate.
