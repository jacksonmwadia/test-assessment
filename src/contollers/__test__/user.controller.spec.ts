import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { createUser } from '../user.contoller';


describe('User Registration', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('successfully registers a user', async () => {
    const req = {
      body: {
        fname: 'jackson', 
        lname: 'mwadia', 
        CohortNo: 22, 
        email: 'admin@theJitu.com',
        phoneNumber: '0723232444', 
        gender: 'male', 
        password: '12344324211',
      },
    };

    jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('HashedPwdkjshghgksjgkj' as never);

    const mockedInput = jest.fn().mockReturnThis(); // makes it chainable

    const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

    const mockedRequest = {
      input: mockedInput,
      execute: mockedExecute,
    };

    const mockedPool = {
      request: jest.fn().mockReturnValue(mockedRequest),
    };

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

    await createUser(req as any, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Account Created Successfully' });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
