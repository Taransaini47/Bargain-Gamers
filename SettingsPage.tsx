import React from 'react';
import { ChevronRight, Bell, Globe, Lock, Volume2, Mic2, User } from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage = ({ onBack }: SettingsPageProps) => {
  const menuItems = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Profile",
      subtitle: "View and edit profile"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Notifications",
      subtitle: "Manage notification settings"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Language",
      subtitle: "Choose your preferred language"
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Audio Quality",
      subtitle: "Set your audio preferences"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Privacy",
      subtitle: "Manage your privacy settings"
    }
  ];

  return (
    <div className="min-h-full bg-[#121212]">
      <div className="p-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-bold">Guest User</h2>
            <p className="text-sm text-neutral-400">View Profile</p>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-4 p-4 rounded-lg active:bg-neutral-800/40"
            >
              <div className="text-neutral-400">{item.icon}</div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.subtitle}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-neutral-800/40 rounded-lg p-4">
            <h3 className="font-medium mb-2">Audio Device</h3>
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Mic2 className="w-4 h-4" />
              <span>Phone Speaker</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;