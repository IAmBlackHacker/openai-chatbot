import {storage} from '../utils/StorageUtil';
import {StorageConstant} from '../constants/StorageConstant';

export function optionProvider() {
  const username = storage.getString(StorageConstant.USERNAME);
  const authToken =
    storage.getString(StorageConstant.AUTHENTICATION_TOKEN) || '';
  if (username === undefined) {
    console.log('User is not logged in');
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
    withCredentials: true,
    onUploadProgress: (onProgressEvent: any) => {
      return onProgressEvent;
    },
  };
}
