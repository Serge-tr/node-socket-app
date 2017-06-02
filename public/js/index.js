const socket =  io();

function scrollToBottom () {
  var messages = $('#messages-list');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();

  if (clientHeight + scrollTop + newMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// New text message
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages-list').append(html);
  scrollToBottom();
});

// New location
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messages-list').append(html);
  scrollToBottom();
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
