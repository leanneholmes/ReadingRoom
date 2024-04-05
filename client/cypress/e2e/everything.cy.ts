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

describe("editing a book club", () => {
  it("edits a book club", () => {
    //login first
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

    // grab a club that you own
    // click view club
    // click edit
    // type in something in club description
    // click submit

    cy.get("a[type=pageItem]").contains("2").click();

    cy.contains(".segment", "You are the owner of this club").within(() => {
      cy.get("a").contains("View Club").click();
    });

    cy.get("a[id=edit]").click();

    const clubname = "a new club " + Math.floor(Math.random() * 50);

    cy.get("input[name=name]").clear();

    cy.get("input[name=name]").type(clubname);

    cy.get("textarea[name=description").clear();

    cy.get("textarea[name=description]").type(
      "A new " + clubname + " description"
    );

    cy.get("input[name=meetingLink]").clear();

    cy.get("input[name=meetingLink]").type("http://www.zoom.ca");

    cy.get("input[name=nextMeeting]").type("April 18, 2025 1:30AM");

    cy.get("h4").contains("Genre").click();
    cy.get("h4")
      .contains("Genre")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Romance").click();

    // cy.get("h4").contains("Reading Pace").siblings("div[role=listbox]").click();
    cy.get("h4")
      .contains("Reading Pace")
      .parents(".row")
      .find(".ui.selection.dropdown")
      .click();
    cy.get("span").contains("Fast").click();

    cy.get("input[name=currentBook").clear();

    cy.get("input[name=currentBook").type(clubname + "'s current book");

    cy.get("input[name=currentBookAuthor").clear();

    cy.get("input[name=currentBookAuthor").type(clubname + "'s fave author");

    cy.get("button[id=submit]").click();

    // confirm replaced with new
    cy.get("h4")
      .contains("Club Description")
      .parent()
      .within(() => {
        cy.contains("A new " + clubname + " description");
      });
  });

  it("tries to change name to one that already exists", () => {
    //login first
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

    // grab a club that you own
    // click view club
    // click edit
    // type in something in club description
    // click submit

    cy.get("a[type=pageItem]").contains("2").click();

    cy.contains(".segment", "You are the owner of this club").within(() => {
      cy.get("a").contains("View Club").click();
    });

    cy.get("a[id=edit]").click();

    cy.get("input[name=name]").clear();

    cy.get("input[name=name]").type("Classic Literature Society");

    cy.get("button[id=submit]").should("be.disabled");
  });

  it("edits name but cancels", () => {
    //login first
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

    // grab a club that you own
    // click view club
    // click edit
    // type in something in club description
    // click submit

    cy.get("a[type=pageItem]").contains("2").click();

    cy.contains(".segment", "You are the owner of this club").within(() => {
      cy.get("a").contains("View Club").click();
    });

    cy.get("a[id=edit]").click();

    const clubname = "a new club " + Math.floor(Math.random() * 50);

    cy.get("input[name=name]").clear();

    cy.get("input[name=name]").type(clubname);

    cy.get("button[id=cancel]").click();

    // confirm replaced with new
    cy.get("h2").should("not.include.text", clubname);
  });
});

describe("error tests", () => {
  it("tests the not found error", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.intercept("GET", "http://localhost:5000/api/buggy/not-found").as(
      "notfound"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Not Found").click();

    cy.wait("@notfound").its("response.statusCode").should("eq", 404);
  });

  it("tests the bad request error", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.intercept("GET", "http://localhost:5000/api/buggy/bad-request").as(
      "badrequest"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Bad Request").click();

    cy.wait("@badrequest").its("response.statusCode").should("eq", 400);
  });

  it("tests the validation error", () => {
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

    cy.intercept("POST", "http://localhost:5000/api/bookclubs").as("val");

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Validation Error").click();

    cy.wait("@val").its("response.statusCode").should("eq", 400);
  });

  it("tests the server error", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.intercept("GET", "http://localhost:5000/api/buggy/server-error").as(
      "server"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Server Error").click();

    cy.wait("@server").its("response.statusCode").should("eq", 500);
  });

  it("tests the unauthorized error", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.intercept("GET", "http://localhost:5000/api/buggy/unauthorised").as(
      "unauthorized"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Unauthorized").click();

    cy.wait("@unauthorized").its("response.statusCode").should("eq", 401);
  });

  it("tests the bad guid error", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.intercept("GET", "http://localhost:5000/api/bookclubs/notaguid").as(
      "notaguid"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);

    cy.visit("localhost:3000/errors");

    cy.get("button").contains("Bad Guid").click();

    cy.wait("@notaguid").its("response.statusCode").should("eq", 400);
  });
});

describe("joining a club", () => {
  it("joins a club", () => {
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

    // find any club that not a member of
    cy.get(".segment").each(($el) => {
      // Using jQuery's .text() method to get all text within the element
      const text = $el.text();

      // Check if the text does not contain the specific phrases
      if (
        !text.includes("You are a member of this club") &&
        !text.includes("You are the owner of this club")
      ) {
        // If a .segment does not contain the phrases, find and click the "View Club" button within this segment
        cy.wrap($el).find('a:contains("View Club")').click();

        cy.get("button").contains("Join Club").click();

        cy.get("button").contains("Leave Club");
        return false; // Break the .each() loop by returning false upon finding the first match and performing the action
      }
    });
  });
});

