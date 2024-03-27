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
