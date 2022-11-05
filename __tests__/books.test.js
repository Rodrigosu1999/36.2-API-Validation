const db = require("../db");
const Book = require("../models/book");


describe("Test Book class", function () {
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

  test("can create", async function () {
    const b = await Book.create({
      isbn: "0123456781",
      amazon_url: "testurl2.com",
      author: "test_name2",
      language: "english",
      pages: 100,
      publisher: "test_publisher",
      title: "test_title2",
      year: 2022,
    });

    expect(b.author).toBe("test_name2");
    expect(b.pages).toEqual(expect.any(Number));
  });


  test("can update book", async function () {
    const b = await Book.update("0123456789",{
      isbn: "0123456781",
      amazon_url: "testurl2.com",
      author: "test_name2",
      language: "english",
      pages: 100,
      publisher: "test_publisher",
      title: "test_title2",
      year: 2022,
    });
    expect(b.title).toEqual("test_title2");
  });

  test("can remove book", async function () {
    await Book.remove("0123456789");
    const b = await Book.findAll();
    expect(b.length).toBe(0);
  });

  test("get one book", async function () {
    const b = await Book.findOne("0123456789");
    expect(b.author).toEqual("test_name");
    expect(b).toEqual(expect.any(Object));
  });

  test("get all books", async function () {
    const b = await Book.findAll();

    expect(b.length).toEqual(1);
    expect(b).toEqual(expect.any(Array));
    expect(b[0]).toEqual(expect.any(Object));
  });
});

afterAll(async function() {
  await db.end();
});
