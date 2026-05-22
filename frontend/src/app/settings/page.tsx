'use client';

import { AppLayout } from '@/components/dashboard';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-terracotta)] to-[var(--color-savanna)] flex items-center justify-center">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-[var(--color-soil)]">
              Green Line Settings
            </h1>
            <p className="text-[var(--color-bark)] mt-1">
              Configure pilot preferences and system access
            </p>
          </div>
        </div>

        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>This feature is under development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-[var(--color-terracotta)] mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-[var(--color-soil)] mb-2">
                Pilot Settings & Preferences
              </h3>
              <p className="text-[var(--color-bark)] max-w-md mx-auto">
                This page will provide pilot access, notification preferences, 
                farm unit configuration, sensor management, and system controls.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
