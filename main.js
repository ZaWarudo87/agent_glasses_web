const ws = new WebSocket('wss://agentglasses.onrender.com:10000');

ws.onmessage = (event) => {
  const notifications = document.getElementById('notifications');
  const message = document.createElement('div');
  message.textContent = event.data;
  notifications.appendChild(message);

  fetch('http://your-esp32-address/notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: event.data }),
  })
  .then(response => response.json())
  .then(data => console.log('ESP32 response:', data))
  .catch(error => console.error('Error:', error));
};

ws.onopen = () => {
  console.log('WebSocket connection opened');
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