describe("login flow", () => {
  it("logs in", () => {
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
  });

  it("enters wrong username and password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("wrong@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd??");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });

  it("enters no username or password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.visit("localhost:3000");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });

  it("enters no username", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=password]").type("Pa$$w0rd??");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });

  it("enters no password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/login").as(
      "loginRequest"
    );

    cy.visit("localhost:3000");

    cy.get("input[name=email]").type("wrong@test.com");

    cy.get("button[type=submit]").click();

    cy.wait("@loginRequest").its("response.statusCode").should("eq", 401);
  });
});

describe("profile management", () => {
  it("views a profile", () => {
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

    cy.get("div[role=listbox]").click();

    cy.get("a[id=profile]").click();

    cy.get("h1").should("contain", "View Profile");
  });

  it("edits a profile", () => {
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

    cy.get("div[role=listbox]").click();

    cy.get("a[id=profile]").click();

    cy.get("button").contains("Edit Profile").click();

    const bio = "This is my " + Math.floor(Math.random() * 50) + " bio!";

    cy.get("textarea[name=bio]").clear();
    cy.get("textarea[name=bio]").type(bio);

    cy.get("button").contains("Save Changes").click();

    cy.get("span").contains(bio);
  });

  it("edits but cancels changes", () => {
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

    cy.get("div[role=listbox]").click();

    cy.get("a[id=profile]").click();

    cy.get("button").contains("Edit Profile").click();

    const bio = "This is my " + Math.floor(Math.random() * 50) + " bio!";

    cy.get("textarea[name=bio]").clear();
    cy.get("textarea[name=bio]").type(bio);

    cy.get("button").contains("Cancel").click();

    cy.get("div[id=root]").should("not.contain", bio);
  });
});

describe("register flow", () => {
  it("registers", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("New user");

    const username = "newuser" + Math.random() * 20;

    cy.get("input[name=username]").type(username);

    cy.get("input[name=email]").type(username + "@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd!!");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 200);

    cy.wait("@bookclubsLoad").its("response.statusCode").should("eq", 200);

    cy.wait("@accountLoad").its("response.statusCode").should("eq", 200);
  });

  it("enters incorrect password format", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("New user");

    const username = "newuser" + Math.random() * 20;

    cy.get("input[name=username]").type(username);

    cy.get("input[name=email]").type(username + "@test.com");

    cy.get("input[name=password]").type("1234");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("enters incorrect email format", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.intercept(
      "GET",
      "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
    ).as("bookclubsLoad");

    cy.intercept("GET", "http://localhost:5000/api/account").as("accountLoad");

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("New user");

    const username = "newuser" + Math.random() * 20;

    cy.get("input[name=username]").type(username);

    cy.get("input[name=email]").type(username);

    cy.get("input[name=password]").type("Pa$$w0rd!");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("enters existing username and password", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    cy.get("input[name=username]").type("deanna");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("enters existing username but different email", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    cy.get("input[name=username]").type("deanna");

    const email = "newuser" + Math.random() * 20 + "@test.com";

    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("enters existing email but different username", () => {
    cy.intercept("POST", "http://localhost:5000/api/account/register").as(
      "registerRequest"
    );

    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    const username = "deanna" + Math.random() * 20;

    cy.get("input[name=username]").type(username);

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").click();

    cy.wait("@registerRequest").its("response.statusCode").should("eq", 400);
  });

  it("enters no password", () => {
    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    cy.get("input[name=username]").type("deanna");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("button[type=submit]").should("be.disabled");
  });

  it("enters no username", () => {
    cy.visit("localhost:3000");

    cy.get("a").contains("Click here").click();

    cy.get("input[name=displayName]").type("Deanna");

    cy.get("input[name=email]").type("deanna@test.com");

    cy.get("input[name=password]").type("Pa$$w0rd");

    cy.get("button[type=submit]").should("be.disabled");
  });

  it("goes back to login page", () => {
    cy.visit("localhost:3000");

    cy.get("div").contains("Don't have an account?").find("a").click();

    cy.get("div").contains("Already have an account?").find("a").click();
  });
});

describe("viewing a book club", () => {
  it("views a book club", () => {
    //login first
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

    cy.get(".segment")
      .contains("Historical Fiction Voyage")
      .get("a")
      .contains("View Club")
      .click();

    // check original
    cy.get("h1").contains("View Book Club");
  });

  it("leaves book club", () => {
    //login first
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

    cy.get(".segment").first().get("a").contains("View Club").click();

    cy.get("button").contains("Leave Club").click();

    cy.get("button").should("contain.text", "Join Club");
  });

  it("joins book club", () => {
    //login first
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

    cy.get(".segment").first().get("a").contains("View Club").click();

    cy.get("button").contains("Join Club").click();

    cy.get("button").should("contain.text", "Leave Club");
  });

  it("leaves a message", () => {
    //login first
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

    cy.get(".segment").first().get("a").contains("View Club").click();

    const message = "message " + Math.floor(Math.random() * 50);

    cy.get("textarea[id=message]").type(message + "{enter}");
  });

  it("views a member", () => {
    //login first
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

    // cy.get(".segment").first().get("a").contains("View Club").click();

    // find any club that not a member of
    cy.get(".segment").each(($el) => {
      // Using jQuery's .text() method to get all text within the element
      const text = $el.text();

      // Check if the text does not contain the specific phrases
      if (
        !text.includes("You are a member of this club") ||
        !text.includes("You are the owner of this club")
      ) {
        // If a .segment does not contain the phrases, find and click the "View Club" button within this segment
        cy.wrap($el).find('a:contains("View Club")').click();

        cy.get("a").contains("Deanna").click();

        cy.get("h1").should("contain", "View Profile");
        cy.get("h2").should("contain", "Deanna");

        return false; // Break the .each() loop by returning false upon finding the first match and performing the action
      }
    });
  });
});
