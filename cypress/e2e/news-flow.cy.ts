describe("Flujo completo de Noticias", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Carga noticias nuevas y muestra al menos 1", () => {
    cy.get("h4").contains("Noticias");
    cy.get("[data-testid^='news-item-']").should("exist");
  });

it("Añade una noticia aleatoria y la muestra en la lista", () => {
cy.visit("/");

cy.intercept("GET", "**/api/news/new**").as("getNewNews");
cy.intercept("POST", "**/api/news").as("createNews");

cy.wait("@getNewNews");
cy.wait(1000); // Esperar a que se cargue la lista de noticias
cy.contains("Añadir noticia (mock)")
    .scrollIntoView()
    .should("be.visible")
    .realClick({ position: "center", scrollBehavior: "center" });

cy.wait("@createNews");

// Esperar a que el socket actualice la lista (hasta 5s)
cy.get("[data-testid='socket-news-ready']", { timeout: 5000 }).should("exist");

// Ahora sí, comprobar que se ve la noticia en la lista
cy.get("[data-testid^='news-item-']")
    .first()
    .should(($el) => {
    expect($el.text()).to.match(/Noticia aleatoria/);
    });
});

  it("Permite navegar entre páginas en noticias", () => {
    cy.get("h4").contains("Noticias");
    cy.get("[aria-label='Go to page 2']").should("exist").click();

    cy.url().should("include", "/");
    cy.get("[data-testid^='news-item-']").should("exist");
    cy.get(".MuiPaginationItem-root.Mui-selected").should("contain.text", "2");
  });

  it("Archiva una noticia y la mueve a 'Archivadas'", () => {
    cy.get("[data-testid^='news-item-']").first().within(() => {
      cy.contains("Archivar").click();
    });

    cy.contains("Archivadas").click();
    cy.url().should("include", "/archived");
    cy.get("[data-testid^='news-item-']").should("exist");
  });

  it("Elimina una noticia archivada", () => {
    cy.contains("Archivadas").click();

    cy.get("[data-testid^='news-item-']").then(($items) => {
      const initialCount = $items.length;

      cy.get("[data-testid^='news-item-']").first().within(() => {
        cy.contains("Eliminar").click();
      });

      cy.get(".MuiDialog-root").should("be.visible");
      cy.get(".MuiDialog-root button").contains("Eliminar").click({ force: true });

      cy.get("[data-testid^='news-item-']", { timeout: 6000 }).should(
        "have.length",
        initialCount - 1
      );
    });
  });

  it("Ordena noticias nuevas por fecha (más recientes primero)", () => {
    cy.get("[data-testid^='news-meta-']").then(($items: JQuery<HTMLElement>) => {
      const dates = $items
        .map((_, el: HTMLElement) => {
          const text = Cypress.$(el).text();
          const [dateStr] = text.split("•");
          const [day, month, year] = dateStr.trim().split("/").map(Number);
          return new Date(year, month - 1, day).getTime();
        })
        .get();

      const sorted = [...dates].sort((a, b) => b - a);
      expect(dates).to.deep.equal(sorted);
    });
  });

  it("Ordena noticias archivadas por fecha de archivado (más recientes primero)", () => {
    cy.contains("Archivadas").click();

    cy.get("[data-testid^='news-meta-']").then(($items: JQuery<HTMLElement>) => {
      const dates = $items
        .map((_, el: HTMLElement) => {
          const text = Cypress.$(el).text();
          const [dateStr] = text.split("•");
          const [day, month, year] = dateStr.trim().split("/").map(Number);
          return new Date(year, month - 1, day).getTime();
        })
        .get();

      const sorted = [...dates].sort((a, b) => b - a);
      expect(dates).to.deep.equal(sorted);
    });
  });
});
