import puppeteer from "puppeteer";

jest.setTimeout(60000);

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

afterAll(() => browser.close());
