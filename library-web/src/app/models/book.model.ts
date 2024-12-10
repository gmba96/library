
import { IBook } from '../interfaces/book.interface';

export class Book implements IBook {
    id?: number;
    title!: string;
    author!: string;
    genre!: string;
    year!: number;
    rating!: number;
    
    copyBook(): Book {
        return Object.assign(new Book(), this);
    }

    fromJson(bookJson: IBook): Book {
        return Object.assign(new Book(), bookJson);
    }
    
    toJson():IBook{
        const bookJson:IBook = Object.assign({},this);
        console.log(bookJson);
        return bookJson;
    }
}
