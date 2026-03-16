import { useRef } from "react";
import { X, Volume2, Mic, MicOff, Check, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AVATAR_COLORS } from "./types";

interface SettingsModalProps {
  open: boolean;
  nickname: string;
  group: string;
  volume: number;
  micMuted: boolean;
  avatarColor: string;
  avatarLetter: string;
  avatarImage?: string;
  settingsTab: "profile" | "sound" | "avatar";
  onClose: () => void;
  onSave: () => void;
  onNicknameChange: (v: string) => void;
  onGroupChange: (v: string) => void;
  onVolumeChange: (v: number) => void;
  onMicToggle: () => void;
  onAvatarColorChange: (v: string) => void;
  onAvatarLetterChange: (v: string) => void;
  onAvatarImageChange: (v: string) => void;
  onTabChange: (tab: "profile" | "sound" | "avatar") => void;
}

export default function SettingsModal({
  open, nickname, group, volume, micMuted,
  avatarColor, avatarLetter, avatarImage,
  settingsTab, onClose, onSave,
  onNicknameChange, onGroupChange,
  onVolumeChange, onMicToggle,
  onAvatarColorChange, onAvatarLetterChange, onAvatarImageChange,
  onTabChange,
}: SettingsModalProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onAvatarImageChange(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#2f3136] rounded-xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#202225]">
          <h2 className="text-white text-lg font-bold">Настройки пользователя</h2>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={onClose}>
            <X className="w-4 h-4 text-[#b9bbbe]" />
          </Button>
        </div>

        <div className="flex border-b border-[#202225] px-6">
          {(["profile", "sound", "avatar"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                settingsTab === tab ? "border-[#5865f2] text-white" : "border-transparent text-[#8e9297] hover:text-[#dcddde]"
              }`}
            >
              {tab === "profile" ? "Профиль" : tab === "sound" ? "Звук" : "Аватарка"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {settingsTab === "profile" && (
            <div className="space-y-4">
              <div>
                <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Никнейм</label>
                <input
                  className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b]"
                  value={nickname}
                  onChange={e => onNicknameChange(e.target.value)}
                  maxLength={32}
                  placeholder="Введи никнейм..."
                />
              </div>
              <div>
                <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Группа</label>
                <input
                  className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b]"
                  value={group}
                  onChange={e => onGroupChange(e.target.value)}
                  maxLength={16}
                  placeholder="Например: ИТ-23"
                />
              </div>
              <div>
                <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Буква на аватарке</label>
                <input
                  className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b]"
                  value={avatarLetter}
                  onChange={e => onAvatarLetterChange(e.target.value.slice(0, 1).toUpperCase() || "С")}
                  maxLength={1}
                  placeholder="С"
                />
              </div>
            </div>
          )}

          {settingsTab === "sound" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> Громкость звука
                  </label>
                  <span className="text-white text-sm font-bold">{volume}%</span>
                </div>
                <input
                  type="range" min={0} max={100} value={volume}
                  onChange={e => onVolumeChange(Number(e.target.value))}
                  className="w-full accent-[#5865f2] cursor-pointer"
                />
                <div className="flex justify-between text-[#72767d] text-xs mt-1">
                  <span>Тихо</span>
                  <span>Громко</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#36393f] rounded-lg">
                <div className="flex items-center gap-3">
                  {micMuted ? <MicOff className="w-5 h-5 text-red-400" /> : <Mic className="w-5 h-5 text-[#3ba55c]" />}
                  <div>
                    <div className="text-white text-sm font-medium">Микрофон</div>
                    <div className="text-[#b9bbbe] text-xs">{micMuted ? "Выключен" : "Включён"}</div>
                  </div>
                </div>
                <button
                  onClick={onMicToggle}
                  className={`w-12 h-6 rounded-full transition-colors relative ${micMuted ? "bg-red-500" : "bg-[#3ba55c]"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${micMuted ? "left-1" : "left-7"}`} />
                </button>
              </div>
            </div>
          )}

          {settingsTab === "avatar" && (
            <div className="space-y-4">
              {/* Загрузить своё фото */}
              <div>
                <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Своя аватарка</label>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 relative`}>
                    {avatarImage
                      ? <img src={avatarImage} className="w-full h-full object-cover" alt="avatar" />
                      : <span className="text-white text-xl font-bold">{avatarLetter || "С"}</span>
                    }
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={() => avatarInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm rounded-lg transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                      Загрузить фото
                    </button>
                    {avatarImage && (
                      <button
                        onClick={() => onAvatarImageChange("")}
                        className="flex items-center gap-2 px-4 py-2 bg-[#40444b] hover:bg-[#4f545c] text-[#b9bbbe] text-sm rounded-lg transition-colors"
                      >
                        Удалить фото
                      </button>
                    )}
                  </div>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </div>
              </div>

              {/* Цвет аватарки */}
              <div>
                <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Цвет аватарки</label>
                <div className="grid grid-cols-3 gap-3">
                  {AVATAR_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => onAvatarColorChange(color)}
                      className={`h-16 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center relative border-2 transition-all ${
                        avatarColor === color ? "border-white scale-105" : "border-transparent"
                      }`}
                    >
                      <span className="text-white text-xl font-bold">{avatarLetter || "С"}</span>
                      {avatarColor === color && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#5865f2]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-5 flex justify-end gap-3">
          <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]" onClick={onClose}>
            Отмена
          </Button>
          <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white" onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
