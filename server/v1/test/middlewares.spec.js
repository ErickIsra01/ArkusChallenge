const assert = require('assert');
const authorization = require('../middlewares/authorization');

describe('Authorization middleware', () => {
  it('should verify the token sent', () => {
    const req = {
      Headers: { authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMGFlZWU5NmIwYWZmOWVhZWJhYWUy.8azW_wPCErdUUaTZ7IulQ-09CjcUF-7qO7ZCHWwydPc" }
    }

    let middleware;

    beforeEach

    authorization(req, null, () => {});
    
  });
});