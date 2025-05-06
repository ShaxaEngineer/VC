import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
   constructor(private readonly jwtService: JwtService) { }

   async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];

      if (!authHeader) {
         throw new UnauthorizedException('No token provided');
      }

      const token = authHeader.split(' ')[1];

      console.log(token, 1111);

      try {
         const decoded: any = await this.jwtService.verifyAsync(token);
         console.log(decoded, 222222222);

         request.user = decoded;

         if (decoded.role == 'admin') {
            console.log("working shit...........");

            return true;
         } else {
            throw new UnauthorizedException('You are not authorized to access this resource');
         }
      } catch (error) {
         console.log(error, 111111111);

         throw new UnauthorizedException('Invalid token');
      }
   }
}
