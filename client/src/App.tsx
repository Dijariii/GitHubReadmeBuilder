import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Guide from "@/pages/guide";
import { Logo } from "@/components/ui/logo";
import { SiGithub } from "react-icons/si";
import React, { memo } from 'react';
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

function Nav() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/guide">
            <span className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              How to Create
            </span>
          </Link>
          <ThemeToggle />
          <a 
            href="https://github.com/Dijariii/Readme-Gen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
}

const Router = memo(function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <React.Suspense fallback={<div className="p-4">Loading...</div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/guide" component={Guide} />
          <Route component={NotFound} />
        </Switch>
      </React.Suspense>
    </div>
  );
});

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;