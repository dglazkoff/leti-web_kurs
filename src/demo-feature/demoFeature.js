// eslint-disable-next-line no-console
export const logConsoleMsg = msg => console.log(msg);

export const showHtmlMsg = msg => {
  const newDiv = document.createElement('div');
  newDiv.textContent = msg;
  const body = document.querySelector('body');
  body.appendChild(newDiv);
};
