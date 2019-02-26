var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var result = generateMessage('Test', 'Test text');
        expect(result.from).toBe('Test');
        expect(result.text).toBe('Test text');
        expect(typeof result.createdAt).toBe('number');
    });
});