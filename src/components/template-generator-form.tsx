"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { generateTemplatesAction } from "@/app/actions";
import type { GenerateCardTemplatesOutput } from "@/ai/flows/generate-card-templates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from "lucide-react";

interface TemplateGeneratorFormProps {
  onTemplatesGenerated: (templates: GenerateCardTemplatesOutput) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Designs
        </>
      )}
    </Button>
  );
}

export function TemplateGeneratorForm({
  onTemplatesGenerated,
}: TemplateGeneratorFormProps) {
  const { toast } = useToast();
  const initialState = { success: false, message: "" };
  const [state, dispatch] = useFormState(generateTemplatesAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.data) {
      onTemplatesGenerated(state.data);
      formRef.current?.reset();
    } else if (!state.success && state.message) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: state.message,
      });
    }
  }, [state, onTemplatesGenerated, toast]);

  return (
    <form ref={formRef} action={dispatch} className="w-full max-w-md space-y-4 mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          name="topic"
          placeholder="Enter a topic, e.g., 'React Hooks'"
          required
          className="flex-grow bg-card"
          aria-label="Topic for flashcard generation"
        />
        <SubmitButton />
      </div>
       {state.message && !state.success && (
         <p className="text-sm text-destructive text-left">{state.message}</p>
       )}
    </form>
  );
}
