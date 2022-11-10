import supertest from 'supertest';
import calculator from '../calculator';

const request = supertest(calculator);

describe('Calculator Endpoints', () => {
  it('PUT /calculate should return success result if correct equation is sent', async () => {
    const res = await request
      .put('/calculate')
      .send({ equation: '4+4' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      result: '8',
    });
  });

  it('PUT /calculate should return not successive result if incorrect equation is sent', async () => {
    const res = await request
      .put('/calculate')
      .send({ equation: '2*1-' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: false,
    });
  });

  it('PUT /calculate should return result as empty string if empty equation is sent', async () => {
    const res = await request
      .put('/calculate')
      .send({ equation: '' });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      result: '',
    });
  });
});
