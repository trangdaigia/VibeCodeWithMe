/**
 * Native Web Speech API audio helper for language learners
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };

    // Fallback if event never fires
    setTimeout(() => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    }, 250);
  });
}

export interface AiVoiceOptions {
  langCode?: string;
  rate?: number;
  pitch?: number;
  persona?: 'female-warm' | 'male-deep' | 'academic-clear' | 'energetic-native';
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
}

export async function speakText(
  text: string,
  langCode: string = 'es-ES',
  rate: number = 0.9,
  onEnd?: () => void,
  pitch: number = 1.0
): Promise<void> {
  return speakAiVirtualVoice(text, {
    langCode,
    rate,
    pitch,
    onEnd
  });
}

export async function speakAiVirtualVoice(
  text: string,
  options: AiVoiceOptions = {}
): Promise<void> {
  const {
    langCode = 'en-US',
    rate = 0.95,
    pitch = 1.0,
    persona = 'female-warm',
    onEnd,
    onBoundary
  } = options;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = langCode;
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));

  // Adjust pitch subtly based on AI voice persona if default pitch is passed
  let effectivePitch = pitch;
  if (pitch === 1.0) {
    if (persona === 'female-warm') effectivePitch = 1.12;
    else if (persona === 'male-deep') effectivePitch = 0.86;
    else if (persona === 'academic-clear') effectivePitch = 1.02;
    else if (persona === 'energetic-native') effectivePitch = 1.18;
  }
  utterance.pitch = Math.max(0.5, Math.min(2.0, effectivePitch));

  // Best-match voice for language and persona gender hint
  const langPrefix = langCode.split('-')[0].toLowerCase();
  const langVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase() === langCode.toLowerCase() ||
      v.lang.toLowerCase().startsWith(langPrefix)
  );

  let matchedVoice: SpeechSynthesisVoice | undefined;
  if (langVoices.length > 0) {
    if (persona === 'male-deep') {
      matchedVoice = langVoices.find((v) =>
        /male|david|daniel|mark|alex|thomas|jorge|kangkang|ichiro|otoya/i.test(v.name)
      );
    } else if (persona === 'female-warm' || persona === 'energetic-native') {
      matchedVoice = langVoices.find((v) =>
        /female|zira|samantha|victoria|google|kyoko|ting-ting|yuna|paulina|anna|amelie/i.test(v.name)
      );
    }
    if (!matchedVoice) {
      matchedVoice =
        langVoices.find((v) => v.lang.toLowerCase() === langCode.toLowerCase()) ||
        langVoices[0];
    }
  }

  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onBoundary) {
    utterance.onboundary = (event) => {
      onBoundary(event.charIndex);
    };
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

