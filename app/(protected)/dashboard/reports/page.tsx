"use client";

import { Button } from "@/components/ui/button";
import { FileText, Download, Share2 } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Supply Chain Risk Assessment 2024",
    date: "Mar 7, 2024",
    status: "completed",
    type: "Risk Analysis",
    pages: 24,
  },
  {
    id: 2,
    title: "Q1 Disruption Simulation Results",
    date: "Mar 1, 2024",
    status: "completed",
    type: "Simulation",
    pages: 18,
  },
  {
    id: 3,
    title: "Geopolitical Risk Report",
    date: "Feb 28, 2024",
    status: "completed",
    type: "Geopolitical",
    pages: 32,
  },
  {
    id: 4,
    title: "Supplier Diversification Strategy",
    date: "Feb 20, 2024",
    status: "completed",
    type: "Strategy",
    pages: 28,
  },
  {
    id: 5,
    title: "Recovery Time Analysis",
    date: "Feb 15, 2024",
    status: "completed",
    type: "Analysis",
    pages: 16,
  },
  {
    id: 6,
    title: "Monthly Compliance Check",
    date: "Feb 10, 2024",
    status: "completed",
    type: "Compliance",
    pages: 12,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Historical analysis and impact reports</p>
        </div>
        <Button>Generate New Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-lg border bg-card p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                {report.type}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Pages</p>
                <p className="font-semibold">{report.pages}</p>
              </div>
              <div className="text-sm text-right">
                <p className="text-muted-foreground">Status</p>
                <p className="font-semibold text-green-600">Completed</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
