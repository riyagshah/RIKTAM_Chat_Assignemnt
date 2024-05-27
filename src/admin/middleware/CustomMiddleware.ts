import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthGuard } from 'src/AuthGuard/AuthGuard';
@Injectable()
export class CustomAuthMiddleware implements NestMiddleware {
  constructor(private readonly authGuard: AuthGuard) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => req,
        getResponse: () => res,
      }),
    };
    try {
      const result = await this.authGuard.canActivate(context);
      if (result) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    } catch (error) {
      console.log(error)
      res.status(403).send('User is not logged in or user is  unauthorized');
    }
  }
}