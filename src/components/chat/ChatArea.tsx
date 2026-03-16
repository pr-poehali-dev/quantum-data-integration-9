import { useState, useRef } from "react";
import {
  Hash, Mic, Bell, Users, Search, Menu, GraduationCap,
  BookOpen, MessageSquare, Send, Image, Smile, Monitor,
  Video, PhoneOff, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Channel, Message, User, Role,
  ROLE_COLORS, ROLE_LABELS, ROLE_HIERARCHY,
  INITIAL_MESSAGES,
} from "./types";

const EMOJI_LIST = ["😀","😂","❤️","👍","🔥","🎉","📚","✅","👋","🤔","😎","🙏"];
const STICKER_EMOJIS = ["🐱","🐶","🦊","🐼","🦄","🍕","🎮","🚀","🌟","💡","🎓","📖"];

interface ChatAreaProps {
  channel: Channel;
  messages: Message[];
  users: User[];
  myRole: Role;
  nickname: string;
  avatarColor: string;
  avatarLetter: string;
  avatarImage?: string;
  onOpenMobileSidebar: () => void;
  onOpenUsers: () => void;
  onAddMessage: (msg: Omit<Message, "id">) => void;
}

export default function ChatArea({
  channel,
  messages,
  users,
  myRole,
  nickname,
  avatarColor,
  avatarLetter,
  avatarImage,
  onOpenMobileSidebar,
  onOpenUsers,
  onAddMessage,
}: ChatAreaProps) {
  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stickerInputRef = useRef<HTMLInputElement>(null);

  const canWrite = channel.allowWrite || ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["admin"];
  const isVoiceChannel = channel.type === "voice";

  const getUserById = (id: number | "bot") => {
    if (id === "bot") return null;
    return users.find(u => u.id === id);
  };

  const handleSend = () => {
    if (!inputText.trim() || !canWrite) return;
    onAddMessage({
      userId: 0,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    });
    setInputText("");
    setShowEmoji(false);
    setShowStickers(false);
  };

  const handleEmojiPick = (emoji: string) => {
    if (!canWrite) return;
    onAddMessage({
      userId: 0,
      text: emoji,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    });
    setShowEmoji(false);
  };

  const handleStickerPick = (sticker: string) => {
    if (!canWrite) return;
    onAddMessage({
      userId: 0,
      text: "",
      stickerUrl: sticker,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    });
    setShowStickers(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isSticker = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      if (isSticker) {
        onAddMessage({
          userId: 0,
          text: "",
          stickerUrl: url,
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        });
      } else {
        onAddMessage({
          userId: 0,
          text: "",
          imageUrl: url,
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Шапка канала */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>
        {channel.type === "text"
          ? <Hash className="w-5 h-5 text-[#8e9297]" />
          : <Mic className="w-5 h-5 text-[#8e9297]" />
        }
        <span className="text-white font-semibold">{channel.name}</span>
        <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block" />
        <span className="text-[#8e9297] text-sm hidden sm:block truncate">
          {isVoiceChannel ? "Голосовой канал — нажми для подключения" : "Общайся, учись и помогай однокурсникам"}
        </span>
        <div className="ml-auto flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
          <Users
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]"
            onClick={onOpenUsers}
          />
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
        </div>
      </div>

      {/* Голосовой канал */}
      {isVoiceChannel && (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
          <div className="bg-[#2f3136] rounded-2xl p-8 w-full max-w-md text-center">
            <div className="w-20 h-20 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-1">{channel.name}</h3>
            <p className="text-[#b9bbbe] text-sm mb-6">Голосовой канал</p>

            {voiceActive ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 bg-[#36393f] rounded-full flex items-center justify-center">
                      <div className={`w-8 h-8 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center`}>
                        {avatarImage
                          ? <img src={avatarImage} className="w-full h-full rounded-full object-cover" alt="" />
                          : <span className="text-white text-sm font-bold">{avatarLetter}</span>
                        }
                      </div>
                    </div>
                    <span className="text-white text-xs">{nickname}</span>
                    <div className="w-2 h-2 bg-[#3ba55c] rounded-full animate-pulse" />
                  </div>
                </div>
                <p className="text-[#3ba55c] text-sm font-medium">Вы подключены</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={() => setCameraOn(!cameraOn)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${cameraOn ? "bg-[#3ba55c] text-white" : "bg-[#40444b] text-[#b9bbbe] hover:bg-[#4f5460]"}`}
                  >
                    <Video className="w-4 h-4" />
                    {cameraOn ? "Вебка вкл" : "Вебка"}
                  </button>
                  <button
                    onClick={() => setScreenShare(!screenShare)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${screenShare ? "bg-[#5865f2] text-white" : "bg-[#40444b] text-[#b9bbbe] hover:bg-[#4f5460]"}`}
                  >
                    <Monitor className="w-4 h-4" />
                    {screenShare ? "Демонстрация вкл" : "Экран"}
                  </button>
                  <button
                    onClick={() => { setVoiceActive(false); setCameraOn(false); setScreenShare(false); }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white transition-colors"
                  >
                    <PhoneOff className="w-4 h-4" />
                    Выйти
                  </button>
                </div>
                {(cameraOn || screenShare) && (
                  <div className="bg-[#36393f] rounded-xl p-4 mt-2">
                    <div className="aspect-video bg-[#202225] rounded-lg flex items-center justify-center">
                      {screenShare
                        ? <div className="text-center"><Monitor className="w-12 h-12 text-[#5865f2] mx-auto mb-2" /><p className="text-[#b9bbbe] text-sm">Демонстрация экрана активна</p></div>
                        : <div className="text-center"><Video className="w-12 h-12 text-[#3ba55c] mx-auto mb-2" /><p className="text-[#b9bbbe] text-sm">Камера включена</p></div>
                      }
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-8"
                onClick={() => setVoiceActive(true)}
              >
                Подключиться
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Текстовый чат */}
      {!isVoiceChannel && (
        <>
          <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-5 overflow-y-auto">
            {/* Приветственное сообщение бота */}
            <div className="flex gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-white font-medium text-sm sm:text-base">КампусБот</span>
                  <span className="bg-[#5865f2] text-white text-xs px-1 rounded">БОТ</span>
                  <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 8:00</span>
                </div>
                <div className="text-[#dcddde] text-sm sm:text-base">
                  <p className="mb-3">
                    <strong>Добро пожаловать в КампусЧат!</strong> Общайся, делись домашними заданиями и не пропускай ничего важного.
                  </p>
                  <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 rounded">
                    <h3 className="text-white font-semibold mb-2 text-sm">Что умеет КампусЧат:</h3>
                    <ul className="space-y-1 text-xs text-[#b9bbbe]">
                      <li>💬 Чаты для каждой группы и предмета</li>
                      <li>📚 Раздел для домашних заданий и расписания</li>
                      <li>🔔 Уведомления о важных событиях</li>
                      <li>🎤 Голосовые комнаты с демонстрацией экрана</li>
                      <li>🔒 Закрытое сообщество — только студенты</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Сообщения */}
            {messages.filter(m => m.userId !== "bot").map((msg) => {
              const isMe = msg.userId === 0;
              const user = isMe ? null : getUserById(msg.userId);
              const displayName = isMe ? nickname : (user?.name ?? "Неизвестный");
              const displayAvatar = isMe ? avatarLetter : (user?.avatar ?? "?");
              const displayColor = isMe ? avatarColor : (user?.color ?? "from-gray-500 to-gray-600");
              const displayRole: Role = isMe ? myRole : (user?.role ?? "user");

              return (
                <div key={msg.id} className="flex gap-2 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${displayColor} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                    {isMe && avatarImage
                      ? <img src={avatarImage} className="w-full h-full object-cover" alt="" />
                      : <span className="text-white text-xs sm:text-sm font-medium">{displayAvatar}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-white font-medium text-sm sm:text-base">{displayName}</span>
                      {ROLE_COLORS[displayRole] && (
                        <span className={`${ROLE_COLORS[displayRole]} text-white text-xs px-1.5 py-0.5 rounded font-semibold`}>
                          {ROLE_LABELS[displayRole]}
                        </span>
                      )}
                      <span className="text-[#72767d] text-xs">{msg.time}</span>
                    </div>
                    {msg.text && <div className="text-[#dcddde] mb-1 text-sm sm:text-base break-words">{msg.text}</div>}
                    {msg.imageUrl && (
                      <img src={msg.imageUrl} alt="фото" className="max-w-xs rounded-lg mb-2 max-h-64 object-contain cursor-pointer" />
                    )}
                    {msg.stickerUrl && (
                      <div className="text-5xl mb-2">{msg.stickerUrl.startsWith("data:") ? <img src={msg.stickerUrl} alt="стикер" className="w-24 h-24 object-contain rounded-lg" /> : msg.stickerUrl}</div>
                    )}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-1">
                        {msg.reactions.map((r, i) => (
                          <span key={i} className="bg-[#2f3136] border border-[#40444b] rounded-full px-2 py-0.5 text-xs text-[#dcddde]">
                            {r.emoji} {r.count}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Поле ввода */}
          <div className="p-2 sm:p-4 flex-shrink-0 relative">
            {/* Панели эмодзи/стикеров */}
            {showEmoji && (
              <div className="absolute bottom-full left-4 mb-2 bg-[#18191c] border border-[#40444b] rounded-xl p-3 shadow-xl z-10">
                <div className="grid grid-cols-6 gap-1.5">
                  {EMOJI_LIST.map(e => (
                    <button key={e} onClick={() => handleEmojiPick(e)} className="text-2xl hover:bg-[#40444b] rounded p-1 transition-colors">{e}</button>
                  ))}
                </div>
              </div>
            )}
            {showStickers && (
              <div className="absolute bottom-full left-4 mb-2 bg-[#18191c] border border-[#40444b] rounded-xl p-3 shadow-xl z-10">
                <p className="text-[#8e9297] text-xs mb-2 font-semibold uppercase">Стикеры</p>
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {STICKER_EMOJIS.map(s => (
                    <button key={s} onClick={() => handleStickerPick(s)} className="text-3xl hover:bg-[#40444b] rounded p-1 transition-colors">{s}</button>
                  ))}
                </div>
                <button
                  onClick={() => stickerInputRef.current?.click()}
                  className="w-full text-[#5865f2] text-xs py-1 hover:underline"
                >
                  + Загрузить стикер из фото
                </button>
                <input ref={stickerInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, true)} />
              </div>
            )}

            <div className="bg-[#40444b] rounded-lg px-2 sm:px-3 py-2 flex items-center gap-2">
              {/* Кнопка фото */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#b9bbbe] hover:text-white transition-colors flex-shrink-0"
                title="Отправить фото"
              >
                <Image className="w-5 h-5" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e)} />

              {/* Кнопка эмодзи */}
              <button
                onClick={() => { setShowEmoji(!showEmoji); setShowStickers(false); }}
                className={`transition-colors flex-shrink-0 ${showEmoji ? "text-[#faa61a]" : "text-[#b9bbbe] hover:text-white"}`}
                title="Эмодзи"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Кнопка стикеров */}
              <button
                onClick={() => { setShowStickers(!showStickers); setShowEmoji(false); }}
                className={`transition-colors flex-shrink-0 ${showStickers ? "text-[#faa61a]" : "text-[#b9bbbe] hover:text-white"}`}
                title="Стикеры"
              >
                <BookOpen className="w-5 h-5" />
              </button>

              <input
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-[#72767d] min-w-0"
                placeholder={canWrite ? `Написать в #${channel.name}` : "Вам запрещено писать в этот канал"}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                disabled={!canWrite}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || !canWrite}
                className="text-[#b9bbbe] hover:text-white transition-colors disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
