import { ForbiddenException, Inject, Injectable, PipeTransform, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { User } from "@prisma/client";

@Injectable({ scope: Scope.REQUEST })
export class UserByIdPipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private request: Request
  ) {}

  transform(userId: any): any {
    const user = this.request.user as User;

    if (user.id !== userId) {
      throw new ForbiddenException('You do not have right to access this user');
    }

    return userId;
  }
}