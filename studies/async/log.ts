const log = (content) => {
  let p = document.createElement("p");
  p.innerHTML = content;
  document.body.appendChild(p);
};

class Logger {
  private containerSelector: string;
  private momentTimerHasBeenTriggered: Date = null;

  private container() {
    return document.querySelector(this.containerSelector);
  }

  setContainerSelector(selector: string) {
    this.containerSelector = selector;
    return this;
  }

  triggerTimer() {
    this.momentTimerHasBeenTriggered = new Date();
    return this;
  }

  log(content) {
    let el = document.createElement("div");
    el.innerHTML = content;
    this.container().appendChild(el);
    return this;
  }

  clear() {
    this.momentTimerHasBeenTriggered = null;
    this.container().innerHTML = '';
    return this;
  }
}