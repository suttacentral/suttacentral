import { API_ROOT } from '../constants';

let fallenLeaves = [];
let allFallenLeaves = [];
try {
  allFallenLeaves = await (await fetch(`${API_ROOT}/fallen_leaves`)).json();
  for (const leaves of allFallenLeaves) {
    for (const leaf of leaves.fallen_leaves) {
      fallenLeaves = [...fallenLeaves, ...Object.values(leaf)];
    }
  }
  fallenLeaves = fallenLeaves.flat(Infinity);
} catch (error) {
  console.log(error);
}

export { allFallenLeaves };

export function isFallenLeaf(uid) {
  return fallenLeaves.includes(uid);
}

export function getFallenLeavesByCategoryId(categoryId) {
  for (const leaves of allFallenLeaves) {
    for (const leaf of leaves.fallen_leaves) {
      if (Object.keys(leaf).includes(categoryId)) {
        return leaf[categoryId];
      }
    }
  }
  return null;
}
