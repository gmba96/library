
import { IBook } from '../interfaces/book.interface';

export class Book implements IBook {
    id?: number;
    title!: string;
    author!: string;
    genre!: string;
    year!: number;
    rating!: number;
    
    
//---------------------- mothod to convert json to book object------------------------------

    fromJson(bookJson: IBook): Book {
        return Object.assign(new Book(), bookJson);
    }
    
    toJson():IBook{
        const bookJson:IBook = Object.assign({},this);
        console.log(bookJson);
        return bookJson;
    }
}
