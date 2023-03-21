const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/server');

chai.use(chaiHttp);

require('dotenv').config();

describe('POST /api/v1/session/login', () => {
  it('It should login', (done) => {
    chai.request(server)
      .post(`/api/${process.env.VERSION}/session/login`)
      .send({ email: 'erickisrael620@gmail.com', password: 'Mmei01' })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
    })
    done();
  })
});