"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface FlashcardProps {
  question: string;
  answer: string;
  colorScheme: {
    primaryColor: string;
    backgroundColor: string;
    accentColor: string;
  };
}

export function Flashcard({
  question,
  answer,
  colorScheme,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardStyles = {
    backgroundColor: colorScheme.backgroundColor,
    color: colorScheme.primaryColor,
    borderColor: colorScheme.accentColor,
  };

  return (
    <div
      className="group h-80 w-full max-w-md cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard. Question: ${question}. Click to reveal answer.`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={cn(
          "relative h-full w-full preserve-3d transition-transform duration-700 ease-in-out",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front of the card */}
        <Card
          className="absolute flex h-full w-full items-center justify-center overflow-hidden backface-hidden border-2 shadow-lg"
          style={cardStyles}
        >
          <CardContent className="p-6 text-center">
            <p className="text-xl md:text-2xl font-semibold">{question}</p>
          </CardContent>
        </Card>

        {/* Back of the card */}
        <Card
          className="absolute flex h-full w-full items-center justify-center overflow-hidden backface-hidden rotate-y-180 border-2 shadow-lg"
          style={cardStyles}
        >
          <CardContent className="p-6 text-center">
            <p className="text-xl md:text-2xl">{answer}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
