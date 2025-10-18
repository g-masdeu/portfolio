"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Mail, Github, Linkedin } from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message should be at least 10 chars";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (form.honeypot) return; // anti-bot
    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mt-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Formulario */}
        <Card className="lg:col-span-2 border bg-card/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Send me a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Honeypot anti-bots */}
              <input
                type="text"
                name="company"
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground">Name</label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="w-72 bg-white hover:shadow-amber-50"

                  />
                  {errors.name && <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground">Email</label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-72 bg-white hover:shadow-amber-50"

                  />
                  {errors.email && <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground">Message</label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project…"
                  className="min-h-32 w-full bg-white hover:shadow-amber-50"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline">Response within 24–48h</Badge>
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full"
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </Button>
              </div>

              {status === "sent" && (
                <p className="text-sm text-green-600 dark:text-green-400">Thanks! Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-destructive">Something went wrong. Please try again later.</p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Datos de contacto / redes */}
        <Card className="border bg-card/70 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Direct contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <a
              href="mailto:guillem.masdeu97@gmail.com?subject=Propuesta&body=Hello Guillem, ..."
              className="group flex items-center gap-2 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Mail className="size-4 opacity-70 group-hover:opacity-100" />
              guillem.masdeu97@gmail.com
            </a>
            <a
              href="https://github.com/g-masdeu"
              target="_blank" rel="noreferrer"
              className="group flex items-center gap-2 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Github className="size-4 opacity-70 group-hover:opacity-100" />
              github.com/g-masdeu
            </a>
            <a
              href="https://www.linkedin.com/in/guillem9masdeu"
              target="_blank" rel="noreferrer"
              className="group flex items-center gap-2 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Linkedin className="size-4 opacity-70 group-hover:opacity-100" />
              linkedin.com/in/guillem9masdeu
            </a>
            <p className="text-xs text-muted-foreground">
              Prefer email for proposals. Include scope, timeline and links if possible.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ContactSection;
