import { statusLabel, type ProjectStatus } from "@/lib/content";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="tag" data-status={status}>
      {statusLabel[status]}
    </span>
  );
}
