import {notificationData} from '../pages/notifications/Notifications';
import EventSource, {EventSourceListener} from 'react-native-sse';
import axios from 'axios';

const notificationStream = (url: string, token: string) => {
  const streamUrl = `${url}api/v1/notification/stream`;
  const option = {
    method: 'GET',
    headers: {Authorization: `Bearer ${token}`},
  };
  const eventSource = new EventSource(streamUrl, option);
  const listener: EventSourceListener = (event: any) => {
    if (event.type === 'open') {
      console.log('Open SSE connection.');
    } else if (event.type === 'message') {
      const resData = JSON.parse(event.data);
      // if (resData.length > 0) setNotificationDatas(resData);
    } else if (event.type === 'error') {
      eventSource.close();
    } else if (event.type === 'exception') {
      eventSource.close();
    }
  };

  eventSource.addEventListener('open', listener);
  eventSource.addEventListener('message', listener);
  eventSource.addEventListener('error', listener);

  return () => {
    eventSource.removeAllEventListeners();
    eventSource.close();
  };
};

const notificationListener = {
  getNotification: async (url: string, token: string) => {
    try {
      const res = await axios.get(url, {headers: {Authorization: `Bearer ${token}`}});
      const resData = res.data.body.data;
      if (res.status === 200) {
        return resData.sort();
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  deleteNotification: async (
    url: string,
    token: string,
    notificationIds: number[],
    setItems: React.Dispatch<React.SetStateAction<notificationData[]>>,
    items: notificationData[],
  ) => {
    try {
      const res = await axios.delete(url, {
        headers: {Authorization: `Bearer ${token}`},
        data: {notificationIds},
      });
      console.log(res);
      if (res.status === 200) {
        setItems(items.filter(item => !notificationIds.includes(item.notificationId)));
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export {notificationListener, notificationStream};
