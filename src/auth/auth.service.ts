import { Injectable, Inject } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
// import bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');
import { HttpException, HttpStatus } from '@nestjs/common';
const crypto = require('crypto');
// import { gMail } from '../utils/email';

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
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
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

      let verifyToken =
        Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString();
      verifyToken = crypto
        .createHash('sha256')
        .update(verifyToken)
        .digest('hex');
      const mailOptions = {
        from: process.env.Mail,
        // @ts-ignore
        to: user.email,
        subject: 'Verify you Ambel account',
        html: `<h1>Your verification code is ${verifyToken}</h1><p>Use this code on Ambel 2-factor authentication</p>`,
        text: `Your verification code is ${verifyToken}`,
      };
      // await gMail.sendMail(mailOptions);

      // console.log(user);
      const payload = {
        user: user._id,
        type: user.type,
      };
      const token = await this.jwtService.sign(payload);
      return {
        message: 'User created successfully',
        user,
        token: token,
      };
    } catch (e) {
      // console.log(e);
      console.log(e);
      // throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
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
