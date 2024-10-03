describe("Main", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("character tests", () => {
    it("#1 home page should have a header and have characters", () => {
      cy.get("header").should("exist").and("be.visible");
      cy.getByData("characters", "a").should("have.length", 20);
    });

    it("#2 search should have results length and characters", () => {
      cy.get("header input").should("be.visible");
      cy.get("header input").first().type("rick");
      cy.get("header").contains("p", /107/i).should("be.visible");
      cy.getByData("characters", "a")
        .eq(0)
        .contains("h3", /rick/i)
        .should("be.visible");
      cy.getByData("characters", "a")
        .eq(19)
        .contains("h3", /rick/i)
        .should("be.visible");
    });

    it("3# at beginning favorites should be empty after when character favorites should have character when delete character favorites should be empty", () => {
      cy.get("header button").find("span").should("contain.text", "");
      cy.getByData("characters", "a").eq(0).contains(/rick/i).click();
      cy.contains("button", /add to favorite/i)
        .should("be.visible")
        .and("not.contain.text", /already added/i)
        .click();
      cy.contains(/already added/i)
        .should("be.visible")
        .and("not.contain.text", /add to favorite/i);
      cy.contains("a", /back to home/i).click();
      cy.get("header button").find("span").should("contain.text", 1);
      cy.get("header").contains("button", 1).should("be.visible").click();
      cy.contains("h5", /list of favorites/i).should("be.visible");
      cy.get("ul li")
        .contains(/rick/i)
        .should("be.visible")
        .and("have.length", 1);
      cy.getByData("character-1", "button")
        .should("be.visible")
        .click()
        .and("not.exist");
      cy.getByData("close").eq(0).click();
      cy.contains("h5", /list of favorites/i).should("not.exist");
    });
  });

  context("navigate test", () => {
    it("#1 navigate to character and have info and episodes", () => {
      cy.getByData("characters", "a").eq(0).should("exist").and("be.visible");
      cy.getByData("characters", "a")
        .eq(0)
        .contains(/rick sanchez/i)
        .click();
      cy.location("pathname").should("eq", "/character/1");
      cy.getByData("character-info").should("exist").and("be.visible");
      cy.getByData("character-info")
        .contains("h3", /rick sanchez/i)
        .should("be.visible");
      cy.get("img").should("be.visible");
      cy.getByData("character-episodes")
        .contains(/list of episodes/i)
        .should("be.visible");
      cy.getByData("character-episodes").find("li").should("have.length", 51);
    });

    it("#2 navigate to character and back to home", () => {
      cy.getByData("back-to-home").should("not.be.exist");
      cy.getByData("characters", "a").eq(0).click();
      cy.getByData("character-info").should("be.visible");
      cy.get("a")
        .contains(/back to home/i)
        .should("be.visible");
      cy.get("a")
        .contains(/back to home/i)
        .click();
      cy.location("pathname").should("eq", "/");
    });

    it("#3 at beginning previous button should be disable and next button should be active", () => {
      cy.getByData("prev-btn").should("be.visible").and("be.disabled");
      cy.getByData("next-btn").should("be.visible").and("not.be.disabled");
    });
  });
});
