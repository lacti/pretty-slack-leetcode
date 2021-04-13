export default function isSolution(text: string): boolean {
  return (
    text.includes("class ") ||
    text.includes("function ") ||
    text.includes("=>") ||
    text.includes("def ")
  );
}
