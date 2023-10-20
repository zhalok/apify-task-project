import { Injectable, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/user.schema';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  // private readonly UserService: UsersService;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(creds: LoginDto) {
    let { email, password } = creds;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const payload = {
      user: user._id,
      type: user.type,
    };

    return {
      message: 'Login successful',
      token: await this.jwtService.sign(payload),
    };
  }

  async signup(userInformation: SignupDto) {
    let { username, email, password, confirmedPassword, type } =
      userInformation;

    if (password !== confirmedPassword) {
      throw new Error('Password and confirmed password do not match');
    }
    userInformation.password = this.hashPassword(password);
    userInformation.confirmedPassword = null;
    try {
      const user = await this.userModel.create(userInformation);

      console.log(user);
      const payload = {
        user: user._id,
        type: user.type,
      };
      return {
        message: 'User created successfully',
        user,
        token: await this.jwtService.sign(payload),
      };
    } catch (e) {
      console.log(e);
    }
  }

  hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
