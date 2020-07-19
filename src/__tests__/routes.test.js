/*
 * Description: Main Route test pilot.
 * Author: Cacaudev
 * Date: 22/11/2019
 */
import supertest from 'supertest';
import http from 'http';
import App from '../app';

/*
 * OBS: Using http.createServer() as workaround
 * for supertest need for http.Server to work on.
 * Calling app.listen() to get a server will
 * start a listening server, this is bad
 * practice and unnecessary.
 */

describe('Integration App Test', () => {
  test('[GET] /', (done) => {
    const app = new App();
    const apptest = supertest(http.createServer(app.callback()));
    apptest.get('/').expect(200);
    done();
  });
});
