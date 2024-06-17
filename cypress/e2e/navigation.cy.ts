describe("navigation", () => {
  it("home have characters", () => {
    cy.visit("/");
    cy.get('[data-id="characters"] a').should("have.length", 20);
    cy.get('[href="/character/1"]').should("be.visible");
  });

  it("navigate to character and have info and episodes", () => {
    cy.visit("/");
    cy.get('[href="/character/1"]').should("be.visible");
    cy.get('[href="/character/1"]').click();
    cy.get('[data-id="character-info"]').should("be.visible");
    cy.get('[data-id="character-episodes"]').should("be.visible");
    cy.get('[data-id="character-episodes"] li').should("have.length", 51);
  });

  it("navigate to character and navigate back to home", () => {
    cy.visit("/");
    cy.get('[data-id="back-to-home"]').should("not.be.exist");
    cy.get('[href="/character/1"]').should("be.visible");
    cy.get('[href="/character/1"]').click();
    cy.get('[data-id="character-info"]').should("be.visible");
    cy.get("img").should("be.visible");
    cy.get('[data-id="back-to-home"]').should("be.visible");
    cy.get('[data-id="back-to-home"]').click();
    cy.get('[href="/character/1"]').should("be.visible");
  });

  it("search character", () => {
    cy.visit("/");
    cy.get("nav").should("be.visible");
    cy.get("input").should("be.visible");
    cy.get("input").type("rick");
    cy.get('[data-id="search-results"]').should(
      "have.text",
      "found 107 characters"
    );
    cy.get('[data-id="characters"] a').should("have.length", 20);
  });

  it("previous button disable at beginning", () => {
    cy.visit("/");
    cy.get('[data-id="prev-btn"]').should("be.visible");
    cy.get('[data-id="prev-btn"]').should("be.disabled");
  });

  it("next button active at beginning", () => {
    cy.visit("/");
    cy.get('[data-id="next-btn"]').should("be.visible");
    cy.get('[data-id="next-btn"]').should("not.be.disabled");
  });

  it("next page have characters and previous page active", () => {
    cy.visit("/");
    cy.get('[data-id="next-btn"]').should("be.visible");
    cy.get('[data-id="next-btn"]').click();
    cy.get('[data-id="characters"] a').should("have.length", 20);
    cy.get('[data-id="prev-btn"]').should("not.be.disabled");
    cy.get('[data-id="prev-btn"]').click();
    cy.get('[href="/character/1"]').should("be.visible");
  });

  it("add character to favorites and delete from favorites", () => {
    cy.visit("/");
    cy.get('[href="/character/1"]').should("be.visible");
    cy.get('[href="/character/1"]').click();
    cy.get('[data-id="character-info"]').should("be.visible");
    cy.get("img").should("be.visible");
    cy.get('[data-id="add-favorite"]').click();
    cy.contains("Already Added to Favorites ✅");
    cy.get('[data-id="back-to-home"]').click();
    cy.get('[data-id="favorites-btn"]').should("be.visible");
    cy.get('[data-id="favorites-btn"]').click();
    cy.contains(/list of favorites/i);
    cy.get('[data-id="character-favorites"] li').should("have.length", 1);
    cy.get('[data-id="delete-character-1"]').should("be.visible");
    cy.get('[data-id="delete-character-1"]').click();
    cy.get('[data-id="character-favorites"] li').should("have.length", 0);
  });
});
``;
