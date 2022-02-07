import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { CreateUserDto } from '../dto/create-user.dto';

import { UserService } from '../user.service';
import { RoleService } from 'src/role/role.service';

const createUserDto: CreateUserDto = {
  name: 'Andrew',
  surname: 'Reus',
  email: 'andrewreus@gmail.com',
  password: 'andrewthebest',
  phoneNumber: '380670000000',
  roleName: 'user',
};

const user1 = {
  id: 'first user id',
  name: 'Josh',
  surname: 'Wayne',
  email: 'joshwayne@gmail.com',
  password: 'josh2000',
  phoneNumber: '380681111111',
  refreshToken: 'first user refresh token',
  role: {
    id: 'role id',
    name: 'admin',
  },
};

const user2 = {
  id: 'second user id',
  name: 'Alex',
  surname: 'Messi',
  email: 'alexmessi@gmail.com',
  password: 'alexcool',
  phoneNumber: '380682222222',
  refreshToken: 'second user refresh token',
  role: {
    id: 'role id',
    name: 'user',
  },
};

const users = [user1, user2];

describe('UserService', () => {
  let service: UserService;
  let userRepository: MockRepository;
  let roleRepository: MockRepository;

  type MockRepository<T = any> = Partial<
    Record<keyof Repository<T>, jest.Mock>
  >;
  const createMockRepository = <T = any>(): MockRepository => ({
    findOne: jest.fn().mockReturnValue(user1),
    find: jest.fn().mockReturnValue(users),
    preload: jest.fn().mockImplementation((dto) => dto),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => ({
      id: expect.any(String),
      ...user,
    })),
    remove: jest.fn().mockImplementation((user) => user),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        RoleService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(User), useValue: createMockRepository() },
        { provide: getRepositoryToken(Role), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<UserService>(UserService);

    userRepository = module.get<MockRepository>(getRepositoryToken(User));
    roleRepository = module.get<MockRepository>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('returns all users', async () => {
      const result = await service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    describe('user with this ID exists', () => {
      it('returns user object', async () => {
        const user = await service.findOne('first user id');

        expect(user).toEqual(user1);
      });
    });

    describe('user with this ID doesnt exist', () => {
      it('throws NotFoundException', async () => {
        const userId = 'third user id';

        userRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`There is no user under id ${userId}`);
        }
      });
    });
  });

  describe('findOneByEmail', () => {
    describe('user with this email exists', () => {
      it('returns user object', async () => {
        const user = await service.findOneByEmail('joshwayne@gmail.com');

        expect(user).toEqual(user1);
      });
    });
  });

  describe('create', () => {
    it('creates a user', async () => {
      const expected = {
        ...createUserDto,
        role: { id: expect.any(String), name: createUserDto.roleName },
        id: expect.any(String),
      };

      roleRepository.findOne.mockReturnValue({
        id: 'user role id',
        name: 'user',
      });

      const user = await service.create(createUserDto);

      expect(user).toEqual(expected);
    });
  });

  describe('update', () => {
    describe('user and the role exist', () => {
      it('updates user', async () => {
        const expected = {
          ...createUserDto,
          role: { id: expect.any(String), name: createUserDto.roleName },
          id: expect.any(String),
        };

        roleRepository.findOne.mockReturnValue({
          id: 'user role id',
          name: 'user',
        });

        const id = 'second user id';

        const user = await service.update(id, createUserDto);

        expect(user).toEqual(expected);
      });
    });

    describe('user exists but the role doesnt exist', () => {
      it('throws NotFoundException', async () => {
        const id = 'second user id';

        roleRepository.findOne.mockReturnValue(undefined);

        try {
          const user = await service.update(id, createUserDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(
            `There is no role under this name ${createUserDto.roleName}`,
          );
        }
      });
    });

    describe('user doesnt exist', () => {
      it('throws NotFoundException', async () => {
        const id = 'third user id';

        roleRepository.findOne.mockReturnValue({
          id: '87c40994-ebf5-4188-8814-1c03c013b9b3',
          name: 'user',
        });

        userRepository.preload.mockReturnValue(undefined);

        try {
          const user = await service.update(id, createUserDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`There is no user under id ${id}`);
        }
      });
    });
  });

  describe('delete', () => {
    describe('user exists', () => {
      it('deletes user', async () => {
        const id = 'second user id';

        userRepository.findOne.mockReturnValue(user2);

        const deletedUser = await service.remove(id);

        expect(deletedUser).toEqual(user2);
      });
    });

    describe('user doesnt exist', () => {
      it('throws NotFoundException', async () => {
        const id = 'third user id';

        userRepository.findOne.mockReturnValue(undefined);

        try {
          const deletedUser = await service.remove(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`There is no user under id ${id}`);
        }
      });
    });
  });
});
