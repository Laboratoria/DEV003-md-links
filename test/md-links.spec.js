const mdLinks = require('../src/index.js');


describe('mdLinks', () => {

  it('should return a function with a promise', () => {
    expect.typeof(mdLinks()).tobe(Promise);
  });
});
