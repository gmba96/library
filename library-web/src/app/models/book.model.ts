
import { IBook } from '../interfaces/book.interface';

export class Book implements IBook {
    id?: number;
    title!: string;
    author!: string;
    rating!: number;
    year!: number;
    genre!: string;
    authorId!: number;
    
    copyBook(): Book {
        return Object.assign(new Book(), this);
    }

    fromJsan(BookJason:IBook):Book{
        return Object.assign(new Book(),BookJason);
    }

    toJson():IBook{
        const bookJson:IBook = Object.assign({},this);
        delete bookJson.id;
        return bookJson;
    }
}


