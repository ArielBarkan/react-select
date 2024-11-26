export const GetMaxCharacters = (containerWidth: number, fontSize: string, fontFamily: string): number => {
    // Create a temporary element to measure text width
    const tempSpan = document.createElement('span');
    tempSpan.style.fontSize = fontSize;
    tempSpan.style.fontFamily = fontFamily;
    tempSpan.style.position = 'absolute';
    tempSpan.style.whiteSpace = 'nowrap';
    tempSpan.style.visibility = 'hidden';

    // Add a sample letter
    tempSpan.textContent = 'W'; // 'W' is usually one of the widest characters
    document.body.appendChild(tempSpan);

    // Measure the width of one character
    const charWidth = tempSpan.offsetWidth;

    // Remove the temporary element
    document.body.removeChild(tempSpan);

    // Calculate how many characters fit
    return Math.floor(containerWidth / charWidth);
}

// Example usage
const containerWidth = 500; // e.g., 500px
const maxCharacters = GetMaxCharacters(containerWidth, '16px', 'Arial');
console.log('Max characters per line:', maxCharacters);
