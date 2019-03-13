"use strict";

/**
 * 교차 관찰자 사용 (intersectionObserver API)
 * 콜백함수는 단일 엔트리가 아닌 배열 엔트리
 */

/**
 * 레이지 로드
 * 옵셔널 세팅 설정
 * @param {*} customConfig
 */
const LazyLoad = function(customConfig) {
  this._config = getInstanceSetting(customConfig);
};

/**
 * 디폴트 세팅과 옵셔널 세팅 결합
 * @param {*} custom
 */
const getInstanceSetting = function(custom) {
  return Object.assign({}, defaultConfing, custom);
};

/**
 * 세팅값 가져오기
 * @param {*} settings
 */
const getSetting = settings => {
  root: settings.root === document ? document : settings.root;
  rootMargin: settings.root_margin;
};

/**
 * 디폴트 세팅값
 */
const defaultConfing = {
  element: "img", // 기본 레이지로딩 엘리먼트
  root: document, // 컨테이너
  root_margin: "0px" // 루트 엘리먼트의 캡쳐 프레임을 확장 / 축소
  // threshold: 0.5 // 옵저버가 실행되기 전에 엘리먼트가 얼만큼 캡처프레임을 교차해야 하는지의 정도
  // // 이벤트 분리
  // enter: null, // 뷰포트에 들어왔을때
  // leave: null, // 뷰포트를 벗어났을때
  // finish: null, // 로딩이 끝났을때
  // error: null // 에러가 발생했을때
};

/**
 * IntersectionObserver 를 설정한다.
 * @param {*} instance
 */

const setObserver = instance => {
  instance._observer = new IntersectionObserver(function(entries, self) {
    entries.forEach(entry => {
      const config = instance._config;
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        self.unobserve(entry.target);
        // if (config.enter) {
        //   config.enter(instance);
        // }
      } else {
      }
    });
  }, getSetting(instance));
};

const onEnter = () => {};

const onLeave = () => {};

LazyLoad.prototype = {
  // 옵저버 생성
  create: function() {
    setObserver(this);
    return this;
  },

  // 이벤트 등록 없이 자동 처리
  auto: function() {
    const config = this._config;
    const targetSet = config.root.querySelectorAll(config.element);
    targetSet.forEach(element => {
      this._observer.observe(element);
    });
    return this;
  },

  // 이벤트 등록 (enter, leave, finish, error)
  // 개발중
  on: function(instance, event_name, event_function) {
    const config = this._config;
    if (event_name === "enter") {
      on;
    }

    if (event_name === "leave") {
      this.callbackSet(event_name, event_function);
    }

    const test = this._observer;
    console.log("observer:", test);
    // if (event_name === "enter") {
    //   event_function();
    // }
    return this;
  },

  callbackSet: function(name, func) {
    const config = this._config;
    config[name] = func;

    config[name]();
  }
};

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
}

module.exports = LazyLoad;

// ex
/*
const lazy = Lazy();
lazy.create({
  ...propertys
})
.on("enter", () => void)
.on("leave", () => void)
.on("finish", () => void)
.on("error", () => void)
*/
