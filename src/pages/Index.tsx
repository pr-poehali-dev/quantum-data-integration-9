import { useState } from "react";
import {
  Shield,
  Zap,
  Clock,
  ArrowRight,
  Hash,
  Users,
  Mic,
  MicOff,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Volume2,
  Crown,
  Camera,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const USERS_INITIAL = [
  { name: "Катя из ИТ-23", status: "Решает алгоритмы", avatar: "К", color: "from-purple-500 to-pink-500", isAdmin: false },
  { name: "Дима из МА-22", status: "В сети", avatar: "Д", color: "from-green-500 to-blue-500", isAdmin: false },
  { name: "Настя ЭК-24", status: "Готовится к сессии", avatar: "Н", color: "from-yellow-500 to-orange-500", isAdmin: false },
  { name: "Артём ИТ-23", status: "На паре", avatar: "А", color: "from-blue-500 to-purple-500", isAdmin: true },
];

const AVATAR_COLORS = [
  "from-purple-500 to-pink-500",
  "from-green-500 to-blue-500",
  "from-yellow-500 to-orange-500",
  "from-blue-500 to-purple-500",
  "from-red-500 to-pink-500",
  "from-teal-500 to-cyan-500",
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [nickname, setNickname] = useState("Студент");
  const [group, setGroup] = useState("ИТ-23");
  const [volume, setVolume] = useState(80);
  const [micMuted, setMicMuted] = useState(false);
  const [avatarColor, setAvatarColor] = useState("from-blue-500 to-purple-500");
  const [avatarLetter, setAvatarLetter] = useState("С");
  const [users, setUsers] = useState(USERS_INITIAL);
  const [settingsTab, setSettingsTab] = useState<"profile" | "sound" | "avatar">("profile");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSettings = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
    setSettingsOpen(false);
  };

  const toggleAdmin = (index: number) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === index ? { ...u, isAdmin: !u.isAdmin } : u))
    );
  };

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

      {/* Макет в стиле Discord */}
      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {["ИТ", "МА", "ДЗ", "ЭК"].map((label) => (
            <div
              key={label}
              className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2]"
            >
              <span className="text-[#dcddde] text-xs font-bold">{label}</span>
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div
            className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col`}
          >
            <div className="p-4 border-b border-[#202225] flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">КампусЧат</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-4">
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Учёба</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["общий", "домашние-задания", "расписание", "вопросы"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Голосовые</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["Учёба вместе", "Перемена"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-2 bg-[#292b2f] flex items-center gap-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white text-sm font-bold">{avatarLetter}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{nickname}</div>
                <div className="text-[#b9bbbe] text-xs truncate">группа {group}</div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-[#40444b]"
                  onClick={() => setMicMuted(!micMuted)}
                  title={micMuted ? "Включить микрофон" : "Выключить микрофон"}
                >
                  {micMuted
                    ? <MicOff className="w-4 h-4 text-red-400" />
                    : <Mic className="w-4 h-4 text-[#b9bbbe]" />
                  }
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-[#40444b]"
                  onClick={() => setSettingsOpen(true)}
                  title="Настройки"
                >
                  <Settings className="w-4 h-4 text-[#b9bbbe]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
              <Button
                variant="ghost"
                className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Hash className="w-5 h-5 text-[#8e9297]" />
              <span className="text-white font-semibold">общий</span>
              <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
              <span className="text-[#8e9297] text-sm hidden sm:block">Общайся, учись и помогай однокурсникам</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Users
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]"
                  onClick={() => setUsersOpen(true)}
                  title="Управление участниками"
                />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </div>
            </div>

            {/* Сообщения чата */}
            <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto">
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
                    <p className="mb-3 sm:mb-4">
                      <strong>Добро пожаловать в КампусЧат!</strong> Общайся с однокурсниками, делись домашними заданиями и не пропускай ничего важного.
                    </p>
                    <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 sm:p-4 rounded">
                      <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Что умеет КампусЧат:</h3>
                      <ul className="space-y-1 text-xs sm:text-sm text-[#b9bbbe]">
                        <li>💬 Чаты для каждой группы и предмета</li>
                        <li>📚 Раздел для домашних заданий и расписания</li>
                        <li>🔔 Уведомления о важных событиях</li>
                        <li>🎤 Голосовые комнаты для совместной учёбы</li>
                        <li>🔒 Закрытое сообщество — только студенты вашего колледжа</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Сообщение студента */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">К</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Катя из ИТ-23</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 9:15</span>
                  </div>
                  <div className="text-[#dcddde] mb-3 text-sm sm:text-base">
                    Ребята, кто сделал домашку по программированию? Скиньте в канал #домашние-задания 🙌
                  </div>

                  {/* Демо профиля студента */}
                  <div className="bg-[#2f3136] border border-[#202225] rounded-lg overflow-hidden w-full max-w-sm">
                    <div className="h-16 sm:h-20 bg-gradient-to-r from-[#5865f2] to-[#7c3aed] relative">
                      <div className="absolute -bottom-3 sm:-bottom-4 left-3 sm:left-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#2f3136] bg-[#36393f] overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2f3136] rounded-full flex items-center justify-center">
                              <span className="text-lg sm:text-2xl">К</span>
                            </div>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#3ba55c] border-4 border-[#2f3136] rounded-full"></div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-[#4f545c] hover:bg-[#5d6269] text-white text-xs px-2 sm:px-3 py-1 rounded"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        <span className="hidden sm:inline">Профиль</span>
                      </Button>
                    </div>

                    <div className="pt-4 sm:pt-6 px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-white text-lg sm:text-xl font-bold mb-1">Катя</h3>
                        <div className="flex items-center gap-2 text-[#b9bbbe] text-xs sm:text-sm">
                          <span>katya_student</span>
                          <span>-</span>
                          <span>Группа ИТ-23</span>
                          <div className="flex gap-1 ml-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#5865f2] rounded-sm"></div>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#3ba55c] rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <div className="bg-[#36393f] rounded-lg p-2 sm:p-3 relative">
                          <div className="absolute -top-2 left-3 sm:left-4 w-4 h-4 bg-[#36393f] rotate-45"></div>
                          <div className="flex items-center gap-2 text-[#dcddde] text-xs sm:text-sm">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#5865f2] rounded-full flex items-center justify-center">
                              <span className="text-xs">📚</span>
                            </div>
                            <span>Готовлюсь к экзамену...</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex border-b border-[#40444b] mb-3 sm:mb-4">
                        <button className="px-3 sm:px-4 py-2 text-[#8e9297] text-xs sm:text-sm font-medium hover:text-[#dcddde]">
                          Обо мне
                        </button>
                        <button className="px-3 sm:px-4 py-2 text-white text-xs sm:text-sm font-medium border-b-2 border-[#5865f2]">
                          Активность
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2 sm:mb-3">
                          <span>Сейчас</span>
                        </div>

                        <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#36393f] rounded-lg">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5865f2] to-[#7c3aed] rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-xs sm:text-sm mb-1">КампусЧат</div>
                            <div className="text-[#dcddde] text-xs sm:text-sm mb-1">Решает задачи по алгоритмам</div>
                            <div className="text-[#b9bbbe] text-xs sm:text-sm mb-2">Группа ИТ-23</div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#3ba55c] rounded-full animate-pulse"></div>
                              <span className="text-[#3ba55c] text-xs font-medium">в сети</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Второе сообщение */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">Д</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Дима из МА-22</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 9:18</span>
                  </div>
                  <div className="text-[#dcddde] mb-2 text-sm sm:text-base">
                    Уже залил! И напоминаю — сегодня пара перенесена на 15:00 🔔
                  </div>
                  <div className="flex items-center gap-1 text-[#72767d] text-xs">
                    <span>👍 5</span>
                    <span className="ml-2">❤️ 3</span>
                  </div>
                </div>
              </div>

              {/* Секция с преимуществами */}
              <div className="bg-[#2f3136] rounded-lg p-3 sm:p-4 border border-[#202225]">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold text-sm sm:text-base">Зачем КампусЧат?</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {[
                    {
                      icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Всё в одном месте",
                      desc: "Чаты, задания, расписание",
                    },
                    {
                      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Быстрые уведомления",
                      desc: "Не пропустишь ни одной пары",
                    },
                    {
                      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Работает 24/7",
                      desc: "Доступ с телефона и компьютера",
                    },
                    {
                      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
                      title: "Только свои",
                      desc: "Закрытое сообщество вашего колледжа",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-[#36393f] transition-colors"
                    >
                      <div className="text-[#5865f2] mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="text-white font-medium text-xs sm:text-sm">{feature.title}</div>
                        <div className="text-[#b9bbbe] text-xs sm:text-sm">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Поле ввода сообщения */}
            <div className="p-2 sm:p-4">
              <div className="bg-[#40444b] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                <div className="text-[#72767d] text-xs sm:text-sm">Написать в #общий</div>
              </div>
            </div>
          </div>

          {/* Боковая панель участников */}
          <div className="hidden xl:block w-60 bg-[#2f3136] p-4">
            <div className="mb-4">
              <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">В сети — 4</h3>
              <div className="space-y-2">
                {[
                  {
                    name: "Катя из ИТ-23",
                    status: "Решает алгоритмы",
                    avatar: "К",
                    color: "from-purple-500 to-pink-500",
                  },
                  { name: "Дима из МА-22", status: "В сети", avatar: "Д", color: "from-green-500 to-blue-500" },
                  { name: "Настя ЭК-24", status: "Готовится к сессии", avatar: "Н", color: "from-yellow-500 to-orange-500" },
                  { name: "Артём ИТ-23", status: "На паре", avatar: "А", color: "from-blue-500 to-purple-500" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}
                    >
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{user.name}</div>
                      <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Модаль настроек */}
      {settingsOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSettingsOpen(false)}>
          <div className="bg-[#2f3136] rounded-xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#202225]">
              <h2 className="text-white text-lg font-bold">Настройки пользователя</h2>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={() => setSettingsOpen(false)}>
                <X className="w-4 h-4 text-[#b9bbbe]" />
              </Button>
            </div>

            {/* Табы */}
            <div className="flex border-b border-[#202225] px-6">
              {(["profile", "sound", "avatar"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSettingsTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    settingsTab === tab
                      ? "border-[#5865f2] text-white"
                      : "border-transparent text-[#8e9297] hover:text-[#dcddde]"
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
                      onChange={(e) => setNickname(e.target.value)}
                      maxLength={32}
                      placeholder="Введи никнейм..."
                    />
                  </div>
                  <div>
                    <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Группа</label>
                    <input
                      className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b]"
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      maxLength={16}
                      placeholder="Например: ИТ-23"
                    />
                  </div>
                  <div>
                    <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block mb-2">Буква на аватарке</label>
                    <input
                      className="w-full bg-[#202225] text-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5865f2] border border-[#40444b]"
                      value={avatarLetter}
                      onChange={(e) => setAvatarLetter(e.target.value.slice(0, 1).toUpperCase() || "С")}
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
                      type="range"
                      min={0}
                      max={100}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
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
                      onClick={() => setMicMuted(!micMuted)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${micMuted ? "bg-red-500" : "bg-[#3ba55c]"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${micMuted ? "left-1" : "left-7"}`} />
                    </button>
                  </div>
                </div>
              )}

              {settingsTab === "avatar" && (
                <div className="space-y-4">
                  <label className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide block">Цвет аватарки</label>
                  <div className="grid grid-cols-3 gap-3">
                    {AVATAR_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => setAvatarColor(color)}
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
              )}
            </div>

            <div className="px-6 pb-5 flex justify-end gap-3">
              <Button variant="ghost" className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]" onClick={() => setSettingsOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#5865f2] hover:bg-[#4752c4] text-white" onClick={handleSaveSettings}>
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Модаль управления участниками */}
      {usersOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setUsersOpen(false)}>
          <div className="bg-[#2f3136] rounded-xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#202225]">
              <h2 className="text-white text-lg font-bold">Участники</h2>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]" onClick={() => setUsersOpen(false)}>
                <X className="w-4 h-4 text-[#b9bbbe]" />
              </Button>
            </div>
            <div className="p-4 space-y-2">
              {users.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#36393f] rounded-lg">
                  <div className={`w-10 h-10 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative flex-shrink-0`}>
                    <span className="text-white text-sm font-bold">{user.avatar}</span>
                    {user.isAdmin && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#faa61a] rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate">{user.name}</span>
                      {user.isAdmin && (
                        <span className="bg-[#faa61a] text-black text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0">Админ</span>
                      )}
                    </div>
                    <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => toggleAdmin(index)}
                    className={`text-xs px-3 flex-shrink-0 ${
                      user.isAdmin
                        ? "bg-[#40444b] hover:bg-red-500/20 text-[#b9bbbe] hover:text-red-400 border border-[#40444b]"
                        : "bg-[#faa61a]/10 hover:bg-[#faa61a]/20 text-[#faa61a] border border-[#faa61a]/30"
                    }`}
                  >
                    {user.isAdmin ? "Снять права" : "Сделать админом"}
                  </Button>
                </div>
              ))}
            </div>
            <div className="px-6 pb-5 text-[#8e9297] text-xs text-center">
              Администраторы видят все каналы и могут управлять участниками
            </div>
          </div>
        </div>
      )}

      {/* Уведомление о сохранении */}
      {savedNotice && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3ba55c] text-white px-5 py-2.5 rounded-lg shadow-xl z-50 flex items-center gap-2 text-sm font-medium">
          <Check className="w-4 h-4" /> Настройки сохранены!
        </div>
      )}
    </div>
  );
};

export default Index;