process.env.NODE_ENV = "test"
const request = require("supertest");

const app = require("../app")
const db = require("../db");
const Book = require("../models/book");



describe("Test Books routes", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    let b = await Book.create({
      isbn: "0123456789",
      amazon_url: "testurl.com",
      author: "test_name",
      language: "english",
      pages: 100,
      publisher: "test_publisher",
      title: "test_title",
      year: 2022,
    });
  });

  test("POST / create book", async function () {
    const data = {
      book: {
        isbn: "0123456781",
        amazon_url: "testurl2.com",
        author: "test_name2",
        language: "english",
        pages: 100,
        publisher: "test_publisher",
        title: "test_title2",
        year: 2022,
      }
    };
    const res = await request(app).post("/books").send(data)

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.book.pages).toEqual(100);
  });

  test("GET / get all books", async function () {
    const res = await request(app).get("/books")

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.books).toEqual(expect.any(Array));
    expect(res.body.books[0].pages).toEqual(100);
  });

  test("GET /isbn get book by isbn", async function () {
    const res = await request(app).get("/books/0123456789")

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.book.pages).toEqual(100);
  });

  test("PUT /isbn update book", async function () {
    const data = {
      book: {
        isbn: "0123456789",
        amazon_url: "testurl2.com",
        author: "test_name2",
        language: "english",
        pages: 100,
        publisher: "test_publisher",
        title: "test_title2",
        year: 2022,
      }
    };
    const res = await request(app).put("/books/0123456789").send(data)

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(Object));
    expect(res.body.book.author).toEqual("test_name2");
  });

  test("DEL /isbn delete book", async function () {
    const res = await request(app).delete("/books/0123456789")

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
  });
});

afterAll(async function() {
  await db.end();
});
