import { useState } from "react";
import { GraduationCap, Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import Sidebar from "@/components/chat/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import MembersPanel from "@/components/chat/MembersPanel";
import SettingsModal from "@/components/chat/SettingsModal";

import {
  User, Message, Channel, LogEntry, Server, Role,
  ROLE_LABELS,
  INITIAL_USERS, INITIAL_CHANNELS, INITIAL_MESSAGES, INITIAL_LOGS, INITIAL_SERVERS,
} from "@/components/chat/types";

const MY_ID = 0;

export default function Index() {
  // Навигация
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Профиль текущего пользователя
  const [nickname, setNickname] = useState("Студент");
  const [group, setGroup] = useState("ИТ-23");
  const [volume, setVolume] = useState(80);
  const [micMuted, setMicMuted] = useState(false);
  const [avatarColor, setAvatarColor] = useState("from-blue-500 to-purple-500");
  const [avatarLetter, setAvatarLetter] = useState("С");
  const [avatarImage, setAvatarImage] = useState("");
  const [myRole] = useState<Role>("curator"); // для демо — куратор видит всё

  // Данные чата
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [servers, setServers] = useState<Server[]>(INITIAL_SERVERS);
  const [activeChannelId, setActiveChannelId] = useState(1);

  // Модалки
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<"profile" | "sound" | "avatar">("profile");
  const [usersOpen, setUsersOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // --- Действия ---

  const addLog = (action: string) => {
    setLogs(prev => [...prev, {
      id: prev.length + 1,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      action,
      by: nickname,
    }]);
  };

  const handleSaveSettings = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
    setSettingsOpen(false);
    addLog(`Пользователь обновил профиль (${nickname})`);
  };

  const handleSetRole = (userId: number, role: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    const user = users.find(u => u.id === userId);
    if (user) addLog(`${user.name} получил роль «${ROLE_LABELS[role]}»`);
  };

  const handleBan = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned: true } : u));
    const user = users.find(u => u.id === userId);
    if (user) addLog(`${user.name} получил бан`);
  };

  const handleUnban = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned: false } : u));
    const user = users.find(u => u.id === userId);
    if (user) addLog(`${user.name} разбанен`);
  };

  const handleUpdateChannel = (channelId: number, changes: Partial<Channel>) => {
    setChannels(prev => prev.map(c => c.id === channelId ? { ...c, ...changes } : c));
    const ch = channels.find(c => c.id === channelId);
    if (ch) addLog(`Настройки канала #${ch.name} обновлены`);
  };

  const handleCreateChannel = (name: string, type: "text" | "voice") => {
    const newCh: Channel = {
      id: channels.length + 1,
      name,
      type,
      allowWrite: true,
      allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"],
    };
    setChannels(prev => [...prev, newCh]);
    addLog(`Создан канал ${type === "text" ? "#" : "🎤"}${name}`);
  };

  const handleCreateServer = (name: string) => {
    const newServer: Server = {
      id: servers.length + 1,
      name,
      label: name.slice(0, 2).toUpperCase(),
      color: "bg-[#5865f2]",
    };
    setServers(prev => [...prev, newServer]);
    addLog(`Создан сервер «${name}»`);
  };

  const handleAddMessage = (msg: Omit<Message, "id">) => {
    setMessages(prev => [...prev, { ...msg, id: prev.length + 1 }]);
  };

  const activeChannel = channels.find(c => c.id === activeChannelId) ?? channels[0];

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      {/* Навигация */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">КампусЧат</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Мессенджер для студентов колледжа</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
              О проекте
            </Button>
            <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
              Вступить
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225]">
            <div className="flex flex-col gap-3">
              <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                О проекте
              </Button>
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium">
                Вступить
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Макет */}
      <div className="flex" style={{ minHeight: "calc(100vh - 65px)" }}>
        {/* Серверная панель */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full" />
          {servers.map(s => (
            <div
              key={s.id}
              className={`w-12 h-12 ${s.color} rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer`}
              title={s.name}
            >
              <span className="text-white text-xs font-bold">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Боковая панель каналов */}
        <Sidebar
          channels={channels}
          servers={servers}
          activeChannelId={activeChannelId}
          mobileSidebarOpen={mobileSidebarOpen}
          nickname={nickname}
          group={group}
          avatarColor={avatarColor}
          avatarLetter={avatarLetter}
          avatarImage={avatarImage}
          micMuted={micMuted}
          myRole={myRole}
          onSelectChannel={(id) => { setActiveChannelId(id); setMobileSidebarOpen(false); }}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onOpenSettings={() => setSettingsOpen(true)}
          onMicToggle={() => setMicMuted(v => !v)}
          onCreateChannel={handleCreateChannel}
          onCreateServer={handleCreateServer}
        />

        {/* Основной чат */}
        <ChatArea
          channel={activeChannel}
          messages={messages}
          users={users}
          myRole={myRole}
          nickname={nickname}
          avatarColor={avatarColor}
          avatarLetter={avatarLetter}
          avatarImage={avatarImage}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenUsers={() => setUsersOpen(true)}
          onAddMessage={handleAddMessage}
        />

        {/* Панель участников (правая колонка на xl) */}
        <div className="hidden xl:block w-60 bg-[#2f3136] p-4 overflow-y-auto">
          <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">В сети — {users.filter(u => !u.banned).length}</h3>
          <div className="space-y-2">
            {users.filter(u => !u.banned).map(user => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0 overflow-hidden`}>
                  {user.avatarImage
                    ? <img src={user.avatarImage} className="w-full h-full object-cover" alt="" />
                    : <span className="text-white text-sm font-medium">{user.avatar}</span>
                  }
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.name}</div>
                  <div className="text-[#b9bbbe] text-xs truncate flex items-center gap-1">
                    {user.role !== "user" && (
                      <span className={`text-xs font-semibold`} style={{ color: undefined }}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    )}
                    {user.role === "user" && user.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модаль настроек */}
      <SettingsModal
        open={settingsOpen}
        nickname={nickname}
        group={group}
        volume={volume}
        micMuted={micMuted}
        avatarColor={avatarColor}
        avatarLetter={avatarLetter}
        avatarImage={avatarImage}
        settingsTab={settingsTab}
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
        onNicknameChange={setNickname}
        onGroupChange={setGroup}
        onVolumeChange={setVolume}
        onMicToggle={() => setMicMuted(v => !v)}
        onAvatarColorChange={setAvatarColor}
        onAvatarLetterChange={setAvatarLetter}
        onAvatarImageChange={setAvatarImage}
        onTabChange={setSettingsTab}
      />

      {/* Модаль участников / управления */}
      <MembersPanel
        open={usersOpen}
        users={users}
        channels={channels}
        logs={logs}
        myRole={myRole}
        myId={MY_ID}
        onClose={() => setUsersOpen(false)}
        onSetRole={handleSetRole}
        onBan={handleBan}
        onUnban={handleUnban}
        onUpdateChannel={handleUpdateChannel}
      />

      {/* Уведомление о сохранении */}
      {savedNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3ba55c] text-white px-5 py-2.5 rounded-lg shadow-xl z-50 flex items-center gap-2 text-sm font-medium">
          <Check className="w-4 h-4" /> Настройки сохранены!
        </div>
      )}
    </div>
  );
}
