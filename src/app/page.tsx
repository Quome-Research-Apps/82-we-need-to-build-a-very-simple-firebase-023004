"use client";

import { useState } from "react";
import type { GenerateCardTemplatesOutput } from "@/ai/flows/generate-card-templates";
import { Flashcard } from "@/components/flashcard";
import { TemplateGeneratorForm } from "@/components/template-generator-form";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [templates, setTemplates] =
    useState<GenerateCardTemplatesOutput["templates"]>();

  const handleTemplatesGenerated = (data: GenerateCardTemplatesOutput) => {
    setTemplates(data.templates);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12 lg:p-24 bg-background">
      <div className="w-full max-w-5xl text-center space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary">
            CardFlip
          </h1>
          <p className="text-lg text-muted-foreground">
            A simple, elegant, and stateless single flashcard.
          </p>
          <p className="text-md text-foreground/80">
            Enter a topic below and let AI generate some designs for you.
          </p>
        </header>

        <TemplateGeneratorForm onTemplatesGenerated={handleTemplatesGenerated} />

        {templates && templates.length > 0 && (
          <div className="space-y-12 pt-8">
            <Separator />
            <h2 className="text-3xl font-bold tracking-tight">Generated Designs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <Flashcard
                  key={index}
                  question={template.question}
                  answer={template.answer}
                  colorScheme={template.colorScheme}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
