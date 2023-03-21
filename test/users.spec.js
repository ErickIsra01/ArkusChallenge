const { expect, assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/server');

require('dotenv').config();
chai.should();

chai.use(chaiHttp);

describe('Users endpoints', () => {
  describe('POST /users/createUser', () => {
    it('It should create a new user', (done) => {
      chai.request(server)
        .post(`/api/${process.env.VERSION}/users/createUser`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .send({
          "data" : {
              "name" : "Mocha User",
              "email": "mocha@gmail.com",
              "range": "user",
              "password": "Mocha123"
          }
        })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.data).have.any.keys('name', 'email', 'range')
          expect(error).to.be.null;
          done();
        })
    })
  });

  describe('GET /users/OneUser', () => {
    it('It should get one users information', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/users/getOneUser`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .query({ idUser: '6410e06e24c538f91b5dbe4c' })
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(error).to.be.null;
          done();
        });
    });
  });

  describe('GET /users/getAllUsers', () => {
    it('It should get multiple users information', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/users/getAllUsers`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .send({})
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(error).to.be.null;
          done();
        });
    });
  });
})
