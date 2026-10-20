# UTME CBT Practice

A JAMB style computer based test for your students. No server and no build step: it is plain HTML, CSS and JavaScript.

## What it does

* Student accounts (full name and a 4 digit PIN) with a saved score history
* Full mock exam in the real UTME format: English (60 questions) plus three other subjects (40 each), 180 questions, 2 hour countdown, auto submit when time ends
* Single subject practice with 10, 20, 40 or 60 questions
* Subjects: English, Mathematics, Physics, Chemistry, Biology, Literature in English, Government, CRS
* Fresh random questions every attempt. Each student's earlier questions are remembered, so new questions are preferred until the bank runs out. Answer options are shuffled too.
* Mathematics, Physics and Chemistry include generators, so the numbers change each time
* Score out of 400 (each subject scaled to 100), subject breakdown, and full corrections with explanations
* Question navigator, keyboard shortcuts (A to D to answer, arrow keys to move), and recovery if the page is refreshed mid exam

## Put it online

Upload the whole folder as it is to any static host. Easiest options:

1. GitHub Pages: create a repository, upload these files, then Settings, Pages, deploy from the main branch.
2. Netlify Drop: drag the folder onto app.netlify.com/drop.
3. Vercel: import the folder as a static project.

To try it on your computer, open `index.html` in a browser.

## Working without internet

The site never calls the internet while running: the questions, scoring and score history are all on the device. Two ways to use it offline:

1. **Installable offline app (recommended).** Host the folder on any https site as above. Each student opens the link once while online. The site then saves itself to the device and works with no connection from then on. On Android Chrome use the menu and choose Install app (or Add to Home screen). On iPhone Safari use Share, then Add to Home Screen. Laptops can use the install icon in the Chrome or Edge address bar.
2. **Straight from a folder.** Copy the unzipped folder to a laptop or computer lab machine and open `index.html`. This needs no internet at all and no hosting. (Some phones will not open local files properly, so use option 1 on phones.)

Scores are kept per device either way. Important: when you change any question or file, open `sw.js` and change `VERSION` (for example `utme-cbt-v2`) before uploading, otherwise students who already installed the app keep seeing the old files.

## Question bank size right now

| Subject | Questions in bank | Needed per exam |
|---|---|---|
| English | 77 | 60 |
| Mathematics | about 165 (20 fixed plus generators) | 40 |
| Physics | about 140 (22 fixed plus generators) | 40 |
| Chemistry | about 85 (29 fixed plus generators) | 40 |
| Biology | 59 | 40 |
| Literature in English | 53 | 40 |
| Government | 51 | 40 |
| CRS | 56 | 40 |

Subjects with a small margin over the exam size (Biology, Literature, Government, CRS, and English) will repeat many questions after two or three attempts. Grow them over time. The setup screen shows a warning tag if any subject falls below the number an exam needs.

## Adding your own questions

Questions live in `js/bank-*.js`. Each fixed question is one line:

```js
["Question text", ["Option A", "Option B", "Option C", "Option D"], 1, "Short explanation shown in corrections"],
```

The number is the index of the correct option, starting at 0 (so 1 means Option B). Options are shuffled automatically at exam time. Put new lines inside the `static: [ ... ]` list of the subject, or in `js/bank-more.js`.

Rules the app checks for you: exactly 4 options, no repeated options, and no two questions with identical text (duplicates are dropped silently, so make each question text unique).

## Important limits to know

1. **Accounts and scores live in the browser.** A student sees their history only on the device and browser they registered on, and clearing browser data erases it. The PIN is a convenience, not real security. For logins that work across devices and a teacher dashboard, the next step is a small backend (for example Supabase or Firebase).
2. **Check the questions against the current JAMB syllabus** before relying on them, and have a subject teacher review answers. The starter bank is a head start, not an official past question set.
3. **Literature in English** covers general literary terms only. JAMB also tests its prescribed texts, which change by year, so add questions on the current set books.
4. **English** has no comprehension passages or oral English sound questions with audio yet. Passages can be added by putting the passage text at the start of each linked question.
5. Subjects such as Mathematics with diagrams (geometry, graphs) are not covered, because questions here are text only.
