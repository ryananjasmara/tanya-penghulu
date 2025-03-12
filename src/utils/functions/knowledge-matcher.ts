import { IKnowledge } from "@/types/knowledge";

export function findMatchingKnowledge(
  knowledges: IKnowledge[] | null | undefined,
  keyword: string
): IKnowledge | null {
  if (!knowledges || !Array.isArray(knowledges) || knowledges.length === 0) {
    console.warn("Invalid or empty knowledges array");
    return null;
  }

  if (!keyword) {
    console.warn("Empty keyword provided");
    return null;
  }

  const lowerKeyword = keyword.toLowerCase();
  const words = lowerKeyword.split(" ");

  const phrases = [];
  for (let i = 0; i < words.length - 1; i++) {
    phrases.push(words[i] + " " + words[i + 1]);
    if (i < words.length - 2) {
      phrases.push(words[i] + " " + words[i + 1] + " " + words[i + 2]);
    }
  }

  let matchingKnowledge = null;

  for (const phrase of phrases) {
    matchingKnowledge = knowledges.find((k) =>
      k.keywords.some((kw) => {
        const keywordLower = kw.toLowerCase();
        return phrase.includes(keywordLower) || keywordLower.includes(phrase);
      })
    );
    if (matchingKnowledge) break;
  }

  if (!matchingKnowledge) {
    matchingKnowledge = knowledges.find((k) =>
      k.keywords.some((kw) => {
        const keywordLower = kw.toLowerCase();
        return words.some(
          (word) =>
            word.length > 3 &&
            (keywordLower.includes(word) || word.includes(keywordLower))
        );
      })
    );
  }

  if (!matchingKnowledge) {
    matchingKnowledge = knowledges.find((k) =>
      k.keywords.some(
        (kw) =>
          lowerKeyword.includes(kw.toLowerCase()) ||
          kw.toLowerCase().includes(lowerKeyword)
      )
    );
  }

  return matchingKnowledge || null;
}
