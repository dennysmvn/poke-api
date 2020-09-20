import request from 'supertest';
import Server from '../../../server';

describe('Server', () => {
  it('should fetch a router that does not exist and return status code 404', (done) => {
    request(Server)
      .get('/api/v1/notfound')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
