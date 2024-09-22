import axios from 'axios';
import {optionProvider} from './RequestConfig';
import {FAILURE_STATUS, SUCCESS_STATUS} from '../constants/Constant';
import {RegisterEvent} from '../services/analytics/FirebaseAnalytics.tsx';
import {EVENT_NAME} from '../services/analytics/FirebaseEventConstant.tsx';
import {storage} from '../utils/StorageUtil.tsx';
import base64 from 'react-native-base64';
import {ResetUserData} from '../authentication/AuthenticationUtils.tsx';

export function BackendGETRequest(
  URL: string,
  successCallback: (response: any) => void,
  failureCallback: (error: any) => void,
  isCache?: boolean,
) {
  console.debug('GET request', URL);
  if (isCache) {
    let response = storage.getString(base64.encode(URL));

    if (response) {
      let jsonResponse = JSON.parse(response);
      let timeDiff = Date.now().valueOf() - jsonResponse.time;
      // 1Hr = 3600000 ms
      if (timeDiff < 3600000) {
        console.log('Loading from cache', timeDiff);
        successCallback(jsonResponse.data);
        return;
      }
    }
  }

  axios
    .get(URL, optionProvider())
    .then(response => {
      if (response.data.status === SUCCESS_STATUS) {
        successCallback(response.data);
        if (isCache) {
          storage.set(
            base64.encode(URL),
            JSON.stringify({time: Date.now().valueOf(), data: response.data}),
          );
        }
        return;
      }
      if (
        failureCallback !== undefined &&
        response.data.status === FAILURE_STATUS
      ) {
        failureCallback(response);
        return;
      }
      console.warn('[GET] Something unexpected response: ', response);
    })
    .catch(error => {
      error.url = URL;
      OnError(error, failureCallback);
    });
}

export function BackendPOSTRequest(
  URL: string,
  data: any,
  successCallback: (response: any) => void,
  failureCallback: (error: any) => void,
) {
  console.debug('POST request', URL);
  axios
    .post(URL, data, optionProvider())
    .then(response => {
      if (response.data.status === SUCCESS_STATUS) {
        successCallback(response.data);
        return;
      }
      if (
        failureCallback !== undefined &&
        response.data.status === FAILURE_STATUS
      ) {
        failureCallback(response);
        return;
      }
      console.warn('[POST] Something unexpected response: ', response);
    })
    .catch(error => {
      error.url = URL;
      OnError(error, failureCallback);
    });
}

function OnError(error: any, failureCallback: (error: any) => void) {
  console.error('[API CALL]:', error);
  RegisterEvent(EVENT_NAME.API_CALL_FAIL, {
    errorMessage: error.message,
    url: error.url,
  }).then(() => {});

  if (
    error.response !== undefined &&
    error.response.status === 401 &&
    error.response.data !== undefined &&
    error.response.data.status === FAILURE_STATUS &&
    error.response.data.message !== undefined &&
    error.response.data.message.includes('authentication is required')
  ) {
    ResetUserData();
  }

  if (failureCallback !== undefined) {
    failureCallback(error);
  }
}

function OnProgress(progressEvent: any, callback: (response: any) => void) {
  const percentComplete =
    Math.round((progressEvent.loaded / progressEvent.total) * 10000) / 100;
  callback(percentComplete);
}

export function BackendPOSTRequestWithImage(
  URL: string,
  data: any,
  successCallback: (response: any) => void,
  failureCallback: (error: any) => void,
  progressCallback: (response: any) => void,
) {
  let fileSize = Math.round(data.get('image')?.size / 1024);
  if (fileSize > 4096) {
    // ShowOkButtonErrorModal(
    //   props,
    //   'Image upload error',
    //   'Please select an image with size less than 4mb',
    // );
    if (failureCallback !== undefined) {
      failureCallback({});
    }
    return;
  }

  let options = optionProvider();
  options.headers['Content-Type'] = 'multipart/form-data';
  if (progressCallback !== undefined) {
    options.onUploadProgress = progressEvent =>
      OnProgress(progressEvent, progressCallback);
  }

  axios
    .post(URL, data, options)
    .then(response => {
      if (response.data.status === SUCCESS_STATUS) {
        successCallback(response.data);
        return;
      }
      if (failureCallback !== undefined) {
        failureCallback(response);
      }
    })
    .catch(error => {
      error.url = URL;
      console.log(error);
      // GaEventTracker('[IMAGE] Request failed: ', error);
      if (failureCallback !== undefined) {
        failureCallback(error);
      }
    });
}
