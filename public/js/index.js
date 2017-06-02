const socket =  io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var li = $('<li></li>');
  li.text(`${message.from} at ${formattedTime}: ${message.text}`);

  $('#messages-list').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from} at ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  $('#messages-list').append(li);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Fuck you!'
}, function (data) {
  console.log(data);
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationBtn = $('#send-location');
locationBtn.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported!');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationBtn.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationBtn.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.')
  });
});
