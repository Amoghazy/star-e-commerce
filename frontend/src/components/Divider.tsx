export default function Divider({ text, cls }: { text: string; cls?: string }) {
  return (
    <span className={cls + " flex items-center"}>
      <span className="pl-6">{text}</span>
      <span className="flex-1 h-px bg-gray-400"></span>
    </span>
  );
}
