"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Code2,
} from "lucide-react";

const hiringSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0),
});

const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email"),
  projectType: z.string().min(1, "Select a project type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0),
});

type HiringData = z.infer<typeof hiringSchema>;
type ProjectData = z.infer<typeof projectSchema>;
type TabMode = "hiring" | "project";

const projectTypes = [
  "Web Application",
  "Landing Page / Marketing Site",
  "E-commerce",
  "Design System / UI Kit",
  "API / Backend Service",
  "AI / LLM Integration",
  "Consultation",
  "Other",
];

const budgetRanges = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
];

export default function Contact() {
  const t = useTranslations("contact");
  const [tab, setTab] = useState<TabMode>("hiring");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const hiringForm = useForm<HiringData>({
    resolver: zodResolver(hiringSchema),
    defaultValues: { honeypot: "" },
  });

  const projectForm = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { honeypot: "", projectType: "", budget: "" },
  });

  const sendForm = async (data: HiringData | ProjectData) => {
    if (data.honeypot) return;
    setStatus("sending");

    const subject =
      tab === "hiring"
        ? `[Hiring] Message from ${data.name}`
        : `[Project: ${(data as ProjectData).projectType}] from ${data.name}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          subject,
          meta:
            tab === "project"
              ? {
                  projectType: (data as ProjectData).projectType,
                  budget: (data as ProjectData).budget,
                }
              : tab === "hiring" && (data as HiringData).company
                ? { company: (data as HiringData).company }
                : undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
        hiringForm.reset();
        projectForm.reset();
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

  const inputClass =
    "w-full px-4 py-3 bg-[var(--surface-1)] border border-[var(--border)] rounded-lg focus:border-[var(--accent)] focus:outline-none transition-colors";
  const labelClass = "block text-base font-medium mb-2";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-[family-name:var(--font-heading)]">
          {t("title")}
        </h2>
        <p className="text-[var(--ink)]/50 mb-8">{t("subtitle")}</p>

        {/* Tab switcher */}
        <div className="flex gap-1 p-1 bg-[var(--surface-1)] rounded-lg mb-8 w-fit">
          <button
            type="button"
            onClick={() => setTab("hiring")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-base font-semibold transition-all font-[family-name:var(--font-heading)] ${
              tab === "hiring"
                ? "bg-[var(--bg)] text-[var(--ink)] shadow-sm"
                : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
            }`}
          >
            <Briefcase size={14} />
            {t("tabHiring")}
          </button>
          <button
            type="button"
            onClick={() => setTab("project")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-base font-semibold transition-all font-[family-name:var(--font-heading)] ${
              tab === "project"
                ? "bg-[var(--bg)] text-[var(--ink)] shadow-sm"
                : "text-[var(--ink)]/50 hover:text-[var(--ink)]"
            }`}
          >
            <Code2 size={14} />
            {t("tabProject")}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "hiring" ? (
            <motion.form
              key="hiring"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={hiringForm.handleSubmit(sendForm)}
              className="space-y-5"
            >
              <input
                {...hiringForm.register("honeypot")}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="h-name" className={labelClass}>{t("name")}</label>
                  <input id="h-name" type="text" {...hiringForm.register("name")} placeholder={t("namePlaceholder")} className={inputClass} />
                  {hiringForm.formState.errors.name && <p className={errorClass}>{hiringForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="h-email" className={labelClass}>{t("email")}</label>
                  <input id="h-email" type="email" {...hiringForm.register("email")} placeholder={t("emailPlaceholder")} className={inputClass} />
                  {hiringForm.formState.errors.email && <p className={errorClass}>{hiringForm.formState.errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="h-company" className={labelClass}>
                  {t("company")} <span className="text-[var(--ink)]/30 font-normal">({t("optional")})</span>
                </label>
                <input id="h-company" type="text" {...hiringForm.register("company")} placeholder={t("companyPlaceholder")} className={inputClass} />
              </div>

              <div>
                <label htmlFor="h-message" className={labelClass}>{t("message")}</label>
                <textarea id="h-message" rows={4} {...hiringForm.register("message")} placeholder={t("hiringMessagePlaceholder")} className={`${inputClass} resize-none`} />
                {hiringForm.formState.errors.message && <p className={errorClass}>{hiringForm.formState.errors.message.message}</p>}
              </div>

              <SubmitButton status={status} label={t("send")} sending={t("sending")} />
            </motion.form>
          ) : (
            <motion.form
              key="project"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={projectForm.handleSubmit(sendForm)}
              className="space-y-5"
            >
              <input
                {...projectForm.register("honeypot")}
                tabIndex={-1}
                autoComplete="off"
                className="absolute opacity-0 pointer-events-none h-0 w-0"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="p-name" className={labelClass}>{t("name")}</label>
                  <input id="p-name" type="text" {...projectForm.register("name")} placeholder={t("namePlaceholder")} className={inputClass} />
                  {projectForm.formState.errors.name && <p className={errorClass}>{projectForm.formState.errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="p-email" className={labelClass}>{t("email")}</label>
                  <input id="p-email" type="email" {...projectForm.register("email")} placeholder={t("emailPlaceholder")} className={inputClass} />
                  {projectForm.formState.errors.email && <p className={errorClass}>{projectForm.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="p-type" className={labelClass}>{t("projectType")}</label>
                  <select id="p-type" {...projectForm.register("projectType")} className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="">{t("selectProjectType")}</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {projectForm.formState.errors.projectType && <p className={errorClass}>{projectForm.formState.errors.projectType.message}</p>}
                </div>
                <div>
                  <label htmlFor="p-budget" className={labelClass}>
                    {t("budget")} <span className="text-[var(--ink)]/30 font-normal">({t("optional")})</span>
                  </label>
                  <select id="p-budget" {...projectForm.register("budget")} className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="">{t("selectBudget")}</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="p-message" className={labelClass}>{t("projectDescription")}</label>
                <textarea id="p-message" rows={4} {...projectForm.register("message")} placeholder={t("projectMessagePlaceholder")} className={`${inputClass} resize-none`} />
                {projectForm.formState.errors.message && <p className={errorClass}>{projectForm.formState.errors.message.message}</p>}
              </div>

              <SubmitButton status={status} label={t("send")} sending={t("sending")} />
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === "success" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-green-600 text-sm mt-4">
              <CheckCircle size={16} />
              {t("success")}
            </motion.div>
          )}
          {status === "error" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-500 text-sm mt-4">
              <AlertCircle size={16} />
              {t("error")}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-6 text-base text-[var(--ink)]/50">
          <a href="mailto:hiram@hiram.work" className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
            <Mail size={16} /> hiram@hiram.work
          </a>
          <a href="https://github.com/hiramAcevedo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
            <Github size={16} /> GitHub
          </a>
          <a href="https://linkedin.com/in/hiram-acevedo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[var(--ink)] transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function SubmitButton({ status, label, sending }: { status: string; label: string; sending: string }) {
  return (
    <button
      type="submit"
      disabled={status === "sending"}
      className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-[family-name:var(--font-heading)]"
    >
      <Send size={16} />
      {status === "sending" ? sending : label}
    </button>
  );
}
