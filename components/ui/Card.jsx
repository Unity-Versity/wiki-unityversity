import { cn } from "../../utils/utils";
import Link from "next/link";

export default function Card({ title, category, blurb, path, className }) {
  return (
    <Link href={`/wiki/${path}`} className={cn("block", className)}>
      <div className="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{category}</p>
        <p className="text-sm text-foreground line-clamp-2">{blurb}</p>
      </div>
    </Link>
  );
}