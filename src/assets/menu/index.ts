import corba01 from "./celo-corba-01.jpg.asset.json";
import corba02 from "./celo-corba-02.jpg.asset.json";
import corba03 from "./celo-corba-03.jpg.asset.json";
import corba04 from "./celo-corba-04.jpg.asset.json";
import corba05 from "./celo-corba-05.jpg.asset.json";
import baslangic01 from "./celo-baslangic-01.jpg.asset.json";
import baslangic02 from "./celo-baslangic-02.jpg.asset.json";
import baslangic03 from "./celo-baslangic-03.jpg.asset.json";
import baslangic04 from "./celo-baslangic-04.jpg.asset.json";
import baslangic05 from "./celo-baslangic-05.jpg.asset.json";
import anayemek01 from "./celo-ana-yemek-01.jpg.asset.json";
import anayemek02 from "./celo-ana-yemek-02.jpg.asset.json";
import anayemek03 from "./celo-ana-yemek-03.jpg.asset.json";
import kebap01 from "./celo-kebap-01.jpg.asset.json";
import kebap02 from "./celo-kebap-02.jpg.asset.json";
import tatli01 from "./celo-tatli-01.jpg.asset.json";
import tatli02 from "./celo-tatli-02.jpg.asset.json";
import tatli03 from "./celo-tatli-03.jpg.asset.json";
import tatli04 from "./celo-tatli-04.jpg.asset.json";
import tatli05 from "./celo-tatli-05.jpg.asset.json";

const soups = [corba01, corba02, corba03, corba04, corba05].map((a) => a.url);
const kebabs = [kebap01, kebap02, anayemek01, anayemek02, anayemek03].map((a) => a.url);
const mains = [anayemek01, anayemek02, anayemek03].map((a) => a.url);
const starters = [baslangic01, baslangic02, baslangic03, baslangic04, baslangic05].map((a) => a.url);
const desserts = [tatli01, tatli02, tatli03, tatli04, tatli05].map((a) => a.url);

export const categoryPhotos: Record<string, string[]> = {
  soups,
  kebabs,
  pans: mains,
  steaks: mains,
  oven: starters,
  wraps: kebabs,
  desserts,
  drinks: [],
};

export function photoFor(category: string, index: number): string | undefined {
  const list = categoryPhotos[category];
  if (!list || list.length === 0) return undefined;
  return list[index % list.length];
}
