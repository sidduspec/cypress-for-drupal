import getCookie from "../../methods/getCookie";

Cypress.Commands.add("navigateToUrl", (url) => {
  cy.visit(url);
});

Cypress.Commands.add("navigateToInternalUrl", (url) => {
  cy.visit(`${Cypress.config().internalUrl}/${url}`).url();
});

Cypress.Commands.add("navigateToEmployerEditAdvert", (employerId, advertId) => {
  cy.visit(
    `/schools/employers/${
      Cypress.env("employerId") || employerId
    }/booking/post-ad/${
      getLocalStorage("advertId") === null
        ? advertId
        : getLocalStorage("advertId")
    }?edit=true`
  )
    .url()
    .should(
      "contain",
      `/schools/employers/${
        Cypress.env("employerId") || employerId
      }/booking/post-ad/${
        getLocalStorage("advertId") === null
          ? advertId
          : getLocalStorage("advertId")
      }?edit=true`
    );
});

Cypress.Commands.add(
  "navigateToEmployerApplication",
  (employerId, selfServiceId) => {
    cy.visit(
      `/schools/employers/${
        Cypress.env("employerId") || employerId
      }/applications/${
        getCookie("selfServiceId") === null
          ? selfServiceId
          : getCookie("selfServiceId")
      }`
    )
      .url()
      .should(
        "contain",
        `/schools/employers/${
          Cypress.env("employerId") || employerId
        }/applications/${
          getCookie("selfServiceId") === null
            ? selfServiceId
            : getCookie("selfServiceId")
        }`
      );
  }
);

Cypress.Commands.add("navigateToEmployerPortalPage", (employerId, pageType) => {
  const pagePaths = {
    apps: "apps",
    currentJobs: "current-jobs",
    applications: "applications",
    adminStaff: "admin/staff",
    profileEdit: "profile-edit",
  };

  const pagePath = pagePaths[pageType];
  if (pagePath) {
    cy.visit(
      `/schools/employers/${
        Cypress.env("employerId") || employerId
      }/${pagePath}`
    )
      .url()
      .should(
        "contain",
        `/schools/employers/${
          Cypress.env("employerId") || employerId
        }/${pagePath}`
      );
  } else {
    throw new Error("Invalid page type provided");
  }
});

Cypress.Commands.add("navigateToBOPEmployersPage", (employerId) => {
  const url = `${Cypress.config().internalUrl}/product-fulfilment/employers/${
    Cypress.env("employerId") || employerId
  }`;

  cy.visit(url).url().should("contain", url);
});

Cypress.Commands.add(
  "navigateToBOPEmployersAdvertPage",
  (employerId, advertId) => {
    const advert =
      cy.getCookie("selfServiceId") === null
        ? advertId
        : cy.getCookie("selfServiceId");
    const url = `${Cypress.config().internalUrl}/product-fulfilment/employers/${
      Cypress.env("employerId") || employerId
    }/adverts/${advert}`;

    cy.visit(url).url().should("contain", url);
  }
);

Cypress.Commands.add("navigateToBOPHomePage", () => {
  const url = `${Cypress.config().internalUrl}/product-fulfilment`;

  cy.visit(url).url().should("contain", url);
});

Cypress.Commands.add("navigateToBOPReviewAdvertsPage", () => {
  const url = `${
    Cypress.config().internalUrl
  }/product-fulfilment/adverts-to-review`;

  cy.visit(url).url().should("contain", url);
});

Cypress.Commands.add("navigateToApplyForJob", (jobId) => {
  cy.visit(
    `/jobs/apply/${
      getCookie("jobId") === null ? jobId : getCookie("jobId")
    }?edit=true`
  )
    .url()
    .should(
      "contain",
      `/jobs/apply/${
        getCookie("jobId") === null ? jobId : getCookie("jobId")
      }?edit=true`
    );
});

Cypress.Commands.add("navigateToUMSHomepage", () => {
  cy.visit(`${Cypress.config().internalUrl}/ums`)
    .url()
    .should("contain", `${Cypress.config().internalUrl}/ums`);
});

Cypress.Commands.add("navigateToSchoolPortalHelpAndSupport", (employerId) => {
  cy.visit(
    `/schools/employers/${
      Cypress.env(employerId) || employerId
    }/support?fromApplication=recruiter`
  );
});

Cypress.Commands.add("setViewportByDevice", (deviceName) => {
  const devices = Cypress.env("devices");
  if (!devices || !devices.hasOwnProperty(deviceName)) {
    throw new Error(
      `Device "${deviceName}" is not defined in the config file.`
    );
  }
  const { width, height } = devices[deviceName];
  cy.viewport(width, height);
});
