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
