describe("browse clubs", () => {
  it("filters clubs by genre", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // search books

    // grab ui container
    // select 'Mystery' in dropdown
    // for each ui segment
    // should contain child node a tag that says 'Mystery'

    cy.get("div[name=category]").click();

    cy.get("span").contains("Mystery").click();

    cy.get(".segment").each(($segment) => {
      cy.wrap($segment).should("contain", "Mystery");
    });
  });

  it("filters clubs by reading pace", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // search books

    // grab ui container
    // select 'Moderate' in dropdown
    // for each ui segment
    // should contain child node a tag that says 'Moderate Pace'

    cy.get("div[name=readingPace]").click();

    cy.get("span").contains("Moderate").click();

    cy.get(".segment").each(($segment) => {
      cy.wrap($segment).should("contain", "Moderate Pace");
    });
  });

  it("filters clubs by genre AND reading pace", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // search books

    // grab ui container
    // select 'Mystery' in dropdown
    // for each ui segment
    // should contain child node a tag that says 'Mystery'

    cy.get("div[name=category]").click();

    cy.get("span").contains("Mystery").click();

    cy.get("div[name=readingPace]").click();

    cy.get("span").contains("Moderate").click();

    cy.get(".segment").each(($segment) => {
      cy.wrap($segment).should("contain", "Moderate Pace");
      cy.wrap($segment).should("contain", "Mystery");
    });
  });

  it("filters then resets", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // search books

    // grab ui container
    // select 'Mystery' in dropdown
    // for each ui segment
    // should contain child node a tag that says 'Mystery'

    cy.get("div[name=category]").click();

    cy.get("span").contains("Mystery").click();

    cy.get("div[name=readingPace]").click();

    cy.get("span").contains("Moderate").click();

    cy.get(".segment").each(($segment) => {
      cy.wrap($segment).should("contain", "Moderate Pace");
      cy.wrap($segment).should("contain", "Mystery");
    });

    cy.get("button").contains("Reset Filters").click();

    cy.get(".segment").first().should("not.include.text", "Mystery");
    cy.get(".segment").first().should("not.include.text", "Moderate Pace");
  });

  it("goes to the next page of results", () => {
    // login first
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    // search books

    // grab ui container
    // select 'Moderate' in dropdown
    // for each ui segment
    // should contain child node a tag that says 'Moderate Pace'

    cy.get("a[type=pageItem]").contains("2").click();

    cy.get(".segment").first().should("include.text", "View Club");
  });
});
