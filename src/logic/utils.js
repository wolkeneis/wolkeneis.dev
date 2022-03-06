function wrapPromise(promise) {
  let status = 1;
  let result;
  let suspender = promise.then(
    (response) => {
      status = 0;
      result = response;
    },
    (error) => {
      status = 2;
      result = error;
    }
  );
  return {
    read() {
      if (status === 1) {
        throw suspender;
      } else if (status === 2) {
        throw result;
      } else if (status === 0) {
        return result;
      }
    }
  };
}

const isElementInViewport = (element) => {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isTouchDevice() {
  return (("ontouchstart" in window) ||
    (navigator.msMaxTouchPoints > 0));
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function os(userAgent) {
  if (/android/i.test(userAgent)) {
    return 'android';
  }
  else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios';
  }
  else if (/Win/.test(userAgent)) {
    return 'windows';
  }
  else if (/Mac/i.test(userAgent)) {
    return 'mac';
  }
  else {
    return 'unknown';
  }
}

async function alert(options) {
  window.alert(options.message);
}

async function prompt(options) {
  const val = window.prompt(options.message, options.inputText || '');
  return {
    value: val !== null ? val : '',
    cancelled: val === null,
  };
}

async function confirm(options) {
  const val = window.confirm(options.message);
  return {
    value: val,
  };
}

async function writeClipboard(text) {
  if (typeof navigator === 'undefined' ||
    !navigator.clipboard ||
    !navigator.clipboard.writeText) {
    throw this.unavailable('Writting to clipboard not supported in this browser');
  }
  await navigator.clipboard.writeText(text);
}

export { wrapPromise, isElementInViewport, isTouchDevice, clamp, os, alert, prompt, confirm, writeClipboard };

