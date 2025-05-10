import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@Controller('contact')
@ApiTags('contact')
@ApiBearerAuth()
export class ContactController {}
