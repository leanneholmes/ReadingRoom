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
