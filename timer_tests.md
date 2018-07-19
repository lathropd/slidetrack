Here are the experiemnts I ran with timing libraries.


## Timing libraries

As it turns out, a timer to use when not using audio is harder than you may think to find. Here are some I looked at:

- [WAAClock](https://github.com/sebpiq/WAAClock) uses web audio to create timers. Can start and stop but doesn't actually keep or set a running clock.
- three.js and three-timer both require pulling in the animation frame api.
- [Tock](https://github.com/mrchimp/tock) has play/pause, running clock and callback support. Doesn't seem to allow you to set the running time, but can simulate by creating a new timer.
- [Clockmaker](https://hiddentao.com/clockmaker/) doesn't keep a clock, handle play/pause.
- [timer-stopwatch](https://github.com/MickCrozier/timer-stopwatch) has countup/countdown, start/stop (pause), recurring event callback
   - [timer-stopwatch-dev](https://github.com/jackymancs4/timer-stopwatch) is a fork that is more updated
- [gamestudio/clock](https://github.com/gamestdio/clock) event loop, keeps elapsed times but doesn't appear to have a way to set manually set the elapsed time. 2kb minified!
= [virtual-clock](https://github.com/DvdGiessen/virtual-clock) very promising API, may even let me  set the elapsed time.
- [clockit](https://github.com/dotchev/clockit) a simplified way to call process.hrtime. not the droids we're looking for.
- [lockstep](https://github.com/troywarr/lockstep) I think this would be perfect, but appears to have no documentation
- [horologe](https://www.npmjs.com/package/horologe) a good timer, but can't set the clock
- [EasyTimer.js](https://albert-gonzalez.github.io/easytimer.js/) this definitely has a good API, but it reamins to be seen if I will work right for me






### EasyTimer.js

It didn't make it easy to get a time reading in seconds/ms. 

  <iframe height='265' scrolling='no' title='OwNPyq' src='//codepen.io/lathropd/embed/preview/OwNPyq/?height=265&theme-id=light&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lathropd/pen/OwNPyq/'>OwNPyq</a> by Daniel Lathrop (<a href='https://codepen.io/lathropd'>@lathropd</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>


### timer-stopwatch-dev

Didn't find a hosted JS file, didn't work from runkit. neither did timer-stopwatch or timer-stopwatch-two

### Tock

This times at its interval value on the first tick/tock no matter what which could lead us to an endless loop.

<iframe height='265' scrolling='no' title='Testing Tock api' src='//codepen.io/lathropd/embed/BPKyZX/?height=265&theme-id=light&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lathropd/pen/BPKyZX/'>Testing Tock api</a> by Daniel Lathrop (<a href='https://codepen.io/lathropd'>@lathropd</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>


## My own timing thing

I decided to try writing my own timing thing using web audio. Advantage: may be more similar to whatever I use to play audio.


Looks complicated ... It's apparently not supported to get a playhead time for an audio buffer sourcenode without using some kind of wrapper.



## Looking at wavesurfer.js for inspiration

Sincer [wavesurfer.js](https://wavesurfer-js.org/) if hopefully going to be used (at some point) for audio playback... lets take a look at how it does this...

It creates a customized WebAudio MediaElementNode which requires a source file for the audio.


## What about using requestAnimationFrame?

Certainly could create a "animation frame" approach with play/pause implemented myself. It seems like I shouldn't have to... but... maybe I do?


What would that look like?

Getting some inspiration from https://gist.github.com/palmerj3/8249237

<iframe height='265' scrolling='no' title='Timer using request animation frame' src='//codepen.io/lathropd/embed/yqOJGB/?height=265&theme-id=light&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lathropd/pen/yqOJGB/'>Timer using request animation frame</a> by Daniel Lathrop (<a href='https://codepen.io/lathropd'>@lathropd</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>

So that's kind of a pile of hacks as well. Looking at how it's handled by reveal.js... No help.They do the timing per slide.

So I try this ... Which gives a nice result. But, I seem to have gotten a bit off the path.

<iframe height='265' scrolling='no' title='Timer using request animation frame and _this' src='//codepen.io/lathropd/embed/mjPWaY/?height=265&theme-id=light&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lathropd/pen/mjPWaY/'>Timer using request animation frame and _this</a> by Daniel Lathrop (<a href='https://codepen.io/lathropd'>@lathropd</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>


So, going back to the lovely EasyTimer.js 

<iframe height='265' scrolling='no' title='Testing EasyTimer.js redux api' src='//codepen.io/lathropd/embed/WKwOoK/?height=265&theme-id=light&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lathropd/pen/WKwOoK/'>Testing EasyTimer.js redux api</a> by Daniel Lathrop (<a href='https://codepen.io/lathropd'>@lathropd</a>) on <a href='https://codepen.io'>CodePen</a>.</iframe>

Now I've forked it an exposed the lovely calculateTotalCounterFromValues function so I can run it AND use it to compare values for slide changes.

