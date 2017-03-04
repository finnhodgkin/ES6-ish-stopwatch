function Stopwatch () {
  let start = 0;
  let stop = 0;
  this.setStart = (time) => {
    const withStop = stop ? time - this.timeDifference(start, stop) : time;
    start = start ? withStop : time;
  };
  this.setStop = (time) => {
    stop = time;
  };
  this.timeDifference = (s, e) => e - s;
  this.toReadableTime = (time) => new Date(time).toISOString().substr(-13, 12);
  this.getTime = () => this.toReadableTime(this.timeDifference(start, stop));
}

function StopwatchControls (stopwatch, element) {
  let timer = null;
  this.start = () => {
    stopwatch.setStart(Date.now());
    this.frame();
  };
  this.run = (time) => {
    stopwatch.setStop(time);
    this.update();
  };
  this.update = () => element.innerText = stopwatch.getTime();
  this.frame = () => {
    this.run(Date.now());
    timer = window.requestAnimationFrame(this.frame);
  };
  this.stop = () => {
    window.cancelAnimationFrame(timer);
  };
  this.reset = () => {
    window.cancelAnimationFrame(timer);
    stopwatch.setStop(0);
    stopwatch.setStart(0);
    this.update();
  };
}

// DOM Manipulation below
const get = ele => document.getElementById(ele);

function listeners (groupName) {
  const start = get(groupName + '-start');
  const stop = get(groupName + '-stop');
  const reset = get(groupName + '-reset');
  const display = get(groupName + '-display');
  const ctrl = new StopwatchControls(new Stopwatch, display);

  start.addEventListener('click', ctrl.start);
  stop.addEventListener('click', ctrl.stop);
  reset.addEventListener('click', ctrl.reset);
}

listeners('stopwatch1');
listeners('stopwatch2');
listeners('stopwatch3');
listeners('stopwatch4');
