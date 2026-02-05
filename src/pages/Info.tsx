 import { useState } from "react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
 import { Separator } from "@/components/ui/separator";
 import { toast } from "@/hooks/use-toast";
 import HamburgerMenu from "@/components/HamburgerMenu";
 
 export default function Info() {
   const [user, setUser] = useState({
     name: "User",
     email: "user@example.com",
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
       {/* Header with Hamburger Menu */}
       <div className="flex items-center gap-4 mb-6">
         <HamburgerMenu />
         <h1 className="text-2xl font-semibold">個人資料</h1>
       </div>
 
       <Card className="max-w-lg">
         <CardHeader>
           <CardTitle className="text-lg font-medium">基本資訊</CardTitle>
         </CardHeader>
         <Separator />
         <CardContent className="pt-6">
           <div className="flex flex-col items-center gap-4 mb-6">
             <Avatar className="h-24 w-24">
               <AvatarImage src={user.avatar} alt={user.name} />
               <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                 {user.name.charAt(0).toUpperCase()}
               </AvatarFallback>
             </Avatar>
             {!isEditing && (
               <Button variant="outline" size="sm">
                 更換頭像
               </Button>
             )}
           </div>
 
           {isEditing ? (
             <div className="space-y-4">
               <div>
                 <Label htmlFor="name">姓名</Label>
                 <Input
                   id="name"
                   value={editName}
                   onChange={(e) => setEditName(e.target.value)}
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="email">電子郵件</Label>
                 <Input
                   id="email"
                   type="email"
                   value={editEmail}
                   onChange={(e) => setEditEmail(e.target.value)}
                   className="mt-1"
                 />
               </div>
               <div className="flex gap-2 pt-4">
                 <Button variant="outline" onClick={handleCancel}>
                   取消
                 </Button>
                 <Button onClick={handleSave}>儲存</Button>
               </div>
             </div>
           ) : (
             <div className="space-y-4">
               <div>
                 <Label className="text-muted-foreground">姓名</Label>
                 <p className="mt-1">{user.name}</p>
               </div>
               <div>
                 <Label className="text-muted-foreground">電子郵件</Label>
                 <p className="mt-1">{user.email}</p>
               </div>
               <Button
                 variant="outline"
                 className="mt-4"
                 onClick={() => setIsEditing(true)}
               >
                 編輯資料
               </Button>
             </div>
           )}
         </CardContent>
       </Card>
     </div>
   );
 }