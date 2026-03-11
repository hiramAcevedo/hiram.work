"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Github, Linkedin } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message }),
      });

      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-[family-name:var(--font-heading)]">
          {t("title")}
        </h2>
        <p className="text-[var(--ink)]/50 mb-10">{t("subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot */}
          <input
            {...register("honeypot")}
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden="true"
          />

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
            >
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder={t("namePlaceholder")}
              className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border)] rounded-lg focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
            >
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border)] rounded-lg focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder={t("messagePlaceholder")}
              className="w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border)] rounded-lg focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-[family-name:var(--font-heading)]"
          >
            <Send size={16} />
            {status === "sending" ? t("sending") : t("send")}
          </button>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-green-600 text-sm"
              >
                <CheckCircle size={16} />
                {t("success")}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm"
              >
                <AlertCircle size={16} />
                {t("error")}
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-6 text-sm text-[var(--ink)]/50">
          <a
            href="mailto:hiram@hiram.work"
            className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors"
          >
            <Mail size={16} />
            hiram@hiram.work
          </a>
          <a
            href="https://github.com/hiramAcevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/hiram-acevedo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
