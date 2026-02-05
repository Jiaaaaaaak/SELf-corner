 import { useState } from "react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Separator } from "@/components/ui/separator";
 import { Input } from "@/components/ui/input";
 import { Search } from "lucide-react";
 import HamburgerMenu from "@/components/HamburgerMenu";
 
 export default function History() {
   const [searchQuery, setSearchQuery] = useState("");
 
   // Mock history data
   const historyItems = [
     { id: 1, date: "2026-02-01", topic: "數學課程" },
     { id: 2, date: "2026-01-30", topic: "物理課程" },
     { id: 3, date: "2026-01-28", topic: "化學課程" },
     { id: 4, date: "2026-01-25", topic: "英文課程" },
     { id: 5, date: "2026-01-20", topic: "歷史課程" },
   ];
 
   const filteredHistory = historyItems.filter(
     (item) =>
       item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.date.includes(searchQuery)
   );
 
   return (
     <div className="min-h-screen bg-background p-6">
       {/* Header with Hamburger Menu */}
       <div className="flex items-center gap-4 mb-6">
         <HamburgerMenu />
         <h1 className="text-2xl font-semibold">歷史紀錄</h1>
       </div>
 
       <Card>
         <CardHeader className="pb-2">
           <CardTitle className="text-lg font-medium">所有紀錄</CardTitle>
         </CardHeader>
         <Separator />
         <CardContent className="pt-4">
           <div className="relative mb-4">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Input
               placeholder="搜尋歷史紀錄..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-9"
             />
           </div>
           <div className="space-y-2">
             {filteredHistory.map((item) => (
               <div
                 key={item.id}
                 className="py-3 px-2 border-b border-dashed border-border last:border-0 hover:bg-muted/50 rounded cursor-pointer"
               >
                 <span className="text-sm text-muted-foreground">{item.date}</span>
                 <span className="ml-4">{item.topic}</span>
               </div>
             ))}
             {filteredHistory.length === 0 && searchQuery && (
               <div className="py-2 text-muted-foreground text-sm">
                 找不到符合的紀錄
               </div>
             )}
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }