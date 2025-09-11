"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { OpenInV0Button } from "@/components/registry/open-in-v0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Component } from "@/lib/registry";

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://${baseUrl}/r/${component.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="bg-card p-4 rounded border">
      <div id="starting-kit" className="flex flex-col gap-4">
        <div className="flex border-b pb-2 w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
          <p className="text-muted-foreground">{component.description}</p>
          <div className="flex items-center gap-1 sm:ml-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipContent className="font-mono">
                  Copy npx command
                </TooltipContent>
                <TooltipTrigger asChild>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    aria-label="Copy npx command to clipboard"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>

            <OpenInV0Button
              registryUrl={registryUrl}
              title={`${component.title} Kit`}
              prompt={prompt}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-md">
          <div className={"h-[800px] w-full overflow-hidden"}>
            <iframe
              id="iframe"
              src={`/demo/${component.name}`}
              className="h-full w-full"
              title="Page Preview"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
