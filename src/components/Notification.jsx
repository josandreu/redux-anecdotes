import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector(({ notification }) => notification);

  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
  };

  if (notifications.className === 'error') {
    style = {
      ...style,
      color: 'red',
    };
  }

  return <div style={style}>{notifications.message}</div>;
};

export default Notification;
