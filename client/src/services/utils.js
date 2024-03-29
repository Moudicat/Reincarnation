/**
 * Created by reddy on 2017/4/25.
 */
/**
 * @description: 格式化时间
 * @example: formatDate(12353453, 'yyyy-MM-dd hh:mm:ss')
 * @return:  2010-01-11 01:01:00
 * */
function formatDate(date, fmt, jhl) {
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
  if (/(y+)/.test(fmt)) {
    if (jhl) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() - 1970 + '').substr(4 - RegExp.$1.length));
    } else {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function supportWebp () {
  if (typeof window === 'undefined') return false;

  let support = true;
  const d = document;

  try {
    let el = d.createElement('object');
    el.type = 'image/webp';
    el.style.visibility = 'hidden';
    el.innerHTML = '!';
    d.body.appendChild(el);
    support = !el.offsetWidth;
    d.body.removeChild(el);
  } catch (err) {
    support = false;
  }

  return support;
}

function scrollToTop(target = 0, min) {
  const body = document.body;
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

  if (min && scrollTop < min) return;

  const top = () => {
    scrollTop = scrollTop + (-scrollTop) / 6;
    if (scrollTop < target + 1) {
      body.scrollTop = target;
      return;
    }
    body.scrollTop = document.documentElement.scrollTop = scrollTop;
    requestAnimationFrame(top);
  };
  top();
}

function jsonp(url, callbackName) {
  let head = document.querySelector('head');
  let script = document.createElement('script');

  return new Promise((resolve, reject) => {
    if (typeof url !== 'string') {
      throw new Error('[jsonp] url is not string');
    }

    window[callbackName] = function (json) {
      script.removeEventListener('error', onError);
      head.removeChild(script);
      resolve(json);
      delete window[callbackName];
    };

    let onError = () => {
      script.removeEventListener('error', onError);
      head.removeChild(script);
      reject(new Error({
        status: 400,
        statusText: 'Bad Request'
      }));
    };

    script.addEventListener('error', onError);

    script.src = url;
    head.appendChild(script);
  });
}

export {
  formatDate,
  supportWebp,
  scrollToTop,
  jsonp
};
