export class CreateNewsDto {
   title: string;
   content: string;
   author: string;
   date: Date;
}

export class UpdateNewsDto {
   title?: string;
   content?: string;
   author?: string;
   date?: Date;
}
