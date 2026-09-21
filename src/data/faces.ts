export interface FacePerson {
  id: string;
  name: string;
  category: "VIP GUESTS" | "RUNWAY MODELS";
  event: string;
  title?: string;
  image: string;
}

export const FACES_DATA: FacePerson[] = [
  {
    id: "face-01",
    name: "Elena Vance",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Couture Principal",
    image: "/assets/models/model_01.jpeg",
  },
  {
    id: "face-02",
    name: "Marcus Aurel",
    category: "VIP GUESTS",
    event: "LifeStyle Dubai",
    title: "Patron & Guest of Honor",
    image: "/assets/models/model_02.jpeg",
  },
  {
    id: "face-03",
    name: "Soraya Al-Mansoor",
    category: "VIP GUESTS",
    event: "LifeStyle",
    title: "Creative Ambassador",
    image: "/assets/models/model_03.jpeg",
  },
  {
    id: "face-04",
    name: "Amara Diop",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Runway Lead",
    image: "/assets/models/model_04.jpeg",
  },
  {
    id: "face-05",
    name: "Viktor Petrov",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Editorial Model",
    image: "/assets/models/model_05.jpeg",
  },
  {
    id: "face-06",
    name: "Chiara Rossi",
    category: "VIP GUESTS",
    event: "LifeStyle Dubai",
    title: "Cultural Contributor",
    image: "/assets/models/model_06.jpeg",
  },
  {
    id: "face-07",
    name: "Kai Takahashi",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Couture Model",
    image: "/assets/models/model_07.jpeg",
  },
  {
    id: "face-08",
    name: "Layla Sterling",
    category: "VIP GUESTS",
    event: "LifeStyle",
    title: "International Delegate",
    image: "/assets/models/model_08.jpeg",
  },
  {
    id: "face-09",
    name: "Daria Novak",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "High Fashion Runway",
    image: "/assets/models/model_09.jpeg",
  },
  {
    id: "face-10",
    name: "Jean-Luc Dubois",
    category: "VIP GUESTS",
    event: "LifeStyle Dubai",
    title: "Design Council Guest",
    image: "/assets/models/model_10.jpeg",
  },
  {
    id: "face-11",
    name: "Tariq Al-Maktoum",
    category: "VIP GUESTS",
    event: "LifeStyle",
    title: "Honorary Patron",
    image: "/assets/models/model_11.jpeg",
  },
  {
    id: "face-12",
    name: "Astrid Lindqvist",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Runway Specialist",
    image: "/assets/models/model_12.jpeg",
  },
  {
    id: "face-13",
    name: "Siddharth Mehta",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Couture Talent",
    image: "/assets/models/model_13.jpeg",
  },
  {
    id: "face-14",
    name: "Zoe Chen",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "Editorial Runway",
    image: "/assets/models/model_14.jpeg",
  },
  {
    id: "face-15",
    name: "Nia Okonjo",
    category: "RUNWAY MODELS",
    event: "Runway",
    title: "High Fashion Lead",
    image: "/assets/models/model_15.jpeg",
  },
];
