export interface Avatar {
  id: string;
  name: string;
  svg: string;
}

export const avataresDisponiveis: Avatar[] = [
  {
    id: "adventurer-1",
    name: "Aventureiro Neutro 1",
    svg: "/avatares/adventurerNeutral-1756038008041.svg"
  },
  {
    id: "adventurer-2", 
    name: "Aventureiro Neutro 2",
    svg: "/avatares/adventurerNeutral-1756038013085.svg"
  },
  {
    id: "adventurer-3",
    name: "Aventureiro Neutro 4",
    svg: "/avatares/adventurerNeutral-1756038623402.svg"
  },
  {
    id: "adventurer-4",
    name: "Aventureiro Neutro 5",
    svg: "/avatares/adventurerNeutral-1756038631137.svg"
  },
  {
    id: "adventurer-5",
    name: "Aventureiro Neutro 6",
    svg: "/avatares/adventurerNeutral-1756038635649.svg"
  },
  {
    id: "adventurer-6",
    name: "Aventureiro Neutro 7",
    svg: "/avatares/adventurerNeutral-1756038638720.svg"
  },
  {
    id: "adventurer-7",
    name: "Aventureiro Neutro 8",
    svg: "/avatares/adventurerNeutral-1756038641905.svg"
  },
  {
    id: "adventurer-8",
    name: "Aventureiro Neutro 9",
    svg: "/avatares/adventurerNeutral-1756038644964.svg"
  },
  {
    id: "adventurer-9",
    name: "Aventureiro Neutro 10",
    svg: "/avatares/adventurerNeutral-1756038647604.svg"
  },
  {
    id: "adventurer-10",
    name: "Aventureiro Neutro 11",
    svg: "/avatares/adventurerNeutral-1756038649846.svg"
  },
  {
    id: "adventurer-11",
    name: "Aventureiro Neutro 12",
    svg: "/avatares/adventurerNeutral-1756038651978.svg"
  },
  {
    id: "adventurer-12",
    name: "Aventureiro Neutro 13",
    svg: "/avatares/adventurerNeutral-1756038653815.svg"
  },
  {
    id: "adventurer-13",
    name: "Aventureiro Neutro 14",
    svg: "/avatares/adventurerNeutral-1756038656955.svg"
  },
  {
    id: "adventurer-14",
    name: "Aventureiro Neutro 15",
    svg: "/avatares/adventurerNeutral-1756038659289.svg"
  },
  {
    id: "adventurer-15",
    name: "Aventureiro Neutro 16",
    svg: "/avatares/adventurerNeutral-1756038661750.svg"
  },
  {
    id: "adventurer-16",
    name: "Aventureiro Neutro 17",
    svg: "/avatares/adventurerNeutral-1756038663584.svg"
  },
  {
    id: "adventurer-17",
    name: "Aventureiro Neutro 18",
    svg: "/avatares/adventurerNeutral-1756038666740.svg"
  },
  {
    id: "adventurer-18",
    name: "Aventureiro Neutro 19",
    svg: "/avatares/adventurerNeutral-1756038668982.svg"
  },
  {
    id: "adventurer-19",
    name: "Aventureiro Neutro 20",
    svg: "/avatares/adventurerNeutral-1756038670731.svg"
  },
  {
    id: "adventurer-20",
    name: "Aventureiro Neutro 21",
    svg: "/avatares/adventurerNeutral-1756038672767.svg"
  }
];

export const getAvatarByFilename = (filename: string): Avatar | undefined => {
  return avataresDisponiveis.find(avatar => avatar.svg === filename);
};

export const getAvatarById = (id: string): Avatar | undefined => {
  return avataresDisponiveis.find(avatar => avatar.id === id);
};

  