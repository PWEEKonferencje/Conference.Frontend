"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CSVExportImportProps {
  /**
   * Called when the user clicks the export button.
   * The function should handle data preparation and call the provided downloadCSV helper if needed.
   */
  onExport: (downloadCSV: (csvContent: string) => void) => void;
  /**
   * Called after successful CSV import with parsed data.
   */
  onImport: (data: Record<string, string>[]) => void;
  /**
   * The filename to use for exported CSV files.
   * Defaults to "export.csv".
   */
  exportFileName?: string;
  /**
   * Accepted file types for import.
   * Defaults to ".csv".
   */
  acceptedFileTypes?: string;
}

/**
 * Helper to trigger a CSV file download with the given content and filename.
 * This is passed to the onExport prop so the parent can control the export logic and filename.
 */
function downloadCSVFile(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

export function CSVExportImport({
  onExport,
  onImport,
  exportFileName = "export.csv",
  acceptedFileTypes = ".csv",
}: CSVExportImportProps) {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles CSV file import and parsing.
   * Not robust to all CSV edge cases (e.g., quoted commas), but sufficient for simple CSVs.
   */
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split("\n");
        const headers = lines[0]?.split(",") ?? [];

        const parsedData = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i]?.trim()) continue;

          const values = lines[i]?.split(",") ?? [];
          const entry: Record<string, string> = {};

          headers.forEach((header, index) => {
            entry[header.trim()] = values[index]?.replace(/"/g, "") ?? "";
          });

          parsedData.push(entry);
        }

        onImport(parsedData);
        toast({
          title: "Import successful",
          description: `Imported ${parsedData.length} items`,
        });
      } catch (error) {
        console.error("Error parsing CSV:", error);
        toast({
          title: "Import failed",
          description: "There was an error parsing the CSV file",
          variant: "destructive",
        });
      } finally {
        setIsImporting(false);
        // Reset file input so the same file can be re-imported if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      toast({
        title: "Import failed",
        description: "There was an error reading the file",
        variant: "destructive",
      });
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    reader.readAsText(file);
  };

  /**
   * Handles export button click.
   * Calls the onExport prop with a helper to trigger the download using the provided exportFileName.
   */
  const handleExport = () => {
    onExport((csvContent: string) => {
      downloadCSVFile(csvContent, exportFileName);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Export CSV
      </Button>

      <div className="relative">
        <input
          type="file"
          id="csv-upload"
          ref={fileInputRef}
          accept={acceptedFileTypes}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImport}
          disabled={isImporting}
        />
        <Button
          variant="outline"
          className="flex items-center gap-2"
          disabled={isImporting}
        >
          <Upload className="h-4 w-4" />
          {isImporting ? "Importing..." : "Import CSV"}
        </Button>
      </div>
    </div>
  );
}
