# Taylor Swift Bingo: agent notes

Static page that prints 64 shuffled bingo boards (4 per Letter page). The main editor is not a programmer. Explain changes in plain language, keep edits small, and don't add tooling.

## Entry points

- `templates.js`: data only (song lists, titles, colors, pattern choice). Most requests are edits here. The header comment there documents the fields.
- `bingo.html`: layout CSS, board patterns, shuffling, on-screen warnings.
- `tools/simulate.js`: standalone 2024 Node script that estimates songs-to-win. It has its own outdated song list and is not used by the page. Don't sync it unless asked.
- `free_spot.png`: unused. It's kept in case a template wants an image free space.

## Constraints

- Must keep working by double-clicking `bingo.html` (`file://`): no build step, no npm deps, no ES modules, no `fetch`. `templates.js` is a classic `<script>` that defines globals.
- Print layout is tuned for Letter at 0.5in margins: 3.65in x 4.9in board containers and 64 boards, giving 16 pages. Changing sizes, fonts, or board count can break pagination. Re-check the PDF after any CSS change.
- Cell codes in patterns: `O` song, `X` blocked (colored), `I` free space. To add a pattern, define it in `applyTemplate()` and select it with `template.pattern`.
- Each template needs a unique `id`. `localStorage["lastTemplate"]` stores it.
- Song text goes in through `textContent`. Keep it that way so titles with quotes or `&` are safe.
- Titles stay as the editor wrote them. Fix capitalization or punctuation only when asked.

## Check changes

Start the preview server (`.claude/launch.json`, or `python3 -m http.server 8765`) and open `http://localhost:8765/bingo.html`. Confirm:

- No yellow warning box. It flags duplicates, too few songs, free-space collisions, and a broken `templates.js`.
- Each template renders (use **Next Template**) and no text is clipped.

Print check (should report 16 pages; render a page and look at it):

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf=/tmp/bingo.pdf http://localhost:8765/bingo.html && pdfinfo /tmp/bingo.pdf | grep Pages
```

Headless Chrome prints the first template in `templateOrder`.
