'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Lock, Unlock } from 'lucide-react';

const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+201000000001',
    role: 'owner',
    status: 'active',
    joinDate: '2026-01-15',
    properties: 2,
  },
  {
    id: '2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '+201000000002',
    role: 'user',
    status: 'active',
    joinDate: '2026-02-20',
    properties: 0,
  },
  {
    id: '3',
    name: 'محمد إبراهيم',
    email: 'mohamed@example.com',
    phone: '+201000000003',
    role: 'owner',
    status: 'inactive',
    joinDate: '2026-01-10',
    properties: 1,
  },
  {
    id: '4',
    name: 'سارة حسن',
    email: 'sarah@example.com',
    phone: '+201000000004',
    role: 'user',
    status: 'active',
    joinDate: '2026-03-05',
    properties: 0,
  },
];

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  properties: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === 'all' || user.role === filterRole;
    const statusMatch = filterStatus === 'all' || user.status === filterStatus;
    return roleMatch && statusMatch;
  });

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u =>
      u.id === id
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const getRoleBadge = (role: string) => {
    const variants: { [key: string]: any } = {
      owner: 'bg-blue-100 text-blue-800',
      user: 'bg-slate-100 text-slate-800',
      super_admin: 'bg-red-100 text-red-800',
    };
    return variants[role] || 'bg-slate-100 text-slate-800';
  };

  const getRoleLabel = (role: string) => {
    const labels: { [key: string]: string } = {
      owner: 'مالك عقار',
      user: 'مستخدم عادي',
      super_admin: 'سوبر أدمن',
    };
    return labels[role] || role;
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar userRole="super_admin" />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">إدارة المستخدمين</h1>
            <p className="text-slate-600">إدارة حسابات المستخدمين والمالكين</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">مالكو عقارات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {users.filter(u => u.role === 'owner').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">مستخدمون نشطون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">مستخدمون معطلون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.status === 'inactive').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter and Search */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>البحث والتصفية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="ابحث عن الاسم أو البريد الإلكتروني..."
                  className="flex-1"
                />
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="نوع الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="user">مستخدم عادي</SelectItem>
                    <SelectItem value="owner">مالك عقار</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">معطل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>قائمة المستخدمين</CardTitle>
              <CardDescription>
                {filteredUsers.length} مستخدم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الاسم
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        البريد الإلكتروني
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الهاتف
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        النوع
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        العقارات
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الحالة
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-900">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4 text-slate-900 font-medium">{user.name}</td>
                        <td className="py-4 px-4 text-slate-600">{user.email}</td>
                        <td className="py-4 px-4 text-slate-600">{user.phone}</td>
                        <td className="py-4 px-4">
                          <Badge className={getRoleBadge(user.role)}>
                            {getRoleLabel(user.role)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-slate-900">{user.properties}</td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={user.status === 'active' ? 'default' : 'secondary'}
                            className={user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }
                          >
                            {user.status === 'active' ? 'نشط' : 'معطل'}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === 'active' ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
