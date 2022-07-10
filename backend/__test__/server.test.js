const request = require('supertest');

const app = require('../server');

var token;

const loginUser = async (email, password) => {
  const results = await request(app).post('/api/users/login').send({
    email,
    password,
  });
  return results;
};

beforeAll(async () => {
  const results = await loginUser('mariya11@gmail.com', '123');
  console.log('results', results.body);

  if (results.body.token) token = results.body.token;
});

describe('Test example', () => {
  test('GET /', (done) => {
    request(app)
      .get('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .expect((res) => {
        console.log(res.body);
        res.body.length = 2;
      })
      .end((err, res) => {
        console.log(err);
        if (err) return done(err);
        return done();
      });
  });

  test('POST /send', (done) => {
    request(app)
      .post('/api/notes')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({
        note: 'dcd',
      })
      .expect(201)
      .expect((res) => {
        // console.log(res.body);
        res.body.data.length = 1;
      })
      .end((err, res) => {
        if (err) return done(err);

        return done();
      });
  });
});
