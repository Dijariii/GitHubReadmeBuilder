import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Guide from "@/pages/guide";
import { Logo } from "@/components/ui/logo";

function Nav() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="hover:opacity-90 transition-opacity">
            <Logo />
          </a>
        </Link>
        <div className="flex gap-6">
          <Link href="/guide">
            <a className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              How to Create
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/guide" component={Guide} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;