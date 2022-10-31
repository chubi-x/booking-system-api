import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as pactum from 'pactum';
import { LoginDto, SignupDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let prisma: PrismaService;

  const signupDto: SignupDto = {
    firstName: 'chubi',
    lastName: 'adejoh',
    email: 'chubi@gmail.com',
    password: '123',
  };
  const badSignupDto = {
    firstName: 2,
    lastName: 2,
    email: 2,
    password: 2,
  };
  const loginDto: LoginDto = {
    email: 'chubi@gmail.com',
    password: '123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, ConfigService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    prisma = module.get<PrismaService>(PrismaService);

    pactum.request.setBaseUrl('http://localhost:4000/auth');
    await prisma.cleanDb();
  });

  // function to test if body parameters are empty
  function emptyReqBodyTest(
    dto: SignupDto | LoginDto,
    endpoint: string,
    bodyParam: string,
    inspect: boolean,
  ) {
    it(`should throw if ${bodyParam} empty`, () => {
      let bodyObject: SignupDto | LoginDto;

      if (dto instanceof SignupDto) {
        bodyObject = {
          firstName: dto.firstName,
          lastName: dto.lastName,
          password: dto.password,
          email: dto.email,
        };
      } else {
        bodyObject = {
          email: dto.email,
          password: dto.password,
        };
      }
      const keys = Object.keys(bodyObject);
      keys.forEach((key) => {
        if (bodyParam === key) {
          delete bodyObject[key];
        }
      });
      const test = pactum
        .spec()
        .post(`/auth/${endpoint}`)
        .withBody(bodyObject)
        .expectStatus(400);
      if (inspect) return test.inspect();
      else return test;
    });
  }

  describe('Sign Up', () => {
    // successful sign up
    it('Should sign up', () => {
      return pactum
        .spec()
        .post('/signup')
        .withBody(SignupDto)
        .expectStatus(201)
        .inspect();
    });

    // empty req body
    describe('empty req body parameters', () => {
      // empty email
      emptyReqBodyTest(signupDto, '/signup', 'email', false);
      // empty first name
      emptyReqBodyTest(signupDto, '/signup', 'firstName', false);
      // empty last name
      emptyReqBodyTest(signupDto, '/signup', 'lastName', false);
      // empty password
      emptyReqBodyTest(signupDto, '/signup', 'password', false);
      // empty req body
      it('should throw if no body provided', () => {
        return pactum.spec().post('/signup').expectStatus(400);
      });
    });

    describe('Login', () => {
      // successful sign up
      it('Should login', () => {
        return pactum
          .spec()
          .post('/login')
          .withBody(loginDto)
          .expectStatus(201)
          .inspect();
      });

      // empty req body
      describe('empty req body parameters', () => {
        // empty email
        emptyReqBodyTest(loginDto, '/login', 'email', false);
        // empty first name
        emptyReqBodyTest(loginDto, '/login', 'firstName', false);
        // empty last name
        emptyReqBodyTest(loginDto, '/login', 'lastName', false);
        // empty password
        emptyReqBodyTest(loginDto, '/login', 'password', false);
        // empty req body
        it('should throw if no body provided', () => {
          return pactum.spec().post('/login').expectStatus(400);
        });
      });
    });
  });
});
