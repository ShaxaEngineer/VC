// src/contact/contact.controller.ts
import { Query } from '@nestjs/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
   ApiBearerAuth,
   ApiBody,
   ApiOperation,
   ApiResponse,
   ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDtoSW, ResponseContactDtoSW } from 'src/swagger/contact.sw.dto';
import { CreateContactDto } from './contact.dto';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('contacts')
@ApiTags('Contacts')
@ApiBearerAuth()
export class ContactController {
   constructor(private readonly contactService: ContactService) { }

   @Post('create')
   @ApiOperation({ summary: 'Create a new contact' })
   @ApiBody({ type: CreateContactDtoSW })
   @ApiResponse({ status: 201, description: 'Contact created successfully', type: ResponseContactDtoSW })
   @ApiResponse({ status: 400, description: 'Validation failed' })
   async createContact(@Body() createContactDto: CreateContactDto) {
      return this.contactService.createContact(createContactDto);
   }


   @Get()
   @UseGuards(AdminGuard)
   @ApiOperation({ summary: 'Get all contact messages, only admins can get list' })
   @ApiResponse({ status: 200, description: 'List of contacts with pagination', type: ResponseContactDtoSW })
   async getAllContacts(
      @Query('page') page = 1,
      @Query('limit') limit = 10,
   ) {
      return this.contactService.getAllContacts(Number(page), Number(limit));
   }

}
