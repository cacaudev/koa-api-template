/* eslint-disable no-undef */
/*
 * Description: Main Route test pilot.
 * Author: Cacaudev
 * Date: 22/11/2019
*/
import request from 'supertest';
import App from '../app';

let server, agent;

beforeEach((done) => {
  const app = new App();
  server = app.listen(4000, (err) => {
    if (err) return done(err);
    agent = request.agent(server);
    done();
  });
});

afterEach((done) => {
  return server && server.close(done);
});

afterAll(() => {
  /**
   * Avoid port already in use error
   */
  server.close();
});

describe('Test starting', () => {
  test('Access API Homepage ', async () => {
    const response_body = await agent
      .get('/v1');
    expect(response_body.status).toEqual(200);
    expect(response_body.text).toContain('Welcome to koa api template');
  });
});
