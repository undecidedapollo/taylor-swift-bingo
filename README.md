# Taylor Swift Bingo

Printable Taylor Swift music bingo cards: 64 shuffled boards, 4 per page.

## Make cards

1. Double-click `bingo.html` to open it in Chrome (or another browser).
2. Pick a board style with **Next Template**. The current one shows next to the buttons, and the page remembers your choice.
3. Use **Regenerate Boards** (or press `G`) to reshuffle.
4. Print (`Cmd+P`) or save as PDF: Letter paper, default margins, scale 100%. That gives 16 pages with 4 boards each. Cut them apart.

## Change songs

All songs and colors are in `templates.js`, one list per template. You can edit that file directly or ask Claude Code / Codex to do it, for example:

> Add "Cruel Summer" and "Cardigan" to the regular template and remove "London Boy".

Rules:

- Put each song in quotes and end the line with a comma: `"Cruel Summer",`
- If a song title has a double quote, wrap it in single quotes: `'"Slut!"',`
- Regular boards need at least 24 songs; "13" boards need at least 15. Around double that keeps neighboring boards from looking alike.

Open or refresh `bingo.html` to check. A yellow box above the boards points out duplicates or too few songs. If an edit breaks the file (usually a missing quote or comma), the page says so at the top.

## Files

- `bingo.html`: the page (layout, shuffling, printing)
- `templates.js`: songs, titles, colors
- `tools/`: old 2024 odds simulator, not used by the page
- `free_spot.png`: old free-space image, not used right now
