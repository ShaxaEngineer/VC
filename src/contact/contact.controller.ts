// src/contact/contact.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import {
   ApiBearerAuth,
   ApiBody,
   ApiOperation,
   ApiResponse,
   ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactDtoSW } from 'src/swagger/contact.sw.dto';
import { CreateContactDto } from './contact.dto';

@Controller('contacts')
@ApiTags('Contacts')
@ApiBearerAuth()
export class ContactController {
   constructor(private readonly contactService: ContactService) { }

   @Post('create')
   @ApiOperation({ summary: 'Create a new contact' })
   @ApiBody({ type: CreateContactDtoSW })
   @ApiResponse({ status: 201, description: 'Contact created successfully' })
   @ApiResponse({ status: 400, description: 'Validation failed' })
   async createContact(@Body() createContactDto: CreateContactDto) {
      return this.contactService.createContact(createContactDto);
   }

   @Get()
   @ApiOperation({ summary: 'Get all contact messages' })
   @ApiResponse({ status: 200, description: 'List of contacts' })
   async getAllContacts() {
      return this.contactService.getAllContacts();
   }
}
