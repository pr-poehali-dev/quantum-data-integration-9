export type Role = "user" | "moderator" | "advertiser" | "admin" | "curator";

export const ROLE_HIERARCHY: Record<Role, number> = {
  user: 0,
  moderator: 1,
  advertiser: 2,
  admin: 3,
  curator: 4,
};

export const ROLE_LABELS: Record<Role, string> = {
  user: "Участник",
  moderator: "Модератор",
  advertiser: "Рекламщик",
  admin: "Админ",
  curator: "Куратор",
};

export const ROLE_COLORS: Record<Role, string> = {
  user: "",
  moderator: "bg-blue-500",
  advertiser: "bg-pink-500",
  admin: "bg-[#faa61a]",
  curator: "bg-purple-500",
};

export const ROLE_TEXT_COLORS: Record<Role, string> = {
  user: "text-[#b9bbbe]",
  moderator: "text-blue-400",
  advertiser: "text-pink-400",
  admin: "text-[#faa61a]",
  curator: "text-purple-400",
};

export interface User {
  id: number;
  name: string;
  status: string;
  avatar: string;
  color: string;
  role: Role;
  avatarImage?: string;
  banned?: boolean;
}

export interface Message {
  id: number;
  userId: number | "bot";
  text: string;
  time: string;
  imageUrl?: string;
  stickerUrl?: string;
  reactions?: { emoji: string; count: number }[];
}

export interface Channel {
  id: number;
  name: string;
  type: "text" | "voice";
  allowWrite: boolean;
  allowedRoles: Role[];
}

export interface LogEntry {
  id: number;
  time: string;
  action: string;
  by: string;
}

export interface Server {
  id: number;
  name: string;
  label: string;
  color: string;
}

export const AVATAR_COLORS = [
  "from-purple-500 to-pink-500",
  "from-green-500 to-blue-500",
  "from-yellow-500 to-orange-500",
  "from-blue-500 to-purple-500",
  "from-red-500 to-pink-500",
  "from-teal-500 to-cyan-500",
];

export const INITIAL_USERS: User[] = [
  { id: 1, name: "Катя из ИТ-23", status: "Решает алгоритмы", avatar: "К", color: "from-purple-500 to-pink-500", role: "user" },
  { id: 2, name: "Дима из МА-22", status: "В сети", avatar: "Д", color: "from-green-500 to-blue-500", role: "moderator" },
  { id: 3, name: "Настя ЭК-24", status: "Готовится к сессии", avatar: "Н", color: "from-yellow-500 to-orange-500", role: "advertiser" },
  { id: 4, name: "Артём ИТ-23", status: "На паре", avatar: "А", color: "from-blue-500 to-purple-500", role: "admin" },
];

export const INITIAL_CHANNELS: Channel[] = [
  { id: 1, name: "общий", type: "text", allowWrite: true, allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"] },
  { id: 2, name: "домашние-задания", type: "text", allowWrite: true, allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"] },
  { id: 3, name: "расписание", type: "text", allowWrite: false, allowedRoles: ["admin", "curator"] },
  { id: 4, name: "вопросы", type: "text", allowWrite: true, allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"] },
  { id: 5, name: "Учёба вместе", type: "voice", allowWrite: true, allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"] },
  { id: 6, name: "Перемена", type: "voice", allowWrite: true, allowedRoles: ["user", "moderator", "advertiser", "admin", "curator"] },
];

export const INITIAL_SERVERS: Server[] = [
  { id: 1, name: "КампусЧат", label: "КЧ", color: "bg-[#5865f2]" },
  { id: 2, name: "ИТ-группы", label: "ИТ", color: "bg-green-600" },
  { id: 3, name: "Математика", label: "МА", color: "bg-yellow-600" },
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    userId: "bot",
    text: "",
    time: "08:00",
  },
  {
    id: 2,
    userId: 1,
    text: "Ребята, кто сделал домашку по программированию? Скиньте в канал #домашние-задания 🙌",
    time: "09:15",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  {
    id: 3,
    userId: 2,
    text: "Уже залил! И напоминаю — сегодня пара перенесена на 15:00 🔔",
    time: "09:18",
    reactions: [{ emoji: "👍", count: 5 }, { emoji: "❤️", count: 3 }],
  },
];

export const INITIAL_LOGS: LogEntry[] = [
  { id: 1, time: "09:00", action: "Артём ИТ-23 получил роль Админ", by: "Куратор" },
  { id: 2, time: "09:05", action: "Создан канал #расписание", by: "Артём ИТ-23" },
  { id: 3, time: "09:20", action: "Дима из МА-22 получил роль Модератор", by: "Артём ИТ-23" },
];
