import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const segments = [
  {
    name: "Hamburgueria",
    icon: "/emojis/hamburguer.png",
    description: "Hambúrgueres artesanais e combos deliciosos",
  },
  {
    name: "Açaiteria",
    icon: "/emojis/Açaiteria e Sorveteria.png",
    description: "Açaí natural e sorvetes cremosos",
  },
  {
    name: "Churrascaria",
    icon: "/emojis/churrascaria.png",
    description: "Carnes nobres e buffet completo",
  },
  {
    name: "Mexicana",
    icon: "/emojis/culainaria mexicana.png",
    description: "Tacos, burritos e pratos autênticos",
  },
  {
    name: "Japonesa",
    icon: "/emojis/Culinaria japonesa.png",
    description: "Sushi, sashimi e pratos orientais",
  },
  {
    name: "Doceria",
    icon: "/emojis/Doceria.png",
    description: "Doces caseiros e sobremesas especiais",
  },
  {
    name: "Lanchonete",
    icon: "/emojis/Lanchonete.png",
    description: "Lanches rápidos e práticos",
  },
  {
    name: "Marmitaria Fit",
    icon: "/emojis/Marmitaria Fit.png",
    description: "Refeições saudáveis e balanceadas",
  },
  {
    name: "Marmitex",
    icon: "/emojis/Marmitex.png",
    description: "Marmitas tradicionais e saborosas",
  },
  {
    name: "Pizzaria",
    icon: "/emojis/Pizzaria.png",
    description: "Pizzas artesanais e massas frescas",
  },
];

const SegmentCard = ({
  icon,
  name,
  description,
}: {
  icon: string;
  name: string;
  description: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-36 cursor-pointer overflow-hidden rounded-xl p-4",
        "bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90",
      )}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <img 
          className="w-16 h-16 object-cover rounded-lg" 
          alt={name} 
          src={icon} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-900">
            {name}
          </figcaption>
          <p className="text-xs text-gray-600 mt-1">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

const firstRow = segments.slice(0, segments.length / 2);
const secondRow = segments.slice(segments.length / 2);
const thirdRow = segments.slice(0, segments.length / 2);
const fourthRow = segments.slice(segments.length / 2);

export function SegmentMarquee() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((segment) => (
            <SegmentCard key={segment.name} {...segment} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((segment) => (
            <SegmentCard key={segment.name} {...segment} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((segment) => (
            <SegmentCard key={segment.name} {...segment} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((segment) => (
            <SegmentCard key={segment.name} {...segment} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[rgb(245,239,242)]"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[rgb(245,239,242)]"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[rgb(245,239,242)]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[rgb(245,239,242)]"></div>
    </div>
  );
}
