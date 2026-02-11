import { collection, doc, getDocs, serverTimestamp, writeBatch } from "firebase/firestore";
import { db } from "../firebase";

export const INITIAL_WORDS = [
  "reward",
  "shiver",
  "regret",
  "carbon",
  "island",
  "impound",
  "extreme",
  "inspire",
  "finance",
  "control",
  "collapse",
  "medicine",
  "frighten",
  "observer",
  "classify",
  "monstrous",
  "orchestra",
  "executive",
  "fireplace",
  "essential",
  "prevalence",
  "background",
  "particular",
  "attraction",
  "pedestrian",
  "unfortunate",
  "charismatic",
  "institution",
  "destruction",
  "presentation",
  "manufacturer",
  "interference",
  "announcement",
  "presidential",
  "inappropriate",
  "embarrassment",
  "consideration",
  "comprehensive",
  "communication",
  "representative",
  "responsibility",
  "constitutional",
  "discrimination",
  "recommendation",
];

export async function seedInitialWords() {
  const existingSnap = await getDocs(collection(db, "words"));
  const existing = new Set(existingSnap.docs.map((d) => d.id));

  const toAdd = INITIAL_WORDS
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0 && !existing.has(w));

  if (toAdd.length === 0) {
    console.log("seedInitialWords: no new words, everything is already seeded.");
    return;
  }

  const batch = writeBatch(db);
  for (const w of toAdd) {
    const ref = doc(db, "words", w);
    batch.set(ref, { value: w, createdAt: serverTimestamp() });
  }
  await batch.commit();

  console.log(`seedInitialWords: uploaded ${toAdd.length} words.`);
}
