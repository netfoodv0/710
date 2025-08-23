import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsContents,
} from './components/tabs';

export const TabsDemo = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px] bg-gray-100 rounded-lg p-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>

      <TabsContents className="mx-1 mb-1 -mt-2 rounded-sm h-full bg-white">
        <TabsContent value="account" className="space-y-6 p-6">
          <p className="text-sm text-gray-600">
            Make changes to your account here. Click save when you&apos;re done.
          </p>

          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <label htmlFor="username" className="text-sm font-medium">Username</label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </div>

          <Button>Save changes</Button>
        </TabsContent>
        <TabsContent value="password" className="space-y-6 p-6">
          <p className="text-sm text-gray-600">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="current" className="text-sm font-medium">Current password</label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <label htmlFor="new" className="text-sm font-medium">New password</label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-1">
              <label htmlFor="confirm" className="text-sm font-medium">Confirm password</label>
              <Input id="confirm" type="password" />
            </div>
          </div>

          <Button>Save password</Button>
        </TabsContent>
      </TabsContents>
    </Tabs>
  );
};
