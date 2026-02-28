import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, BookHeart } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  // Registration dialog state
  const [registerOpen, setRegisterOpen] = useState(false);
  const [regUsername, setRegUsername] = useState("");
  const [regLastName, setRegLastName] = useState("");
  const [regFirstName, setRegFirstName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);

  // Forgot password dialog state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual auth
    navigate("/home");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google auth
    navigate("/home");
  };

  const validatePassword = (pwd: string): boolean => {
    const hasLetter = /[a-zA-Z]/.test(pwd);
    const hasMinLength = pwd.length >= 10;
    return hasLetter && hasMinLength;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!regUsername.trim()) errors.username = "請輸入用戶名";
    if (!regLastName.trim()) errors.lastName = "請輸入姓";
    if (!regFirstName.trim()) errors.firstName = "請輸入名";
    if (!regEmail.trim()) errors.email = "請輸入電子信箱";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errors.email = "信箱格式不正確";
    
    if (!validatePassword(regPassword)) {
      errors.password = "密碼須至少10個字元且包含英文字母";
    }
    if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = "密碼不一致";
    }

    setRegErrors(errors);

    if (Object.keys(errors).length === 0) {
      // TODO: Implement actual registration
      toast({ title: "註冊成功", description: "請使用新帳號登入" });
      setRegisterOpen(false);
      resetRegisterForm();
    }
  };

  const resetRegisterForm = () => {
    setRegUsername("");
    setRegLastName("");
    setRegFirstName("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
    setRegErrors({});
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      toast({ title: "錯誤", description: "請輸入有效的電子信箱", variant: "destructive" });
      return;
    }
    // TODO: Implement actual password reset
    toast({ title: "已發送", description: "密碼重設信件已發送至您的信箱" });
    setForgotOpen(false);
    setForgotEmail("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center mb-4 text-primary">
          <BookHeart className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">SELf-corner</h1>
        <p className="text-lg text-muted-foreground">每個老師，都需要一個能安心犯錯的角落。</p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-muted/50 bg-card/80 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-500 delay-150 fill-mode-both">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl text-foreground">歡迎回來</CardTitle>
          <CardDescription>登入您的帳號以繼續練習</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="text"
              placeholder="帳號 / Email"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="bg-background"
            />
            <div className="relative">
              <Input
                type={showLoginPassword ? "text" : "password"}
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Button type="submit" className="w-1/2">
                登入
              </Button>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <button
                  type="button"
                  className="hover:text-primary transition-colors"
                  onClick={() => setRegisterOpen(true)}
                >
                  註冊
                </button>
                <span>|</span>
                <button
                  type="button"
                  className="hover:text-primary transition-colors"
                  onClick={() => setForgotOpen(true)}
                >
                  忘記密碼
                </button>
              </div>
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">或使用</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-background"
              onClick={handleGoogleLogin}
            >
              Google 帳號登入
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Registration Dialog */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>建立新帳號</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <Input
                placeholder="用戶名 (ID)"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
              />
              {regErrors.username && <p className="text-sm text-destructive mt-1">{regErrors.username}</p>}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="姓"
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                />
                {regErrors.lastName && <p className="text-sm text-destructive mt-1">{regErrors.lastName}</p>}
              </div>
              <div className="flex-1">
                <Input
                  placeholder="名"
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                />
                {regErrors.firstName && <p className="text-sm text-destructive mt-1">{regErrors.firstName}</p>}
              </div>
            </div>
            <div>
              <Input
                type="email"
                placeholder="電子信箱"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              {regErrors.email && <p className="text-sm text-destructive mt-1">{regErrors.email}</p>}
            </div>
            <div>
              <div className="relative">
                <Input
                  type={showRegPassword ? "text" : "password"}
                  placeholder="密碼 (至少10字元，含英文)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                >
                  {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {regErrors.password && <p className="text-sm text-destructive mt-1">{regErrors.password}</p>}
            </div>
            <div>
              <div className="relative">
                <Input
                  type={showRegConfirmPassword ? "text" : "password"}
                  placeholder="確認密碼"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                >
                  {showRegConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {regErrors.confirmPassword && <p className="text-sm text-destructive mt-1">{regErrors.confirmPassword}</p>}
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" className="w-full">註冊並開始練習</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>忘記密碼</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-3">
            <p className="text-sm text-muted-foreground">
              請輸入您的電子信箱，我們將發送密碼重設連結。
            </p>
            <Input
              type="email"
              placeholder="電子信箱"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <DialogFooter className="pt-2">
              <Button type="submit" className="w-full">發送驗證信</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
