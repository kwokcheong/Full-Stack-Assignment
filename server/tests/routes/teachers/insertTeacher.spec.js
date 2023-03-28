const sinon = require('sinon');
const mockRequire = require('mock-require');
const { insertTeachers } = require('../../../controllers/TeachersController');
const { Teachers } = require('../../../models');
const expect = require('chai').expect;

describe('insertTeachers', () => {
  let createStub;

  before(() => {
    // Mock the create method of the Teachers model
    createStub = sinon.stub(Teachers, 'create').resolves();
  });

  after(() => {
    // Restore the original implementation of the Teachers model
    createStub.restore();
  });

  it('should create a new teacher successfully', async () => {
    const req = {
      body: {
        name: 'John Doe',
        subject: 'Mathematics',
        email: 'john@doe.com',
        contactNumber: '12345678',
      },
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(201);
        return {
          json(data) {
            expect(data).to.deep.equal({
              message: 'Teacher created successfully',
            });
          },
        };
      },
    };
    await insertTeachers(req, res);
    expect(createStub.calledOnce).to.be.true;
  });
});
