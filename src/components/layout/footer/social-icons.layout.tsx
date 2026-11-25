import { AtSign, Globe, MessageCircle } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="soc" aria-hidden="true">
      <Globe size={14} strokeWidth={1.5} />
      <MessageCircle size={14} strokeWidth={1.5} />
      <AtSign size={14} strokeWidth={1.5} />
    </div>
  );
}
