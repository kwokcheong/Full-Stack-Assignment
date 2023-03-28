const { showTeachers } = require('../../../controllers/TeachersController');
const { Teachers } = require('../../../models');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('showTeachers', () => {
  let req, res, teachers;

  beforeEach(() => {
    // Set up mocks for request, response and teachers data
    req = {};

    res = {
      send: sinon.spy(),
      status: sinon.stub().returns({ json: sinon.spy() }),
    };

    teachers = [
      {
        name: 'KC',
        subject: 'Mathematics',
        email: 'test@hotmail.com',
        contactNumber: '981263322',
      },
      {
        name: 'kcsaur',
        subject: 'English Language',
        email: 'tester@hotmail.com',
        contactNumber: '98323222',
      },
    ];
  });

  it('should send a list of teachers', async () => {
    // Set up stubs for Teachers.findAll and Teachers.attributes
    const findAllStub = sinon.stub().returns(teachers);
    Teachers.findAll = findAllStub;

    // Call showTeachers with the mocked request and response
    await showTeachers(req, res);

    // Assert that in the (send), it has the correct data.
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.args[0][0].data).to.deep.equal([
      {
        name: 'KC',
        subject: 'Mathematics',
        email: 'test@hotmail.com',
        contactNumber: '981263322',
      },
      {
        name: 'kcsaur',
        subject: 'English Language',
        email: 'tester@hotmail.com',
        contactNumber: '98323222',
      },
    ]);
  });

  it('should return an error if there is an exception thrown', async () => {
    // Set up stubs for Teachers.findAll
    const findAllStub = sinon.stub().throws('Error');
    Teachers.findAll = findAllStub;

    // Call showTeachers with the mocked request and response
    await showTeachers(req, res);

    // Assert that res.status was called once with the correct status code
    expect(res.status.calledOnce).to.be.true;
    expect(res.status.args[0][0]).to.equal(500);
  });
});
