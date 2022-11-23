<pre>
dddVite+React+TS:

Start up local dev server: npm run dev
Build: npm run build

Test:
'watch' is set to false, you can set to true to make life easier. Be sure to set back to false before commiting. File: vite.config.ts

Testing excludes, in addition to the default directories, data and models.

npm run test
npm run coverage

<a href="https://vitest.dev/api/">Vitest API</a>

Pre-commit hooks:
Triggered when you create a commit message.
Husky is configured to run all tests, pretty-quick (on staged files only), and eslint (on stage files only).
If any of these checks fail, the commit is canceled.

UI folder structure ... for reference
components -> contains reusuable components
context -> contains reusuable contexts
data -> contains mock data
models -> the interfaces
pages -> contains page specific components
services -> api calls
utils -> pure/reusable functions
</pre>
