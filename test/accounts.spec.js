const { expect, assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/server');

require('dotenv').config();
chai.should();

chai.use(chaiHttp);

describe('Accounts endpoints', () => {
  describe('POST /accounts/createAccount', () => {
    it('It should create a new account', (done) => {
      chai.request(server)
        .post(`/api/${process.env.VERSION}/accounts/createAccount`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .send({
              // "accountName" : "Mocha Account",
              "clientName": "Mocha Client",
              "responsableName": "Mocha Responsable"
        })
        .end((error, response) => {
          expect(response).to.have.status(422);
          expect(response).to.be.an('object');
          expect(error).to.be.null;
          done();
        })
    })
  });

  describe('POST /accounts/getAllAccounts', () => {
    it('It should get all the accounts', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/accounts/getAllAccounts`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .send()
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(error).to.be.null;
          done();
        })
    })
  });

  describe('POST /accounts/getOneAccount', () => {
    it('It should get one account', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/accounts/getOneAccount`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .query({ idAccount: "6418e9ef105036bbf127cad8" })
        .send()
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(response.body.data).to.have.any.keys('accountName', 'clientName', 'responsableName');
          expect(error).to.be.null;
          done();
        })
    })
  });
})