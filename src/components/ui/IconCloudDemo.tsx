import { IconCloud } from "@/components/magicui/icon-cloud";

const images = [
  "/emojis/hamburguer.png",
  "/emojis/Açaiteria e Sorveteria.png",
  "/emojis/churrascaria.png",
  "/emojis/culainaria mexicana.png",
  "/emojis/Culinaria japonesa.png",
  "/emojis/Doceria.png",
  "/emojis/Lanchonete.png",
  "/emojis/Marmitaria Fit.png",
  "/emojis/Marmitex.png",
  "/emojis/Pizzaria.png",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex size-64 max-w-sm items-center justify-center overflow-hidden rounded-lg mx-auto">
      <IconCloud images={images} />
    </div>
  );
}
