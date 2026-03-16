import { useState } from "react";
import { Crown, Shield, Megaphone, Star, Users, X, Ban, Hash, Mic, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  User, Role, Channel, LogEntry,
  ROLE_HIERARCHY, ROLE_LABELS, ROLE_COLORS, ROLE_TEXT_COLORS,
} from "./types";

const ROLE_ICONS: Record<Role, React.ReactNode> = {
  user: null,
  moderator: <Shield className="w-3 h-3" />,
  advertiser: <Megaphone className="w-3 h-3" />,
  admin: <Crown className="w-3 h-3" />,
  curator: <Star className="w-3 h-3" />,
};

const ALL_ROLES: Role[] = ["user", "moderator", "advertiser", "admin", "curator"];

interface MembersPanelProps {
  open: boolean;
  users: User[];
  channels: Channel[];
  logs: LogEntry[];
  myRole: Role;
  myId: number;
  onClose: () => void;
  onSetRole: (userId: number, role: Role) => void;
  onBan: (userId: number) => void;
  onUnban: (userId: number) => void;
  onUpdateChannel: (channelId: number, changes: Partial<Channel>) => void;
}

export default function MembersPanel({
  open, users, channels, logs, myRole, myId,
  onClose, onSetRole, onBan, onUnban, onUpdateChannel,
}: MembersPanelProps) {
  const [tab, setTab] = useState<"members" | "logs" | "channels">("members");
  const [roleMenuFor, setRoleMenuFor] = useState<number | null>(null);

  if (!open) return null;

  const canBan = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["moderator"];
  const canUnban = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["admin"];
  const canSetRoles = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["curator"];
  const canManageChannels = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["admin"];
  const canViewLogs = ROLE_HIERARCHY[myRole] >= ROLE_HIERARCHY["curator"];

  const groupedByRole = ALL_ROLES.slice().reverse().map(role => ({
    role,
    members: users.filter(u => u.role === role),
  })).filter(g => g.members.length > 0);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#2f3136] rounded-xl w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Шапка */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#202225] flex-shrink-0">
          <h2 className="text-white text-lg font-bold flex items-center gap-2">
            <Users className="w-5 h-5" /> Управление сервером
          </h2>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={onClose}>
            <X className="w-4 h-4 text-[#b9bbbe]" />
          </Button>
        </div>

        {/* Табы */}
        <div className="flex border-b border-[#202225] px-4 flex-shrink-0">
          {([
            { key: "members", label: "Участники" },
            { key: "channels", label: "Каналы", hide: !canManageChannels },
            { key: "logs", label: "Логи", hide: !canViewLogs },
          ] as { key: "members" | "logs" | "channels"; label: string; hide?: boolean }[])
            .filter(t => !t.hide)
            .map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t.key ? "border-[#5865f2] text-white" : "border-transparent text-[#8e9297] hover:text-[#dcddde]"}`}
              >
                {t.label}
              </button>
            ))}
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {/* Участники */}
          {tab === "members" && (
            <div className="space-y-4">
              {groupedByRole.map(({ role, members }) => (
                <div key={role}>
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5 ${ROLE_TEXT_COLORS[role] || "text-[#8e9297]"}`}>
                    {ROLE_ICONS[role]}
                    <span>{ROLE_LABELS[role]} — {members.length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {members.map(user => (
                      <div key={user.id} className={`flex items-center gap-3 p-2.5 rounded-lg ${user.banned ? "opacity-50 bg-red-500/5" : "bg-[#36393f]"}`}>
                        <div className={`w-9 h-9 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0 overflow-hidden`}>
                          {user.avatarImage
                            ? <img src={user.avatarImage} className="w-full h-full object-cover" alt="" />
                            : <span className="text-white text-sm font-bold">{user.avatar}</span>
                          }
                          {user.banned && (
                            <div className="absolute inset-0 bg-red-500/50 rounded-full flex items-center justify-center">
                              <Ban className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-white text-sm font-medium truncate">{user.name}</span>
                            {ROLE_COLORS[user.role] && (
                              <span className={`${ROLE_COLORS[user.role]} text-white text-xs px-1.5 py-0.5 rounded font-semibold flex items-center gap-0.5`}>
                                {ROLE_ICONS[user.role]}
                                {ROLE_LABELS[user.role]}
                              </span>
                            )}
                            {user.banned && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">БАН</span>}
                          </div>
                          <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                        </div>
                        {user.id !== myId && (
                          <div className="flex gap-1 flex-shrink-0 relative">
                            {canSetRoles && !user.banned && (
                              <div className="relative">
                                <button
                                  onClick={() => setRoleMenuFor(roleMenuFor === user.id ? null : user.id)}
                                  className="text-xs px-2 py-1 bg-[#40444b] hover:bg-[#4f5460] text-[#b9bbbe] rounded transition-colors"
                                  title="Изменить роль"
                                >
                                  Роль
                                </button>
                                {roleMenuFor === user.id && (
                                  <div className="absolute right-0 bottom-full mb-1 bg-[#18191c] border border-[#40444b] rounded-lg overflow-hidden z-20 min-w-[140px]">
                                    {ALL_ROLES.filter(r => ROLE_HIERARCHY[r] < ROLE_HIERARCHY[myRole]).map(r => (
                                      <button
                                        key={r}
                                        onClick={() => { onSetRole(user.id, r); setRoleMenuFor(null); }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[#40444b] flex items-center gap-2 transition-colors ${user.role === r ? "text-white font-semibold" : "text-[#b9bbbe]"}`}
                                      >
                                        {ROLE_ICONS[r]}
                                        {ROLE_LABELS[r]}
                                        {user.role === r && " ✓"}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                            {canBan && !user.banned && (
                              <button
                                onClick={() => onBan(user.id)}
                                className="text-xs px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                title="Забанить"
                              >
                                Бан
                              </button>
                            )}
                            {canUnban && user.banned && (
                              <button
                                onClick={() => onUnban(user.id)}
                                className="text-xs px-2 py-1 bg-[#3ba55c]/10 hover:bg-[#3ba55c]/20 text-[#3ba55c] rounded transition-colors"
                                title="Разбанить"
                              >
                                Разбан
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-[#36393f] rounded-lg text-xs text-[#b9bbbe] space-y-1">
                <p className="text-white font-semibold mb-2">Иерархия ролей:</p>
                {ALL_ROLES.map(r => (
                  <div key={r} className="flex items-center gap-2">
                    <span className="text-[#72767d] w-4">{ROLE_HIERARCHY[r]}</span>
                    <span className={`${ROLE_TEXT_COLORS[r]} flex items-center gap-1`}>{ROLE_ICONS[r]}{ROLE_LABELS[r]}</span>
                    <span className="text-[#72767d] text-xs">
                      {r === "user" && "— читает, пишет"}
                      {r === "moderator" && "— + баны"}
                      {r === "advertiser" && "— + упоминает всех"}
                      {r === "admin" && "— + разбаны, каналы"}
                      {r === "curator" && "— + роли, логи, серверы"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Настройка каналов */}
          {tab === "channels" && canManageChannels && (
            <div className="space-y-3">
              {channels.map(ch => (
                <div key={ch.id} className="bg-[#36393f] rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-3">
                    {ch.type === "text" ? <Hash className="w-4 h-4 text-[#8e9297]" /> : <Mic className="w-4 h-4 text-[#8e9297]" />}
                    <span className="text-white font-medium text-sm">{ch.name}</span>
                    <span className="text-[#72767d] text-xs ml-auto">{ch.type === "text" ? "текстовый" : "голосовой"}</span>
                  </div>
                  {ch.type === "text" && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#b9bbbe] text-xs">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Разрешить запись всем</span>
                      </div>
                      <button
                        onClick={() => onUpdateChannel(ch.id, { allowWrite: !ch.allowWrite })}
                        className={`w-11 h-6 rounded-full transition-colors relative ${ch.allowWrite ? "bg-[#3ba55c]" : "bg-[#4f545c]"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ch.allowWrite ? "left-6" : "left-1"}`} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Логи */}
          {tab === "logs" && canViewLogs && (
            <div className="space-y-2">
              {logs.length === 0 && (
                <p className="text-[#72767d] text-sm text-center py-4">Лог пуст</p>
              )}
              {[...logs].reverse().map(entry => (
                <div key={entry.id} className="flex items-start gap-3 bg-[#36393f] rounded-lg p-3">
                  <span className="text-[#72767d] text-xs flex-shrink-0 mt-0.5">{entry.time}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#dcddde] text-sm">{entry.action}</p>
                    <p className="text-[#72767d] text-xs">от: {entry.by}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
