import { async } from 'regenerator-runtime';
import { TIMEOUT_SECS } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    // Trying to fetch data from api in less than 5 seconds. If 5 seconds pass, it will throw error
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // Throwing the error again to handle ir where its necessary (in the model.js)
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    // Trying to fetch data from api in less than 5 seconds. If 5 seconds pass, it will throw error
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // Throwing the error again to handle ir where its necessary (in the model.js)
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    // Trying to fetch data from api in less than 5 seconds. If 5 seconds pass, it will throw error
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECS)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    // Throwing the error again to handle ir where its necessary (in the model.js)
    throw err;
  }
};
*/
