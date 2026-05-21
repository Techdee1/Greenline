// Azure Translator Service
// IMPORTANT: Set these environment variables in your .env.local file
// Never commit API keys to version control
const AZURE_KEY = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY;
const AZURE_ENDPOINT = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
const AZURE_REGION = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_REGION || 'southafricanorth';
let hasWarnedMissingKey = false;

export type Language = 'en' | 'ig' | 'yo' | 'ha';

export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  ig: { name: 'Igbo', flag: '🇳🇬' },
  yo: { name: 'Yoruba', flag: '🇳🇬' },
  ha: { name: 'Hausa', flag: '🇳🇬' },
} as const;

export async function translateText(text: string, targetLanguage: Language): Promise<string> {
  if (targetLanguage === 'en') return text;
  if (!AZURE_KEY) {
    if (!hasWarnedMissingKey) {
      console.warn('⚠️  AZURE_TRANSLATOR_KEY not configured. Translation will not work.');
      hasWarnedMissingKey = true;
    }
    return text; // Return original text if API key not configured
  }

  console.log(`[Translator] Translating to ${targetLanguage}:`, text.substring(0, 50));

  try {
    const response = await fetch(
      `${AZURE_ENDPOINT}/translate?api-version=3.0&to=${targetLanguage}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_REGION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ text }]),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Translator] Translation failed:', response.status, errorText);
      return text; // Fallback to original text
    }

    const data = await response.json();
    const translated = data[0]?.translations[0]?.text || text;
    console.log(`[Translator] Success:`, translated.substring(0, 50));
    return translated;
  } catch (error) {
    console.error('[Translator] Translation error:', error);
    return text; // Fallback to original text
  }
}

export async function translateMultiple(
  texts: string[],
  targetLanguage: Language
): Promise<string[]> {
  if (targetLanguage === 'en') return texts;
  if (!AZURE_KEY) {
    if (!hasWarnedMissingKey) {
      console.warn('⚠️  AZURE_TRANSLATOR_KEY not configured. Translation will not work.');
      hasWarnedMissingKey = true;
    }
    return texts; // Return original texts if API key not configured
  }

  console.log(`[Translator] Batch translating ${texts.length} texts to ${targetLanguage}`);

  try {
    const response = await fetch(
      `${AZURE_ENDPOINT}/translate?api-version=3.0&to=${targetLanguage}`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_REGION,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(texts.map(text => ({ text }))),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Translator] Batch translation failed:', response.status, errorText);
      return texts; // Fallback to original texts
    }

    const data = await response.json();
    const translated = data.map((item: any) => item.translations[0]?.text || '');
    console.log(`[Translator] Batch success: Translated ${translated.length} texts`);
    return translated;
  } catch (error) {
    console.error('[Translator] Batch translation error:', error);
    return texts; // Fallback to original texts
  }
}
