describe("book club creation", () => {
  let runCount = 5;
  while (runCount > 0) {
    it("logs in, creates book club, edits book club, searches and filters book clubs, then joins a book club", () => {
      // login first
      cy.intercept("POST", "http://localhost:5000/api/account/login").as(
        "loginRequest"
      );

      cy.intercept(
        "GET",
        "http://localhost:5000/api/bookclubs?pageNumber=1&pagesize=5&all=true"
      ).as("bookclubsLoad");

      cy.intercept("GET", "http://localhost:5000/api/account").as(
        "accountLoad"
      );

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

      const clubname = "a new club " + Math.floor(Math.random() * 5000);

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

      cy.wait("@clubCreateRequest")
        .its("response.statusCode")
        .should("eq", 200);

      cy.get("a[id=edit]").click();

      const newclubname = "a new club " + Math.floor(Math.random() * 5000);
      const newClubDescription = "A new " + newclubname + " description";

      cy.get("input[name=name]").clear();

      cy.get("input[name=name]").type(newclubname);

      cy.get("textarea[name=description").clear();

      cy.get("textarea[name=description]").type(newClubDescription);

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
          cy.contains(newClubDescription);
        });

      cy.get("a").contains("View Book Clubs").click();

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
    runCount--;
  }
});
