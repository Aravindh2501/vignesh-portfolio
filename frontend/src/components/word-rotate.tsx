import { cn } from "@/lib/utils";

interface Props {
  label: string;
  label2?: string;
  style?: string;
}

const WordRotate = ({ label, label2, style }: Props) => {
  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{ lineHeight: 0.75 }}
    >
      <div className={cn("relative inline-block group text-sm font-light", style)}>
        <span className="block transform transition-transform duration-300 ease-in-out group-hover:translate-y-full">
          {label}
        </span>
        <span className="absolute inset-0 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          {label2 || label}
        </span>
      </div>
    </div>
  );
};

export default WordRotate;
