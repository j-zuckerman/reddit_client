describe("Post Component Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should check initial state and toggle the post expansion", () => {
    cy.get(".post-expand").first().should("be.visible");
    cy.get(".post-expand").first().click();

    cy.get(".post-expanded").first().should("exist").and("be.visible");

    cy.get(".post-expand").first().click();

    cy.get(".post-expanded").should("not.exist");
  });

  it("should prevent navigation when clicking on expandable content", () => {
    cy.get(".post-expand").first().click({ force: true });
    cy.location("href").should("eq", "http://localhost:4173/");
  });
});
