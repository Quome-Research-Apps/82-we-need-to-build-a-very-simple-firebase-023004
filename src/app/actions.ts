"use server";

import { z } from "zod";
import {
  generateCardTemplates,
  GenerateCardTemplatesOutput,
} from "@/ai/flows/generate-card-templates";

const schema = z.object({
  topic: z.string().min(1, "Topic is required.").max(50, "Topic must be 50 characters or less."),
});

type State = {
  success: boolean;
  message?: string;
  data?: GenerateCardTemplatesOutput;
};

export async function generateTemplatesAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = schema.safeParse({
    topic: formData.get("topic"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.topic?.join(", "),
    };
  }

  try {
    const result = await generateCardTemplates({ topic: validatedFields.data.topic });
    if (!result.templates || result.templates.length === 0) {
      return { success: false, message: "Could not generate any templates for this topic. Please try another." };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
