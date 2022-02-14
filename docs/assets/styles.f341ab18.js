import{r as i}from"./vendor.d9edd6b2.js";const t=i`
  :host {
    --black: hsl(206, 11%, 12%);
    --white: hsl(206, 11%, 82%);

    --light-accent: hsl(217, 48%, 55%);
    --light-accent-text:hsl(217, 38%, 45%);
    --light-accent-bold:hsl(217, 100%, 45%);

    --dark-accent: hsl(217, 48%, 75%);
    --dark-accent-text:hsl(217, 78%, 75%);
    --dark-accent-bold:hsl(217, 78%, 75%);

    --dark-bg: hsl(229, 20%, 20%);
    --dark-bg-dim: hsl(231, 21%, 29%);
    --dark-fg: hsl(231, 28%, 73%);
    --dark-fg-bright: hsl(231, 28%, 82%);
    --dark-fgDim: hsl(231, 12%, 50%);
  
    --dark-yellow: hsl(39, 100%, 71%);
    --dark-purple: hsl(276, 68%, 75%);
    --dark-blue: hsl(197, 100%, 77%);
    --dark-green: hsl(68, 55%, 60%);
    
    --light-bg: hsl(0, 0%, 98%);
    --light-bg-dim: hsl(194, 16%, 94%);
    --light-fg: hsl(200, 16%, 62%);
    --light-fgDim: hsl(200, 16%, 32%);
    --light-fg-bright: hsl(200, 16%, 92%);

    --light-yellow: hsl(39, 100%, 59%);
    --light-purple: hsl(256, 90%, 65%);
    --light-blue: hsl(217, 38%, 55%);
    --light-green: hsl(85, 40%, 54%);

    --radius: 1em;
    --padding: 0.3em;
    --padding-text: 0.8em;

    --divider: red;
    --light-external-link: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDI1Ljk4MDQ2OSAyLjk5MDIzNDQgQSAxLjAwMDEgMS4wMDAxIDAgMCAwIDI1Ljg2OTE0MSAzIEwgMjAgMyBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMjAgNSBMIDIzLjU4NTkzOCA1IEwgMTMuMjkyOTY5IDE1LjI5Mjk2OSBBIDEuMDAwMSAxLjAwMDEgMCAxIDAgMTQuNzA3MDMxIDE2LjcwNzAzMSBMIDI1IDYuNDE0MDYyNSBMIDI1IDEwIEEgMS4wMDAxIDEuMDAwMSAwIDEgMCAyNyAxMCBMIDI3IDQuMTI2OTUzMSBBIDEuMDAwMSAxLjAwMDEgMCAwIDAgMjUuOTgwNDY5IDIuOTkwMjM0NCB6IE0gNiA3IEMgNC45MDY5MzcyIDcgNCA3LjkwNjkzNzIgNCA5IEwgNCAyNCBDIDQgMjUuMDkzMDYzIDQuOTA2OTM3MiAyNiA2IDI2IEwgMjEgMjYgQyAyMi4wOTMwNjMgMjYgMjMgMjUuMDkzMDYzIDIzIDI0IEwgMjMgMTQgTCAyMyAxMS40MjE4NzUgTCAyMSAxMy40MjE4NzUgTCAyMSAxNiBMIDIxIDI0IEwgNiAyNCBMIDYgOSBMIDE0IDkgTCAxNiA5IEwgMTYuNTc4MTI1IDkgTCAxOC41NzgxMjUgNyBMIDE2IDcgTCAxNCA3IEwgNiA3IHoiPjwvcGF0aD48L3N2Zz4=') no-repeat left top;
    --dark-external-link: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE0OC45NTQ2OSwxNy4xNDQwMWMtMC4yMTM2NCwwLjAwNjc1IC0wLjQyNjczLDAuMDI1NDQgLTAuNjM4MjgsMC4wNTU5OWgtMzMuNjQ5NzRjLTIuMDY3NjUsLTAuMDI5MjQgLTMuOTkwODcsMS4wNTcwOSAtNS4wMzMyMiwyLjg0M2MtMS4wNDIzNiwxLjc4NTkyIC0xLjA0MjM2LDMuOTk0NzQgMCw1Ljc4MDY2YzEuMDQyMzYsMS43ODU5MiAyLjk2NTU4LDIuODcyMjUgNS4wMzMyMiwyLjg0M2gyMC41NTkzOGwtNTkuMDEzMDIsNTkuMDEzMDJjLTEuNDk3NzgsMS40MzgwMiAtMi4xMDExMywzLjU3MzQgLTEuNTc3MzUsNS41ODI2YzAuNTIzNzgsMi4wMDkyIDIuMDkyODQsMy41NzgyNiA0LjEwMjA0LDQuMTAyMDRjMi4wMDkyLDAuNTIzNzggNC4xNDQ1OCwtMC4wNzk1NyA1LjU4MjYsLTEuNTc3MzVsNTkuMDEzMDIsLTU5LjAxMzAydjIwLjU1OTM4Yy0wLjAyOTI0LDIuMDY3NjUgMS4wNTcwOSwzLjk5MDg3IDIuODQzLDUuMDMzMjJjMS43ODU5MiwxLjA0MjM2IDMuOTk0NzQsMS4wNDIzNiA1Ljc4MDY2LDBjMS43ODU5MiwtMS4wNDIzNiAyLjg3MjI1LC0yLjk2NTU4IDIuODQzLC01LjAzMzIydi0zMy42NzIxNGMwLjIzMTExLC0xLjY3MDc2IC0wLjI4NTExLC0zLjM1ODUzIC0xLjQxMTI5LC00LjYxNDE1Yy0xLjEyNjE3LC0xLjI1NTYyIC0yLjc0ODA2LC0xLjk1MTcyIC00LjQzNDAyLC0xLjkwMzA0ek0zNC40LDQwLjEzMzMzYy02LjI2Njg5LDAgLTExLjQ2NjY3LDUuMTk5NzcgLTExLjQ2NjY3LDExLjQ2NjY3djg2YzAsNi4yNjY4OSA1LjE5OTc3LDExLjQ2NjY3IDExLjQ2NjY3LDExLjQ2NjY3aDg2YzYuMjY2ODksMCAxMS40NjY2NywtNS4xOTk3NyAxMS40NjY2NywtMTEuNDY2Njd2LTU3LjMzMzMzdi0xNC43ODEyNWwtMTEuNDY2NjcsMTEuNDY2Njd2MTQuNzgxMjV2NDUuODY2NjdoLTg2di04Nmg0NS44NjY2N2gxMS40NjY2N2gzLjMxNDU4bDExLjQ2NjY3LC0xMS40NjY2N2gtMTQuNzgxMjVoLTExLjQ2NjY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+') no-repeat left top;
  }

  .icon {
    display: inline-block;
    padding-left: 1.4em;
    padding-right: 1.2em;
  }

  .controls {
    display: flex;
    justify-content: center;
  }

  .controls.wrappable {
    flex-wrap: wrap;
  }

  .controls .vertical {
    display: flex;
    flex-direction: column;
  }

  .controls h2 {
   
    text-align: center;
  }

  .controls label {
    display: flex;
    flex-direction: column;
    font-size: 80%;
    user-select: none;
  }

  .icon-external-link {
    background: var(--external-link);
    background-size: 1.2em;
  }

  a.icon:link {
    text-decoration: none;
  }
  a.icon:visited, a.icon:link {
    color: var(--fg);
  }

  iframe {
    border: none;
    margin: 0;
    padding: 0;
  }
  
  button, .toolbar .radios label {
    border: 0;
    padding: 0.5em 1em;
    font-size: 1rem;
    align-items: center;
    gap: 0.25em;
    border-radius: 99em;
    color: var(--fg-contrast-dim);
    background-color: var(--bg-contrast);
    transition: color 0.3s ease-out;
    cursor: pointer;
    user-select: none;
  }
  
  button:hover {
    color: var(--fg-contrast);
    transition: color 0.3s ease-in;
  }

  .toolbar {
    display: flex;
    margin: 0.5em;
    flex-wrap: wrap;
  }

  .toolbar.rightJustify {
    justify-content: flex-end;
    
  }

  .toolbar.centered {
    justify-content: center;
  }
  .toolbar.vertical {
    flex-direction: column;
  }
  
  .toolbar input {
    min-width: 3em;
    margin-right: 1vw;
    margin-left: 1vw;
  }
  .vertical input {
    margin-left: 0;
  }
  .toolbar.mini, .toolbar.mini>button {
    font-size: 80%;
  }
  .toolbar > * {
    margin-left: var(--padding);
    margin-right: var(--padding);
  }

  .toolbar.vertical > * {
    margin-top: var(--padding);
    margin-bottom: var(--padding);
  }

  .radios input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .radios label {
    display: inline-block;
    opacity: 0.5;
    font-size: 80% !important;
    transition: all 0.3s ease-in;
  }

  .radios label:hover {
    opacity: 0.8;
    transition: opacity 0.3s ease-in;
  }
  
  .radios input[type="radio"]:checked + label {
    background-color: var(--bg-contrast);
    font-size: 100%;
    opacity: 1;
    transition: all 0.3s ease-in;
  }

  .radios input[type="radio"]:focus + label {
    border: 1px solid var(--fg);
  }
  
  .icon {
    opacity: 0.6;
    transition: opacity 0.5s ease-out;
  }
  .icon:hover {
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }


  @media (prefers-color-scheme: dark) {
    :host {
      --bg-mono: var(--black);
      --bg: var(--dark-bg);
      --bg-dim: var(--dark-bg-dim);

      --divider: hsl(229, 30%, 30%);

      --accent: var(--dark-accent);
      --accent-text: var(--dark-accent-text);
      --accent-bold: var(--dark-accent-bold);

      --fg: var(--dark-fg);
      --fg-mono: var(--dark-fgDim);
      --fgDim: var(--dark-fgDim);
      --fg-bright: var(--dark-fg-bright);
      
      --purple: var(--dark-purple);
      --green: var(--dark-green);
      --blue: var(--dark-blue);

      --external-link: var(--dark-external-link);
    }
  }

  
  @media (prefers-color-scheme: light) {
    :host {
    --bg-mono: var(--white);
    --bg: var(--light-bg);
    --bg-dim: var(--light-bg-dim);
    
    --divider: hsl(193, 10%, 84%);

    --accent: var(--light-accent);
    --accent-bold: var(--light-accent-bold);
    --accent-text: var(--light-accent-text);

    --fg: var(--light-fg);
    --fg-mono: var(--light-fgDim);
    --fgDim: var(--light-fgDim);
    --fg-bright: var(--light-fg-bright);
    --purple: var(--light-purple);
    --green: var(--light-green);
    --blue: var(--light-blue);

    --bg-contrast: hsl(200, 16%, 92%);
    --fg-contrast: hsl(200, 16%, 22%);
    --fg-contrast-dim: hsl(200, 16%, 62%);

    --external-link: var(--light-external-link);
    }
  }
`;export{t as e};
