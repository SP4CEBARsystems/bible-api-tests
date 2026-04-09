
import {BibleClient} from '@gracious.tech/fetch-client'

// Init client
const client = new BibleClient()

// Fetch the collection's meta data
const collection = await client.fetch_collection()

// Get what translations are available
const translations = collection.get_translations()

// Get the id of the first translation available
const translation_id = translations[0].id

// Load local book names for the translation
await collection.fetch_translation_extras(translation_id)

// Get what books are available for the translation
// (may be whole Bible or may only be e.g. NT)
const books = collection.get_books(translation_id)

// Fetch the contents of the first book
const book = await collection.fetch_book(translation_id, books[0].id)

// Output the HTML of the first chapter of the book
console.log(book.get_chapter(1))