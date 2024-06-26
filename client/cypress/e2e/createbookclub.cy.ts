describe("book club creation", () => {
  it("logs in and creates a book club", () => {
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

    // logged in, now create club

    cy.intercept("POST", "http://localhost:5000/api/bookclubs").as(
      "clubCreateRequest"
    );

    cy.get("a").contains("Create A Club").click();

    const clubname = "a new club " + Math.floor(Math.random() * 50);

    cy.get("input[name=name]").type(clubname);

    cy.get("textarea[name=description]").type("a new club for readers");

    cy.get("input[name=meetingLink]").type("http://www.zoom.ca");

    cy.get("input[name=nextMeeting]").type("April 18, 2024 1:30AM");

    cy.get("h4").contains("Genre").click();
    cy.get("h4")
      .contains("Genre")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Mystery").click();

    // cy.get("h4").contains("Reading Pace").siblings("div[role=listbox]").click();
    cy.get("h4")
      .contains("Reading Pace")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Slow").click();

    cy.get("input[name=currentBook").type("something to read");

    cy.get("input[name=currentBookAuthor").type("some author");

    cy.get("button[type=submit]").click();

    cy.wait("@clubCreateRequest").its("response.statusCode").should("eq", 200);
  });

  it("doesn't enter a club name", () => {
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

    // logged in, now create club

    cy.intercept("POST", "http://localhost:5000/api/bookclubs").as(
      "clubCreateRequest"
    );

    cy.get("a").contains("Create A Club").click();

    cy.get("textarea[name=description]").type("a new club for readers");

    cy.get("input[name=meetingLink]").type("http://www.zoom.ca");

    cy.get("input[name=nextMeeting]").type("April 18, 2024 1:30AM");

    cy.get("h4").contains("Genre").click();
    cy.get("h4")
      .contains("Genre")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Mystery").click();

    // cy.get("h4").contains("Reading Pace").siblings("div[role=listbox]").click();
    cy.get("h4")
      .contains("Reading Pace")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Slow").click();

    cy.get("input[name=currentBook").type("something to read");

    cy.get("input[name=currentBookAuthor").type("some author");

    cy.get("button[type=submit]").should("be.disabled");
  });

  it("enters an invalid meeting link", () => {
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

    // logged in, now create club

    cy.intercept("POST", "http://localhost:5000/api/bookclubs").as(
      "clubCreateRequest"
    );

    cy.get("a").contains("Create A Club").click();

    const clubname = "new club " + Math.floor(Math.random() * 50);

    cy.get("input[name=name]").type(clubname);

    cy.get("textarea[name=description]").type("a new club for readers");

    cy.get("input[name=meetingLink]").type("not a website");

    cy.get("input[name=nextMeeting]").type("April 18, 2024 1:30AM");

    cy.get("h4").contains("Genre").click();
    cy.get("h4")
      .contains("Genre")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Mystery").click();

    // cy.get("h4").contains("Reading Pace").siblings("div[role=listbox]").click();
    cy.get("h4")
      .contains("Reading Pace")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Slow").click();

    cy.get("input[name=currentBook").type("something to read");

    cy.get("input[name=currentBookAuthor").type("some author");

    cy.get("button[type=submit]").should("be.disabled");
  });

  it("enters an existing club name", () => {
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

    // logged in, now create club

    cy.intercept("POST", "http://localhost:5000/api/bookclubs").as(
      "clubCreateRequest"
    );

    cy.get("a").contains("Create A Club").click();

    const clubname = "Classic Literature Society";

    cy.get("input[name=name]").type(clubname);

    cy.get("textarea[name=description]").type("a new club for readers");

    cy.get("input[name=meetingLink]").type("http://www.zoom.ca");

    cy.get("input[name=nextMeeting]").type("April 18, 2024 1:30AM");

    cy.get("h4").contains("Genre").click();
    cy.get("h4")
      .contains("Genre")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Mystery").click();

    // cy.get("h4").contains("Reading Pace").siblings("div[role=listbox]").click();
    cy.get("h4")
      .contains("Reading Pace")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Slow").click();

    cy.get("input[name=currentBook").type("something to read");

    cy.get("input[name=currentBookAuthor").type("some author");

    cy.get("button[type=submit]").should("be.disabled");
  });
});
