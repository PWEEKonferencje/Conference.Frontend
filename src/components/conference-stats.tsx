"use client";

import { useEffect, useRef } from "react";
import { BarChart3Icon, PieChartIcon, LineChartIcon } from "lucide-react";

interface ConferenceStatsProps {
  type: "submissions" | "reviews" | "topics";
}

export default function ConferenceStats({ type }: ConferenceStatsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (type === "submissions") {
      drawSubmissionsChart(
        ctx,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    } else if (type === "reviews") {
      drawReviewsChart(ctx, canvasRef.current.width, canvasRef.current.height);
    } else if (type === "topics") {
      drawTopicsChart(ctx, canvasRef.current.width, canvasRef.current.height);
    }
  }, [type]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="mb-4">
        {type === "submissions" && (
          <BarChart3Icon className="h-8 w-8 text-muted-foreground" />
        )}
        {type === "reviews" && (
          <LineChartIcon className="h-8 w-8 text-muted-foreground" />
        )}
        {type === "topics" && (
          <PieChartIcon className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full h-full"
      />
    </div>
  );
}

function drawSubmissionsChart(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const data = [12, 18, 8, 4];
  const labels = ["Deep Learning", "NLP", "Computer Vision", "Other"];
  const colors = ["#2563eb", "#7c3aed", "#db2777", "#9ca3af"];

  const barWidth = width / (data.length * 2);
  const maxValue = Math.max(...data);

  // Draw bars
  data.forEach((value, index) => {
    const x = (index * 2 + 1) * barWidth;
    const barHeight = (value / maxValue) * (height - 60);

    ctx.fillStyle = colors[index]!;
    ctx.fillRect(x, height - 30 - barHeight, barWidth, barHeight);

    // Draw label
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[index]!, x + barWidth / 2, height - 10);

    // Draw value
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(value.toString(), x + barWidth / 2, height - 35 - barHeight);
  });

  // Draw title
  ctx.fillStyle = "#334155";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Submissions by Category", width / 2, 20);
}

function drawReviewsChart(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const data = [5, 12, 18, 25, 32];
  const labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  const maxValue = Math.max(...data);
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Draw axes
  ctx.strokeStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Draw line
  ctx.strokeStyle = "#2563eb";
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((value, index) => {
    const x = padding + (index * chartWidth) / (data.length - 1);
    const y = height - padding - (value / maxValue) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    // Draw point
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw label
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labels[index]!, x, height - padding + 20);

    // Draw value
    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(value.toString(), x, y - 15);
  });

  ctx.stroke();

  // Draw title
  ctx.fillStyle = "#334155";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Completed Reviews Over Time", width / 2, 20);
}

function drawTopicsChart(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const data = [35, 25, 15, 10, 15];
  const labels = [
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "Reinforcement Learning",
    "Other",
  ];
  const colors = ["#2563eb", "#7c3aed", "#db2777", "#f59e0b", "#9ca3af"];

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 40;

  let startAngle = 0;

  const total = data.reduce((sum, value) => sum + value, 0);

  // Draw pie slices
  data.forEach((value, index) => {
    const sliceAngle = (value / total) * 2 * Math.PI;

    ctx.fillStyle = colors[index]!;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();
    ctx.fill();

    // Draw label line and text
    const midAngle = startAngle + sliceAngle / 2;
    const labelRadius = radius * 1.2;
    const labelX = centerX + Math.cos(midAngle) * labelRadius;
    const labelY = centerY + Math.sin(midAngle) * labelRadius;

    ctx.strokeStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.moveTo(
      centerX + Math.cos(midAngle) * radius,
      centerY + Math.sin(midAngle) * radius,
    );
    ctx.lineTo(labelX, labelY);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "12px sans-serif";
    ctx.textAlign = midAngle < Math.PI ? "left" : "right";
    ctx.fillText(`${labels[index]} (${value}%)`, labelX, labelY);

    startAngle += sliceAngle;
  });

  // Draw title
  ctx.fillStyle = "#334155";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Paper Topics Distribution", width / 2, 20);
}
