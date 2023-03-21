const { expect, assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server/server');

require('dotenv').config();
chai.should();

chai.use(chaiHttp);

describe('Teams endpoints', () => {
  describe('POST /teams/getAllTeams', () => {
    it('It get all teams', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/teams/getAllTeams`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .send()
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(response.body.data).to.be.an('array');
          expect(error).to.be.null;
          done();
        })
    })
  });

  describe('POST /teams/getOneTeam', () => {
    it('It should get one team', (done) => {
      chai.request(server)
        .get(`/api/${process.env.VERSION}/teams/getOneTeam`)
        .set({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.NjQxMDlmNmZjMGRmYWY2NmFlNjZjODBm.uFxd4gJTrD4CPjbIwt76LHZqvVblF6_IrkKvAnmI5xQ' })
        .query({ idTeam: "640ba7ded564940feafaeca5" })
        .send()
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response).to.be.an('object');
          expect(response.body.data).to.have.any.keys('accountName', 'teamName', 'users');
          expect(error).to.be.null;
          done();
        })
    })
  });
})