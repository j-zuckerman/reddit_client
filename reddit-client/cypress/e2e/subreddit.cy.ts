describe("Subreddit Form Submission", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens the modal, submits the form, and checks to see if the subreddit and posts exist", () => {
    const subreddit = "pics";
    cy.get(".circular-button").click();

    cy.get(".modal-container").should("be.visible");

    cy.get("input#name").type(subreddit);

    cy.get("form").submit();

    cy.get(".modal-container").should("not.exist");

    cy.get("nav.breadcrumb").find("li.breadcrumb-item").contains(`r/${subreddit}`).click();

    cy.get(".post").should("have.length.greaterThan", 5);
  });
});
