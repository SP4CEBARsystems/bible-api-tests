
import { BibleClient, PassageReference } from '@gracious.tech/fetch-client'

export default class BibleText {
    verses: string[];
    client: BibleClient;
    collection: any;
    translations: any;
    translation_id: any;
    books: any;
    book: any;
    corePromise: Promise<any>;

    constructor() {
        this.verses = [];

        // Init client
        this.client = new BibleClient()
        // this.fetch();
        this.corePromise = this.fetchCore();
    }

    async fetchCore() {
        // Fetch the collection's meta data
        this.collection = await this.client.fetch_collection()
    }
    
    async fetch() {
        await this.corePromise;

        // Get what translations are available
        this.translations = this.collection.get_translations()
        console.log(this.translations)

        // Get the id of the first translation available
        this.translation_id = this.translations[0].id

        // Load local book names for the translation
        await this.collection.fetch_translation_extras(this.translation_id)

        // Get what books are available for the translation
        // (may be whole Bible or may only be e.g. NT)
        this.books = this.collection.get_books(this.translation_id)

        // Fetch the contents of the first book
        this.book = await this.collection.fetch_book(this.translation_id, this.books[0].id)

        // Output the HTML of the first chapter of the book
        // console.log(this.book.get_chapter(1))

        const kjv = this.translations.find(t => t.name.includes("King James"))
        const englishBooks = this.translations.filter(t => t.language.includes("eng"))
        const dutchBooks = this.translations.filter(t => t.language.includes("nld"))
        const frenchBooks = this.translations.filter(t => t.language.includes("fra"))
        const germanBooks = this.translations.filter(t => t.language.includes("deu"))
        console.log(kjv.id)
        console.log('englishBooks', englishBooks)
        console.log('dutchBooks', dutchBooks)
        console.log('frenchBooks', frenchBooks)
        console.log('germanBooks', germanBooks)

        return this.book.get_chapter(1);
    }

    async getVerse(refString:string = 'John 3:16-17', translationId:string = "eng_kjv"):Promise<string> {
        await this.corePromise;
        // return this.fetch();
        const ref = PassageReference.from_string(refString);
        console.log(ref);
        const book = await this.collection.fetch_book(translationId, ref?.book);
        return book.get_verse(ref?.start_chapter, ref?.start_verse);
    }
}