import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/database.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}
}
