import { of } from "./utils";

class LazyObserver {
  constructor(options) {
    this.subject = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            console.log("enter");
          } else if (entry.target.dataset.rmLazy) {
            console.log("leave");
          } else {
            entry.target.dataset.rmLazy = true;
          }
        });
      },
      {
        root: null,
        threshold: 0
      }
    );
    this.elements = [];
    this.root = null;
    this.hooks = {};

    Array
      .from(document.body.querySelectorAll("img"))
      .forEach(item => this.subject.observe(item));
  }

  processEvent(entries, observer) {
    of(entry => {
      console.log(entry.target, entry.isIntersecting);
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        console.log("enter");
      } else if (entry.target.dataset.rmLazy) {
        console.log("leave");
      } else {
        entry.target.dataset.rmLazy = true;
      }
    }, entries);
  }

  observe(query) {
    // of(
    //   element => this.subject.observe(element),
    //   this.root.querySelectorAll(query)
    // );
    return this;
  }

  subscribe(events = {}) {
    const keys = ["register", "enter", "leave", "error"];
    for (const key of Object.keys(events)) {
      if (!keys.includes(key)) {
        this.hooks = {};
        throw new Error(`${key}는 유효하지 않습니다. [enter, leave, error]만 등록 가능합니다.`)
      }
      this.hooks[key] = events[key];
    }
  }
}

export default LazyObserver;
