import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import HamburgerMenu from "@/components/HamburgerMenu";
import { UserCircle, Activity } from "lucide-react";

export default function Info() {
  const [user, setUser] = useState({
    name: "Sarah 老師",
    email: "sarah@school.edu",
    avatar: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleSave = () => {
    setUser({ ...user, name: editName, email: editEmail });
    setIsEditing(false);
    toast({
      title: "儲存成功",
      description: "您的個人資料已更新",
    });
  };

  const handleCancel = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header with Hamburger Menu */}
        <div className="flex items-center gap-4 mb-8">
          <HamburgerMenu />
          <h1 className="text-2xl font-bold text-foreground">個人資料</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card className="md:col-span-1 border-border/60 shadow-sm rounded-2xl bg-primary/5">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center h-full gap-2">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">
                <Activity className="h-8 w-8" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">累積練習次數</p>
              <p className="text-5xl font-extrabold text-foreground tracking-tight">8</p>
              <p className="text-xs text-primary font-medium mt-2">持續成長中！</p>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card className="md:col-span-2 border-border/60 shadow-sm rounded-2xl">
            <CardHeader className="border-b border-border/50 bg-card/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-secondary" />
                帳號資訊
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!isEditing && (
                    <Button variant="outline" size="sm" className="rounded-full">
                      更換頭像
                    </Button>
                  )}
                </div>

                <div className="flex-1 w-full">
                  {isEditing ? (
                    <div className="space-y-5 animate-in fade-in slide-in-from-left-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-bold">顯示名稱</Label>
                        <Input
                          id="name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-background rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold">電子郵件</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="bg-background rounded-xl"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={handleCancel} className="rounded-full flex-1">
                          取消
                        </Button>
                        <Button onClick={handleSave} className="rounded-full flex-1">
                          儲存變更
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">顯示名稱</Label>
                        <p className="mt-1 text-lg font-medium text-foreground">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">電子郵件</Label>
                        <p className="mt-1 text-lg font-medium text-foreground">{user.email}</p>
                      </div>
                      <Button
                        variant="secondary"
                        className="mt-2 rounded-full px-8"
                        onClick={() => setIsEditing(true)}
                      >
                        編輯資料
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}