
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

    fromJson(bookJson: IBook): Book {
        return Object.assign(new Book(), bookJson);
    }
    
    toJson():IBook{
        const bookJson:IBook = Object.assign({},this);
        delete bookJson.id;
        return bookJson;
    }
}


