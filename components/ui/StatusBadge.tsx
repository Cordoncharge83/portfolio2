import { statusLabel, type ProjectStatus } from "@/lib/content";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="status" data-status={status}>
      {statusLabel[status]}
    </span>
  );
}
