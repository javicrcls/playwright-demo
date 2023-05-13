# Knack challenge (Playwright)
![Screenshot 2023-05-12 at 17 48 30](https://github.com/javicrcls/playwright-demo/assets/20679501/af7b18a8-32f6-4c37-910b-7a146120e999)

## Prerequisites

-   Clone the Repository

-   Install dependencies

    `npm install`

- Install Playwright

    `npx playwright install --with-deps`

-   Declare env variables in `.env` file in root of repo

    ```
    E2E_BUILDER_USER=your_builder_username
    E2E_BUILDER_PASSWORD=your_builder_password
    E2E_LIVEAPP_USER=your_liveapp_username
    E2E_LIVEAPP_PASSWORD=your_liveapp_password
    WAREHOUSE_URL=your_warehouse_url
    LIVEAPP_URL=your_liveapp_url
    ```
    
## Running the tests

-   Execute tests

    `npx playwright test`

-   Debug mode

    `export PWDEBUG=1`


## Project Structure

The project follows a standard structure for a Playwright project using page object model design pattern. Here's an overview of the main directories and files:

* **tests/:** This directory contains the test files that define the end-to-end test scenarios. Each test file should be focused on a specific feature or functionality.
In this case there is one file for the scenarios described in the challenge

* **pages/:** This directory contains the Page Object classes that encapsulate the interactions and operations performed on specific pages of the application. 
    
    * **builder/:** Page Object classes that encapsulate the interactions and operations performed on `Builder app`

    * **liveapp/:** Page Object classes that encapsulate the interactions and operations performed on `Live app`

* **fixtures/:** This directory contains [`setupFixture.ts`](https://github.com/javicrcls/playwright-demo/blob/main/fixtures/setupFixture.ts) allowing the tests to initialize logged by providing the fixture builder/liveapp as a page.

* **test-results/:** This directory contains test results artifacts as traces or screenshots.

* **playwright-report/:** This directory contains html report version.

## Configuration

This project is configured to run in a CI environment in such a way that it behaves differently if it is being executed locally or in a CI pipeline. 

+ [`Playwright config file`](https://github.com/javicrcls/playwright-demo/blob/main/playwright.config.ts)
    
## Challenge Considerations

During the development of this Playwright demo for the Knack challenge, the following considerations were taken into account:

* **Scalability:** The test suite is designed to be scalable, allowing the addition of more tests and scenarios as the application evolves. The use of Page Objects and modular test design promotes maintainability and extensibility.

* **Test Environment:** The test suite is configured to support different test environments such as local, staging or production. Making use of proper configuration with environment-specific variables ensuring test execution across different possible environments.

* **Use of fixtures:** The test suite is configured to use Playwright fixtures to initializate test cases with logged state. This way you just need to pass `builder/liveapp` to start the test logged in the application.

    >I added a 3rd test case to show this behavior. 

* **Personal approaches:** I have taken different approaches to solve different things, in order to have more examples within the challenge. 

    Not aiming for the most optimal solution, but to show different ways that are sometimes useful.

    >For instance I have made use of api callbacks, to validate that the filter has been applied inside applyFilter function. 

## Future Improvements
While the Playwright demo for the Knack challenge provides a base foundation for automated end-to-end testing, the provided solution is just a demo example, there are several areas where it can be further improved:

* **Project organization:** To better organize project structure we would like to have a clear understanding about the mapping between pages, that way we could adapt our project following front end structure.

* **Testing specs:** As for the testing specs, ideally I would try to keep the test with a well defined scope and split into different files to cover flows for different features.

    Also within the tests I would try to minimize the localization of elements through selectors defined in the tests code and try to encapsulate them within the corresponding pages for easier scalability and maintainability.

    This also helps to create and maintain more readable test files.


* **Data-Driven Testing:** Implement data-driven testing techniques to parameterize test scenarios taking advantage of the use of fixtures to allow us to increment coverage using different input data and scenarios.

* **Improve functions:** There are some flows encapsulated as a page-object functions which could be improved to be used for receiving different parameters.

    >As an example applyFilter(field: string, operator: string, product: string) will not be usable for every possible filter because the page dom changes depending on the field filter selected.

* **Selector strategy:** During the challenge I noticed some DOM elements whose location options were more complicated or there could be ways to apply small changes so that the stability of the e2e test is greatly improved avoiding flaky executions.

* **Test Coverage:** Expand the test suite to cover core functionalities to ensure critical test coverage.

* **CI/CD:** Integrate the project with the organization CI/CD platforms such as CircleCI, or GitHub Actions. 

* **Accessibility testing:** We could incorporate accessibility testing into the project by using Playwright's Accessibility API to ensure that the application being tested meets accessibility standards, providing the expected user experience.

## Findings

During the challenge I've noticed that the Application and UI behaves unexpectedly in some occasions, as in this example that for the same flow with the same conditions the UI shows different results to display the filter applied:

![Screenshot 2023-05-12 at 16 10 07](https://github.com/javicrcls/playwright-demo/assets/20679501/ab701245-eb62-4388-ad9e-b33e1afa4f57)

This could cause the 2nd test to fail since it is expecting that the filter applied should be displayed with its name in the UI component so the user knows which filter is being applied:

![Screenshot 2023-05-12 at 16 27 22](https://github.com/javicrcls/playwright-demo/assets/20679501/c1130ad8-8db4-4e90-8fbd-231b776407b5)

