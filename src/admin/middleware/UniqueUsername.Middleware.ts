// uniqueness.middleware.ts

import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UniqueUsernameMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: any, res: Response, next: NextFunction) {
    const { username,role ,password} = req.body;
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      return res.status(HttpStatus.CONFLICT).json({ message: 'Username already exists' });
    }
    if(role  && ( role!=='admin'&& role!=='normal') )
      {
        return res.status(HttpStatus.CONFLICT).json({ message: 'Role has to either admin or normal' });
      }
      if(!password ||password.length<=4)
        {
          return res.status(HttpStatus.CONFLICT).json({ message: 'Password has to be atleast 4 characters' });
        }
    next();
  }
}
