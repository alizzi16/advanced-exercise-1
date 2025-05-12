export function generateAlphabetFilter(id, selectedLetter) {
  const containerAlphabet = document.getElementById(id);
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }

  letters.forEach((letter) => {
    const linkLetter = document.createElement("a");
    linkLetter.href = "#";
    linkLetter.classList.add("letter");
    linkLetter.textContent = letter.toLocaleUpperCase();
    linkLetter.dataset.letter = letter;
    containerAlphabet.append(linkLetter);
  });

  if (selectedLetter !== null && selectedLetter !== undefined) {
    document.querySelector(`[data-letter="${selectedLetter}"]`).classList.add('active');
  }

  return containerAlphabet;
}
