import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Send, Sparkles, Eye, RotateCcw, Check, Briefcase, Coffee } from 'lucide-react';
import { Scenario, LanguageCourse } from '../data/curriculum';
import { speakText, stopSpeaking } from '../utils/speech';

interface Message {
  id: string;
  role: 'character' | 'user';
  text: string;
  romanization?: string;
  vietnameseTranslation?: string;
  grammarTip?: string;
}

interface RoleplayViewProps {
  course: LanguageCourse;
  onGainXp: (amount: number) => void;
}

export const RoleplayView: React.FC<RoleplayViewProps> = ({
  course,
  onGainXp,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(course.scenarios[0]);
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'workplace' | 'daily'>('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const [completedObjectives, setCompletedObjectives] = useState<string[]>([]);
  const [isPlayingAudioId, setIsPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredScenarios = course.scenarios.filter(sc => {
    if (scenarioFilter === 'all') return true;
    return sc.track === scenarioFilter;
  });

  useEffect(() => {
    const sc = filteredScenarios[0] || course.scenarios[0];
    setSelectedScenario(sc);
  }, [course]);

  useEffect(() => {
    if (!selectedScenario) return;
    const starter = selectedScenario.starterMessage;
    const initialMsg: Message = {
      id: 'msg-0',
      role: 'character',
      text: starter.text,
      romanization: starter.romanization,
      vietnameseTranslation: starter.vietnameseTranslation,
      grammarTip: 'Lời mở đầu từ người bản xứ. Hãy đọc kỹ và phản hồi tự tin.',
    };
    setMessages([initialMsg]);
    setRevealedTranslations({});
    setCompletedObjectives([]);

    // Default suggestions tailored
    if (selectedScenario.track === 'workplace') {
      setSuggestedReplies([
        'Certainly! I would be delighted to introduce myself.',
        'Thank you for this great opportunity today.',
        'Could you tell me more about the team culture?'
      ]);
    } else {
      setSuggestedReplies([
        'Hello! Nice to meet you.',
        'Thank you very much, I appreciate your help.',
        'Do you have any personal recommendations?'
      ]);
    }
  }, [selectedScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingReply]);

  const toggleTranslation = (id: string) => {
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlaySpeech = (msgId: string, text: string) => {
    setIsPlayingAudioId(msgId);
    speakText(text, course.voiceLangCode, 0.9, () => {
      setIsPlayingAudioId(null);
    });
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoadingReply) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputText('');
    setSuggestedReplies([]);
    setIsLoadingReply(true);

    if (selectedScenario.objectives.length > 0 && completedObjectives.length === 0) {
      setCompletedObjectives([selectedScenario.objectives[0]]);
      onGainXp(10);
    }

    try {
      const response = await fetch('/api/gemini/roleplay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: course.name,
          scenario: selectedScenario,
          userMessage: textToSend,
          history: nextHistory.slice(-6).map(m => ({ role: m.role, text: m.text }))
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const charMsg: Message = {
          id: `char-${Date.now()}`,
          role: 'character',
          text: data.replyText || 'Thank you, understood.',
          romanization: data.romanization,
          vietnameseTranslation: data.vietnameseTranslation || data.englishTranslation,
          grammarTip: data.grammarTip,
        };
        setMessages(prev => [...prev, charMsg]);
        if (Array.isArray(data.suggestedReplies) && data.suggestedReplies.length > 0) {
          setSuggestedReplies(data.suggestedReplies);
        }

        if (nextHistory.length >= 4 && completedObjectives.length < selectedScenario.objectives.length) {
          setCompletedObjectives(selectedScenario.objectives);
          onGainXp(20);
        }
      }
    } catch (err) {
      console.error('Roleplay error:', err);
    } finally {
      setIsLoadingReply(false);
    }
  };

  const handleResetChat = () => {
    stopSpeaking();
    const starter = selectedScenario.starterMessage;
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'character',
        text: starter.text,
        romanization: starter.romanization,
        vietnameseTranslation: starter.vietnameseTranslation,
        grammarTip: 'Đã thiết lập lại cuộc trò chuyện từ đầu.',
      }
    ]);
    setSuggestedReplies([]);
    setRevealedTranslations({});
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Scenario Selector */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600">
              <Briefcase className="w-4 h-4" />
              <span>Phòng Đàm Thoại AI Thực Chiến</span>
              <span aria-hidden="true">·</span>
              <span>{course.vietnameseName}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Nhập Vai Phỏng Vấn & Đời Sống Thực Tế
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Luyện phỏng vấn xin việc với Giám đốc Nhân sự bản xứ hoặc trò chuyện thường nhật. Lắng nghe phát âm tự nhiên, mở bản dịch tiếng Việt khi cần và nhận gợi ý đối đáp sắc bén.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới hội thoại</span>
            </button>
          </div>
        </div>

        {/* Filter Track: All / Workplace / Daily */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-slate-500 font-medium">Chủ đề:</span>
          <button
            onClick={() => setScenarioFilter('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              scenarioFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setScenarioFilter('workplace')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              scenarioFilter === 'workplace' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Phỏng vấn & Công việc
          </button>
          <button
            onClick={() => setScenarioFilter('daily')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              scenarioFilter === 'daily' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Đời sống hàng ngày
          </button>
        </div>

        {/* Scenario Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
          {filteredScenarios.map((sc: Scenario) => {
            const isSelected = sc.id === selectedScenario.id;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-2xl p-2 bg-white rounded-lg border border-slate-200 shrink-0">
                  {sc.characterAvatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{sc.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{sc.characterName} ({sc.characterRole})</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">{sc.location}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Workspace & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Objectives & Scenario Brief */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-1">Mục Tiêu Hội Thoại</h2>
            <p className="text-xs text-slate-500 mb-3">Đạt được các mốc giao tiếp sau trong cuộc trò chuyện:</p>
            
            <div className="space-y-2">
              {selectedScenario.objectives.map((obj, i) => {
                const isDone = completedObjectives.includes(obj);
                return (
                  <div 
                    key={i} 
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 transition-colors ${
                      isDone 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                      isDone ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{obj}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
              <strong>Bối cảnh: </strong> {selectedScenario.context}
            </div>
          </div>
        </div>

        {/* Center & Right Column: Interactive Chat Box */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[580px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{selectedScenario.characterAvatar}</span>
              <div>
                <div className="text-xs font-bold text-slate-900">{selectedScenario.characterName}</div>
                <div className="text-[11px] text-slate-500">{selectedScenario.characterRole} <span aria-hidden="true">·</span> {selectedScenario.location}</div>
              </div>
            </div>
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Đang trực tuyến
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              const isRevealed = Boolean(revealedTranslations[msg.id]);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 space-y-2 shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-tl-xs'
                  }`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold opacity-75">
                        {isUser ? 'Bạn (Ứng viên / Người học)' : selectedScenario.characterName}
                      </span>
                      
                      {!isUser && (
                        <button
                          onClick={() => handlePlaySpeech(msg.id, msg.text)}
                          className="p-1 hover:bg-slate-200 text-slate-600 rounded-md transition-colors cursor-pointer"
                          aria-label="Nghe tin nhắn"
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudioId === msg.id ? 'text-indigo-600 animate-pulse' : ''}`} />
                        </button>
                      )}
                    </div>

                    <div className="text-sm font-semibold leading-relaxed">
                      {msg.text}
                    </div>

                    {msg.romanization && (
                      <div className="text-xs font-mono text-indigo-700 bg-indigo-50/70 p-1.5 rounded-md">
                        {msg.romanization}
                      </div>
                    )}

                    {!isUser && msg.vietnameseTranslation && (
                      <div className="pt-1 border-t border-slate-200/60">
                        {isRevealed ? (
                          <div className="text-xs text-slate-700 italic">
                            "{msg.vietnameseTranslation}"
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleTranslation(msg.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-800 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Xem bản dịch tiếng Việt</span>
                          </button>
                        )}
                      </div>
                    )}

                    {!isUser && msg.grammarTip && (
                      <div className="mt-1 text-[11px] bg-amber-50 text-amber-950 p-2.5 rounded-lg border border-amber-200/60 flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{msg.grammarTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoadingReply && (
              <div className="flex items-start">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs text-xs text-slate-500 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="font-medium text-slate-600 ml-1">{selectedScenario.characterName} đang soạn câu trả lời...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Suggestions */}
          {suggestedReplies.length > 0 && !isLoadingReply && (
            <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap gap-1.5">
              <span className="text-[11px] font-medium text-slate-500 self-center mr-1">Gợi ý trả lời:</span>
              {suggestedReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(reply)}
                  className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-700 rounded-lg border border-slate-200 shadow-2xs transition-colors cursor-pointer text-left line-clamp-1"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Nhập câu đối đáp bằng ${course.vietnameseName}...`}
              disabled={isLoadingReply}
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoadingReply}
              className="p-2.5 bg-indigo-600 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer disabled:cursor-not-allowed shrink-0"
              aria-label="Gửi tin nhắn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
