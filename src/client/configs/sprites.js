const data = {
  bodies: {
    male: [],
    female: []
  }
};

const bodies = ['dark', 'dark2', 'darkelf', 'darkelf2', 'light', 'light2', 'orc', 'red_orc', 'skeleton', 'tanned', 'tanned2'];

bodies.forEach((b) => {
  data.bodies.male.push(`male_${b}`);
  data.bodies.female.push(`female_${b}`);
});

export default data;