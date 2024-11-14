describe("Subreddit Form Submission", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("opens the modal, submits the form, and checks to see if the aubreddit and posts exist", () => {
    cy.get(".circular-button").click();

    cy.get(".modal-container").should("be.visible");

    cy.get("input#name").type("all");

    cy.get("form").submit();

    cy.get(".modal-container").should("not.exist");
  });
});
