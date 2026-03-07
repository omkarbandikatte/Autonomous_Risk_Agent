"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Lock, Code, User } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "api", label: "API", icon: Code },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure system preferences and options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border bg-card p-6">
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full px-4 py-2 rounded-lg border bg-background text-foreground"
                      defaultValue="Acme Corporation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Primary Industry</label>
                    <select className="w-full px-4 py-2 rounded-lg border bg-background text-foreground">
                      <option>Manufacturing</option>
                      <option>Technology</option>
                      <option>Automotive</option>
                      <option>Electronics</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 rounded-lg border bg-background text-foreground">
                      <option>UTC-8 (PST)</option>
                      <option>UTC-5 (EST)</option>
                      <option>UTC+0 (GMT)</option>
                      <option>UTC+1 (CET)</option>
                      <option>UTC+8 (SGT)</option>
                    </select>
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "High Risk Alerts", description: "Receive alerts when suppliers reach high risk threshold" },
                    { label: "Disruption Events", description: "Notify when disruption events occur" },
                    { label: "Weekly Digest", description: "Get weekly supply chain health summary" },
                    { label: "Simulation Results", description: "Notify when simulations complete" },
                  ].map((notification) => (
                    <div key={notification.label} className="flex items-center gap-4 p-4 border rounded-lg">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.label}</p>
                        <p className="text-xs text-muted-foreground">{notification.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full">Save Preferences</Button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Change Password</p>
                        <p className="text-xs text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Active Sessions</p>
                        <p className="text-xs text-muted-foreground">Manage your login sessions</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">API Keys</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Use API keys to authenticate requests to SupplyGuard API.
                  </p>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm">Production Key</p>
                      <span className="text-xs font-semibold text-green-600">Active</span>
                    </div>
                    <input
                      type="password"
                      value="sg_prod_1234567890abcdefgh"
                      readOnly
                      className="w-full px-3 py-2 text-xs rounded bg-background border"
                    />
                    <Button variant="outline" size="sm" className="mt-2 w-full">Copy Key</Button>
                  </div>

                  <Button className="w-full">Generate New Key</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
