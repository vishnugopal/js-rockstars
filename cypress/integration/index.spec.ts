/// <reference types="cypress"/>

const MAX_STORIES_PER_PAGE = 30;

describe("index page", () => {
  it("has a story", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid=story-1]").should("contain.text", "1.");
    cy.get("[data-testid=story-1-title]").should("contain.html", "<a href=");
  });

  it("loads new stories when scrolled to the end", () => {
    cy.visit("http://localhost:3000");
    cy.get(`[data-testid=story-${MAX_STORIES_PER_PAGE}]`).scrollIntoView();

    const nextStory = MAX_STORIES_PER_PAGE + 1;
    cy.get(`[data-testid=story-${nextStory}]`).should(
      "contain.text",
      `${nextStory}.`
    );
    cy.get(`[data-testid=story-${nextStory}-title]`).should(
      "contain.html",
      "<a href="
    );
  });
});

export {};
