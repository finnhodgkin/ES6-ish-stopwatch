function Stopwatch () {
  let start = 0;
  let stop = 0;
  const timeDifference = (s, e) => e - s;
  const toReadableTime = (time) => new Date(time).toISOString().substr(-13, 12);
  this.getTime = () => toReadableTime(timeDifference(start, stop));
  this.setStart = (time) => {
    const withStop = stop ? time - timeDifference(start, stop) : time;
    start = start ? withStop : time;
  };
  this.setStop = (time) => {
    stop = time;
  };
}

function StopwatchControls (stopwatch, element) {
  let timer = null;
  const update = () => element.innerText = stopwatch.getTime();
  const run = (time) => {
    stopwatch.setStop(time);
    update();
  };
  const frame = () => {
    run(Date.now());
    timer = window.requestAnimationFrame(frame);
  };
  this.start = () => {
    stopwatch.setStart(Date.now());
    frame();
  };
  this.stop = () => {
    window.cancelAnimationFrame(timer);
  };
  this.reset = () => {
    window.cancelAnimationFrame(timer);
    stopwatch.setStop(0);
    stopwatch.setStart(0);
    update();
  };
}

// DOM Manipulation below
const get = ele => document.getElementById(ele);

function listeners (groupName) {
  const start = get(groupName + '-start');
  const stop = get(groupName + '-stop');
  const reset = get(groupName + '-reset');
  const display = get(groupName + '-display');
  const ctrl = new StopwatchControls(new Stopwatch(), display);

  start.addEventListener('click', ctrl.start);
  stop.addEventListener('click', ctrl.stop);
  reset.addEventListener('click', ctrl.reset);
}

listeners('stopwatch1');
listeners('stopwatch2');
listeners('stopwatch3');
listeners('stopwatch4');
