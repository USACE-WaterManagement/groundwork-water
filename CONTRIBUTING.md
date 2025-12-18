# Contributing to Groundwork Water

Thank you for your interest in contributing to Groundwork Water! Your help is appreciated. Please follow these guidelines to ensure a smooth contribution process.

To contribute to Groundwork-Water you _must_ be a member of the U.S. Army Corps of Engineers Water Management.

## How to Contribute

_Note: You must have nodejs installed and in your path!_

1. **Submit an issue**
   1. Create an [issue](https://github.com/USACE-WaterManagement/groundwork-water/issues) as bug or feature/etc
   2. If you wish to work the issue, ask for it to be assigned to you
2. **Retrieve the Repository**
   - Non Core Developers:
     - Create your own fork and clone it locally.
   - Developers (Ask for access):
     - Clone the repository directory
     - Try to use the "create branch" feature on the right sidebar of GitHub in the issue's given page

3. **Create a Branch**  
   Use a descriptive branch name for your feature or fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Or use VSCode

4. **Install the root and docs packages**
   Install the required dependencies for the docs page and library with:
   From the root of the project run:
   `npm install`
   Then for the docs run
   `cd docs && npm install`

5. **Build the library**  
   **_NOTE_ you must do this each time you make changes to the library itself for the docs pages to work locally.**

   From the root of the project you can build with:
   `npm run build`

6. **Make Changes**  
   Make your changes and attempt to commit one idea at a time within your branch to make it easier in review.

   _For example:_ If you need to rename a file or move it. You would do that, then commit that singular change.
   Or if you were adding a page path to the docs, you would make all the tweaks across the files to initialize the page and add it to the routes for that commit.

7. **Run Tests**  
   Use the local dev instance to manually test your changes and ensure they work. We use a form of [Dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) where we link the library to the documentation. Start the documentation locally. Then call the library itself in that documentation.

   To start the localhost instance of the docs site:
   (From root or /docs)

   ```bash
   npm run dev
   ```

8. **Commit Changes**  
   Use meaningful commit messages:

   ```bash
   git commit -m "Create path structure for useCdaBlob docs"
   ```

9. **Version your Code**  
   Run changesets to version your code.  
   To do this run:  
   `changesets patch`

   We use semantic versioning, or semver. Read more here: https://semver.org/  
   In short:
   - `major` if it **breaks** something.
   - `minor` if it's a functionality that does _not_ break anything.
   - `patch` if it's a bug fix that does _not_ break something.

10. **Push and Open a Pull Request**  
    Push your branch and open a pull request against the `main` branch. Describe your changes and reference any related issues.
    - If you have forked, you will create a PR from your branch.

Note: If `main` has changed significantly you will be required to rebase/merge main into your code to resolve merge conflicts before you can bring your changes into `main`.

## Code Style

For code styling we use `husky`.

On every commit, after you run `npm i` your code will be formatted to match the repository.

To help keep your code formatted while you make changes you might consider in vscode setting your default formatter to Prettier (VSCode extension) and in the settings for workspace setting it to format on save.

## Reporting Issues

- Report issues directly in VSCode. Using the issue submission tool consider labeling it with a priority to help us gauge if it is a blocker.
- Provide steps to reproduce bugs and relevant logs or screenshots.
- Do NOT post sensitive information such as:
  - IP Addresses
  - Usernames
  - Extended file paths
  - Other such information that could identify systems and/or the versions they are running

## Community Standards

- Be respectful and constructive in all communications.
- If an issue contains sensi

## Questions?

Open an issue or start a discussion if you need help.

Thank you for helping improve Groundwork Water!
