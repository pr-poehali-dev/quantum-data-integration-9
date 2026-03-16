import { useState } from "react";
import { ArrowRight, Hash, Mic, MicOff, Settings, X, Plus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Channel, Server, User, Role,
  ROLE_LABELS, ROLE_COLORS, ROLE_HIERARCHY,
  INITIAL_SERVERS,
} from "./types";

interface SidebarProps {
  channels: Channel[];
  servers: Server[];
  activeChannelId: number;
  mobileSidebarOpen: boolean;
  nickname: string;
  group: string;
  avatarColor: string;
  avatarLetter: string;
  avatarImage?: string;
  micMuted: boolean;
  myRole: Role;
  onSelectChannel: (id: number) => void;
  onCloseMobile: () => void;
  onOpenSettings: () => void;
  onMicToggle: () => void;
  onCreateChannel: (name: string, type: "text" | "voice") => void;
  onCreateServer: (name: string) => void;
}

export default function Sidebar({
  channels,
  servers,
  activeChannelId,
  mobileSidebarOpen,
  nickname,
  group,
  avatarColor,
  avatarLetter,
  avatarImage,
  micMuted,
  myRole,
  onSelectChannel,
  onCloseMobile,
  onOpenSettings,
  onMicToggle,
  onCreateChannel,
  onCreateServer,
}: SidebarProps) {
  const [newChannelOpen, setNewChannelOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState<"text" | "voice">("text");
  const [newServerOpen, setNewServerOpen] = useState(false);
  const [newServerName, setNewServerName] = useState("");

  const canCreateChannel = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["admin"];
  const canCreateServer = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["curator"];

  const handleCreateChannel = () => {
    if (!newChannelName.trim()) return;
    onCreateChannel(newChannelName.trim(), newChannelType);
    setNewChannelName("");
    setNewChannelOpen(false);
  };

  const handleCreateServer = () => {
    if (!newServerName.trim()) return;
    onCreateServer(newServerName.trim());
    setNewServerName("");
    setNewServerOpen(false);
  };

  return (
    <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col`}>
      <div className="p-4 border-b border-[#202225] flex items-center justify-between">
        <h2 className="text-white font-semibold text-base">КампусЧат</h2>
        <Button
          variant="ghost"
          className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
          onClick={onCloseMobile}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 p-2 overflow-y-auto">
        {/* Текстовые каналы */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
              <ArrowRight className="w-3 h-3" />
              <span>Учёба</span>
            </div>
            {canCreateChannel && (
              <button
                onClick={() => { setNewChannelType("text"); setNewChannelOpen(true); }}
                className="text-[#8e9297] hover:text-white transition-colors"
                title="Создать канал"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="mt-1 space-y-0.5">
            {channels.filter(c => c.type === "text").map((channel) => (
              <div
                key={channel.id}
                onClick={() => onSelectChannel(channel.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                  activeChannelId === channel.id
                    ? "bg-[#393c43] text-white"
                    : "text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43]"
                }`}
              >
                <Hash className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{channel.name}</span>
                {!channel.allowWrite && (
                  <span className="ml-auto text-[#72767d] text-xs">🔒</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Голосовые каналы */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
              <ArrowRight className="w-3 h-3" />
              <span>Голосовые</span>
            </div>
            {canCreateChannel && (
              <button
                onClick={() => { setNewChannelType("voice"); setNewChannelOpen(true); }}
                className="text-[#8e9297] hover:text-white transition-colors"
                title="Создать голосовой канал"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="mt-1 space-y-0.5">
            {channels.filter(c => c.type === "voice").map((channel) => (
              <div
                key={channel.id}
                onClick={() => onSelectChannel(channel.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                  activeChannelId === channel.id
                    ? "bg-[#393c43] text-white"
                    : "text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43]"
                }`}
              >
                <Mic className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Серверы */}
        <div className="mb-2">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
              <ArrowRight className="w-3 h-3" />
              <span>Серверы</span>
            </div>
            {canCreateServer && (
              <button
                onClick={() => setNewServerOpen(true)}
                className="text-[#8e9297] hover:text-white transition-colors"
                title="Создать сервер"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="mt-1 space-y-0.5">
            {servers.map((s) => (
              <div key={s.id} className="flex items-center gap-2 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer">
                <div className={`w-5 h-5 ${s.color} rounded flex items-center justify-center`}>
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Панель пользователя */}
      <div className="p-2 bg-[#292b2f] flex items-center gap-2">
        <div className={`w-8 h-8 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden`}>
          {avatarImage
            ? <img src={avatarImage} alt="avatar" className="w-full h-full object-cover" />
            : <span className="text-white text-sm font-bold">{avatarLetter}</span>
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-sm font-medium truncate">{nickname}</div>
          <div className={`text-xs truncate font-semibold ${ROLE_COLORS[myRole] ? "" : "text-[#b9bbbe]"}`}>
            <span className={`inline-block px-1.5 rounded text-white text-xs ${ROLE_COLORS[myRole] || "bg-[#40444b]"}`}>
              {ROLE_LABELS[myRole]}
            </span>
            <span className="text-[#b9bbbe] ml-1">{group}</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={onMicToggle}>
            {micMuted ? <MicOff className="w-4 h-4 text-red-400" /> : <Mic className="w-4 h-4 text-[#b9bbbe]" />}
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={onOpenSettings}>
            <Settings className="w-4 h-4 text-[#b9bbbe]" />
          </Button>
        </div>
      </div>

      {/* Модаль создания канала */}
      {newChannelOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setNewChannelOpen(false)}>
          <div className="bg-[#2f3136] rounded-xl w-full max-w-sm shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">Создать канал</h3>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setNewChannelType("text")}
                className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${newChannelType === "text" ? "bg-[#5865f2] text-white" : "bg-[#40444b] text-[#b9bbbe]"}`}
              >
                # Текстовый
              </button>
              <button
                onClick={() => setNewChannelType("voice")}
                className={`flex-1 py-2 rounded text-sm font-medium transition-colors ${newChannelType === "voice" ? "bg-[#5865f2] text-white" : "bg-[#40444b] text-[#b9bbbe]"}`}
              >
                🎤 Голосовой
              </button>
            </div>
            <input
              className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b] mb-4"
              placeholder="Название канала"
              value={newChannelName}
              onChange={e => setNewChannelName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreateChannel()}
            />
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 text-[#b9bbbe]" onClick={() => setNewChannelOpen(false)}>Отмена</Button>
              <Button className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white" onClick={handleCreateChannel}>Создать</Button>
            </div>
          </div>
        </div>
      )}

      {/* Модаль создания сервера */}
      {newServerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setNewServerOpen(false)}>
          <div className="bg-[#2f3136] rounded-xl w-full max-w-sm shadow-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-lg mb-4">Создать сервер</h3>
            <input
              className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b] mb-4"
              placeholder="Название сервера"
              value={newServerName}
              onChange={e => setNewServerName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreateServer()}
            />
            <div className="flex gap-2">
              <Button variant="ghost" className="flex-1 text-[#b9bbbe]" onClick={() => setNewServerOpen(false)}>Отмена</Button>
              <Button className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white" onClick={handleCreateServer}>Создать</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
