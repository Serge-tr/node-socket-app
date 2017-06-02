const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'John';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location', () => {
    let from = 'Matt';
    let lat = 15;
    let lon = 40;
    let url = 'https://www.google.com/maps?q=15,40';
    let message = generateLocationMessage(from, lat, lon);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
