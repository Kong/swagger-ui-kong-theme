describe("Demo app basic tests", () => {

  beforeEach(async () => {
    await page.goto("http://localhost:3000");
    await page.reload();
  });

  it("navigate to the app and you should see the httpbin spec", async () => {
    const infoTitle = await page.$eval(
      ".info .header h2.title",
      (el) => el.innerText
    );

    expect(infoTitle).toBe("httpbin\n 1.0-oas3 \nOAS3");
  });

});
