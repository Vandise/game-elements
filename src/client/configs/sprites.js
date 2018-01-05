const data = {
  bodies: {
    male: [],
    female: []
  },
  hair: {
    male: [],
    female: []
  }
};

const bodies = ['dark', 'dark2', 'darkelf', 'darkelf2', 'light', 'light2', 'orc', 'red_orc', 'skeleton', 'tanned', 'tanned2'];
const hair = ['long', 'messy1', 'page', 'parted', 'pixie', 'plain', 'princess'];

bodies.forEach((b) => {
  data.bodies.male.push(`male_${b}`);
  data.bodies.female.push(`female_${b}`);
});

hair.forEach((b) => {
  data.hair.male.push(`male_hair_${b}`);
  data.hair.female.push(`female_hair_${b}`);
});

export default data;