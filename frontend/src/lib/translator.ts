// Azure Translator Service
// IMPORTANT: Set these environment variables in your .env.local file
// Never commit API keys to version control
const AZURE_KEY = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_KEY;
const AZURE_ENDPOINT = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
const AZURE_REGION = process.env.NEXT_PUBLIC_AZURE_TRANSLATOR_REGION || 'southafricanorth';
let hasWarnedMissingKey = false;

const HAUSA_MOCK_TRANSLATIONS: Record<string, string> = {
  'Crisis': 'Rikici',
  'Innovation': 'Sabon Fasaha',
  'Case Study': 'Misalin Gaskiya',
  'Economics': 'Tattalin Arziki',
  'Dashboard': 'Dashboard',
  'Green Line Climate Resilience': 'Green Line Don Jure Canjin Yanayi',
  'Climate Resilience': 'Jure Canjin Yanayi',
  'for Northern Nigeria.': 'ga Arewa Najeriya.',
  'Water you can count on.': 'Ruwa da za ka dogara da shi.',
  'Intelligence before the damage happens: decentralized water infrastructure plus Demeter AI sensors for 14-day drought foresight in Hausa and English.': "Hankali kafin barna: rumbun ruwa da aka rarraba da na'urorin Demeter AI don hangen fari na kwanaki 14 a Hausa da Turanci.",
  'Request Pilot Funding': 'Nemi Kudin Gwaji',
  'View Pitch Deck': 'Duba Pitch Deck',
  'Forecast Window': 'Lokacin Hasashe',
  'No Smartphone Needed': 'Ba sai Wayar Smart ba',
  'Per Farm Unit': 'Kowane Rukunin Gona',
  'Scroll to explore': 'Gungura don dubawa',
  'The Crisis': 'Rikicin',
  'Climate Volatility is Devastating': 'Canjin Yanayi Na Lalata',
  'Northern Nigeria': 'Arewa Najeriya',
  'Smallholders make life-or-death decisions with zero data and no safety net.': 'Manoma kanana suna yanke shawara ba tare da bayanai ko kariya ba.',
  '$1B': '$1B',
  'Crop Losses': 'Asarar Amfanin Gona',
  'lost in October 2024 in just 15 days due to extreme weather shocks': 'an rasa a Oktoba 2024 cikin kwanaki 15 saboda tsananin yanayi',
  '90%': '90%',
  'Lake Chad Shrinkage': 'Raguwar Tafkin Chad',
  'loss of volume since 1980, collapsing local water security': 'raguwar ruwa tun 1980, tana rushe tsaron ruwa',
  '30.1M': '30.1M',
  'People in Poverty': 'Mutane a Talauci',
  'living in abject poverty, per FAO estimates': 'suna cikin talauci mai tsanani, a cewar FAO',
  'The Innovation': 'Sabon Fasaha',
  'Three Layers, One Resilient System': 'Matakai Uku, Tsari Daya Mai Jurewa',
  'Physical water security, intelligence in the soil, and action that reaches every farmer.': 'Tsaron ruwa na zahiri, bayanai a cikin kasa, da aiki da ya kai ga kowane manomi.',
  'Ferrocement Cisterns Store Rain': 'Tankunan Ferrocement Suna Ajiye Ruwan Sama',
  'Decentralized underground storage eliminates evaporation and protects against dry spells.': 'Ajiya karkashin kasa yana rage bacewar ruwa kuma yana kare fari.',
  'Demeter Sensors in Zai Pits': 'Na urorin Demeter a Zai Pits',
  'ESP32 + capacitive moisture + DHT22 track root-zone micro-climates without disturbing crops.': 'ESP32 + na urar danshi + DHT22 suna bibiyar yanayin tushen shuka ba tare da lalata shuka ba.',
  'ML Ensemble Predicts Stress': 'ML Ensemble Yana Hasashen Damuwar Shuka',
  'LSTM + Random Forest models forecast crop stress 14 days before visible damage.': 'LSTM + Random Forest suna hasashen damuwa kwanaki 14 kafin gani.',
  'SMS + Solar Micro-Pumping': 'SMS + Solar Micro-Pumping',
  'Hausa/English alerts guide precise water release from cisterns—no smartphone or internet needed.': 'Sakon Hausa/Turanci yana jagorantar sakin ruwa daga tanki ba tare da smartphone ko intanet ba.',
  'Real Impact': 'Ainihin Tasiri',
  'The Story of Musa': 'Labarin Musa',
  'Last August in Katsina, Musa watched his maize curl and die in 14 days. Green Line gives him time.': 'Bara a Katsina, Musa ya ga masara ta narke a kwanaki 14. Green Line tana ba shi lokaci.',
  'LAST AUGUST': 'AGUSTA DA TA WUCE',
  'WITH GREEN LINE': 'DA GREEN LINE',
  'Lost half his harvest': 'Ya rasa rabin girbi',
  'Rains stopped with no warning and maize curled in 14 days': 'Ruwan sama ya tsaya ba tare da gargadi ba, masara ta lalace cikin kwanaki 14',
  'No advance warning system': 'Babu tsarin gargadi',
  'Only saw stress when it was already too late to react': 'Ya ga matsala ne lokacin da lokaci ya kure',
  'Sold his last goat for grain': 'Ya sayar da akuya ta karshe don hatsi',
  'Grain prices tripled during the dry season': 'Farashin hatsi ya ninka sau uku a lokacin rani',
  '14-day early warnings': 'Gargadin kwanaki 14',
  'SMS alerts in Hausa: "Stress forecasted. Release cistern water in 48 hours."': 'Sakon Hausa: "An hasashen damuwa. Saki ruwan tanki cikin awa 48."',
  'Root-zone intelligence': 'Bayanan yankin tushen shuka',
  'Demeter sensors measure zai pit micro-climates without root disturbance': 'Na urorin Demeter suna auna yanayin zai pit ba tare da lalata tushen shuka ba',
  'Saved half the harvest': 'Ya ceci rabin girbi',
  'Stored water + early alerts preserve food and income': 'Ruwan ajiya + gargadi suna kare abinci da kudin shiga',
  'If I had known 14 days earlier, I could have saved half my harvest. Getting a Hausa warning before the damage starts would change everything.': 'Da na sani kwanaki 14 kafin, da na ceci rabin girbi. Gargadin Hausa kafin lalacewa zai canza komai.',
  'Musa': 'Musa',
  'Maize Farmer, Katsina State': 'Manomin Masara, Jihar Katsina',
  'Unit Economics': 'Tattalin Arziki na Rukuni',
  'Smallholder ROI Engine': 'Injin Riba Ga Manoma Kanana',
  'Modeled on a 1.5-hectare northern maize farm with ₦43,450 total deployment cost.': 'An yi hasashe kan gonar masara hekta 1.5 a Arewa da kudin ₦43,450.',
  'Payback Period': 'Lokacin Mayar da Kudi',
  'first harvest cycle': 'zangon girbi na farko',
  'Pays for itself within 6 weeks': 'Yana biya kansa cikin makonni 6',
  'Year 1 ROI': 'Ribar Shekara 1',
  'net income uplift': 'karin kudin shiga',
  '26.5x return vs baseline': 'Riba sau 26.5 idan aka kwatanta',
  'Yield Lift': 'Karin Girbi',
  'from zai pit optimization': 'daga inganta zai pit',
  'Up to +70% harvest gain': 'Har zuwa +70% karin girbi',
  'Farm Unit Size': 'Girman Rukunin Gona',
  'Unit Cost': 'Kudin Rukuni',
  'Pilot Ask': 'Kudin Gwaji',
  'Pilot Funding Request: ₦2,000,000': 'Neman Kudin Gwaji: ₦2,000,000',
  'Back five pilot farms across the Northeast, Northwest, and Middle Belt to prove the model and scale across 100+ LGAs.': 'Tallafa gonaki biyar na gwaji a Arewa maso Gabas, Arewa maso Yamma da Middle Belt.',
  'Partner With Green Line': 'Yi Hadin Gwiwa da Green Line',
  'Download Budget': 'Sauke Kasafin Kudi',
  'Hausa + English SMS': 'SMS a Hausa da Turanci',
  'IP67 Ruggedized': 'IP67 Mai Jure Yanayi',
  'Solar-Capped': 'Mai Murfin Solar',
  'Zai Pit Compatible': 'Ya dace da Zai Pit',
  'Climate resilience infrastructure for smallholder farmers in Northern Nigeria.': 'Gina tsaron jure yanayi ga manoman kanana a Arewa Najeriya.',
  'Resources': 'Albarkatu',
  'GitHub': 'GitHub',
  'Documentation': 'Takardun Bayani',
  'Product': 'Samfuri',
  'Problem': 'Matsala',
  'Solution': 'Magani',
  'Metrics': 'Ma auni',
  'Powered By': 'An Taimaka da',
  '© 2026 Green Line. UNILAG Design Studio Design Competition.': '© 2026 Green Line. Gasar UNILAG Design Studio Design.',
  'Privacy': 'Sirri',
  'Terms': 'Sharudda',
  'Contact': 'Tuntu ba',
};

function getHausaMock(text: string): string | null {
  return HAUSA_MOCK_TRANSLATIONS[text] || null;
}

export type Language = 'en' | 'ig' | 'yo' | 'ha';

export const LANGUAGES = {
  en: { name: 'English', flag: '🇬🇧' },
  ig: { name: 'Igbo', flag: '🇳🇬' },
  yo: { name: 'Yoruba', flag: '🇳🇬' },
  ha: { name: 'Hausa', flag: '🇳🇬' },
} as const;

export async function translateText(text: string, targetLanguage: Language): Promise<string> {
  if (targetLanguage === 'en') return text;
  if (targetLanguage === 'ha') {
    return getHausaMock(text) || text;
  }
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
  if (targetLanguage === 'ha') {
    return texts.map((text) => getHausaMock(text) || text);
  }
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
