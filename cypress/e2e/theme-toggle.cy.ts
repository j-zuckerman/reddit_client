describe("Theme Toggle", () => {
  //   it("initial theme should be light", () => {
  //     cy.visit("/");
  //     cy.document().then((doc) => {
  //       cy.wrap(doc.documentElement).should("have.attr", "data-theme", "light");
  //     });
  //   });

  it("should toggle the theme from light to dark and back", () => {
    cy.visit("/");

    cy.get("#theme-toggle").find('input[type="checkbox"]').first().check({ force: true });

    cy.document().then((doc) => {
      cy.wrap(doc.documentElement).should("have.attr", "data-theme", "dark");
    });

    cy.get("#theme-toggle").find('input[type="checkbox"]').first().uncheck({ force: true });

    cy.document().then((doc) => {
      cy.wrap(doc.documentElement).should("have.attr", "data-theme", "light");
    });
  });
});
